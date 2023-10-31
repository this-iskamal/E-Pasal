import React, { useState } from "react";
import styled from "styled-components";
import Navbartest from "../Navbar/Navbartest";
import Register from "./Register";
import Login from "./Login";

const Registration = () => {
  const [isSignup, setIsSignup] = useState(true);

  const handleLoginClick = () => {
    setIsSignup(false);
  };

  const handleRegisterClick = () => {
    setIsSignup(true);
  };

  return (
    <Container>
      <Navbartest />
      <div className="flex flex-col items-center mt-5">
        <div className="mb-1">
          <button
            onClick={handleRegisterClick}
            className={`mr-4 ${isSignup ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
          >
            Register
          </button>
          <button
            onClick={handleLoginClick}
            className={`mr-4 ${isSignup ? 'text-gray-500' : 'text-blue-500 font-bold'}`}
          >
            Login
          </button>
        </div>
        {isSignup ? <Register /> : <Login />}
      </div>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  max-height: fit-content;
  background-color: #c9d6df;
  padding: 20px;
`;

export default Registration;
