import React, { useRef } from 'react'
import { Button } from "react-bootstrap"
import Theater from "../assets/theater.mp4"


export default function VideoBG({windowWidth}) {

    const videoRef = useRef();
    
    const handlePlay = () => {
        videoRef.current.play()
    }
    
    const handlePause = () => {
        videoRef.current.pause()
    }

    const smallScreenVideoControls = {
        position: "absolute",
        left: "0",
        top: "0",
    }
    const largeScreenVideoControls = {
        position: "absolute",
        left: "0",
        top: "0",
    }


  return (
    <div>
        <video autoPlay loop muted
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "auto",
                height: "auto",
                minWidth: "100%",
                minHeight: "100%",
                transform: "translate(-50%, -50%)",
                zIndex: "-200"
            }}
            ref={videoRef} >
            <source src={Theater} type="video/mp4"/>
        </video>
        <div className='video-controls d-flex gap-1 opacity-50'
                // if Table sized screen, movie video controls up.
                style={windowWidth < 1300 ? smallScreenVideoControls : largeScreenVideoControls}>
            <Button onClick={handlePlay} className="rounded-circle" variant="light"><i className="fa-solid fa-play"></i></Button>
            <Button onClick={handlePause} className="rounded-circle" variant="light"><i className="fa-solid fa-pause"></i></Button>
        </div>
    </div>
  )
}
