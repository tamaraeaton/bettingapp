import React from "react";
import "./login.css";
import betters from "../../assets/friendsBetting.PNG";

const Login = () => {
  return (
    <div>
      <img src={betters} alt="background" className="betters-img" />
      <div>
        <h2 className="login-title">Login</h2>
        <form className="login-form">
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password"
          />
          <input className="login-button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
