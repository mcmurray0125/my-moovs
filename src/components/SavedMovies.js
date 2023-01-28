import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import Navigation from './Navigation'

export default function SavedMovies() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const { currentUser, emailChange, passwordChange, upgradeDemo } = useAuth()
    const [folder, setFolder] = useState(false)

    useEffect(() => {
        if (currentUser) {
            var docRef = doc(db, "users", currentUser.uid);
            var docSnap = getDoc(docRef);
        } else {
            var docRef = null
        }
    },[])


  async function handleCreate(e) {
    e.preventDefault()
    if (currentUser){
    try {
        setMessage("")
        setError("")
        setLoading(true)
        await setDoc(doc(db, "users", currentUser.uid), {
            saved: []
          })
        setMessage('Folded Created')
        console.log('folder created')
    } catch(error) {
        setError('Failed to create folder. Log in or sign up to save movies')
        console.log(error)
    }
}
    setLoading(false)
}

    useEffect(() => {
    if (currentUser) {
    const fetchFolder = async () => {
        const data = getDoc(doc(db, "users", currentUser.uid))
        if (data) {
            setFolder(true)
            console.log('got folder')
        } else {
            setFolder(false)
        }
        console.log('getting folder')
    }
    console.log('fetching')
    fetchFolder()
    .catch(console.log(error));
    }
    return
    },[])

  return (
    <div>
        <Navigation/>
        <Card className="text-center my-5">
                <Card.Body >
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Card.Title>Saved Movies</Card.Title>
                    {folder ?
                    <Card.Text>Here are your saved movies.</Card.Text> :
                    <Card.Text>You have no saved movies. Click here to create a folder to save your movies in.</Card.Text>  }
                    <Button onClick={handleCreate} disabled={loading || !currentUser || folder} variant="primary">Create Movie Folder</Button>
                </Card.Body>
        </Card>
    </div>
  )
}
