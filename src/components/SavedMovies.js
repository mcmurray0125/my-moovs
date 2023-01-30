import React, { useEffect, useState } from 'react'
import { Alert, Card, Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"
import { db } from "../firebase"
import Navigation from './Navigation'

export default function SavedMovies() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const { currentUser, hasFolder } = useAuth()


  return (
    <div>
        <Navigation/>
        <Container className='d-flex align-items-center justify-content-center' style={{marginTop: "6rem"}}>
            <div className='w-100' style={{maxWidth: "400px"}}>
            <Card className="text-center my-5">
                    <Card.Body >
                        <Card.Title>Saved Movies</Card.Title>
                        {currentUser ?
                        <Card.Text>Here are your saved movies.</Card.Text> :
                        <Card.Text><Link to="/login">Login</Link> or <Link to="/signup">Create an account</Link> to save movies.</Card.Text> }
                    </Card.Body>
            </Card>
            </div>
        </Container>
    </div>
  )
}
