import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Default to admin or saved role
  const [role, setRole] = useState(() => {
    return localStorage.getItem('hackguard_role') || 'admin';
  });

  const [user, setUser] = useState(() => {
    const savedRole = localStorage.getItem('hackguard_role') || 'admin';
    return mockUsers[savedRole] || mockUsers.admin;
  });

  const switchRole = (newRole) => {
    if (!mockUsers[newRole]) return;
    setRole(newRole);
    setUser(mockUsers[newRole]);
    localStorage.setItem('hackguard_role', newRole);
    localStorage.setItem('hackguard_token', `hg_token_${newRole}_mock_signature`);
  };

  const login = (email, requestedRole = 'participant') => {
    const chosenRole = mockUsers[requestedRole] ? requestedRole : 'participant';
    setRole(chosenRole);
    const updatedUser = {
      ...mockUsers[chosenRole],
      email: email || mockUsers[chosenRole].email,
    };
    setUser(updatedUser);
    localStorage.setItem('hackguard_role', chosenRole);
    localStorage.setItem('hackguard_token', `hg_token_${chosenRole}_mock_signature`);
  };

  const logout = () => {
    switchRole('participant');
  };

  useEffect(() => {
    localStorage.setItem('hackguard_role', role);
    localStorage.setItem('hackguard_token', `hg_token_${role}_mock_signature`);
  }, [role]);

  return (
    <AuthContext.Provider value={{ user, role, switchRole, login, logout, isAuthenticated: true }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
