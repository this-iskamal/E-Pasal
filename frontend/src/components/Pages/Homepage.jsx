import React from "react";
import styled from "styled-components";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
import Navbartest from "../Navbar/Navbartest";
import Footeer from "../Footer/Footeer";
// import Carousell from "../Carousell/Carousell";
import Product from "../Products/Product";


function Homepage() {
  return (
    <Container>
      <Navbartest />

        <Product />


      <Footeer />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #F3EEEA;
  display: flex;
  flex-direction: column;

`;

export default Homepage;
