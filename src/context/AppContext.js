import React, { createContext, useState } from "react";
import firebase from "./firebase";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [bets, setBets] = useState([]);
  const [disBet, setDisBet] = useState({});
  const [editBet, setEditBet] = useState({});
  const [membersArr, setMembersArr] = useState([]);
  const ref = firebase.firestore().collection("bets");
  const refUsers = firebase.firestore().collection("users");

  const [allUsersBets, setAllUsersBets] = useState([]);
  const [displayMembers, setDisplayMembers] = useState([]);

  const getBets = () => {
    ref.orderBy("lastUpdate", "asc").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((bet) => {
        items.push(bet.data());
      });
      setBets(items);
      setDisplayMembers(items);
    });
  };

  const getBetMembers = async (id) => {
    await ref.where("id", "==", id).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => setMembersArr(doc.data().members));
    });
  };

  const addBetMember = async (bet, member) => {
    await getBetMembers(bet.id);
    let newMember = {
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      owner: member.owner,
      ticketsOwned: member.numTik,
      totalMoney: member.total,
      belongsTo: member.belongsTo,
    };

    let updateBet = {
      ...bet,
      members: [...bet.members, newMember],
      potTotal: bet.potTotal + newMember.totalMoney,
    };

    setMembersArr([...membersArr, newMember]);
    await ref.doc(bet.id).set(updateBet);
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

  // need to add timestamp
  const ownerEditBet = (updatedBet) => {
    return ref.doc(disBet.id).update(updatedBet);
  }

  const getAllUsersBets = (user) => {
    let theUserBets = user.joinedBets.concat(user.userBets);
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
        setBets,
        getBets,
        addBet,
        disBet,
        setDisBet,
        membersArr,
        deleteBetById,
        getBetMembers,
        addBetMember,
        addBetToUser,
        addBetToUserJoinedBet,
        getAllUsersBets,
        allUsersBets,
        setAllUsersBets,
        displayMembers,
        setDisplayMembers,
        ownerEditBet
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
