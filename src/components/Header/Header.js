import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/Auth";
import firebase from "../../firebase/firebase"

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <div className="calheader">
      <div className="company-section">
        <div className="twire-logo"></div>
        <div>
          <a href="" className="twire-link">
            <link src="url" />
            TWIRE
          </a>
        </div>
      </div>
      <div className="header-link-section">
        <div>
          {currentUser ? (
            <Link to="/" className="log-out" onClick={logout}>
              Log Out
            </Link>
          ) : null}
        </div>
        <Link to="/about" className="create-about-button">
          About
        </Link>
      </div>
    </div>
  );
};

export default Header;
