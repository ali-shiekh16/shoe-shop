import { proxy } from "valtio";
import * as THREE from "three";

type shoeDetailType = {
  heading: string;
  subheading: string;
  detail: string[];
  price: number;
  stripePrice: string;
};

type animatedCameraConfigType = {
  x: number;
  y: number;
  z: number;
};

type storeType = {
  touchTurnLeft: () => void;
  touchTurnRight: () => void;
  touchForwardDown: () => void;
  touchForwardUp: () => void;
  shoeRotateRight: () => void;
  shoeRotateLeft: () => void;
  shoeDetailPopupIsActive: boolean;
  shoeDetail: shoeDetailType;
  animatedCameraConfig: animatedCameraConfigType;
  animatedSecondCameraConfig: animatedCameraConfigType;
  shoeRotatingMesh: THREE.Object3D<THREE.Event> | null;
  shoeCameraDefault: boolean;
  ladyshoeCameraDefault: boolean;
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
};

export const store = proxy<storeType>({
  touchTurnLeft: () => console.log("working"),
  touchTurnRight: () => console.log("working"),
  touchForwardDown: () => console.log("working"),
  touchForwardUp: () => console.log("working"),
  shoeRotateRight: () => console.log("working"),
  shoeRotateLeft: () => console.log("working"),
  shoeDetailPopupIsActive: false,
  shoeDetail: {
    heading: "",
    subheading: "",
    detail: [""],
    price: 0,
    stripePrice: "",
  },
  animatedCameraConfig: { x: 18, y: 2.5, z: -14.4 },
  animatedSecondCameraConfig: { x: 42, y: 2.5, z: -25.3 },
  shoeRotatingMesh: null,
  shoeCameraDefault: false,
  ladyshoeCameraDefault: false,
  user: undefined,
});
