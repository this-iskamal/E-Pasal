import React from "react";
import Navbartest from "../Navbar/Navbartest";
import styled from "styled-components";
import {
  HStack,
  PinInput,
  PinInputField,
  Card,
  Heading,
  Button,
  CardHeader,
  CardBody,
  Image,
  Stack,
  Text,
  CardFooter,
  Stat,
  StatLabel,
  StatNumber
} from "@chakra-ui/react";

function Confirmation() {
  return (
    <Container>
      <Navbartest />

      <Card align="center" className="mt-10 w-50 shadow-md">
        <CardHeader>
          <Heading size="md"> Confirm Account</Heading>
        </CardHeader>
        <CardBody>
          <Text>A text message containing otp sent to your phone.</Text>
          <Text className="mb-6">+9779846944680</Text>
          <HStack className="flex flex-row justify-center align-center">
            <PinInput otp>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue">Confirm</Button>
        </CardFooter>
      </Card>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        className="rounded-lg shadow-lg mt-5"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">Account confirmed successfully</Heading>
            <Stat className="mt-1">
              <StatLabel>kamal.gautam.36808@gmail.com</StatLabel>
              <StatNumber>Kamal Gautam</StatNumber>
            </Stat>
          </CardBody>

          <CardFooter>
            <Button variant="solid" colorScheme="blue">
              Done
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: #c9d6df;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Confirmation;
