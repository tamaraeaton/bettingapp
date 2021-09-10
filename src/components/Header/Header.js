import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { isAuth, logout } = useContext(AuthContext);

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

      {isAuth ? (
        <div className="header-link-section">
          <Link to="/user-profile" className="custom-header-link">
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
          <Link to="/home" className="custom-header-link">
            Home
          </Link>
          <Link to="/bet-form" className="custom-header-link">
            Create Bet
          </Link>
          <Link to="/trshtok" className="custom-header-link">
            TrshTok
          </Link>
          <Link to="/about" className="custom-header-link">
            About
          </Link>
          <Link to="/" className="custom-header-link" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Log Out
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/about" className="custom-header-link">
            About
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
