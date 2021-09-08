import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./DisplayBet.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";

const DisplayBet = ({ bet }) => {
  const { currentUser } = useContext(AuthContext);
  const { disBet } = useContext(AppContext);
  console.log(disBet);
  console.log(currentUser);
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
        <h1 className="bd">Members: Number Of Members</h1>
      </div>
      <div className="button-link">
        <h1 className="Am">Total Amount:</h1>
        {currentUserId === disBet.owner ? (
          <Link to="/display-members">
            <button className="display-bet-button">See Members</button>
          </Link>
        ) : (
          <button className="display-bet-button">Join Bet</button>
        )}
      </div>
    </div>
  );
};

export default DisplayBet;
