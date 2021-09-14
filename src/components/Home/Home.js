import React, { useContext } from "react";
import "./Home.css";
import { Link, withRouter } from "react-router-dom";
import BetList from "../BetList/BetList";
import { AuthContext } from "../../context/Auth";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className='home general flex-component'>
      <div className="welcome-user-container">
        <h1>Welcome, {currentUser.firstName}</h1>
        <div className='create-bet-here'>
          <h4 className='bet-intro'>Create a bet with your friends</h4>
          <button className='custom-button'>
            <Link to='/bet-form'>Create Bet</Link>
          </button>
        </div>
      </div>
      <BetList />
    </div>
  );
};

export default withRouter(Home);
