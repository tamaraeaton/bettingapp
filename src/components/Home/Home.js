import React from "react";
import "./Home.css";
import { Link, withRouter } from "react-router-dom";
import BetList from "../BetList/BetList";

const Home = () => {
  return (
    <div className="home general flex-component">
      <div className="create-bet-here">
        <h4 className="bet-intro">Create a bet with your friends</h4>
        <button className="custom-button">
          <Link to="/bet-form">Create Bet</Link>
        </button>
      </div>
      <BetList />
    </div>
  );
};

export default withRouter(Home);
