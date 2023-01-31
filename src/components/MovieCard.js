import React, { useEffect } from 'react'
import { Card } from "react-bootstrap"
import star from '../assets/star.png'
import starFilled from '../assets/star-filled.png'
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext'


export default function MovieCard({poster_path, title, release_date, id, paginate}) {
  const [favorite, setFavorite] = React.useState(false)
  const { currentUser } = useAuth()
  const [savedMovies, setSavedMovies] = React.useState([])
  
  const  handleClick = async () => {
    if (currentUser) {
      const savedRef = doc(db, "users", currentUser.uid);
      if (savedMovies.includes(id)) {
        try {
          await updateDoc(savedRef, {
          saved: arrayRemove(id)
        });
        setFavorite(false)
        console.log(`${id} Movie Removed`)
      } catch(error) {
        console.log(error)
        }
      } else {
        try {
          await updateDoc(savedRef, {
          saved: arrayUnion(id)
        });
        setFavorite(true)
        console.log(`${id} Movie Saved`)
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
         if (savedMovies.includes(id)) {
           setFavorite(true)
         } else {
           setFavorite(false)
         }
     }
     addFavorites();
   },[savedMovies])
  
   
  return (
    <Card className="m-auto">
        <Card.Body >
            <Card.Img src={`https://image.tmdb.org/t/p/w500`+poster_path} />
            <Card.Title className='my-1'>{title}</Card.Title>
            <div className='d-flex align-items-center justify-content-between'>
            <Card.Text className='my-0'>{release_date}</Card.Text>
            <img style={{width: "30px", cursor: "pointer" }} onClick={handleClick} src={favorite ? starFilled : star}/>
            </div>
        </Card.Body>
    </Card>
  )
}
