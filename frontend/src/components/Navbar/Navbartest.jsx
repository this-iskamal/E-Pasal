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
import logo from "../../assets/images/E logo 1.png";

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

  const isLoggedIn = false;
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

      <Navbar onMenuOpenChange={setIsMenuOpen} className="rounded-md">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="flex gap-4">
            <img src={logo} alt="" style={{ height: "36px", width: "36px" }} />
            <p className="font-bold text-inherit">E-Pasal</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground">Home</Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground" onClick={showDrawer}>
              Products
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground">Become a seller</Link>
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
                src={
                  isLoggedIn
                    ? "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    : "https://i.stack.imgur.com/l60Hf.png"
                }
              />
            </DropdownTrigger>
               
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                {isLoggedIn? <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>:null}
              {isLoggedIn? <DropdownItem key="settings">My Cart</DropdownItem>:null}
                          
              {isLoggedIn? <DropdownItem key="team_settings">Team Settings</DropdownItem>:null}
              {isLoggedIn? <DropdownItem key="analytics">Analytics</DropdownItem>:null}
              {isLoggedIn?<DropdownItem key="system">System</DropdownItem> :null}
              {isLoggedIn? <DropdownItem key="configurations">Configurations</DropdownItem>:null}
              {isLoggedIn? <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>:null}
              {isLoggedIn? <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>:null}
              {isLoggedIn? null:<DropdownItem key="login" onClick={()=>{window.open("/registration","_self")}}>Login</DropdownItem>}
              {isLoggedIn? null:<DropdownItem key="signup" onClick={()=>{window.open("/registration","_self")}}>Sign Up</DropdownItem>}
              
              
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
