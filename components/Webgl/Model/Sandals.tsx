import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useCursor, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { store } from "@/store";

type GLTFResult = GLTF & {
  nodes: {
    simply_coll002: THREE.Mesh;
    simply_cloth001: THREE.Mesh;
    Object_4001: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.006"]: THREE.MeshStandardMaterial;
    ["Material.005"]: THREE.MeshStandardMaterial;
  };
};

export function Sandals(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/sandals.glb") as GLTFResult;

  const [hovered, setHovered] = useState<boolean>(false);

  useCursor(hovered);

  const handleShoe = (
    object: THREE.Object3D<THREE.Event>,
    detail: {
      heading: string;
      subheading: string;
      detail: string[];
      price: number;
      stripePrice: string;
    },
    cameraConfig: { x: number; y: number; z: number }
  ) => {
    store.ladyshoeCameraDefault = true;
    store.animatedSecondCameraConfig = cameraConfig;

    store.shoeDetailPopupIsActive = true;
    store.shoeDetail = detail;
    store.shoeRotatingMesh = object;
  };

  return (
    <group scale={1.8} {...props} dispose={null}>
      <mesh
        geometry={nodes.simply_coll002.geometry}
        material={materials["Material.001"]}
        position={[25.97, 0.88, -16.78]}
        scale={0.02}
        onClick={(e) =>
          handleShoe(
            e.object,
            {
              heading: "HERA",
              subheading: "(simple cut high heel)",
              detail: [
                "Calf leather",
                "Printed python print black special material",
                "Varnish patent leather black special material",
                "Black goat lining",
                "Varnish patent leather",
                "Gold varnish",
              ],
              price: 245.99,
              stripePrice: "",
            },
            {
              x: 46.3,
              y: 1.6,
              z: -28.8,
            }
          )
        }
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      />
      <mesh
        geometry={nodes.simply_cloth001.geometry}
        material={materials["Material.006"]}
        position={[25.07, 0.89, -17.3]}
        scale={[0.02, 0.02, 0.01]}
        onClick={(e) =>
          handleShoe(
            e.object,
            {
              heading: "CASIOPEA",
              subheading: "(simple cut high heel)",
              detail: [
                "Varnish patent leather black special material",
                "Varnish patent leather Liliac special material",
                "Black goat lining",
                "Varnish patent leather black varnish",
              ],
              price: 0,
              stripePrice: "",
            },
            {
              x: 44.5,
              y: 1.6,
              z: -29.7,
            }
          )
        }
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      />
      <mesh
        geometry={nodes.Object_4001.geometry}
        material={materials["Material.005"]}
        position={[25.6, 0.94, -17.3]}
        scale={0.02}
        onClick={(e) =>
          handleShoe(
            e.object,
            {
              heading: "PEARLY",
              subheading: "(full cut high heel)",
              detail: [
                "Glitter pink special material",
                "Fuxia goat lining",
                "Varnish patent leather white varnish",
              ],
              price: 0,
              stripePrice: "",
            },
            {
              x: 45.6,
              y: 1.7,
              z: -29.9,
            }
          )
        }
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      />
    </group>
  );
}

useGLTF.preload("/sandals.glb");
