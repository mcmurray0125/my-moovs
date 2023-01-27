import React from 'react'
import { Container, Card } from "react-bootstrap"

export default function MovieCard({poster_path, title, release_date}) {
  return (
    <Card className="m-auto">
        <Card.Body>
            <Card.Img src={`https://image.tmdb.org/t/p/w500`+poster_path} />
            <Card.Title className='my-1'>{title}</Card.Title>
            <div className='d-flex align-items-center'>
            <Card.Text className='my-0'>{release_date}</Card.Text>
            <i className="fa-regular fa-star ms-auto fs-5"></i>
            </div>
        </Card.Body>
    </Card>
  )
}
