import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);

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
        {currentUser ? (
          <div>
            <Link to="/" className="log-out" onClick={logout}>
              Log Out
            </Link>
            {/* other links here */}
          </div>
        ) : null}
        <Link to="/about" className="create-about-button">
          About
        </Link>
      </div>
    </div>
  );
};

export default Header;
