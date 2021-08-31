import React from "react";
import "./Home.css";
import { Link, withRouter } from "react-router-dom";
import BetList from "../BetList/BetList";

const Home = () => {
  return (
    <div className="home general flex-component">
      <div className="create-bet-here">
        <h4 className="bet-intro">Create a bet with your friends</h4>
        <Link to="/bet-form" className="create-bet-button">
          Create Bet
        </Link>
      </div>
      <BetList />
    </div>
  );
};

export default withRouter(Home);
