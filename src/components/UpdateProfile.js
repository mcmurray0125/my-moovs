import React, { useRef, useState } from 'react'
import { Form, Button, Card, FormLabel, Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"


export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, emailChange, passwordChange, upgradeDemo } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError("")
        if (currentUser.isAnonymous) {
            promises.push(upgradeDemo(emailRef.current.value, passwordRef.current.value))
        }
        else if (emailRef.current.value !== currentUser.email) {
            promises.push(emailChange(emailRef.current.value))
        }
        else if (passwordRef.current.value) {
            promises.push(passwordChange(passwordRef.current.value))
        }

        Promise.all(promises)
        .then(() => {
            navigate("/")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
      <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
                </Form.Group>
                <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder='Leave blank to keep the same' ref={passwordRef}></Form.Control>
                </Form.Group>
                <Form.Group id='password-confirm'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave blank to keep the same'></Form.Control>
                </Form.Group>
                <Button disabled={loading} type='submit' className='w-100 mt-3'>Update</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Already have an account? <Link to="/">Cancel</Link>
    </div>
    </>
  )
}
