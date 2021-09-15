import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DisplayBet.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";

const DisplayBet = ({ bet }) => {
  const { currentUser } = useContext(AuthContext);
  const { disBet, getBetMembers } = useContext(AppContext);

  useEffect(() => {
    getBetMembers(disBet.id);
  }, []);
  const currentUserId = currentUser ? currentUser.uid : null;
  return (
    <div className="join-bet">
      <div>
        <h1 className="name">Bet Name: {disBet.name}</h1>
      </div>
      <div>
        {currentUserId === disBet.owner ? (
          <h1 className="Oh">Owner/Host: You</h1>
        ) : (
          <h1 className="Oh">Owner/Host: {disBet.ownerEmail}</h1>
        )}
      </div>
      <div>
        <h1 className="bd">Bet Description: {disBet.description}</h1>
      </div>
      <div>
        <h1 className="Am">Pot Total: $</h1>
      </div>
      <div className="button-container">
        <Link to="/display-members">
          <button className="display-bet-button">See Members</button>
        </Link>
      </div>
      <div className="button-container">
        <Link to="/join-bet">
          <button className="display-bet-button">Join Bet</button>
        </Link>
      </div>
    </div>
  );
};

export default DisplayBet;
