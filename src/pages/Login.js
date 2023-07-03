import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, FloatingLabel } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { Container } from 'react-bootstrap'
import clusterBlur from "../assets/cluster-blur.png"



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
        <Container className='dashboard-container d-flex align-items-center justify-content-center'>
            <div className='w-100 dashboard-card-wrapper' style={{maxWidth: "600px"}}>
                <Card className='dashboard-card'>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <FloatingLabel controlId="floatingInput" label="Email">
                                <Form.Control
                                    type="email"
                                    ref={emailRef}
                                    placeholder='Email'
                                    required
                                    className='dashboard-input mb-3'
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control
                                    type="password"
                                    ref={passwordRef}
                                    placeholder="Password"
                                    required
                                    className='dashboard-input mb-3'
                                />
                            </FloatingLabel>
                            <Button disabled={loading} type='submit' className='w-100 my-3'>Log In</Button>
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
                <div className='gradient-card'>
                    <img src={clusterBlur} alt='cluster-blur'/>
                </div>
            </div>
        </Container>
  )
}
