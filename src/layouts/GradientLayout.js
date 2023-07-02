import React from 'react'

export default function GradientLayout() {
  return (
    <div className='page-wrapper'>
        <img className='gradient-left' src={gradient} alt='gradient-img'/>
        <img className='gradient-right' src={gradient} alt='gradient-img'/>
        <div className='gradient-backdrop-filter'></div>
        {/* Outlet */}
    </div>
  )
}
