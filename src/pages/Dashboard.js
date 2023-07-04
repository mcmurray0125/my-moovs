import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore";
import clusterBlur from "../assets/cluster-blur.png"


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
    <Container className='dashboard-container d-flex align-items-center justify-content-center'>
        <div className='w-100 dashboard-card-wrapper' style={{maxWidth: "600px"}}>
            <Card className='dashboard-card'>
                <Card.Header>
                    <h2 className='text-center m-0'>Profile</h2>
                </Card.Header>
                <Card.Body >
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className='profile-contents d-flex flex-column'>
                        <span><strong>Email:</strong> {currentUser.email ? currentUser.email : `Demo User ${currentUser.uid}`}</span>
                        <span><strong>Moovs Saved:</strong> {savedMovies.length}</span>
                        <span><strong>Total Comments:</strong> {dbComments.length}</span>
                    </div>
                </Card.Body>
            </Card>
            <div className='profile-links d-flex flex-column py-2 gap-2 justify-content-center align-items-center'>
                <div className='d-flex gap-4 justify-content-center'>
                    <a href="/">Go to Home Page</a>
                    <a href="/saved-movies">View Saved <i className="fa-solid fa-cloud"></i></a>
                </div>
                <Link to="/user/update-profile">Update Profile</Link>
                <Button className='main-btn text-center w-25 p-1 fs-6 mt-2' onClick={handleLogout}>Log Out</Button>
            </div>
            <div className='gradient-card'>
                <img src={clusterBlur} alt='cluster-blur'/>
            </div>
        </div>
    </Container>
  )
}
