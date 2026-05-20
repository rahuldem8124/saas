import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Clock, Package, Truck, Home, MapPin, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const TrackingPage = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Poll/query localStorage for status sync
    const checkOrder = () => {
      try {
        const orders = JSON.parse(localStorage.getItem('cake_orders') || '[]');
        const found = orders.find(o => o.id === id);
        if (found) {
          setOrder(found);
        } else {
          // If no order found, let's look for any order, or set a beautiful mock fallback
          if (orders.length > 0) {
            setOrder(orders[0]);
          } else {
            // Mock fallback order so we never show a blank page
            const fallback = {
              id: id || 'CF-88291',
              customer: 'Sarah Johnson',
              email: 'sarah@example.com',
              cake: 'Velvet Rose Dream',
              amount: '$48.50',
              status: 'Baking',
              date: 'May 18, 2026',
              deliverySlot: { date: '2026-05-20', time: 'Afternoon (12:00 PM - 04:00 PM)' },
              address: '456 Artisan Avenue, Apt 12B, Sweet City, NY 10001',
              notes: 'Leave with receptionist.',
              items: [
                { id: 1, name: 'Velvet Rose Dream', price: '$45.00', weight: '1kg', quantity: 1, image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=200&q=80', customMessage: 'Happy Birthday Sarah! 🎂' }
              ]
            };
            setOrder(fallback);
          }
        }
      } catch(e) {
        console.error(e);
      }
    };

    checkOrder();
    const interval = setInterval(checkOrder, 3000); // sync status changes in real-time every 3 seconds
    return () => clearInterval(interval);
  }, [id]);

  if (!order) {
    return (
      <div style={{ padding: '120px 5%', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Loading Order tracking details...</h2>
      </div>
    );
  }

  // Map order status to numeric steps
  // Placed -> Confirmed -> Baking -> Out for Delivery -> Delivered
  const statusHierarchy = ['Placed', 'Confirmed', 'Baking', 'Out for Delivery', 'Delivered'];
  const currentIndex = statusHierarchy.indexOf(order.status);
  
  const steps = [
    { name: 'Order Placed', icon: <Package size={24} />, status: currentIndex >= 0 ? (currentIndex === 0 ? 'current' : 'completed') : 'upcoming', time: order.date },
    { name: 'Payment Confirmed', icon: <Check size={24} />, status: currentIndex >= 1 ? (currentIndex === 1 ? 'current' : 'completed') : 'upcoming', time: 'Instant' },
    { name: 'Baking', icon: <Clock size={24} />, status: currentIndex >= 2 ? (currentIndex === 2 ? 'current' : 'completed') : 'upcoming', time: order.status === 'Baking' ? 'In Progress' : (currentIndex > 2 ? 'Completed' : 'Pending') },
    { name: 'Out for Delivery', icon: <Truck size={24} />, status: currentIndex >= 3 ? (currentIndex === 3 ? 'current' : 'completed') : 'upcoming', time: order.status === 'Out for Delivery' ? 'En Route' : (currentIndex > 3 ? 'Completed' : 'Pending') },
    { name: 'Delivered', icon: <Home size={24} />, status: currentIndex === 4 ? 'completed' : 'upcoming', time: order.status === 'Delivered' ? 'Success' : 'Pending' },
  ];

  // Calculate percentage for visual connector line
  const completedSteps = steps.filter(s => s.status === 'completed' || s.status === 'current').length;
  const progressPercent = ((completedSteps - 1) / (steps.length - 1)) * 100;

  return (
    <div style={{ padding: '60px 5% 6rem', maxWidth: '1100px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '60px' }}>
        <Link to="/store/cakeflow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brown)', textDecoration: 'none', fontWeight: 700, marginBottom: '2rem', opacity: 0.6 }}>
          <ChevronLeft size={20} /> Back to Home
        </Link>
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              display: 'inline-block', 
              padding: '0.8rem 2rem', 
              background: 'var(--color-cream)', 
              borderRadius: 'var(--radius-xl)',
              color: 'var(--color-pink)',
              fontWeight: 800,
              marginBottom: '2rem',
              fontSize: '1rem'
            }}
          >
            ORDER STATUS: {order.status.toUpperCase()} 🧁
          </motion.div>
        </div>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.2rem', fontWeight: 900, color: 'var(--color-brown-dark)', letterSpacing: '-1.5px' }}>Track Your Cake</h1>
        <p style={{ color: 'var(--color-brown)', fontSize: '1.25rem', opacity: 0.8, fontWeight: 600 }}>
          Order ID: <span style={{ color: 'var(--color-pink)' }}>#{order.id}</span> • Delivery Slot: <b>{order.deliverySlot?.date} ({order.deliverySlot?.time})</b>
        </p>
      </header>

      {/* Progress Timeline */}
      <section className="card" style={{ padding: '5rem 3rem', marginBottom: '4rem', background: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          gap: isMobile ? '3rem' : '0',
          position: 'relative',
          padding: isMobile ? '0' : '0 1rem'
        }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            top: isMobile ? '0' : '30px',
            bottom: isMobile ? '0' : 'auto',
            left: isMobile ? '31px' : '5rem',
            right: isMobile ? 'auto' : '5rem',
            height: isMobile ? '100%' : '6px',
            width: isMobile ? '6px' : 'auto',
            backgroundColor: 'var(--color-cream)',
            zIndex: 0,
            borderRadius: '10px'
          }}>
            <motion.div 
              initial={isMobile ? { height: 0 } : { width: 0 }}
              animate={isMobile ? { height: `${progressPercent}%` } : { width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ 
                height: isMobile ? '0%' : '100%', 
                width: isMobile ? '100%' : '0%', 
                background: 'var(--gradient-pink)', 
                borderRadius: '10px', 
                boxShadow: 'var(--shadow-glow)' 
              }}
            ></motion.div>
          </div>

          {steps.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            return (
              <div key={index} style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'row' : 'column', 
                alignItems: isMobile ? 'flex-start' : 'center', 
                gap: isMobile ? '1.5rem' : '2rem',
                zIndex: 1,
                flex: 1
              }}>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '24px',
                    backgroundColor: isCompleted ? 'var(--color-pink)' : isCurrent ? 'white' : 'var(--color-cream)',
                    border: isCurrent ? '3px solid var(--color-pink)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isCompleted ? 'white' : (isCurrent ? 'var(--color-pink)' : 'var(--color-brown)'),
                    boxShadow: isCurrent ? 'var(--shadow-glow)' : isCompleted ? 'var(--shadow-soft)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {step.icon}
                </motion.div>
                <div style={{ textAlign: isMobile ? 'left' : 'center', paddingTop: isMobile ? '0.5rem' : '0' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: step.status === 'upcoming' ? 'var(--color-brown-light)' : 'var(--color-brown-dark)' }}>{step.name}</div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: isCurrent ? 'var(--color-pink)' : 'var(--color-brown)', 
                    opacity: step.status === 'upcoming' ? 0.4 : 0.8,
                    fontWeight: 700,
                    marginTop: '0.4rem'
                  }}>
                    {step.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dynamic Summary Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        
        {/* Order Details */}
        <motion.div whileHover={{ y: -5 }} className="card" style={{ padding: '3rem', background: 'white' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 800 }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {order.items?.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', flexShrink: 0 }}>
                  <img 
                    src={item.image} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-brown-dark)' }}>{item.name}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-brown)', fontWeight: 600, marginTop: '0.2rem' }}>Weight: {item.weight} • Qty: {item.quantity}</div>
                  {item.customMessage && (
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--color-pink)', 
                      background: 'var(--color-cream)', 
                      padding: '0.3rem 0.6rem', 
                      borderRadius: '6px',
                      display: 'inline-block',
                      marginTop: '0.4rem',
                      fontWeight: 700
                    }}>
                      "{item.customMessage}"
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div style={{ borderTop: '2px dashed var(--color-cream)', paddingTop: '1.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 900 }}>
              <span>Paid Total:</span>
              <span style={{ color: 'var(--color-pink)' }}>{order.amount}</span>
            </div>
          </div>
        </motion.div>

        {/* Delivery Info */}
        <motion.div whileHover={{ y: -5 }} className="card" style={{ padding: '3rem', background: 'white' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 800 }}>Delivery Information</h3>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--color-cream)', padding: '1rem', borderRadius: '50%' }}>
              <MapPin size={28} color="var(--color-pink)" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-brown-dark)' }}>{order.customer}</div>
              <div style={{ fontSize: '1rem', color: 'var(--color-brown)', opacity: 0.8, marginTop: '0.8rem', lineHeight: 1.6, fontWeight: 500 }}>
                {order.address}<br />
                <span style={{ color: 'var(--color-pink)', fontWeight: 700 }}>{order.email}</span>
              </div>
              {order.notes && (
                <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-brown)', borderLeft: '3px solid var(--color-pink)', paddingLeft: '1rem', fontStyle: 'italic' }}>
                  <b>Notes:</b> "{order.notes}"
                </div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default TrackingPage;
