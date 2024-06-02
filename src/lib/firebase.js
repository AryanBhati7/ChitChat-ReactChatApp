// Import the functions you need from the SDKs you need
import App from "@/App";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chitchat-e1aba.firebaseapp.com",
  projectId: "chitchat-e1aba",
  storageBucket: "chitchat-e1aba.appspot.com",
  messagingSenderId: "49826880392",
  appId: "1:49826880392:web:dde4e1abba0137d8e3383d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore();
export const storage = getStorage();
