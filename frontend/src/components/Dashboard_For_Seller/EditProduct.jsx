// EditProduct.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../../utils/server";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Button,
} from "@chakra-ui/react";

function EditProduct({ productId }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${server}/api/products/productname/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [productId]);

  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: "",
    category: "",
    isFlashSale: false,
    freeDelivery: false,
    isNewArrival: false,
    discountRate: "",

    stocks: "",
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the update request to the backend with formData
    axios
      .patch(`${server}/api/products/update/${productId}/`, formData)
      .then((res) => {
        console.log("Product updated successfully:", res.data);
        // You may want to redirect or update state as needed
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <Box p={4}>
      {loading ? (
        <p>Loading product details...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Product Name:</FormLabel>
            <Input
              type="text"
              name="product_name"
              value={
                formData.product_name !== undefined
                  ? formData.product_name
                  : product.product_name
              }
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description:</FormLabel>
            <Textarea
              name="description"
              value={
                formData.description !== undefined
                  ? formData.description
                  : product.description
              }
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Price:</FormLabel>
            <Input
              type="text"
              name="price"
              value={
                formData.price !== undefined ? formData.price : product.price
              }
              onChange={handleChange}
            />
          </FormControl>
          {/* Add other form controls as needed */}
          <Checkbox
            isChecked={
              formData.isFlashSale !== undefined
                ? formData.isFlashSale
                : product.isFlashSale
            }
            onChange={handleChange}
            name="isFlashSale"
            className="mx-1"
          >
            Flash Sale
          </Checkbox>

          <Checkbox
            isChecked={
              formData.freeDelivery !== undefined
                ? formData.freeDelivery
                : product.freeDelivery
            }
            onChange={handleChange}
            name="freeDelivery"
            className="mx-1"
          >
            Free Delivery
          </Checkbox>

          <Checkbox
            isChecked={
              formData.isNewArrival !== undefined
                ? formData.isNewArrival
                : product.isNewArrival
            }
            onChange={handleChange}
            name="isNewArrival"
            className="mx-1"
          >
            New Arrival
          </Checkbox>
          <FormControl mb={4}>
            <FormLabel>Discount Rate:</FormLabel>
            <Input
              type="text"
              name="discountRate"
              value={
                formData.discountRate !== undefined
                  ? formData.discountRate
                  : product.discountRate
              }
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Stocks:</FormLabel>
            <Input
              type="text"
              name="stocks"
              value={
                formData.stocks !== undefined ? formData.stocks : product.stocks
              }
              onChange={handleChange}
            />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Save Changes
          </Button>
        </form>
      )}
    </Box>
  );
}

export default EditProduct;
