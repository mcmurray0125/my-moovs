import React, { useRef, useState } from 'react'
import { Form, Button, Card, FormLabel, Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { Container } from 'react-bootstrap'
import clusterBlur from "../assets/cluster-blur.png"



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
        }).catch((error) => {
            setError("Failed to update account")
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
    <Container className='dashboard-container d-flex align-items-center justify-content-center'>
        <div className='w-100 dashboard-card-wrapper' style={{maxWidth: "600px"}}>
            <Card className='dashboard-card'>
                <Card.Body >
                    <h2 className='text-center mb-4'>Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
                        </Form.Group>
                        <Form.Group id='password' className='my-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder='Leave blank to keep the same' ref={passwordRef}></Form.Control>
                        </Form.Group>
                        <Form.Group id='password-confirm'>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave blank to keep the same'></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type='submit' className='main-btn w-100 mt-3'>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Change your mind? <Link to="/user/profile">Cancel</Link>
            </div>
            <div className='gradient-card'>
                <img src={clusterBlur} alt='cluster-blur'/>
            </div>
        </div>
    </Container>
  )
}
