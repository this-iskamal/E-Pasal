import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Checkbox, Label, TextInput, FileInput } from "flowbite-react";
import Link from "antd/es/typography/Link";
import { Container, Box, useToast } from "@chakra-ui/react";
import server from "../../utils/server";

export default function SellerRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    cpassword: "",
    phoneNumber: "",
    profileImage: null,
    sellerCertificate: null,
    agree: false,
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (formData.fullName === "") {
      showToast("Fullname cannot be empty", "error");
      return;
    }
    if (formData.email === "") {
      showToast("Email cannot be empty", "error");
      return;
    }
    if (formData.password === "" || formData.password.length < 8) {
      showToast("Password must be at least 8 characters long", "error");
      return;
    }
    if (formData.password !== formData.cpassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    if (formData.phoneNumber === "") {
      showToast("Phone Number cannot be empty", "error");
      return;
    }
    if (!formData.profileImage || !formData.sellerCertificate) {
      showToast("Profile Picture and Seller Certificate are required", "error");
      return;
    }

    // File size check
    if (formData.profileImage.size > 1024 * 1024) {
      showToast("Profile Picture size must be less than 1MB", "error");
      return;
    }
    if (formData.sellerCertificate.size > 1024 * 1024) {
      showToast("Seller Certificate size must be less than 1MB", "error");
      return;
    }

    try {
      await axios
        .post(`${server}/seller/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            showToast(res.data.message, "success");
            setTimeout(() => {
              window.open("registration", "_self");
            }, 2500);
          } else if (res.data.message.email) {
            showToast(res.data.message.email[0], "error");
          } else if (res.data.message.phoneNumber) {
            showToast(res.data.message.phoneNumber[0], "error");
          }
        });

      // Add any additional logic based on the response, e.g., redirect to a success page
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      showToast("Error while registering as seller", "error");
    }
  };

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      isClosable: true,
    });
  };

  return (
    <Container className="flex flex-col items-center  h-screen">
      {/* Top Heading */}
      <h1 className="text-4xl font-bold mb-4">Seller Registration Page</h1>

      {/* Logo */}
      <Box>
        <p className="text-lg font-semibold">E-Pasal</p>
      </Box>

      {/* Registration Form */}
      <form className="max-w-md w-full flex flex-col gap-4 ">
        {/* Email */}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="fullname" value="Your Fullname" />
          </div>
          <TextInput
            id="fullname"
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            required
            shadow
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@epasal.com"
            name="email"
            value={formData.email}
            required
            shadow
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            required
            name="password"
            value={formData.password}
            shadow
            onChange={handleChange}
          />
        </div>

        {/* Repeat Password */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat password" />
          </div>
          <TextInput
            id="repeat-password"
            type="password"
            required
            shadow
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
          />
        </div>

        {/* Terms and Conditions */}
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="phonenumber" value="phonenumber" />
          </div>
          <TextInput
            id="phonenumber"
            placeholder="Phone Number"
            addon="+977"
            required
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div id="fileUpload" className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="file1" value="Upload Profile Picture" />
          </div>
          <FileInput
            type="file"
            id="file1"
            helperText=""
            onChange={handleChange}
            name="profileImage"
          />
        </div>
        <div id="fileUpload" className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="file2" value="Upload Seller Certificate" />
          </div>
          <FileInput
            type="file"
            id="file2"
            helperText=""
            onChange={handleChange}
            name="sellerCertificate"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" onChange={handleChange} value={formData.agree} />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link
              href="#"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              terms and conditions
            </Link>
          </Label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mb-3" onClick={handleSubmit}>
          Register new account
        </Button>
      </form>
    </Container>
  );
}
