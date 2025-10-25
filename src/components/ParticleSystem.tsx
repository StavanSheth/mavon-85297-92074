import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count?: number;
}

function FloatingParticles({ count = 2000 }: FloatingParticlesProps) {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Forest green palette
    const forestColors = [
      new THREE.Color('#66BB6A'), // Leaf green
      new THREE.Color('#81C784'), // Light green
      new THREE.Color('#4CAF50'), // Primary green
      new THREE.Color('#FFD966'), // Amber (fireflies)
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spread particles in a larger volume
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;
      
      // Assign random color from palette
      const color = forestColors[Math.floor(Math.random() * forestColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      // Gentle rotation
      ref.current.rotation.y = time * 0.05;
      
      // Float particles up and down
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
        
        // Reset particle if it goes too high
        if (positions[i + 1] > 10) {
          positions[i + 1] = -10;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ParticleSystem() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <FloatingParticles />
    </Canvas>
  );
}
