import React, { useEffect, useState, createContext } from "react";
// import UpdateBetForm from "../components/UpdateBetForm/UpdateBetForm";
import firebase from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [pending, setPending] = useState(false);
  const refUsers = firebase.firestore().collection("users");
  const [userJoinedBets, setUserJoinedBets] = useState([])

  const login = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  const register = async (user, password) => {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, password);
  };

   function getUser(id, l, history) {
     refUsers.where("id", "==", id).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((user) => {
        setCurrentUser(user.data());
        setUserJoinedBets(user.data().joinedBets)
        setPending(false);
        if (l) {
          history.push("/home");
        }
      });
    });
  }

  const getAuth = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        getUser(user.uid);
      } else {
        setIsAuth(false);
        setPending(false);
      }
    });
  };

  useEffect(() => {
    getAuth();
  }, []);

  const addUser = async (user, ownerId) => {
    const newUser = {
      ...user,
      id: ownerId,
      owner: ownerId,
      userBets: [],
      joinedBets: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return await refUsers.doc(newUser.id).set(newUser);
  };

 

  const editUser = async (user, history) => {
    if (user.password) {
      const updateUser = firebase.auth().currentUser;
      updateUser
        .updateEmail(user.email)
        .then(() => updateUser.updatePassword(user.password));

      return refUsers.doc(user.id).update({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        email: user.email,
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      const updateUser = firebase.auth().currentUser;
      updateUser.updateEmail(user.email);
      return refUsers.doc(user.id).update({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        email: user.email,
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  if (pending) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        register,
        errMsg,
        setErrMsg,
        addUser,
        isAuth,
        getUser,
        editUser,
        userJoinedBets
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
