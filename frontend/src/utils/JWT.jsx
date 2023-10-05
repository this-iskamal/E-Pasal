import axios from "axios";

// Function to set the JWT token in the Authorization header for Axios requests
export const setAuthToken = (token) => {
  if (token) {
    // Apply the token to every request header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete the Authorization header if there is no token
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Function to save JWT token in local storage
export const saveAuthToken = (token) => {
  localStorage.setItem("access_token", token);
  setAuthToken(token);
};

// Function to remove JWT token from local storage
export const removeAuthToken = () => {
  localStorage.removeItem("access_token");
  setAuthToken(null);
};

// Function to get JWT token from local storage
export const getAuthToken = () => {
  return localStorage.getItem("access_token");
};
