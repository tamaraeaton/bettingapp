import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home">
            <div className="create-bet-here">
                <h4 className="bet-intro">Create a bet with your friends</h4>
                <Link to="/bet-form" className="create-bet-button">Create Bet</Link>
            </div>
            <div className="bet-list">
                <h4>BetList(placeholder)</h4>
            </div>
        </div>
    )
}

export default Home;