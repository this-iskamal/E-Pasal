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
import EditProduct from "./EditProduct";

function SellerProducts({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(false);
  const [productId, setProductId] = useState(""); 
  const toast = useToast();

  useEffect(() => {
    const id = user.id;
    const id1 = "kamal" + String(id);

    axios
      .get(`${server}/api/products/getsellerproducts/${id1}`)
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

  const handledeleteclick = (product_name, id) => {
    axios.delete(`${server}/api/products/${product_name}/${id}`).then((res) => {
      toast({
        title: `${res.data.message}`,
      });
    });
  };
  const handleeditclick = (product_id) => {
    setProductId(product_id);
    setEditProduct(true);
  };
  return (
    <div className="container mx-auto p-2 mt-4">
      {editProduct ? (
        <EditProduct productId={productId}/>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">View Products</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {products.map((product) => {
                return (
                  <div className="relative overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl">
                    <img
                      src={`${server}${product.image[0].image}`}
                      alt={product.product_name}
                      className="object-cover w-full h-48 sm:h-56 md:h-64"
                    />
                    {product.discountRate && (
                      <div className="absolute top-0 left-0 p-2 bg-blue-500 text-white rounded-bl-lg">
                        <span className="text-sm font-semibold">
                          Save Rs {product.discountRate.slice(0, -3)}
                        </span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {product.product_name.length > 20
                          ? `${product.product_name.slice(0, 20)}...`
                          : product.product_name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <span className="text-lg font-bold mr-2">
                          Rs {product.price - product.discountRate}
                        </span>
                        {product.discountRate && (
                          <span className="text-red-500 line-through">
                            Rs {product.price.slice(0, -3)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span
                          className={
                            product.isFreeDelivery
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {product.isFreeDelivery
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
                      <div className="flex flex-row justify-between mt-4">
                        <div
                          className="p-2 bg-blue-500 text-white rounded-bl-lg cursor-pointer"
                          onClick={() => handleeditclick(product.id)}
                        >
                          <span className="text-sm font-semibold">Edit</span>
                        </div>
                        <div
                          className="p-2 bg-red-500 text-white rounded-bl-lg cursor-pointer"
                          onClick={() =>
                            handledeleteclick(product.product_name, product.id)
                          }
                        >
                          <span className="text-sm font-semibold">Delete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SellerProducts;
