import React, { createContext, useState, useContext } from 'react';
import { User } from '../types';
import { currentUser as initialUser } from '../data/users';

type UserContextType = {
  currentUser: User;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Auto-logged in for demo

  const login = (email: string, password: string) => {
    // In a real app, we would make an API call to validate credentials
    // For demo purposes, we'll just set the user as logged in
    setIsAuthenticated(true);
    // In a real implementation, we would set the current user based on the login response
  };

  const logout = () => {
    setIsAuthenticated(false);
    // In a real app, we would clear any auth tokens or user data
  };

  return (
    <UserContext.Provider 
      value={{ 
        currentUser: currentUser as User, 
        login, 
        logout, 
        isAuthenticated,
        isAdmin: currentUser?.isAdmin || false
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};