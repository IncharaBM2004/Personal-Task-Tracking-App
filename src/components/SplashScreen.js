import React from "react";
import Lottie from "lottie-react";
import splashAnim from "../assets/login.json";
import "../styles/App.css";

const SplashScreen = ({ onComplete }) => {
  return (
    <div className="splash-container">
      <Lottie
        animationData={splashAnim}
        loop={false}
        onComplete={onComplete}
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
};

export default SplashScreen;
