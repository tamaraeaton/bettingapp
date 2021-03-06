import React, { createContext, useState } from "react";
import firebase from "./firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [bets, setBets] = useState([]);
  const [disBet, setDisBet] = useState({});
  const [membersArr, setMembersArr] = useState([]);
  const ref = firebase.firestore().collection("bets");
  const refUsers = firebase.firestore().collection("users");
  const [allUsersBets, setAllUsersBets] = useState([]);
  const [displayMembers, setDisplayMembers] = useState([]);
  const [theChoiceMembers, setTheChoiceMembers] = useState([]);
  const [theChoice, setTheChoice] = useState({});
  const [theIndex, setTheIndex] = useState(0);

  toast.configure();

  const ToastWithLink = (link, text) => {
    console.log({ text });
    return (
      <div>
        <Link className="toast-link" to={link}>{text}</Link>
      </div>
    );
  };

  const notify = (bet, cOrJOrUOrEOrFM) => {
    if (cOrJOrUOrEOrFM === "j") {
      toast.success(`Successfully Joined ${bet.name}`, {
        position: toast.POSITION_BOTTOM_CENTER,
        autoclose: 8000,
      });
    } else if (cOrJOrUOrEOrFM === "c") {
      toast.dark(
        ToastWithLink("/display-bet", `Successfully created bet ${bet.name}`)
      );
    } else if (cOrJOrUOrEOrFM === "u") {
      toast.dark(`Successfully Updated ${bet.name}`, {
        position: toast.POSITION_BOTTOM_CENTER,
        autoclose: 8000,
      });
    } else if (cOrJOrUOrEOrFM === "e") {
      toast.dark(`Successfully Updated ${bet.name}`, {
        position: toast.POSITION_BOTTOM_CENTER,
        autoclose: 8000,
      });
    } else if (cOrJOrUOrEOrFM === "fm") {
      toast.dark(`Your Purchase Was Successfully Made For ${bet}`);
    }
  };
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

  const getBetMembers = (id) => {
    ref.where("id", "==", id).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => setMembersArr(doc.data().members));
    });
  };

  const addBetMember = async (index, bet, member) => {
    await getBetMembers(bet.id);

    let newMember = {
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      owner: member.owner,
      id: member.id,
    };

    bet.choices[index].members = [newMember, ...bet.choices[index].members];

    let updateBet = {
      ...bet,
      members: [...bet.members, newMember],
      potTotal: bet.potTotal + newMember.totalMoney,
    };

    setMembersArr([...membersArr, newMember]);
    await ref
      .doc(bet.id)
      .set(updateBet)
      .then(() => notify(bet, "j"));
  };

  const addBetToUser = async (user, newBetId) => {
    refUsers
      .doc(user.id)
      .set({ ...user, userBets: [...user.userBets, newBetId] });
  };

  const addBetToUserJoinedBet = (user, newBetId, history) => {
    let promises = [];

    if (user.joinedBets.length === 0) {
      refUsers
        .doc(user.id)
        .set({ ...user, joinedBets: [...user.joinedBets, newBetId] })
        .then(()=> history.push('/home'))
    }

    for (let i = 0; i < user.joinedBets.length; i++) {
      promises.push(
        new Promise((resolve) => {
          resolve(user.joinedBets[i] === newBetId ? true : false);
        })
      );
    }

    Promise.all(promises).then((res) => {
      let joinedAlready = res.find((ress) => ress === true);
      if (joinedAlready) {
        return null;
      } else {
        refUsers
          .doc(user.id)
          .set({ ...user, joinedBets: [...user.joinedBets, newBetId] })
          .then(()=> history.push('/home'))
      }
    });
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
    return ref
      .doc(updatedBet.id)
      .update(updatedBet)
      .then(() => notify(updatedBet, "u"));
  };

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
        notify,
        theChoiceMembers,
        setTheChoiceMembers,
        theChoice,
        setTheChoice,
        theIndex,
        setTheIndex,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
