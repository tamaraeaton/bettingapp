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
            <Link to="/" className="nav-link" onClick={logout}>
              Log Out
            </Link>
            {/* other links here */}
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/bet-form" className="nav-link">
              Create Bet
            </Link>
            <Link to="/trshtok" className="nav-link">
              TrshTok
            </Link>
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
