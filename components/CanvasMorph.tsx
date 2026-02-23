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

function ParticleScene({ textureData }: { textureData: any }) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const { positions, targets, colors, offsets, progressObj } = textureData;

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
                uniforms={{
                    uProgress: { value: 0 }
                }}
                transparent={true}
                depthWrite={false}
            />
        </points>
    );
}

export function CanvasMorph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [textureData, setTextureData] = useState<any>(null);
    const lenis = useLenis();

    useEffect(() => {
        if (!textureData) return;

        // Let React finish DOM updates
        let ctx = gsap.context(() => { });

        const anim = gsap.to(textureData.progressObj, {
            value: 1,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => "+=" + window.innerHeight,
                scrub: true,
                onUpdate: (self) => console.log("Progress:", self.progress)
            }
        });

        return () => {
            anim.kill();
        };
    }, [textureData, lenis]);

    useEffect(() => {
        const initSimulation = async () => {
            // Explicitly force the browser to pre-load and await this specific font before canvas drawing.
            // document.fonts.ready only waits for fonts the DOM is currently using, not hidden canvases.
            await document.fonts.load("bold 12px 'DIN Condensed'");

            // 1. Load the Image
            const img = new Image();
            img.src = "/KerenCutout.png";
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const imgCanvas = document.createElement("canvas");
            const imgCtx = imgCanvas.getContext("2d", { willReadFrequently: true });

            const vh = window.innerHeight;
            const vw = window.innerWidth;
            const isMobile = vw < 768;

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

            if (!imgData) return;

            // 2. Draw Text
            const textCanvas = document.createElement("canvas");
            const textCtx = textCanvas.getContext("2d", { willReadFrequently: true });
            textCanvas.width = vw;
            textCanvas.height = vh;

            if (textCtx) {
                const subtitleText = "SENIOR CREATIVE STRATEGIST";

                // Measure KEREN's rendered width at the actual CSS font size
                // Must include tracking-tighter (-0.05em letter-spacing) to match CSS
                const kerenFontSizePx = Math.floor(isMobile ? Math.min(Math.max(112, vw * 0.35), 352) : vw * 0.23);
                textCtx.font = `bold ${kerenFontSizePx}px 'DIN Condensed', Impact, sans-serif`;
                textCtx.textBaseline = "top";
                textCtx.letterSpacing = `${-0.05 * kerenFontSizePx}px`; // tracking-tighter
                const kerenWidth = textCtx.measureText("KEREN").width;
                textCtx.letterSpacing = "0px"; // reset for subtitle

                // Measure subtitle at a reference size, then scale linearly to match KEREN width
                const refSize = 100;
                textCtx.font = `bold ${refSize}px 'DIN Condensed', Impact, sans-serif`;
                const refWidth = textCtx.measureText(subtitleText).width;
                // Font width scales linearly: targetWidth / refWidth = fontSizePx / refSize
                const fontSizePx = refSize * (kerenWidth / refWidth);

                let startX, startY;
                if (isMobile) {
                    startX = 16;
                    const kerenHeight = Math.min(Math.max(112, vw * 0.35), 352) * 0.8;
                    startY = vh * 0.05 + kerenHeight + 8;
                } else {
                    // startX = left edge of grid col 3 => same X as "K" in KEREN
                    // Compensate for different left side bearings between K and S glyphs
                    textCtx.font = `bold ${kerenFontSizePx}px 'DIN Condensed', Impact, sans-serif`;
                    textCtx.letterSpacing = `${-0.05 * kerenFontSizePx}px`;
                    const kerenLeftBearing = textCtx.measureText("KEREN").actualBoundingBoxLeft;
                    textCtx.letterSpacing = "0px";
                    textCtx.font = `bold ${fontSizePx}px 'DIN Condensed', Impact, sans-serif`;
                    const subtitleLeftBearing = textCtx.measureText(subtitleText).actualBoundingBoxLeft;
                    startX = vw * (2 / 24) + (subtitleLeftBearing - kerenLeftBearing);

                    // --- Pixel-perfect BOSHI bottom alignment using measureText ---
                    const boshiFontSizePx = Math.floor(vw * 0.23);
                    const boshiGridTop = 5 * (vw / 24);
                    const boshiLineHeight = boshiFontSizePx * 0.8;
                    const halfLeading = (boshiLineHeight - boshiFontSizePx) / 2;
                    const boshiEmTop = boshiGridTop + halfLeading;

                    textCtx.font = `bold ${boshiFontSizePx}px 'DIN Condensed', Impact, sans-serif`;
                    textCtx.textBaseline = "top";
                    const boshiMetrics = textCtx.measureText("BOSHI");
                    const boshiVisualBottom = boshiEmTop + boshiMetrics.actualBoundingBoxDescent;

                    // Measure subtitle visual height at the computed font size
                    textCtx.font = `bold ${fontSizePx}px 'DIN Condensed', Impact, sans-serif`;
                    const subtitleMetrics = textCtx.measureText(subtitleText);
                    const subtitleVisualHeight = subtitleMetrics.actualBoundingBoxDescent;

                    // Position subtitle so its visual bottom = BOSHI's visual bottom
                    startY = boshiVisualBottom - subtitleVisualHeight;

                    // Verify width match
                    const actualSubtitleWidth = subtitleMetrics.width;
                    console.log('[Alignment Debug]', {
                        vw, vh,
                        kerenFontSizePx, kerenWidth: Math.round(kerenWidth),
                        subtitleFontSizePx: fontSizePx,
                        subtitleWidth: Math.round(actualSubtitleWidth),
                        widthDiff: Math.round(actualSubtitleWidth - kerenWidth),
                        boshiVisualBottom: Math.round(boshiVisualBottom),
                        subtitleBottom: Math.round(startY + subtitleVisualHeight),
                        verticalMatch: Math.abs((startY + subtitleVisualHeight) - boshiVisualBottom) < 1,
                    });
                }

                // Draw with computed font size (no scaling needed)
                textCtx.font = `bold ${fontSizePx}px 'DIN Condensed', Impact, sans-serif`;
                textCtx.textAlign = "left";
                textCtx.textBaseline = "top";

                // Red Asterisk — placed in the margin before startX
                const asteriskWidth = textCtx.measureText("* ").width;
                textCtx.fillStyle = "#ef4444";
                textCtx.fillText("*", startX - asteriskWidth, startY);

                // White Text — "S" starts at startX, "T" ends at startX + kerenWidth
                textCtx.fillStyle = "white";
                textCtx.fillText(subtitleText, startX, startY);
            }

            const textData = textCtx?.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
            if (!textData) return;

            // Extract pixels
            const density = 1; // 1:1 ratio
            const textDensity = 1;

            const startXOffset = Math.floor((vw - targetWidth) / 2);
            const startYOffset = Math.floor(vh - targetHeight + (isMobile ? vh * 0.05 : 0));

            const originPixels: { x: number, y: number, r: number, g: number, b: number }[] = [];
            for (let y = 0; y < imgCanvas.height; y += density) {
                for (let x = 0; x < imgCanvas.width; x += density) {
                    const idx = (y * imgCanvas.width + x) * 4;
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
            for (let y = 0; y < textCanvas.height; y += textDensity) {
                for (let x = 0; x < textCanvas.width; x += textDensity) {
                    const idx = (y * textCanvas.width + x) * 4;
                    if (textData[idx + 3] > 128) {
                        targetPixels.push({
                            x,
                            y,
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

            // Create TypedArrays for WebGL Buffers (Extremely fast and memory efficient)
            const count = shuffledOrigins.length;
            const positions = new Float32Array(count * 3);
            const targets = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            const targetColors = new Float32Array(count * 3);
            const offsets = new Float32Array(count);

            // ThreeJS coordinate system places (0,0) at the absolute center of the screen
            // and Y is inverted (up is positive). We need to map pixel coordinates to WebGL bounds.
            const halfW = vw / 2;
            const halfH = vh / 2;

            for (let i = 0; i < count; i++) {
                const op = shuffledOrigins[i];
                const tp = targetPixels[i % targetPixels.length];

                // Convert CSS pixel coordinates to WebGL orthographic coordinates
                // x goes from -halfW to +halfW
                // y goes from +halfH to -halfH
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

                // Stagger
                let normalizedX = (tp.x - minTextX) / textWidth;
                offsets[i] = normalizedX * 0.55;
            }

            setTextureData({
                positions,
                targets,
                colors,
                targetColors,
                offsets,
                progressObj: { value: 0 }
            });
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
