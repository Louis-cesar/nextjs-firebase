import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("user", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getDoc(doc(db, "Users", user.uid)).then((doc) => {
          const userDoc = doc.data();
          setUser({
            uid: user.uid,
            email: user.email,
            fullName: userDoc.fullName,
            address: userDoc.address,
            phoneNumber: userDoc.phoneNumber,
            dateOfBirth: userDoc.dateOfBirth,
            gender: userDoc.gender,
            department: userDoc.department,
            isAdmin: userDoc.isAdmin,
          });
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  const signup = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    Cookies.set("token", result.user.uid);
    const res = await setDoc(doc(db, "Users", result.user.uid), {
      timeStamp: serverTimestamp(),
    });
  };

  const logout = async () => {
    Cookies.remove("token");
    setUser(null);
    await signOut(auth);
  };

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    Cookies.set("token", result.user.accessToken);
    return result.user;
  };

  return (
    <AuthContext.Provider value={{ user, signup, logout, login }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
