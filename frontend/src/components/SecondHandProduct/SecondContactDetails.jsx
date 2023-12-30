// ContactDetails.js
import React, { useState } from "react";
import {
  Text,
  Box,
  Textarea,
  Button,
  Spacer,
  Image,
  Center,
} from "@chakra-ui/react";
import server from "../../utils/server";
import axios from "axios";
import {useAuth} from "../../utils/JWT"


const ContactDetails = ({ seller,product }) => {
  const [message, setMessage] = useState("");
  const currentUser = useAuth();

  const handleSendMessage = async () => {
    console.log(product)
    try {
      // Create a string that includes the original message and product details
      const fullMessage = `Message: ${message}       Product Details:      Name: ${product.productName}      Price: ${product.originalPrice}`;
  
      const response = await axios.post(
        `${server}/${seller.email}/send/`,
        {
          content: fullMessage,
        },
      );
  
      console.log("Message sent successfully:", response.data);
  
      // Reset the message input after sending
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };  

  return (
    <Box
      p="4"
      height="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      bg="gray.200"
      mb="4"
    >
      <Text fontWeight="bold" fontSize="lg" mb="4">
        Contact Seller
      </Text>
      {seller.profileImage && (
        <Center m="4">
          <Image
            src={`${server}${seller.profileImage}`}
            alt={`${seller.fullName}'s Profile`}
            borderRadius="10px"
            boxSize="100px"
            shadow="sm"
          />
        </Center>
      )}
      <Text>
        <strong>Name:</strong> {seller.fullName}
      </Text>
      <Text>
        <strong>Email:</strong> {seller.email}
      </Text>
      <Text>
        <strong>Phone:</strong> {seller.phoneNumber}
      </Text>

      {/* Space Between Message and Details */}
      <Spacer />

      {/* Message Field */}
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
        size="md"
        bg="white"
        mt="2"
      />
      <Button colorScheme="teal" size="sm" mt="2" onClick={handleSendMessage}>
        Send Message
      </Button>
    </Box>
  );
};

export default ContactDetails;
