import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore";


export default function Dashboard() {
    const [error, setError] = useState("")
    const [dbComments, setDBComments] = React.useState([])
    const [savedMovies, setSavedMovies] = React.useState([])
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    //Check Fire Store for Saved Movies and Comments
    useEffect(() => {
    const checkData = async () => {
        if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        try {
            const docSnap = await getDoc(docRef);
            setSavedMovies(docSnap.data().saved);
            setDBComments(docSnap.data().comments);
        } catch(error) {
            console.log(error)
        }
        }
    }
    checkData();
    },[])

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

  return (
    <div className='bg-texture'>
    <Container className='d-flex align-items-center justify-content-center' style={{height: `calc(100dvh - 73px)`}}>
        <div className='w-100 dashboard-card-wrapper' style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body className='dashboard-card'>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className='profile-contents d-flex flex-column'>
                        <span><strong>Email:</strong> {currentUser.email ? currentUser.email : `Demo User ${currentUser.uid}`}</span>
                        <span><strong>Moovs Saved:</strong> {savedMovies.length}</span>
                        <span><strong>Total Comments:</strong> {dbComments.length}</span>
                    </div>
                    <Link to="/user/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className='profile-links d-flex py-2 gap-4 justify-content-center'>
                <a href="/">Go to Home Page</a>
                <a href="/saved-movies">View Saved <i className="fa-solid fa-cloud"></i></a>
            </div>
            <Button variant='link p-0 text-center w-100' onClick={handleLogout}>Log Out</Button>
        </div>
    </Container>
    </div>
  )
}
