import React, { useEffect, useContext } from "react";
import "./BetList.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faGlasses } from "@fortawesome/free-solid-svg-icons";

const BetList = () => {
  const { currentUser } = useContext(AuthContext);
  const { bets, getBets, setDisBet, deleteBetById, getAllUsersBets } = useContext(AppContext);
  const currentUserId = currentUser ? currentUser.uid : null;


  useEffect(() => {
    getBets(currentUserId);
    // getAllUsersBets(currentUser)

  }, [currentUser]);

  return (
    <div className="custom-bet-list">
      <h2 className="bet-list-title">Bet List</h2>
      <div>
        <button onClick={() => getAllUsersBets(currentUser)}>get user bets</button>
        <table>
          <thead>
            <tr className="betlist-head-row">
              <th>Bet Name</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet) => (
              <tr key={bet.id} className="betlist-head-row bet-item">
                <td className="custom-border">{bet.name}</td>
                <td className="custom-border">{bet.ticketCost}</td>
                <td>
                  <Link to="/display-bet" onClick={() => setDisBet(bet)}>
                    <button 
                    className="custom-button custom-icon"
                    ><FontAwesomeIcon icon={faGlasses} /></button>
                  </Link>
                  {
                    currentUser.owner === bet.owner && bet.members.length === 0 ?
                  <button
                    className="custom-button custom-icon"
                    onClick={() => deleteBetById(bet.id)}
                  >
                     <FontAwesomeIcon icon={faTrash} />
                  </button>
                  : null
                  }
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BetList;
