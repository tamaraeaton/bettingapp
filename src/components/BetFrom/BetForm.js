import React from "react";
import "./bet-form.css";
import betters from "../../assets/friendsBetting.PNG";

const BetForm = () => {
  return (
    <div className="bet-form">
      <img src={betters} alt="background" className="betters-img" />
      <div className="bet-form-container">
        <h2 className="bet-form-title">Create A Bet</h2>
        <form className="create-bet-form">
          <input className="bet-input" type="text" name="betName" placeholder="Name" />
          <input className="bet-input" type="text" name="category" placeholder="Category" />
          <input className="bet-input" type="number" name="amount" placeholder="Amount" />
          <textarea rows="5" name="description" placeholder="Description..." className="bet-textarea"></textarea>
          <input type="submit" value="Submit" className="bet-button" />
        </form>
      </div>
    </div>
  );
};

export default BetForm;
