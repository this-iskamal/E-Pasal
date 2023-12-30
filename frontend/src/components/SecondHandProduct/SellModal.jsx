// SellModal.js
import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import axios from "axios";
import server from "../../utils/server";

const SellModal = ({ isOpen, onClose, productId, onDelete }) => {
  const [isSold, setIsSold] = useState(false);

  const handleSell = async () => {
    try {
      // Make an API call to update the product status (sold or not)
      await axios.delete(`${server}/second-products/${productId}/`, { sold: isSold });

      // If the product is sold, trigger the onDelete callback to delete the product
      if (isSold) {
        onDelete(productId);
      }

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sell Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Is the product sold?</FormLabel>
            <RadioGroup onChange={(e) => setIsSold(e === "true")} value={isSold.toString()}>
              <Stack direction="row">
                <Radio value="true">Yes</Radio>
                <Radio value="false">No</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Button colorScheme="teal" mt={4} onClick={handleSell}>
            Confirm
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SellModal;
