import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from "../firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, signOut, sendPasswordResetEmail, onAuthStateChanged, updateEmail, updatePassword, linkWithCredential, EmailAuthProvider } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [hasFolder, setHasFolder] = useState(false)

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

       //Check is user has a database folder. If not, creates one with their UID
      useEffect(() => {
       if(currentUser && !loading) {
         const checkFolder = async () => {
           const docRef = doc(db, "users", currentUser.uid);
           const docSnap = await getDoc(docRef);
           if (docSnap.exists()) {
             setHasFolder(true);
           } else {
            if (currentUser.email) {
              try {
                await setDoc(doc(db, "users", currentUser.uid), {
                    saved: [],
                    comments: []
                  })
            } catch(error) {
                console.log(error)
            }
            } else {
              try {
                await setDoc(doc(db, "users", currentUser.uid), {
                    saved: [],
                    comments: []
                  })
            } catch(error) {
                console.log(error)
            }
            }
           }
         };
         checkFolder();
       }
      }, [currentUser]);
      
    const value = { 
        loading,
        currentUser,
        login,
        loginDemo,
        signup,
        logout,
        resetPassword,
        emailChange,
        passwordChange,
        upgradeDemo,
        hasFolder
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
