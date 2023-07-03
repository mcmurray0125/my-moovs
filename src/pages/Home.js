import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap"
import Slider from "react-slick";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import largeLogo from "../assets/large-logo.png"
import largeLogoBlack from "../assets/large-logo-black.png"
import homeCardsData from "../components/home-cards"
import HomeCard from '../components/HomeCard'
import MovieCard from '../components/MovieCard'
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [backgroundImage, setBackgroundImage] = useState('');
    const [featuredSelect, setFeaturedSelect] = useState('popular')
    const { theme } = useTheme()
    const { currentUser } = useAuth()

    const navigate = useNavigate()

    function handleSlideChange() {
      const currentSlide = document.querySelector('.slick-current');
      if (currentSlide && popularMovies && nowPlayingMovies) {
        const slideBg = currentSlide.querySelectorAll('*')[1].getAttribute('data-bg');
        setBackgroundImage(slideBg);
      }
    }

    //Fetch movies for the carousel.
    useEffect(() => {
      const fetchData = async () => {
        try {
          const popularResponse = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`);
          setPopularMovies(popularResponse.data.results.slice(0, 15));
  
          const nowPlayingResponse = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`);
          setNowPlayingMovies(nowPlayingResponse.data.results.slice(0, 15));
          
          setLoading(false)
          handleSlideChange();
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    });

  const cardElements = homeCardsData.map((item) => {
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
    initialSlide: 0,
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


  function handleFeaturedToggle(selection) {
    const popularButton = document.querySelector("#popular-button");
    const nowPlayingButton = document.querySelector("#now-playing-button");
    if (selection === "popular") {
      popularButton.classList.add("selected");
      nowPlayingButton.classList.remove("selected");
      setFeaturedSelect('popular')
    }
    if (selection === "now-playing") {
      popularButton.classList.remove("selected");
      nowPlayingButton.classList.add("selected");
      setFeaturedSelect('now-playing')
    }
      handleSlideChange();
  }

  return (
    <>
      <div className='slider-texture'>
        <section className='carousel ms-auto me-auto w-100 py-4' style={{position: 'relative'}}>
            <Container className='position-relative featured-header d-flex justify-content-between align-items-center px-5' style={{zIndex: "500"}}>
              <h2 style={{fontWeight: "700"}}>Featured Moovs</h2>
              <ButtonGroup aria-label="Select Feautured Movies" className='gap-2'>
                <Button id="popular-button" className='featured-button selected' onClick={() => handleFeaturedToggle("popular")} aria-label='view popular movies'>Popular</Button>
                <Button id="now-playing-button" className='featured-button' onClick={() => handleFeaturedToggle("now-playing")} aria-label='view now playing movies'>Now Playing</Button>
              </ButtonGroup>
            </Container>
            <hr style={{backgroundColor: "white", height: "1.4px", opacity: "1"}}/>
            {/* SLIDER */}
            {!loading &&
              <Slider {...settings} style={{zIndex: "500"}}>
                {featuredSelect === "popular" ?
                  popularMovies.map((movie, index) => {
                    return (
                      <MovieCard {...movie} movie={movie} key={index}/>
                    )
                  })
                  : 
                  nowPlayingMovies.map((movie, index) => {
                    return (
                      <MovieCard {...movie} movie={movie} key={index}/>
                    )
                  })}
               </Slider>
            }
            {/* Backdrop Image */}
            <div className="backdrop-img" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${backgroundImage})`,}}></div>
        </section>
      </div>
      <div className='bg-texture'>
          <Container fluid="md" className='py-4 d-flex flex-column justify-content-center' id='home-container'>
              <Row gap={2} xs={1} sm={2} className="d-flex align-items-center">
                  <Col className='d-flex justify-content-center align-items-center my-3'>
                      <Card className="bg-transparent home-card p-0 boder p-3">
                          <Card.Img src={theme === "light" ? largeLogoBlack : largeLogo} />
                      </Card>
                  </Col>
                  <Col className='d-flex justify-content-center my-3'>
                      {currentUser ?
                      <Card className="home-card p-3 bg-transparent border-none" >
                        <Card.Body className='text-center'>
                            <Card.Title className='fs-3 text-light'>
                                Hello, <span className='text-decoration-underline'>{currentUser.email ? currentUser.email : 'Demo User'}</span>
                            </Card.Title>
                            <Card.Text className='fs-5 text-light'>
                              Continue browsing movies by genre, or <a href='/movies/search-movies' aria-label='go to search'>search</a> instead. View your saved moovs by clicking below.
                            </Card.Text>
                            <Button href='/saved-movies' aria-label='go to saved movies' className="me-4" variant="info">Saved Moovs</Button>
                        </Card.Body>
                      </Card>
                      :
                      <Card className="home-card p-3 bg-transparent border-none" >
                        <Card.Body className='text-center'>
                            <Card.Title className='fs-3 text-light'>
                                Welcome!
                            </Card.Title>
                            <Card.Text className='fs-5 text-light'>
                              MyMoovs is a website where you can save favorite movies and share comments. It's a personal movie journal to document movie likes and dislikes.
                            </Card.Text>
                            <Button href='/signup' aria-label='sign up link' className="me-4 login-btn">Sign Up</Button>
                            <Button href='/login' aria-label='login link' className='login-btn'>Login</Button>
                        </Card.Body>
                      </Card> 
                      }
                  </Col>
              </Row>
              <Row>
                  <Col className="my-3 d-flex align-items-center justify-content-center">
                      <Card
                        id="search-btn-card"
                        tabIndex={1}
                        role="button"
                        aria-label='go to search'
                        className="home-btn-card bg-transparent w-100 h-auto"
                        onClick={() => navigate("/movies/search-movies")}
                      >
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
      </div>
    </>
  )
}
