import React, { useRef, useState, useEffect } from "react";
import Navbartest from "../Navbar/Navbartest";
import axios from "axios";
import server from "../../utils/server";
import localserver from "../../utils/localserver";
import "./Appa.css";
import {
  Text,
  Box,
  Flex,
  Heading,
  Button,
  Input,
  Select,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../utils/JWT";

import DetailsThumb from "./DetailsThumb";
import MapComponent from "../Map/MapComponent";
import Review from "./Review";
import SimilarProducts from "./SimilarProducts";

const SingleProduct = () => {
  const path = "https://uat.esewa.com.np/epay/main";
  const [cart, setCart] = useState([]);
  const { product_name, id } = useParams();
  const [products, setProducts] = useState(null);
  const [isMapVisible, setMapVisible] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const handleOpenMap = () => {
    setMapVisible(true);
  };
  const handleCloseMap = () => {
    setMapVisible(false);
  };

  const toast = useToast();

  useEffect(() => {
    axios.get(`${server}/api/products/${product_name}/${id}`).then((res) => {
      setProducts(res.data);
    });
  }, [product_name, id]);

  const [index, setIndex] = useState(0);
  const myRef = useRef(null);

  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  useEffect(() => {
    axios
      .get(`${server}/get-cart/`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error(
            "User is not authorized. Redirect to login or show an error message."
          );
        } else {
          console.error("Error fetching cart:", error);
        }
      });

    const { current } = myRef;
    if (current) {
      current.children[index].className = "active";
    }
  }, [index]);

  const isdiscount = (amt, dis) => {
    if (dis != null) {
      return (
        <Text>
          NPR{" "}
          <Text as="span" textDecoration="line-through">
            {products.price}
          </Text>{" "}
          <Text as="span">{amt - dis}</Text>{" "}
        </Text>
      );
    } else {
      return <Text>NPR {amt}</Text>;
    }
  };

  var isperson = useAuth();

  const handlecartclick = (id) => {
    if (isperson === null) {
      toast({
        title: "Error adding to cart",
        description: "You must log in first",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setTimeout(() => {
        window.open("/registration", "_self");
      }, 3000);
    } else {
      const selectedProduct = id;

      axios
        .post(`${server}/add-to-cart/`, { selectedProduct, quantity })
        .then((response) => {
          if (response.data.success === false) {
            toast({
              title: `${response.data.detail}`,
              status: "error",
            });
          } else {
            toast({
              title: `${response.data.detail}`,
              status: "success",
            });
          }
        })
        .catch((err) => {
          toast({
            title: `Error adding to cart`,
            status: "error",
          });
        });
    }
  };

  function generateAlphanumeric() {
    const length = 14;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return (result+products.id)
    
  }

  const handlebuyclick = (path) => {
    if (!isperson.addresss[0]) {
      toast({
        title: "Please add address first",
        status: "error",
        isClosable: "true",
      });
      return;
    }
    if (isperson === null) {
      toast({
        title: "Please login first",
        status: "error",
        isClosable: "true",
      });
      setTimeout(() => {
        window.open("/registration", "_self");
      }, 2500);
    } else {
      var params = {
        amt:
          (products.discountRate
            ? products.price - products.discountRate
            : products.price) * quantity,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt:
          (products.discountRate
            ? products.price - products.discountRate
            : products.price) * quantity,
        pid: generateAlphanumeric(),
        scd: "EPAYTEST",
        su: `${localserver}/esewa-success/1`,
        fu: `${localserver}/esewa-failed`,
      };

      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", path);

      for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
      }

      window.open().document.body.appendChild(form);
      form.submit();
    }
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    // Check if the product price is greater than 100,000 and limit increment to 2
    if (products.price > 100000 && quantity < 2) {
      setQuantity(quantity + 1);
    } else if (quantity < 10) {
      // Limit the total quantity to 10
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSaveAddress = (address) => {
    console.log(address);
    // Send the address to the backend for storing
    // You can use axios or any other method to make a request to your backend API
    // Example using axios:
    axios
      .post(`${server}/address`, { addresss: address })
      .then((response) => {
        // Handle the response from the backend if needed
        console.log(response.data);
        toast({
          title: "Address saved successfully",
          status: "success",
          isClosable: true,
        });
        handleCloseMap();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error saving address:", error);
        toast({
          title: "Error saving address",
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <div
      style={{ backgroundColor: "#F3EEEA" }}
      className="h-full flex flex-col"
    >
      <Navbartest />
      <Box className="app" bg="gray.100">
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ base: "stretch", md: "flex-start" }}
        >
          {products && (
            <Flex
              className="details"
              key={products.id}
              width={{ base: "100%", md: "75%" }}
            >
              <Box className="big-img" position="relative" overflow="hidden">
                <Box
                  as="img"
                  src={`${server}${products.image[index].image}`}
                  alt={products.product_name}
                  className="zoomable-image"
                />
              </Box>

              <Box className="box" ml={{ base: 0, md: 4 }}>
                <Flex flexDirection="column">
                  <Heading>{products.product_name}</Heading>

                  {products.discount_percent > 0 && (
                    <Text color="red.500" fontWeight="bold">
                      {products.discount_percent}% off
                    </Text>
                  )}

                  {isdiscount(products.price, products.discountRate)}
                </Flex>

                <Text>
                  {products.description || "No description available."}
                </Text>

                <DetailsThumb
                  image={products.image}
                  tab={handleTab}
                  myRef={myRef}
                />

                <Flex mt={4} alignItems="center">
                  <label className="mr-2 text-lg">Quantity:</label>
                  <Flex alignItems="center">
                    <button
                      className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-3 py-2 rounded-l"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <input
                      className="appearance-none border border-gray-300 w-12 text-center text-gray-700 mx-2"
                      type="text"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-3 py-2 rounded-r"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </Flex>
                </Flex>

                <Flex mt={2}>
                  <Button
                    className="cart"
                    onClick={() => handlecartclick(products.id)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    className="cart ml-2"
                    onClick={() => handlebuyclick(path)}
                  >
                    Buy Now
                  </Button>
                </Flex>
              </Box>
            </Flex>
          )}
          <Box
            p="4"
            shadow="md"
            rounded="md"
            m={{ base: 2, md: 4 }}
            maxW="md"
            mt={{ base: 4, md: 0 }}
          >
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => setDelivery(!delivery)}
            >
              Delivery
            </Button>
            {delivery && (
              <>
                <Heading size="md" mb="2" color="teal.500">
                  Delivery Information
                </Heading>
                {isperson && (
                  <div className="results bg-teal-500 text-white mb-2 p-2 rounded-md shadow-lg">
                    {isperson.addresss[0]
                      ? isperson.addresss[0].addresss
                      : "No address set"}
                  </div>
                )}
                {!isMapVisible && (
                  <Button colorScheme="teal" size="sm" onClick={handleOpenMap}>
                    Change Location
                  </Button>
                )}

                {isMapVisible && (
                  <Flex flexDirection="column">
                    <MapComponent onSaveAddress={handleSaveAddress} />
                  </Flex>
                )}
              </>
            )}
          </Box>
        </Flex>

        <Box mt={8} p={4} bg="gray.100" rounded="md">
          <Heading as="h2" size="lg" mb={2} color="teal.500">
            Product Details
          </Heading>
          <List spacing={1}>
            {" "}
            {/* Adjust spacing here */}
            {products &&
              products.product_details.map((detail) => (
                <ListItem key={detail.id} display="flex" alignItems="center">
                  <Text
                    fontWeight="bold"
                    fontSize="md"
                    color="gray.600"
                    marginRight="2"
                  >
                    {detail.name}:
                  </Text>
                  <Text fontSize="sm">{detail.value}</Text>
                </ListItem>
              ))}
          </List>
        </Box>

        <Review productId={id} />
        <SimilarProducts productId={id} />
      </Box>
    </div>
  );
};

export default SingleProduct;
