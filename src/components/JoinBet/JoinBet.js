import React, { useContext, useState } from "react";
import "./JoinBet";
import { AppContext } from "../../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/Auth";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom"; --> will be used by the variable  on line 13. 

const JoinBet = () => {
  const { currentUser } = useContext(AuthContext);
  const { disBet, addBetMember, addBetToUserJoinedBet } =
    useContext(AppContext);

  // const history = useHistory();  ---> use this variable to send the user back to home once you submit your tickets.

  const [num, setNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [numTik, setNumTik] = useState(1);
  let newMember = {
    ...currentUser,
    total,
    numTik: numTik - 1,
    belongsTo: disBet.id,
    id: uuidv4(),
  };

  const handleSubmit = () => {
    addBetMember(disBet, newMember);
    addBetToUserJoinedBet(currentUser, disBet.id);
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
      <Link to={"/home"} className="">
      <button onClick={handleSubmit}>Submit</button>
      </Link>
    </div>
  );
};

export default JoinBet;
