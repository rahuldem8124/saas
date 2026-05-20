import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';
import { Lock, Sparkles, CreditCard, Check, ShieldCheck, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const { businesses, subscribeToBusiness, selectBusiness } = useTenant();

  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];

  const [selectedPlan, setSelectedPlan] = useState('Pro');

  // If the user's business is already subscribed, let them through
  if (biz && biz.isSubscribed) {
    return children;
  }

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      billing: '/mo',
      desc: 'Perfect for small boutique creators testing interactive social checkouts.',
      features: [
        'Interactive Mobile Buyer View',
        'Standard Custom Fields Selector',
        'Manual WhatsApp Order Confirmations',
        'Up to 10 Products Active',
        'Basic Slate Analytics'
      ],
      icon: <Sparkles size={20} />,
      color: '#64748B',
      gradient: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)'
    },
    {
      name: 'Pro',
      price: '$79',
      billing: '/mo',
      desc: 'Highly recommended. Custom category structures, automated flows, multiple variants.',
      features: [
        'Everything in Starter',
        'Automated AI WhatsApp Bot Responses',
        'Category specific UX Widgets (e.g. Size arrays, color selectors)',
        'Unlimited Products & Live Order Persistence',
        'Full Order Status Processing Queue',
        'Priority Direct Dispatch Logs'
      ],
      icon: <Zap size={20} />,
      color: '#4F46E5',
      gradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      billing: '/mo',
      desc: 'For flagship merchants demanding absolute customization and high volume logistics.',
      features: [
        'Everything in Pro',
        'Automated Delhivery & Shiprocket Engine',
        'Bespoke Multi-Tenant Domain Names',
        'Custom SMS & Direct API Webhooks',
        'Dedicated 24/7 Account Consultant',
        '0% Platform Sales Commissions'
      ],
      icon: <Star size={20} />,
      color: '#F43F5E',
      gradient: 'linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)'
    }
  ];

  const handleSubscribe = (planName) => {
    subscribeToBusiness(activeBizId, planName);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 20%, rgba(255, 230, 235, 0.4) 0%, rgba(230, 240, 255, 0.4) 90%), #FFF8F3',
      padding: '4rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '700px' }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(242, 140, 163, 0.12)',
          color: '#F28CA3',
          padding: '0.6rem 1.2rem',
          borderRadius: '50px',
          fontSize: '0.85rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '1.5rem'
        }}>
          <Lock size={14} /> Gated Seller Suite
        </div>
        
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '3rem',
          fontWeight: 900,
          color: '#4A2C2A',
          margin: '0 0 1rem',
          lineHeight: 1.15
        }}>
          Unlock Operator Panel for <span style={{ color: '#4F46E5' }}>{biz?.name || activeBizId}</span>
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#64748B',
          fontWeight: 500,
          lineHeight: 1.6,
          margin: 0
        }}>
          You are currently accessing the storefront demo. To review product catalogs, accept custom orders, configure WhatsApp templates, and check customer databases, choose a subscription.
        </p>
      </motion.div>

      {/* Plans Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        width: '100%',
        maxWidth: '1200px',
        marginBottom: '4rem',
        alignItems: 'stretch'
      }}>
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.name;
          return (
            <motion.div
              key={plan.name}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedPlan(plan.name)}
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                borderRadius: '32px',
                padding: '3rem 2.5rem',
                border: isSelected ? `2.5px solid ${plan.color}` : '1.5px solid rgba(122, 78, 58, 0.08)',
                boxShadow: isSelected ? '0 20px 40px -10px rgba(79, 70, 229, 0.18)' : '0 10px 35px -5px rgba(74, 44, 42, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  color: 'white',
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Popular
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: isSelected ? plan.gradient : '#F3F4F6',
                    color: isSelected ? 'white' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s'
                  }}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      color: '#4A2C2A',
                      fontFamily: "'Outfit', sans-serif"
                    }}>{plan.name}</h3>
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>TRIAL INCLUDED</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5, marginBottom: '2rem', minHeight: '44px' }}>
                  {plan.desc}
                </p>

                {/* Pricing display */}
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2.5rem' }}>
                  <span style={{ fontSize: '3.2rem', fontWeight: 900, color: '#4A2C2A', letterSpacing: '-1px' }}>{plan.price}</span>
                  <span style={{ fontSize: '1rem', color: '#94A3B8', fontWeight: 700 }}>{plan.billing}</span>
                </div>

                {/* Features divider */}
                <div style={{ width: '100%', height: '1px', background: 'rgba(122, 78, 58, 0.08)', marginBottom: '2.5rem' }} />

                {/* Features List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '3rem' }}>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: isSelected ? 'rgba(79, 70, 229, 0.08)' : '#F3F4F6',
                        color: isSelected ? plan.color : '#94A3B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                        flexShrink: 0
                      }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: '0.92rem', color: '#4A2C2A', fontWeight: 600, lineHeight: 1.4 }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe(plan.name);
                }}
                style={{
                  width: '100%',
                  background: isSelected ? plan.gradient : '#FFFFFF',
                  color: isSelected ? 'white' : '#4A2C2A',
                  border: isSelected ? 'none' : '2px solid rgba(122, 78, 58, 0.15)',
                  padding: '1.2rem',
                  borderRadius: '16px',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: isSelected ? '0 10px 25px -5px rgba(79, 70, 229, 0.3)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                Activate {plan.name} Trial <Zap size={16} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Trust elements footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        color: '#64748B',
        fontSize: '0.9rem',
        fontWeight: 700
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={18} color="#10B981" />
          14-Day Free Sandbox Period
        </div>
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#CBD5E1' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CreditCard size={18} color="#10B981" />
          No credit card required to trial
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
