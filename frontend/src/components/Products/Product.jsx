import React, { useState, useEffect } from "react";
import axios from "axios";
// import {
//   Card,
//   CardBody,
//   Image,
//   Stack,
//   Text,
//   Divider,
//   Heading,
//   CardFooter,
//   Button,
//   ButtonGroup,
//   useToast,
// } from "@chakra-ui/react";
import { Card } from 'flowbite-react';
import server from "../../utils/server";
import {useAuth} from "../../utils/JWT"
import { useToast } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";


function Product() {
  const [products, setProducts] = useState([]);
  const toast = useToast()

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
  const isperson = useAuth();

  const handlecartclick = (event,id) => {
    event.preventDefault();
    event.stopPropagation();

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
        .post(`${server}/add-to-cart/`, { selectedProduct })
        .then((response) => {
          if (response.data.success === false)
            toast({
              title: `${response.data.detail}`,
              status: "error",
            });
          else
            toast({
              title: `${response.data.detail}`,
              status: "success",
            });
        });
    }
  };

  return (
    <div className="container mx-auto p-2 mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">View Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products.map((product) => (
          // <Card className="shadow-lg">
          //   <CardBody className="flex justify-center flex-col">
          //     {product.image.length > 0 && (
          //       <Image
          //         alt={product.product_name}
          //         src={`${server}${product.image[0].image}`}
          //         borderRadius="lg"
          //         height={300}
          //       />
          //     )}
          //     <Stack mt="6" spacing="3">
          //       <Heading size="md">{product.product_name}</Heading>
          //       {/* <Text>
          //         {(product.description).slice(0,150)}
          //       </Text> */}
          //       {/* {isdiscount ? (
          //         <Text color="blue.600" fontSize="2xl">
          //           NPR{" "}
          //           <span
          //             style={{ textDecoration: "line-through", color: "black" }}
          //           >
          //             {product.price}{" "}
          //           </span>{" "}
          //           {product.price - product.discountRate}
          //         </Text>
          //       ) : (
          //         <Text color="blue.600" fontSize="2xl">
          //           NPR <span>{product.price} </span>{" "}
          //         </Text>
          //       )} */}
          //       {isdiscount(product.price, product.discountRate)}
          //     </Stack>
          //   </CardBody>
          //   <Divider />
          //   <CardFooter>
          //     <ButtonGroup spacing="2">
          //       <Button variant="solid" colorScheme="blue" onClick={()=>handlebuynowclick(product.id,product.product_name)}>
          //         Buy now
          //       </Button>
          //       <Button variant="ghost" colorScheme="blue" onClick={()=>handlecartclick(product.id)}>
          //         Add to cart
          //       </Button>
          //     </ButtonGroup>
          //   </CardFooter>
          // </Card>
          <Card
          className="max-w-sm"
          imgAlt="product image"
          imgSrc={`${server}/${product.image[0].image}`}
          onClick={()=>handlebuynowclick(product.id,product.product_name)}
        >
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.product_name}
            </h5>
          </a>
          <div className="mb-5 mt-2.5 flex items-center">
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
              5.0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-white">NPR {product.price}</span>
            <a
              href="#"
              onClick={(event)=>handlecartclick(event,product.id)}
              className="rounded-lg bg-cyan-700 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Add to cart
            </a>
          </div>
        </Card>
        ))}
      </div>
    </div>
  );
}

export default Product;
