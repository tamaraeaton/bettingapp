import React, { useContext, useState } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
// import betters from "../../assets/friendsBetting.PNG";
import { AuthContext } from "../../context/Auth";

const Login = () => {
  const history = useHistory();
  const { login, errMsg, setErrMsg } = useContext(AuthContext);
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
    <div className="general flex-component">
      {/* <img src={betters} alt="background" className="betters-img" /> */}
      <div>
        <h2 className="login-title">Login</h2>
        <div className="error">{errMsg}</div>
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
