"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Custom Shader Material that runs directly on the GPU
const vertexShader = `
uniform float uProgress;
attribute vec3 targetPosition;
attribute vec3 aColor;
attribute vec3 aTargetColor;
attribute float aProgressOffset;

varying vec3 vColor;

void main() {
    vColor = aColor;

    // Calculate individual particle progress based on its horizontal offset
    // The smoothstep creates a nice easing curve on the GPU
    float localProgress = clamp((uProgress - aProgressOffset) / (1.0 - aProgressOffset), 0.0, 1.0);
    localProgress = localProgress * localProgress * (3.0 - 2.0 * localProgress); // Smoothstep

    // Interpolate from portrait origin to text target
    vec3 currentPosition = mix(position, targetPosition, localProgress);
    
    // Smoothly blend color from original to exact target pixel color (red asterisk, white text)
    vColor = mix(aColor, aTargetColor, smoothstep(0.5, 1.0, localProgress));

    vec4 modelViewPosition = modelViewMatrix * vec4(currentPosition, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
    
    // Orthographic camera: point size does not scale by distance
    // Using a base size of 2.0 to 3.0 (matches original pixel density look)
    gl_PointSize = mix(2.0, 3.0, localProgress);
}
`;

const fragmentShader = `
varying vec3 vColor;

void main() {
    // Optional: Make particles slightly softer edged by discarding corners
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) {
        discard;
    }

    gl_FragColor = vec4(vColor, 1.0);
}
`;

export interface TextLayout {
    fontSizePx: number;
    startX: number;
    startY: number;
    asteriskWidth: number;
}

export interface CanvasTextureData {
    positions: Float32Array;
    targets: Float32Array;
    colors: Float32Array;
    targetColors: Float32Array;
    offsets: Float32Array;
    progressObj: { value: number };
}

function ParticleScene({ textureData }: { textureData: CanvasTextureData }) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const { positions, targets, colors, offsets, progressObj } = textureData;

    // Stable uniforms object — must not be recreated on re-render
    const uniforms = useMemo(() => ({
        uProgress: { value: 0 }
    }), []);

    // Update uniform every frame
    useFrame(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uProgress.value = progressObj.value;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-targetPosition"
                    args={[targets, 3]}
                    count={targets.length / 3}
                    array={targets}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aColor"
                    args={[colors, 3]}
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aTargetColor"
                    args={[textureData.targetColors, 3]}
                    count={textureData.targetColors.length / 3}
                    array={textureData.targetColors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aProgressOffset"
                    args={[offsets, 1]}
                    count={offsets.length}
                    array={offsets}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
            />
        </points>
    );
}

export function CanvasMorph({ onTextLayout }: {
    onTextLayout?: (layout: TextLayout) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [textureData, setTextureData] = useState<CanvasTextureData | null>(null);
    const lenis = useLenis();

    useEffect(() => {
        if (!textureData) return;
        const heroSection = document.querySelector('[aria-label="Hero"]');
        const triggerEl = heroSection || containerRef.current;

        const anim = gsap.to(textureData.progressObj, {
            value: 1,
            ease: "none",
            scrollTrigger: {
                trigger: triggerEl,
                start: "top top",
                end: () => "+=" + window.innerHeight,
                scrub: true
            }
        });

        return () => {
            anim.kill();
        };
    }, [textureData]);

    useEffect(() => {
        const initSimulation = async () => {
            // Explicitly force the browser to pre-load and await this specific font before canvas drawing.
            // document.fonts.ready only waits for fonts the DOM is currently using, not hidden canvases.
            await document.fonts.load("bold 12px 'DIN Condensed'");

            const vh = window.innerHeight;
            const vw = window.innerWidth;
            const isMobile = vw < 768;

            // 1. Load Image
            const { imgData, targetWidth, targetHeight, imgCanvasWidth, imgCanvasHeight } = await loadImageData(vw, vh, isMobile);
            if (!imgData) return;

            // 2. Load Text
            const { textData, textCanvasWidth, textCanvasHeight, textLayout } = loadTextData(vw, vh, isMobile);
            if (!textData) return;

            // 3. Expose computed text layout to parent
            if (onTextLayout && textLayout) {
                onTextLayout(textLayout);
            }

            // 3. Build WebGL TypedArray Buffers
            const generatedTextureData = buildWebGLBuffers(
                imgData, imgCanvasWidth, imgCanvasHeight, targetWidth, targetHeight,
                textData, textCanvasWidth, textCanvasHeight,
                vw, vh, isMobile
            );

            setTextureData(generatedTextureData);
        };

        // Delay to ensure window bounds are mostly accurate
        setTimeout(initSimulation, 100);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-30">
            {textureData && (
                <Canvas
                    orthographic
                    camera={{ position: [0, 0, 10], zoom: 1, near: 0.1, far: 1000 }}
                    gl={{ alpha: true, antialias: false }} // Disabled antialias for raw pixel performance
                >
                    <ParticleScene textureData={textureData} />
                </Canvas>
            )}
        </div>
    );
}

// ------------------------------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------------------------------

async function loadImageData(vw: number, vh: number, isMobile: boolean) {
    const img = new Image();
    img.src = "/KerenCutout.png";
    await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
    });

    const imgCanvas = document.createElement("canvas");
    const imgCtx = imgCanvas.getContext("2d", { willReadFrequently: true });

    let targetHeight = Math.floor(isMobile ? vh * 0.55 : vh * 0.65);
    let ratio = img.width / img.height;
    let targetWidth = Math.floor(targetHeight * ratio);

    let maxW = Math.floor(isMobile ? vw * 1.2 : vw);
    if (targetWidth > maxW) {
        targetWidth = maxW;
        targetHeight = Math.floor(targetWidth / ratio);
    }

    imgCanvas.width = targetWidth;
    imgCanvas.height = targetHeight;
    imgCtx?.drawImage(img, 0, 0, targetWidth, targetHeight);

    const imgData = imgCtx?.getImageData(0, 0, imgCanvas.width, imgCanvas.height).data;

    return {
        imgData,
        targetWidth,
        targetHeight,
        imgCanvasWidth: imgCanvas.width,
        imgCanvasHeight: imgCanvas.height
    };
}

function loadTextData(vw: number, vh: number, isMobile: boolean): {
    textData: Uint8ClampedArray | undefined;
    textCanvasWidth: number;
    textCanvasHeight: number;
    textLayout: TextLayout | null;
} {
    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d", { willReadFrequently: true });
    textCanvas.width = vw;
    textCanvas.height = vh;

    let textData;
    let textLayout: TextLayout | null = null;

    if (textCtx) {
        const subtitleText = "SENIOR CREATIVE STRATEGIST";

        const kerenFontSizePx = Math.floor(isMobile ? Math.min(Math.max(80, vw * 0.28), 280) : vw * 0.23);
        textCtx.font = `bold ${kerenFontSizePx}px 'DIN Condensed', Impact, sans-serif`;
        textCtx.textBaseline = "top";
        textCtx.letterSpacing = `${-0.05 * kerenFontSizePx}px`;
        const kerenWidth = textCtx.measureText("KEREN").width;
        textCtx.letterSpacing = "0px";

        const refSize = 100;
        textCtx.font = `bold ${refSize}px 'DIN Condensed', Impact, sans-serif`;
        const refWidth = textCtx.measureText(subtitleText).width;
        const fontSizePx = refSize * (kerenWidth / refWidth);

        let startX, startY;
        if (isMobile) {
            startX = 16;
            const kerenHeight = Math.min(Math.max(80, vw * 0.28), 280) * 0.8;
            startY = vh * 0.08 + kerenHeight + 12; // Push subtitle down more on mobile
        } else {
            textCtx.font = `bold ${kerenFontSizePx}px 'DIN Condensed', Impact, sans-serif`;
            textCtx.letterSpacing = `${-0.05 * kerenFontSizePx}px`;
            const kerenLeftBearing = textCtx.measureText("KEREN").actualBoundingBoxLeft;
            textCtx.letterSpacing = "0px";
            textCtx.font = `bold ${fontSizePx}px 'DIN Condensed', Impact, sans-serif`;
            const subtitleLeftBearing = textCtx.measureText(subtitleText).actualBoundingBoxLeft;
            startX = vw * (2 / 24) + (subtitleLeftBearing - kerenLeftBearing);

            const boshiFontSizePx = Math.floor(vw * 0.23);
            const boshiGridTop = 5 * (vw / 24);
            const boshiLineHeight = boshiFontSizePx * 0.8;
            const halfLeading = (boshiLineHeight - boshiFontSizePx) / 2;
            const boshiEmTop = boshiGridTop + halfLeading;

            textCtx.font = `bold ${boshiFontSizePx}px 'DIN Condensed', Impact, sans-serif`;
            textCtx.textBaseline = "top";
            const boshiMetrics = textCtx.measureText("BOSHI");
            const boshiVisualBottom = boshiEmTop + boshiMetrics.actualBoundingBoxDescent;

            textCtx.font = `bold ${fontSizePx}px 'DIN Condensed', Impact, sans-serif`;
            const subtitleMetrics = textCtx.measureText(subtitleText);
            const subtitleVisualHeight = subtitleMetrics.actualBoundingBoxDescent;

            startY = boshiVisualBottom - subtitleVisualHeight;
        }

        textCtx.font = `bold ${fontSizePx}px 'DIN Condensed', Impact, sans-serif`;
        textCtx.textAlign = "left";
        textCtx.textBaseline = "top";

        const asteriskWidth = textCtx.measureText("* ").width;

        textLayout = { fontSizePx, startX, startY, asteriskWidth };

        textCtx.fillStyle = "#ef4444";
        textCtx.fillText("*", startX - asteriskWidth, startY);

        textCtx.fillStyle = "white";
        textCtx.fillText(subtitleText, startX, startY);
    }

    textData = textCtx?.getImageData(0, 0, textCanvas.width, textCanvas.height).data;

    return {
        textData,
        textCanvasWidth: textCanvas.width,
        textCanvasHeight: textCanvas.height,
        textLayout
    };
}

function buildWebGLBuffers(
    imgData: Uint8ClampedArray, imgW: number, imgH: number, targetW: number, targetH: number,
    textData: Uint8ClampedArray, textW: number, textH: number,
    vw: number, vh: number, isMobile: boolean
): CanvasTextureData {

    const density = 1;
    const textDensity = 1;

    const startXOffset = Math.floor((vw - targetW) / 2);
    const startYOffset = Math.floor(vh - targetH + (isMobile ? vh * 0.15 : 0)); // Lower the portrait on mobile

    const originPixels: { x: number, y: number, r: number, g: number, b: number }[] = [];
    for (let y = 0; y < imgH; y += density) {
        for (let x = 0; x < imgW; x += density) {
            const idx = (y * imgW + x) * 4;
            if (imgData[idx + 3] > 128) {
                originPixels.push({
                    x: startXOffset + x,
                    y: startYOffset + y,
                    r: imgData[idx] / 255.0,
                    g: imgData[idx + 1] / 255.0,
                    b: imgData[idx + 2] / 255.0
                });
            }
        }
    }

    const targetPixels: { x: number, y: number, r: number, g: number, b: number }[] = [];
    for (let y = 0; y < textH; y += textDensity) {
        for (let x = 0; x < textW; x += textDensity) {
            const idx = (y * textW + x) * 4;
            if (textData[idx + 3] > 128) {
                targetPixels.push({
                    x, y,
                    r: textData[idx] / 255.0,
                    g: textData[idx + 1] / 255.0,
                    b: textData[idx + 2] / 255.0
                });
            }
        }
    }

    targetPixels.sort((a, b) => a.x - b.x);
    const textWidth = targetPixels[targetPixels.length - 1].x - targetPixels[0].x;
    const minTextX = targetPixels[0].x;

    const shuffledOrigins = [...originPixels].sort(() => Math.random() - 0.5);

    const count = shuffledOrigins.length;
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const targetColors = new Float32Array(count * 3);
    const offsets = new Float32Array(count);

    const halfW = vw / 2;
    const halfH = vh / 2;

    for (let i = 0; i < count; i++) {
        const op = shuffledOrigins[i];
        const tp = targetPixels[i % targetPixels.length];

        const webglOx = op.x - halfW;
        const webglOy = halfH - op.y;

        const webglTx = tp.x - halfW;
        const webglTy = halfH - tp.y;

        positions[i * 3] = webglOx;
        positions[i * 3 + 1] = webglOy;
        positions[i * 3 + 2] = 0;

        targets[i * 3] = webglTx;
        targets[i * 3 + 1] = webglTy;
        targets[i * 3 + 2] = 0;

        colors[i * 3] = op.r;
        colors[i * 3 + 1] = op.g;
        colors[i * 3 + 2] = op.b;

        targetColors[i * 3] = tp.r;
        targetColors[i * 3 + 1] = tp.g;
        targetColors[i * 3 + 2] = tp.b;

        let normalizedX = (tp.x - minTextX) / textWidth;
        offsets[i] = normalizedX * 0.55;
    }

    return {
        positions,
        targets,
        colors,
        targetColors,
        offsets,
        progressObj: { value: 0 }
    };
}
