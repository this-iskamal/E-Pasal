import * as React from "react";
import App from "./App";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();

export default function AppUi() {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </NextUIProvider>
    </QueryClientProvider>  
  );
}
