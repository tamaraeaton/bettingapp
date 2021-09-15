import React from "react";
import "./members.css";


const Members = () => {
  return (
    <div className="members">
      <div className="members-card">
        <img
          className="members-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTku2jdlcVmdWapW-jyVJq33TH893-rB36kkw&usqp=CAU"
          alt="this is adrian"
        />
        <h1 className="members-name">Adrian Diaz</h1>
        <p>Project Member</p>
      </div>
      <div className="members-card">
        <img
          className="members-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTku2jdlcVmdWapW-jyVJq33TH893-rB36kkw&usqp=CAU"
          alt="this is jason"
        />
        <h1 className="members-name">Jason Lyles</h1>
        <p>Project Member</p>
      </div>
    </div>
  );
};

export default Members;
