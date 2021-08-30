import React from 'react'
import './DisplayBet.css'

const DisplayBet = () => {
    return (
        <div className="join-bet">
           <div><h1 className='name'>Bet Name:</h1></div> 
           <div><h1 className='bd'>Bet Description:</h1></div> 
           <div><h1 className='Am'>Amount:</h1></div> 
        </div>
        
    )
}

export default DisplayBet;