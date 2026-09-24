"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The hero centerpiece: the Zetta "Z" rendered like a studio product shot.
 *
 * Built from the logo's own anatomy: two teal anodized-metal bars and a
 * mirror-chrome diagonal blade that sits slightly in front of them. It is lit
 * by a custom softbox studio (baked into an environment map), which is what
 * gives the metal its crisp reflections. There is a darker studio for dark
 * mode and a paler one, with black cards for contrast, for light mode.
 *
 * The orbit rings are gone. In their place are tapered light trails, like the
 * logo's swoosh, with a glowing head that sweeps around the mark and passes
 * in front of and behind it.
 *
 * Motion: the three pieces assemble on load; after that the mark sways and
 * floats, a light glint sweeps across the chrome every few seconds, it leans
 * toward the cursor, and it turns as the hero scrolls away. Reduced motion
 * skips the assembly, cursor lean and scroll turn, and keeps slow ambient
 * motion. Rendering pauses off-screen and in hidden tabs.
 */

// ---------- geometry: the logo's three pieces (unit ≈ 2.2 wide) ----------

function quad(pts: [number, number][]) {
  const s = new THREE.Shape();
  s.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
  s.closePath();
  return s;
}

const BAR_T = 0.3; // bar thickness (y)
const topBar = quad([
  [-1.02, 1.0],
  [1.12, 1.0],
  [0.9, 1.0 - BAR_T],
  [-0.84, 1.0 - BAR_T],
]);
const bottomBar = quad([
  [-1.12, -1.0],
  [1.02, -1.0],
  [0.84, -1.0 + BAR_T],
  [-0.9, -1.0 + BAR_T],
]);
// The diagonal blade runs from the top bar's right end to the bottom bar's left end.
const blade = quad([
  [0.46, 1.0 - BAR_T + 0.02],
  [0.98, 1.0 - BAR_T + 0.02],
  [-0.46, -1.0 + BAR_T - 0.02],
  [-0.98, -1.0 + BAR_T - 0.02],
]);

function extrude(shape: THREE.Shape, depth: number) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.045,
    bevelSegments: 2,
    curveSegments: 4,
  });
  g.translate(0, 0, -depth / 2);
  g.computeVertexNormals();
  return g;
}

// ---------- the studio: softboxes baked into an environment map ----------

function softboxTexture() {
  // A softbox with a bright core and soft falloff, so flat faces pick up a
  // smooth gradient instead of a hard-edged block of white.
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.45, "#d0d0d0");
  g.addColorStop(0.8, "#3a3a3a");
  g.addColorStop(1, "#000000");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function buildStudio(renderer: THREE.WebGLRenderer, light: boolean) {
  const studio = new THREE.Scene();
  const disposables: { dispose: () => void }[] = [];

  // Gradient dome: lighter overhead, darker toward the floor.
  const domeGeo = new THREE.SphereGeometry(30, 48, 24);
  const top = new THREE.Color(light ? "#f2f5f9" : "#1b2534");
  const mid = new THREE.Color(light ? "#c3ccd6" : "#121a26");
  const bot = new THREE.Color(light ? "#7d8894" : "#010203");
  const front = new THREE.Color(light ? "#ffffff" : "#6f82a3");
  const cols: number[] = [];
  const p = domeGeo.attributes.position;
  const c = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i) / 30; // -1..1
    if (y > 0) c.copy(mid).lerp(top, Math.pow(y, 0.7));
    else c.copy(mid).lerp(bot, Math.pow(-y, 0.8));
    // The half of the studio facing the mark glows softly, so the chrome
    // always has a smooth gradient to mirror, whichever way it turns.
    const z = p.getZ(i) / 30;
    if (z > 0) c.lerp(front, Math.pow(z, 1.3) * (light ? 0.35 : 0.6) * (1 - Math.abs(y) * 0.5));
    cols.push(c.r, c.g, c.b);
  }
  domeGeo.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
  const domeMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide });
  studio.add(new THREE.Mesh(domeGeo, domeMat));
  disposables.push(domeGeo, domeMat);

  const soft = softboxTexture();
  disposables.push(soft);
  const plane = new THREE.PlaneGeometry(1, 1);
  disposables.push(plane);
  const box = (w: number, h: number, color: THREE.ColorRepresentation, k: number, pos: [number, number, number], hard = false) => {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(k),
      map: hard ? null : soft,
      side: THREE.DoubleSide,
    });
    disposables.push(mat);
    const m = new THREE.Mesh(plane, mat);
    m.scale.set(w, h, 1);
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    studio.add(m);
  };

  // Overhead softbox, tall key strip, front panel, brand-colored rims, back light.
  box(12, 5, "#ffffff", light ? 3 : 4.2, [0, 7, 1]);
  box(2.2, 10, "#ffffff", light ? 4.5 : 6.5, [-6.5, 0.5, 3]);
  box(7, 3, "#ffffff", light ? 2.4 : 3.2, [2, 2.4, 7]);
  box(2.6, 10, "#2fe1d6", light ? 2.8 : 5.5, [6.5, 0, 1.5]);
  box(10, 2.4, "#6d7bff", light ? 2.4 : 4.2, [0, -6.5, 2.5]);
  box(4, 8, "#ffffff", light ? 1.4 : 2, [0, 0, -7]);
  if (!light) {
    // Dark studio: a broad front softbox and a bright strip, so faces turned
    // toward the viewer carry a luminous gradient rather than going black.
    box(11, 6, "#dfe9ff", 1.5, [0, 0.8, 8.5]);
    box(9, 0.9, "#ffffff", 5, [0, 3.4, 7.5]);
    box(0.9, 7, "#8ff7ee", 3, [-2.8, 0, 7.5]);
  }
  if (light) {
    // Black cards: give the chrome defined dark lines on a pale page.
    box(1.2, 9, "#000000", 0, [3.2, 0, 6.5], true);
    box(9, 1, "#000000", 0, [0, -2.6, 6.5], true);
  }

  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(studio, 0.02).texture;
  pmrem.dispose();
  disposables.forEach((d) => d.dispose());
  return tex;
}

// ---------- light trails (the swoosh) ----------

class Ellipse3 extends THREE.Curve<THREE.Vector3> {
  a: number;
  b: number;
  constructor(a: number, b: number) {
    super();
    this.a = a;
    this.b = b;
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const ang = t * Math.PI * 2;
    return target.set(Math.cos(ang) * this.a, Math.sin(ang) * this.b, 0);
  }
}

const trailVert = /* glsl */ `
  uniform float uHead;
  uniform float uLen;
  uniform float uRadius;
  varying float vFade;
  void main() {
    float d = fract(uHead - uv.x);            // 0 at the head, growing behind it
    float f = 1.0 - smoothstep(0.0, uLen, d);
    float taper = max(pow(f, 1.4), 0.06);     // thick at the head, a hairline at the tail
    vec3 centre = position - normal * uRadius;
    vec3 p = centre + normal * uRadius * taper;
    vFade = f;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const trailFrag = /* glsl */ `
  uniform vec3 uTail;
  uniform vec3 uHeadCol;
  uniform float uOpacity;
  uniform float uBase;
  varying float vFade;
  void main() {
    vec3 col = mix(uTail, uHeadCol, pow(vFade, 4.0));
    float a = max(pow(vFade, 1.7), uBase) * uOpacity;
    gl_FragColor = vec4(col, a);
    #include <colorspace_fragment>
  }
`;

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.18, "rgba(255,255,255,0.75)");
  g.addColorStop(0.5, "rgba(255,255,255,0.14)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---------- easing ----------

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * clamp01(x)));
const easeInOut = (x: number) => {
  const v = clamp01(x);
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
};

export default function SolidZ({ reduceMotion }: { reduceMotion: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the hero keeps its CSS glow + shadow backdrop.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NeutralToneMapping; // keeps brand teal true
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const envDark = buildStudio(renderer, false);
    const envLight = buildStudio(renderer, true);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 11);

    const rig = new THREE.Group(); // cursor lean + scroll turn
    scene.add(rig);
    const floater = new THREE.Group(); // idle sway + float
    rig.add(floater);
    const mark = new THREE.Group();
    mark.rotation.z = -0.04;
    floater.add(mark);

    // A soft stage light behind the mark, so it sits in its own pool of light.
    const glowTex0 = glowTexture();
    const backlight = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex0, transparent: true, depthWrite: false }));
    backlight.position.set(0, 0.1, -1.6);
    backlight.scale.setScalar(6.2);
    floater.add(backlight);

    // ---- materials ----
    const teal = new THREE.MeshPhysicalMaterial({
      color: "#14c4b7",
      metalness: 1,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      iridescence: 0.18,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [180, 420],
      envMapIntensity: 1.25,
    });
    const chrome = new THREE.MeshPhysicalMaterial({
      color: "#eef3fb",
      metalness: 1,
      roughness: 0.11,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      envMapIntensity: 1.4,
    });

    const topMesh = new THREE.Mesh(extrude(topBar, 0.34), teal);
    const botMesh = new THREE.Mesh(extrude(bottomBar, 0.34), teal);
    const bladeMesh = new THREE.Mesh(extrude(blade, 0.22), chrome);
    bladeMesh.position.z = 0.1; // the blade sits just in front, as in the logo
    mark.add(topMesh, botMesh, bladeMesh);

    // A soft key for the clearcoat sparkle (metals get the rest from the studio).
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(-3, 5, 6);
    scene.add(key);

    // ---- light trails ----
    const glowTex = glowTexture();
    type Trail = {
      group: THREE.Group;
      curve: Ellipse3;
      mat: THREE.ShaderMaterial;
      head: THREE.Sprite;
      core: THREE.Mesh;
      speed: number;
      phase: number;
    };
    const trails: Trail[] = [];
    const makeTrail = (a: number, b: number, radius: number, len: number, rot: [number, number, number], speed: number, phase: number) => {
      const curve = new Ellipse3(a, b);
      const mat = new THREE.ShaderMaterial({
        vertexShader: trailVert,
        fragmentShader: trailFrag,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uHead: { value: 0 },
          uLen: { value: len },
          uRadius: { value: radius },
          uTail: { value: new THREE.Color() },
          uHeadCol: { value: new THREE.Color() },
          uOpacity: { value: 0 },
          uBase: { value: 0.05 },
        },
      });
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 420, radius, 10, true), mat);
      const group = new THREE.Group();
      group.rotation.set(...rot);
      group.add(tube);
      const head = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false }));
      head.scale.setScalar(0.62);
      group.add(head);
      const core = new THREE.Mesh(new THREE.SphereGeometry(radius * 2.1, 20, 20), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      group.add(core);
      floater.add(group);
      trails.push({ group, curve, mat, head, core, speed, phase });
    };
    // Main swoosh: low-left to high-right, passing in front of the mark like the logo.
    makeTrail(2.02, 0.84, 0.028, 0.62, [1.2, 0.22, 0.36], 0.085, 0.1);
    // A second, fainter orbit on a different tilt, travelling the other way.
    makeTrail(2.3, 1.02, 0.017, 0.45, [1.35, -0.5, -0.28], -0.06, 0.55);

    // ---- fine dust for depth ----
    const DUST = window.innerWidth < 768 ? 70 : 140;
    const dp = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.8 + Math.random() * 2.8;
      dp[i * 3] = Math.cos(a) * r;
      dp[i * 3 + 1] = (Math.random() - 0.5) * 4.6;
      dp[i * 3 + 2] = Math.sin(a) * r * 0.7 - 0.8;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dp, 3));
    const dustMat = new THREE.PointsMaterial({ size: 0.045, map: glowTex, transparent: true, depthWrite: false });
    const dust = new THREE.Points(dustGeo, dustMat);
    floater.add(dust);

    // ---- theme ----
    let isLight = false;
    const applyTheme = () => {
      isLight = document.documentElement.getAttribute("data-theme") === "light";
      scene.environment = isLight ? envLight : envDark;
      teal.color.set(isLight ? "#0fb3a6" : "#14c4b7");
      for (const [i, t] of trails.entries()) {
        const u = t.mat.uniforms;
        if (isLight) {
          (u.uTail.value as THREE.Color).set(i === 0 ? "#0d9488" : "#6366f1");
          (u.uHeadCol.value as THREE.Color).set(i === 0 ? "#0f766e" : "#4338ca");
          u.uBase.value = 0.07;
          t.mat.blending = THREE.NormalBlending;
        } else {
          (u.uTail.value as THREE.Color).set(i === 0 ? "#2fe1d6" : "#7a8fff");
          (u.uHeadCol.value as THREE.Color).set("#ffffff");
          u.uBase.value = 0.05;
          t.mat.blending = THREE.AdditiveBlending;
        }
        t.mat.needsUpdate = true;
        const hm = t.head.material as THREE.SpriteMaterial;
        hm.color.set(isLight ? (i === 0 ? "#14b8a6" : "#818cf8") : i === 0 ? "#5ff5ea" : "#a5b4ff");
        hm.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
        hm.opacity = isLight ? 0.55 : 1;
        hm.needsUpdate = true;
        (t.core.material as THREE.MeshBasicMaterial).color.set(isLight ? (i === 0 ? "#0f766e" : "#4338ca") : "#ffffff");
      }
      const bm = backlight.material as THREE.SpriteMaterial;
      bm.color.set(isLight ? "#7fe3da" : "#1fb5ac");
      bm.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
      bm.opacity = isLight ? 0.22 : 0.32;
      bm.needsUpdate = true;
      dustMat.color.set(isLight ? "#0f766e" : "#c8fbff");
      dustMat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
      dustMat.opacity = isLight ? 0.3 : 0.7;
      dustMat.needsUpdate = true;
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // ---- sizing ----
    let baseZ = 11;
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      baseZ = w / h < 0.95 ? 11.8 : 9.3;
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
      pointerIn = Math.abs(ndc.x) <= 1.5 && Math.abs(ndc.y) <= 1.5;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    const lean = new THREE.Vector2();

    const pace = reduceMotion ? 0.35 : 1;
    const GLINT_EVERY = 6.5;
    // Studio angle where the chrome reads brightest in both themes; the sway
    // and glint move around it.
    const ENV_REST = 0.4;
    const tmp = new THREE.Vector3();
    let last = 0;

    // Assembly: each piece travels in from its own direction and settles.
    const piece = (m: THREE.Mesh, t: number, delay: number, from: { x?: number; y?: number; z?: number; rz?: number; ry?: number }, rest: { z: number }) => {
      const k = reduceMotion ? 1 : easeOutExpo((t - delay) / 1.5);
      const inv = 1 - k;
      m.position.set((from.x ?? 0) * inv, (from.y ?? 0) * inv, rest.z + (from.z ?? 0) * inv);
      m.rotation.set(0, (from.ry ?? 0) * inv, (from.rz ?? 0) * inv);
      m.scale.setScalar(0.001 + 0.999 * clamp01(reduceMotion ? 1 : (t - delay) / 0.35));
    };

    const frame = (t: number) => {
      const dt = last ? Math.min(t - last, 0.05) : 0.016;
      last = t;
      const tt = t * pace;

      piece(topMesh, t, 0.05, { x: -3.2, ry: -0.9 }, { z: 0 });
      piece(botMesh, t, 0.2, { x: 3.2, ry: 0.9 }, { z: 0 });
      piece(bladeMesh, t, 0.42, { z: 5, rz: 0.9 }, { z: 0.1 });

      // idle: slow sway so the studio reflections travel across the metal
      floater.rotation.y = Math.sin(tt * 0.36) * 0.27 + Math.sin(tt * 0.17) * 0.08;
      floater.rotation.x = Math.sin(tt * 0.29) * 0.07;
      floater.position.y = Math.sin(tt * 0.8) * 0.07;

      // a glint sweeps across the chrome every few seconds
      // (the studio sways around the front so the key light always reaches
      // the faces; the glint is a quick there-and-back sweep)
      const within = clamp01((tt % GLINT_EVERY) / 1.8);
      const glint = Math.sin(Math.PI * easeInOut(within)) * 0.75;
      scene.environmentRotation.y = ENV_REST + Math.sin(tt * 0.21) * 0.28 + glint;
      scene.environmentRotation.x = Math.sin(tt * 0.13) * 0.08;

      // light trails travel; they fade in after the mark assembles
      const trailIn = reduceMotion ? 1 : clamp01((t - 0.9) / 0.8);
      for (const tr of trails) {
        tr.phase = (tr.phase + tr.speed * dt * pace + 1) % 1;
        tr.mat.uniforms.uHead.value = tr.phase;
        tr.mat.uniforms.uOpacity.value = trailIn * (tr.speed > 0 ? 1 : 0.75);
        tr.curve.getPoint(tr.phase, tmp);
        tr.head.position.copy(tmp);
        tr.core.position.copy(tmp);
        const pulse = 1 + Math.sin(t * 5 + tr.phase * 20) * 0.06;
        tr.head.scale.setScalar((tr.speed > 0 ? 0.62 : 0.42) * trailIn * pulse);
        tr.core.scale.setScalar(Math.max(trailIn, 0.001));
      }
      dust.rotation.y = tt * 0.03;

      // cursor lean and scroll turn (not with reduced motion)
      // (the turn starts only once the mark itself begins to leave the screen,
      // so on phones, where it sits below the fold, it arrives facing forward)
      const sc = reduceMotion ? 0 : clamp01(-host.getBoundingClientRect().top / (host.clientHeight * 0.85));
      lean.x += ((pointerIn && !reduceMotion ? ndc.x : 0) - lean.x) * 0.05;
      lean.y += ((pointerIn && !reduceMotion ? ndc.y : 0) - lean.y) * 0.05;
      rig.rotation.y = lean.x * 0.4 + sc * 0.9;
      rig.rotation.x = -lean.y * 0.26 - sc * 0.18;

      const intro = reduceMotion ? 1 : easeOutExpo(t / 2);
      camera.position.z = baseZ + (1 - intro) * 1.6 - sc * 1.2;
      renderer.render(scene, camera);
    };

    let raf = 0;
    let onScreen = true;
    // The intro clock starts on the first painted frame, after shaders compile,
    // so the assembly is never missed on slower devices.
    let t0 = -1;
    const loop = (now: number) => {
      if (t0 < 0) t0 = now;
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
    frame(reduceMotion ? 3 : 0);
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
      glowTex.dispose();
      glowTex0.dispose();
      envDark.dispose();
      envLight.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduceMotion]);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
