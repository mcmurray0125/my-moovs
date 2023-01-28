import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from '../contexts/AuthContext'
const { currentUser, emailChange, passwordChange, upgradeDemo } = useAuth()

function createDocument() {
    if (currentUser) {
      setDoc(doc(db, "users", currentUser.uid), {
        saved: []
      })
    }
  }

  