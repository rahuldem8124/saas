import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cake_user');
      return savedUser ? JSON.parse(savedUser) : { role: 'user', name: 'Guest' };
    } catch (e) {
      return { role: 'user', name: 'Guest' };
    }
  });

  useEffect(() => {
    localStorage.setItem('cake_user', JSON.stringify(user));
  }, [user]);

  const switchRole = (newRole) => {
    setUser(prev => ({ ...prev, role: newRole }));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, switchRole, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
