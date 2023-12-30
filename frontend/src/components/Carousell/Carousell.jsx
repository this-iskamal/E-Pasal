

import React from "react";

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// import carousel1 from "../../assets/images/carousel1.jpg"
// import carousel2 from "../../assets/images/carousel2.jpg"

// import carousel3 from "../../assets/images/carousel3.jpg"

// import carousel4 from "../../assets/images/carousel4.jpg"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


function Carousell() {
  return (
    <>


   {/* Product Search Section */}
   <Container className="my-5">
     <Row className="justify-content-center">
       <Col md={6}>
         <Form>
           <Form.Group className="mb-3">
             <Form.Label>Search for Products</Form.Label>
             <Form.Control type="text" placeholder="Enter keywords" />
           </Form.Group>
           <Button variant="primary" type="submit">
             Search
           </Button>
         </Form>
       </Col>
     </Row>
   </Container>
   </>
  );
}

export default Carousell;
