import React, { useEffect, useState, createContext } from "react";
import firebase from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [pending, setPending] = useState(true);

  const refUsers = firebase.firestore().collection("users");

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

  const getUser = async (id) => {
    await refUsers
      .where("owner", "==", id)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((user) => {
          setCurrentUser(user.data());
          console.log(user.data());
          setPending(false)
        });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
