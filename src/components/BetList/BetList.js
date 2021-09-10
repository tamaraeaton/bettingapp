import React, { useState, useEffect, useContext } from "react";
import "./BetList.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const BetList = () => {
  const { currentUser } = useContext(AuthContext);
  const { bets, getBets, setDisBet, deleteBetById } = useContext(AppContext);
  const currentUserId = currentUser ? currentUser.uid : null;

  useEffect(() => {
    getBets(currentUserId);
  }, [currentUser]);

  return (
    <div className="custom-bet-list">
      <h2 className="bet-list-title">Bet List</h2>
      <div>
        <table>
          <thead>
            <tr className="head-row">
              <th>Bet Name</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet) => (
              <tr key={bet.id} className="head-row bet-item">
                <td className="custom-border">{bet.name}</td>
                <td className="custom-border">{bet.amount}</td>
                <td>
                  <Link to="/display-bet" onClick={() => setDisBet(bet)}>
                    <button>Display Bet</button>
                  </Link>
                  <button
                    onClick={() => deleteBetById(bet.id)}
                    style={{ backgroundColor: "red" }}
                  >
                    Delete Bet
                  </button>
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
