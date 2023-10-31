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


  const handlebuynowclick = (id,name) =>{
    window.open(`/products/${name}/${id}`,'_self')
  }

  const handlecartclick = (id) =>{}

  return (
    <div className="container mx-auto p-2 mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">View Products</h2>
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
                <Button variant="solid" colorScheme="blue" onClick={()=>handlebuynowclick(product.id,product.product_name)}>
                  Buy now
                </Button>
                <Button variant="ghost" colorScheme="blue" onClick={()=>handlecartclick(product.id)}>
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
