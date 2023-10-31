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
import axios from "axios";
import server from "../../utils/server";
import "./Appa.css";
import { Text } from "@chakra-ui/react";
import Colors from "./Colors";
import DetailsThumb from "./DetailsThumb";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { product_name, id } = useParams();
  const [products, setProducts] = useState();

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

  return (
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
            <button className="cart">Add to cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
