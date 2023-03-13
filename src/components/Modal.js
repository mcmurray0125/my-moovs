import React, { useEffect } from 'react'
import { Modal, Button } from "react-bootstrap"
import { useTheme } from '../contexts/ThemeContext';

export default function MovieModal(props) {
  const { theme } = useTheme()

  // useEffect(() => {
  //   const modalTitles = document.querySelectorAll(".modal-title")
  //   const modalBodies = document.querySelectorAll(".modal-body")
  //   if (theme === "dark") {
  //     modalTitles.classList.add("dark-modal")
  //     modalBodies.classList.add("dark-modal")
  //   } else {
  //     modalTitles.classList.remove("dark-modal")
  //     modalBodies.classList.remove("dark-modal")
  //   }
  // },[theme])

  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <div style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movie.backdrop_path})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
    }}
    className="p-2 border border-light">
    <Modal.Header closeButton className='border-0 flex-grow-1'>
      <Modal.Title id="contained-modal-title-vcenter" className='fs-2 p-2 rounded'>
        {props.movie.title}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='rounded d-flex align-items-center mx-5'>
      <p className='m-0 fs-5'>{props.movie.overview}</p>
    </Modal.Body>
    <Modal.Footer className='border-0 flex-grow-1'>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
    </div>
  </Modal>
  )
}
