import React, { useContext, useState } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const Login = () => {
  const history = useHistory();
  const { login, errMsg, setErrMsg, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        history.push("/home");
      })
      .catch((err) => setErrMsg(err.message));
  };

  return (
    <div className="general flex-component custom-form-page">
      {errMsg ? <div className="error">{errMsg}</div> : null}
      <h2 className="custom-form-title">Login</h2>
      <form className="custom-form" onSubmit={handleSubmit}>
        <input
          className="custom-input"
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="custom-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input className="custom-button" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
