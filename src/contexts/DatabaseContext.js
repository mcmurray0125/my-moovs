// import React, { useContext, useState, useEffect } from 'react'
// import { auth, db } from "../firebase"
// import { doc, setDoc, getDoc } from "firebase/firestore"
// import { useAuth } from '../contexts/AuthContext'

// const DatabaseContext = React.createContext()

// export function useDB() {
//     return useContext(DatabaseContext)
// }

// export function DatabaseProvider({ children }) {
//     const [savedMovies, setSavedMovies] = useState([])
//     const { currentUser, loading } = useAuth()

//     useEffect(() => {
//       const checkData = async () => {
//         if (currentUser) {
//           const docRef = doc(db, "users", currentUser.uid);
//           const docSnap = await getDoc(docRef);
//           setSavedMovies(docSnap.data());
//         }
//       }
//       checkData();
//     },[currentUser])
    
//     useEffect(() => {
//       console.log(savedMovies.saved);
//     },[savedMovies])


//     const value = { 
//       savedMovies
//     }

//   return (
//     <DatabaseContext.Provider value={value}>
//         {!loading && children}
//     </DatabaseContext.Provider>
//   )
// }
