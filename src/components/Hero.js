import React from 'react'
import { Container, Row, Col, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <>
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Welcome to MyMoovs!
                            </Card.Title>
                            <Card.Text>
                                <Link to="/signup">Sign up</Link> with and email, or register as a demo user to browse and save your favorite movies! Then, add comments and other thought about the movies to keep a digital journal of your cinematic experiences.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                <Card>
                    <Card.Body>
                        <Card.Img src="https://picsum.photos/600/400"/>
                    </Card.Body>
                </Card>
                
                </Col>
            </Row>        
        </Container>
    </>
  )
}
