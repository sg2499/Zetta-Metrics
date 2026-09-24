"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/**
 * The hero's 3D centerpiece: a solid, glossy, beveled Zetta "Z" lit like a
 * product render — teal face, deep indigo sides, clearcoat, a subtle
 * iridescent sheen and real reflections — orbited by a thin ring and small
 * glowing "workflow" nodes. Solid lit geometry reads crisply on light and
 * dark backgrounds alike (unlike glowing particles), so no backing panel.
 *
 * Motion: gentle float and turn, orbiting nodes, lean toward the cursor,
 * and a turn as the hero scrolls away. With reduced motion the scene keeps
 * only slow, small ambient movement (no cursor lean or scroll turn), so it
 * is calm but never a dead image. Rendering pauses off-screen and in hidden
 * tabs.
 */

function zShape(): THREE.Shape {
  // A bold geometric Z (unit ~2 wide), slightly slanted diagonal like the logo.
  const s = new THREE.Shape();
  s.moveTo(-1.0, 1.0);
  s.lineTo(1.0, 1.0);
  s.lineTo(1.0, 0.58);
  s.lineTo(-0.22, -0.58);
  s.lineTo(1.04, -0.58);
  s.lineTo(1.04, -1.0);
  s.lineTo(-1.04, -1.0);
  s.lineTo(-1.04, -0.58);
  s.lineTo(0.18, 0.58);
  s.lineTo(-1.0, 0.58);
  s.closePath();
  return s;
}

export default function SolidZ({ reduceMotion }: { reduceMotion: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the hero keeps its glow + shadow backdrop.
    }
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const rig = new THREE.Group(); // cursor / scroll lean
    scene.add(rig);
    const floater = new THREE.Group(); // idle float + turn
    rig.add(floater);

    // ---- the Z ----
    const geo = new THREE.ExtrudeGeometry(zShape(), {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.09,
      bevelSegments: 8,
      curveSegments: 12,
    });
    geo.center();
    // Brand gradient baked into vertex colors: faces run bright teal (top)
    // to deep teal (bottom); the extruded sides run indigo to deep indigo.
    {
      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const pos = geo.attributes.position;
      const cols = new Float32Array(pos.count * 3);
      const topFace = new THREE.Color("#35e6da"), botFace = new THREE.Color("#067a73");
      const topSide = new THREE.Color("#5a63f0"), botSide = new THREE.Color("#1d1f7a");
      const faceCount = geo.groups[0].count; // group 0 = front/back caps, 1 = sides
      const tmp = new THREE.Color();
      const index = geo.index;
      const isFace = new Uint8Array(pos.count);
      for (let k = 0; k < faceCount; k++) isFace[index ? index.getX(k) : k] = 1;
      for (let v = 0; v < pos.count; v++) {
        const tY = (pos.getY(v) - bb.min.y) / (bb.max.y - bb.min.y);
        if (isFace[v]) tmp.copy(botFace).lerp(topFace, tY);
        else tmp.copy(botSide).lerp(topSide, tY);
        cols[v * 3] = tmp.r;
        cols[v * 3 + 1] = tmp.g;
        cols[v * 3 + 2] = tmp.b;
      }
      geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
    }
    // Deep glossy teal with real reflections and a light iridescent sheen.
    const face = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      vertexColors: true,
      metalness: 0.6,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      iridescence: 0.3,
      iridescenceIOR: 1.4,
      iridescenceThicknessRange: [200, 480],
      envMapIntensity: 1.7,
    });
    const side = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      vertexColors: true,
      metalness: 0.7,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.1,
    });
    const z = new THREE.Mesh(geo, [face, side]);
    z.scale.setScalar(1.2);
    floater.add(z);

    // ---- lights: key, teal rim, indigo rim ----
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 4, 6);
    scene.add(key);
    const rimA = new THREE.PointLight(0x2fe1d6, 26, 20);
    rimA.position.set(-4, 2, 2);
    scene.add(rimA);
    const rimB = new THREE.PointLight(0x7a8fff, 30, 20);
    rimB.position.set(4, -3, 1.5);
    scene.add(rimB);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    // ---- orbit ring (echoes the logo swoosh) ----
    const ringGroup = new THREE.Group();
    ringGroup.rotation.set(1.18, 0.12, -0.5);
    floater.add(ringGroup);
    const ringMat = new THREE.MeshPhysicalMaterial({ color: 0x9fb4ff, metalness: 0.8, roughness: 0.2, clearcoat: 1, envMapIntensity: 1.4 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.018, 16, 240), ringMat);
    ringGroup.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.01, 12, 240), ringMat);
    ring2.rotation.set(0.25, 0.3, 0);
    ringGroup.add(ring2);

    // ---- workflow nodes orbiting on the rings ----
    type Node = { mesh: THREE.Mesh; radius: number; speed: number; angle: number; onRing2: boolean };
    const nodes: Node[] = [];
    const nodeColors = [0x2fe1d6, 0x7a8fff, 0xffffff, 0x2fe1d6, 0x9f7bff, 0x2fe1d6];
    nodeColors.forEach((c, i) => {
      const onRing2 = i % 2 === 1;
      const mat = new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.6, roughness: 0.3 });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(i % 3 === 0 ? 0.085 : 0.06, 24, 24), mat);
      (onRing2 ? ring2 : ring).add(mesh);
      nodes.push({ mesh, radius: onRing2 ? 2.4 : 2.1, speed: (onRing2 ? -0.18 : 0.24) * (0.8 + (i % 3) * 0.2), angle: (i / nodeColors.length) * Math.PI * 2, onRing2 });
    });

    // ---- a light sprinkle of sparkles for depth ----
    const SPARKS = window.innerWidth < 768 ? 90 : 180;
    const sp = new Float32Array(SPARKS * 3);
    for (let i = 0; i < SPARKS; i++) {
      const a = Math.random() * Math.PI * 2, r = 1.6 + Math.random() * 2.6;
      sp[i * 3] = Math.cos(a) * r;
      sp[i * 3 + 1] = (Math.random() - 0.5) * 4.2;
      sp[i * 3 + 2] = Math.sin(a) * r * 0.8 - 0.5;
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
    const sparkCanvas = document.createElement("canvas");
    sparkCanvas.width = sparkCanvas.height = 32;
    const sctx = sparkCanvas.getContext("2d")!;
    const g = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, 32, 32);
    const sparkTex = new THREE.CanvasTexture(sparkCanvas);
    const sparkMat = new THREE.PointsMaterial({ size: 0.07, map: sparkTex, transparent: true, depthWrite: false, opacity: 0.8 });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    floater.add(sparks);

    // ---- theme: tune finish + sparkle blending for light vs dark page ----
    const applyTheme = () => {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      renderer.toneMappingExposure = light ? 0.95 : 1.0;
      sparkMat.color.set(light ? "#0f9e95" : "#bff7ff");
      sparkMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      sparkMat.opacity = light ? 0.55 : 0.85;
      sparkMat.needsUpdate = true;
      ringMat.color.set(light ? "#5b6bd9" : "#9fb4ff");
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // ---- sizing ----
    let baseZ = 9;
    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      baseZ = w / h < 0.95 ? 12.5 : 10.2;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // ---- pointer ----
    const ndc = new THREE.Vector2();
    let pointerIn = false;
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      pointerIn = Math.abs(ndc.x) <= 1.4 && Math.abs(ndc.y) <= 1.4;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    const lean = new THREE.Vector2();

    const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
    const pace = reduceMotion ? 0.35 : 1; // calm, but alive, for reduced motion
    let last = 0;

    const frame = (t: number) => {
      const dt = last ? Math.min(t - last, 0.05) : 0.016;
      last = t;
      const tt = t * pace;

      // entrance: rise + un-rotate into place
      const intro = reduceMotion ? 1 : easeOut(t / 1.8);
      floater.position.y = (1 - intro) * -0.8 + Math.sin(tt * 0.9) * 0.09;
      floater.rotation.y = (1 - intro) * -1.2 + Math.sin(tt * 0.45) * 0.42;
      floater.rotation.x = Math.sin(tt * 0.33) * 0.08;

      // nodes travel along the rings
      for (const n of nodes) {
        n.angle += n.speed * dt * pace;
        n.mesh.position.set(Math.cos(n.angle) * n.radius, Math.sin(n.angle) * n.radius, 0);
      }
      ringGroup.rotation.z = -0.5 + tt * 0.04;
      sparks.rotation.y = tt * 0.05;

      // lean toward cursor + turn on scroll (not for reduced motion)
      const sc = reduceMotion ? 0 : Math.min(Math.max(window.scrollY / (window.innerHeight * 0.9), 0), 1);
      lean.x += ((pointerIn && !reduceMotion ? ndc.x : 0) - lean.x) * 0.06;
      lean.y += ((pointerIn && !reduceMotion ? ndc.y : 0) - lean.y) * 0.06;
      rig.rotation.y = lean.x * 0.45 + sc * 1.1;
      rig.rotation.x = -lean.y * 0.3 - sc * 0.2;

      // reflections sweep: rotate the environment so highlights glide
      // continuously across the glossy faces and bevels
      scene.environmentRotation.y = tt * 0.35;
      // rim lights drift so highlights glide across the bevels
      rimA.position.x = -4 + Math.sin(tt * 0.5) * 1.5;
      rimB.position.y = -3 + Math.cos(tt * 0.4) * 1.5;

      camera.position.z = baseZ + (1 - intro) * 2 - sc * 1.2;
      renderer.render(scene, camera);
    };

    let raf = 0;
    let onScreen = true;
    const t0 = performance.now();
    const loop = (now: number) => {
      frame((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (!raf && onScreen && document.visibilityState === "visible") {
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
    frame(reduceMotion ? 2 : 0); // paint immediately
    startLoop();

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      sparkTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduceMotion]);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
