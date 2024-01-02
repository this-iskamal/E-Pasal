import React, { useState, useEffect } from "react";
import { useAuth } from "../../utils/JWT";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
import server from "../../utils/server";
import { useToast } from "@chakra-ui/react";
import localserver from "../../utils/localserver";

function Cartitems() {
  const path = "https://uat.esewa.com.np/epay/main";

  const user = useAuth();
  const toast = useToast();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setcartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    axios.get(`${server}/get-cart`, { user: user && user.id }).then((res) => {
      setcartItems(res.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        toast({
          title: "Please login first",
          status: "error",
          isClosable: "true",
        });
        console.error(
          "User is not authorized. Redirect to login or show an error message."
        );
      } else {
        console.error("Error fetching cart:", error);
      }
    });
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const detailsPromises = cartItems.map((cartItem) =>
        axios.get(`${server}/api/products/productname/${cartItem.product_id}/`)
      );

      try {
        const detailsResponses = await Promise.all(detailsPromises);
        const productDetails = detailsResponses.map(
          (response) => response.data
        );
        setProductDetails(productDetails);
        console.log(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [cartItems]);

  useEffect(() => {
    // Calculate total price when product details or cart items change
    const calculateTotalPrice = () => {
      let total = 0;
      for (let i = 0; i < productDetails.length; i++) {
        const cartItem = cartItems[i];
        const product = productDetails[i];
        total += cartItem&&cartItem.quantity * parseFloat(product.price-product.discountRate);
      }
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [productDetails, cartItems]);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    axios
      .put(`${server}/update-cart/${cartItemId}/`, { quantity: newQuantity })
      .then((res) => {
        console.log(res);
        // Refresh the cart data
        axios
          .get(`${server}/get-cart`, { user: user && user.id })
          .then((res) => {
            setcartItems(res.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlecartdelete = (cartItemId) => {
    axios
      .delete(`${server}/delete-cart/${cartItemId}`)
      .then((res) => {
        console.log(res);
        // Refresh the cart data
        axios
          .get(`${server}/get-cart`, { user: user && user.id })
          .then((res) => {
            setcartItems(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

// Function to handle incrementing the quantity
const handleIncrementQuantity = (cartItemId) => {
  const cartItem = cartItems.find((item) => item.id === cartItemId);
  const product = productDetails.find((item) => item.id === cartItem.product_id);
  const newQuantity = cartItem.quantity + 1;  
  console.log(cartItem)
  // Check if the quantity doesn't exceed 10 and the product price doesn't exceed 3 lakh
  if (newQuantity <= 10 && newQuantity * parseFloat(product.price) <= 300000) {
    handleQuantityChange(cartItemId, newQuantity);
  } else {
    // Handle error or display a message indicating the limit is reached
    console.log("Quantity limit or price limit reached");
    toast({ 
      title: "Quantity limit or price limit reached", 
      status: "error", 
      duration: 5000, 
      isClosable: true 
    });
    
  }
};

// Function to handle decrementing the quantity
const handleDecrementQuantity = (cartItemId) => {
  const cartItem = cartItems.find((item) => item.id === cartItemId);
  const newQuantity = cartItem.quantity - 1;

  // Check if the quantity is greater than 0
  if (newQuantity > 0) {
    handleQuantityChange(cartItemId, newQuantity);
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

  return result ;
}
const isperson = useAuth();

const handlebuyclick = (path) => {
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
      amt: totalPrice,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: totalPrice,
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


  return (
    <section className="h-screen" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <a
                        href="#!"
                        className="text-body"
                        onClick={() => {
                          window.history.back();
                        }}
                      >
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                        shopping
                      </a>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {productDetails&&productDetails.length} items in your cart
                        </p>
                      </div>
                    </div>

                    {productDetails&&productDetails.map((product, index) => {
                      const cartItem = cartItems[index];
                      if (cartItem)
                      return (
                        <MDBCard className="mb-3">
                          <MDBCardBody>
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                              <div className="d-flex flex-row align-items-center mb-3 mb-md-0">
                                <div>
                                  <MDBCardImage
                                    src={`${server}/${product.image[0].image}`}
                                    fluid
                                    className="rounded-3"
                                    style={{ width: "65px", minWidth: "65px" }}
                                    alt="Shopping item"
                                  />
                                </div>
                                <div className="ms-3">
                                  <MDBTypography tag="h5">
                                    {product.product_name}
                                  </MDBTypography>
                                  <p className="small mb-0"> </p>
                                </div>
                              </div>

                              <div className="d-flex flex-row align-items-center">
                                <div className="flex-shrink-0">
                                  <div className="flex items-center">
                                    <div className="flex-1 max-w-xs mr-4">
                                      <div className="flex items-center justify-between border border-gray-300 rounded overflow-hidden">
                                        <button
                                          className="flex-1 p-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                                          onClick={() =>
                                            handleDecrementQuantity(cartItem.id)
                                          }
                                        >
                                          <i className="fas fa-minus"></i>
                                        </button>
                                        <div className="flex-1 text-center bg-gray-100 p-2 font-semibold">
                                          {cartItem.quantity}
                                        </div>
                                        <button
                                          className="flex-1 p-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                                          onClick={() =>
                                            handleIncrementQuantity(cartItem.id)
                                          }
                                        >
                                          <i className="fas fa-plus"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="flex-shrink-0"
                                  style={{ width: "80px" }}
                                >
                                  <MDBTypography tag="h5" className="mb-0">
                                    Rs {product.price.slice(0, -3)-product.discountRate}
                                  </MDBTypography>
                                </div>

                                <MDBIcon
                                  fas
                                  icon="trash-alt"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    handlecartdelete(cartItem.id);
                                  }}
                                />
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      );
                      else return null;
                    })}
                  </MDBCol>

                  <MDBCol lg="5" className="flex flex-col justify-center">
                    <MDBCard className="bg-primary text-white rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">Rs {totalPrice}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">Rs {totalPrice && 100}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">
                            Rs {totalPrice && totalPrice + 100}
                          </p>
                        </div>

                        <MDBBtn color="info" block size="lg">
                          <div className="d-flex justify-content-between" onClick={()=>{handlebuyclick(path)}}>
                            <span>Rs {totalPrice+100}</span>
                            <span>
                              Checkout{" "}
                              <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Cartitems;
