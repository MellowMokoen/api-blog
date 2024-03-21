import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (username, password) => {
    const response = await axios.post("/api/login", { username, password });
    const { token } = response.data;
    // Save the token in local storage or state
    setCurrentUser({ ...currentUser, token }); // Simplified example
  };

  const value = { currentUser, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
