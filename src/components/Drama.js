import React, { useEffect } from 'react'
import Navigation from './Navigation'
import { Container, Row, Col } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import MovieCard from './MovieCard'

export default function Drama() {
  const [dramaMovies, setDramaMovies] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);

  const paginate = (number) => setCurrentPage(number);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=18&with_watch_monetization_types=flatrate`).then(response=>{
    setDramaMovies(response.data.results)
    }).catch(err=>{console.log(err)})
  },[paginate])

  let items = [];
  for (let number = 1; number <= 7; number++) {
    items.push(
      <Pagination.Item key={number} active={currentPage === number} onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
  }, 500);
  };

  return (
    <div>
        <Navigation/>
          <Container>
          <h1 className='text-center m-3'>Drama Movies</h1>
            <Row >
            {dramaMovies.map((movie, index) => {
              return (
                <Col xs={3} key={index} className='mb-4'>
                  <MovieCard {...movie}/>
                </Col>
                )
              })}
            </Row>
            <Pagination className='w-100 d-flex justify-content-center mb-5' onClick={scrollToTop}>{items}</Pagination>
          </Container>
    </div>
  )
}
