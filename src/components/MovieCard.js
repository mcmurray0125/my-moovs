import React, { useEffect } from 'react'
import { Card } from "react-bootstrap"
import star from '../assets/star.png'
import starFilled from '../assets/star-filled.png'
import { useAuth } from '../contexts/AuthContext'
export default function MovieCard({poster_path, title, release_date, id}) {
  const [saved, setSaved] = React.useState([])
  const [favorite, setFavorite] = React.useState(false)
  const { currentUser } = useAuth()

  function handleClick() {
    setSaved(prevSaved => {
      const newSaved = [...prevSaved, { user: currentUser.uid, id: id }]
      console.log(newSaved)
      return newSaved
    })
    setFavorite(!favorite)
  }

  
  return (
    <Card className="m-auto">
        <Card.Body>
            <Card.Img src={`https://image.tmdb.org/t/p/w500`+poster_path} />
            <Card.Title className='my-1'>{title}</Card.Title>
            <div className='d-flex align-items-center justify-content-between'>
            <Card.Text className='my-0'>{release_date}</Card.Text>
            <img style={{width: "30px"}} onClick={handleClick} src={favorite ? starFilled : star}/>
            </div>
        </Card.Body>
    </Card>
  )
}
