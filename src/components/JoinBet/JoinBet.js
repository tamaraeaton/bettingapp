import React, { useContext, useState } from "react";
import "./JoinBet.css";
import { AppContext } from "../../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/Auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const JoinBet = () => {
  const { currentUser } = useContext(AuthContext);
  const { disBet, addBetMember, addBetToUserJoinedBet } =
    useContext(AppContext);

  // const history = useHistory();  ---> use this variable to send the user back to home once you submit your tickets.

  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(-1);
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

  console.log(total);
  console.log(numTik);

  return (
    <div className="general flex-component">
      <div className="custom-form-page">
        <div className="bet-desc">
          <h2 className="custom-form-title">
            Join Bet for ${disBet.ticketCost}
          </h2>
          <h3>Bet Name: {disBet.name}</h3>
          <h3>Bet Description: {disBet.description}</h3>
        </div>
        <h1 className="ticket-title">Tickets</h1>
        <div className="ticket-increment-decrement-wrapper">
          <FontAwesomeIcon
            className="join-bet-icon icon-minus"
            icon={faMinusCircle}
            onClick={() => {
              if (num > 0) {
                setNum(num - 1);
                setNumTik(numTik - 1);
                setTotal((num - 1) * disBet.ticketCost);
              }
            }}
          />

          <p>{num}</p>

          <FontAwesomeIcon
            icon={faPlusCircle}
            className="join-bet-icon icon-plus"
            onClick={() => {
              setNum(num + 1);
              setNumTik(numTik + 1);
              setTotal(numTik * disBet.ticketCost);
            }}
          />
        </div>
        <div className="total-submit-wrapper">
          <h3>Total:{total}</h3>
          <Link to={"/home"} className="join-bet-button" onClick={handleSubmit}>
            Buy tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinBet;
