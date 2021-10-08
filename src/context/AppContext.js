import React, { createContext, useState } from "react";
import firebase from "./firebase";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [bets, setBets] = useState([]);
  const [disBet, setDisBet] = useState({});
  const [membersArr, setMembersArr] = useState([]);
  const ref = firebase.firestore().collection("bets");
  const refUsers = firebase.firestore().collection("users");
  const [allUsersBets, setAllUsersBets] = useState([]);
  const [displayMembers, setDisplayMembers] = useState([]);
 

  toast.configure()
  const notify = (message, cOrJOrU) => {
    if (cOrJOrU === 'j') {
      toast.success(`Successfully Joined ${message}`, {
        position: toast.POSITION_BOTTOM_CENTER,
        autoclose: 8000
      })

    } else  if(cOrJOrU === 'c'){
      toast.success(`Successfully Created ${message}`, {
        position: toast.POSITION_BOTTOM_CENTER,
        autoclose: 8000
      })
    } else if (cOrJOrU === 'u') {
      toast.success(`Successfully Updated ${message}`, {
        position: toast.POSITION_BOTTOM_CENTER,
        autoclose: 8000
      })
    }

  }

  const getBets = () => {
    ref.orderBy("lastUpdate", "desc").onSnapshot((querySnapshot) => {
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
    await ref.doc(bet.id).set(updateBet).then(() => notify(bet.name, 'j'));
  };

  const addBetToUser = async (user, newBetId) => {
    refUsers
      .doc(user.id)
      .set({ ...user, userBets: [...user.userBets, newBetId] });
  };

  const addBetToUserJoinedBet = async (user, newBetId) => {
    refUsers
      .doc(user.id)
      .set({ ...user, joinedBets: [...user.joinedBets, newBetId] })
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




  const ownerEditBet = (updatedBet) => {
    updatedBet.lastUpdate = firebase.firestore.FieldValue.serverTimestamp();
    return ref.doc(updatedBet.id).update(updatedBet).then(() => notify(updatedBet.name, 'u'));
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
        ownerEditBet,
        notify
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
