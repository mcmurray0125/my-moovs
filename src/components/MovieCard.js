import React, { useEffect, useState } from 'react'
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card, Toast, Button, Spinner } from "react-bootstrap"
import posterFallback from "../assets/poster-fallback.png"
import MovieModal from './Modal'


export default function MovieCard({movie, poster_path, title, release_date, id, paginate}) {
  const [favorite, setFavorite] = useState(false)
  const { currentUser } = useAuth()
  const [savedMovies, setSavedMovies] = useState([])
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  
  //Date Formatting
  const movieDate = new Date(release_date);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = movieDate.toLocaleDateString('en-US', options)

  const handleClick = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (currentUser) {
      const savedRef = doc(db, "users", currentUser.uid);

      // returns true if the movie ID is present in savedMovies.
      const isMovieSaved = savedMovies.some((savedMovie) => savedMovie.id === id);
  
      if (isMovieSaved) {
        // Un-Favorite a movie if it is already saved.
        try {
          const newSavedMovies = savedMovies.filter((savedMovie) => savedMovie.id !== id);
          await updateDoc(savedRef, {
            saved: newSavedMovies
          });
          setFavorite(false)
          setShow(true)
          setSaving(false)
        }
        catch (error) {
          console.log(error)
          setSaving(false)
        }
      } else {
        // Favorite a movie that is not saved.
        try {
          await updateDoc(savedRef, {
            saved: arrayUnion(movie)
          });
          setFavorite(true)
          setShow(true)
          setSaving(false)
        }
        catch (error) {
          console.log(error)
          setSaving(false)
        }
      }
    } else {
      setShow(true);
      setSaving(false)
    }
  };
  
  
  // Set Saved Movies from Database.
  useEffect(() => {
    const checkData = async () => {
      if (currentUser) {
        setLoading(true)
        const docRef = doc(db, "users", currentUser.uid);
        try {
          const docSnap = await getDoc(docRef);
          const savedMoviesData = docSnap.data().saved;
          setSavedMovies(savedMoviesData);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    checkData();
  }, [paginate, favorite, currentUser]);

  useEffect(() => {
    const addFavorites = () => {
      const isMovieSaved = savedMovies.some((savedMovie) => savedMovie.id === id);
      setFavorite(isMovieSaved);
    };
  
    addFavorites();
  }, [savedMovies, id]);  
  
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
                <Card.Text className='mb-1'>Released {formattedDate}</Card.Text>
                {loading ?
                <Spinner animation="border" size="sm"/>
                :
                <Button
                  className={`${favorite ? 'remove-btn' : 'save-btn'} px-4 py-1 fs-6`}
                  onClick={(e) => handleClick(e)}
                  aria-label={`${favorite? 'remove' : 'save'} ${title}`}
                >
                  {saving ?
                  <Spinner animation="border" size="sm"/>
                  : 
                  <>
                    <i className={`fa-solid ${favorite ? 'fa-minus' : 'fa-plus'}`} />
                    &nbsp; {favorite ? 'Remove' : 'Save'}
                  </>
                  }
                </Button>}
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
