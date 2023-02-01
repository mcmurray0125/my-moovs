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
    const { currentUser, hasFolder } = useAuth()
    const [query, setQuery] = React.useState('')
    const [totalPages, setTotalPages] = React.useState(1)
    const [currentPage, setCurrentPage] = React.useState(1);
    const [dbMovies, setDBMovies] = React.useState()
    const [parsedMovies, setParsedMovies] = React.useState([])

    const paginate = (number) => setCurrentPage(number);

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

    //If query is empty, parsedMovies
    //if query !== '',
      //filter parsed movies based on if parsedmovies includes the query.

    //When input is empty, display saved movies by default.
    useEffect(() => {
      if (parsedMovies) {
        if (query !== '') {
          setParsedMovies(parsedMovies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())))
        }
      }
    }, [query])
    


  //     const handleBackspace = (event) => {
  //       if (event.key === 'Backspace') {
  //         setCurrentPage(1);
  //       }
  //     }


  return (
    <div>
        <Navigation/>
        <Container style={{marginTop: "6rem"}}>
          <div className='d-flex align-items-center flex-column justify-content-start'>
            <div className='w-100' style={{maxWidth: "400px"}}>
            <Card className="text-center mb-3">
                    <Card.Body >
                      {dbMovies !== [] ? <Card.Title>Saved Moovs</Card.Title> : <Card.Title>No Saved Moovs</Card.Title> }
                        {currentUser ?
                        <Card.Text>Find your movies below.</Card.Text> :
                        <Card.Text><Link to="/login">Login</Link> or <Link to="/signup">Create an account</Link> to save movies.</Card.Text> }
                    </Card.Body>
            </Card>
            </div>
            <InputGroup className="mb-3">
              <Form.Label className='fs-3 text-center text-decoration-underline my-0' style={{width: "100%"}}>Search your Saved Moovs</Form.Label>
                <Form.Control
                  placeholder="Movie Title"
                  aria-label="comment-input"
                  aria-describedby="basic-addon2"
                  type="search"
                  onChange={changeHandler}
                  name='search'
                  value={query}
                  className='border rounded-0 border-0 border-bottom fs-1 shadow-none'
                />
            </InputGroup>
          </div>
          <Row >
            {parsedMovies.map((movie, index) => {
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
