import React, { useContext } from "react";
import "./login.css";
import betters from "../../assets/friendsBetting.PNG";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsAuth(true);
  };
  return (
    <div>
      <img src={betters} alt="background" className="betters-img" />
      <div>
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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
