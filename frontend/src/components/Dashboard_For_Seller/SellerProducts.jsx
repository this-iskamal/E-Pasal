import React, { useEffect, useState } from "react";
import axios from "axios";
import server from "../../utils/server";
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
  useToast,
} from "@chakra-ui/react";
import { getAuthToken, useAuth } from "../../utils/JWT";

function SellerProducts({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    
    axios
      .get(`${server}/api/products/getsellerproducts/${user.id}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching seller products:", error);
        setLoading(false);
      });
}, [user.id]);

  const isdiscount = (amt, dis) => {
    if (dis != null) {
      return (
        <Text color="blue.600" fontSize="2xl">
          NPR{" "}
          <span style={{ textDecoration: "line-through", color: "black" }}>
            {amt}{" "}
          </span>{" "}
          {amt - dis}
        </Text>
      );
    } else {
      return (
        <Text color="blue.600" fontSize="2xl">
          NPR <span>{amt} </span>{" "}
        </Text>
      );
    }
  };

  const handledeleteclick = (product_name,id) => {
    axios.delete(`${server}/api/products/${product_name}/${id}`).then((res) => {
      toast({
        title:  `${res.data.message}`
      })
    });
  };
  const handleeditclick = (product_id) => {};
  return (
    <div className="container mx-auto p-2 mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">View Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((product) => (
            <Card className="shadow-lg">
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
                  {/* {isdiscount ? (
                  <Text color="blue.600" fontSize="2xl">
                    NPR{" "}
                    <span
                      style={{ textDecoration: "line-through", color: "black" }}
                    >
                      {product.price}{" "}
                    </span>{" "}
                    {product.price - product.discountRate}
                  </Text>
                ) : (
                  <Text color="blue.600" fontSize="2xl">
                    NPR <span>{product.price} </span>{" "}
                  </Text>
                )} */}
                  {isdiscount(product.price, product.discountRate)}
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => handleeditclick(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => handledeleteclick(product.product_name,product.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerProducts;
