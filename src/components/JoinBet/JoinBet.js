import React, {useContext, useState} from "react";
import "./JoinBet";
import { AppContext } from "../../context/AppContext";
import BetForm from "../BetForm/BetForm";


const JoinBet = () => {
  const { disBet } = useContext(AppContext);

  const [num, setNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [numTik, setNumTik] = useState(1);

  return (
    <div className='general flex-component custom-form-page'>
      <h2 className='custom-form-title'>Join Bet for ${disBet.amount}</h2>
      <h3>Bet Name: {disBet.name}</h3>
      <h3>Bet Description: {disBet.description}</h3>
      <button 
        className="custom-button"
        onClick={()=>{
        setNum(num + 1);
        setNumTik(numTik + 1)
        setTotal(numTik * disBet.amount)
      }}>Add Ticket?</button>
      <h3>Number of Tickets:{num}</h3>
      <h3>Your Total:{total}</h3>
      <button
        className="custom-button"
      >Submit</button>
    </div>
  );
};

export default JoinBet;
