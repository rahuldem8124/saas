import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import { useAuth } from '../context/AuthContext';
import { Layers, MessageSquare, ShoppingBag, Plus, Sparkles, CreditCard, Loader2, CheckCircle2, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstagramIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const AdminNavbar = () => {
  const { user } = useAuth();
  const { businesses, PLAN_LIMITS, topUpMessageQuota } = useTenant();
  
  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];
  
  const [showTopUp, setShowTopUp] = useState(false);
  const [selectedPack, setSelectedPack] = useState({ id: 'growth', amount: 5000, price: 19 });
  const [paymentState, setPaymentState] = useState('idle'); // idle -> loading -> success

  if (!biz) return null;

  const subscription = biz.subscription || 'Basic';
  const limits = PLAN_LIMITS[subscription] || PLAN_LIMITS['Basic'];

  // Orders capacity math
  const orderCount = biz.orders ? biz.orders.length : 0;
  const orderLimit = limits.orders;
  const isOrdersUnlimited = orderLimit === Infinity;
  const ordersPercent = isOrdersUnlimited ? 0 : Math.min((orderCount / orderLimit) * 100, 100);

  // Messages capacity math
  const msgUsed = biz.messagesUsed || 0;
  const baseMsgLimit = limits.messages;
  const topUpCount = biz.topUpMessages || 0;
  const isMessagesUnlimited = baseMsgLimit === Infinity;
  const msgLimit = isMessagesUnlimited ? Infinity : baseMsgLimit + topUpCount;
  const msgRemaining = isMessagesUnlimited ? Infinity : Math.max(msgLimit - msgUsed, 0);
  const msgPercent = isMessagesUnlimited ? 0 : Math.min((msgUsed / msgLimit) * 100, 100);
  
  const isLowOnMessages = !isMessagesUnlimited && (msgRemaining / msgLimit) < 0.15;

  const channel = biz.automationChannel || "WhatsApp";

  // Helper for channel colors/gradients/labels
  const getChannelDetails = (chan) => {
    switch (chan) {
      case "Instagram":
        return {
          name: "Instagram Messages",
          color: "#3B82F6", // Blue
          gradient: isLowOnMessages ? 'linear-gradient(90deg, #EF4444, #F87171)' : 'linear-gradient(90deg, #3B82F6, #60A5FA)',
          iconColor: '#3B82F6',
          shortName: "Instagram Direct",
          descName: "Instagram direct message credits"
        };
      case "WhatsApp + Instagram":
        return {
          name: "WhatsApp + Insta",
          color: "#8B5CF6", // Purple
          gradient: isLowOnMessages ? 'linear-gradient(90deg, #EF4444, #F87171)' : 'linear-gradient(90deg, #8B5CF6, #A78BFA)',
          iconColor: '#8B5CF6',
          shortName: "Multi-Channel Broadcast",
          descName: "multi-channel (WhatsApp + Instagram) message credits"
        };
      case "WhatsApp":
      default:
        return {
          name: "WhatsApp Messages",
          color: "#10B981", // Green
          gradient: isLowOnMessages ? 'linear-gradient(90deg, #EF4444, #F87171)' : 'linear-gradient(90deg, #10B981, #34D399)',
          iconColor: '#10B981',
          shortName: "WhatsApp Broadcast",
          descName: "WhatsApp message credits"
        };
    }
  };

  const channelDetails = getChannelDetails(channel);

  const getChannelIcon = (chan, size, color) => {
    if (chan === "Instagram") {
      return <InstagramIcon size={size} color={color} />;
    } else if (chan === "WhatsApp + Instagram") {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <MessageSquare size={size} color={color} />
          <span style={{ fontSize: '10px', color: color, opacity: 0.8, fontWeight: 900 }}>+</span>
          <InstagramIcon size={size} color={color} style={{ marginLeft: '-1px' }} />
        </div>
      );
    } else {
      return <MessageSquare size={size} color={color} />;
    }
  };


  const topUpPackages = [
    { id: 'starter', name: 'Starter Pack', amount: 1000, price: 5, desc: 'Ideal for small scale announcements' },
    { id: 'growth', name: 'Growth Booster', amount: 5000, price: 19, desc: 'Most popular for active storefronts' },
    { id: 'scale', name: 'Scale Engine', amount: 10000, price: 35, desc: 'Best value for high-volume chat automation' }
  ];

  const handlePurchase = () => {
    setPaymentState('loading');
    setTimeout(() => {
      // Execute the top up in global context
      topUpMessageQuota(biz.id, selectedPack.amount);
      setPaymentState('success');
    }, 1500);
  };

  const resetModal = () => {
    setShowTopUp(false);
    setPaymentState('idle');
  };

  return (
    <>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2.5rem',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(122, 78, 58, 0.08)',
        borderRadius: '20px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.02)',
        marginBottom: '2.5rem',
        position: 'sticky',
        top: '20px',
        zIndex: 1000,
        gap: '2rem'
      }}>
        {/* Active Business Brand Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--gradient-pink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Layers size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-brown-dark)', fontFamily: 'var(--font-heading)' }}>
              {biz.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{
                fontSize: '0.75rem',
                background: 'rgba(242, 140, 163, 0.12)',
                color: 'var(--color-pink)',
                padding: '2px 8px',
                borderRadius: '20px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {subscription} Plan
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-brown)', opacity: 0.6, fontWeight: 700 }}>
                {biz.category}
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Usage Gauges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', flex: 1, justifyContent: 'flex-end' }}>
          
          {/* Orders Counter */}
          <div style={{ width: '180px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginBottom: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShoppingBag size={12} color="var(--color-pink)" /> Orders
              </span>
              <span>
                {orderCount} / {isOrdersUnlimited ? '∞' : orderLimit}
              </span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(122, 78, 58, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                width: `${isOrdersUnlimited ? 100 : ordersPercent}%`,
                height: '100%',
                background: isOrdersUnlimited ? 'linear-gradient(90deg, #818CF8, #60A5FA)' : 'var(--gradient-pink)',
                borderRadius: '3px',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>

          {/* Messaging Quota Counter */}
          <div style={{ width: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginBottom: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {getChannelIcon(channel, 12, isLowOnMessages ? '#EF4444' : channelDetails.iconColor)}
                {channelDetails.name}
              </span>
              <span style={{ color: isLowOnMessages ? '#EF4444' : 'var(--color-brown-dark)' }}>
                {msgUsed} / {isMessagesUnlimited ? '∞' : msgLimit}
              </span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(122, 78, 58, 0.08)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
              <div style={{
                width: `${isMessagesUnlimited ? 100 : msgPercent}%`,
                height: '100%',
                background: isMessagesUnlimited ? 'linear-gradient(90deg, #10B981, #34D399)' : channelDetails.gradient,
                borderRadius: '3px',
                transition: 'width 0.4s ease'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', fontWeight: 700, marginTop: '4px' }}>
              <span style={{ color: isLowOnMessages ? '#EF4444' : 'var(--color-brown)', opacity: isLowOnMessages ? 1 : 0.6, display: 'flex', alignItems: 'center', gap: '2px' }}>
                {isLowOnMessages && <AlertTriangle size={10} />}
                {isMessagesUnlimited ? 'Unlimited bot logs' : `${msgRemaining.toLocaleString()} remaining`}
              </span>
              {topUpCount > 0 && (
                <span style={{ color: channelDetails.color, fontWeight: 800 }}>
                  (+{topUpCount.toLocaleString()} Top Up)
                </span>
              )}
            </div>
          </div>

          {/* Top Up Messages Button */}
          {!isMessagesUnlimited && (
            <button
              onClick={() => setShowTopUp(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'var(--gradient-pink)',
                color: 'white',
                fontSize: '0.8rem',
                fontWeight: 900,
                borderRadius: '20px',
                boxShadow: 'var(--shadow-glow)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="touch-friendly"
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Plus size={14} /> Top Up Messages
            </button>
          )}
        </div>
      </header>

      {/* High-Fidelity Glassmorphic Top Up Modal */}
      <AnimatePresence>
        {showTopUp && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(74, 44, 42, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}>
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              style={{
                width: '540px',
                background: 'rgba(255, 255, 255, 0.96)',
                borderRadius: '28px',
                boxShadow: '0 20px 60px rgba(74, 44, 42, 0.15)',
                border: '1px solid rgba(122, 78, 58, 0.1)',
                padding: '2.5rem',
                position: 'relative',
                boxSizing: 'border-box'
              }}
            >
              {/* Close Button */}
              <button
                onClick={resetModal}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-brown)',
                  opacity: 0.6,
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={20} />
              </button>

              {paymentState === 'idle' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Sparkles size={20} color="var(--color-pink)" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-pink)', letterSpacing: '0.5px' }}>
                      Refill Message Quota
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: '0 0 1.5rem 0' }}>
                    {channelDetails.shortName} Top Up
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--color-brown)', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>
                    Ensure uninterrupted {channelDetails.shortName.toLowerCase()} automation for your shop. Select a credits pack below to add to your current billing balance.
                  </p>

                  {/* Packages list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    {topUpPackages.map((pack) => {
                      const isSelected = selectedPack.id === pack.id;
                      return (
                        <div
                          key={pack.id}
                          onClick={() => setSelectedPack(pack)}
                          style={{
                            border: `2px solid ${isSelected ? 'var(--color-pink)' : 'rgba(122, 78, 58, 0.1)'}`,
                            background: isSelected ? 'rgba(242, 140, 163, 0.04)' : 'transparent',
                            borderRadius: '16px',
                            padding: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontWeight: 800, color: 'var(--color-brown-dark)' }}>{pack.name}</span>
                              <span style={{
                                fontSize: '0.75rem',
                                color: channelDetails.color,
                                background: `${channelDetails.color}1E`,
                                padding: '1px 6px',
                                borderRadius: '4px',
                                fontWeight: 800
                              }}>
                                +{pack.amount.toLocaleString()} Messages
                              </span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-brown)', opacity: 0.7, marginTop: '4px' }}>
                              {pack.desc}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>
                              ${pack.price}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-brown)', opacity: 0.5, fontWeight: 700 }}>
                              One-time purchase
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handlePurchase}
                    style={{
                      width: '100%',
                      padding: '1.2rem',
                      background: 'var(--gradient-pink)',
                      color: 'white',
                      borderRadius: '16px',
                      fontSize: '1rem',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: 'var(--shadow-glow)',
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    <CreditCard size={18} /> Purchase Messages Refill
                  </button>
                </div>
              )}

              {paymentState === 'loading' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', textAlign: 'center' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{ color: 'var(--color-pink)', marginBottom: '1.5rem' }}
                  >
                    <Loader2 size={48} />
                  </motion.div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '8px' }}>
                    Authorizing Sandbox Payment
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-brown)', opacity: 0.7 }}>
                    Connecting to credit ledger gateway. Do not refresh...
                  </p>
                </div>
              )}

              {paymentState === 'success' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0', textAlign: 'center' }}>
                  <div style={{ color: channelDetails.color, marginBottom: '1.5rem' }}>
                    <CheckCircle2 size={56} />
                  </div>
                  <h4 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '8px' }}>
                    Purchase Complete!
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-brown)', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>
                    Successfully added <b>{selectedPack.amount.toLocaleString()}</b> {channelDetails.descName} to your <b>{biz.name}</b> balance.
                  </p>

                  <button
                    onClick={resetModal}
                    style={{
                      padding: '0.8rem 2.5rem',
                      background: 'var(--color-brown-dark)',
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminNavbar;
