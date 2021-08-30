import React, { useState, useEffect, useContext } from "react";
import "./BetList.css";
import { AuthContext } from "../../auth/Auth";
import firebase from "../../firebase/firebase";

const BetList = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("bets");

  const getBets = () => {
    setLoading(true);
    ref
      .where("owner", "==", currentUserId)
      .orderBy("lastUpdate", "asc")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((bet) => {
          items.push(bet.data());
        });
        setBets(items);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBets();
  }, [currentUser]);

  console.log(bets);
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
                    <button>Join Bet</button>
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
