import React, { useState, useEffect, useContext } from "react";
import "./BetList.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const BetList = () => {
  const { currentUser } = useContext(AuthContext);
  const { bets, getBets, setDisBet } = useContext(AppContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBets(currentUserId, setLoading);
  }, [currentUser]);

  return (
    <div className="custom-bet-list">
      <h2 className="bet-list-title">Bet List</h2>
      <div>
        <table>
          <thead>
            <tr className="head-row">
              <th>Owner</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td>Loading...</td></tr>
            ) : (
              bets.map((bet) => (
                <tr key={bet.id} className="head-row bet-item">
                  <td>{bet.name}</td>
                  <td>{bet.amount}</td>
                  <td>
                    <Link to="/display-bet" onClick={() => setDisBet(bet)}>
                     <button>DisplayBet</button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default BetList;
