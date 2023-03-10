import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'


export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

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
    <>
    <Container className='d-flex align-items-center justify-content-center' style={{height: `calc(100dvh - 73px)`}}>
        <div className='w-100 dashboard-card-wrapper' style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body className='dashboard-card'>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email ? currentUser.email : `Demo User ${currentUser.uid}`}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to="/">Go to Home Page</Link>
            </div>
            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    </Container>
    </>
  )
}
