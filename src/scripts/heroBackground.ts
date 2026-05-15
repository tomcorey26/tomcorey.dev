// Lightweight animated particle field for the hero background.
// Loaded dynamically (see index.astro) so three.js never blocks first paint.
import * as THREE from "three";

export interface HeroBg {
  dispose: () => void;
}

export function initHeroBackground(canvas: HTMLCanvasElement): HeroBg {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Particle cloud (kept sparse so it reads as distant stars)
  const COUNT = 850;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  const material = new THREE.PointsMaterial({
    color: 0x818cf8,
    size: 0.035,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // --- Little fleet: UFOs (aliens) + rockets (spaceships) ---
  // Track every geometry/material we create so dispose() is clean.
  const disposables: { dispose: () => void }[] = [
    geometry,
    material,
  ];
  const track = <T extends THREE.BufferGeometry | THREE.Material>(o: T): T => {
    disposables.push(o);
    return o;
  };

  interface Craft {
    group: THREE.Group;
    speed: number;
    bobAmp: number;
    bobFreq: number;
    spin: number;
    phase: number;
  }
  const fleet: Craft[] = [];

  // Wrap well outside the visible frustum so craft never pop in/out on
  // screen — they cross fully, then teleport back while off-screen.
  const SPAN_X = 44;
  const randRange = (a: number, b: number) => a + Math.random() * (b - a);

  function buildUFO(): THREE.Group {
    const g = new THREE.Group();
    const saucer = new THREE.Mesh(
      track(new THREE.SphereGeometry(0.55, 18, 12)),
      track(
        new THREE.MeshBasicMaterial({
          color: 0x818cf8,
          transparent: true,
          opacity: 0.7,
        })
      )
    );
    saucer.scale.set(1, 0.32, 1);
    const dome = new THREE.Mesh(
      track(
        new THREE.SphereGeometry(0.26, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2)
      ),
      track(
        new THREE.MeshBasicMaterial({
          color: 0xc084fc,
          transparent: true,
          opacity: 0.55,
        })
      )
    );
    dome.position.y = 0.1;
    const ring = new THREE.Mesh(
      track(new THREE.TorusGeometry(0.5, 0.045, 8, 28)),
      track(new THREE.MeshBasicMaterial({ color: 0xf0abfc, opacity: 0.8, transparent: true }))
    );
    ring.rotation.x = Math.PI / 2;
    g.add(saucer, dome, ring);
    return g;
  }

  // Fixed UFO fleet, spread evenly across the span on first load (no
  // random clustering / pop-in). They persist for the life of the page.
  const FLEET_SIZE = 5;
  for (let i = 0; i < FLEET_SIZE; i++) {
    const group = buildUFO();
    const scale = randRange(0.7, 1.2);
    group.scale.multiplyScalar(scale);
    const slot = (i + 0.5) / FLEET_SIZE; // 0..1 evenly
    group.position.set(
      -SPAN_X / 2 + slot * SPAN_X,
      randRange(-3.5, 3.5),
      randRange(-6, -1.5)
    );
    scene.add(group);
    fleet.push({
      group,
      speed: randRange(0.5, 1.1) * (i % 2 ? 1 : -1),
      bobAmp: randRange(0.15, 0.4),
      bobFreq: randRange(0.4, 0.9),
      spin: randRange(0.3, 0.9),
      phase: Math.random() * Math.PI * 2,
    });
  }

  // Pointer parallax
  let pointerX = 0;
  let pointerY = 0;
  const onPointerMove = (e: PointerEvent) => {
    pointerX = (e.clientX / window.innerWidth - 0.5) * 0.6;
    pointerY = (e.clientY / window.innerHeight - 0.5) * 0.6;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", onResize);

  let raf = 0;
  let running = true;
  const clock = new THREE.Clock();

  const animate = () => {
    if (!running) return;
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    points.rotation.y = t * 0.04;
    points.rotation.x = Math.sin(t * 0.12) * 0.08;

    for (const c of fleet) {
      const p = c.group.position;
      p.x += c.speed * 0.016;
      if (p.x > SPAN_X / 2) p.x = -SPAN_X / 2;
      if (p.x < -SPAN_X / 2) p.x = SPAN_X / 2;
      p.y += Math.sin(t * c.bobFreq + c.phase) * c.bobAmp * 0.01;
      c.group.rotation.y = t * c.spin; // saucer spin
      c.group.rotation.z = Math.sin(t * 0.6 + c.phase) * 0.12; // tilt
    }

    camera.position.x += (pointerX - camera.position.x) * 0.04;
    camera.position.y += (-pointerY - camera.position.y) * 0.04;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  };
  animate();

  // Pause when tab/section not visible to save battery
  const onVisibility = () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else if (!running) {
      running = true;
      clock.getDelta();
      animate();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  return {
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      for (const c of fleet) scene.remove(c.group);
      for (const d of disposables) d.dispose();
      renderer.dispose();
    },
  };
}
