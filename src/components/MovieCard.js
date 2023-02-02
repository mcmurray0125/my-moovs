import React, { useEffect } from 'react'
import { Card, Toast } from "react-bootstrap"
import star from '../assets/star.png'
import starFilled from '../assets/star-filled.png'
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext'


export default function MovieCard({movie, poster_path, title, release_date, id, paginate}) {
  const [favorite, setFavorite] = React.useState(false)
  const { currentUser } = useAuth()
  const [savedMovies, setSavedMovies] = React.useState([])
  const [show, setShow] = React.useState(false);
  
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
        setShow(true)
      } catch(error) {
        console.log(error)
        }
      } else {
        try {
          await updateDoc(savedRef, {
          saved: arrayUnion(movieRef)
        });
        setFavorite(true)
        setShow(true)
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
        const movieRef = JSON.stringify(movie);
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
    <>
      <section className='fav-toast-wrapper position-absolute top-25 start-25' style={{zIndex: "300"}}>
        <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
          <Toast.Header>
            <strong className="me-auto">MyMoovs</strong>
            <small>&#128077;</small>
          </Toast.Header>
          <Toast.Body>{title} {favorite ?`added to saved movies.` : `removed from saved`}</Toast.Body>
        </Toast>
      </section>
      <Card className="movie-card shadow border-0">
          <Card.Body >
              <Card.Img src={`https://image.tmdb.org/t/p/w500`+poster_path} className="shadow-lg" />
              <Card.Title className='my-1'>{title}</Card.Title>
              <div className='d-flex align-items-center justify-content-between'>
              <Card.Text className='my-0'>{release_date}</Card.Text>
              <img className='star' style={{width: "30px", cursor: "pointer" }} onClick={handleClick} src={favorite ? starFilled : star}/>
              </div>
          </Card.Body>
      </Card>
    </>
  )
}
