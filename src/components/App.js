import React from 'react';
import SignedInNavbar from '../SignedInNavbar';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase/app'  
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, getRedirectResult, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, addDoc, setDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Signup from './Signup';



function App() {
  return (
    <Signup/>
  );
}

export default App;
