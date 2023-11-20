// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import server from "../../utils/server";
// import { useParams } from "react-router-dom";
// // import { Spin } from "antd";
// import Navbartest from "../Navbar/Navbartest";
// import DetailsThumb from "./DetailsThumb";
// import Colors from "./Colors";

// function SingleProduct() {
//   const { product_name, id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios.get(`${server}/api/products/${product_name}/${id}`).then((res) => {
//       setProduct(res.data); // Set the retrieved product data into the product state
//     });
//   }, [product_name, id]); // Add product_name and id as dependencies to the useEffect

//   return (
//     <div className="single-product">
//       <Navbartest />

//     </div>
//   );
// }

// export default SingleProduct;

import React, { useRef, useState, useEffect } from "react";
import Navbartest from "../Navbar/Navbartest";
import axios from "axios";
import server from "../../utils/server";
import "./Appa.css";
import { Text } from "@chakra-ui/react";
import Colors from "./Colors";
import DetailsThumb from "./DetailsThumb";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../utils/JWT";

const SingleProduct = () => {
  const path = "https://uat.esewa.com.np/epay/main";

  const [cart, setCart] = useState([]);

  const { product_name, id } = useParams();
  const [products, setProducts] = useState();
  const toast = useToast();
  useEffect(() => {
    axios.get(`${server}/api/products/${product_name}/${id}`).then((res) => {
      setProducts(res.data); // Set the retrieved product data into the product state
    });
    console.log(products);
  }, [product_name, id]); // Add product_name and id as dependencies to the useEffect

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
    axios.get(`${server}/get-cart/`).then((res) => {
      setCart(res.data);
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error
        console.log('User is not authorized. Redirect to login or show an error message.');
        // For example, you can redirect to the login page:
        // history.push('/login');
      } else {
        // Handle other errors
        console.error('Error fetching cart:', error);
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
        <>
          <span>
            NPR{" "}
            <span style={{ textDecoration: "line-through" }}>
              {products.price}
            </span>{" "}
            <span>{amt - dis}</span>{" "}
          </span>
        </>
      );
    } else {
      return (
        // <Text color="blue.600" fontSize="2xl">
        //   NPR <span>{amt} </span>{" "}
        // </Text>
        <span>NPR {amt}</span>
      );
    }
  };

  const isperson = useAuth();

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
  function generateAlphanumeric() {
    const length = 14;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result + products.id;
  }

  const handlebuyclick = (path) => {
    if (isperson === null) {
      toast({
        title:"Please login first",
        status:"error",
        isClosable:"true"
      })
      setTimeout(() => {
        window.open("/registration","_self")
      }, 2500);
    } else {
      var params = {
        amt: products.price,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: products.price,
        pid: generateAlphanumeric(),
        scd: "EPAYTEST",
        su: "http://192.168.2.102:3000/esewa-success",
        fu: "http://192.168.2.102:3000/esewa-failed",
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

      document.body.appendChild(form);
      form.submit();
    }
  };

  return (
    <>
      <Navbartest />
      <div className="app">
        {products && (
          <div className="details" key={products.id}>
            <div className="big-img">
              <img src={`${server}/${products.image[index].image}`} alt="" />
            </div>

            <div className="box">
              <div className="row">
                <h2>{products.product_name}</h2>

                {isdiscount(products.price, products.discountRate)}
              </div>
              <Colors colors={products.colors} />

              <p>{products.description}</p>
              <p>{products.description}</p>

              <DetailsThumb
                image={products.image}
                tab={handleTab}
                myRef={myRef}
              />
              <button
                className="cart"
                onClick={() => {
                  handlecartclick(products.id);
                }}
              >
                Add to cart
              </button>
              <button
                className="cart ml-2"
                onClick={() => {
                  handlebuyclick(path);
                }}
              >
                Buy
              </button>
              <p>Cart Size: {cart.length}</p>
            </div>
          </div>
        )}
      </div>
      <h2 className="text-center">Similar Products</h2>
    </>
  );
};

export default SingleProduct;
