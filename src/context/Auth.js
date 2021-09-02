import React, { useEffect, useState, createContext } from "react";
import firebase from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const refUsers = firebase.firestore().collection("users");

  const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  const register = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  const addUser = (user) => {
    const newUser = {
      ...user,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return refUsers.doc(newUser.id).set(newUser);
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
