// SimilarProducts.js

import React, { useEffect, useState } from "react";
import { Box, Heading, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import server from "../../utils/server";

function SimilarProducts({ productId }) {
  const [similarProducts, setSimilarProducts] = useState([]);

  const getSimilarProducts = async () => {
    try {
      const response = await axios.get(
        `${server}/api/products/${productId}/similar`
      );

      // Filter out the current product from the list
      const filteredProducts = response.data.filter(
        (product) => product.id !== Number(productId)
      );

      setSimilarProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  useEffect(() => {
    getSimilarProducts();
  }, [productId]);

  const handlebuynowclick = (id, name) => {
    window.open(`/products/${name}/${id}`, "_self");
  };

  return (
    <Box mt={8} p={4} bg="gray.100" rounded="md">
      <Heading as="h2" size="lg" mb={4} color="teal.500">
        Similar Products
      </Heading>

      <Flex
        flexWrap="wrap"
        gap={4}
        direction={{ base: "column", md: "row" }} // Single column on small screens, row on medium and larger screens
      >
        {similarProducts.map((product) => (
          <Box
            key={product.id}
            className="flex items-start p-2 mt-2 bg-white rounded-lg shadow-md"
            flex="1 0 48%" // Set the width to 48% for two products in one row
          >
            <img
              src={`${server}${product.image[0].image}`} // Assuming the first image is used as the product image
              alt={product.product_name}
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <div>
              <p className="font-semibold text-md mb-1">
                {product.product_name.length > 50
                  ? `${product.product_name.slice(0, 50)}...`
                  : product.product_name}
              </p>
              <p className="text-gray-500 text-sm">
                Discount: {product.discount_percent}%
              </p>
              <p className="text-gray-500 text-sm">Price: Rs {product.price-product.discountRate}</p>
              <Button
                onClick={() => {
                  handlebuynowclick(product.id, product.product_name);
                }}
                colorScheme="blue"
                size="xs"
                mt={1}
              >
                View Details
              </Button>
            </div>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default SimilarProducts;
