import React from "react";
import { Link } from "react-router-dom";

const ButtonText = ({ link, text, betToggle, createButton }) => {
  return (
    <div>
      {betToggle ? (
        <Link to={link}><button className='custom-button' onClick={betToggle}>
          {text}
        </button></Link>
      ) : createButton ? (
        <Link to={link}><button className='custom-button' style={createButton}>
          Create Bet
        </button></Link>
      ) : (
        <Link to={link}>
          <button className='custom-button'>{text}</button>
        </Link>
      )}
    </div>
  );
};

export default ButtonText;
