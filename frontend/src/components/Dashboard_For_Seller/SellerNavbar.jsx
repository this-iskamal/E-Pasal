import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import server from "../../utils/server.jsx";
import { BellIcon } from "@chakra-ui/icons";
import { SearchIcon } from "./SearchIcon.jsx";
import { Popover } from "antd";
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
} from "../../utils/JWT.jsx";

export default function SellerNavbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    // Get the JWT token from local storage
    const token = getAuthToken();
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${server}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const handlelogoutclick = () => {
    removeAuthToken();
    window.open("/registration", "_self");
  };

  return (
    <Navbar isBordered>
      {console.log(user)}
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">E-Pasal Second Hand Products</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center gap-4" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[15rem] h-10 border-none",
            mainWrapper: "h-full border-none",
            input: "text-small border-none",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 border-none",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Popover
          content={<Link onClick={hide}>Close</Link>}
          title="Notifications"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <BellIcon w={6} h={6} style={{ cursor: "pointer" }} />
        </Popover>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={user ? `${server}/${user.profileImage}` : null}
            />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user ? user.email : null}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Account</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={handlelogoutclick}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
