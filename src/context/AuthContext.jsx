import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cake_user');
      return savedUser ? JSON.parse(savedUser) : { role: 'admin', name: 'Flagship Seller', businessId: 'cakeflow' };
    } catch (e) {
      return { role: 'admin', name: 'Flagship Seller', businessId: 'cakeflow' };
    }
  });

  useEffect(() => {
    localStorage.setItem('cake_user', JSON.stringify(user));
  }, [user]);

  const switchRole = (newRole, businessId = 'cakeflow') => {
    setUser(prev => ({
      ...prev,
      role: newRole,
      businessId: newRole === 'admin' || newRole === 'seller' ? businessId : undefined
    }));
  };

  const loginSeller = (businessId, sellerName = 'Seller') => {
    setUser({
      role: 'admin', // Keep role as 'admin' so ProtectedRoute matches perfectly
      name: sellerName,
      businessId: businessId
    });
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'seller';
  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <AuthContext.Provider value={{ user, switchRole, loginSeller, isAdmin, isSuperAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
