import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, FloatingLabel } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link } from "react-router-dom"
import { Container } from 'react-bootstrap'
import clusterBlur from "../assets/cluster-blur.png"



export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions.')
        } catch(error) {
            setError('Failed to reset password')
        }
        setLoading(false)
    }

  return (
    <Container className='dashboard-container d-flex align-items-center justify-content-center' >
        <div className='w-100 dashboard-card-wrapper' style={{maxWidth: "600px"}}>
            <Card className='dashboard-card'>
                <Card.Body>
                    <h2 className='text-center mb-4'>Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel label="Email">
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                placeholder='Email'
                                required
                                className='dashboard-input mb-3'
                            />
                        </FloatingLabel>
                        <Button
                            disabled={loading}
                            type='submit'
                            className='main-btn w-100 mt-4'
                        >
                            Reset Password
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to="/login">Log in</Link>
            </div>
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
            <div className='gradient-card'>
                <img src={clusterBlur} alt='cluster-blur'/>
            </div>
        </div>
    </Container>
  )
}
