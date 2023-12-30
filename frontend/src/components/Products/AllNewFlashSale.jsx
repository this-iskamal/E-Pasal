import React, { useState, useEffect } from "react";
import Navbartest from "../Navbar/Navbartest";
import axios from "axios";
import server from "../../utils/server";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Carousel,
} from "react-bootstrap";
import Autosuggest from "react-autosuggest";

function AllNewArrivals() {
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${server}/api/products/search/?query=${searchQuery}`
        );
        setProducts(response.data);

        // Extract unique categories if categories state is empty
        if (categories.length === 0) {
          const uniqueCategories = [
            ...new Set(response.data.map((product) => product.category)),
          ];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${server}/api/products/search/?query=${searchQuery}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      const uniqueCategories = [
        ...new Set(products && products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    // Fetch suggestions from the backend based on the current input value
    axios
      .get(`${server}/api/products/search/?query=${value}`)
      .then((response) => setSuggestions(response.data))
      .catch((error) => console.error("Error fetching suggestions:", error));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSuggestionSelected = (_, { suggestion }) => {
    // Redirect to the selected product page
    window.open(
      `/products/${suggestion.product_name}/${suggestion.id}`,
      "_self"
    );
  };

  const getSuggestionValue = (suggestion) => suggestion.product_name;

  const renderSuggestion = (suggestion) => (
    <div
      style={{
        
        backgroundColor: "white",
        border: "1px solid #ced4da",
        cursor: "pointer",
        transition: "background-color 0.3s", // Add a transition for a smooth effect
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#f8e9fa"; // Change to your desired hover color
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "white"; // Restore the original background color
      }}
    >
        <div >
          {suggestion.product_name}  
        </div>
      
    </div>
  );

  const handlebuynowclick = (id, name) => {
    window.open(`/products/${name}/${id}`, "_self");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === "All" ? null : category); // Set the selected category
  };

  

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div style={{ backgroundColor: "#F3EEEA" }}>
      <Navbartest />
      <div
        className="container p-2 mb-1 h-100"
        style={{ backgroundColor: "#F3EEEA" }}
      >
        <Container className="my-3">
          <div className=" flex flex-row mb-2  justify-content-center">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
              onSuggestionsClearRequested={handleSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              highlightFirstSuggestion={true}
              focusInputOnSuggestionClick={true}
              inputProps={{
                placeholder: "Enter keywords",
                value: searchQuery,
                onChange: handleInputChange,
                style: {
                  width: "100%",
                  height: "38px",
                  borderRadius: "5px 0 0 5px", // Adjust the width as needed
                  border: "1px solid #ced4da", // Outline color
                  borderTopRightRadius: "0", // Remove border radius on the right side
                },
              }}
              onSuggestionSelected={handleSuggestionSelected}
              suggestionsContainerProps={{
                style: {
                  position: "absolute",
                  top: "calc(100% + 5px)", // Adjust the spacing between input and suggestions
                  width: "100%",
                  maxHeight: "2px", // Adjust the max height as needed
                  overflowY: "auto",
                  border: "1px solid #ced4da", // Outline color
                  borderRadius: "0 0 5px 5px", // Add border radius to the bottom
                },
              }}
            />

            <Button
              variant="primary"
              type="button"
              onClick={handleSearch}
              style={{ borderRadius: "0 5px 5px 0", height: "38px" }}
            >
              Search
            </Button>
          </div>
        </Container>

        <div style={{ backgroundColor: "white" }} className="p-2 rounded-md">
          <div className="m-3 mb-4">
            <div className="flex space-x-2  items-center justify-center">
              {/* Add the "All" button at the beginning */}
              <Button
                variant={selectedCategory ? "outline-primary" : "primary"}
                onClick={() => handleCategoryClick("All")}
              >
                All
              </Button>

              {loading ? (
                <p>Loading...</p>
              ) : (
                categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={
                      category === selectedCategory
                        ? "primary"
                        : "outline-primary"
                    }
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Button>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative overflow-hidden transition duration-300 transform bg-gray-100 rounded-md shadow-md hover:shadow-lg"
                onClick={() =>
                  handlebuynowclick(product.id, product.product_name)
                }
              >
                <div className="relative group">
                  <img
                    src={`${server}${product.image[0].image}`}
                    alt={product.product_name}
                    className="object-cover w-full h-40 sm:h-48 md:h-56 transition-transform transform-gpu group-hover:scale-105"
                  />
                  {product.discountRate && product.discountRate > 0 && (
                    <div className="absolute top-0 left-0 p-2 bg-blue-500 text-white rounded-bl-md">
                      <span className="text-xs font-semibold">
                        Save Rs {product.discountRate.slice(0, -3)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-base font-semibold mb-2">
                    {product.product_name.length > 20
                      ? `${product.product_name.slice(0, 20)}...`
                      : product.product_name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <span className="text-base font-bold mr-2 text-blue-500">
                      Rs {product.price - product.discountRate}
                    </span>
                    {product.discountRate && product.discountRate > 0 && (
                      <span className="text-xs text-red-500 line-through">
                        Rs {product.price.slice(0, -3)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={
                        product.freeDelivery ? "text-green-500" : "text-red-500"
                      }
                    >
                      {product.freeDelivery
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
                  {product.discount_percent !== undefined &&
                    product.discount_percent > 0 && (
                      <div className="mt-1 text-xs text-gray-600">
                        {`Discount: ${product.discount_percent.toFixed(2)}%`}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllNewArrivals;
