import React, { useState, useContext, useEffect } from "react";
import "./BetForm.css";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";

const BetForm = () => {
  const { addBet, notify } = useContext(AppContext);
  const { currentUser, errMsg, setErrMsg } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [ticketCost, setTicketCost] = useState(0);
  const [description, setDescription] = useState("");
  const [numChoices, setNumChoices] = useState([]);
  const [choiceDescriptions, setChoiceDescriptions] = useState([]);
  const [choiceNames, setChoiceNames] = useState([]);

  const toggle = () => {
    return numChoices.map((index) => (
      <div key={index} className="choice-container">
        <input
          className="custom-input"
          type="text"
          name="choiceName"
          placeholder={`Choice ${index + 1} Name`}
        />
        <input
          className="custom-input"
          type="text"
          name="choiceDescription"
          placeholder={`Choice ${index + 1} Description`}
        />
      </div>
    ));
  };

  const toggleChoiceFields = (choices) => {
    const promises = [];
    for (let i = 0; i <= choices - 1; i++) {
      promises.push(
        new Promise((resolve) => {
          resolve(i);
        })
      );
    }

    Promise.all(promises).then((res) => {
      setNumChoices(res);
      toggle();
    });
  };

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
        notify(newBet.name, "c");
        setName("");
        setTicketCost(0);
        setDescription("");
        setCategory("");
        history.push("/home");
      })
      .catch((err) => console.log(err));

    if (
      newBet.name === "" ||
      newBet.category === "" ||
      newBet.description === "" ||
      newBet.ticketCost === 0
    ) {
      setErrMsg("Please fill out all fields!");
    } else {
      addBet(newBet, currentUser)
        .then(() => {
          setName("");
          setTicketCost(0);
          setDescription("");
          setCategory("");
          history.push("/home");
          setErrMsg("");
        })
        .catch((err) => console.log(err));
    }
  };

  // useEffect(() => {
  //   setNumChoices([...numChoices])
  // }, [toggleChoiceFields])

  console.log(numChoices);
  return (
    <div className="general flex-component custom-form-page">
      <div className="form-wrappers">
        <h2 className="custom-form-title">Create A Bet</h2>
        {errMsg ? <div className="error">{errMsg}</div> : null}
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
            <select
              className="select-dropdown"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option className="category-option">Category</option>
              <option className="category-option" value="sports">
                Sports
              </option>
              <option className="category-option" value="weather">
                Weather
              </option>
              <option className="category-option" value="trivial">
                Trivial
              </option>
              <option className="category-option" value="fiction">
                Made Up
              </option>
              <option className="category-option" value="other">
                Other
              </option>
            </select>
          </div>

          <div className="custom-choices">
            <p onClick={() => toggleChoiceFields(2)}>2</p>
            <p onClick={() => toggleChoiceFields(3)}>3</p>
            <p onClick={() => toggleChoiceFields(4)}>4</p>
            <p onClick={() => toggleChoiceFields(5)}>5</p>
            <p onClick={() => toggleChoiceFields(6)}>6</p>
            <p onClick={() => toggleChoiceFields(7)}>7</p>
            <p onClick={() => toggleChoiceFields(8)}>8</p>
            <p onClick={() => toggleChoiceFields(9)}>9</p>
            <p onClick={() => toggleChoiceFields(10)}>10</p>
          </div>

          {toggle()}

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
    </div>
  );
};

export default BetForm;
