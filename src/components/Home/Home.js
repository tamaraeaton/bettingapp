import React, { useContext } from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import BetList from "../BetList/BetList";
import ButtonText from "../Buttons/ButtonText";
import { AuthContext } from "../../context/Auth";


const createButton = {
  fontSize: "150%",
  width: "fit-content",
  padding: "1rem 2rem",
  // marginBotton: "10px"
}

const Home = () => {
  const { currentUser } = useContext(AuthContext);


  console.log(currentUser)

  return (
    <div className='home general flex-component'>
      
      <div className='welcome-user-container'>
        <h1 className='welcome-name'>Welcome, {currentUser.firstName}</h1>
        <h4 className='bet-intro'>Create a bet with your friends</h4>
        <ButtonText
          createButton={createButton}
          link='/bet-form'
          text='Create Bet' />
      </div>
     

      <BetList />

      
    </div>
  );
};

export default withRouter(Home);
