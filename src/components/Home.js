import React, { useRef } from 'react'
import Navigation from './Navigation'
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import Theater from "../assets/theater.mp4"


export default function Home() {
  const navigate = useNavigate()

  const videoRef = useRef();

  const handlePlay = () => {
      videoRef.current.play()
  }

  const handlePause = () => {
      videoRef.current.pause()
  }

  return (
    <>
    <Navigation/>
        <div className='vh-100 d-flex flex-column align-items-center justify-content-center'>
            <video autoPlay loop muted
                style={{
                    position: "absolute",
                    width: "100%",
                    left: "50%",
                    top: "50%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translate(-50%, -50%)",
                    zIndex: "-100"
                }}
                ref={videoRef} >
                <source src={Theater} type="video/mp4"/>
            </video>
            <div className='video-controls d-flex position-absolute bottom-0 mb-2 start-0 ms-2 gap-1 opacity-50'>
                <Button onClick={handlePlay} className="rounded-circle" variant="light"><i className="fa-solid fa-play"></i></Button>
                <Button onClick={handlePause} className="rounded-circle" variant="light"><i className="fa-solid fa-pause"></i></Button>
            </div>
            <Container fluid="md" >
                <Card style={{backgroundColor: "rgba(255,255,255,0.25)"}} className="p-3" >
                    <Card.Body className='text-center'>
                        <Card.Title className='fs-1 text-light'>
                            Welcome to MyMoovs!
                        </Card.Title>
                        <Card.Text className='fs-3 text-light'>
                            MyMoovs is a website designed to help you save + write about the movies you love (or don't love). Browse movies my popularity, genre, or search for whatever movie is on your mind. To save movies, login or create an account below.
                        </Card.Text>
                        <Button href='/signup' className="me-4" variant="outline-info">Sign Up</Button>
                        <Button href='/login' variant="outline-info">Login</Button>
                    </Card.Body>
                </Card>       
            </Container>
        </div>
    </>
  )
}
