import React, { useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import MovieCard from './MovieCard'
import gradient from "../assets/abstract-gradient.jpg"


export default function PopularMovies() {
  const [popularMovies, setpopularMovies] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 7
  
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
      </Pagination.Item>
    );
  }
  
  const top = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
  }, 500);
  };

  return (
    <div className='page-wrapper'>
        <img className='gradient-left' src={gradient} alt='gradient-img'/>
        <img className='gradient-right' src={gradient} alt='gradient-img'/>
        <div className='gradient-backdrop-filter'></div>
          <Container className='pt-4 pb-4'>
          <header className='d-flex align-items-center justify-content-between mb-3'>
            <h1 className='page-title m-0'>Popular Movies</h1>
            <p className='page-info m-0'>Page {currentPage} of {totalPages}</p>
          </header>
            <Row >
            {popularMovies.map((movie, index) => {
              return (
                <Col xs={6} md={3} key={index} className='mb-4'>
                  <MovieCard {...movie} paginate={paginate} movie={movie}/>
                </Col>
                )
              })}
            </Row>
            <Pagination className='w-100 d-flex justify-content-center' onClick={top}>{items}</Pagination>
          </Container>
    </div>
  )
}
