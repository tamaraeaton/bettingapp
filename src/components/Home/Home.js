import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import firebase from "../../firebase/firebase";
<<<<<<< Updated upstream
=======
import BetList from "../BetList/BetList";
>>>>>>> Stashed changes

const Home = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("bets");

  const getBets = () => {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
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
  }, []);

  console.log(bets);

  return (
    <div className="home">
      <div className="create-bet-here">
        <h4 className="bet-intro">Create a bet with your friends</h4>
        <Link to="/bet-form" className="create-bet-button">
          Create Bet
        </Link>
      </div>
<<<<<<< Updated upstream

    
=======
      <div className="bet-list">
        <div>
          <BetList bets={bets} />
        </div>
      </div>
>>>>>>> Stashed changes
    </div>
  );
};

export default Home;
