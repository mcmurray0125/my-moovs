import React, { useEffect } from 'react'
import Navigation from './Navigation'
import { Container, Card, Row, Col } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import MovieCard from './MovieCard'


export default function PopularMovies() {
  const [popularMovies, setpopularMovies] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);

  const paginate = (number) => setCurrentPage(number);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&page=${currentPage}`).then(response=>{
    setpopularMovies(response.data.results)
    }).catch(err=>{console.log(err)})
  },[currentPage])
  
  let items = [];
  for (let number = 1; number <= 7; number++) {
    items.push(
      <Pagination.Item key={number} active={currentPage === number} onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  
  const top = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
  }, 500);
  };

  return (
    <div>
        <Navigation/>
          <Container>
          <h1 className='text-center m-3'>Popular Movies</h1>
            <Row >
            {popularMovies.map((movie, index) => {
              return (
                <Col xs={3} key={index} className='mb-4'>
                  <MovieCard {...movie}/>
                </Col>
                )
              })}
            </Row>
            <Pagination className='w-100 d-flex justify-content-center mb-5' onClick={top}>{items}</Pagination>
          </Container>
    </div>
  )
}
