import React from "react";
import "./Register.css";
import betters from "../../assets/friendsBetting.PNG";

const Register = () => {
  return (
    <div>
      <img src={betters} alt="background" className="betters-img" />
      <div>
        <h2 className="register-title">Sign Up</h2>
        <form className="login-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="register-input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="register-input"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="register-input"
          />
          <input type="submit" value="Sign up" className="register-button" />
        </form>
      </div>
    </div>
  );
};

export default Register;
