// useAuth.js (or wherever you are defining the custom hook)
import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // Import AuthContext, not AuthProvider

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext); // Use AuthContext here
};
