import React, { useState } from "react";
import "./Register.css";
import betters from "../../assets/friendsBetting.PNG";
import firebase from "../../firebase/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setErrMsg("Passwords do not match!");
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setErrMsg("");
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(errMsg);
  return (
    <div>
      <img src={betters} alt="background" className="betters-img" />
      <div>
        <h2 className="register-title">Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* <input
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
          /> */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="register-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="register-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="register-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input type="submit" value="Sign up" className="register-button" />
        </form>
      </div>
    </div>
  );
};

export default Register;
