import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <span>
        <Link to="/home" className="nav-link">
          Home
        </Link>
      </span>
      <span>
        <Link to="/bet-form" className="nav-link">
          Create Bet
        </Link>
      </span>
      <span>
        <Link to="/trshtok" className="nav-link">
          TrshTok
        </Link>
      </span>
    </nav>
  );
};

export default Navbar;
