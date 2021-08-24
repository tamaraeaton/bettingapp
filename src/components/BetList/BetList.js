import React from "react";
import "./BetList.css";

const BetList = ({ bets }) => {
  return (
    <div>
      <h2 className="bet-list-title">Bet List</h2>

      <div id="bet-list">
        <table
          id="table-list"
          className="table table-striped"
          style={{ marginTop: 20 }}
        >
          {bets.map((bet) => (
            <thead key={bet.id}>
              <tr className="bet-list-bet">
                <th>Bet Name: {bet.name}</th>
                <th>Amount: {bet.amount}</th>
                <th>Description: {bet.description}</th>
                <th>Actions</th>
              </tr>
            </thead>
          ))}
        </table>
      </div>
    </div>
  );
};

export default BetList;
