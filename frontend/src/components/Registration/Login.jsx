import React, { useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import md5 from "md5";
import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import server from "../../utils/server";
import { saveRefreshToken } from "../../utils/JWT";
import { useToast } from "@chakra-ui/react";
import { Button, Label, TextInput } from "flowbite-react";
// import Navbartest from "../Navbar/Navbartest";

function Login() {
  const toast = useToast();
  const [info, setinfo] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;

    setinfo((info) => ({
      ...info,
      [name]: value,
    }));
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleregisterclick = (e) => {
    e.preventDefault();
    if (!info.email || !info.password) {
      toast({
        title: `Please fill out all fields`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (!isEmailValid(info.email)) {
      toast({
        title: `Please enter valid email`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (info.password.length < 8) {
      toast({
        title: `Password must be greater than 8`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("email", info.email);
    formData.append("password", info.password);

    axios
      .post(`${server}/login`, formData)
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success === true) {
          saveAuthToken(res.data.access);
          saveRefreshToken(res.data.refresh)
          toast({
            title: res.data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setTimeout(() => {
            if (res.data.role === "regular") {
              window.open("/", "_self");
            } else if (res.data.role === "seller") {
              window.open("/seller/dashboard", "_self");
            }
          }, 3000);
          
        }
        if (res.data.success === false) {
          toast({
            title: res.data.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: `Error Logging In : ${error}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };



  const saveAuthToken = (token) => {
    localStorage.setItem("access_token", token);
    
  };
  return (
    <div className="register_form w-full flex justify-center items-center flex-col mt-5">
      <h6 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Login to your
        </span>{" "}
        account.
      </h6>

      <form className="flex flex-col gap-4 p-4 w-full max-w-md border border-solid border-gray-500 rounded-lg shadow-lg sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your Email" />
          </div>
          <TextInput
            id="email"
            placeholder="Enter your email address"
            required
            shadow
            name="email"
            value={info.email}
            onChange={handlechange}
            type="email"
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your Password" />
          </div>
          <TextInput
            id="password"
            placeholder=""
            required
            shadow
            name="password"
            value={info.password}
            onChange={handlechange}
            type="password"
          />
        </div>

        <Button type="submit" className="w-full " onClick={handleregisterclick}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
