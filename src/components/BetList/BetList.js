import React, { useEffect, useContext, useState } from "react";
import "./BetList.css";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faGlasses } from "@fortawesome/free-solid-svg-icons";
import ButtonText from "../Buttons/ButtonText";

const BetList = () => {
  const { currentUser } = useContext(AuthContext);
  const { bets, setBets, getBets, setDisBet, deleteBetById, getAllUsersBets, allUsersBets, displayMembers, setDisplayMembers } = useContext(AppContext);
  const currentUserId = currentUser ? currentUser.uid : null;

  const betToggleJoinedAndCreated = () => {
    setDisplayMembers(allUsersBets);
  }

  const betToggleAllBets = () => {
    setDisplayMembers(bets)
  }


  useEffect(() => {
    getBets(currentUserId)
    getAllUsersBets(currentUser)
  }, [currentUser]);

  console.log(bets)
  console.log(displayMembers)


  return (
    <div className="custom-bet-list">
      {/* <Link to='/display-bet'>All Bets</Link>
       <Link to='/bet-form'>Joined & Created Bets</Link> */}
      {/* <ButtonText link='/join-bet' text='J' /> */}
      <div className='bet-list-title'>
        <h2 className="bet-list-title">Bet List</h2>
        <ButtonText betToggle={betToggleAllBets} text='All Bets' link="/home" />
        <ButtonText betToggle={betToggleJoinedAndCreated} text='Joined & Created Bets' link="/home" />
      </div>
      <div>
        <table>
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
