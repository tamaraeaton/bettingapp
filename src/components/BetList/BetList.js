import React from "react";
import "./BetList.css";
import {Link} from 'react-router-dom';

const BetList = ({ bets }) => {
  return (
    <div>
      <h2 className='bet-list-title'>Bet List</h2>

      <div id='bet-list'>
        <table
          id='table-list'
          className='table table-striped'
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
            {bets.map((bet) => (
              <tr>
                <td>{bet.name}</td>
                <td>{bet.amount}</td>
                <td><Link to="/display-bet"><button>DisplayBet</button></Link></td>
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
