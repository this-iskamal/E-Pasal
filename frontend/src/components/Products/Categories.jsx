import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import freedelivery from "../../assets/images/free-delivery.png";
import newarrival from "../../assets/images/new-product.png";
import beauty from "../../assets/images/beauty.png";
import electronics from "../../assets/images/electronic-bazar.png";
import discount from "../../assets/images/below-400.png";
import proudlynepali from "../../assets/images/proudly nepali.png";
import fashion from "../../assets/images/fashion.png";
import home from "../../assets/images/home.png";

function Categories() {
  return (
    <Box
      p={0}
      bg="white"
      border="1px"
      borderColor="gray.200"
      shadow="md"
      mb={5}
      rounded="md"
      overflowX="auto"
      whiteSpace="nowrap"
    >
      <Flex
        wrap="wrap"
        justifyContent={{ base: "center", md: "space-evenly" }}
      >
        {/* Category Items */}
        {[
          { imgSrc: freedelivery, label: 'Free Delivery', link: '/freedelivery' },
          { imgSrc: newarrival, label: 'New Arrivals', link: '/newarrival' },
          { imgSrc: discount, label: 'Discount', link: '/discount' },
          { imgSrc: electronics, label: 'Electronics Bazar', link: '/electronics' },
          { imgSrc: proudlynepali, label: 'Proudly Nepali', link: '/proudlynepali' },
          { imgSrc: beauty, label: 'Beauty', link: '/beauty' },
          { imgSrc: fashion, label: 'Fashion', link: '/fashion' },
          { imgSrc: home, label: 'Home', link: '/home' },
        ].map((category) => (
          <Box
            key={category.label}
            m={2}
            cursor="pointer"
            _hover={{ color: "ABC4AA", transform: "scale(1.05)" }}
            onClick={() => window.open(category.link, "_self")}
            textAlign="center"
          >
            <img
              src={category.imgSrc}
              alt={category.label}
              style={{
                height: "80px",
                width: "80px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Text
              mt={2}
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight="500"
              color="rgba(0, 0, 0, .87)"
            >
              {category.label}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default Categories;
