import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import "./BuyMoney.css";

const BuyMoney = () => {
  const { currentUser, addFakeMoneyToUserAccount } = useContext(AuthContext);
  const { notify } = useContext(AppContext);
  const handleSubmit = (money, message) => {
    let newUserWithMoney = {
      ...currentUser,
      money: currentUser.money + money,
    };
    addFakeMoneyToUserAccount(newUserWithMoney).then(() => {
      notify(message, "fm");
    });
  };
  return (
    <div className="general flex-component buy-money-page">
      <h1>Purchase: </h1>
      <div className="money-option-container">
        <div className="money-option">
          <div className="money-icon-wrapper">
            <FontAwesomeIcon icon={faMoneyBillAlt} />
          </div>

          <h2>1000</h2>
          <button
            onClick={() => handleSubmit(1000, "$10.00")}
            className="money-option-button"
          >
            $10.00
          </button>
        </div>
        <div className="money-option">
          <div className="money-icon-wrapper">
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <FontAwesomeIcon icon={faMoneyBillAlt} />
          </div>

          <h2>2000</h2>
          <button
            onClick={() => handleSubmit(2000, "$20.00")}
            className="money-option-button"
          >
            $20.00
          </button>
        </div>
        <div className="money-option">
          <div className="money-icon-wrapper">
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <FontAwesomeIcon icon={faMoneyBillAlt} />
          </div>

          <h2>4000</h2>
          <button
            onClick={() => handleSubmit(4000, "$40.00")}
            className="money-option-button"
          >
            $40.00
          </button>
        </div>
        <div className="money-option">
          <div className="money-icon-wrapper">
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <FontAwesomeIcon icon={faMoneyBillAlt} />
          </div>

          <h2>6500</h2>
          <button
            onClick={() => handleSubmit(6500, "$60.00")}
            className="money-option-button"
          >
            $60.00
          </button>
        </div>
        <div className="money-option">
          <div className="money-icon-wrapper">
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <FontAwesomeIcon icon={faMoneyBillAlt} />
          </div>

          <h2>12000</h2>
          <button
            onClick={() => handleSubmit(12000, "$100.00")}
            className="money-option-button"
          >
            $100.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyMoney;
