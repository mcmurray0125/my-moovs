import React, { useEffect } from 'react'
import { Card, Container, InputGroup, Form, Button } from "react-bootstrap"
import star from '../assets/star.png'
import starFilled from '../assets/star-filled.png'
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext'


export default function LargeMovieCard({movie, poster_path, title, release_date, id, paginate}) {
  const [favorite, setFavorite] = React.useState(false)
  const { currentUser } = useAuth()
  const [savedMovies, setSavedMovies] = React.useState([])
  
  const  handleClick = async () => {
    if (currentUser) {
      const savedRef = doc(db, "users", currentUser.uid);
      const movieRef = JSON.stringify(movie);
      if (savedMovies.includes(movieRef)) {
        try {
          await updateDoc(savedRef, {
          saved: arrayRemove(movieRef)
        });
        setFavorite(false)
        console.log(`Removed ${movieRef}`)
      } catch(error) {
        console.log(error)
        }
      } else {
        try {
          await updateDoc(savedRef, {
          saved: arrayUnion(movieRef)
        });
        setFavorite(true)
        console.log(`Saved ${movieRef}`)
      } catch(error) {
        console.log(error)
        }
      }
    }
  }

  useEffect(() => {
    const checkData = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        try {
          const docSnap = await getDoc(docRef);
          setSavedMovies(docSnap.data().saved);
        } catch(error) {
          console.log(error)
        }
      }
    }
    checkData();
  },[paginate, favorite])

   useEffect(() => {
     const addFavorites = async () => {
      const movieRef = JSON.stringify(movie);
         if (savedMovies.includes(movieRef)) {
           setFavorite(true)
         } else {
           setFavorite(false)
         }
     }
     addFavorites();
   },[savedMovies])
  
   
  return (
    <Container >
        <div className='d-flex rounded p-3 gap-2' style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            <Card className="large-card m-auto shadow border-0" style={{maxWidth: "26%"}}>
                <Card.Body >
                    <Card.Img src={`https://image.tmdb.org/t/p/w500`+poster_path} className="shadow-lg" />
                    <Card.Title className='my-1'>{title}</Card.Title>
                    <div className='d-flex align-items-center justify-content-between'>
                    <Card.Text className='my-0'>{release_date}</Card.Text>
                    <img className='star' style={{width: "30px", cursor: "pointer" }} onClick={handleClick} src={favorite ? starFilled : star}/>
                    </div>
                </Card.Body>
            </Card>
            <Form className='comments-form w-100 position-relative h-100 rounded p-1'>
                <Form.Group className="mb-3" controlId="comments">
                    <Form.Label>Comments</Form.Label>
                    <Form.Control as="textarea" type="comments" placeholder="Your thought about the movie"/>
                </Form.Group>
                <Button variant="primary" type="submit" className='position-absolute top-100 end-0'>
                    Submit
                </Button>
            </Form>
        </div>
    </Container>
  )
}
