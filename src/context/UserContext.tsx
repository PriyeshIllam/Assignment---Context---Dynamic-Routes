import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { UserType } from "../data/users";

// Define the shape of our UserContext
type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  favourites: string[];
  setFavourites: React.Dispatch<React.SetStateAction<string[]>>;
  logout: () => void;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);

  // Logout helper resets user and favourites
  const logout = () => {
    setUser(null);
    setFavourites([]);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, favourites, setFavourites, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume UserContext safely
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
