"use client";

import { useState, useContext, createContext, ReactNode } from "react";

// define the shape of the context data that will be provided
interface AppContextType {
  accessToken: string | null;
  setAccessToken: (value: string) => void;
}

// default value is undefined
const AppContext = createContext<AppContextType | undefined>(undefined);

// this will be the provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
