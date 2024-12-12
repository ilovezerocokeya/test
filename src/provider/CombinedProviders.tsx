"use client";

import React from "react";
import Provider from "./Provider";
import ContextProvider from "./ContextProvider";
import { UserProvider } from "./UserContextProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const CombinedProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ContextProvider>
          <Provider>{children}</Provider>
        </ContextProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default CombinedProviders;
