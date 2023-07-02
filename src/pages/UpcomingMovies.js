import React, { useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import MovieCard from '../components/MovieCard'


export default function UpcomingMovies() {
  const [upcomingMovies, setUpcomingMovies] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1)


  const paginate = (number) => setCurrentPage(number);

  //Set Up-Coming Movie from API
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&page=${currentPage}&region=US`).then(response=>{
    setUpcomingMovies(response.data.results)
    setTotalPages(response.data.total_pages)
    }).catch(err=>{console.log(err)})
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
    <div>
      <Container className='mt-4 pb-4'>
        <header className='d-flex align-items-center justify-content-between mb-3'>
          <h1 className='page-title m-0'>Upcoming Movies</h1>
          <p className='page-info m-0'>Page {currentPage} of {totalPages}</p>
        </header>
        <Row >
        {upcomingMovies.map((movie, index) => {
        return (
            <Col xs={6} md={3} key={index} className='mb-4'>
            <MovieCard {...movie} paginate={paginate} movie={movie}/>
            </Col>
            )
        })}
        </Row>
        <Pagination className='w-100 d-flex justify-content-center mb-5' onClick={top}>{items}</Pagination>
      </Container>
    </div>
  )
}
