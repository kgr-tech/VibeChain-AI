'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Sphere, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Metallic base/pedestal
function Pedestal() {
    return (
        <group position={[0, -2, 0]}>
            {/* Top platform */}
            <RoundedBox args={[2.5, 0.3, 2.5]} radius={0.05} position={[0, 0.6, 0]}>
                <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
            </RoundedBox>

            {/* Middle section */}
            <RoundedBox args={[2.8, 0.4, 2.8]} radius={0.05} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#0f0f1a" metalness={0.8} roughness={0.3} />
            </RoundedBox>

            {/* Base */}
            <RoundedBox args={[3.2, 0.3, 3.2]} radius={0.08} position={[0, -0.1, 0]}>
                <meshStandardMaterial color="#2d2d44" metalness={0.95} roughness={0.15} />
            </RoundedBox>

            {/* Cyan accent strip */}
            <RoundedBox args={[2.6, 0.08, 2.6]} radius={0.02} position={[0, 0.45, 0]}>
                <meshStandardMaterial color="#22d3ee" metalness={0.5} roughness={0.3} emissive="#22d3ee" emissiveIntensity={0.3} />
            </RoundedBox>
        </group>
    );
}

// Central shield emblem
function ShieldEmblem() {
    const shieldRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (!shieldRef.current) return;
        const time = state.clock.getElapsedTime();
        shieldRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    });

    return (
        <group ref={shieldRef} position={[0, 0.3, 0]}>
            {/* Main shield body - using icosahedron as approximation */}
            <mesh>
                <octahedronGeometry args={[1.2, 0]} />
                <meshPhysicalMaterial
                    color="#14b8a6"
                    metalness={0.6}
                    roughness={0.2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>

            {/* Inner detail */}
            <mesh scale={[0.7, 0.7, 0.7]}>
                <octahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial
                    color="#0d9488"
                    metalness={0.8}
                    roughness={0.1}
                    clearcoat={1}
                />
            </mesh>

            {/* Glowing core */}
            <mesh scale={[0.3, 0.3, 0.3]}>
                <icosahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color="#22d3ee" />
            </mesh>
        </group>
    );
}

// Orbital rings around the emblem
function OrbitalRings() {
    const ringsRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (!ringsRef.current) return;
        const time = state.clock.getElapsedTime();
        ringsRef.current.rotation.z = time * 0.2;
        ringsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1 + 0.3;
    });

    return (
        <group ref={ringsRef} position={[0, 0.3, 0]}>
            <Torus args={[1.8, 0.03, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#22d3ee" metalness={0.8} roughness={0.2} emissive="#22d3ee" emissiveIntensity={0.2} />
            </Torus>
            <Torus args={[2.1, 0.02, 16, 100]} rotation={[Math.PI / 2.5, 0.3, 0]}>
                <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
            </Torus>
        </group>
    );
}

// Floating spheres around the scene
function FloatingSpheres() {
    const spheres = [
        { position: [-2.5, 1, 0.5] as [number, number, number], size: 0.15, color: '#22d3ee' },
        { position: [2.2, 0.5, -0.5] as [number, number, number], size: 0.12, color: '#14b8a6' },
        { position: [-1.8, -0.5, 1] as [number, number, number], size: 0.1, color: '#0ea5e9' },
        { position: [1.5, 1.5, 0.8] as [number, number, number], size: 0.08, color: '#22d3ee' },
        { position: [-2, 1.8, -0.3] as [number, number, number], size: 0.18, color: '#0d9488' },
        { position: [2.5, -0.8, 0.3] as [number, number, number], size: 0.1, color: '#06b6d4' },
    ];

    return (
        <>
            {spheres.map((s, i) => (
                <Float key={i} speed={2 + i * 0.3} floatIntensity={0.5}>
                    <Sphere args={[s.size, 32, 32]} position={s.position}>
                        <meshStandardMaterial color={s.color} metalness={0.8} roughness={0.2} />
                    </Sphere>
                </Float>
            ))}
        </>
    );
}

// Cyan cubes at the base
function BaseCubes() {
    return (
        <group position={[0, -1.2, 0]}>
            {/* Main cubes */}
            <Float speed={1.5} floatIntensity={0.2}>
                <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.05} position={[-0.5, 0, 0.5]}>
                    <meshStandardMaterial color="#14b8a6" metalness={0.7} roughness={0.2} />
                </RoundedBox>
            </Float>
            <Float speed={1.8} floatIntensity={0.2}>
                <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.05} position={[0.5, 0.1, 0.4]}>
                    <meshStandardMaterial color="#22d3ee" metalness={0.7} roughness={0.2} />
                </RoundedBox>
            </Float>
            <Float speed={1.3} floatIntensity={0.15}>
                <RoundedBox args={[0.4, 0.4, 0.4]} radius={0.03} position={[0, 0.2, 0.7]}>
                    <meshStandardMaterial color="#0d9488" metalness={0.6} roughness={0.3} />
                </RoundedBox>
            </Float>
        </group>
    );
}

export default function ThreeHero() {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
                <color attach="background" args={['#0a0f1a']} />

                {/* Lighting for metallic/premium look */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
                <pointLight position={[-5, 3, 2]} intensity={0.8} color="#22d3ee" />
                <pointLight position={[5, -2, 3]} intensity={0.5} color="#14b8a6" />
                <spotLight position={[0, 8, 0]} intensity={0.8} angle={0.4} penumbra={1} color="#ffffff" />

                {/* Main medal/trophy composition */}
                <group position={[1.5, 0, 0]}>
                    <Pedestal />
                    <ShieldEmblem />
                    <OrbitalRings />
                    <BaseCubes />
                </group>

                <FloatingSpheres />
            </Canvas>
        </div>
    );
}
