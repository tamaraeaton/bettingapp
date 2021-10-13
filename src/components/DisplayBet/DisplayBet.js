import React, { useContext, useEffect } from "react";
import "./DisplayBet.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import ButtonText from "../Buttons/ButtonText";
import { useState } from "react/cjs/react.development";

const DisplayBet = ({ bet }) => {
  const { currentUser } = useContext(AuthContext);
  const { disBet, getBetMembers } = useContext(AppContext);
  const [theChoices, setTheChoices] = useState(
    disBet.choices.filter((cho) => (cho.name !== "" ? cho : null))
  );

  useEffect(() => {
    getBetMembers(disBet.id);
  }, []);

  const currentUserId = currentUser ? currentUser.uid : null;

  console.log(theChoices);
  return (
    <div className="general join-bet">
      <div className="bet-information">
        <div className="info1">
          <h2>
            Bet:{" "}
            <u>
              <i>{disBet.name}</i>
            </u>
          </h2>
          <h3>Pot: ${disBet.potTotal}</h3>
          <h4>{disBet.description}</h4>
        </div>

        <h5 className="info2">
          Questions about the bet? Email the creator, <u>{disBet.ownerEmail}</u>
        </h5>
      </div>
      <div className="choices-container">
        {theChoices.map((cho, index) => (
          <div key={index} className="a-choice-container">
            <div className="item-info">
              <p className="choice-name">{cho.name}</p>
              <p className="choice-description">-{cho.description}</p>
            </div>
            <button className="choice-button">Join</button>
          </div>
        ))}
      </div>

      <div className="button-container">
        <ButtonText link="/display-members" text="Display Members" />
      </div>
      <div className="button-container">
        <ButtonText link="/join-bet" text="Join Bet" />
      </div>
    </div>
  );
};

export default DisplayBet;
