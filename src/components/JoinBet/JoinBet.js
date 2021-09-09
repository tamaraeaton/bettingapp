import React, {useContext} from "react";
import "./JoinBet";
import { AppContext } from "../../context/AppContext";

const JoinBet = () => {
  const { disBet } = useContext(AppContext);

  return (
    <div className='general flex-component custom-form-page'>
      <h2 className='custom-form-title'>Join Bet for $5</h2>
      <h3>Bet Name: {disBet.name}</h3>
      <h3>Bet Description: {disBet.description}</h3>
      <form className='custom-form'>
        <input type='text' placeholder='First Name' />
        <input type='text' placeholder='Last Name' />
        <input type='text' placeholder='Email' />
        <input type="submit" value="Submit" className="custom-button" />
      </form>
    </div>
  );
};

export default JoinBet;
