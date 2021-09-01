import React, { useState, useContext } from "react";
import "./Register.css";
import betters from "../../assets/friendsBetting.PNG";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const Register = () => {
  const { register, errMsg, setErrMsg } = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setErrMsg("Passwords do not match!");
      setPassword("");
      setConfirmPassword("");
    } else {
      register(email, password)
        .then(() => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setErrMsg("");
          history.push("/home");
        })
        .catch((err) => setErrMsg(err.message));
    }
  };

  console.log(errMsg);
  return (
      <div className="general flex-component">
        {/* <div className="error">{errMsg}</div> */}
        <h2 className="register-title">Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="register-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="register-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="register-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <input type="submit" value="Sign up" className="register-button" />
        </form>
      </div>
  );
};

export default Register;
