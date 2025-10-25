// import { Canvas, useFrame } from '@react-three/fiber';
// import { useRef } from 'react';
// import * as THREE from 'three';

function FloatingIcons() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create icon meshes
  const icons = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Rotate the entire group slowly
      groupRef.current.rotation.y = time * 0.1;
      
      // Animate individual icons
      icons.current.forEach((icon, i) => {
        if (icon) {
          // Floating motion
          icon.position.y = Math.sin(time * 0.5 + i) * 0.5;
          // Gentle rotation
          icon.rotation.x = time * 0.3 + i;
          icon.rotation.z = Math.sin(time * 0.2 + i) * 0.5;
        }
      });
    }
  });

  const createIcon = (x: number, y: number, z: number, index: number) => (
    <mesh
      key={index}
      position={[x, y, z]}
      ref={(el) => {
        if (el) icons.current[index] = el;
      }}
    >
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial
        color={index % 3 === 0 ? '#66BB6A' : index % 3 === 1 ? '#FFD966' : '#64B5F6'}
        emissive={index % 3 === 0 ? '#66BB6A' : index % 3 === 1 ? '#FFD966' : '#64B5F6'}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Create orbiting icons */}
      {createIcon(2, 0, 0, 0)}
      {createIcon(-2, 0.5, 1, 1)}
      {createIcon(0, -1, 2, 2)}
      {createIcon(1.5, 1, -1, 3)}
      {createIcon(-1.5, -0.5, -2, 4)}
      {createIcon(0, 1.5, 1.5, 5)}
    </group>
  );
}

export default function AnimatedHeroParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-15">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <FloatingIcons />
      </Canvas>
    </div>
  );
}
