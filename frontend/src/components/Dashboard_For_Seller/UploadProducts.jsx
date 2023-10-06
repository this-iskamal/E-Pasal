import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Select } from "antd";
import { getAuthToken,setAuthToken } from "../../utils/JWT";
import server from "../../utils/server";
import { useToast } from "@chakra-ui/react";
import axios from "axios";


function UploadProducts({user}) {
const toast = useToast()
  
  const { Option } = Select;
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
    seller:user?user.email:null,


  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleTagsChange = (tags) => {
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
    const imagearray=[]
    // Handle form submission logic here (e.g., sending data to backend)
    product.images.forEach((image, index) => {
      // formData.append(`image${index}`, image.originFileObj);
      imagearray.push(image.originFileObj)
    });
    console.log(imagearray)
    const token = getAuthToken();
    setAuthToken(token);
    const formData = new FormData();

    // Append other form data fields to the FormData object
    formData.append("product_name", product.product_name);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("discountPercent", product.discountPercent);
    formData.append("discountRate", product.discountRate);
    formData.append("tags", JSON.stringify(product.tags.join(",")));
    formData.append("brandName", product.brandName);
    formData.append("colors", JSON.stringify(product.colors.join(",")));
    formData.append("size", product.size.join(","));
    formData.append("stocks", product.stocks);
    formData.append("seller", product.seller);

    

    imagearray.forEach((file, index) => {
      formData.append(`image[${index}]`, file);
    });
 
    

    axios.post(`${server}/api/products/create`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data', // Set content type as multipart form-data
      },
    }).then((res)=>{
      if(res.data.success===true){
        toast({
          title: res.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          window.open('/seller/dashboard','_self')
        }, 3000);
      }
      else{
        toast({
          title: "Upload Failed",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });


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
    // Update the product state with the array of image files
    setProduct((prevProduct) => ({
      ...prevProduct,
      images:newFileList
    }));
    setFileList(newFileList);
  };
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-2 border">
      <h2 className="text-2xl font-bold mb-4 text-center ">Upload Products</h2>
      <form className="max-w-xxl mx-auto" onSubmit={handleSubmit}>
        <div className="md:flex mb-4 gap-4">
          <div className="w-100 pr-2 ">
            <label className="block text-sm font-semibold text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="w-100 pr-2">
            <label className="block text-sm font-semibold text-gray-600">
              Category
            </label>
            <Select
              name="category"
              value={product.category}
              onChange={(value) => setProduct({ ...product, category: value })}
              className="w-full"
            >
              <Option value="Electronics Devices">Electronics Devices</Option>
              <Option value="Home and Lifestyle">Home and Lifestyle</Option>
              <Option value="Men's Fashion">Men's Fashion</Option>
              <Option value="Women's Fashion">Women's Fashion</Option>
              <Option value="Cold Drinks">Cold Drinks</Option>
              <Option value="Tea">Tea</Option>
              <Option value="Breakfast and Chips">Breakfast and Chips</Option>
              <Option value="Groceries">Groceries</Option>



              {/* Add more category options */}
            </Select>
          </div>
        </div>
        <div className="md:flex mb-4 gap-4">
          <div className="w-100 pr-2">
            <label className="block text-sm font-semibold text-gray-600">
              price 
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="w-100 pr-2">
            <label className="block text-sm font-semibold text-gray-600">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              
              value={product.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="md:flex mb-4 gap-4">
          <div className="w-100 pr-2">
            <label className="block text-sm font-semibold text-gray-600">
              Discount Rate
            </label>
            <input
              type="number"
              name="discountRate"
              value={product.discountRate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="w-100 pr-2">
            <label className="block text-sm font-semibold text-gray-600">
              Tags
            </label>
            <Select
              mode="tags"
              name="tags"
              value={product.tags}
              onChange={handleTagsChange}
              className="w-full"
            >
              {/* Tags will be added dynamically */}
            </Select>
          </div>
        </div>
        <div className="md:flex mb-4 gap-4">
          <div className="w-100 pr-2">
            <label className="block text-sm font-semibold text-gray-600">
              Brand Name
            </label>
            <input
              type="text"
              name="brandName"
              value={product.brandName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="w-100 pr-2">
            <label className="block text-sm font-semibold text-gray-600">
              Colors
            </label>
            <Select
              mode="multiple"
              name="colors"
              value={product.colors}
              onChange={handleColorsChange}
              className="w-full"
            >
              <Option value="Black">Black</Option>
              <Option value="White">White</Option>
              <Option value="Gray">Gray</Option>
              <Option value="Yellow">Yellow</Option>
              <Option value="Blue">Blue</Option>

              {/* Add more color options */}
            </Select>
          </div>
        </div>

        <div className="md:flex mb-4 gap-4">
          <div className="w-100 pr-2">
            <label className="block text-sm font-semibold text-gray-600">
              Size
            </label>
            <Select
              name="size"
              mode="multiple"
              value={product.size}
              onChange={handleSizeChange}
              className="w-full"
            >
              <Option value="sm">sm</Option>
              <Option value="md">md</Option>
              <Option value="lg">lg</Option>
              <Option value="xl">xl</Option>
              <Option value="xxl">xxl</Option>
              
              {/* Add more size options */}
            </Select>
          </div>

          <div className="w-100 pr-2">
            <label className="block text-sm font-semibold text-gray-600">
              Stocks
            </label>
            <input
              type="number"
              name="stocks"
              value={product.stocks}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <label className="block text-sm font-semibold text-gray-600">
          Media
        </label>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          className="mt-3 mb-3"
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default UploadProducts;
