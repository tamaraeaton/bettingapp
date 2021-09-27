import React, { useContext } from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import BetList from "../BetList/BetList";
import ButtonText from "../Buttons/ButtonText";
import { AuthContext } from "../../context/Auth";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  
  const createButton = {
    fontSize: 30,
    width: 500,
    height: 80,
  } 

  console.log(currentUser)

  return (
    <div className='home general flex-component'>
      <div className='welcome-user-container'>
        <h1 className='welcome-name'>Welcome, {currentUser.firstName}</h1>
        <div className='create-bet-here'>
          <h4 className='bet-intro'>Create a bet with your friends</h4>
          <ButtonText createButton={createButton} link='/bet-form' text='Create Bet' />
        </div>
      </div>
      <BetList />
    </div>
  );
};

export default withRouter(Home);
