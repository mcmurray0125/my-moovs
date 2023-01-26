import React, { useEffect, useRef } from 'react'
import Navigation from './Navigation'
import { Container, Row, Col, Form } from "react-bootstrap"
import axios from "axios"
import MovieCard from './MovieCard'

export default function SearchMovies() {
  const [movies, setMovies] = React.useState([])
  const [query, setQuery] = React.useState('')

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&page=1").then(response=>{
    setMovies(response.data.results)
    }).catch(err=>{console.log(err)})
  },[])

  
  const changeHandler = (e) => {
    setQuery(e.target.value);
  }
  
  const searchMovie = async(e) => {
    e.preventDefault()
    console.log('searching');
    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&query=${query}&page=1&include_adult=false`;
      const res= await fetch(url);
      const data= await res.json()
      console.log(data)
      setMovies(data.results)
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div>
        <Navigation/>
          <Container className='my-3'>
            <Form onSubmit={searchMovie}>
                <Form.Group id='movie-search'>
                    <Form.Label className='fs-2 text-center' style={{width: "100%"}}>Find Movies</Form.Label>
                    <Form.Control className='mb-3' onChange={changeHandler} type="search" placeholder="Search" aria-label='search' name='query' value={query}></Form.Control>
                </Form.Group>
            </Form>
            <Row >
            {movies.map((movie, index) => {
              return (
                <Col xs={3} key={index} className='mb-4'>
                  <MovieCard {...movie}/>
                </Col>
                )
              })}
            </Row>
          </Container>
    </div>
  )
}
