import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Center, useToast } from "@chakra-ui/react";
import { FaTimesCircle } from "react-icons/fa";
import { Button, Label, TextInput } from "flowbite-react";
import server from "../../utils/server";

function PasswordReset() {
  const toast = useToast();
  const { token } = useParams();
 
  const [isValidToken, setIsValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Check the validity of the token when the component mounts
    axios
      .get(`${server}/validate-reset-token/${token}`)
      .then((res) => {
        setIsValidToken(res.data.isValid);
      })
      .catch((error) => {
        console.error(`Error validating token: ${error}`);
        setIsValidToken(false);
      });
  }, [token]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Perform password validation if needed
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // Send a request to the server to update the password
    axios
      .post(`${server}/reset-password/${token}/`, {
        password,
        confirmPassword,
      })
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // Redirect to login or home page after successful password reset
        window.open("/login","_self"); // You can customize the redirect path
      })
      .catch((error) => {
        toast({
          title: `Error updating password: ${error}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  if (!isValidToken) {
    return (
      <div
        className="invalid_token_message"
        style={{
          color: "red",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
          <FaTimesCircle style={{ marginRight: "10px" ,textAlign:"center"}} /> Invalid or expired
          password reset link.
        </h2>
      </div>
    );
  
  }
  

  return (
    <div className="reset_password_form w-full flex justify-center items-center flex-col mt-5">
      <h6 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Reset Your Password
        </span>
      </h6>

      <form className="flex flex-col gap-4 p-4 w-full max-w-md border border-solid border-gray-500 rounded-lg shadow-lg sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:w-96">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="New Password" />
          </div>
          <TextInput
            id="password"
            placeholder="Enter your new password"
            required
            shadow
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPassword" value="Confirm Password" />
          </div>
          <TextInput
            id="confirmPassword"
            placeholder="Confirm your new password"
            required
            shadow
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          onClick={handleResetPassword}
        >
          Update Password
        </Button>
      </form>
    </div>
  );
}

export default PasswordReset;
