import React, { useState, useContext } from "react";
import "./BetForm.css";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";

const BetForm = () => {
  const { currentUser } = useContext(AuthContext);
  const { addBet, notify } = useContext(AppContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [ticketCost, setTicketCost] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBet = {
      owner: currentUser.owner,
      ownerEmail: currentUser.email,
      name,
      category,
      ticketCost,
      description,
      members: [],
      potTotal: 0,
      id: uuidv4(),
    };

    addBet(newBet, currentUser)
      .then(() => {
        notify (newBet.name, 'c')
        setName("");
        setTicketCost(0);
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

        <div className="custom-select">
          <select className="select-dropdown" onChange={(e) => setCategory(e.target.value)}>
            <option
              className="category-option"
              value="sports"
              
            >
              Sports
            </option>
            <option
              className="category-option"
              value="Weather"
             
            >
              Weather
            </option>
            <option
              className="category-option"
              value="trivial"
            
            >
              Trivial
            </option>
            <option
              className="category-option"
              value="fiction"
            
            >
              Made Up
            </option>
            <option
              className="category-option"
              value="other"
              
            >
              Other
            </option>
          </select>
        </div>

        <input
          className="custom-input"
          type="number"
          name="ticketCost"
          placeholder="Amount"
          onChange={(e) => setTicketCost(e.target.value)}
          value={ticketCost}
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
