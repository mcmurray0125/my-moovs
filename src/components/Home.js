import React from 'react'
import Navigation from './Navigation'
import Hero from "./Hero"
import Container from 'react-bootstrap/Container';


export default function Home() {
  return (
    <div>
        <Navigation/>
        <Container className='vh-100 h-100 d-flex align-items-center justify-content-center'>
          <Hero/>
        </Container>
    </div>
  )
}
