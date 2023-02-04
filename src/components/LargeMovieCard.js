import React, { useEffect } from 'react'
import { Card, Container, Form, Button } from "react-bootstrap"
import star from '../assets/star.png'
import starFilled from '../assets/star-filled.png'
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext'
import MovieCard from './MovieCard'


export default function LargeMovieCard({movie, poster_path, title, release_date, id, paginate}) {
  const [favorite, setFavorite] = React.useState(false)
  const { currentUser } = useAuth()
  const [comments, setComments] = React.useState("")
  const [dbComments, setDBComments] = React.useState([])
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
      } catch(error) {
        console.log(error)
        }
      } else {
        try {
          await updateDoc(savedRef, {
          saved: arrayUnion(movieRef)
        });
        setFavorite(true)
      } catch(error) {
        console.log(error)
        }
      }
    }
  }

  //Post Comment to Database
  const  handleSubmit = async (e) => {
    e.preventDefault()
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      try {
        await updateDoc(docRef, {
        comments: arrayUnion(id + comments)
      });
      console.log(`Saved ${comments}`)
    } catch(error) {
      console.log(error)
    } try {
      const docSnap = await getDoc(docRef);
      setDBComments(docSnap.data().comments);
    } catch(error) {
      console.log(error)
    }
  }
  setComments("")
  }

  const changeHandler = (e) => {
  setComments(e.target.value);
  }

  //Check Fire Store for Saved Movies and Comments
  useEffect(() => {
    const checkData = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        try {
          const docSnap = await getDoc(docRef);
          setSavedMovies(docSnap.data().saved);
          setDBComments(docSnap.data().comments);
        } catch(error) {
          console.log(error)
        }
      }
    }
    checkData();
  },[paginate, favorite])


  //Set Card to Favorite if it is included in the savedMovies.
  //Might not be needed in this component since this component
  //is only rendered if it is a saved movie.
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
        <div className='d-flex rounded p-3 gap-2 saved-movie-wrapper position-relative shadow'>
          {/* Backdrop Image */}
            <div className='backdrop-image position-absolute rounded' style={{
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: "brightness(80%)",
                zIndex: "-100"
            }}></div>
            {/* Movie Poster */}
            <MovieCard {...movie} movie={movie}/>
            {/* Comments Section */}
            <section className='comments-wrapper d-flex flex-column w-100 gap-2 overflow-auto'>
              <Form className='comments-form w-100 h-auto rounded p-1'>
                  <Form.Group className="mb-1" controlId="comments">
                      <Form.Label>Comments</Form.Label>
                      <Form.Control 
                      as="textarea"
                      type="text"
                      aria-label="comment-input"
                      name="comments"
                      placeholder="Your thought about the movie"
                      onChange={changeHandler}
                      value={comments}
                      className="opacity-75"
                      />
                  </Form.Group>
                  <Button variant="success" onClick={handleSubmit} type="submit" className='py-1'>
                      Submit
                  </Button>
              </Form>
              {/* Render Comments */}
              <article>
              {dbComments.map((comment, index) => {
                if (comment.startsWith(id)) {
                  return (
                    <Card key={index} className="comment-card mb-1">
                      <Card.Body>{comment.replace(id, '')}</Card.Body>
                    </Card>
                    )
                }
              })}
              </article>
            </section>
        </div>
    </Container>
  )
}