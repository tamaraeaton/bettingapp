import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
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
          {isAuth ? (
            <Link to="/" onClick={() => setIsAuth(false)} className="log-out">
              <link src="url" />
              Log Out
            </Link>
          ) : null}
        </div>
        <a href="" className="about-link">
          <link src="url" />
          About
        </a>
      </div>
    </div>
  );
};

export default Header;
