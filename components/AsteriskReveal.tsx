"use client";

import { useRef, useMemo, MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface AsteriskRevealProps {
  progressRef: MutableRefObject<number>;
  screenX: number;
  screenY: number;
  fontSize: number;
  /** Exact pixel width of the HTML * span */
  spanWidth: number;
  /** Exact pixel height of the HTML * span */
  spanHeight: number;
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uProgress;
uniform vec3 uColor;
varying vec2 vUv;

// --- Noise (hash-based value noise + FBM) ---
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

// --- SDF ---
float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}
vec2 rot(vec2 p, float a) {
  float c = cos(a), s = sin(a);
  return vec2(p.x*c - p.y*s, p.x*s + p.y*c);
}
float sdAsterisk(vec2 p) {
  vec2 bar = vec2(0.05, 0.28);
  float d = sdBox(p, bar);
  d = min(d, sdBox(rot(p, 1.0472), bar));
  d = min(d, sdBox(rot(p, 2.0944), bar));
  return d;
}

void main() {
  vec2 uv = vUv - 0.5;
  float t = uProgress;
  float tSq = t * t;

  // --- Dripping: directional noise displacement (gravity = +Y in UV space = down on screen) ---
  // Noise columns: X-dependent, Y-independent → creates vertical drip streaks
  float dripColumns = fbm(vec2(uv.x * 12.0, 0.3)) * 2.0 - 1.0;
  // Finer drip detail
  float dripFine = fbm(vec2(uv.x * 25.0, uv.y * 3.0 + 0.7)) * 2.0 - 1.0;

  // Drip amount — grows aggressively in the second half
  float dripAmount = tSq * 0.22;
  float dripFineAmount = tSq * 0.08;

  // Displace Y (positive = downward in screen space since UV Y is flipped)
  vec2 drippedUv = uv + vec2(0.0, dripColumns * dripAmount + dripFine * dripFineAmount);

  // Add slight X wobble for organic feel
  float xWobble = fbm(vec2(uv.y * 8.0, 0.5)) * 2.0 - 1.0;
  drippedUv.x += xWobble * tSq * 0.03;

  // --- SDF with expansion (arms merge → fills screen) ---
  float d = sdAsterisk(drippedUv);
  float expansion = tSq * 0.55;
  d -= expansion;

  // --- Gooey soft edges ---
  float softness = 0.005 + tSq * 0.06;
  float alpha = 1.0 - smoothstep(-softness, softness, d);

  if (alpha < 0.005) discard;
  gl_FragColor = vec4(uColor, alpha);
}
`;

/** Inner scene: SDF asterisk mesh with gooey + drip shader */
function AsteriskScene({ progressRef, screenX, screenY, fontSize, spanWidth, spanHeight }: AsteriskRevealProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uProgress: { value: 0 },
      uColor: { value: new THREE.Vector3(239 / 255, 68 / 255, 68 / 255) },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  }), []);

  // Orthographic: origin at center, 1 unit = 1 pixel
  const worldX = screenX - size.width / 2;
  const worldY = size.height / 2 - screenY;

  useFrame(() => {
    if (!meshRef.current) return;
    const progress = progressRef.current;
    material.uniforms.uProgress.value = progress;

    meshRef.current.visible = progress > 0.001;

    const t = progress * progress;
    // Use uniform scaling to keep the SDF shape proportional.
    // spanHeight is the span bounding box — the actual glyph ink is smaller.
    const initSize = spanHeight * 0.8;
    const maxScale = fontSize * 1.2 * 80;
    const scale = initSize + t * maxScale;
    meshRef.current.scale.set(scale, scale, 1);
  });

  return (
    <mesh
      ref={meshRef}
      position={[worldX, worldY, 0]}
      visible={false}
      renderOrder={999}
    >
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/** Phase 4 standalone Canvas — separate WebGL context from CanvasMorph */
export function AsteriskReveal(props: AsteriskRevealProps & { visible: boolean }) {
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ opacity: props.visible ? 1 : 0 }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 1, near: 0.1, far: 1000 }}
        gl={{ alpha: true, antialias: false, toneMapping: THREE.NoToneMapping }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <AsteriskScene {...props} />
      </Canvas>
    </div>
  );
}
