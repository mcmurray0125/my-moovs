import React, { useEffect, useState } from 'react'
import { Alert, Container, Row, Col, Form, InputGroup } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import Pagination from 'react-bootstrap/Pagination';
import LargeMovieCard from '../components/LargeMovieCard'

export default function SavedMovies() {
    const [message, setMessage] = useState("")
    const [variant, setVariant ] = useState("")
    const [linkPath, setLinkPath] = useState("")
    const [linkText, setLinkText] = useState("")
    const { currentUser, hasFolder } = useAuth()
    const [query, setQuery] = useState('')
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1);
    const [dbMovies, setDBMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState(dbMovies)
    const [show, setShow] = useState(true);

    const paginate = (number) => setCurrentPage(number);

    useEffect(() => {
      if (currentUser) {
        if (dbMovies.length === 0) {
          setVariant("info")
          setMessage("No Saved Movies! When browsing, click the star icon to save a movie.")
          setLinkText("Search for Movies")
          setLinkPath("/search-movies")
        } else {
          setVariant("success")
          setMessage("See your saved movies below.")
          setLinkText("")
          setLinkPath("")
        }
      } else {
        setVariant("warning")
        setMessage("You need to be logged in to save Movies.")
        setLinkText("Login")
        setLinkPath("/login")
      }
    }, [dbMovies, currentUser])

     //Get the Movies from Database
     useEffect(() => {
      const checkData = async () => {
        if (currentUser) {
          const docRef = doc(db, "users", currentUser.uid);
          try {
            const docSnap = await getDoc(docRef);
            const savedMoviesData = docSnap.data().saved;
            setDBMovies(savedMoviesData);
          } catch(error) {
            console.log(error)
          }
        }
      }
      checkData();
    }, [hasFolder, currentUser])
        
     const changeHandler = (e) => {
       setQuery(e.target.value);
     }

    //When input is empty, setFiltered to dbMovies,
      // else, setFiltered to dbMoviess, filtered by query.
    useEffect(() => {
      if (dbMovies) {
        if (query !== '') {
          setFilteredMovies(dbMovies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())))
        } else {
          setFilteredMovies(dbMovies)
        }
      }
    }, [query, dbMovies])
    
  return (
    <Container className='pt-4 pb-4' style={{height: variant !== 'success' ? `calc(100dvh - 73px)` : undefined}}>
      <div className='d-flex align-items-center flex-column justify-content-start'>
        {/* If dbMovies is not empty, display search bar */}

        {show && <Alert variant={variant} onClose={() => setShow(false)} dismissible={variant === 'success'}>
          {message} <Alert.Link href={linkPath}>{linkText}</Alert.Link>
        </Alert>}
        {dbMovies.length !== 0 && <InputGroup className="mb-3">
            <Form.Control
              className='border rounded-0 border-0 border-bottom fs-1 shadow-none search-input'
              placeholder="Search saved Moovs"
              aria-label="comment-input"
              type="search"
              onChange={changeHandler}
              name='search'
              value={query}
            />
        </InputGroup>
        }
      </div>
      <Row >
        {filteredMovies.map((movie, index) => {
          return (
            <Col sm={12} key={index} className='mb-4'>
              <LargeMovieCard {...movie} paginate={paginate} movie={movie}/>
            </Col>
            )
          })}
        </Row>
    </Container>
  )
}
