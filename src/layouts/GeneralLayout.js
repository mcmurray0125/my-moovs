import React, { useEffect } from 'react'
import Navigation from '../components/Navigation'
import { Outlet, useLocation } from 'react-router-dom'

export default function GeneralLayout() {
  const location = useLocation();
    
  //Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
        <Navigation />
        <Outlet />
    </>
  )
}
