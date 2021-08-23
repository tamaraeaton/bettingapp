import React, { useEffect, useState } from "react";
import "./BetForm.css";
import betters from "../../assets/friendsBetting.PNG";
import firebase from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const BetForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const ref = firebase.firestore().collection("shcools");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBet = {
      name,
      category,
      amount,
      description,
      id: uuidv4(),
    };

    ref
      .doc(newBet)
      .set(newBet)
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
