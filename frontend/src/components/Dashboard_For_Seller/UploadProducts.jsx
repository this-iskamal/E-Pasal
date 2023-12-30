import React, { useState } from "react";
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
  Box,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";
import { Upload, Select } from "antd";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import server from "../../utils/server";
import { getAuthToken, setAuthToken } from "../../utils/JWT";
import { set } from "date-fns";
import ProductsCategory from "./ProductsCategory.json";

function UploadProducts({ user }) {
  const toast = useToast();

  const [product, setProduct] = useState({
    product_name: "",
    description: "",
    category: "",
    images: [],
    price: "",
    discountRate: "",
    tags: [],
    brandName: "",
    colors: [],
    size: [],
    stocks: "",
    seller: user ? user.id : null,
    freeDelivery: false, // New field for free delivery
    isNewArrival: false, // New field for isNewArrival
  });

  const [productDetails, setProductDetails] = useState([
    // Example initial detail
    { name: "", value: "" },
  ]);

  const { Option } = Select;
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...productDetails];
    updatedDetails[index][field] = value;
    setProductDetails(updatedDetails);
  };

  const handleAddDetail = () => {
    setProductDetails([...productDetails, { name: "", value: "" }]);
    console.log(productDetails);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = [...productDetails];
    updatedDetails.splice(index, 1);
    setProductDetails(updatedDetails);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: inputValue,
    }));
  };

  const handleTagChange = (tags) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      tags,
    }));
  };

  const handleColorsChange = (colors) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors,
    }));
  };

  const handleSizeChange = (size) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      size,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imagearray = [];

    product.images.forEach((image, index) => {
      imagearray.push(image.originFileObj);
    });

    const token = getAuthToken();
    setAuthToken(token);

    const formData = new FormData();

    formData.append("product_name", product.product_name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("discountRate", product.discountRate);
    formData.append("tags", JSON.stringify(product.tags.join(",")));
    formData.append("brandName", product.brandName);
    formData.append("colors", JSON.stringify(product.colors.join(",")));
    formData.append("size", product.size.join(","));
    formData.append("stocks", product.stocks);
    formData.append("seller", product.seller);
    formData.append("freeDelivery", product.freeDelivery);
    formData.append("isNewArrival", product.isNewArrival);

    imagearray.forEach((file, index) => {
      formData.append(`image[${index}]`, file);
    });

    // Append product details to FormData
    formData.append("productDetails", JSON.stringify(productDetails));

    console.log(formData);

    axios
      .post(`${server}/api/products/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          toast({
            title: res.data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setTimeout(() => {
            setProduct({
              product_name: "",
              description: "",
              category: "",
              images: [],
              price: "",
              discountRate: "",
              tags: [],
              brandName: "",
              colors: [],
              size: [],
              stocks: "",
              seller: user ? user.id : null,
              freeDelivery: false, // New field for free delivery
              isNewArrival: false, // New field for isNewArrival
            });
            setProductDetails([{ name: "", value: "" }]);
          }, 3000);
        } else {
          toast({
            title: "Upload Failed",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: newFileList,
    }));
    setFileList(newFileList);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const uploadButton = (
    <Box>
      <AddIcon />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </Box>
  );

  return (
    <Container maxW="xl" p={4} bg="white" boxShadow="lg" rounded="lg">
      <Heading as="h2" size="2xl" mb={6} textAlign="center" color="blue.500">
        Upload Products
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={product.category}
                onChange={(value) =>
                  setProduct({ ...product, category: value })
                }
                className="w-full"
              >
                {ProductsCategory.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormControl>
              <FormLabel>Discount Rate</FormLabel>
              <Input
                type="number"
                name="discountRate"
                value={product.discountRate}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Free Delivery</FormLabel>
              <input
                type="checkbox"
                name="freeDelivery"
                checked={product.freeDelivery}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>New Arrival</FormLabel>
              <input
                type="checkbox"
                name="isNewArrival"
                checked={product.isNewArrival}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Select
                mode="tags"
                name="tags"
                value={product.tags}
                onChange={handleTagChange}
                className="w-full"
              >
                {/* Tags will be added dynamically */}
              </Select>
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormControl>
              <FormLabel>Brand Name</FormLabel>
              <Input
                type="text"
                name="brandName"
                value={product.brandName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Colors</FormLabel>
              <Select
                mode="multiple"
                name="colors"
                value={product.colors}
                onChange={handleColorsChange}
              >
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Gray">Gray</option>
                <option value="Yellow">Yellow</option>
                <option value="Blue">Blue</option>
              </Select>
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormControl>
              <FormLabel>Size</FormLabel>
              <Select
                name="size"
                mode="multiple"
                value={product.size}
                onChange={handleSizeChange}
              >
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
                <option value="xl">xl</option>
                <option value="xxl">xxl</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Stocks</FormLabel>
              <Input
                type="number"
                name="stocks"
                value={product.stocks}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </Grid>

          <FormControl>
            <FormLabel>Media</FormLabel>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              mt={3}
              mb={3}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </FormControl>
          <FormControl>
            <FormLabel>Product Details</FormLabel>
            {productDetails.map((detail, index) => (
              <Box key={index} borderWidth="1px" p={4} borderRadius="md" mb={4}>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      value={detail.name}
                      onChange={(e) =>
                        handleDetailChange(index, "name", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Value</FormLabel>
                    <Input
                      type="text"
                      value={detail.value}
                      onChange={(e) =>
                        handleDetailChange(index, "value", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
                <Button
                  size="sm"
                  mt={2}
                  onClick={() => handleRemoveDetail(index)}
                >
                  Remove Detail
                </Button>
              </Box>
            ))}
            <Button onClick={handleAddDetail} size="sm">
              Add Detail
            </Button>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            w="full"
            mt={4}
            mb={4}
          >
            Upload Product
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default UploadProducts;
