import React, { useEffect } from 'react'
import { Card } from "react-bootstrap"
import star from '../assets/star.png'
import starFilled from '../assets/star-filled.png'
import { db } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext'
import { useDB } from '../contexts/DatabaseContext'


export default function MovieCard({poster_path, title, release_date, id}) {
  const [favorite, setFavorite] = React.useState(false)
  const { currentUser } = useAuth()
  const [savedMovies, setSavedMovies] = React.useState()
  
   const  handleClick = async () => {
     if (currentUser) {
       setFavorite(!favorite)
     }
   }

  
   useEffect(() => {
     if (currentUser && favorite) {
         const savedRef = doc(db, "users", currentUser.uid);
         try {
           updateDoc(savedRef, {
           saved: arrayUnion(id)
         });
         console.log(`${id} Movie Saved`)
       } catch(error) {
         console.log(error)
         }
       } else if (currentUser && !favorite) {
        const savedRef = doc(db, "users", currentUser.uid);
         try {
           updateDoc(savedRef, {
           saved: arrayRemove(id)
         });
           console.log(`${id} Movie Removed`)
         } catch(error) {
             console.log(error)
         }
       }
   }, [favorite])


  
  return (
    <Card className="m-auto">
        <Card.Body>
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
