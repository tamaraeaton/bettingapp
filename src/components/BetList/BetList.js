import React, { useEffect, useContext, useState } from "react";
import "./BetList.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faGlasses,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import ButtonText from "../Buttons/ButtonText";

const BetList = () => {
  const { currentUser, userJoinedBets } = useContext(AuthContext);
  const {
    bets,
    getBets,
    setDisBet,
    deleteBetById,
    getAllUsersBets,
    allUsersBets,
    displayMembers,
    setDisplayMembers,
  } = useContext(AppContext);
  const [ownedBets, setOwnedBets] = useState(currentUser.userBets);
  const currentUserId = currentUser ? currentUser.uid : null;

  const betToggleJoinedAndCreated = () => {
    setDisplayMembers(allUsersBets);
  };

  const betToggleAllBets = () => {
    setDisplayMembers(bets);
  };

  const isJoined = (id) => {
    for (let i = 0; i < userJoinedBets.length; i++) {
      if (id === userJoinedBets[i]) {
        return "(joined)";
      }
    }
  };

  const isOwned = (id) => {
    for (let i = 0; i < ownedBets.length; i++) {
      if (id === ownedBets[i]) {
        return "(owned)";
      }
    }
  };

  useEffect(() => {
    getBets(currentUserId);
    getAllUsersBets(currentUser);
  }, [currentUser]);

  return (
    <div className="custom-bet-list">
      <div className="bet-list-title-div">
        <div className="joined-created-buttons">
          <h2 className="bet-list-title">Bet List</h2>
            <button className='general-button' onClick={betToggleAllBets}><span>All Bets</span></button>
            <button className='general-button' onClick={betToggleJoinedAndCreated}><span>Joined And Created</span></button>
        </div>
      </div>
      <div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="betlist-head-row">
              <th>Bet Name</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayMembers.map((bet) => (
              <tr key={bet.id} className="betlist-head-row bet-item">
                <td className="custom-border custom-font">
                  {bet.name} {isOwned(bet.id)} {isJoined(bet.id)}
                </td>
                <td className="custom-border custom-font">{bet.ticketCost}</td>
                <td>
                  <Link to="/display-bet" onClick={() => setDisBet(bet)}>
                    <button className="custom-button custom-icon">
                      <FontAwesomeIcon icon={faGlasses} />
                    </button>
                  </Link>
                  {currentUser.owner === bet.owner &&
                    bet.members.length === 0 ? (
                    <button
                      className="custom-button custom-icon"
                      onClick={() => deleteBetById(bet.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  ) : null}
                  {currentUser.owner === bet.owner &&
                    bet.members.length === 0 ? (
                    <Link to="/update-bet" onClick={() => setDisBet(bet)}>
                      <button className="custom-button custom-icon">
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BetList;
