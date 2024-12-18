// frontend/src/contexts/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage or via an API call
    const storedUser = localStorage.getItem('user'); // Ensure 'storedUser' is defined
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);
