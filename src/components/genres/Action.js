import React, { useEffect } from 'react'
import Navigation from '../Navigation'
import { Container, Row, Col } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import MovieCard from '../MovieCard'

export default function Action() {
  const [actionMovies, setActionMovies] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState();

  const paginate = (number) => setCurrentPage(number);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=28&with_watch_monetization_types=flatrate`).then(response=>{
    setActionMovies(response.data.results)
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
    <div>
        <Navigation/>
          <Container style={{marginTop: "6rem"}}>
          <h1 className='text-center mb-4'>Action Movies</h1>
            <Row >
            {actionMovies.map((movie, index) => {
              return (
                <Col xs={3} key={index} className='mb-4'>
                  <MovieCard {...movie} paginate={paginate} movie={movie}/>
                </Col>
                )
              })}
            </Row>
            <Pagination className='w-100 d-flex justify-content-center mb-5' onClick={scrollToTop}>{items}</Pagination>
          </Container>
    </div>
  )
}
