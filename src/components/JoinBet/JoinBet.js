import React, { useContext, useState } from "react";
import "./JoinBet";
import { AppContext } from "../../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/Auth";
import { useHistory } from "react-router-dom";

const JoinBet = () => {
  const { currentUser } = useContext(AuthContext);
  const { disBet, addBetMember, addBetToUser } = useContext(AppContext);
  const history = useHistory();

  const [num, setNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [numTik, setNumTik] = useState(1);
  let newMember = {
    ...currentUser,
    total,
    numTik: numTik - 1,
    belongsTo: disBet.id,
    id: uuidv4()
  };

  const handleSubmit = () => {
    addBetMember(disBet, newMember)
    addBetToUser(currentUser, disBet.id)
  };

  return (
    <div className="general flex-component custom-form-page">
      <h2 className="custom-form-title">Join Bet for ${disBet.ticketCost}</h2>
      <h3>Bet Name: {disBet.name}</h3>
      <h3>Bet Description: {disBet.description}</h3>
      <button
        onClick={() => {
          setNum(num + 1);
          setNumTik(numTik + 1);
          setTotal(numTik * disBet.ticketCost);
        }}
      >
        Add Ticket?
      </button>
      <h3>Number of Tickets:{num}</h3>
      <h3>Your Total:{total}</h3>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default JoinBet;
