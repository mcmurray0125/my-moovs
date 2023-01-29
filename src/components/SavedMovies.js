import React, { useEffect, useState } from 'react'
import { Alert, Card, Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import Navigation from './Navigation'

export default function SavedMovies() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const { currentUser, hasFolder } = useAuth()

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
    } else {
        setError(<span><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> to save movies.</span>)
    }
        setLoading(false)
}

  return (
    <div>
        <Navigation/>
        <Container className='d-flex align-items-center justify-content-center'>
            <div className='w-100' style={{maxWidth: "400px"}}>
            <Card className="text-center my-5">
                    <Card.Body >
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Card.Title>Saved Movies</Card.Title>
                        {hasFolder ?
                        <Card.Text>Here are your saved movies.</Card.Text> :
                        <Card.Text>You have no movie folder yet. Click here to create a folder to save your movies in.</Card.Text>  }
                        <Button onClick={handleCreate} disabled={hasFolder || error} variant="primary">Create Movie Folder</Button>
                    </Card.Body>
            </Card>
            </div>
        </Container>
    </div>
  )
}
