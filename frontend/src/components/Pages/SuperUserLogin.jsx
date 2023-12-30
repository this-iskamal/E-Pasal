import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import server from "../../utils/server";
import { saveAuthToken } from "../../utils/JWT";

const SuperUserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const queryClient = useQueryClient();

  const loginMutation = useMutation(
    async () => {
      const response = await axios.post(`${server}/login`, {
        email: email,
        password: password,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Handle successful login
        console.log("Login successful:", data);

       
          if (data.role === "superuser") {
            saveAuthToken();
            saveAuthToken(data.token);
            window.open("/superuser", "_self");
          } else if (data.role !== "superuser") {
            toast({
              title: "You are not a superuser",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
 
        queryClient.invalidateQueries("user"); // Invalidate user-related queries
      },
      onError: (error) => {
        // Handle login error
        console.error("Login error:", error);
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <Box
      className="bg-cover bg-center h-screen flex justify-center items-center"
      style={{ backgroundColor: "#F0ECE5" }}
    >
      <Box className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-md">
        <VStack
          spacing={4}
          align="stretch"
          maxW="md"
          as="form"
          onSubmit={handleSubmit}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            type="submit"
            isLoading={loginMutation.isLoading}
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default SuperUserLogin;
