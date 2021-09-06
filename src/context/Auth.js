import React, { useEffect, useState, createContext } from "react";
import firebase from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [pending, setPending] = useState(true);

  const refUsers = firebase.firestore().collection("users");

  const login = (email, password, history) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => setCurrentUser(res.user));
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  const register = async (user, password) => {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, password)
      .then((res) => {
        const userData = {
          ...user,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        };
        refUsers
          .doc(userData.id)
          .set(userData)
        // setCurrentUser(res.user);
      });
  };

  const getUser = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const addUser = (user) => {
    const newUser = {
      ...user,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return refUsers
      .doc(newUser.id)
      .set(newUser)
      .then((res) => setCurrentUser(res.user));
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
