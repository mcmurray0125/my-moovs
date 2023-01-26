import React from 'react'
import Navigation from './Navigation'
import { Container } from "react-bootstrap"
import moviedata from "../database/api"

export default function TopMovies() {
  return (
    <div>
        <Navigation/>
        <Container>
            <h1>Top Movies</h1>
        </Container>
    </div>
  )
}
console.log(JSON.stringify(fetch(moviedata.in_theatres)))
