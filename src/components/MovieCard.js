import React, { useEffect } from 'react'
import { Card, Toast } from "react-bootstrap"
import star from '../assets/star.png'
import { Link } from 'react-router-dom'
import starFilled from '../assets/star-filled.png'
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext'
import MovieModal from './Modal'


export default function MovieCard({movie, poster_path, title, release_date, id, paginate}) {
  const [favorite, setFavorite] = React.useState(false)
  const { currentUser } = useAuth()
  const [savedMovies, setSavedMovies] = React.useState([])
  const [show, setShow] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  
  const handleClick = async () => {
    if (currentUser) {
      const movieRef = JSON.stringify(movie);
      const savedRef = doc(db, "users", currentUser.uid);
      if (JSON.stringify(savedMovies).includes(id)) {
        try {
          const newSavedMovies = savedMovies.filter((savedMovie) => {
            const parsedMovie = JSON.parse(savedMovie);
            return parsedMovie.id !== id;
          });
          await updateDoc(savedRef, {
            saved: newSavedMovies
          });
          setFavorite(false)
          setShow(true)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await updateDoc(savedRef, {
            saved: arrayUnion(movieRef)
          });
          setFavorite(true)
          setShow(true)
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      setShow(true);
    }
  };
  


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
  },[paginate, favorite, currentUser])


   useEffect(() => {
     const addFavorites = () => {
      const movieRef = JSON.stringify(id);
      if (JSON.stringify(savedMovies).includes(movieRef)){
        setFavorite(true)
      } else {
        setFavorite(false)
      }
    }
     addFavorites();
   },[savedMovies, id])
  
  return (
    <>
      <section className='fav-toast-wrapper position-absolute top-25 start-25' style={{zIndex: "300"}}>
        <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide className='w-auto'>
          <Toast.Header>
            <strong className="me-auto">MyMoovs</strong>
            {currentUser ? <small>&#128077;</small> : <small>&#128078;</small>}      
          </Toast.Header>
          {currentUser? <Toast.Body>{title} {favorite ?`added to saved movies.` : `removed from saved`}</Toast.Body> : <Toast.Body>Login or <Link to="/signup">Signup</Link> to save.</Toast.Body> }   
        </Toast>
      </section>
      <Card className="movie-card shadow border-0">
          <Card.Body >
              <Card.Img src={`https://image.tmdb.org/t/p/w500`+poster_path} className="shadow-lg" role="button" onClick={() => setModalShow(true)}/>
              <Card.Title className='my-1'>{title}</Card.Title>
              <div className='d-flex align-items-center justify-content-between'>
              <Card.Text className='my-0'>{release_date}</Card.Text>
              <img className='star' style={{width: "30px", cursor: "pointer" }} onClick={handleClick} src={favorite ? starFilled : star} alt="star-icon"/>
              </div>
          </Card.Body>
      </Card>
      <MovieModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          movie={movie}
      />
    </>
  )
}
