import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const vertex = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uBaseBg;

  // Simple noise function
  float noise(in vec2 p) {
    return sin(p.x * 10.0 + uTime) * sin(p.y * 10.0 + uTime) * 0.5 + 0.5;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    
    // Create animated gradient blobs
    vec2 p1 = vec2(0.3 + sin(uTime * 0.2) * 0.1, 0.7 + cos(uTime * 0.15) * 0.1);
    vec2 p2 = vec2(0.7 + cos(uTime * 0.25) * 0.1, 0.3 + sin(uTime * 0.1) * 0.15);
    
    float d1 = length(uv - p1);
    float d2 = length(uv - p2);
    
    float blob1 = smoothstep(0.6, 0.0, d1) * 0.6;
    float blob2 = smoothstep(0.5, 0.0, d2) * 0.5;
    
    // Dynamic themed colors from uniforms
    vec3 color1 = uColor1 * blob1;
    vec3 color2 = uColor2 * blob2;
    vec3 baseBg = uBaseBg;
    
    vec3 finalColor = baseBg + color1 + color2;
    
    // Add ambient vignette
    float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
    finalColor *= vignette;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const ParticleBackground: React.FC<{ theme: string }> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Set up OGL Renderer
    const renderer = new Renderer({ alpha: false, depth: false });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    // Create a screen-tri to run post-processing fragment shader
    const geometry = new Triangle(gl);

    // Teal/Orange colors mapped for WebGL (0.0 to 1.0)
    const color1Val = [0.0, 0.28, 0.32]; // Deeper glowing teal (#004752)
    const color2Val = [0.38, 0.21, 0.06]; // Deeper glowing orange (#61350f)
    const baseBgVal = [0.0, 0.0, 0.0];   // Black background (#000000)

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
        uColor1: { value: color1Val },
        uColor2: { value: color2Val },
        uBaseBg: { value: baseBgVal },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    }
    window.addEventListener('resize', resize);
    resize();

    let animationFrameId: number;
    let time = 0;

    function update() {
      animationFrameId = requestAnimationFrame(update);
      time += 0.01;
      program.uniforms.uTime.value = time;
      renderer.render({ scene: mesh });
    }
    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas);
      }
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none opacity-80"
    />
  );
};