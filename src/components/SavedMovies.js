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
    
    
    // const changeHandler = (e) => {
    //   setComments(e.target.value);
    // }

    //When input is empty, display saved movies by default.
  //  useEffect(() => {
  //    if (query === ''){
  //      axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&page=${currentPage}`).then(response=>{
  //      setMovies(response.data.results)
  //      }).catch(err=>{console.log(err)})
  //      console.log('default movies')
  //      setTotalPages(12)
  //     }
  //     },[query, currentPage])


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
                  name='search'
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
