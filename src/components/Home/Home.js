import React, { useContext } from "react";
import "./Home.css";
import { withRouter,Link } from "react-router-dom";
import BetList from "../BetList/BetList";
import { AuthContext } from "../../context/Auth";

const createButton = {
  fontSize: "150%",
  width: "fit-content",
  padding: "1rem 2rem",
};

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='home general flex-component'>
      <div className='welcome-user-container'>
        <h1 className='welcome-name'>Welcome, {currentUser.firstName}</h1>
        <h4 className='bet-intro'>Create a bet with your friends</h4>
        <Link to="/bet-form"><button className='general-button'><span>Create Bet</span></button></Link>
      </div>
      <BetList />
    </div>
  );
};

export default withRouter(Home);
