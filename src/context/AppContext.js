import React, { createContext, useState, useEffect } from "react";
import firebase from "./firebase";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [bets, setBets] = useState([]);
  const [disBet, setDisBet] = useState({});
  const [membersArr, setMembersArr] = useState([]);
  const ref = firebase.firestore().collection("bets");
  const refUsers = firebase.firestore().collection("users");

  const [members, setMembers] = useState([]);
  const [allUsersBets, setAllUsersBets] = useState([]);

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

  const addBetToUser = async (user, newBetId) => {
    refUsers
      .doc(user.id)
      .set({ ...user, userBets: [...user.userBets, newBetId] });
  };

  const addBetToUserJoinedBet = async (user, newBetId) => {
    refUsers
      .doc(user.id)
      .set({ ...user, joinedBets: [...user.joinedBets, newBetId] });
  };

  const addBet = async (bet, user) => {
    await addBetToUser(user, bet.id).then(() => {
      const newBet = {
        ...bet,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      };
      return ref.doc(newBet.id).set(newBet);
    });
  };

  const getAllUsersBets = (user) => {
    let theUserBets = user.joinedBets.concat(user.userBets);
    let userBetsArr = [];
    const promises = [];

    for (let i = 0; i < theUserBets.length; i++) {
      promises.push(
        new Promise((resolve) => {
          ref
            .where("id", "==", theUserBets[i])
            .onSnapshot((querySnapshot) =>
              querySnapshot.forEach((doc) => resolve(doc.data()))
            );
        })
      );
      // ref.where("id", "==", theUserBets[i]).onSnapshot((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     userBetsArr.push(doc.data());
      //   });
      // });
    }

    Promise.all(promises).then((res) => {
      setAllUsersBets(res);
    });
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
        members,
        deleteBetById,
        getBetMembers,
        addBetMember,
        addBetToUser,
        addBetToUserJoinedBet,
        getAllUsersBets,
        allUsersBets,
        setAllUsersBets,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
