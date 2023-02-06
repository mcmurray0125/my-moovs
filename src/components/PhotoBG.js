import React from 'react'
import TheaterImg from "../assets/theater.png"

export default function PhotoBG() {
  return (
    <div>
        <img src={TheaterImg} type="img/png"
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "auto",
                height: "100%",
                minWidth: "100%",
                minHeight: "100%",
                transform: "translate(-50%, -50%)",
                zIndex: "-200"
            }}   
        />
    </div>
  )
}
