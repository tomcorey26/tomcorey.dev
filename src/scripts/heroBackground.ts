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

  // Particle cloud
  const COUNT = 2200;
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
