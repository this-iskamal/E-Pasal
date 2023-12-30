// SingleSecondProduct.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Image,
  Text,
  Flex,
  Spacer,
  Center,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import server from "../../utils/server";
import Navbar from "./Navbar";
import ContactDetails from "./SecondContactDetails"; // Import the ContactDetails component
import { useAuth } from "../../utils/JWT";

function SingleSecondProduct() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const isperson = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${server}/second-products/${id}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <div className="minH-screen" style={{ backgroundColor: "#F3F8FF" }}>
      <Navbar profile={isperson} />
      <Container maxW="container.lg" my="4">
        <Flex>
          {/* Product Details */}
          <Box
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            flex="7"
            bg="gray.100"
          >
            <Center>
              <Image
                boxSize="400px"
                src={`${server}${productDetails.image[0].image}`}
                alt={productDetails.productName}
              />
            </Center>
            {/* Image Gallery */}
            <Flex mt="4">
              {productDetails.image.map((image, index) => (
                <Image
                  key={index}
                  src={`${server}${image.image}`}
                  alt={`Product Image ${index}`}
                  boxSize="80px"
                  cursor="pointer"
                  onClick={() => handleImageClick(image)}
                  mr="2" // Add margin to create space between images
                />
              ))}
            </Flex>

            <Text mt="4" fontWeight="bold" fontSize="xl">
              {productDetails.productName}
            </Text>

            <Text mt="2" color="gray.500">
              Rs {productDetails.ratedPrice}
            </Text>

            {productDetails.originalPrice &&
              productDetails.originalPrice !== productDetails.ratedPrice && (
                <Text mt="2" color="red.500" textDecoration="line-through">
                  Rs {productDetails.originalPrice}
                </Text>
              )}

            <Text mt="2" color="gray.500">
              Location: {productDetails.location}
            </Text>

            {/* Add more details as needed */}
          </Box>

          <Spacer />

          {/* Contact Details */}
          <ContactDetails seller={productDetails.seller} product={productDetails} />
        </Flex>
      </Container>

      {/* Image Preview Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {selectedImage && (
              <Image
                src={`${server}${selectedImage.image}`}
                alt="Selected Image"
                boxSize="100%"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SingleSecondProduct;
