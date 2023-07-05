import { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import axios from 'axios';

export default function BrowseLayout({ pageTitle, apiUrl, icon }) {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 7;
  
    const paginate = (number) => setCurrentPage(number);
  
    useEffect(() => {
      setLoading(true);
  
      axios
        .get(`${apiUrl}&page=${currentPage}`)
        .then((response) => {
            setMovies(response.data.results);
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
            setLoading(false)
        })
    }, [apiUrl, currentPage]);
  
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={currentPage === number}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };
  
    return (
      <Container className="pt-4 pb-4">
        <header className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="page-title m-0">{icon && <i className={icon}></i>} {pageTitle}</h1>
          <p className="page-info m-0">
            Page {currentPage} of {totalPages}
          </p>
        </header>
        <Row>
          {loading ? (
            <MovieCardSkeleton cards={16} />
          ) : (
            movies.map((movie, index) => (
              <Col xs={6} md={3} key={index} className="mb-4">
                <MovieCard {...movie} paginate={paginate} movie={movie} />
              </Col>
            ))
          )}
        </Row>
        <Pagination className='w-100 d-flex justify-content-center' onClick={scrollToTop}>{items}</Pagination>
      </Container>
    );
  }
  
  