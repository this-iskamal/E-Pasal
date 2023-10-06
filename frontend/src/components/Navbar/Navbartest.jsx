import React, { useState } from "react";
import { Drawer } from "antd";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  Dropdown,
  Avatar,
  DropdownMenu,
  DropdownTrigger,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useEffect } from "react";
import axios from "axios";
import { getAuthToken,removeAuthToken,setAuthToken } from "../../utils/JWT";

import logo from "../../assets/images/E logo 1.png";
import server from "../../utils/server";
import Sidebarr from "../Sidebar/Sidebarr";

export default function Navbartest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "Products", "Become a seller"];
  const [open, setOpen] = useState(false);
  const [placement] = useState("left");

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the JWT token from local storage
    const token = getAuthToken();
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${server}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data.user);
      } catch (error) {
        // Handle errors, e.g., if the token is invalid or the request fails
        console.error("Error fetching user data:", error);
      }
    };
    if (token) {
      // Token exists, you can use it for authenticated requests
      // You might want to validate the token's expiration here as well
      // ...
      setAuthToken(token);
      fetchUserData();
      
      console.log("Token exists:", token);
    } else {
      // Token doesn't exist, user is not authenticated
      // ...
      console.log("Token does not exist");
    }
  }, []);


  const handlelogoutclick = ()=>{
    removeAuthToken();
    window.location.reload()
  }

  return (
    <>
      {open ? (
        <Drawer
          title="Categories"
          placement={placement}
          onClose={onClose}
          open={open}
          key={placement}
        >
          <Sidebarr />
        </Drawer>
      ) : null}

      <Navbar className="bg-white" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="flex gap-4">
            <img
              src={logo}
              alt=""
              style={{ height: "36px", width: "36px" }}
              className="cursor-pointer"
            />
            <p className="font-bold text-inherit cursor-pointer">E-Pasal</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" className="cursor-pointer">
              Home
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link
              color="foreground"
              onClick={showDrawer}
              className="cursor-pointer"
            >
              Products
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground" className="cursor-pointer">
              Become a seller
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={user?`${server}/${user.profileImage}`:null}
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              {user ? (
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?user.email:null}</p>
                </DropdownItem>
              ) : null}
              {user ? (
                <DropdownItem key="settings">My Cart</DropdownItem>
              ) : null}

              {user ? (
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
              ) : null}
              {user ? (
                <DropdownItem key="analytics">Analytics</DropdownItem>
              ) : null}
              {user ? (
                <DropdownItem key="system">System</DropdownItem>
              ) : null}
              {user ? (
                <DropdownItem key="configurations">Configurations</DropdownItem>
              ) : null}
              {user ? (
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
              ) : null}
              {user ? (
                <DropdownItem key="logout" color="danger" onClick={handlelogoutclick}>
                  Log Out
                </DropdownItem>
              ) : null}
              {user ? null : (
                <DropdownItem
                  key="login"
                  onClick={() => {
                    window.open("/registration", "_self");
                  }}
                >
                  Login
                </DropdownItem>
              )}
              {user ? null : (
                <DropdownItem
                  key="signup"
                  onClick={() => {
                    window.open("/registration", "_self");
                  }}
                >
                  Sign Up
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                size="lg"
                onClick={item === "Products" ? showDrawer : null}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
