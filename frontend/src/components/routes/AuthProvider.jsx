import React, { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Retrieve the token from localStorage or cookies
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token
      const decoded = jwt_decode(token);
      setDecodedToken(decoded);
    }
    
    setIsLoading(false);

  }, []);

  if (isLoading) {
    // Render a loading state while the token is being fetched and decoded
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={decodedToken}>
      {children}
    </AuthContext.Provider>
  );
};
