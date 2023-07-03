import React, { useEffect, useState } from 'react'
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card, Toast } from "react-bootstrap"
import posterFallback from "../assets/poster-fallback.png"
import star from '../assets/star.png'
import starFilled from '../assets/star-filled.png'
import MovieModal from './Modal'


export default function MovieCard({movie, poster_path, title, release_date, id, paginate}) {
  const [favorite, setFavorite] = useState(false)
  const { currentUser } = useAuth()
  const [savedMovies, setSavedMovies] = useState([])
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  
  //Date Formatting
  const movieDate = new Date(release_date);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = movieDate.toLocaleDateString('en-US', options)

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
  
  //Set Saved movies from Database.
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
    <div className='movie-card-wrapper' data-bg={movie.backdrop_path}>
      {/* Toast Notification */}
      <section className='fav-toast-wrapper position-absolute top-25 start-25' style={{zIndex: "300"}}>
        <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide className='w-auto'>
          <Toast.Header>
            <strong className="me-auto">MyMoovs</strong>
            {currentUser ? <small>&#128077;</small> : <small>&#128078;</small>}      
          </Toast.Header>
          {currentUser? <Toast.Body>{title} {favorite ?`added to saved movies.` : `removed from saved`}</Toast.Body> : <Toast.Body>Login or <Link to="/signup">Signup</Link> to save.</Toast.Body> }   
        </Toast>
      </section>
      {/* Movie Card */}
      <Card className="movie-card border-0">
          <Card.Body className='p-0'>
              <Card.Img
                src={`https://image.tmdb.org/t/p/w500`+poster_path}
                onError={(e) => {
                  e.target.src = posterFallback;
                }}
                className="shadow movie-img mb-3"
                role="button"
                alt='poster image'
                onClick={() => setModalShow(true)}
                aria-label={`display movie overview for ${title}`}
              />
              <Card.Title className='m-0'>{title}</Card.Title>
              <div className='d-flex align-items-center justify-content-between'>
              <Card.Text className='my-0'>Released {formattedDate}</Card.Text>
              <img className='star' style={{width: "30px", cursor: "pointer" }} role='button' onClick={handleClick} src={favorite ? starFilled : star} alt="star-icon" aria-label={`save or remove ${title}`}/>
              </div>
          </Card.Body>
      </Card>
      {/* Modal */}
      <MovieModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          movie={movie}
      />
    </div>
  )
}
