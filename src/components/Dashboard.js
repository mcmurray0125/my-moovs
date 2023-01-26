import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navigation from './Navigation'


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
    <Navigation/>
    <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "90vh"}}>
        <div className='w-100' style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email ? currentUser.email : 'Demo User'}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to="/home">Go to Home Page</Link>
            </div>
            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    </Container>
    </>
  )
}
