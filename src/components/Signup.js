import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { Container } from 'react-bootstrap'


export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, loginDemo } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    //Sign Up Email and Password
    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch(error) {
            console.log(error)
            setError('Failed to create an account')
        }
        setLoading(false)
    }
    //Login Demo
    async function handleDemoSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await loginDemo()
            navigate("/")
        } catch(error) {
            console.log(error)
            setError('Failed to create an account')
        }
        setLoading(false)
    }

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>
    <div className='w-100' style={{maxWidth: "400px"}}>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
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
                    <Form.Group id='password-confirm'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100 mt-3'>Sign Up</Button>
                </Form>
                <p className='text-center mt-3 mb-3'>Or</p>
                <Form onSubmit={handleDemoSubmit}>
                    <Button disabled={loading} type='submit' className='w-100'>Sign in as Demo User</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? <Link to="/login">Log In</Link>
        </div>
    </div>
    </Container>
  )
}
