import { useState, useEffect } from "react";
import axios from "axios";
import server from "./server";
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

export const saveRefreshToken = (token) => {
  localStorage.setItem("refresh_token", token);
};

// Function to remove JWT token from local storage
export const removeAuthToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token")
  setAuthToken(null);
};

// Function to get JWT token from local storage
export const getAuthToken = () => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {

  return localStorage.getItem("refreshToken");
};

export const  useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${server}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const refreshToken = getRefreshToken();
            const refreshResponse = await axios.post(
              `${server}/refresh-token`,
              {
                refreshToken,
              }
            );

            const newAccessToken = refreshResponse.data.accessToken;
            setAuthToken(newAccessToken);
            fetchUserData();
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            // Handle refresh token error, e.g., redirect to login page
          }
        } else {
          // Handle other errors
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (token) {
      setAuthToken(token);
      fetchUserData();
      console.log("Token exists:", token);
    } else {
      console.log("Token does not exist");
    }
  }, []);

  

  if(user) return user;
  else return null;
};


export const  useAuthSeller = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${server}/seller/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const refreshToken = getRefreshToken();
            const refreshResponse = await axios.post(
              `${server}/refresh-token`,
              {
                refreshToken,
              }
            );

            const newAccessToken = refreshResponse.data.accessToken;
            setAuthToken(newAccessToken);
            fetchUserData();
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            // Handle refresh token error, e.g., redirect to login page
          }
        } else {
          // Handle other errors
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (token) {
      setAuthToken(token);
      fetchUserData();
      console.log("Token exists:", token);
    } else {
      console.log("Token does not exist");
    }
  }, []);

  

  if(user) return user;
  else return null;
};

// Function to set the JWT token in the Authorization header for Axios requests
