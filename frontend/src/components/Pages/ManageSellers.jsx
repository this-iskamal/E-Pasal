// ManageSellers.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Button as ChakraButton,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import axios from "axios";
import server from "../../utils/server";
import { useAuth } from "../../utils/JWT";

const ManageSellers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellers, setSellers] = useState([]);
  const isPerson = useAuth();

  useEffect(() => {
    axios
      .get(`${server}/getSellers`)
      .then((res) => {
        setSellers(res.data.sellers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteSeller = (sellerId) => {
    console.log(sellerId);
    axios
      .delete(`${server}/deleteSeller`, { data: { sellerId: sellerId } })
      .then((res) => {
        const updatedSellers = sellers.filter(
          (seller) => seller.id !== sellerId
        );
        setSellers(updatedSellers);
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleConfirmLegit = (sellerId) => {
    axios
      .put(`${server}/updateSeller`,{sellerId:sellerId})
      .then((res) => {
        const updatedSellers = sellers.map((seller) =>
          seller.id === sellerId ? { ...seller, seller_status: true } : seller
        );
        setSellers(updatedSellers);
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleViewCertificate = (certificate) => {
    window.open(`${server}${certificate}`, "_blank");
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Manage Sellers
      </Text>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sellers.map((seller) => (
            <Tr
              key={seller.id}
              bg={seller.seller_status ? "green.200" : "red.200"}
            >
              <Td>{seller.id}</Td>
              <Td>{seller.fullName}</Td>
              <Td>{seller.email}</Td>
              <Td>
                <IconButton
                  icon={<FaEdit />}
                  colorScheme="teal"
                  aria-label="Edit Seller"
                  onClick={() => {
                    setSelectedSeller(seller);
                    onOpen();
                  }}
                >
                  {!seller.seller_status && (
                    <>
                      <FaTrash ml={2} />
                      <FaCheck ml={2} />
                    </>
                  )}
                </IconButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={undefined}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirm Action
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {!selectedSeller?.seller_status
              ? `Do you want to confirm ${selectedSeller?.fullName} as a legitimate seller? The PAN number is ${selectedSeller?.pan}`
              : `Are you sure you want to delete ${selectedSeller?.fullName}?`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <ChakraButton
              colorScheme="red"
              onClick={() => handleDeleteSeller(selectedSeller?.id)}
            >
              Delete
            </ChakraButton>
            {!selectedSeller?.seller_status && (
              <ChakraButton
                colorScheme="green"
                ml={3}
                onClick={() => handleViewCertificate(selectedSeller?.sellerCertificate)}
              >
                View Certificate
              </ChakraButton>
            )}
            {!selectedSeller?.seller_status && (
              <ChakraButton
                colorScheme="green"
                ml={3}
                onClick={() => handleConfirmLegit(selectedSeller?.id)}
              >
                Confirm
              </ChakraButton>
            )}
            <ChakraButton ml={3} onClick={onClose}>
              Cancel
            </ChakraButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default ManageSellers;
