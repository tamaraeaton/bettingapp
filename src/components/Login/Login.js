import React, { useContext, useState } from "react";
import "./login.css";
import betters from "../../assets/friendsBetting.PNG";
import firebase from "../../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((err) => console.log(err));
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
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input className="login-button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
