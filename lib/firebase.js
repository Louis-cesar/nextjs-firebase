import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRKXYZBn7WAOkH6PmZLDZZEdsGJfnenEA",
  authDomain: "nextjs-firebase-37d39.firebaseapp.com",
  projectId: "nextjs-firebase-37d39",
  storageBucket: "nextjs-firebase-37d39.appspot.com",
  messagingSenderId: "974354125866",
  appId: "1:974354125866:web:448eaecd7f6d065bbcdf53",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
