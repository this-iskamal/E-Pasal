import React from "react";
import styled from "styled-components";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
import Navbartest from "../Navbar/Navbartest";
import Footeer from "../Footer/Footeer";
import Carousell from "../Carousell/Carousell";
import Product from "../Products/Product";



function Homepage() {



  return (
    <Container>
      <Navbartest />
      <div className="content" >

      <Carousell/>
      <Product/>
      </div>

      <Footeer />
    </Container>

  );
}








const Container = styled.div`
  min-height: 100vh;
  background-color: #e8f9fd;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    padding: 20px;
  }

  .footer {
  }

  @media (max-width: 768px) {
    .navbar {
      margin: 5px 15px;
    }
  }
`;

export default Homepage;
