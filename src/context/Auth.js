import React, { useEffect, useState, createContext } from "react";
import firebase from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [pending, setPending] = useState(true);

  const refUsers = firebase.firestore().collection("users");

  const addToUserBets = async (user) => {
    if (user.ownedBets) {
      return await refUsers.where("owner", "==", user.id).update({
        ownedBets: [...user.ownedBets, user.belongsTo],
      });
    } else {
      return await refUsers.where("owner", "==", user.id).update({
        ownedBets: user.belongsTo,
      });
    }
  };

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

  function getUser(id) {
    refUsers.where("owner", "==", id).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((user) => {
        setCurrentUser(user.data());
        setPending(false);
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
      owner: ownerId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return await refUsers.doc(newUser.id).set(newUser);
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
        addToUserBets
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
