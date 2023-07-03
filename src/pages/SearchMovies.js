import React, { useEffect } from 'react'
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import MovieCard from '../components/MovieCard'

export default function SearchMovies() {
  const [movies, setMovies] = React.useState([])
  const [query, setQuery] = React.useState('')
  const [totalPages, setTotalPages] = React.useState(1)
  const [currentPage, setCurrentPage] = React.useState(1);

  const paginate = (number) => setCurrentPage(number);

  //When input is empty, display top-rated movies by default.
  useEffect(() => {
    if (query === ''){
      axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&page=${currentPage}`).then(response=>{
      setMovies(response.data.results)
      }).catch(err=>{console.log(err)})
      setTotalPages(8)
    }
  },[query, currentPage])

  
  const changeHandler = (e) => {
    setQuery(e.target.value);
  }

  //If user deletes their search, page resets to 1.
  const handleBackspace = (event) => {
    if (event.key === 'Backspace') {
      setCurrentPage(1);
    }
  }


  //When input is not empty, search movies.
  useEffect(() => {
    if (query !== '') {
      window.addEventListener('keydown', handleBackspace);
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&query=${query}&page=${currentPage}&include_adult=false`).then(response=>{
      setMovies(response.data.results)
      setTotalPages(response.data.total_pages)
      }).catch(err=>{console.log(err)})
    }
    return () => {
      window.removeEventListener('keydown', handleBackspace);
    }
  },[query, currentPage])

  //Push Pagination items into array
  let items = [];
  for (let number = 1; number <= Math.min(totalPages, 8); number++) {
    items.push(
      <Pagination.Item key={number} active={currentPage === number} onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
  }, 200);
  };

  return (
    <div>
      <Container className='pt-4 pb-4'>
        <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search"
              aria-label="search"
              aria-describedby="basic-addon2"
              onChange={changeHandler}
              type="search"
              name='query'
              value={query}
              className='border rounded-0 border-0 border-bottom fs-1 shadow-none search-input'
            />
        </InputGroup>
        {query === '' ?
        <header className='d-flex align-items-center justify-content-between page-info'>
            <span className='d-flex justify-content-center align-items-center gap-3 mb-3'>
              <p className='text-center text-nowrap my-0'>Showing Top-Rated Movies</p>
            </span>
            <p>Page {currentPage} of {totalPages}</p>
        </header> :
        <span className='d-flex justify-content-between page-info'><p>Showing results for: {query}</p><p>Page {currentPage} of {totalPages}</p></span>
        }
        <Row >
        {movies.map((movie, index) => {
          return (
            <Col xs={6} md={3} key={index} className='mb-4'>
              <MovieCard {...movie} paginate={paginate} movie={movie}/>
            </Col>
            )
          })}
        </Row>
        <Pagination className='w-100 d-flex justify-content-center' onClick={scrollToTop}>{items}</Pagination>
      </Container>
    </div>
  )
}
