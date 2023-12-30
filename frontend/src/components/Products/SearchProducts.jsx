// SearchProducts.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Select,
  Text,
  ChakraProvider,
  Heading,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import server from "../../utils/server";
import Navbartest from "../Navbar/Navbartest";
import { useParams } from "react-router-dom";

const SearchProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("price-low"); // Default sorting by low price

  const { q } = useParams();
  console.log(q);

  useEffect(() => {
    // Make API call to fetch products with free delivery and sorted by the selected option
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${server}/api/products/search/?query=${q}&sort=${sortBy}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [sortBy]);

  const handlebuynowclick = (id, name) => {
    window.open(`/products/${name}/${id}`, "_self");
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div
      className="flex flex-col "
      style={{ backgroundColor: "#F3EEEA", minHeight: "100vh" }}
    >
      <Navbartest />
      <div
        className="container p-3 mt-4 mb-1"
        style={{ backgroundColor: "#F3EEEA" }}
      >
        <div style={{ backgroundColor: "white" }} className="p-2 rounded-md">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            mb={4}
          >
            {/* Breadcrumbs */}
            <Breadcrumb mb={{ base: 2, md: 0 }}>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#" color="teal.500">
                  query: {q}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            {/* Filter section */}
            <Box bg="gray.100" p={2} borderRadius="md" boxShadow="md" mb={4}>
              <Flex
                alignItems={{ base: "start", md: "center" }}
                justifyContent={{ base: "space-between", md: "flex-start" }}
                flexWrap="wrap"
              >
                <Text fontSize="sm" fontWeight="bold" mb={{ base: 2, md: 0 }}>
                  {products.length} items found
                </Text>
                <FormControl>
                  <FormLabel htmlFor="sort-by" mb={{ base: 2, md: 0 }}>
                    Sort by:
                  </FormLabel>
                  <Select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    fontSize={{ base: "sm", md: "md" }}
                    width={{ base: "100%", md: "auto" }}
                  >
                    <option value="price-low">Price Low to High</option>
                    <option value="price-high">Price High to Low</option>
                    {/* Add more sorting options as needed */}
                  </Select>
                </FormControl>
              </Flex>
            </Box>
          </Flex>
          <div className="grid mt-2 p-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative overflow-hidden transition duration-300 transform bg-gray-100 rounded-md shadow-md hover:shadow-lg"
                onClick={() =>
                  handlebuynowclick(product.id, product.product_name)
                }
              >
                <div className="relative group">
                  <img
                    src={`${server}${product.image[0].image}`}
                    alt={product.product_name}
                    className="object-cover w-full h-40 sm:h-48 md:h-56 transition-transform transform-gpu group-hover:scale-105"
                  />
                  {product.discountRate && product.discountRate > 0 && (
                    <div className="absolute top-0 left-0 p-2 bg-blue-500 text-white rounded-bl-md">
                      <span className="text-xs font-semibold">
                        Save Rs {product.discountRate.slice(0, -3)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-base font-semibold mb-2">
                    {product.product_name.length > 20
                      ? `${product.product_name.slice(0, 20)}...`
                      : product.product_name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <span className="text-base font-bold mr-2 text-blue-500">
                      Rs {product.price - product.discountRate}
                    </span>
                    {product.discountRate && product.discountRate > 0 && (
                      <span className="text-xs text-red-500 line-through">
                        Rs {product.price.slice(0, -3)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={
                        product.freeDelivery ? "text-green-500" : "text-red-500"
                      }
                    >
                      {product.freeDelivery
                        ? "Free Delivery"
                        : "Delivery Charges Apply"}
                    </span>
                    <span
                      className={
                        product.stocks ? "text-green-500" : "text-red-500"
                      }
                    >
                      {product.stocks ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  {product.discount_percent !== undefined &&
                    product.discount_percent > 0 && (
                      <div className="mt-1 text-xs text-gray-600">
                        {`Discount: ${product.discount_percent.toFixed(2)}%`}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
