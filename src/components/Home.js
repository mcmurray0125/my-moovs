import React, { useRef } from 'react'
import Navigation from './Navigation'
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import Theater from "../assets/theater.mp4"
import largeLogo from "../assets/large-logo.png"
import homeCards from "./home-cards"
import HomeCard from './HomeCard'

export default function Home() {

  const navigate = useNavigate()

  const videoRef = useRef();

  const handlePlay = () => {
      videoRef.current.play()
  }

  const handlePause = () => {
      videoRef.current.pause()
  }


  const cardElements = homeCards.map((item) => {
    return (
        <HomeCard
            key={item.id}
            item={item}/>
    )
  })

  const handleClick = () => {
    navigate("/search-movies");
};

//   className='d-flex flex-column align-items-center justify-content-center mt-5'
  return (
    <>
            {/* Background Video */}
            <div className='video-wrapper position-fixed h-100 w-100'>
                <div className='video-container w-100 vh-100 position-relative overflow-hidden' style={{zIndex: "-200"}}>
                    <video autoPlay loop muted
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: "auto",
                            height: "auto",
                            minWidth: "100%",
                            minHeight: "100%",
                            transform: "translate(-50%, -50%)",
                            zIndex: "-200"
                        }}
                        ref={videoRef} >
                        <source src={Theater} type="video/mp4"/>
                    </video>
                    <div className='video-controls d-flex flex-column gap-1 opacity-50'
                                    style={{
                                        position: "absolute",
                                        left: "0",
                                        bottom: "0",
                                    }}>
                        <Button onClick={handlePlay} className="rounded-circle" variant="light"><i className="fa-solid fa-play"></i></Button>
                        <Button onClick={handlePause} className="rounded-circle" variant="light"><i className="fa-solid fa-pause"></i></Button>
                    </div>
                </div>
            </div>
            {/* Main Homepage */}
            <Navigation/>
            <Container fluid="md" className='d-flex flex-column justify-content-center' style={{minHeight: "90vh"}}>
                <Row gap={2} xs={1} sm={2} className="d-flex align-items-center">
                    <Col className='d-flex justify-content-center align-items-center my-3'>
                        <Card className="bg-transparent home-card p-0 boder border-light p-3">
                            <Card.Img src={largeLogo} />
                        </Card>
                    </Col>
                    <Col className='d-flex justify-content-center my-3'>
                        <Card className="home-card p-3 bg-transparent border border-light" >
                            <Card.Body className='text-center'>
                                <Card.Title className='fs-3 text-light'>
                                    Welcome!
                                </Card.Title>
                                <Card.Text className='fs-5 text-light'>
                                MyMoovs is a website where you can save favorite movies and share comments. It's a personal movie journal to document movie likes and dislikes.
                                </Card.Text>
                                <Button href='/signup' className="me-4" variant="outline-info">Sign Up</Button>
                                <Button href='/login' variant="outline-info">Login</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row><h1 style={{zIndex: "400"}} className="text-light m-0 text-center my-5">Browse by Genre</h1></Row>
                <Container className='home-cards-wrapper'>
                    <Row xs={2} sm={3} lg={6}>
                        {cardElements}
                    </Row>   
                    <Row><h1 style={{zIndex: "400"}} className="text-light my-5 text-center">Or</h1></Row>   
                    <Row>
                        <Col className="my-3 d-flex align-items-center justify-content-center">
                            <Card id="search-btn-card" className="home-btn-card bg-transparent w-100 h-auto" onClick={handleClick}>
                                <Card.Body className='border border-light rounded d-flex flex-column justify-content-center'>
                                    <Card.Title className='text-light text-center m-0 p-2'>Go To Search</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>     
                    </Row> 
                </Container>
            </Container>
    </>
  )
}
