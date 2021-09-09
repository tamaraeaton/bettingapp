import React, { useState, useContext } from "react";
import "./BetForm.css";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";

const BetForm = () => {
  const { currentUser } = useContext(AuthContext);
  const { addBet } = useContext(AppContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

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
    };

    addBet(newBet)
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
    <div className="general flex-component custom-form-page">
      <h2 className="custom-form-title">Create A Bet</h2>
      <form className="custom-form" onSubmit={handleSubmit}>
        <input
          className="custom-input"
          type="text"
          name="betName"
          placeholder="Bet Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          className="custom-input"
          type="text"
          name="category"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <input
          className="custom-input"
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
        <input type="submit" value="Submit" className="custom-button" />
      </form>
    </div>
  );
};

export default BetForm;
