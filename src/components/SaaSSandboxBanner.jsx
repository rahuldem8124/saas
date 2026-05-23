import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, CreditCard, Lock, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SaaSSandboxBanner = ({ businessId }) => {
  const { businesses, subscribeToBusiness } = useTenant();
  const { loginSeller } = useAuth();

  const biz = businesses[businessId] || businesses['cakeflow'];
  const isSubscribed = biz?.isSubscribed;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  // Tech Theme variables
  const t = {
    bgBanner: isSubscribed ? 'rgba(236, 253, 245, 0.96)' : 'rgba(241, 245, 249, 0.96)',
    borderBanner: isSubscribed ? '2.5px solid #10B981' : '2.5px solid #4F46E5',
    iconColor: isSubscribed ? '#10B981' : '#4F46E5',
    primary: '#4F46E5',
    primaryGradient: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
    primaryLight: '#EEF2FF',
    textDark: '#0F172A',
    textMuted: '#475569',
    border: '#E2E8F0',
    shadowSoft: '0 4px 15px -2px rgba(15, 23, 42, 0.05)',
    shadowGlow: '0 4px 12px rgba(79, 70, 229, 0.2)'
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsOpen(false);
      subscribeToBusiness(biz.id, selectedPlan);
      // Auto-log them in as the operator for this business
      loginSeller(biz.id, `${biz.name} Operator`);
    }, 1800);
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '1200px',
        zIndex: 9999,
        background: t.bgBanner,
        backdropFilter: 'blur(10px)',
        border: t.borderBanner,
        borderRadius: '24px',
        padding: '0.8rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        boxShadow: '0 10px 35px rgba(15, 23, 42, 0.12)',
        fontFamily: 'var(--font-body)',
        color: t.textDark,
        fontSize: '0.92rem',
        fontWeight: 650
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1 }}>
          {isSubscribed ? (
            <ShieldCheck size={20} color={t.iconColor} strokeWidth={3} />
          ) : (
            <Sparkles size={20} color={t.iconColor} />
          )}
          <span style={{ lineHeight: 1.4, color: t.textDark }}>
            {isSubscribed ? (
              <span><b>🎉 ACTIVE SUBSCRIPTION:</b> This {biz.name} admin operator console is unlocked! Click operator dashboard to configure workflows.</span>
            ) : (
              <span><b>✨ STOREFRONT SANDBOX:</b> Exploring {biz.name} customer live demo. Buy a subscription to fully customize checkout forms, build dynamic fields & access the operator panel.</span>
            )}
          </span>
        </div>

        <div>
          {isSubscribed ? (
            <Link to="/admin" style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1.2rem',
              borderRadius: '20px',
              fontWeight: 900,
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
            }}>
              Operator Dashboard ➔
            </Link>
          ) : (
            <button 
              onClick={() => setIsOpen(true)}
              style={{
                background: t.primaryGradient,
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.2rem',
                borderRadius: '20px',
                fontWeight: 900,
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                boxShadow: t.shadowGlow
              }}
            >
              <Lock size={14} /> Buy Subscription
            </button>
          )}
        </div>
      </div>

      {/* Subscription simulated billing payment modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', zIndex: 10000, backdropFilter: 'blur(6px)' }}
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              style={{
                position: 'fixed',
                top: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '540px',
                background: 'white',
                borderRadius: '28px',
                padding: '3rem',
                zIndex: 10001,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                border: `1px solid ${t.border}`,
                boxSizing: 'border-box'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: t.primaryLight, color: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <CreditCard size={26} />
                </div>
                <h3 style={{ fontSize: '1.7rem', fontWeight: 900, margin: '0 0 0.5rem', color: t.textDark }}>Activate SaaS Subscription</h3>
                <p style={{ color: t.textMuted, fontSize: '0.95rem', margin: 0, fontWeight: 500 }}>Unlock complete dashboard scopes for {biz.name}</p>
              </div>

              <form onSubmit={handleSubscribe}>
                {/* Plan Selection tabs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                  {[
                    { id: 'Basic', p: '$29/mo' },
                    { id: 'Pro', p: '$79/mo' },
                    { id: 'Premium', p: '$199/mo' }
                  ].map(plan => (
                    <div 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      style={{
                        padding: '1.1rem 0.5rem',
                        borderRadius: '16px',
                        textAlign: 'center',
                        border: selectedPlan === plan.id ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
                        background: selectedPlan === plan.id ? t.primaryLight : 'white',
                        cursor: 'pointer',
                        fontWeight: 900,
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ color: selectedPlan === plan.id ? t.primary : t.textDark }}>{plan.id}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.6, color: selectedPlan === plan.id ? t.primary : t.textMuted, marginTop: '0.3rem' }}>{plan.p}</div>
                    </div>
                  ))}
                </div>

                {/* Simulated payment gateway card details form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem', color: t.textDark }}>Card Number</label>
                    <input 
                      type="text" 
                      placeholder="4000 1234 5678 9010" 
                      required
                      value={cardDetails.number}
                      onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                      style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: `1.5px solid ${t.border}`, fontSize: '1rem', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem', color: t.textDark }}>Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        required
                        value={cardDetails.expiry}
                        onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: `1.5px solid ${t.border}`, fontSize: '1rem', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem', color: t.textDark }}>CVV</label>
                      <input 
                        type="password" 
                        placeholder="***" 
                        maxLength={3}
                        required
                        value={cardDetails.cvv}
                        onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: `1.5px solid ${t.border}`, fontSize: '1rem', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    background: t.primaryGradient,
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem',
                    boxShadow: t.shadowGlow
                  }}
                >
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      <span>Simulating Secure Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay & Unlock Dashboard</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SaaSSandboxBanner;
