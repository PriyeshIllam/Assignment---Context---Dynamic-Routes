import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { UserType } from "../data/users";

// Define the shape of our UserContext
type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  favourites: string[];
  setFavourites: React.Dispatch<React.SetStateAction<string[]>>;
  favouriteCategories: string[];
  toggleFavouriteCategory: (cat: string) => void;
   toggleFavouriteMeal: (mealId: string) => void;  //
  logout: () => void;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [favouriteCategories, setFavouriteCategories] = useState<string[]>([]);

  // Add/remove a category from favourites
  const toggleFavouriteCategory = (cat: string) => {
    setFavouriteCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
    const toggleFavouriteMeal = (mealId: string) => {
    setFavourites((prev) =>
        prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]
    );
    };
  // Logout helper resets everything
  const logout = () => {
    setUser(null);
    setFavourites([]);
    setFavouriteCategories([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        favourites,
        setFavourites,
        favouriteCategories,
        toggleFavouriteCategory,
        toggleFavouriteMeal, 
        logout,
      }}
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
