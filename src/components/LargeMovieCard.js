import React, { useEffect } from 'react'
import { Card, Container, Form, Button } from "react-bootstrap"
import { nanoid } from "nanoid"
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext'
import MovieCard from './MovieCard'


export default function LargeMovieCard({movie, id, paginate}) {
  const [favorite, setFavorite] = React.useState(false)
  const { currentUser } = useAuth()
  const [comments, setComments] = React.useState("")
  const [dbComments, setDBComments] = React.useState([])
  const [savedMovies, setSavedMovies] = React.useState([])
  
  
  const changeHandler = (e) => {
  setComments(e.target.value);
  }

  //Post Comment to Database
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      try {
        await updateDoc(docRef, {
        comments: arrayUnion(id + comments + `//${nanoid()}`)
      });
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
  
  //Delete Comment from Database
  const deleteComment = async (comment) => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      try {
        await updateDoc(docRef, {
        comments: arrayRemove(comment)
      });
    } catch(error) {
      console.log(error)
    } try {
      const docSnap = await getDoc(docRef);
      setDBComments(docSnap.data().comments);
    } catch(error) {
      console.log(error)
    }
  }
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
            }}></div>
            {/* Movie Poster */}
            <MovieCard {...movie} movie={movie}/>
            {/* Comments Section */}
            <section className='comments-wrapper d-flex flex-column w-100 gap-2 overflow-auto' style={{zIndex: "200"}}>
              <Form className='comments-form w-100 h-auto p-1 rounded'>
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
                      style={{maxHeight: "300px"}}
                      />
                  </Form.Group>
                  <Button disabled={comments === ""} variant="success" onClick={handleSubmit} type="submit" className='py-1 float-end'>
                      Submit
                  </Button>
              </Form>
              {/* Render Comments */}
              <article>
              {dbComments.map((comment, index) => {
                if (comment.startsWith(id)) {
                  const [commentText, commentUID] = comment.split('//');
                  return (
                    <Card key={index} className="comment-card mb-1 d-flex">
                      <Card.Body className='d-flex'>
                        <Card.Text className='m-0'>
                          {commentText.replace(id, '')}
                        </Card.Text>
                        <button onClick={() => deleteComment(comment)} className='comment-delete-btn border-0 p-2 m-0 d-flex align-items-center justify-content-center align-self-center ms-auto' style={{height: "1.5rem", width: "1.5rem"}}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                        </Card.Body>
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
