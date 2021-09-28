import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { isAuth, logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  let openStyle = {
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    top: "70px",
    left: "0",
    background: "darkgrey",
    width: "100%",
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 770) {
        setIsOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="calheader">
      <Link to="/home" className="twire-link">
        <div className="twire-logo"></div> TWIRE
      </Link>

      <div className="navigation">
        {isAuth ? (
          <div
            className="header-link-section"
            style={isOpen ? openStyle : null}
          >
            <Link
              to="/user-profile"
              className="custom-header-link"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
            <Link
              to="/home"
              className="custom-header-link"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/bet-form"
              className="custom-header-link"
              onClick={() => setIsOpen(false)}
            >
              Create Bet
            </Link>
            <Link
              to="/trshtok"
              className="custom-header-link"
              onClick={() => setIsOpen(false)}
            >
              TrshTok
            </Link>
            <Link
              to="/about"
              className="custom-header-link"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link to="/" className="custom-header-link" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Log Out
            </Link>
          </div>
        ) : (
          <div className="header-link-section">
            <Link to="/about" className="custom-header-link">
              About
            </Link>
          </div>
        )}
        <div className="hambagga-menu" onClick={toggle}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  );
};

export default Header;
