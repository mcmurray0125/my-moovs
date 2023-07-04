import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import MovieCard from '../components/MovieCard'
import MovieCardSkeleton from '../components/MovieCardSkeleton';


export default function UpcomingMovies() {
  const [loading, setLoading] = useState(true)
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)


  const paginate = (number) => setCurrentPage(number);

  //Set Up-Coming Movie from API
  useEffect(() => {
    setLoading(true)
    
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${currentPage}&region=US`)
      .then(response=> {
        setUpcomingMovies(response.data.results)
        setTotalPages(response.data.total_pages)
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
      })
  },[currentPage])
  
  //Page Numbers for bottom of page.
  let items = [];
  for (let number = 1; number <= Math.min(totalPages, 8); number++) {
    items.push(
      <Pagination.Item key={number} active={currentPage === number} onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>
    );
  }
  
  //Scroll to Top on Page Change.
  const top = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
  }, 500);
  };

  return (
      <Container className='pt-4 pb-4'>
        <header className='d-flex align-items-center justify-content-between mb-3'>
          <h1 className='page-title m-0'>Upcoming Movies</h1>
          <p className='page-info m-0'>Page {currentPage} of {totalPages}</p>
        </header>
        <Row >
        {loading ?
        <MovieCardSkeleton cards={16}/>
        :  
        upcomingMovies.map((movie, index) => {
        return (
            <Col xs={6} md={3} key={index} className='mb-4'>
              <MovieCard {...movie} paginate={paginate} movie={movie}/>
            </Col>
            )
        })
        }
        </Row>
        <Pagination className='w-100 d-flex justify-content-center mb-5' onClick={top}>{items}</Pagination>
      </Container>
  )
}
