import React, { useContext } from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import BetList from "../BetList/BetList";
import ButtonText from "../Buttons/ButtonText";
import { AuthContext } from "../../context/Auth";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='home general flex-component'>

      <div className='welcome-user-container'>
      <h1 className="welcome-name">Welcome, {currentUser.firstName}</h1>
        <ButtonText className="create-button" link='/bet-form' text='Create Bet' />
        <div className='create-bet-here'>
          <h4 className='bet-intro'>Create a bet with your friends</h4>
        </div>
      </div>
      <BetList />
    </div>
  );
};

export default withRouter(Home);
