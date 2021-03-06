import React from "react";
import "./Welcome.css";
import ImagePlaceholder from "../../assets/welcome1.PNG";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="general flex-component welcome">
      <div className="welcome-hero">
        <div className="links-section">
          <Link to="/login" className="login-anchor">
            <h1 className="login">Login</h1>
          </Link>
          <Link to="/register" className="signup-anchor">
            <h1 className="sign-up">Sign Up</h1>
          </Link>
        </div>
        <img
          id="image-placeholder"
          src={ImagePlaceholder}
          alt=""
        />
      </div>

      <div className="intro">
        <h3 className="intro-text">
          Have a little fun placing bets with your friends and others with ease
          on our friendly wager app.
          <br />
          You can create your own silly bet with friends or place your bet with
          current open bets.
        </h3>
      </div>
    </div>
  );
};

export default Welcome;
