import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, } from "react-bootstrap"
import Slider from "react-slick";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import largeLogo from "../assets/large-logo.png"
import largeLogoBlack from "../assets/large-logo-black.png"
import homeCards from "./home-cards"
import HomeCard from './HomeCard'
import MovieCard from './MovieCard'
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
    const [featuredMovies, setFeaturedMovies] = useState([])
    const [backgroundImage, setBackgroundImage] = useState('');
    const { theme } = useTheme()

    const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&page=1`)
    .then(response=>{
        setFeaturedMovies(response.data.results.slice(0,15))
    }).catch(err=>{console.log(err)})
  },[])

  //Now Playing API: https://api.themoviedb.org/3/movie/now_playing?api_key=51dc6d0882dbc06cc1467363108a4d8b&language=en-US&page=1

  const handleClick = () => {
    navigate("/search-movies");
};

  const cardElements = homeCards.map((item) => {
    return (
    <HomeCard
        key={item.id}
        item={item}/>
    )
  })

  const settings = {
    className: "center",
    centerMode: true,
    swipeToSlide: true,
    infinite: true,
    centerPadding: "60px",
    speed: 400,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 1,
    afterChange: handleSlideChange,
    responsive: [
      {
        breakpoint: 2350,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerPadding: "120px",
        }
      },
      {
        breakpoint: 2200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerPadding: "100px",
        }
      },
      {
        breakpoint: 1840,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerPadding: "0px",
        }
      },
      {
        breakpoint: 1560,
        settings: {
          centerPadding: "230px",
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1420,
        settings: {
          centerPadding: "100px",
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1250,
        settings: {
          centerPadding: "70px",
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1100,
        settings: {
          centerPadding: "0px",
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 940,
        settings: {
          centerPadding: "280px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 882,
        settings: {
          centerPadding: "220px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 780,
        settings: {
          centerPadding: "200px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 715,
        settings: {
          centerPadding: "170px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 655,
        settings: {
          centerPadding: "140px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: "120px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 553,
        settings: {
          centerPadding: "90px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 494,
        settings: {
          centerPadding: "60px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 435,
        settings: {
          centerPadding: "50px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 411,
        settings: {
          centerPadding: "40px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 391,
        settings: {
          centerPadding: "34px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 378,
        settings: {
          centerPadding: "0px",
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };

  useEffect(() => {
    handleSlideChange()
    console.log("photo found")
  },[featuredMovies])

  function handleSlideChange(currentIndex, nextIndex) {
    const currentSlide = document.querySelector('.slick-current');
    if (currentSlide) {
      const slideBg = currentSlide.querySelectorAll('*')[1].getAttribute('data-bg');
      setBackgroundImage(slideBg);
    }
  }

  return (
    <>
        <section className='carousel ms-auto me-auto w-100 py-5' style={{position: 'relative'}}>
            <Slider {...settings} style={{zIndex: "500"}}>
            {featuredMovies.map((movie, index) => {
                return (
                    <MovieCard {...movie} movie={movie} key={index}/>
                    )
                    })}
            </Slider>
            {/* Backdrop Image */}
            <div className="backdrop-img" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${backgroundImage})`,}}></div>
        </section>
        <Container fluid="md" className='d-flex flex-column justify-content-center' id='home-container' style={{minHeight: "90vh"}}>
            <Row gap={2} xs={1} sm={2} className="d-flex align-items-center">
                <Col className='d-flex justify-content-center align-items-center my-3'>
                    <Card className="bg-transparent home-card p-0 boder p-3">
                        <Card.Img src={theme === "light" ? largeLogoBlack : largeLogo} />
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center my-3'>
                    <Card className="home-card p-3 bg-transparent border-none" >
                        <Card.Body className='text-center'>
                            <Card.Title className='fs-3 text-light'>
                                Welcome!
                            </Card.Title>
                            <Card.Text className='fs-5 text-light'>
                            MyMoovs is a website where you can save favorite movies and share comments. It's a personal movie journal to document movie likes and dislikes.
                            </Card.Text>
                            <Button href='/signup' className="me-4" variant="info">Sign Up</Button>
                            <Button href='/login' variant="info">Login</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="my-3 d-flex align-items-center justify-content-center">
                    <Card id="search-btn-card" tabIndex={1} role="button" aria-label='go to search' className="home-btn-card bg-transparent w-100 h-auto" onClick={handleClick}>
                        <Card.Body className='d-flex flex-column justify-content-center'>
                            <Card.Title className='text-light text-center m-0 p-2'>Go To Search</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>     
            </Row> 
            <Row><p style={{zIndex: "400"}} className="text-light fs-2 m-0 text-center my-3">Browse by Genre</p></Row>
            <Container className='home-cards-wrapper'>
                <Row xs={2} sm={3} lg={6}>
                    {cardElements}
                </Row>   
            </Container>
        </Container>
    </>
  )
}
