// import { Button } from "bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const createButton = {
  width: '4rem',
  color: 'blue'
}

const ButtonText = ({ link, text, betToggle, createButton }) => {
  return (
    <button className='general-button'><span>{text}</span></button>
    // <div>
    //   {betToggle ? (
    //     <Link to={link}><button className='custom-button' onClick={betToggle}>
    //       {text}
    //     </button></Link>
    //   ) : createButton ? (
    //     <Link to={link}><button className='custom-button' style={createButton}>
    //       Create Bet
    //     </button></Link>
    //   ) : (
    //     <Link to={link}>
    //       <button className='custom-button'>{text}</button>
    //     </Link>
    //   )}
    // </div>
  );
};

export default ButtonText;
