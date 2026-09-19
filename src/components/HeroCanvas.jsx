// src/components/HeroCanvas.jsx
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/* ────────────────────────────────────────────────────────────
   1. GEOMETRÍA — puntos ordenados de dibujo
   ──────────────────────────────────────────────────────────── */

/**
 * Triángulo equilátero cerrado, subdividido en muchos puntos.
 * La subdivisión es lo que permite el dibujado progresivo: al recortar el
 * buffer con setDrawRange(0, n), el trazo "crece" punto a punto por la arista
 * en vez de saltar de vértice a vértice.
 */
function triangleOutline(radius, rotation, segmentsPerEdge = 90) {
  const corner = (i) => {
    const a = rotation + (i * Math.PI * 2) / 3;
    return new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  };
  const pts = [];
  for (let e = 0; e < 3; e++) {
    const A = corner(e);
    const B = corner((e + 1) % 3);
    for (let s = 0; s < segmentsPerEdge; s++) pts.push(A.clone().lerp(B, s / segmentsPerEdge));
  }
  pts.push(corner(0)); // cierre exacto
  return pts;
}

/** Almendra del ojo: dos bézieres cuadráticas espejadas (forma vesica). */
function eyeOutline(w = 0.85, h = 0.34, seg = 60) {
  const V = THREE.Vector3;
  const top = new THREE.QuadraticBezierCurve3(new V(-w, 0, 0), new V(0, h * 2.1, 0), new V(w, 0, 0));
  const bottom = new THREE.QuadraticBezierCurve3(new V(w, 0, 0), new V(0, -h * 2.1, 0), new V(-w, 0, 0));
  return [...top.getPoints(seg), ...bottom.getPoints(seg)];
}

/** Circunferencia (iris, halo). */
function circleOutline(radius, seg = 96) {
  return new Array(seg + 1).fill(0).map((_, i) => {
    const a = (i / seg) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  });
}

/* ────────────────────────────────────────────────────────────
   2. TRAZO PROGRESIVO
   ──────────────────────────────────────────────────────────── */

const smooth = (t) => t * t * (3 - 2 * t); // smoothstep

/**
 * Dibuja `points` entre los valores de progreso [from, to].
 * Fuera de ese rango la línea está vacía (antes) o completa (después).
 */
function ProgressiveLine({ points, color, from, to, progress, opacity = 1, z = 0 }) {
  const mat = useRef();
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame(() => {
    const raw = THREE.MathUtils.clamp((progress.current - from) / (to - from), 0, 1);
    const t = smooth(raw);
    geometry.setDrawRange(0, Math.floor(t * points.length));
    if (mat.current) mat.current.opacity = opacity * THREE.MathUtils.clamp(raw * 4, 0, 1);
  });

  return (
    <line geometry={geometry} position={[0, 0, z]}>
      <lineBasicMaterial ref={mat} color={color} transparent opacity={0} />
    </line>
  );
}

/* ────────────────────────────────────────────────────────────
   3. LA FIGURA
   ──────────────────────────────────────────────────────────── */

const R = 2.1;

// Cronograma: triángulo ascendente → descendente → halo → ojo.
const T = {
  triA: [0.02, 0.42],
  triB: [0.34, 0.74],
  halo: [0.6, 0.82],
  eye: [0.74, 0.93],
  iris: [0.82, 0.97],
};

function Star({ progress, pointer }) {
  const group = useRef();
  const pupil = useRef();

  const triUp = useMemo(() => triangleOutline(R, Math.PI / 2), []);
  const triDown = useMemo(() => triangleOutline(R, -Math.PI / 2), []);
  const halo = useMemo(() => circleOutline(R * 1.18), []);
  const eye = useMemo(() => eyeOutline(), []);
  const iris = useMemo(() => circleOutline(0.3), []);

  useFrame((state, delta) => {
    const p = progress.current;

    // Parallax: el grupo persigue al puntero con amortiguación.
    const g = group.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.28, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.current.y * 0.22, 3, delta);

    // Rotación propia que se frena conforme la figura se completa:
    // al final queda frontal y quieta, mirando al usuario.
    g.rotation.z = (1 - p) * 0.9;
    g.scale.setScalar(0.82 + p * 0.18);

    // La pupila sólo existe al final; late muy leve.
    const eyeIn = THREE.MathUtils.clamp((p - T.iris[0]) / (1 - T.iris[0]), 0, 1);
    pupil.current.scale.setScalar(eyeIn * (1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.04));
    pupil.current.material.opacity = eyeIn;
  });

  return (
    <group ref={group}>
      {/* Los dos triángulos: el color se aclara respecto al #000080 puro para
          que el trazo se lea sobre negro; el halo sí usa el navy exacto. */}
      <ProgressiveLine points={triUp} color="#2222c8" from={T.triA[0]} to={T.triA[1]} progress={progress} />
      <ProgressiveLine points={triDown} color="#3a3ae8" from={T.triB[0]} to={T.triB[1]} progress={progress} />
      <ProgressiveLine points={halo} color="#000080" from={T.halo[0]} to={T.halo[1]} progress={progress} opacity={0.7} z={-0.35} />

      {/* Ojo */}
      <ProgressiveLine points={eye} color="#c9cbe8" from={T.eye[0]} to={T.eye[1]} progress={progress} z={0.02} />
      <ProgressiveLine points={iris} color="#5b5bff" from={T.iris[0]} to={T.iris[1]} progress={progress} z={0.03} />

      <mesh ref={pupil} position={[0, 0, 0.04]}>
        <circleGeometry args={[0.13, 48]} />
        {/* Única superficie con material físico: es la que recoge la luz azul */}
        <meshStandardMaterial color="#05051a" emissive="#000080" emissiveIntensity={2.2} transparent opacity={0} />
      </mesh>
    </group>
  );
}

/* ────────────────────────────────────────────────────────────
   4. POLVO Y CÁMARA
   ──────────────────────────────────────────────────────────── */

function Dust({ progress, count = 700 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.4 - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.02;
    ref.current.material.opacity = 0.05 + progress.current * 0.35;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#6a6aff" transparent opacity={0} sizeAttenuation />
    </points>
  );
}

/** Acerca la cámara conforme la figura se completa. */
function Rig({ progress, pointer }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const z = THREE.MathUtils.lerp(6.4, 4.2, smooth(progress.current));
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 3, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.current.x * 0.35, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.current.y * 0.25, 2, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ────────────────────────────────────────────────────────────
   5. CANVAS
   ──────────────────────────────────────────────────────────── */

export default function HeroCanvas({ progress }) {
  const pointer = useRef({ x: 0, y: 0 });

  const onPointerMove = (e) => {
    pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };

  return (
    <div className="absolute inset-0" onPointerMove={onPointerMove}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => gl.setClearColor('#000000')}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 2, 4]} intensity={40} color="#000080" distance={20} />
        <pointLight position={[-4, -2, 3]} intensity={25} color="#3a3aff" distance={20} />

        <Star progress={progress} pointer={pointer} />
        <Dust progress={progress} />
        <Rig progress={progress} pointer={pointer} />
      </Canvas>
    </div>
  );
}
