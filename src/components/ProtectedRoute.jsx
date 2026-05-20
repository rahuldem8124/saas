import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';
import { Lock, Sparkles, CreditCard, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children }) => {
  const { isAdmin, user } = useAuth();
  const { businesses, subscribeToBusiness } = useTenant();

  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [loading, setLoading] = useState(false);
  const [cardNo, setCardNo] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];

  const handleGateUnlock = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      subscribeToBusiness(activeBizId, selectedPlan);
    }, 1600);
  };

  // SaaS Tech Theme variables
  const t = {
    bg: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)', // Subtle slate gradient
    textDark: '#0F172A', // Slate-900
    textMuted: '#475569', // Slate-600
    primary: '#4F46E5', // Indigo-600
    primaryLight: '#EEF2FF', // Indigo-50
    primaryGradient: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
    border: '#E2E8F0', // Slate-200
    shadowMedium: '0 20px 40px -10px rgba(15, 23, 42, 0.1)',
    shadowGlow: '0 8px 25px -5px rgba(79, 70, 229, 0.25)'
  };

  // If the active business is subscribed, render dashboard children normally!
  if (biz.isSubscribed) {
    return children;
  }

  // Otherwise, render a stunning, high-fidelity SaaS Subscription Locking Gate
  return (
    <div style={{
      minHeight: '100vh',
      background: t.bg,
      padding: '4rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      boxSizing: 'border-box'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '540px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          border: `1px solid ${t.border}`,
          padding: '3.5rem 3rem',
          boxShadow: t.shadowMedium,
          boxSizing: 'border-box'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: t.primaryLight, padding: '0.5rem 1.2rem', borderRadius: '30px', color: t.primary, fontWeight: 800, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <Sparkles size={14} /> <span>SUBSCRIBER ACCESS ONLY</span>
          </div>

          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: t.primaryGradient, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: t.shadowGlow }}>
            <Lock size={30} />
          </div>

          <h2 style={{ fontSize: '1.9rem', fontWeight: 900, color: t.textDark, margin: '0 0 0.8rem', letterSpacing: '-0.8px' }}>
            {biz.name} Console Locked
          </h2>
          <p style={{ color: t.textMuted, fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
            Unlock visual category builders, customized checkout fields, live WhatsApp bot notifications, and operational metrics for <b>{biz.name}</b> by activating your operator plan.
          </p>
        </div>

        <form onSubmit={handleGateUnlock}>
          {/* Plan Selector Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { id: 'Basic', p: '$29/mo', desc: 'Single Store' },
              { id: 'Pro', p: '$79/mo', desc: 'Standard Plus' },
              { id: 'Premium', p: '$199/mo', desc: 'Enterprise Bot' }
            ].map(plan => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  padding: '1.2rem 0.5rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: selectedPlan === plan.id ? `2.5px solid ${t.primary}` : `1px solid ${t.border}`,
                  background: selectedPlan === plan.id ? t.primaryLight : 'white',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ color: selectedPlan === plan.id ? t.primary : t.textDark }}>{plan.id}</div>
                <div style={{ fontSize: '0.8rem', color: t.primary, margin: '0.2rem 0 0.1rem' }}>{plan.p}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.6, fontWeight: 700, color: t.textMuted }}>{plan.desc}</div>
              </div>
            ))}
          </div>

          {/* Secure Credit Card Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem', color: t.textDark }}>TEST CREDIT CARD NUMBER</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="4000 1234 5678 9010"
                  required
                  value={cardNo}
                  onChange={e => setCardNo(e.target.value)}
                  style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', borderRadius: '12px', border: `1.5px solid ${t.border}`, fontSize: '0.95rem', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
                />
                <CreditCard size={16} style={{ position: 'absolute', left: '1rem', top: '1.1rem', color: t.textMuted, opacity: 0.7 }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.4rem', color: t.textDark }}>EXPIRY</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  required
                  value={cardExpiry}
                  onChange={e => setCardExpiry(e.target.value)}
                  style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: `1.5px solid ${t.border}`, fontSize: '0.95rem', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.4rem', color: t.textDark }}>CVV</label>
                <input
                  type="password"
                  placeholder="***"
                  maxLength={3}
                  required
                  value={cardCvv}
                  onChange={e => setCardCvv(e.target.value)}
                  style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: `1.5px solid ${t.border}`, fontSize: '0.95rem', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
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
                <Loader size={18} className="animate-spin" style={{ marginRight: '6px' }} />
                <span>Unlocking Operator Dashboard...</span>
              </>
            ) : (
              <>
                <span>Activate Subscription & Launch Console</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProtectedRoute;
