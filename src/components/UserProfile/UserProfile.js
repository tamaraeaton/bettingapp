import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";

const UserProfile = () => {
  const { getUser, currentUser } = useContext(AuthContext);
  console.log(currentUser)
  return (
    <div>
      <div>UserProfile</div>
      <div className="user-card">
        <p>{currentUser.email}</p>
        <p>{currentUser.firstName}</p>
        <p>{currentUser.lastName}</p>
        <p>{currentUser.age}</p>
        <p>{currentUser.gender}</p>
      </div>
    </div>
  );
};

export default UserProfile;
