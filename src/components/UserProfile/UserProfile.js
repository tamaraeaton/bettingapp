import React, { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faDollarSign,
  faUserEdit,
  faMoneyBillAlt
} from "@fortawesome/free-solid-svg-icons";
const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="general flex-component user-profile">
      <div className="user-image-name-container">
        <FontAwesomeIcon icon={faUser} className="user-icon" />
        <div className="user-info">
          <p>Name: {currentUser.firstName + " " + currentUser.lastName}</p>
          <p>
            Email: <u>{currentUser.email}</u>
          </p>
          <p>DOB: {currentUser.dob}</p>
          <p>Gender: {currentUser.gender}</p>
          <p></p>
        </div>
      </div>
      <div className="user-links">
        <div className="user-link-container">
          <Link to={"/home"} className="link custom-user-links">
            <FontAwesomeIcon icon={faDollarSign} /> Your Bets
          </Link>
          <Link className="link custom-user-links" to="/user-friends">
            <FontAwesomeIcon icon={faUsers} /> Friends
          </Link>
          <Link className="link custom-user-links" to="/edit-profile"><FontAwesomeIcon icon={faUserEdit} /> Edit Profile</Link>
          <Link className="link custom-user-links" to="/buy-money"><FontAwesomeIcon icon={faMoneyBillAlt} /> Buy money</Link>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
