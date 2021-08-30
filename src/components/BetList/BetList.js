import React, { useState, useEffect, useContext } from "react";
import "./BetList.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";

const BetList = () => {
  const { currentUser } = useContext(AuthContext);
  const { bets, getBets } = useContext(AppContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBets(currentUserId, setLoading);
  }, [currentUser]);

  return (
    <div>
      <h2 className="bet-list-title">Bet List</h2>
      <div id="bet-list">
        <table
          id="table-list"
          className="table table-striped"
          style={{ marginTop: 20 }}
        >
          <thead>
            <tr>
              <th>Owner</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="bet-items">
            {loading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              bets.map((bet) => (
                <tr key={bet.id}>
                  <td>{bet.name}</td>
                  <td>{bet.amount}</td>
                  <td>
                    <button>Display Bet</button>
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
