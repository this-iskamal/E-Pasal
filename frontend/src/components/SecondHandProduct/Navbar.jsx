import React, { useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  HStack,
  IconButton,
  Avatar,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { FiBell, FiMessageCircle } from "react-icons/fi";
import logo from "../../assets/images/E_logo_1.png";
import server from "../../utils/server";
import UploadProductModal from "./UploadproductModal";
import MessageComponent from "./MessageComponent";
import NotificationComponent from "./NotificationComponent";

function Navbar({ profile }) {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  const openUploadModal = () => setUploadModalOpen(true);
  const closeUploadModal = () => setUploadModalOpen(false);

  const handleUploadSubmit = (formData) => {
    // Handle the form submission logic here
    console.log("Form data:", formData);
    closeUploadModal();
  };

  const handlelogoutclick = () => {
    localStorage.removeItem("token");
    window.open("/registration", "_self");
  };

  return (
    <Flex
      p={4}
      bg="teal.500"
      align="center"
      direction={{ base: "column", md: "row" }}
    >
      {/* Logo and Heading */}
      <Flex align="center" mb={{ base: 4, md: 0 }}>
        <Box>
          {/* Replace 'Your Logo' with your actual logo */}
          <img src={logo} alt="Your Logo" style={{ height: "40px" }} />
        </Box>
        <Box ml={{ base: 0, md: 4 }}>
          <Text fontSize="lg" fontWeight="bold" color="white">
            E-Pasal Second Hand Online Market
          </Text>
        </Box>
      </Flex>

      {/* Spacer for center alignment on smaller screens */}
      <Spacer />

      {/* Buttons and Modal */}
      <HStack spacing={4} mb={{ base: 4, md: 0 }}>
        <Button colorScheme="white" variant="outline" onClick={openUploadModal}>
          Upload Products
        </Button>
        <UploadProductModal
          isOpen={isUploadModalOpen}
          onClose={closeUploadModal}
          onSubmit={handleUploadSubmit}
        />
      </HStack>

      {/* Icons and Badges */}
      <HStack spacing={4} mb={{ base: 4, md: 0 }}>
        {/* Notification Icon */}

        {/* Chat Icon */}
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="Chat"
              icon={<FiMessageCircle />}
              colorScheme="white"
              variant="ghost"
              fontSize="24px"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Chat</PopoverHeader>
            <PopoverBody>
              <MessageComponent />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>

      {/* User Photo */}
      <Popover>
        <PopoverTrigger>
          <Avatar
            src={`${server}/${profile && profile.profileImage}`}
            size="md"
            name={profile && profile.fullName}
            className="cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent className="m-2">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <List>
              <ListItem>
                <Text onClick={handlelogoutclick}>Logout</Text>
              </ListItem>
              <ListItem>
                <Text>Settings 2</Text>
              </ListItem>
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}

export default Navbar;
