import React, { useState, useEffect } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import StarRating from "./StarRating";
import { format } from "date-fns";
import axios from "axios";
import server from "../../utils/server";
import { useAuth } from "../../utils/JWT";
import { useToast } from "@chakra-ui/react";

function Review({ productId }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  // Assuming you have a way to get the logged-in user (e.g., from context or props)
  const loggedInUser = useAuth(); // Replace with your actual logic to get the logged-in user
  const MyCustomToast = ({ description, onClose }) => (
    <div
      style={{
        backgroundColor: "red",
        padding: "6px",
        borderRadius: "8px",
        color: "white",
        display: "flex",
        justifyContent: "center",
        
      }}
    >
      <p>{description}</p>
      <Button colorScheme="teal" size="sm" onClick={()=>{window.open('/registration','_self')}} ml={4}>
        Login
      </Button>
    </div>
  );
  const toast = useToast();


  const showToast = (description) => {

    toast({
      position: "bottom-right",
      duration: 5000,
      render: ({ onClose }) => (
        <MyCustomToast description={description} onClose={onClose} />
      ),
    });
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      comment,
      rating,
    };

    if (loggedInUser) {
      try {
        const response = await axios.post(
          `${server}/api/reviews/${productId}/`,
          newReview
        );
        console.log("Response:", response.data);
        getReviews();
      } catch (error) {
        console.error("Error creating review:", error);
      }

      setComment("");
      setRating(0);
    } else {
      showToast("Please login first");
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${server}/api/reviews/${(productId = reviewId)}/`);
      // Update the state by removing the deleted review
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(`${server}/api/reviews/${productId}/`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Box mt={8} p={4} bg="gray.100" rounded="md">
      <Heading as="h2" size="lg" mb={4} color="teal.500">
        Product Comments and Ratings
      </Heading>

      <form onSubmit={handleSubmit}>
        <Box mb={4}>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Add a Comment:
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="3"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={comment}
            onChange={handleCommentChange}
            required
          ></textarea>
        </Box>

        <Box mb={4}>
          <label className="block text-sm font-medium text-gray-700">
            Rating:
          </label>
          {/* Replace 'StarRating' with your actual Star Rating component */}
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
        </Box>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
      {reviews.map((review) => (
        <Box
          key={review.id}
          className="flex items-start p-2 mt-2 bg-white rounded-lg shadow-md"
        >
          <img
            src={`${server}${review.user.profileImage}`}
            alt={`${review.user.fullName}'s profile`}
            className="w-10 h-10 rounded-full object-cover mr-2"
          />
          <div>
            <p className="font-semibold text-md mb-1">{review.user.fullName}</p>
            <div className="flex items-center mb-1">
              <StarRating rating={review.rating} readOnly />
              <span className="ml-1 text-gray-500 text-sm">
                {review.rating}
              </span>
            </div>
            <p className="text-gray-700 mb-1 text-sm">{review.comment}</p>
            <p className="text-gray-500 text-xs">
              Commented on{" "}
              {format(new Date(review.created_at), "MMMM dd, yyyy")}
            </p>
            {loggedInUser && loggedInUser.id === review.user.id && (
              <Button
                onClick={() => handleDelete(review.id)}
                colorScheme="red"
                size="xs"
                mt={1}
              >
                Delete
              </Button>
            )}
          </div>
        </Box>
      ))}
    </Box>
  );
}

export default Review;
