'use client';

import { Sidebar } from 'flowbite-react';
import {  HiShoppingBag } from 'react-icons/hi';

export default function Sidebarr() {
  return (
    <Sidebar >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          
          <Sidebar.Collapse
            icon={HiShoppingBag}
            label="E-commerce"
          >
            <Sidebar.Item href="#">
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#">
              Sales
            </Sidebar.Item>
            <Sidebar.Item href="#">
              Refunds
            </Sidebar.Item>
            <Sidebar.Item href="#">
              Shipping
            </Sidebar.Item>
          </Sidebar.Collapse>
          
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}


