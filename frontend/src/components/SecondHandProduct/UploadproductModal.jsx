import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Box,
  useToast,
  Image,
} from "@chakra-ui/react";
import server from "../../utils/server";
import axios from "axios";

function UploadProductModal({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        originalPrice: "",
        ratedPrice: "",
        photos: [], // Array to store selected image files
        location: "",
        contactInfo: "",
        warranty: "",
        guarantee: "",
      });
    
      const toast = useToast();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handlePhotoUpload = (e) => {
        const files = e.target.files;
    
        // Check if the total number of selected files is within the limit (5)
        if (files.length + formData.photos.length > 5) {
          toast({
            title: "Error",
            description: "You can only upload up to 5 photos.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }
    
        // Check the size of each file
        for (const file of files) {
          if (file.size > 2 * 1024 * 1024) {
            toast({
              title: "Error",
              description: "Each photo should be less than 2MB.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            return;
          }
        }
    
        // Create an array of file objects from the FileList
        const fileArray = Array.from(files);
    
        // Update the state with the new array of files
        setFormData((prevData) => ({
          ...prevData,
          photos: [...prevData.photos, ...fileArray],
        }));
      };
    
      const handleRemovePhoto = (index) => {
        // Remove the selected photo from the array
        const updatedPhotos = [...formData.photos];
        updatedPhotos.splice(index, 1);
    
        // Update the state with the modified array
        setFormData((prevData) => ({
          ...prevData,
          photos: updatedPhotos,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const formDataToSend = new FormData();
    
          // Append non-file data to FormData
          for (const key in formData) {
            if (key !== "photos") {
              formDataToSend.append(key, formData[key]);
            }
          }
    
          // Append each file as binary data to FormData
          formData.photos.forEach((photo, index) => {
            formDataToSend.append(`photo_${index}`, photo);
          });
    
          const response = await axios.post(`${server}/upload/`, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    
          if (response.status === 201) {
            // Handle success, e.g., close the modal or show a success message
            onClose();
            window.location.reload();
          } else {
            // Handle error, e.g., show an error message
            console.error(response.data);
          }
        } catch (error) {
          console.error("Error during API call:", error);
        }
      };
    

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Original Price</FormLabel>
                <Input
                  type="text"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Rated Price</FormLabel>
                <Input
                  type="text"
                  name="ratedPrice"
                  value={formData.ratedPrice}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Photos (up to 5, max 2MB each)</FormLabel>
                <Input
                  type="file"
                  name="photos"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
                <VStack spacing={2} mt={2} className="flex flex-row ">
                  {formData.photos.map((photo, index) => (
                    <Box key={index} position="relative">
                      <Image
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index}`}
                        maxH="75px"
                        maxW="75px"
                      />
                      <Button
                        size="sm"
                        position="absolute"
                        top="0"
                        right="0"
                        onClick={() => handleRemovePhoto(index)}
                        color="red"
                      >
                        X
                      </Button>
                    </Box>
                  ))}
                </VStack>
              </FormControl>

              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Contact Info</FormLabel>
                <Input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Warranty (for electronic products)</FormLabel>
                <Input
                  type="text"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Guarantee (for electronic products)</FormLabel>
                <Input
                  type="text"
                  name="guarantee"
                  value={formData.guarantee}
                  onChange={handleChange}
                />
              </FormControl>

              <Button type="submit" colorScheme="teal">
                Submit
              </Button>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          {/* Add any additional footer elements here */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UploadProductModal;
