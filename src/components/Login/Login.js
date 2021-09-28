import React, { useContext, useState } from "react";
import "./login.css";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const Login = () => {
  const history = useHistory();
  const { login, errMsg, setErrMsg, getUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(res => {
        setEmail("");
        setPassword("");
        getUser(res.user.uid, true, history)
      })
      .catch((err) => setErrMsg(err.message));
  };

  return (
    <div className="general flex-component custom-form-page">
      <div className="form-wrappers">
        <h2 className="custom-form-title">Login</h2>
        {errMsg ? <div className="error">{errMsg}</div> : null}
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
        <Link className="register-link" to="/register">
          If you are not registered, click here to Register.
        </Link>
      </div>
    </div>
  );
};

export default Login;
