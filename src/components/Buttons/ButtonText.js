import React from 'react';
import { Link } from 'react-router-dom';

const ButtonText = ({ link, text, betToggle }) => {
  return (
    <div>
      {betToggle ? <button className="custom-button" onClick={betToggle}>
        <Link to={link}>{text}</Link >
      </button > : <button className="custom-button">
        <Link to={link}>{text}</Link>
      </button>}
    </div>
  )
}

export default ButtonText;