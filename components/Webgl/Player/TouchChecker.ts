import { store } from "@/store";
import { SetStateAction } from "react";

export const touchChecker = (
  setIsForward: React.Dispatch<SetStateAction<boolean>>,
  setIsBackward: React.Dispatch<SetStateAction<boolean>>,
  setIsLeft: React.Dispatch<SetStateAction<boolean>>,
  setIsRight: React.Dispatch<SetStateAction<boolean>>,
  setIsRightTop: React.Dispatch<SetStateAction<boolean>>,
  setIsRightBottom: React.Dispatch<SetStateAction<boolean>>,
  setIsLeftBottom: React.Dispatch<SetStateAction<boolean>>,
  setIsLeftTop: React.Dispatch<SetStateAction<boolean>>,
  setTurning: React.Dispatch<SetStateAction<number>>,
  turning: number
) => {
  store.touchTurnLeft = () => {
    if (turning === 2) {
      setTurning(0);
    } else {
      setTurning(turning + 0.25);
    }
  };
  store.touchTurnRight = () => {
    if (turning === -2) {
      setTurning(0);
    } else {
      setTurning(turning - 0.25);
    }
  };
  store.touchForwardDown = () => {
    switch (turning) {
      case 0.25:
      case -1.75:
        setIsLeftTop(true);
        break;
      case 0.5:
      case -1.5:
        setIsLeft(true);
        break;
      case 0.75:
      case -1.25:
        setIsLeftBottom(true);
        break;
      case 1:
      case -1:
        setIsBackward(true);
        break;
      case 1.25:
      case -0.75:
        setIsRightBottom(true);
        break;
      case 1.5:
      case -0.5:
        setIsRight(true);
        break;
      case 1.75:
      case -0.25:
        setIsRightTop(true);
        break;

      default:
        setIsForward(true);
        break;
    }
  };
  store.touchForwardUp = () => {
    setIsForward(false);
    setIsBackward(false);
    setIsLeft(false);
    setIsRight(false);
    setIsRightTop(false);
    setIsRightBottom(false);
    setIsLeftBottom(false);
    setIsLeftTop(false);
  };
};
