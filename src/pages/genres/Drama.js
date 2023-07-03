import React, { useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import MovieCard from '../../components/MovieCard'

export default function Drama() {
  const [dramaMovies, setDramaMovies] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 7

  const paginate = (number) => setCurrentPage(number);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=18&with_watch_monetization_types=flatrate`).then(response=>{
    setDramaMovies(response.data.results)
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

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
  }, 500);
  };

  return (
      <Container className='pt-4 pb-4'>
        <header className='d-flex align-items-center justify-content-between mb-3'>
          <h1 className='page-title m-0'><i className="fa-solid fa-masks-theater fs-3"></i> Drama Movies</h1>
          <p className='page-info m-0'>Page {currentPage} of {totalPages}</p>
        </header>
        <Row >
        {dramaMovies.map((movie, index) => {
          return (
            <Col xs={6} md={3} key={index} className='mb-4'>
              <MovieCard {...movie} paginate={paginate} movie={movie}/>
            </Col>
            )
          })}
        </Row>
        <Pagination className='w-100 d-flex justify-content-center' onClick={scrollToTop}>{items}</Pagination>
      </Container>
  )
}
