import React from "react";
import "./Welcome.css";
import FriendsBetting from "../../assets/friendsBetting.PNG";

const Welcome = () => {
  return (
    <>
      <div className='welcome'>
        <h1 className='login'>Login</h1>
        <h1 className='sign-up' src=''>
          Sign Up
        </h1>
        <img id='friends-betting-img' src={FriendsBetting} alt="bettingFriends" />
      </div>
      <div className='intro'>
        <h1 className="intro-text">
          Have a little fun placing bets with your friends and others with ease
          on our app.
          <br />
          You can create your own silly bet or place your bet with current open
          bets.
        </h1>
      </div>
    </>
  );
};

export default Welcome;
