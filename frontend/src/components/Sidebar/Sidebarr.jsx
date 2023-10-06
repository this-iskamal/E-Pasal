"use client";

import { Sidebar } from "flowbite-react";
import { HiShoppingBag } from "react-icons/hi";

export default function Sidebarr() {
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce"> */}
            <Sidebar.Item href="#">Electronics</Sidebar.Item>
            <Sidebar.Item href="#">Groceries</Sidebar.Item>
            <Sidebar.Item href="#">Copmuter components</Sidebar.Item>
            <Sidebar.Item href="#">Breakfast</Sidebar.Item>
          {/* </Sidebar.Collapse> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
