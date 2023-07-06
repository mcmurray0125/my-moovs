import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, InputGroup, Spinner } from "react-bootstrap"
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import MovieCard from '../components/MovieCard'
import MovieCardSkeleton from '../components/MovieCardSkeleton';

export default function SearchMovies() {
  const [loading, setLoading] = useState(true)
  const [debouncing, setDebouncing] = useState(false);
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (number) => setCurrentPage(number);

  //When input is empty, display top-rated movies by default.
  useEffect(() => {
    setLoading(true)

    if (query === ''){
      axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${currentPage}`)
      .then(response=>{
      setMovies(response.data.results)
      setTotalPages(8)
      setLoading(false)

      }).catch(err=>{
        console.log(err)
        setLoading(false)
      })

    }
  }, [query, currentPage])
  
  const changeHandler = (e) => {
    setQuery(e.target.value);
    setDebouncing(true);
    if (e.target.value === '') {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage])

  //If user deletes their search, page resets to 1.
  const handleBackspace = (event) => {
    if (event.key === 'Backspace') {
      setCurrentPage(1);
    }
  }

  const fetchMovies = () => {
    setLoading(true)

    if (query !== '') {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${query}&page=${currentPage}&include_adult=false`)
        .then((response) => {
          setMovies(response.data.results);
          setTotalPages(response.data.total_pages);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          setDebouncing(false);
        });
    }
  };

  //Delay fetching untill 1s after typing stops.
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (debouncing && query !== '') {
        fetchMovies();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query, currentPage, debouncing]);

  useEffect(() => {
    if (query !== '') {
      window.addEventListener('keydown', handleBackspace);
    }

    return () => {
      window.removeEventListener('keydown', handleBackspace);
    };
  }, [query]);

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
              placeholder="Search Moovs"
              aria-label="search"
              onChange={changeHandler}
              type="search"
              name='query'
              value={query}
              className='border rounded-0 border-0 border-bottom fs-1 shadow-none search-input'
            />
        </InputGroup>
          <header className="d-flex align-items-center justify-content-between page-info">
            {loading && query.length !== 0 ? (
              <span className="d-flex justify-content-center align-items-center gap-3 mb-3">
                <p className="text-center my-0">Loading...</p>
                <Spinner animation="border" />
              </span>
              ) : (
              <span className="d-flex justify-content-between page-info w-100">
                <p className="text-center text-nowrap my-0">{query === '' ? `Showing Top Rated Movies` : `Showing results for: ${query}`}</p>
                <p>Page {currentPage} of {totalPages}</p>
              </span>
            )}
          </header>
        <Row >
          {loading ?
          <MovieCardSkeleton cards={16}/>
          :  
          movies.map((movie, index) => {
          return (
              <Col xs={6} md={3} key={index} className='mb-4'>
                <MovieCard {...movie} paginate={paginate} movie={movie}/>
              </Col>
              )
          })
          }
        </Row>
        <Pagination className='w-100 d-flex justify-content-center' onClick={scrollToTop}>{items}</Pagination>
      </Container>
    </div>
  )
}
