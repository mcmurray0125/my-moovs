import React from 'react'
import Navigation from '../components/Navigation'
import { Outlet } from 'react-router-dom'
import gradient from "../assets/blur-2.png"

export default function GradientLayout() {

  const gradientHueStyles = {
    backdropFilter: '',
    WebkitBackdropFilter: ''
  };

  switch (window.location.pathname) {
    case '/movies/action':
      gradientHueStyles.backdropFilter = 'hue-rotate(140deg)';
      gradientHueStyles.WebkitBackdropFilter = 'hue-rotate(140deg)';
      break;
    case '/movies/comedy':
      gradientHueStyles.backdropFilter = 'hue-rotate(120deg)';
      gradientHueStyles.WebkitBackdropFilter = 'hue-rotate(120deg)';
      break;
    case '/movies/drama':
      gradientHueStyles.backdropFilter = 'hue-rotate(160deg)';
      gradientHueStyles.WebkitBackdropFilter = 'hue-rotate(160deg)';
      break;
    case '/movies/science-fiction':
      gradientHueStyles.backdropFilter = 'hue-rotate(0deg)';
      gradientHueStyles.WebkitBackdropFilter = 'hue-rotate(0deg)';
      break;
    case '/movies/family':
      gradientHueStyles.backdropFilter = 'hue-rotate(240deg)';
      gradientHueStyles.WebkitBackdropFilter = 'hue-rotate(240deg)';
      break;
    case '/movies/popular-movies':
      gradientHueStyles.backdropFilter = 'hue-rotate(110deg)';
      gradientHueStyles.WebkitBackdropFilter = 'hue-rotate(110deg)';
      break;
    default:
      gradientHueStyles.backdropFilter = 'hue-rotate(0deg)';
      gradientHueStyles.WebkitBackdropFilter = 'hue-rotate(0deg)';
      break;
  }

  return (
    <>
    <Navigation />
    <div className='page-wrapper'>
        <div className='gradient-left'>
          <img src={gradient} alt='gradient-img'/>
        </div>
        <div className='gradient-right'>
          <img src={gradient} alt='gradient-img'/>
        </div>
        <div className='gradient-backdrop-filter' style={gradientHueStyles}></div>
        <Outlet />
    </div>
    </>
  )
}
