"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The hero's signature 3D scene — Zetta Metrics' tagline as a living system.
 *
 *  - A volumetric particle "Z" (with real depth) turns slowly in space.
 *  - Two tilted orbit rings revolve around it, echoing the logo swoosh.
 *  - Streams of particles pour in continuously from the surrounding chaos and
 *    get absorbed into the Z: disorder becoming order, never finished.
 *  - Light pulses sweep through the Z; every particle twinkles; the whole
 *    form leans toward the cursor and parts around it.
 *
 * Twinkle, pulses, cursor push and idle drift run on the GPU (custom shader);
 * the CPU only advances the ring and stream particles. Separate palettes and
 * blending for dark and light themes. Guardrails: capped pixel ratio, fewer
 * particles on small screens, paused off-screen / in hidden tabs, and a
 * single still frame for reduced-motion visitors.
 */

const VERT = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aPhase;
  attribute float aKind;      // 0 = Z body, 1 = ring, 2 = stream
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec3 uMouse;
  uniform float uMouseStrength;
  uniform float uPulseSpeed;
  uniform float uPulseGain;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    // idle drift (Z body only; rings, streams and dust move on the CPU)
    float body = 1.0 - step(0.5, aKind);
    p.x += body * sin(uTime * 0.7 + aPhase) * 0.018;
    p.y += body * cos(uTime * 0.55 + aPhase * 1.7) * 0.018;
    p.z += body * sin(uTime * 0.45 + aPhase * 2.3) * 0.03;

    vec4 world = modelMatrix * vec4(p, 1.0);

    // part around the cursor (world space, xy plane)
    vec2 d = world.xy - uMouse.xy;
    float dist = length(d);
    float push = smoothstep(0.55, 0.0, dist) * uMouseStrength;
    world.xy += (d / max(dist, 0.0001)) * push * 0.28;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    // light pulse sweeping diagonally through the Z body
    float front = mod(uTime * uPulseSpeed, 7.0) - 3.5;
    float along = position.x * 0.55 - position.y * 0.85;
    float wave = body * exp(-pow(along - front, 2.0) * 4.0);

    float twinkle = 0.6 + 0.4 * sin(uTime * (1.4 + aPhase * 0.25) + aPhase * 6.2831);
    // dust (kind 3) stays faint in the background
    float dust = step(2.5, aKind);
    vAlpha = mix(twinkle + wave * 0.4, 0.22 + 0.18 * twinkle, dust);
    vColor = aColor + wave * uPulseGain;

    float depthScale = 7.0 / max(-mv.z, 0.1);
    gl_PointSize = min(uSize * aSize * uPixelRatio * depthScale * (1.0 + wave * 0.35 + push * 0.5), 22.0 * uPixelRatio);
  }
`;

const FRAG = /* glsl */ `
  uniform float uOpacity;
  uniform float uSoft;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    // bright core + soft halo (halo tuned per theme via uSoft)
    float core = smoothstep(0.22, 0.0, d);
    float halo = pow(smoothstep(0.5, 0.0, d), uSoft);
    float a = clamp(core * 0.9 + halo * 0.55, 0.0, 1.0);
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`;

// The scene always renders on a dark surface: the page itself in dark mode,
// and a dedicated dark "stage" panel in light mode (see .hero-stage). Glowing
// particles need darkness to read clearly, so there is one tuned palette.
const PAL = { a: "#27d3c8", b: "#6f7dff", c: "#d9fbff", opacity: 0.5, soft: 2.2, size: 11, link: "#2fe1d6", linkOpacity: 0.14, pulse: 0.2 };

/** Sample points inside a bold "Z", with depth so it reads as a solid in 3D. */
function sampleZ(count: number): Float32Array {
  const size = 260;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.font = `900 ${size * 0.98}px "Arial Black", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Z", size / 2, size / 2 + size * 0.04);
  const data = ctx.getImageData(0, 0, size, size).data;
  const pts: number[] = [];
  for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) if (data[(y * size + x) * 4 + 3] > 150) pts.push(x, y);
  const out = new Float32Array(count * 3);
  const n = pts.length / 2;
  for (let i = 0; i < count; i++) {
    const k = Math.floor(Math.random() * n) * 2;
    out[i * 3] = (pts[k] / size - 0.5) * 3.7;
    out[i * 3 + 1] = -(pts[k + 1] / size - 0.5) * 3.7;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.6; // real thickness
  }
  return out;
}

function randomCloudPoint(out: Float32Array, i3: number, scale = 1) {
  // somewhere on a wide shell around the Z
  const a = Math.random() * Math.PI * 2;
  const r = (4.2 + Math.random() * 3.2) * scale;
  out[i3] = Math.cos(a) * r * 1.35;
  out[i3 + 1] = Math.sin(a) * r * 0.7;
  out[i3 + 2] = (Math.random() - 0.5) * 5;
}

export default function ParticleZ({ reduceMotion }: { reduceMotion: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the hero keeps its glow background.
    }
    const small = window.innerWidth < 768;
    const Z_COUNT = small ? 1700 : 3400;
    const RING_COUNT = small ? 360 : 700; // per ring
    const STREAM_COUNT = small ? 200 : 420; // comet heads
    const TRAIL = 4; // points per comet (head + fading tail)
    const STREAM_SLOTS = STREAM_COUNT * TRAIL;
    const DUST_COUNT = small ? 260 : 520; // faint deep-space field for depth
    const TOTAL = Z_COUNT + RING_COUNT * 2 + STREAM_SLOTS + DUST_COUNT;
    const STREAM_BASE = Z_COUNT + RING_COUNT * 2;
    const DUST_BASE = STREAM_BASE + STREAM_SLOTS;

    const dpr = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 7.6);
    const group = new THREE.Group();
    scene.add(group);

    // ---------- buffers ----------
    const positions = new Float32Array(TOTAL * 3);
    const colors = new Float32Array(TOTAL * 3);
    const sizes = new Float32Array(TOTAL);
    const phases = new Float32Array(TOTAL);
    const kinds = new Float32Array(TOTAL);

    const zTarget = sampleZ(Z_COUNT);
    const zStart = new Float32Array(Z_COUNT * 3);
    for (let i = 0; i < Z_COUNT; i++) randomCloudPoint(zStart, i * 3);

    // rings: angle + radius per particle, advanced every frame
    const ringAngle = new Float32Array(RING_COUNT * 2);
    const ringRadius = new Float32Array(RING_COUNT * 2);
    const ringDef = [
      { tiltZ: -0.55, tiltX: 1.15, speed: 0.22, r: 2.5 },
      { tiltZ: 0.7, tiltX: 1.3, speed: -0.16, r: 2.85 },
    ];
    for (let k = 0; k < RING_COUNT * 2; k++) {
      ringAngle[k] = Math.random() * Math.PI * 2;
      ringRadius[k] = ringDef[k < RING_COUNT ? 0 : 1].r + (Math.random() - 0.5) * 0.09;
    }

    // streams: start point, target point in the Z, progress, speed
    const sStart = new Float32Array(STREAM_COUNT * 3);
    const sTarget = new Uint32Array(STREAM_COUNT);
    const sProg = new Float32Array(STREAM_COUNT);
    const sSpeed = new Float32Array(STREAM_COUNT);
    const resetStream = (s: number, initial: boolean) => {
      randomCloudPoint(sStart, s * 3, 0.62);
      sTarget[s] = Math.floor(Math.random() * Z_COUNT);
      sProg[s] = initial ? Math.random() : 0;
      sSpeed[s] = 0.18 + Math.random() * 0.22;
    };
    for (let s = 0; s < STREAM_COUNT; s++) resetStream(s, true);

    for (let i = 0; i < TOTAL; i++) {
      phases[i] = Math.random() * 10;
      if (i < Z_COUNT) {
        kinds[i] = 0;
        sizes[i] = 0.55 + Math.random() * 0.75;
      } else if (i < STREAM_BASE) {
        kinds[i] = 1;
        sizes[i] = 0.4 + Math.random() * 0.55;
      } else if (i < DUST_BASE) {
        kinds[i] = 2;
        sizes[i] = 0; // set per frame
      } else {
        kinds[i] = 3;
        sizes[i] = 0.35 + Math.random() * 0.6;
        positions[i * 3] = (Math.random() - 0.5) * 13;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
        positions[i * 3 + 2] = -1.5 - Math.random() * 5.5;
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geom.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geom.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geom.setAttribute("aKind", new THREE.BufferAttribute(kinds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: dpr },
      uSize: { value: 12 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uMouseStrength: { value: 0 },
      uPulseSpeed: { value: 1.25 },
      uPulseGain: { value: 0.35 },
      uOpacity: { value: 1 },
      uSoft: { value: 1.8 },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    const points = new THREE.Points(geom, mat);
    points.frustumCulled = false;
    group.add(points);

    // faint network inside the Z (static pairs of nearby body particles)
    const pairs: number[] = [];
    const LINK = 0.17;
    for (let i = 0; i < Z_COUNT && pairs.length < 1400; i += 4) {
      for (let j = i + 5; j < Math.min(Z_COUNT, i + 400); j += 3) {
        const dx = zTarget[i * 3] - zTarget[j * 3], dy = zTarget[i * 3 + 1] - zTarget[j * 3 + 1], dz = zTarget[i * 3 + 2] - zTarget[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < LINK * LINK) {
          pairs.push(i, j);
          break;
        }
      }
    }
    const linkPos = new Float32Array((pairs.length / 2) * 6);
    const linkGeom = new THREE.BufferGeometry();
    linkGeom.setAttribute("position", new THREE.BufferAttribute(linkPos, 3));
    const linkMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
    const links = new THREE.LineSegments(linkGeom, linkMat);
    links.frustumCulled = false;
    group.add(links);

    // ---------- colors ----------
    const pal = PAL;
    {
      const A = new THREE.Color(pal.a), B = new THREE.Color(pal.b), C = new THREE.Color(pal.c);
      const tmp = new THREE.Color();
      for (let i = 0; i < TOTAL; i++) {
        if (i < Z_COUNT) {
          // gradient across the Z (teal -> indigo), a few bright sparks
          const t = Math.min(Math.max((zTarget[i * 3] + 1.85) / 3.7 * 0.8 + (zTarget[i * 3 + 1] + 1.85) / 3.7 * 0.2, 0), 1);
          tmp.copy(A).lerp(B, t * 0.85);
          if (Math.random() < 0.08) tmp.lerp(C, 0.7);
        } else if (i < STREAM_BASE) {
          tmp.copy(B).lerp(C, Math.random() * 0.5);
        } else if (i < DUST_BASE) {
          tmp.copy(C).lerp(A, Math.random() * 0.3); // comets: bright
        } else {
          tmp.copy(B).lerp(A, Math.random());
        }
        // THREE.Color is linear internally; the custom shader writes colors
        // straight to the screen, so hand it sRGB values (true brand colors).
        tmp.convertLinearToSRGB();
        colors[i * 3] = tmp.r;
        colors[i * 3 + 1] = tmp.g;
        colors[i * 3 + 2] = tmp.b;
      }
      geom.attributes.aColor.needsUpdate = true;
      mat.blending = THREE.AdditiveBlending;
      uniforms.uOpacity.value = pal.opacity;
      uniforms.uSoft.value = pal.soft;
      uniforms.uSize.value = pal.size * (small ? 0.9 : 1);
      uniforms.uPulseGain.value = pal.pulse;
      linkMat.color = new THREE.Color(pal.link);
    }

    // ---------- sizing ----------
    let baseZ = 7.6;
    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      baseZ = w / h < 0.95 ? 10 : 7.6;
      camera.position.z = baseZ;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // ---------- pointer ----------
    const ndc = new THREE.Vector2(0, 0);
    let pointerIn = false;
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      pointerIn = Math.abs(ndc.x) <= 1.2 && Math.abs(ndc.y) <= 1.2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    const lean = new THREE.Vector2();
    const tmpV = new THREE.Vector3();

    // ---------- animation ----------
    const INTRO = 2.6; // seconds for the Z to first assemble
    const STILL_T = 30; // time used for the reduced-motion still frame
    const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
    let last = 0;
    let assembled = false;

    function frame(t: number) {
      const dt = last ? Math.min(t - last, 0.05) : 0.016;
      last = t;
      uniforms.uTime.value = t;

      // Z body: assemble from the cloud during the intro, then hold (GPU animates)
      const m = reduceMotion ? 1 : easeOut((t - 0.2) / INTRO);
      if (!assembled || m < 1) {
        for (let i = 0; i < Z_COUNT; i++) {
          const i3 = i * 3;
          // staggered arrival so it builds up rather than snapping
          const mi = Math.min(Math.max(m * 1.35 - (phases[i] / 10) * 0.35, 0), 1);
          positions[i3] = zStart[i3] + (zTarget[i3] - zStart[i3]) * mi;
          positions[i3 + 1] = zStart[i3 + 1] + (zTarget[i3 + 1] - zStart[i3 + 1]) * mi;
          positions[i3 + 2] = zStart[i3 + 2] + (zTarget[i3 + 2] - zStart[i3 + 2]) * mi;
        }
        // once fully settled (every staggered particle has arrived), stop rewriting
        if (m >= 1) assembled = true;
      }

      // rings revolve
      for (let k = 0; k < RING_COUNT * 2; k++) {
        const def = ringDef[k < RING_COUNT ? 0 : 1];
        if (!reduceMotion) ringAngle[k] += def.speed * dt * (0.85 + (phases[Z_COUNT + k] % 1) * 0.3);
        const a = ringAngle[k], r = ringRadius[k];
        let x = Math.cos(a) * r, y = Math.sin(a) * r * 0.26, z = Math.sin(a) * r;
        // tilt: around X then Z
        const cx = Math.cos(def.tiltX), sx = Math.sin(def.tiltX);
        const y1 = y * cx - z * sx, z1 = y * sx + z * cx;
        y = y1;
        z = z1;
        const cz = Math.cos(def.tiltZ), sz = Math.sin(def.tiltZ);
        const x2 = x * cz - y * sz, y2 = x * sz + y * cz;
        x = x2;
        y = y2;
        const i3 = (Z_COUNT + k) * 3;
        const fade = reduceMotion ? 1 : easeOut((t - 0.8) / 1.5);
        positions[i3] = x * fade;
        positions[i3 + 1] = y * fade;
        positions[i3 + 2] = z * fade * 0.5;
      }

      // streams pour in from the chaos as comets and get absorbed into the Z
      for (let c = 0; c < STREAM_COUNT; c++) {
        if (!reduceMotion) {
          sProg[c] += sSpeed[c] * dt;
          if (sProg[c] >= 1) resetStream(c, false);
        }
        const t3 = sTarget[c] * 3, s3 = c * 3;
        // curved path: bow the midpoint sideways for a swirling approach
        const mx = (sStart[s3] + zTarget[t3]) * 0.5 - sStart[s3 + 1] * 0.35;
        const my = (sStart[s3 + 1] + zTarget[t3 + 1]) * 0.5 + sStart[s3] * 0.2;
        for (let j = 0; j < TRAIL; j++) {
          const p = Math.max(sProg[c] - j * 0.045, 0);
          const e = p * p * (3 - 2 * p);
          const inv = 1 - e;
          const slot = STREAM_BASE + c * TRAIL + j, i3 = slot * 3;
          positions[i3] = inv * inv * sStart[s3] + 2 * inv * e * mx + e * e * zTarget[t3];
          positions[i3 + 1] = inv * inv * sStart[s3 + 1] + 2 * inv * e * my + e * e * zTarget[t3 + 1];
          positions[i3 + 2] = inv * inv * sStart[s3 + 2] + e * e * zTarget[t3 + 2];
          // head brightest, tail tapering; fade in at birth, out on absorption
          const life = Math.sin(Math.PI * Math.min(sProg[c] * 1.08, 1));
          sizes[slot] = (reduceMotion && j > 0 ? 0 : 1) * life * (1.7 - j * 0.38);
        }
      }
      geom.attributes.position.needsUpdate = true;
      geom.attributes.aSize.needsUpdate = true;

      // network links follow the body and fade in once it's assembled
      for (let p = 0, l = 0; p < pairs.length; p += 2, l += 6) {
        const a = pairs[p] * 3, b = pairs[p + 1] * 3;
        linkPos[l] = positions[a]; linkPos[l + 1] = positions[a + 1]; linkPos[l + 2] = positions[a + 2];
        linkPos[l + 3] = positions[b]; linkPos[l + 4] = positions[b + 1]; linkPos[l + 5] = positions[b + 2];
      }
      linkGeom.attributes.position.needsUpdate = true;
      linkMat.opacity = Math.max(0, m - 0.7) / 0.3 * pal.linkOpacity * (0.75 + 0.25 * Math.sin(t * 1.3));

      // slow turn in space + lean toward the cursor
      lean.x += ((pointerIn ? ndc.x : 0) - lean.x) * 0.05;
      lean.y += ((pointerIn ? ndc.y : 0) - lean.y) * 0.05;
      // scroll: as the hero leaves, push into the Z while it turns and opens up
      const sc = reduceMotion ? 0 : Math.min(Math.max(window.scrollY / (window.innerHeight * 0.9), 0), 1);
      group.rotation.y = Math.sin(t * 0.32) * 0.55 + lean.x * 0.35 + sc * 1.3;
      group.rotation.x = Math.sin(t * 0.21) * 0.12 - lean.y * 0.22 - sc * 0.25;
      group.rotation.z = Math.sin(t * 0.17) * 0.04;
      group.position.y = Math.sin(t * 0.6) * 0.05;
      group.scale.setScalar(1 + sc * 0.3);

      // camera: cinematic fly-in during the intro, depth parallax with the
      // cursor (near and far layers shift by different amounts), dolly on scroll
      const fly = reduceMotion ? 1 : easeOut(t / (INTRO * 1.25));
      camera.position.z = baseZ + (1 - fly) * 4.5 - sc * 1.6;
      camera.position.x = lean.x * 0.55;
      camera.position.y = lean.y * 0.35;
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();

      // cursor in world space (z=0 plane) for the shader's parting effect
      tmpV.set(ndc.x, ndc.y, 0.5).unproject(camera).sub(camera.position).normalize();
      const dist = -camera.position.z / tmpV.z;
      uniforms.uMouse.value.set(camera.position.x + tmpV.x * dist, camera.position.y + tmpV.y * dist, 0);
      uniforms.uMouseStrength.value += ((pointerIn && !reduceMotion ? 1 : 0) - uniforms.uMouseStrength.value) * 0.08;

      renderer.render(scene, camera);
    }

    // ---------- loop control ----------
    let raf = 0;
    let onScreen = true;
    const t0 = performance.now();
    const loop = (now: number) => {
      frame((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (!raf && !reduceMotion && onScreen && document.visibilityState === "visible") {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };
    const stopLoop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) startLoop();
      else stopLoop();
    });
    io.observe(host);
    const onVis = () => (document.visibilityState === "visible" ? startLoop() : stopLoop());
    document.addEventListener("visibilitychange", onVis);

    if (reduceMotion) frame(STILL_T);
    else startLoop();

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      geom.dispose();
      linkGeom.dispose();
      mat.dispose();
      linkMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduceMotion]);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
