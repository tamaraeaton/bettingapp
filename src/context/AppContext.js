import React, { createContext, useState, useEffect } from "react";
import firebase from "./firebase";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [bets, setBets] = useState([]);
  const [disBet, setDisBet] = useState({});
  const [membersArr, setMembersArr] = useState([]);
  const ref = firebase.firestore().collection("bets");
  const refUsers = firebase.firestore().collection("users");

  const [member, setMember] = useState({});
  const [members, setMembers] = useState([]);
  const [userBets, setUserBets] = useState([]);
  const [joinedBets, setJoinedBets] = useState([])
  const [betsArr, setBetsArr] = useState([])

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

  const getUserBets = async (id) => {
    refUsers.where("owner", "==", id).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => setBetsArr(doc.data().userBets));
    });
  };

  const addBetToUser = async (user, newBetId) => {
    await getUserBets(user.owner.owner);
    await refUsers
      .doc(user.owner)
      .set({ ...user, userBets: [...betsArr, newBetId] });
  };

  const deleteBetById = async (id) => {
    await ref.doc(id).delete();
  };

  // const getUsersBets = (user) => {
  //   ref
  //     .where("owner", "==", user.owner)
  //     .orderBy("lastUpdate", "asc")
  //     .onSnapshot((querySnapshot) => {
  //       const items = [];
  //       querySnapshot.forEach((bet) => {
  //         setUserBets(bet.data());
  //       });
  //     });
  // };
  // const getOwnersBets = (user, prevItems) => {
  //   ref.where("owner", "!=", user).onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((bet) => {
  //       items.push(bet.data());
  //       setJoinedBets([...joinedBets, bet.data()])
  //       items.map((ownedBet) => {
  //         ownedBet.members.map((joinedUser) => {
  //           if(joinedUser.owner === user) {
  //             // setJoinedBets(ownedBet)
  //             // console.log(ownedBet)
  //             // console.log(joinedBets)
  //           }
  //         });
  //       });
  //     });
  //   });
  // };
  // const getUsersBets = (user) => {
  //   ref.where("owner", "==", user).onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((bet) => {
  //       items.push(bet.data());
  //       setUserBets(bet.data())
  //       getOwnersBets(user, items);
  //     });
  //   });
  // };
  console.log(joinedBets)

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
        addBetToUser
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
