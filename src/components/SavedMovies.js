import React, { useEffect, useState, useRef } from 'react'
import { Alert, Card, Button, Container, Row, Col, Form, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase"
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"
import Navigation from './Navigation'
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios"
import MovieCard from './MovieCard'

export default function SavedMovies() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const { currentUser, hasFolder } = useAuth()
    const [query, setQuery] = React.useState('')
    const [totalPages, setTotalPages] = React.useState(1)
    const [currentPage, setCurrentPage] = React.useState(1);
    const [dbMovies, setDBMovies] = React.useState()

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
        dbMovies.forEach(function(item) {
          console.log(JSON.parse(item));
        });
      }
    }, [dbMovies]);

    // useEffect(() => {
    //   if (dbMovies) {
    //     dbMovies.forEach(function(item) {
    //       console.log(JSON.parse(item));
    //     });
    //   }
    // }, [dbMovies]);

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

  //     const changeHandler = (e) => {
  //       setQuery(e.target.value);
  //     }

  //     const handleBackspace = (event) => {
  //       if (event.key === 'Backspace') {
  //         setCurrentPage(1);
  //       }
  //     }





  return (
    <div>
        <Navigation/>
        <Container className='d-flex align-items-center justify-content-center' style={{marginTop: "6rem"}}>
            <div className='w-100' style={{maxWidth: "400px"}}>
            <Card className="text-center my-5">
                    <Card.Body >
                        <Card.Title>Saved Movies</Card.Title>
                        {currentUser ?
                        <Card.Text>Here are your saved movies.</Card.Text> :
                        <Card.Text><Link to="/login">Login</Link> or <Link to="/signup">Create an account</Link> to save movies.</Card.Text> }
                    </Card.Body>
            </Card>
            </div>
        </Container>
    </div>
  )
}
