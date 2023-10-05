import React from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import md5 from "md5";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import server from "../../utils/server";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
// import Navbartest from "../Navbar/Navbartest";


function Register() {
  // const [info, setinfo] = useState({
  //   fullName: "",
  //   phoneNumber: "",
  //   email: "",
  //   password: "",
  // });

  // const handlechange = (e) => {
  //   const { name, value } = e.target;

  //   setinfo((info) => ({
  //     ...info,
  //     [name]: value,
  //   }));
  // };


  // const isEmailValid = (email) => {
  //   // Regular expression for basic email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };


  // const handleregisterclick = () => {


  //   if (!info.fullName || !info.email || !info.password) {
  //     toast.error('Please fill out all fields');
  //     return;
  //   }
  //   if (!isEmailValid(info.email)) {
  //     toast.error('Invalid email address');
  //     return;
  //   }
  //   if (info.phoneNumber.length !== 10) {
  //     toast.error('Phone number must be exactly 10 digits');
  //     return;
  //   }

  //   if (info.password.length < 8) {
  //     toast.error('Password must be more than 8 digits');
  //     return;
  //   }

  //   const encryptedPassword = md5(info.password); 
  //   const encryptedInfo = {
  //     ...info,
  //     password: encryptedPassword, 
  //   };

  //   console.log(encryptedInfo);

  //   //post request

  //   axios.post(`${server}/register`,{encryptedInfo}).then((res)=>{
  //     console.log(res.data.message)
  //   })
    
  // };
  return (
    // <Container>
    // <ToastContainer/>
    //   <h4>Register your account</h4>
    //   <div className="full_name">
    //     <label htmlFor="fullName">Full Name</label>
    //     <input
    //       type="text"
    //       name="fullName"
    //       value={info.fullName}
    //       placeholder="Enter your name"
    //       onChange={(e) => handlechange(e)}
    //     />
    //   </div>
    //   <div className="phone_number">
    //     <label htmlFor="phone">Phone Number</label>
    //     <input
    //       type="text"
    //       name="phoneNumber"
    //       value={info.phonenumber}
    //       placeholder="Enter your phone number"
    //       onChange={(e) => handlechange(e)}
    //     />
    //   </div>
    //   <div className="email">
    //     <label htmlFor="email">Email</label>
    //     <input
    //       type="text"
    //       name="email"
    //       value={info.email}
    //       placeholder="Enter your email"
    //       onChange={(e) => handlechange(e)}
    //     />
    //   </div>
    //   <div className="password">
    //     <label htmlFor="pass">Password</label>
    //     <input
    //       type="password"
    //       name="password"
    //       value={info.password}
    //       placeholder="Enter your password"
    //       onChange={(e) => handlechange(e)}
    //     />
    //   </div>
    //   <button onClick={handleregisterclick}>Register</button>
    //   <span>
    //     {" "}
    //     <Link to="/register-as-retailer">Register</Link> as retailer
    //   </span>
    // </Container>




    <div className="register_form flex justify-center items-center flex-col mt-5">
        <h6 class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Register your
          </span>{" "}
          account.
        </h6>


        <form className="flex flex-col gap-3 border border-solid border-gray-500 rounded-lg p-4 shadow-lg sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Fullname" />
            </div>
            <TextInput
              id="name"
              placeholder="Kamal Gautam"
              required
              shadow
              type="text"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              placeholder="name@flowbite.com"
              required
              shadow
              type="email"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput id="password2" required shadow type="password" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Phone Number" />
            </div>
            <TextInput id="phone" addon="+977" required shadow type="text" />
          </div>

          <div className="max-w-md" id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              helperText="A profile picture is useful to confirm your are logged into your account"
              id="file"
            />
          </div>
          <Button type="submit">Register</Button>
        </form>
      </div>
  
  );
}


export default Register;
