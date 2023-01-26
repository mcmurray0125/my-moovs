import React, { useEffect } from 'react'
import Navigation from './Navigation'
import { Container, Card, Row, Col } from "react-bootstrap"
import axios from "axios"
import MovieCard from './MovieCard'

export default function TopMovies() {
  const [popularMovies, setpopularMovies] = React.useState([])

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&page=1').then(response=>{
    setpopularMovies(response.data.results)
    }).catch(err=>{console.log(err)})
  },[])

  return (
    <div>
        <Navigation/>
          <Container>
            <Row>
            {popularMovies.map((movie, index) => {
              return (
                <Col xs={3} key={index}>
                  <MovieCard {...movie}/>
                </Col>
                )
              })}
            </Row>
          </Container>
    </div>
  )
}
