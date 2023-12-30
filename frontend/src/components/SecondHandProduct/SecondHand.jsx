import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../../utils/JWT";
import axios from "axios";
import { Button, Input, Flex } from "@chakra-ui/react";
import server from "../../utils/server";
import { FaHeart } from "react-icons/fa";
import SellModal from "./SellModal";

function SecondHand() {
  const isperson = useAuth();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true);

  const handleEditClick = (id) => {
    // Open the modal and set the selected product ID
    setIsSellModalOpen(true);
    setSelectedProductId(id);
  };

  const handleSellModalClose = () => {
    // Close the modal and reset the selected product ID
    setIsSellModalOpen(false);
    setSelectedProductId(null);
  };

  const handleDeleteProduct = (id) => {
    // Update the state to remove the deleted product
    setFilteredProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
    setSearchedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  useEffect(() => {
    try {
      axios.get(`${server}/second-products`).then((res) => {
        setFilteredProducts(res.data);
        setSearchedProducts(res.data); // Initialize searchedProducts with all products
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // Filter products based on whether to show all or only user's products
    const filtered =
      showAllProducts && isperson
        ? filteredProducts
        : filteredProducts.filter((product) => isperson && product.seller === isperson.id);

    setSearchedProducts(filtered);
  }, [showAllProducts, isperson, filteredProducts]);

  const handlebuynowclick = (id, name) => {
    window.open(`/second-hand-product/${id}`, "_self");
  };

  const handleLikeClick = async (id, name) => {
    try {
      // Make an API call to the like endpoint
      const response = await axios.post(`${server}/api/like/${id}/`);

      // Update the state based on the API response
      if (response.status === 200) {
        const updatedProducts = filteredProducts.map((product) => {
          if (product.id === id) {
            return {
              ...product,
              liked: response.data.liked,
              likeCount: response.data.like_count,
            };
          }
          return product;
        });

        axios.get(`${server}/second-products`).then((res) => {
          setFilteredProducts(res.data);
        });
        setSearchedProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error liking the product:", error);
    }
  };

  const isProductEditable = (product) => {
    // Check if the current user is the seller of the product
    return isperson && product.seller === isperson.id;
  };

  const handleSearchClick = () => {
    // Filter products based on the search query when the search button is clicked
    const filtered = filteredProducts.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchedProducts(filtered);
  };

  const handleShowAllProducts = () => {
    // Show all products
    setShowAllProducts(true);
  };

  const handleShowMyProducts = () => {
    // Show only user's products
    setShowAllProducts(false);
  };

  return (
    <div
      className="h-full  flex flex-col"
      style={{ backgroundColor: "#F3EEEA" ,minHeight:"100vh"}}
    >
      <div className="mb-4">
        <Navbar profile={isperson} />
      </div>

      <div
        style={{ backgroundColor: "white" }}
        className="mx-5 p-3 rounded-md shadow-md"
      >
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={2}
        />

        <Flex gap={1}>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={handleSearchClick}
            mb={2}
          >
            Search
          </Button>
          <Button
            colorScheme="teal"
            size="sm"
            onClick={handleShowAllProducts}
            mb={2}
          >
            All Products
          </Button>
          {isperson && (
            <Button
              colorScheme="teal"
              size="sm"
              onClick={handleShowMyProducts}
              mb={4}
            >
              My Products
            </Button>
          )}
        </Flex>

        <hr />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <SellModal
            isOpen={isSellModalOpen}
            onClose={handleSellModalClose}
            productId={selectedProductId}
            onDelete={handleDeleteProduct}
          />

          {searchedProducts.map((product) => (
            <div
              key={product.id}
              className="relative overflow-hidden transition duration-300 transform bg-gray-100 rounded-md shadow-md hover:shadow-lg"
            >
              <div className="relative group">
                <img
                  src={`${server}${product.image[0].image}`}
                  alt={product.productName}
                  className="object-cover w-full h-40 sm:h-48 md:h-56 transition-transform transform-gpu group-hover:scale-105"
                />
                
              </div>
              <div className="p-3">
                <div className="flex items-center mb-2 justify-between">
                  <span className="text-base font-semibold mb-2">
                    {product.productName.length > 20
                      ? `${product.productName.slice(0, 20)}...`
                      : product.productName}
                  </span>
                  <div className="flex items-center">
                    <button
                      className={`ml-2 text-red-500`}
                      onClick={() =>
                        handleLikeClick(product.id, product.productName)
                      }
                    >
                      <FaHeart />
                    </button>
                    <span className="ml-1 text-sm text-gray-500">
                      {product.likes.length}
                    </span>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-base font-bold mr-2 text-blue-500">
                    Rs {product.ratedPrice.slice(0,-3)}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice !== product.ratedPrice && (
                      <span className="text-xs text-red-500 line-through">
                        Rs {product.originalPrice.slice(0,-3)}
                      </span>
                    )}
                </div>
                {product.location && (
                  <div className="text-sm text-gray-500">
                    Location: {product.location}
                  </div>
                )}
              </div>
              {isProductEditable(product) ? (
                  <div className="mb-2 text-center">
                  <Button
                    size="sm"
                 
                    colorScheme="teal"
              
                    onClick={() => handleEditClick(product.id)}
                  >
                    Edit
                  </Button>
                  </div>
                ):(
              <div className="mb-2 text-center">
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() =>
                    handlebuynowclick(product.id, product.productName)
                  }
                >
                  Buy Now
                </Button>
              </div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecondHand;
