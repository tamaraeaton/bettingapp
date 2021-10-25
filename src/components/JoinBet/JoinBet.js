import React, { useContext, useState } from "react";
import "./JoinBet.css";
import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../context/Auth";

const JoinBet = () => {
  const { currentUser, setErrMsg, errMsg } = useContext(AuthContext);
  const {
    theChoiceMembers,
    theChoice,
    disBet,
    addBetMember,
    addBetToUserJoinedBet,
    theIndex,
  } = useContext(AppContext);

  const handleSubmit = (index) => {
    if (currentUser.money < disBet.ticketCost) {
      setErrMsg("Not enough funds to join bet!");
    } else {
      let newMember = {
        ...currentUser,
        money: currentUser.money - disBet.ticketCost,
      };

      addBetMember(index, disBet, currentUser);
      addBetToUserJoinedBet(newMember, disBet.id);
    }
  };

  const checkIfJoined = () => {
    if (theChoiceMembers.length === 0) {
      return (
        <button onClick={() => handleSubmit(theIndex)}>
          <span>Join</span>
        </button>
      );
    } 
    for (let i = 0; i < theChoiceMembers.length; i++) {
      if (theChoiceMembers[i].id === currentUser.id) {
        return <p>joined</p>;
      } else {
        return (
          <button onClick={() => handleSubmit(theIndex)}>
            <span>Join</span>
          </button>
        );
      }
    }
  };

  return (
    <div className="general flex-component join-bet-page">
      <div className="join-bet-choice-details">
        <h2>{theChoice.name}</h2>
        <p>{theChoice.description}</p>
      </div>
      {errMsg ? <div className="error">{errMsg}</div> : null}
      {checkIfJoined()}
    </div>
  );
};

export default JoinBet;
