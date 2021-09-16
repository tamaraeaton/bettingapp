import React from 'react';
import {Link} from 'react-router-dom';

const ButtonText = ({link, text}) => {
  return (
    <button className="custom-button">
    <Link to={link}>{text}</Link>
  </button>
  )
}

export default ButtonText;