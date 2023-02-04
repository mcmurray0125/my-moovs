import React, { useEffect, useState, useRef } from 'react'
import { Alert, Card, Button, Container, Row, Col, Form, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase"
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"
import Navigation from './Navigation'
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import LargeMovieCard from './LargeMovieCard'

export default function SavedMovies() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [variant, setVariant ] = useState("")
    const [linkPath, setLinkPath] = useState("")
    const [linkText, setLinkText] = useState("")
    const { currentUser, hasFolder } = useAuth()
    const [query, setQuery] = React.useState('')
    const [totalPages, setTotalPages] = React.useState(1)
    const [currentPage, setCurrentPage] = React.useState(1);
    const [dbMovies, setDBMovies] = React.useState([])
    const [parsedMovies, setParsedMovies] = React.useState([])
    const [filteredMovies, setFilteredMovies] = React.useState(parsedMovies)

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
    },[dbMovies])

     //Get the Movies from Database
     useEffect(() => {
      const checkData = async () => {
        if (currentUser) {
          const docRef = doc(db, "users", currentUser.uid);
          try {
            const docSnap = await getDoc(docRef);
            setDBMovies(docSnap.data().saved);
          } catch(error) {
            console.log(error)
          }
        }
      }
      checkData();
    },[hasFolder])

    useEffect(() => {
      if (dbMovies) {
        let parsedArray = []
        dbMovies.forEach(function(item) {
          parsedArray.push((JSON.parse(item)));
        });
        setParsedMovies(parsedArray)
      }
    }, [dbMovies]);
    
    
     const changeHandler = (e) => {
       setQuery(e.target.value);
     }

    //When input is empty, setFiltered to parsedMovie,
      // else, setFiltered to parsedMovies, filtered by query.
    useEffect(() => {
      if (parsedMovies) {
        if (query !== '') {
          setFilteredMovies(parsedMovies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())))
        } else {
          setFilteredMovies(parsedMovies)
        }
      }
    }, [query, parsedMovies])
    
  return (
    <div>
        <Navigation/>
        <Container className='my-4'>
          <div className='d-flex align-items-center flex-column justify-content-start'>
            {/* If dbMovies is not empty, display search bar */}
            <Alert variant={variant}>
              {message} <Alert.Link href={linkPath}>{linkText}</Alert.Link>
            </Alert>
            {dbMovies.length !== 0 && <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search saved Moovs"
                  aria-label="comment-input"
                  aria-describedby="basic-addon2"
                  type="search"
                  onChange={changeHandler}
                  name='search'
                  value={query}
                  className='border rounded-0 border-0 border-bottom fs-1 shadow-none'
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
    </div>
  )
}
