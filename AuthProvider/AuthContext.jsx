import { useState } from 'react';
import { AuthContext } from './createContext';

// Create context


// Create provider component
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


