import React, { useContext, useEffect } from "react";
import "./DisplayBet.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";

const DisplayBet = ({ bet }) => {
  const { currentUser, setErrMsg, errMsg } = useContext(AuthContext);
  const { disBet, getBetMembers, addBetToUserJoinedBet, addBetMember } =
    useContext(AppContext);
  const [theChoices, setTheChoices] = useState(
    disBet.choices.filter((cho) => (cho.name !== "" ? cho : null))
  );

  const handleSubmit = (index) => {
    console.log(disBet, currentUser, index);
    if (currentUser.money < disBet.ticketCost) {
      setErrMsg("Not enough funds to join bet!");
    } else {
      addBetMember(index, disBet, currentUser);
      addBetToUserJoinedBet(currentUser, disBet.id);
    }
  };

  useEffect(() => {
    getBetMembers(disBet.id);
  }, []);

  return (
    <div className="general join-bet">
      <div className="bet-information">
        <div className="info1">
          <h3>
            Bet:{" "}
            <u>
              <i>{disBet.name}</i>
            </u>
          </h3>
          <h3>Pot: ${disBet.potTotal}</h3>
          <h3>{disBet.description}.</h3>
          <h3>Each choice costs ${disBet.ticketCost}.</h3>
        </div>

        <p className="info2">
          Questions about the bet? Email the creator, <u>{disBet.ownerEmail}</u>
        </p>
      </div>
      {errMsg ? <div className="error">{errMsg}</div> : null}
      <div className="choices-container">
        {theChoices.map((cho, index) => (
          <div key={index} className="a-choice-container">
            <div className="item-info">
              <p className="choice-name">{cho.name}</p>
              <p className="choice-description">-{cho.description}</p>
            </div>
            <button
              className="choice-button"
              onClick={() => handleSubmit(index)}
            >
              Join
            </button>
          </div>
        ))}
      </div>

      <div className="button-container">
      <Link to="/display-members"><button className='general-button'><span>Display Members</span></button></Link>
      </div>
      <div className="button-container">
      <Link to="/join-bet"><button className='general-button'><span>Join Bet</span></button></Link>
      </div>
    </div>
  );
};

export default DisplayBet;
