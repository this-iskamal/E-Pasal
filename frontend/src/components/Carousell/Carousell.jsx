import React from 'react'
import { Carousel } from "antd";

function Carousell() {
  const contentStyle = {
    height: "400px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",

  };
  return (
    <Carousel autoplay >
    <div>
      <img className="w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1018/1*iAu65xDmvpVdBJgps6EDEw.png" alt="..." style={contentStyle}/>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
  )
}

export default Carousell