import React, { createContext, useState } from "react";
import firebase from "./firebase";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [bets, setBets] = useState([]);
  const [disBet, setDisBet] = useState({});
  const ref = firebase.firestore().collection("bets");

  console.log(disBet);

  const getBets = (user, load) => {
    load(true);
    ref
      // .where("owner", "==", user)
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
  return (
    <AppContext.Provider value={{ bets, getBets, addBet, disBet, setDisBet }}>
      {props.children}
    </AppContext.Provider>
  );
};
