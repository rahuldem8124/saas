import React from 'react';
import { Check, Clock, Package, Truck, Home, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const TrackingPage = () => {
  const steps = [
    { name: 'Order Placed', icon: <Package size={24} />, status: 'completed', time: '10:30 AM' },
    { name: 'Payment Confirmed', icon: <Check size={24} />, status: 'completed', time: '10:35 AM' },
    { name: 'Baking', icon: <Clock size={24} />, status: 'current', time: 'In Progress' },
    { name: 'Out for Delivery', icon: <Truck size={24} />, status: 'upcoming', time: 'Pending' },
    { name: 'Delivered', icon: <Home size={24} />, status: 'upcoming', time: 'Pending' },
  ];

  return (
    <div style={{ padding: '60px 5% 6rem', maxWidth: '1100px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '60px' }}>
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
          ORDER IN PROGRESS 🧁
        </motion.div>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.2rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>Track Your Cake</h1>
        <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', opacity: 0.8 }}>Order ID: <b>#CF-88291</b> • Estimated Arrival: <b>04:30 PM Today</b></p>
      </header>

      {/* Progress Timeline */}
      <section className="card" style={{ padding: '5rem 3rem', marginBottom: '4rem', background: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          position: 'relative',
          padding: '0 1rem'
        }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '5rem',
            right: '5rem',
            height: '6px',
            backgroundColor: 'var(--color-cream)',
            zIndex: 0,
            borderRadius: '10px'
          }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ height: '100%', background: 'var(--gradient-pink)', borderRadius: '10px', boxShadow: 'var(--shadow-glow)' }}
            ></motion.div>
          </div>

          {steps.map((step, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '2rem',
              zIndex: 1,
              flex: 1
            }}>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '24px',
                  backgroundColor: step.status === 'completed' ? 'var(--color-pink)' : step.status === 'current' ? 'white' : 'var(--color-cream)',
                  border: step.status === 'current' ? '3px solid var(--color-pink)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.status === 'completed' ? 'white' : 'var(--color-brown)',
                  boxShadow: step.status === 'current' ? 'var(--shadow-glow)' : step.status === 'completed' ? 'var(--shadow-soft)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {step.icon}
              </motion.div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: step.status === 'upcoming' ? 'var(--color-brown-light)' : 'var(--color-brown-dark)' }}>{step.name}</div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: step.status === 'current' ? 'var(--color-pink)' : 'var(--color-brown)', 
                  opacity: step.status === 'upcoming' ? 0.4 : 0.8,
                  fontWeight: 700,
                  marginTop: '0.4rem'
                }}>
                  {step.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        {/* Order Details */}
        <motion.div whileHover={{ y: -5 }} className="card" style={{ padding: '3rem', background: 'white' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 800 }}>Order Summary</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
              <img 
                src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=200&q=80" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--color-brown-dark)' }}>Velvet Rose Dream</div>
              <div style={{ fontSize: '1rem', color: 'var(--color-brown)', fontWeight: 600, marginTop: '0.4rem' }}>Weight: 1kg</div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: 'var(--color-pink)', 
                background: 'var(--color-cream)', 
                padding: '0.4rem 0.8rem', 
                borderRadius: '8px',
                display: 'inline-block',
                marginTop: '0.8rem',
                fontWeight: 700
              }}>
                "Happy Birthday Sarah! 🎂"
              </div>
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
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-brown-dark)' }}>Sarah Johnson</div>
              <div style={{ fontSize: '1rem', color: 'var(--color-brown)', opacity: 0.8, marginTop: '0.8rem', lineHeight: 1.6, fontWeight: 500 }}>
                456 Artisan Avenue, Apt 12B<br />
                Sweet City, NY 10001<br />
                <span style={{ color: 'var(--color-pink)', fontWeight: 700 }}>+1 (555) 987-6543</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackingPage;

