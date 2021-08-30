import React, { useEffect, useState, useContext } from "react";
import "./BetForm.css";
import betters from "../../assets/friendsBetting.PNG";
import firebase from "../../context/firebase";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/Auth";
import { useHistory } from "react-router-dom";

const BetForm = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const ref = firebase.firestore().collection("bets");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBet = {
      owner: currentUser.uid,
      ownerEmail: currentUser.email,
      name,
      category,
      amount,
      description,
      id: uuidv4(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };

    ref
      .doc(newBet.id)
      .set(newBet)
      .then(() => {
        setName("");
        setAmount(0);
        setDescription("");
        setCategory("");
        history.push("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bet-form">
      <img src={betters} alt="background" className="betters-img" />
      <div className="bet-form-container">
        <h2 className="bet-form-title">Create A Bet</h2>
        <form className="create-bet-form" onSubmit={handleSubmit}>
          <input
            className="bet-input"
            type="text"
            name="betName"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            className="bet-input"
            type="text"
            name="category"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          <input
            className="bet-input"
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <textarea
            rows="5"
            name="description"
            placeholder="Description..."
            className="bet-textarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <input type="submit" value="Submit" className="bet-button" />
        </form>
      </div>
    </div>
  );
};

export default BetForm;
