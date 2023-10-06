import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Divider,
  Heading,
  CardFooter,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import server from "../../utils/server";
function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API when the component mounts
    axios.get(`${server}/api/products/view`).then((response) => {
      setProducts(response.data); // Assuming the response contains an array of products
    });
  }, []);

  return (
    <div className="container mx-auto p-2 mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">View Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card  className="shadow-lg">
            <CardBody className="flex justify-center flex-col">
              {product.image.length > 0 && (
                <Image
                  alt={product.product_name}
                  src={`${server}${product.image[0].image}`}
                  borderRadius="lg"
                  height={300}
                />
              )}
              <Stack mt="6" spacing="3">
                <Heading size="md">{product.product_name}</Heading>
                {/* <Text>
                  {(product.description).slice(0,150)}
                </Text> */}
                <Text color="blue.600" fontSize="2xl">
                  NPR {product.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  Buy now
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Product;
