import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackingPage from './pages/TrackingPage';
import AdminDashboard from './pages/AdminDashboard';
import OrderManagement from './pages/OrderManagement';
import AdminCustomers from './pages/AdminCustomers';
import AdminPayments from './pages/AdminPayments';
import AdminProducts from './pages/AdminProducts';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminDelivery from './pages/AdminDelivery';
import AdminCoupons from './pages/AdminCoupons';
import AdminSettings from './pages/AdminSettings';
import CartPage from './pages/CartPage';
import BirthdayPage from './pages/BirthdayPage';
import WeddingPage from './pages/WeddingPage';
import ExclusivesPage from './pages/ExclusivesPage';
import CustomPage from './pages/CustomPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import FavoritesPage from './pages/FavoritesPage';
import ProtectedRoute from './components/ProtectedRoute';

// Multi-Tenant SaaS Page Imports
import SaaSPage from './pages/SaaSPage';
import TenantStorefront from './pages/TenantStorefront';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import CommunicationHub from './pages/CommunicationHub';

// Simple placeholder components for missing pages
const ContactPage = () => <div style={{ padding: '120px 5%' }}><h1>Contact Us</h1><p>Email: hello@cakeflow.com</p></div>;
const FAQPage = () => <div style={{ padding: '120px 5%' }}><h1>FAQs</h1><p>Coming soon...</p></div>;
const TermsPage = () => <div style={{ padding: '120px 5%' }}><h1>Terms of Service</h1><p>Our standard terms apply.</p></div>;

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const location = useLocation();
  
  // Hide Navbar and Footer for Admin Dashboards and Super Admin dashboard
  const isPlainCustomerRoute = 
    !location.pathname.startsWith('/admin') && 
    !location.pathname.startsWith('/super-admin');

  console.log("App.jsx: Rendering application...", location.pathname);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      {isPlainCustomerRoute && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/store/cakeflow" element={<Navigate to="/" replace />} />
          <Route path="/birthday" element={<BirthdayPage />} />
          <Route path="/wedding" element={<WeddingPage />} />
          <Route path="/exclusives" element={<ExclusivesPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/tracking/:id" element={<TrackingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          
          {/* SaaS Portal routes redirected to root */}
          <Route path="/saas" element={<Navigate to="/" replace />} />
          <Route path="/store/:businessId" element={<Navigate to="/" replace />} />
          <Route path="/super-admin" element={<Navigate to="/" replace />} />

          {/* Admin Routes protected with ProtectedRoute wrapper */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><OrderManagement /></ProtectedRoute>} />
          <Route path="/admin/customers" element={<ProtectedRoute><AdminCustomers /></ProtectedRoute>} />
          <Route path="/admin/payments" element={<ProtectedRoute><AdminPayments /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/delivery" element={<ProtectedRoute><AdminDelivery /></ProtectedRoute>} />
          <Route path="/admin/coupons" element={<ProtectedRoute><AdminCoupons /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/communication" element={<ProtectedRoute><CommunicationHub /></ProtectedRoute>} />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>
      {isPlainCustomerRoute && <Footer />}
    </div>
  );
}

export default App;
