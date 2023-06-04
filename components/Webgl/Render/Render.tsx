import { Canvas } from "@react-three/fiber";
import s from "./render.module.scss";
import {
  AdaptiveDpr,
  Environment,
  Html,
  OrbitControls,
  Stats,
} from "@react-three/drei";
import { Suspense, useState } from "react";
import { Debug, Physics } from "@react-three/rapier";
import Player from "../Player/Player";
import { Building } from "../Model/Building";
import { Door } from "../Model/Door";
import { BsFillCaretUpFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { store } from "@/store";
import { useSnapshot } from "valtio";
import ProductDetail from "@/components/Html/ProductDetail/ProductDetail";
import AnimatedCamera from "../AnimatedCamera/AnimatedCamera";
import SubscriptionPopup from "@/components/Html/SubscriptionPopup/SubscriptionPopup";
import InvisibleWall from "../Model/InvisibleWall";
import SignIn from "@/components/Html/SignIn/SignIn";
import TrackingPopup from "@/components/Html/TrackingPopup/TrackingPopup";
import { Sandals } from "../Model/Sandals";

const Render = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isWallOpen, setIsWallOpen] = useState<boolean>(false);

  const {
    touchTurnLeft,
    touchTurnRight,
    touchForwardDown,
    touchForwardUp,
    user,
  } = useSnapshot(store);

  return (
    <main className={s.main}>
      <div className={s.buttongroup}>
        <button onClick={touchTurnLeft}>
          <TiArrowBack />
        </button>
        <button onPointerDown={touchForwardDown} onPointerUp={touchForwardUp}>
          <BsFillCaretUpFill />
        </button>
        <button onClick={touchTurnRight} data-flip>
          <TiArrowBack />
        </button>
      </div>

      <ProductDetail />

      <SubscriptionPopup
        setIsWallOpen={setIsWallOpen}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />

      {user ? (
        <>
          <TrackingPopup />
          <Canvas camera={{ position: [2, 2, 5] }}>
            {/* <OrbitControls /> */}

            <Stats />
            <AdaptiveDpr />
            <Environment preset="city" />

            <AnimatedCamera />
            <Suspense
              fallback={
                <Html center>
                  <h1 style={{ color: "white" }}>Loading..</h1>
                </Html>
              }
            >
              <Physics>
                {/* <Debug /> */}
                <Player camera={true} />
                <Building />
                <Sandals />
                <Door isOpen={isOpen} />
                <InvisibleWall
                  setIsOpen={setIsOpen}
                  isWallOpen={isWallOpen}
                  setIsPopupOpen={setIsPopupOpen}
                />
              </Physics>
            </Suspense>
          </Canvas>
        </>
      ) : (
        <SignIn />
      )}
    </main>
  );
};

export default Render;
