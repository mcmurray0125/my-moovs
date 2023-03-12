import React from 'react'
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import largeLogo from "../assets/large-logo.png"
import homeCards from "./home-cards"
import HomeCard from './HomeCard'
import VideoBG from './VideoBG'
import PhotoBG from './PhotoBG'

export default function Home() {
const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

React.useEffect(() => {
    function watchWidth() {
        setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", watchWidth) 
    return function() {
        window.removeEventListener("resize", watchWidth)
    }
}, [])

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/search-movies");
};

  const cardElements = homeCards.map((item) => {
    return (
        <HomeCard
            key={item.id}
            item={item}/>
    )
  })

  return (
    <>
        {/* Homepage Background */}
        <div className='video-wrapper position-fixed h-100 w-100'>
            <div className='video-container w-100 vh-100 position-relative overflow-hidden' style={{zIndex: "-200"}}>
                {/* If small screen, use PhotoBG, else use VideoBG */}
                {windowWidth < 1000 ? <PhotoBG/> : <VideoBG windowWidth={windowWidth}/>}
            </div>
        </div>
        {/* Main Homepage */}
        <Container fluid="md" className='d-flex flex-column justify-content-center' style={{minHeight: "90vh"}}>
            <Row gap={2} xs={1} sm={2} className="d-flex align-items-center">
                <Col className='d-flex justify-content-center align-items-center my-3'>
                    <Card className="bg-transparent home-card p-0 boder border-light p-3">
                        <Card.Img src={largeLogo} />
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center my-3'>
                    <Card className="home-card p-3 bg-transparent border-none" >
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
            <Row><p style={{zIndex: "400"}} className="text-light fs-2 m-0 text-center my-3">Browse by Genre</p></Row>
            <Container className='home-cards-wrapper'>
                <Row xs={2} sm={3} lg={6}>
                    {cardElements}
                </Row>   
                {/* <Row><h1 style={{zIndex: "400"}} className="text-light my-5 text-center">Or</h1></Row>    */}
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
