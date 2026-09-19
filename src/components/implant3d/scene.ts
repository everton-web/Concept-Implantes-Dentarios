import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

/** Faixas da rolagem (0 a 1) em que cada peça entra. Iguais às dos passos no CSS. */
export const RANGES = {
  screw: [0, 0.3],
  abutment: [0.32, 0.58],
  crown: [0.6, 0.86],
} as const;

/**
 * Coroa de molar: esfera achatada, com colo estreito embaixo, quatro
 * cúspides no topo e o sulco central. Normais recalculadas no fim.
 */
function molarCrown() {
  const geo = new THREE.SphereGeometry(1, 96, 72);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const theta = Math.atan2(v.z, v.x);
    const r = Math.hypot(v.x, v.z);

    let x = v.x * 0.64;
    let z = v.z * 0.58;
    let y = v.y > 0 ? v.y * 0.5 : v.y * 0.62;

    if (v.y < 0) {
      // Colo: afina em direção à raiz.
      const neck = 1 - 0.34 * smooth(0, 1, -v.y);
      x *= neck;
      z *= neck;
    }

    if (v.y > 0.15) {
      const top = smooth(0.15, 1, v.y);
      const cusps = 0.5 + 0.5 * Math.cos(4 * theta + Math.PI / 4);
      y += 0.13 * cusps * top * smooth(0, 0.55, r);
      // Sulco central entre as cúspides.
      y -= 0.12 * Math.exp(-(r * r) / 0.09) * top;
    }

    pos.setXYZ(i, x, y, z);
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * Raiz: perfil torneado que afina até uma ponta arredondada, achatada de
 * frente e levemente curvada, para não parecer um palito.
 */
function root(offsetX: number, lean: number) {
  const profile: THREE.Vector2[] = [];
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const radius = 0.24 * Math.pow(1 - t, 0.75) + 0.02;
    profile.push(new THREE.Vector2(radius, -t * 1.75));
  }
  profile.push(new THREE.Vector2(0, -1.78));
  const geo = new THREE.LatheGeometry(profile, 48);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const t = -pos.getY(i) / 1.78;
    pos.setZ(i, pos.getZ(i) * 0.72);
    pos.setX(i, pos.getX(i) + lean * t * t);
  }
  geo.computeVertexNormals();
  geo.translate(offsetX, -0.3, 0);
  return geo;
}

/**
 * Pino de titânio torneado numa peça só: perfil com colar polido no topo,
 * roscas em dente-de-serra ao longo do corpo cônico e ponta arredondada.
 */
function screw(material: THREE.Material) {
  const profile: THREE.Vector2[] = [new THREE.Vector2(0, 1.02)];
  // Colar liso.
  profile.push(new THREE.Vector2(0.27, 1.02), new THREE.Vector2(0.29, 0.98), new THREE.Vector2(0.29, 0.8));
  const threads = 11;
  const top = 0.78;
  const bottom = -0.82;
  const pitch = (top - bottom) / threads;
  for (let i = 0; i < threads; i++) {
    const t = i / threads;
    const y = top - i * pitch;
    const outer = lerp(0.3, 0.2, t);
    const inner = outer - 0.075;
    // Flanco reto em cima, rampa embaixo: cara de rosca de implante.
    profile.push(new THREE.Vector2(inner, y));
    profile.push(new THREE.Vector2(outer, y - pitch * 0.22));
    profile.push(new THREE.Vector2(outer, y - pitch * 0.34));
    profile.push(new THREE.Vector2(inner, y - pitch));
  }
  profile.push(new THREE.Vector2(0.1, -0.98), new THREE.Vector2(0.03, -1.03), new THREE.Vector2(0, -1.04));

  const geo = new THREE.LatheGeometry(profile, 96);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, material);
}

function abutment(material: THREE.Material) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 0.42, 6), material);
  group.add(body);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.08, 64), material);
  base.position.y = -0.24;
  group.add(base);
  return group;
}

export interface ImplantScene {
  setProgress(p: number): void;
  resize(width: number, height: number): void;
  render(): void;
  dispose(): void;
}

export function createImplantScene(canvas: HTMLCanvasElement): ImplantScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);

  // Vidro levemente azulado, como na referência: transparente o bastante
  // para o metal do implante aparecer por dentro da coroa.
  const glass = new THREE.MeshPhysicalMaterial({
    color: "#f4f7fb",
    metalness: 0,
    roughness: 0.04,
    transmission: 1,
    thickness: 0.6,
    ior: 1.45,
    attenuationColor: new THREE.Color("#7f90aa"),
    attenuationDistance: 1.1,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    specularIntensity: 0.8,
    envMapIntensity: 0.75,
  });
  const ghostGlass = glass.clone();
  ghostGlass.thickness = 0.9;
  ghostGlass.attenuationDistance = 0.9;

  const titanium = new THREE.MeshPhysicalMaterial({
    color: "#4d525b",
    metalness: 1,
    roughness: 0.24,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
  });

  const crownGeo = molarCrown();

  // Dentes vizinhos: coroa + duas raízes, em vidro.
  const neighbours = new THREE.Group();
  for (const side of [-1, 1]) {
    const tooth = new THREE.Group();
    tooth.add(new THREE.Mesh(crownGeo, ghostGlass));
    tooth.add(new THREE.Mesh(root(-0.2, -0.08), ghostGlass));
    tooth.add(new THREE.Mesh(root(0.2, 0.08), ghostGlass));
    tooth.position.set(side * 1.24, 0.58, side * -0.14);
    tooth.rotation.y = side * 0.25;
    neighbours.add(tooth);
  }
  scene.add(neighbours);

  const pin = screw(titanium);
  const connector = abutment(titanium);
  const crown = new THREE.Mesh(crownGeo, glass);

  // Topo do colar do pino encosta na base do conector; a coroa envolve o conector.
  const FINAL = { screw: -1.28, abutment: 0.02, crown: 0.58 };
  scene.add(pin, connector, crown);

  // Luz de recorte que desenha o contorno do vidro contra o fundo claro.
  const key = new THREE.DirectionalLight("#ffffff", 1.1);
  key.position.set(3, 4, 5);
  const rim = new THREE.DirectionalLight("#cfdcff", 2.6);
  rim.position.set(-4, 2, -4);
  scene.add(key, rim, new THREE.AmbientLight("#ffffff", 0.12));

  const target = new THREE.Vector3(0, -0.42, 0);
  const DISTANCE = 8.8;

  function setProgress(p: number) {
    const sp = easeOut(clamp01((p - RANGES.screw[0]) / (RANGES.screw[1] - RANGES.screw[0])));
    const ap = easeOut(clamp01((p - RANGES.abutment[0]) / (RANGES.abutment[1] - RANGES.abutment[0])));
    const cp = easeOut(clamp01((p - RANGES.crown[0]) / (RANGES.crown[1] - RANGES.crown[0])));

    // Pino sobe girando, como se fosse rosqueado.
    pin.position.y = lerp(-5, FINAL.screw, sp);
    pin.rotation.y = (1 - sp) * Math.PI * 6;

    connector.visible = ap > 0;
    connector.position.y = lerp(4.2, FINAL.abutment, ap);

    crown.visible = cp > 0;
    crown.position.y = lerp(4.8, FINAL.crown, cp);
    crown.rotation.y = (1 - cp) * 0.9;

    // Câmera circula devagar ao longo de toda a montagem.
    const orbit = lerp(0.62, 0.18, p);
    camera.position.set(Math.sin(orbit) * DISTANCE, lerp(2, 1.1, p), Math.cos(orbit) * DISTANCE);
    camera.lookAt(target);
  }

  function resize(width: number, height: number) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Em telas estreitas afasta a câmera para caber os três dentes.
    camera.fov = width / height < 0.8 ? 38 : 28;
    camera.updateProjectionMatrix();
  }

  function render() {
    renderer.render(scene, camera);
  }

  function dispose() {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) obj.geometry.dispose();
    });
    glass.dispose();
    ghostGlass.dispose();
    titanium.dispose();
    envTexture.dispose();
    pmrem.dispose();
    renderer.dispose();
  }

  setProgress(0);
  return { setProgress, resize, render, dispose };
}
