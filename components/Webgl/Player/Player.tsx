import { Capsule, PerspectiveCamera, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, quat, euler } from "@react-three/rapier";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { keyChecker } from "./keyChecker";
import { store } from "@/store";
import { touchChecker } from "./TouchChecker";
import { useSnapshot } from "valtio";

type props = {
  camera: boolean;
};

const Player: React.FC<props> = ({ camera }) => {
  const rigidBody = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  // useHelper(cameraRef, THREE.CameraHelper);

  const { shoeCameraDefault } = useSnapshot(store);

  const [isForward, setIsForward] = useState<boolean>(false);
  const [isBackward, setIsBackward] = useState<boolean>(false);
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);
  const [isRightTop, setIsRightTop] = useState<boolean>(false);
  const [isRightBottom, setIsRightBottom] = useState<boolean>(false);
  const [isLeftTop, setIsLeftTop] = useState<boolean>(false);
  const [isLeftBottom, setIsLeftBottom] = useState<boolean>(false);
  const [turning, setTurning] = useState<number>(0);
  const [active, setActive] = useState<boolean>(true);

  // Touch Controls

  useEffect(() => {
    touchChecker(
      setIsForward,
      setIsBackward,
      setIsLeft,
      setIsRight,
      setIsRightTop,
      setIsRightBottom,
      setIsLeftBottom,
      setIsLeftTop,
      setTurning,
      turning
    );
  }, [turning]);

  // Keyboard Controls

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      keyChecker(
        event,
        setIsForward,
        setIsBackward,
        setIsLeft,
        setIsRight,
        setIsRightTop,
        setIsRightBottom,
        setIsLeftBottom,
        setIsLeftTop,
        setTurning,
        turning
      );
    };

    const keyUpHandler = () => {
      setIsForward(false);
      setIsBackward(false);
      setIsLeft(false);
      setIsRight(false);
      setIsRightTop(false);
      setIsRightBottom(false);
      setIsLeftBottom(false);
      setIsLeftTop(false);
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [isBackward, isForward, isLeft, isRight, turning]);

  //Camera Turning Controls
  useEffect(() => {
    if (turning === 2 || turning === -2) {
      setActive(false);
      gsap
        .timeline()
        .to(cameraRef.current!.rotation, { y: Math.PI * turning })
        .call(() => setTurning(0))
        .set(cameraRef.current!.rotation, { y: 0 })
        .call(() => setActive(true));
    } else {
      if (active) {
        gsap
          .timeline()
          .to(cameraRef.current!.rotation, { y: Math.PI * turning });
      }
    }
  }, [turning, active]);

  // Controls Functionality
  useFrame(() => {
    if (rigidBody.current) {
      if (isForward) {
        rigidBody.current!.applyImpulse({ x: 0, y: 0, z: -0.5 }, true);
      } else if (isBackward) {
        rigidBody.current.applyImpulse({ x: 0, y: 0, z: 0.5 }, true);
      } else if (isLeft) {
        rigidBody.current.applyImpulse({ x: -0.5, y: 0, z: 0 }, true);
      } else if (isRight) {
        rigidBody.current.applyImpulse({ x: 0.5, y: 0, z: 0 }, true);
      } else if (isRightTop) {
        rigidBody.current.applyImpulse({ x: 0.5, y: 0, z: -0.5 }, true);
      } else if (isRightBottom) {
        rigidBody.current.applyImpulse({ x: 0.5, y: 0, z: 0.5 }, true);
      } else if (isLeftTop) {
        rigidBody.current.applyImpulse({ x: -0.5, y: 0, z: -0.5 }, true);
      } else if (isLeftBottom) {
        rigidBody.current.applyImpulse({ x: -0.5, y: 0, z: 0.5 }, true);
      }
    }
  });

  return (
    <RigidBody
      lockRotations={true}
      ref={rigidBody}
      colliders={"hull"}
      position={[0, 0, 14]}
    >
      <Capsule ref={meshRef} scale={0.5} position-y={1} args={[1, 2, 8, 8]} />
      <PerspectiveCamera
        ref={cameraRef}
        position={[0, 2, 0]}
        far={100}
        near={1}
        makeDefault={camera ? (shoeCameraDefault ? false : true) : false}
      />
    </RigidBody>
  );
};

export default Player;
