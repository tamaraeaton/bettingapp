import React, { createContext, useState } from "react";
import firebase from "./firebase";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [bets, setBets] = useState([]);
  const ref = firebase.firestore().collection("bets");
  const refUsers = firebase.firestore().collection("users");

  const getBets = (user, load) => {
    load(true);
    ref
      .where("owner", "==", user)
      .orderBy("lastUpdate", "asc")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((bet) => {
          items.push(bet.data());
        });
        setBets(items);
        load(false);
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
  const addUser = (user) => {
    const newUser = {
      ...user,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return refUsers.doc(newUser.id).set(newUser);
  };

  return (
    <AppContext.Provider value={{ bets, getBets, addBet, addUser }}>
      {props.children}
    </AppContext.Provider>
  );
};
