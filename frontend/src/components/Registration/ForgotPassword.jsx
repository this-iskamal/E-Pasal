import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Button, Label, TextInput } from "flowbite-react";
import server from "../../utils/server";

function ForgotPassword() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Set to true initially
  const [countdown, setCountdown] = useState(0); // Initial countdown value

  useEffect(() => {
    let timer;

    if (isButtonDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            setIsButtonDisabled(false); // Reset to false when countdown reaches zero
            clearInterval(timer); // Stop the timer
          }
          return prevCountdown - 1;
        });
      }, 1000); // Update countdown every second
    }

    return () => {
      clearInterval(timer);
    };
  }, [isButtonDisabled]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    // If the button is disabled, return
    if (isButtonDisabled) {
      return;
    }

    // Perform validation if needed

    // Send a request to the server for password reset
    axios
      .post(`${server}/reset-password/`, { email })
      .then((res) => {
        if (res.data.success===false) {
            toast({
                title: res.data.error,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        toast({
          title: res.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: `Error resetting password: ${error}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });

    // Disable the button for 120 seconds (this will trigger the useEffect to start the countdown)
    setIsButtonDisabled(true);

    // Reset the countdown to 120 seconds
    setCountdown(120);
  };

  return (
    <div className="register_form w-full flex justify-center items-center flex-col mt-5">
      <h6 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Forgot Your Password?
        </span>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          onClick={handleResetPassword}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled
            ? `Wait ${countdown} seconds`
            : "Send OTP"}
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
