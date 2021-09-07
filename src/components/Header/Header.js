import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

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
          <Link to="/" className="custom-header-link" onClick={logout}>
            Log Out
          </Link>
          <Link to="/user-profile" className="custom-header-link">
            Profile
          </Link>
          <Link to="/about" className="custom-header-link">
            About
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
