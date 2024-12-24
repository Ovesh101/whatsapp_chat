import React, { createContext, useContext, useState, useEffect } from 'react';
import { init } from '@instantdb/react';

const APP_ID = import.meta.env.VITE_API_KEY;
const db = init({ appId: APP_ID });

// Create a User Context
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext); // Correctly accessing context here
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  // Directly calling useAuth hook to get the user
  const { user: authUser, isLoading: authLoading, error: authError } = db.useAuth();

  
  const { data: users, err } = db.useQuery({
    "$users": {}
  });
  

  
  



  useEffect(() => {

    
    if (authLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    if (authError) {
      setError(authError);
      setIsLoading(false);
    }

    if (authUser) {
      setUser(authUser); // Set the user when authentication is successful
    }
  }, [authUser, authLoading, authError]); // Run effect when any of these values change

  const signOut = async() => {
    await db.auth.signOut().then(() => {
      setUser(null); // Set user to null on sign out
    });
  };

  // Show loading or error state until auth is resolved
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Uh oh! {error.message}</div>;
  }

  return (
    <UserContext.Provider value={{ users ,  user, setUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
