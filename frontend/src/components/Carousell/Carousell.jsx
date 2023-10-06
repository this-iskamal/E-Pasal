

import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Carousell() {
  return (
    <Carousel centerMode='true' infiniteLoop='true' autoFocus='true' autoPlay='true' showArrows='false' interval={6000}>
      <div>
      <img
        src="https://icms-image.slatic.net/images/ims-web/b74f2188-1139-4e0f-a891-f2e0db2dd564.jpg"
        alt="..."
      
      />
      </div>
      <div>
      <img
        src="https://icms-image.slatic.net/images/ims-web/dfc068c4-77e9-44c3-b633-6579f2c372a2.jpg"
        alt="..."
       
      />
      </div>
      <div>
      <img
        src="https://icms-image.slatic.net/images/ims-web/af05a907-c291-4624-bf3b-05a52a8a4a61.jpg"
        alt="..."
       
      />
      </div>
      <div>
      <img
        src="https://icms-image.slatic.net/images/ims-web/186bc24e-57ac-4987-9a1d-3cb291bc7d39.jpg"
        alt="..."
        
      />
      </div>
    </Carousel>
  );
}

export default Carousell;
