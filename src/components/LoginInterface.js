import React, { useState } from "react";
import Lottie from "lottie-react";
import loginInterfaceAnim from "../assets/login interface.json";
import "../styles/App.css";

const LoginInterface = ({ onLogin }) => {
  const [localName, setLocalName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localName.trim()) {
      onLogin(localName.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-animation">
        <Lottie
          animationData={loginInterfaceAnim}
          loop
          style={{ width: 400, maxWidth: "100%" }}
        />
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login Details</h2>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginInterface;
