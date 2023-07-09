import React from 'react'
import { Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function HomeCard(props) {
    const navigate = useNavigate();

      const handleClick = () => {
        navigate(props.item.link);
    };

    
    const blobStyles = {
      backgroundImage: ''
    };
    
    switch (props.item.link) {
      case '/movies/action':
        blobStyles.backgroundImage = 'linear-gradient(to top, rgb(243, 71, 23) 0%, rgb(255 149 205) 51%, rgb(243, 71, 23) 100%)';
        break;
      case '/movies/comedy':
        blobStyles.backgroundImage = 'linear-gradient(to top, rgb(96	91	255	) 0%, rgb(147	229	255) 51%, rgb(96	91	255	) 100%)';
        break;
      case '/movies/drama':
        blobStyles.backgroundImage = 'linear-gradient(to top, rgb(233	96	16) 0%, rgb(255	159	168) 51%, rgb(233	96	16) 100%)';
        break;
      case '/movies/science-fiction':
        blobStyles.backgroundImage = 'linear-gradient(to top, rgb(50	106	255) 0%, rgb(151	238	255) 51%, rgb(50	106	255) 100%)';
        break;
      case '/movies/family':
        blobStyles.backgroundImage = 'linear-gradient(to top, rgb(4	148	0) 0%, rgb(193	207	78) 51%, rgb(4	148	0) 100%)';
        break;
      case '/movies/popular-movies':
        blobStyles.backgroundImage = 'linear-gradient(to top, rgb(0	130	213) 0%, rgb(101	235	209	) 51%, rgb(0	130	213) 100%)';
        break;
      default:
        blobStyles.backgroundImage = 'linear-gradient(to top, #ff6e7f 0%, #bfe9ff 51%, #ff6e7f 100%)';
        break;
    }

          

  return (
    <Col className="my-3 d-flex align-items-center justify-content-center">
        <div id={`${props.item.title}-card`} className="home-btn-card main-btn" style={blobStyles} onClick={handleClick}>
          <div className='home-card-title-wrapper'>
            <h5 className='text-center m-0' >{props.item.title}</h5>
          </div>
        </div>
    </Col>
  )
}
