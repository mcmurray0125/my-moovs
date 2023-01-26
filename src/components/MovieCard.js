import React from 'react'
import { Container, Card } from "react-bootstrap"

export default function MovieCard({poster_path, title, release_date}) {
  return (
    <Card className="m-auto">
        <Card.Body>
            <Card.Img src={`https://image.tmdb.org/t/p/w500`+poster_path} />
            <Card.Title className='mb-1'>{title}</Card.Title>
            <Card.Text>{release_date}</Card.Text>
        </Card.Body>
    </Card>
  )
}
