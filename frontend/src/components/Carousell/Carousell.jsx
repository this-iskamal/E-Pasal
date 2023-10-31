

import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import carousel1 from "../../assets/images/carousel1.jpg"
import carousel2 from "../../assets/images/carousel2.jpg"

import carousel3 from "../../assets/images/carousel3.jpg"

import carousel4 from "../../assets/images/carousel4.jpg"


function Carousell() {
  return (
    <Carousel centerMode='true' infiniteLoop='true' autoFocus='true' autoPlay='true' showArrows='false' interval={6000}>
      <div>
      <img
        src={carousel1}
        alt="..."
      
      />
      </div>
      <div>
      <img
        src={carousel2}
        alt="..."
       
      />
      </div>
      <div>
      <img
        src={carousel3}
        alt="..."
       
      />
      </div>
      <div>
      <img
        src={carousel4}
        alt="..."
        
      />
      </div>
    </Carousel>
  );
}

export default Carousell;
