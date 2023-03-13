import React, { useRef, useState } from 'react'
import { Form, Button, Card, FormLabel, Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Container } from 'react-bootstrap'



export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch(error) {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{height: `calc(100vh - 73px)`}}>
        <div className='w-100 dashboard-card-wrapper' style={{maxWidth: "400px"}}>
            <Card className='dashboard-card'>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type='submit' className='w-100 mt-3'>Log In</Button>
                    </Form>
                    <div className='w-100 text-center mt-2'>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
            <div className='w-100 text-center mt-2'>
                <Link to="/">Home</Link>
            </div>
        </div>
    </Container>    
  )
}
