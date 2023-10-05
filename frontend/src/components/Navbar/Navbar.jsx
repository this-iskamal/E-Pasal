import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/E logo 1.png";

function Navbar() {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };
  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="links">
        <li>Home</li>
        <li>Products</li>
        <li>Sell</li>
        <li>Support</li>
      </div>
      <div className="cart_search">
      <div className="input_search">
      <input type="text" placeholder="Search items"/>

      </div>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_119_24)">
            <path
              d="M29.5898 25.9395L23.748 20.0977C23.4844 19.834 23.127 19.6875 22.752 19.6875H21.7969C23.4141 17.6191 24.375 15.0176 24.375 12.1875C24.375 5.45508 18.9199 0 12.1875 0C5.45508 0 0 5.45508 0 12.1875C0 18.9199 5.45508 24.375 12.1875 24.375C15.0176 24.375 17.6191 23.4141 19.6875 21.7969V22.752C19.6875 23.127 19.834 23.4844 20.0977 23.748L25.9395 29.5898C26.4902 30.1406 27.3809 30.1406 27.9258 29.5898L29.584 27.9316C30.1348 27.3809 30.1348 26.4902 29.5898 25.9395ZM12.1875 19.6875C8.04492 19.6875 4.6875 16.3359 4.6875 12.1875C4.6875 8.04492 8.03906 4.6875 12.1875 4.6875C16.3301 4.6875 19.6875 8.03906 19.6875 12.1875C19.6875 16.3301 16.3359 19.6875 12.1875 19.6875Z"
              fill="#57585A"
            />
          </g>
          <defs>
            <clipPath id="clip0_119_24">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <svg
          width="35"
          height="38"
          viewBox="0 0 35 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.6686 23.6214H12.8559L13.2536 25.9835H29.5638C30.4996 25.9835 31.1932 27.0392 30.9858 28.1478L30.6506 29.9397C31.7863 30.6095 32.5695 32.0238 32.5695 33.6605C32.5695 35.9637 31.0188 37.827 29.1166 37.7938C27.3044 37.7621 25.8141 35.9756 25.7652 33.7747C25.7384 32.5724 26.1349 31.4827 26.7862 30.7077H14.0472C14.6777 31.4581 15.0694 32.5035 15.0694 33.6605C15.0694 36.0088 13.4575 37.8998 11.5044 37.7896C9.77023 37.6918 8.35984 35.9896 8.26869 33.8835C8.19833 32.257 8.90282 30.8234 9.97318 30.0756L5.7047 4.72428H1.45833C0.652908 4.72428 0 3.93111 0 2.95267V1.7716C0 0.793162 0.652908 0 1.45833 0H7.6884C8.38117 0 8.97829 0.592085 9.11714 1.41654L9.6741 4.72428H33.5411C34.4769 4.72428 35.1705 5.77993 34.9631 6.88851L32.0906 22.2424C31.9398 23.049 31.3495 23.6214 30.6686 23.6214ZM24.4896 14.1728H21.875V9.74382C21.875 9.25464 21.5485 8.85802 21.1458 8.85802H19.6875C19.2848 8.85802 18.9583 9.25464 18.9583 9.74382V14.1728H16.3437C15.6941 14.1728 15.3688 15.127 15.8281 15.685L19.9011 20.6328C20.1858 20.9787 20.6475 20.9787 20.9323 20.6328L25.0053 15.685C25.4646 15.127 25.1392 14.1728 24.4896 14.1728Z"
            fill="#0082FB"
          />
        </svg>
        <div className="threelines" onClick={toggleNavLinks}>
          <i className={`fas ${showNavLinks ? "fa-times" : "fa-bars"}`}></i>
        </div>
      </div>

      <div className={`nav_links ${showNavLinks ? "active" : ""}`}>
        <li>Account</li>
        <li>Home</li>
        <li>Products</li>
        <li>Sell</li>
        <li>Support</li>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 60px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 20px;
  font-family: sans-serif;
  font-size: 20px;
  color: #000;

  li {
    list-style-type: none;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 46px;
      height: 53px;
      flex-shrink: 0;
    }
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 6rem;
    align-items: center;

    li {
      position: relative;
      cursor: pointer;
    }

    li::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      border-radius: 4px;
      background-color: #0082fb;
      bottom: 0;
      left: 0;
      transform-origin: right;
      transform: scaleX(0);
      transition: transform 0.3s ease-in-out;
    }

    li:hover::before {
      transform-origin: left;
      transform: scaleX(1);
    }
  }

  .cart_search {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;

    input{
      width: 350px;
      padding: 2px 8px;
      border-radius: 10px;
      height: 40px;
      font-size: 18px;
      border:1px solid black;
    }

    svg {
      cursor: pointer;
    }
  }

  .threelines {
    display: none;
    cursor: pointer;
  }

  .nav_links {
    position: absolute;
    display: flex;
    flex-direction: column;
    right: -100%; 
    top: 45px;
    height: 100%;
    width: 30%;
    transition: right 0.3s ease-in-out;
    z-index: 1;

    li {
      padding: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      background-color: white;
      border-bottom: 1px solid #ccc;
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }

  .nav_links.active {
    right: 0;
  }

  @media (max-width: 768px) {
    height: 50px;

    .input_search{
      input{
        display: none;
      }
    }
    .logo {
      img {
        width: 36px;
        height: 43px;
        flex-shrink: 0;
      }
    }
    .links {
      display: none;
    }

    svg {
      width: 25px;
    }

    .threelines {
      display: block;
    }
  }
`;

export default Navbar;
