import React from 'react'
import { Col, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function HomeCard(props) {
    const navigate = useNavigate();
    const homeCardStyles = {
        backgroundColor: "transparent",
        cursor: "pointer",
        height: "150px",
        width: "150px"
      }

      const handleClick = () => {
        navigate(props.item.link);
    };

  return (
    <Col className="my-3 d-flex align-items-center justify-content-center">
        <Card id={`${props.item.title}-card`} className="home-btn-card" onClick={handleClick}>
            <Card.Body className='border border-light rounded d-flex flex-column justify-content-center'>
                <Card.Title className='text-light text-center m-0 p-2'>{props.item.title}</Card.Title>
            </Card.Body>
        </Card>
    </Col>
  )
}
