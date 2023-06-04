import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { RigidBody } from "@react-three/rapier";

type GLTFResult = GLTF & {
  nodes: {
    mount002_1: THREE.Mesh;
    mount002_2: THREE.Mesh;
  };
  materials: {
    ["MATE L DOOR"]: THREE.MeshStandardMaterial;
    ["Glass clean"]: THREE.MeshPhysicalMaterial;
  };
  animations: GLTFAction[];
};

type ActionName = "mount.002Action";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type props = {
  isOpen: boolean;
};

export const Door: React.FC<props> = ({ isOpen }) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF("/door.glb") as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["mount.002Action"]?.play().setDuration(10);
    actions["mount.002Action"]!.paused = true;
    if (isOpen) {
      actions["mount.002Action"]!.paused = false;
      setTimeout(() => {
        actions["mount.002Action"]!.paused = true;
      }, 5000);
    }
  }, [isOpen, actions]);
  return (
    <group scale={1.8} ref={group} dispose={null}>
      <group name="Scene">
        <group
          name="mount002"
          position={[0.34, 0.35, 1.96]}
          rotation={[-Math.PI / 2, 0, -2.06]}
          scale={[-0.028, -0.01, -0.01385]}
        >
          <mesh
            name="mount002_1"
            castShadow
            receiveShadow
            geometry={nodes.mount002_1.geometry}
            material={materials["MATE L DOOR"]}
          />
          <mesh
            name="mount002_2"
            castShadow
            receiveShadow
            geometry={nodes.mount002_2.geometry}
            material={materials["Glass clean"]}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/door.glb");
