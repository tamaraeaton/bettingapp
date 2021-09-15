import React, { createContext, useEffect, useState } from "react";
import firebase from "./firebase";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [bets, setBets] = useState([]);
  const [disBet, setDisBet] = useState({});
  const [membersArr, setMembersArr] = useState([]);
  const ref = firebase.firestore().collection("bets");
  const refUsers = firebase.firestore().collection("users");
  const refBetMember = firebase.firestore().collection("members");

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

  const getBetMembers = async (id) => {
    await ref.where("id", "==", id).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => setMembersArr(doc.data().members));
      console.log(membersArr);
    });
  };

  const addBetMember = async (bet, member) => {
    await getBetMembers(bet.id);
    let newMember = {
      email: member.email,
      name: member.firstName,
      owner: member.owner,
      ticketsOwned: member.numTik,
      totalMoney: member.total,
      belongsTo: member.belongsTo,
    };

    setMembersArr([...membersArr, newMember]);
    await ref.doc(bet.id).set({ ...bet, members: [...membersArr, newMember] });
  };

  const deleteBetById = async (id) => {
    await ref.doc(id).delete();
  };

  return (
    <AppContext.Provider
      value={{
        bets,
        getBets,
        addBet,
        disBet,
        setDisBet,
        deleteBetById,
        addBetMember,
        getBetMembers,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
