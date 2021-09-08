import React, { createContext, useState } from "react";
import firebase from "./firebase";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [bets, setBets] = useState([]);
  const [disBet, setDisBet] = useState({});
  const ref = firebase.firestore().collection("bets");
  const refUsers = firebase.firestore().collection("users");
  const [member, setMember] = useState({});
  const [members, setMembers] = useState([]);

  console.log(disBet);

  const getBets = (user) => {
    ref
      // .where("owner", "==", user)
      .orderBy("lastUpdate", "asc")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((bet) => {
          items.push(bet.data());
        });
        setBets(items);
      });
  };

  const addBet = (bet) => {
    const newBet = {
      ...bet,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return ref.doc(newBet.id).set(newBet);
  };

  const getMembers = () => {
    refUsers
      // .where("owner", "==", user)
      .orderBy("lastUpdate", "asc")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((user) => {
          items.push(user.data());
        });
        setMembers(items);
      });
  };

  return (
    <AppContext.Provider
      value={{ bets, getBets, addBet, disBet, setDisBet, members, getMembers }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
