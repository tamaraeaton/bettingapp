import React, { useState, useContext } from "react";
import "./EditUserComponent.css";
import { AuthContext } from "../../context/Auth";
import { useHistory } from "react-router-dom";

const EditUserComponent = () => {
  const history = useHistory();
  const { currentUser, editUser, errMsg, setErrMsg } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [age, setAge] = useState(currentUser.age);
  const [gender, setGender] = useState(currentUser.gender);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);

  const toggleGenderField = () => {
    setToggle(!toggle);
    setGender("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updateUser = {
      ...currentUser,
      email,
      firstName,
      lastName,
      age,
      gender,
      id: currentUser.id,
    };

    if (toggleInput) {
      if (password === confirmPassword) {
        let updatePasswordAndUser = {
          ...currentUser,
          firstName,
          lastName,
          age,
          gender,
          email,
          password,
          id: currentUser.id,
        };

        editUser(updatePasswordAndUser).then(() => {
          history.push("/user-profile");
        }).then(() => setErrMsg(""))
      } else {
        setErrMsg("Passwords do not match!");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      editUser(updateUser).then(() => {
        setErrMsg("");
        history.push("/user-profile");
      });
    }
  };

  return (
    <div className="general flex-component custom-form-page">
      {errMsg ? <div className="error">{errMsg}</div> : null}
      <h2 className="custom-form-title">Edit Profile</h2>
      <form className="custom-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="custom-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="custom-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="custom-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="custom-input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
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
          <div className="custom-radio">
            <p style={{ marginRight: ".3rem" }}>Female </p>
            <input
              type="radio"
              value="Female"
              name="gender"
              onClick={(e) => {
                setGender("Female");
                setToggle(false);
              }}
            />
          </div>
          <div className="custom-radio">
            <p style={{ marginRight: ".3rem" }}>Other </p>
            <input type="radio" name="gender" onClick={toggleGenderField} />
          </div>
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
        <p className="edit-user-link" onClick={() => setToggleInput(true)}>
          <u>Change password?</u>
        </p>
        {toggleInput ? (
          <div className="email-password-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="custom-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
        ) : null}
        <input type="submit" value="Submit" className="custom-button" />
      </form>
    </div>
  );
};

export default EditUserComponent;
