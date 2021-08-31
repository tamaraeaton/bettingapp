import React, { useContext } from "react";
import "./DisplayBet.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";

const DisplayBet = ({ bet }) => {
  const { currentUser } = useContext(AuthContext);
  const { disBet } = useContext(AppContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  return (
    <div className="join-bet">
      <div>
        <h1 className="name">Bet Name: {disBet.name}</h1>
      </div>
      <div>
        <h1 className="bd">Bet Description: {disBet.description}</h1>
      </div>
      <div>
        <h1 className="Am">Amount:</h1>
      </div>
      {currentUserId === disBet.owner ? "Members" : null}
      {currentUserId === disBet.owner ? (
        <button>See Members</button>
      ) : (
        <button>Join Bet</button>
      )}
    </div>
  );
};

export default DisplayBet;
