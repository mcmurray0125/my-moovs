import React from 'react'
import { Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import blob from "../assets/gradient-blob.png"

export default function HomeCard(props) {
    const navigate = useNavigate();

      const handleClick = () => {
        navigate(props.item.link);
    };

    const randomRotation = Math.floor(Math.random() * 360);
    
    const blobStyles = {
      backdropFilter: '',
      WebkitBackdropFilter: '',
      transform: `rotate(${randomRotation}deg)`,
    };
  
  
    switch (props.item.link) {
      case '/movies/action':
        blobStyles.filter = 'hue-rotate(140deg)';
        blobStyles.WebkitFilter = 'hue-rotate(140deg)';
        break;
      case '/movies/comedy':
        blobStyles.filter = 'hue-rotate(16deg)';
        blobStyles.WebkitFilter = 'hue-rotate(16deg)';
        break;
      case '/movies/drama':
        blobStyles.filter = 'hue-rotate(160deg)';
        blobStyles.WebkitFilter = 'hue-rotate(160deg)';
        break;
      case '/movies/science-fiction':
        blobStyles.filter = 'hue-rotate(0deg)';
        blobStyles.WebkitFilter = 'hue-rotate(0deg)';
        break;
      case '/movies/family':
        blobStyles.filter = 'hue-rotate(240deg)';
        blobStyles.WebkitFilter = 'hue-rotate(240deg)';
        break;
      case '/movies/popular-movies':
        blobStyles.filter = 'hue-rotate(333deg)';
        blobStyles.WebkitFilter = 'hue-rotate(333deg)';
        break;
      default:
        blobStyles.filter = 'hue-rotate(0deg)';
        blobStyles.WebkitFilter = 'hue-rotate(0deg)';
        break;
    }


  return (
    <Col className="my-3 d-flex align-items-center justify-content-center">
        <div id={`${props.item.title}-card`} className="home-btn-card" onClick={handleClick}>
          <h5 className='text-center m-0 p-2'>{props.item.title}</h5>
          <img
            src={blob}
            alt='home-card-blob-image'
            className='blob'
            style={blobStyles}
          />
        </div>
    </Col>
  )
}
