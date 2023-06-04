import { CuboidCollider } from "@react-three/rapier";

type props = {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isWallOpen: boolean;
};

const InvisibleWall: React.FC<props> = ({
  isWallOpen,
  setIsOpen,
  setIsPopupOpen,
}) => {
  return (
    <>
      <CuboidCollider
        position={[0, 3, 4]}
        args={[3, 3, 6]}
        sensor
        onIntersectionEnter={() => setIsOpen(true)}
      />
      <CuboidCollider
        sensor={isWallOpen}
        position={[65, 3, -20]}
        args={[3, 3, 20]}
      />
      <CuboidCollider
        position={[60, 3, -20]}
        args={[3, 3, 20]}
        sensor
        onIntersectionEnter={() => setIsPopupOpen(true)}
      />
    </>
  );
};

export default InvisibleWall;
