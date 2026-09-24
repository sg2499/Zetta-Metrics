"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The hero's signature 3D moment. Particles start as scattered chaos (the
 * manual work), then converge into the Zetta "Z" wrapped in an orbit ring and
 * link up into a network (the intelligent workflow). They drift gently, lean
 * with the cursor in 3D, and part around the pointer.
 *
 * Performance guardrails: pixel ratio capped, fewer particles on small
 * screens, rendering paused whenever the canvas is off-screen or the tab is
 * hidden, and a single still frame (no loop) for reduced-motion visitors.
 */

const RING_SHARE = 0.26;
const LINK_DIST = 0.2;
const MAX_LINKS = 900;

function sampleZ(count: number): Float32Array {
  const size = 220;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.font = `900 ${size * 0.95}px Manrope, Arial Black, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Z", size / 2, size / 2 + size * 0.04);
  const data = ctx.getImageData(0, 0, size, size).data;
  const pts: number[] = [];
  for (let y = 0; y < size; y += 2) for (let x = 0; x < size; x += 2) if (data[(y * size + x) * 4 + 3] > 140) pts.push(x, y);
  const out = new Float32Array(count * 3);
  const n = pts.length / 2;
  for (let i = 0; i < count; i++) {
    const k = Math.floor(Math.random() * n) * 2;
    out[i * 3] = (pts[k] / size - 0.5) * 3.1 + (Math.random() - 0.5) * 0.03;
    out[i * 3 + 1] = -(pts[k + 1] / size - 0.5) * 3.1 + (Math.random() - 0.5) * 0.03;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
  }
  return out;
}

function makeSprite(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.75)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
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
      return; // No WebGL: the hero keeps its gradient background.
    }
    const small = window.innerWidth < 768;
    const COUNT = small ? 1300 : 2600;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    const group = new THREE.Group();
    scene.add(group);

    // Targets: most particles fill the Z, the rest trace a tilted orbit ring.
    const zCount = Math.floor(COUNT * (1 - RING_SHARE));
    const zPts = sampleZ(zCount);
    const target = new Float32Array(COUNT * 3);
    target.set(zPts);
    for (let i = zCount; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.25 + (Math.random() - 0.5) * 0.08;
      const x = Math.cos(a) * r, y = Math.sin(a) * r * 0.42, z = Math.sin(a) * r * 0.55;
      // tilt the ring like the logo swoosh
      const tilt = -0.5;
      target[i * 3] = x * Math.cos(tilt) - y * Math.sin(tilt);
      target[i * 3 + 1] = x * Math.sin(tilt) + y * Math.cos(tilt);
      target[i * 3 + 2] = z;
    }

    // Chaos: a wide, shallow cloud.
    const chaos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      chaos[i * 3] = (Math.random() - 0.5) * 11;
      chaos[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      chaos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    const phase = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) phase[i] = Math.random() * Math.PI * 2;

    const positions = new Float32Array(COUNT * 3);
    const offset = new Float32Array(COUNT * 3); // cursor displacement (eased)
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const colors = new Float32Array(COUNT * 3);
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const sprite = makeSprite();
    const mat = new THREE.PointsMaterial({
      size: small ? 0.055 : 0.05,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geom, mat);
    group.add(points);

    // Network links between nearby Z particles (fade in as order forms).
    const pairs: number[] = [];
    for (let i = 0; i < zCount && pairs.length < MAX_LINKS * 2; i += 3) {
      for (let j = i + 3; j < zCount; j += 7) {
        const dx = target[i * 3] - target[j * 3], dy = target[i * 3 + 1] - target[j * 3 + 1];
        if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) {
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
    group.add(links);

    // Theme-aware palette.
    const applyTheme = () => {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      const a = new THREE.Color(light ? "#0a9089" : "#2fe1d6");
      const b = new THREE.Color(light ? "#4f5fd9" : "#7a8fff");
      const s = new THREE.Color(light ? "#334155" : "#e6edf5");
      for (let i = 0; i < COUNT; i++) {
        const t = i >= zCount ? 0.85 : (target[i * 3] + 1.6) / 3.2; // gradient left→right across the Z
        const col = i >= zCount ? b.clone().lerp(s, Math.random() * 0.4) : a.clone().lerp(b, Math.max(0, t - 0.25) * 0.8).lerp(s, Math.random() * 0.18);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }
      geom.attributes.color.needsUpdate = true;
      mat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      mat.opacity = light ? 0.9 : 1;
      mat.needsUpdate = true;
      linkMat.color = new THREE.Color(light ? "#0a9089" : "#2fe1d6");
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Sizing.
    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the Z fully in frame on narrow canvases
      camera.position.z = w / h < 0.9 ? 9.5 : 7.2;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Pointer (normalized device coords over the canvas).
    const mouse = new THREE.Vector2(9, 9);
    const tiltTarget = new THREE.Vector2();
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      tiltTarget.set(mouse.x, mouse.y);
    };
    const onLeave = () => {
      mouse.set(9, 9);
      tiltTarget.set(0, 0);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const start = performance.now();
    const CONVERGE_MS = 2600;
    const ease = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 4);
    const mouseWorld = new THREE.Vector3();

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      const m = reduceMotion ? 1 : ease((now - start - 250) / CONVERGE_MS);
      // scroll: as the hero leaves, the Z loosens back toward the cloud a little
      const sc = Math.min(Math.max(window.scrollY / (window.innerHeight * 1.1), 0), 1);
      const order = m * (1 - sc * 0.55);

      // cursor in world space on the z=0 plane
      mouseWorld.set(mouse.x, mouse.y, 0.5).unproject(camera);
      const dir = mouseWorld.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      const mx = camera.position.x + dir.x * dist, my = camera.position.y + dir.y * dist;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const wob = reduceMotion ? 0 : 0.035 + (1 - order) * 0.25;
        const px = chaos[i3] + (target[i3] - chaos[i3]) * order + Math.sin(t * 0.7 + phase[i]) * wob;
        const py = chaos[i3 + 1] + (target[i3 + 1] - chaos[i3 + 1]) * order + Math.cos(t * 0.6 + phase[i]) * wob;
        const pz = chaos[i3 + 2] + (target[i3 + 2] - chaos[i3 + 2]) * order;

        // repel from cursor
        let ox = 0, oy = 0;
        if (!reduceMotion) {
          const dx = px - mx, dy = py - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < 0.16) {
            const f = (0.16 - d2) / 0.16;
            const inv = 1 / Math.sqrt(d2 + 0.0001);
            ox = dx * inv * f * 0.22;
            oy = dy * inv * f * 0.22;
          }
        }
        offset[i3] += (ox - offset[i3]) * 0.12;
        offset[i3 + 1] += (oy - offset[i3 + 1]) * 0.12;
        positions[i3] = px + offset[i3];
        positions[i3 + 1] = py + offset[i3 + 1];
        positions[i3 + 2] = pz;
      }
      geom.attributes.position.needsUpdate = true;

      for (let p = 0, l = 0; p < pairs.length; p += 2, l += 6) {
        const a = pairs[p] * 3, b = pairs[p + 1] * 3;
        linkPos[l] = positions[a]; linkPos[l + 1] = positions[a + 1]; linkPos[l + 2] = positions[a + 2];
        linkPos[l + 3] = positions[b]; linkPos[l + 4] = positions[b + 1]; linkPos[l + 5] = positions[b + 2];
      }
      linkGeom.attributes.position.needsUpdate = true;
      linkMat.opacity = Math.max(0, order - 0.6) * 0.55;

      // gentle 3D lean toward the cursor + slow idle sway
      const sway = reduceMotion ? 0 : Math.sin(t * 0.25) * 0.18;
      group.rotation.y += (tiltTarget.x * 0.35 + sway - group.rotation.y) * 0.05;
      group.rotation.x += (-tiltTarget.y * 0.22 - group.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    // Loop control: only while visible on screen and tab visible.
    let raf = 0;
    let onScreen = true;
    const loop = (now: number) => {
      frame(now);
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (!raf && !reduceMotion && onScreen && document.visibilityState === "visible") raf = requestAnimationFrame(loop);
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

    if (reduceMotion) frame(performance.now() + CONVERGE_MS);
    else startLoop();
    // re-render the still frame when the theme changes under reduced motion
    const stillObserver = reduceMotion ? new MutationObserver(() => frame(performance.now() + CONVERGE_MS)) : null;
    stillObserver?.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      stillObserver?.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      geom.dispose();
      linkGeom.dispose();
      mat.dispose();
      linkMat.dispose();
      sprite.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduceMotion]);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
