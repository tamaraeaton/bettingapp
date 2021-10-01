import React, { useState, useContext, useEffect } from "react";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";
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
  const [dob, setDob] = useState("");
  const [toggleNotification, setToggleNotification] = useState(false);
  const [gender, setGender] = useState("");
  const [toggle, setToggle] = useState(false);

  const toggleGenderField = () => {
    setToggle(!toggle);
    setGender("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (age < 21) {
      setErrMsg("Must be at least 21 years of age!");
    } else {
      const newUser = {
        firstName,
        lastName,
        email,
        dob,
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
    }
  };


  useEffect(() => {
    setErrMsg("")
  }, [])
  
  const ageValidator = (e) => {
    setAge(calAge(e.target.value));
    setDob(e.target.value);
  };
  
  const calAge = (date) => {
    new Date(Date.now() - new Date(date).getTime()).getFullYear() - 1970;
  }

  return (
    <div className="general flex-component custom-form-page">
      <h2 className="custom-form-title">Sign Up</h2>
      {errMsg ? <div className="error">{errMsg}</div> : null}
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
          type="date"
          name="dob"
          className="custom-input"
          onChange={(e) => ageValidator(e)}
        />
        <div className="custom-radio-wrapper">
          <div className="custom-radio">
            <p style={{ marginRight: ".3rem" }}>Male </p>
            <input
              type="radio"
              value="Male"
              name="gender"
              onClick={(e) => {
                setGender("Male");
                setToggle(false);
              }}
            />
          </div>
          {toggle ? (
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              className="custom-input"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            />
          ) : null}

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
        <Link className="login-link" to="/login">
          If you are already registered, click here to Login.
        </Link>
      </div>

    </div>
  );
};

export default Register;
