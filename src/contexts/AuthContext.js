import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from "../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, signOut, sendPasswordResetEmail, onAuthStateChanged, updateEmail, updatePassword, linkWithCredential, EmailAuthProvider } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    } 

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function loginDemo() {
      return (
        signInAnonymously(auth)
        )
    }

    function upgradeDemo(email, password) {
      const credential = EmailAuthProvider.credential(email, password)
      return linkWithCredential(auth.currentUser, credential)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function emailChange(email) {
        return updateEmail(currentUser, email)
      }
    
      function passwordChange(password) {
        return updatePassword(currentUser, password)
      }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
      }, [])

    const value = { 
        currentUser,
        login,
        loginDemo,
        signup,
        logout,
        resetPassword,
        emailChange,
        passwordChange,
        upgradeDemo
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
