import React from "react";
import { Link } from "react-router-dom";

const ButtonText = ({ link, text, betToggle, createButton }) => {
  return (
    <div>
      {betToggle ? (
        <button className='custom-button' onClick={betToggle}>
          <Link to={link}>{text}</Link>
        </button>
      ) : createButton ? (
        <button className='custom-button' style={createButton}>Create Bet</button>
      ) : (
        <button className='custom-button'>
          <Link to={link}>{text}</Link>
        </button>
      )}
    </div>
  );
};

export default ButtonText;
