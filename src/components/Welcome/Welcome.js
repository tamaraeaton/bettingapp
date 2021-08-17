import React from "react";
import "./Welcome.css";
import FriendsBetting from "../../assets/friendsBetting.PNG";

const Welcome = () => {
  return (
    <div>
      <div className='welcome'>
        <div className="links-section">
        <a className="login-anchor"href="#"><h1 className='login'>Login</h1></a>
        <a href="#" className="signup-anchor"><h1 className='sign-up'>
          Sign up
        </h1></a>
        </div>
        <img id='friends-betting-img' src={FriendsBetting} alt="bettingFriends" />
      </div>
      <div className='intro'>
        <h3 className="intro-text">
          Have a little fun placing bets with your friends and others with ease on our friendly wager app.
          <br />
          You can create your own silly bet with friends or place your bet with current open bets.
        </h3>
      </div>
    </div>
  );
};

export default Welcome;
