import * as React from "react";
import App from "./App";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from "@chakra-ui/react";

export default function AppUi() {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </NextUIProvider>
  );
}
