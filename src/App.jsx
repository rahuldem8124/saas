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
  const isAdminRoute = location.pathname.startsWith('/admin');

  console.log("App.jsx: Rendering application...", location.pathname);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
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
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/delivery" element={<AdminDelivery />} />
          <Route path="/admin/coupons" element={<AdminCoupons />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
