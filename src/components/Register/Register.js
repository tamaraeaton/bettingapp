import React, { useState, useContext } from "react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const Register = () => {
  const { register, errMsg, setErrMsg, addUser } = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      age,
      gender,
    };

    if (confirmPassword !== password) {
      setErrMsg("Passwords do not match!");
      setPassword("");
      setConfirmPassword("");
    } else {
      register(newUser, password)
        .then((user) => {
          addUser(newUser, user.user.uid).then(() => {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setErrMsg("");
            history.push("/home");
          });
        })
        .catch((err) => setErrMsg(err.message));
    }
  };

  return (
    <div className="general flex-component custom-form-page">
      {errMsg ? <div className="error">{errMsg}</div> : null}
      <h2 className="custom-form-title">Sign Up</h2>
      <form className="custom-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="custom-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="custom-input"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="custom-input"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          className="custom-input"
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          className="custom-input"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="custom-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="custom-input"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <input type="submit" value="Sign up" className="custom-button" />
      </form>
    </div>
  );
};

export default Register;
