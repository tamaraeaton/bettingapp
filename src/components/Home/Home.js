import React from 'react'
import './Home.css'
import FriendsBetting from "../Home/Home";

const Home = () => {
    return (
        <div className="home">
            <div className="create-bet-here">
                <h4 className="bet-intro">Create a bet with your friends</h4>
                <button className="create-bet-button">Create Bet</button>
            </div>
            <div className="bet-list">
                <h4>BetList(placeholder)</h4>
            </div>
        </div>
    )
}

export default Home;