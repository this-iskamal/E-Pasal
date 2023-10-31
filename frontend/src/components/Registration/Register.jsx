import React, { useState } from "react";
// import md5 from "md5";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import server from "../../utils/server";
import { Button, Label, TextInput, FileInput } from "flowbite-react";

function Register() {
  const toast = useToast();
  const [errors, setErrors] = useState([]);
  const [info, setinfo] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const handlechange = (e) => {
    console.log("gggg");
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
    if (
      !info.fullName ||
      !info.email ||
      !info.password ||
      !info.phoneNumber ||
      !info.profileImage
    ) {
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
    if (info.phoneNumber.length !== 10) {
      toast({
        title: `PhoneNumber must be 10`,
        status: "error",
        isClosable: true,
        duration: 9000,
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
    formData.append("fullName", info.fullName);
    formData.append("phoneNumber", info.phoneNumber);
    formData.append("email", info.email);
    formData.append("password", info.password);
    formData.append("profileImage", info.profileImage);

    axios
      .post(`${server}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          toast({
            title: res.data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setTimeout(() => {
            window.open('/','_self')
          }, 3000);
          
        }
        if (res.data.success === false) {
          setErrors((res.data.message));
          if(errors.phoneNumber){toast({
            title: `${errors.phoneNumber[0]}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });}
          if(errors.fullName){toast({
            title: ` ${errors.fullName[0]}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });}
          if(errors.email){toast({
            title: ` ${errors.email[0]}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });}
          if(errors.profileImage){toast({
            title: ` ${errors.profileImage[0]}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          });}
          
        }
      })
      .catch((error) => {
        toast({
          title: `Error Registering : ${error}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleFileChange = (e) => {
    setinfo((info) => ({
      ...info,
      profileImage: e.target.files[0],
    }));
  };

  return (
    <div className="register_form flex justify-center items-center flex-col mt-5 h-full">
      <h6 class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Register your
        </span>{" "}
        account.
      </h6>

      <form className="flex flex-col gap-4 border border-solid border-gray-500 rounded-lg p-4 shadow-lg sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your Fullname" />
          </div>
          <TextInput
            id="name"
            placeholder="Enter your fullname"
            required
            shadow
            name="fullName"
            value={info.fullName}
            type="text"
            onChange={(e) => handlechange(e)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput
            id="email2"
            placeholder="name@gmail.com"
            required
            shadow
            value={info.email}
            name="email"
            type="email"
            onChange={(e) => handlechange(e)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your password" />
          </div>

          <TextInput
            id="password2"
            required
            shadow
            value={info.password}
            name="password"
            onChange={(e) => handlechange(e)}
            type="password"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Phone Number" />
          </div>
          <TextInput
            id="phone"
            addon="+977"
            required
            value={info.phoneNumber}
            name="phoneNumber"
            onChange={(e) => handlechange(e)}
            shadow
            type="number"
          />
        </div>

        <div className="max-w-md" id="fileUpload">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file" />
          </div>
          <FileInput
            helperText="A profile picture is useful to confirm your are logged into your account"
            type="file"
            id="file"
            name="profileImage"
            onChange={handleFileChange}
          />
        </div>
        <Button onClick={handleregisterclick} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
