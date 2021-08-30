import React, { createContext, useState } from "react";
import firebase from "./firebase";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [bets, setBets] = useState([]);
  const ref = firebase.firestore().collection("bets");

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
  return (
    <AppContext.Provider value={{ bets, getBets }}>{props.children}</AppContext.Provider>
  );
};
