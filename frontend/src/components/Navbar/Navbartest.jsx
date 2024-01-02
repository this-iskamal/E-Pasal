import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../../assets/images/E_logo_1.png";
import { removeAuthToken, useAuth } from "../../utils/JWT";
import image from "../../assets/images/download.png";
import cartimage from "../../assets/images/cart/Vector.png";
import server from "../../utils/server";
import {
  Drawer,
  DrawerBody,
  useDisclosure,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import localserver from "../../utils/localserver";

export default function Navbartest() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAuth();

  const handlelogoutclick = () => {
    removeAuthToken();
    window.location.reload();
  };

  const profile = user ? `${server}${user.profileImage}` : image;

  return (
    <>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" className="text-center">
            Categories
          </DrawerHeader>
          <DrawerBody>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem w="100%" h="10">
                Electronics
              </GridItem>
              <GridItem w="100%" h="10">
                Lifestyle
              </GridItem>
              <GridItem w="100%" h="10">
                Lifestyle
              </GridItem>
              <GridItem w="100%" h="10">
                Lifestyle
              </GridItem>
              <GridItem w="100%" h="10">
                Lifestyle
              </GridItem>
              <GridItem w="100%" h="10">
                Lifestyle
              </GridItem>
              <GridItem w="100%" h="10">
                Lifestyle
              </GridItem>
              <GridItem w="100%" h="10">
                Lifestyle
              </GridItem>
              <GridItem w="100%" h="10">
                Lifestyle
              </GridItem>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Navbar
        className="bg-FF8080 flex flex-row items-center justify-center"
        rounded
        style={{ backgroundColor: "#BB2525", color: "white", height: "60px" }}
      >
        <Navbar.Brand href={localserver}>
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            E-Pasal
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Avatar
            alt="User settings"
            img={cartimage}
            rounded
            className="mr-2 "
            onClick={() => {
              window.open("/cart-items", "_self");
            }}
          />
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={profile} rounded />}
          >
            {user ? (
              <>
                <Dropdown.Header>
                  <span className="block text-sm">{user && user.fullName}</span>
                  <span className="block truncate text-sm font-medium">
                    {user && user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => window.open('/secondhandproducts','_self')}>Sell Your Products</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    window.open("/purchase-history", "_self");
                  }}
                >
                  History
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handlelogoutclick}>
                  Sign out
                </Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item
                  onClick={() => window.open("/registration", "_self")}
                >
                  Sign In
                </Dropdown.Item>
              </>
            )}
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" style={{ color: "white" }}>
            Home
          </Navbar.Link>
          <Navbar.Link href="#" onClick={onOpen} style={{ color: "white" }}>
            Categories
          </Navbar.Link>
          <Navbar.Link href="/seller-registration" style={{ color: "white" }}>
            Become Seller
          </Navbar.Link>
      
          <Navbar.Link href="#" style={{ color: "white" }}>
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
