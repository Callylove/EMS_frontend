// AuthContext.js
import  { createContext, useState } from 'react';

// Create context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// Create provider component
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || null);

  const login = (userRole) => {
    setRole(userRole);
    localStorage.setItem('role', userRole);  // Persist role
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('role');  // Clear role
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
