import React from "react";
import Lottie from "lottie-react";
import interfaceAnim from "../assets/interface.json";

const InterfaceBackground = () => {
  return (
    <Lottie
      animationData={interfaceAnim}
      loop
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0.4
      }}
    />
  );
};

export default InterfaceBackground;
