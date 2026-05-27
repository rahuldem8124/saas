import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cake_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // Force pristine start: If the user has the legacy default admin session, clear and reset it to customer!
        if (parsed.role === 'admin' && parsed.name === 'Flagship Seller') {
          localStorage.removeItem('cake_user');
          localStorage.removeItem('saas_businesses');
          localStorage.removeItem('active_business_id');
          return { role: 'customer', name: 'Sarah Johnson' };
        }
        return parsed;
      }
      return { role: 'customer', name: 'Sarah Johnson' };
    } catch (e) {
      return { role: 'customer', name: 'Sarah Johnson' };
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
