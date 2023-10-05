import React from "react";
import styled from "styled-components";
import logo_footer from "../../assets/images/logo_footer.png";

function Footer() {
  return (
    <Container>
      <div className="logo">
        <img src={logo_footer} alt="" />
        <p>
          Shop securely, explore effortlessly, and experience the future of
          shopping, today.
        </p>
      </div>
      <div className="features"></div>
      <div className="contact"></div>
    </Container>
  );
}

const Container = styled.div`
  height: 300px;
  width: 100%;
  background-color: #1a132f;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .logo {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 20px;
    padding-top: 0;

    img {
      width: 300px;
      height: 200px;

    }

    p {
      width: 313px;
      text-align: left;
      padding-left: 50px;
    }
  }

  .features {
  }

  .contact {
  }
`;

export default Footer;
