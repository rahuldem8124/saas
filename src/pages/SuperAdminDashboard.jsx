import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Users, BarChart2, DollarSign, ArrowLeft, ToggleLeft, ToggleRight, Check, X, Award, AlertTriangle, Layers, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const SuperAdminDashboard = () => {
  const { businesses, updateBusiness } = useTenant();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const bizList = Object.values(businesses);

  // Compute platform MRR
  const mrrSum = bizList.reduce((sum, b) => {
    const fee = b.subscription === 'Premium' ? 199 : b.subscription === 'Pro' ? 79 : 29;
    return sum + fee;
  }, 0);

  // Compute total transacted orders across platform
  const totalPlatformOrders = bizList.reduce((sum, b) => sum + (b.orders ? b.orders.length : 0), 0);

  const handleToggleApproval = (bizId, currentStatus) => {
    const newStatus = currentStatus === 'Suspended' ? 'Approved' : 'Suspended';
    updateBusiness(bizId, { approvalStatus: newStatus });
    alert(`Store status for ${bizId} updated to: ${newStatus}`);
  };

  return (
    <div style={{ background: '#F3F4F6', minHeight: '100vh', padding: '60px 5% 120px', boxSizing: 'border-box' }}>
      
      {/* Header */}
      <header style={{ maxWidth: '1200px', margin: '0 auto 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--color-brown-dark)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 900, marginBottom: '1rem' }}>
            <Shield size={14} /> PLATFORM SUPERVISOR
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: 0 }}>Super Admin Center</h1>
          <p style={{ color: 'var(--color-brown)', fontWeight: 600, opacity: 0.7, margin: '0.5rem 0 0' }}>Global overview of SaaS operations, subscriptions, and merchant licensing.</p>
        </div>
        <button 
          onClick={() => {
            switchRole('admin', 'cakeflow');
            navigate('/admin');
          }} 
          className="btn-secondary" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={18} /> Switch to Flagship Admin
        </button>
      </header>

      {/* Global MRR Cards */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
        {[
          { label: "Active Platform MRR", value: `$${mrrSum.toFixed(2)}`, desc: "Summed across subscription plans", icon: <DollarSign /> },
          { label: "Active Registered Sellers", value: bizList.length.toString(), desc: "Bakeries, Fashion, Crafts, etc.", icon: <Users /> },
          { label: "Total Social Orders", value: totalPlatformOrders.toString(), icon: <Layers />, desc: "Transactional volume logged" },
          { label: "Platform Uptime Rate", value: "99.99%", icon: <Award />, desc: "All instances active" }
        ].map((item, i) => (
          <div key={i} className="card" style={{ padding: '2.5rem 2rem', background: 'white', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown)', opacity: 0.6 }}>{item.label}</span>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: '0.4rem 0' }}>{item.value}</div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-pink)' }}>{item.desc}</span>
            </div>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'var(--color-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pink)' }}>
              {item.icon}
            </div>
          </div>
        ))}
      </section>

      {/* Sellers List Table */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 4rem' }}>
        <div className="card" style={{ background: 'white', padding: '3rem', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '2rem' }}>Registered Social Stores</h2>
          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F3F4F6', textAlign: 'left' }}>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Store Name</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Vanity Domain</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Category</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Sub Tier</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>MRR Share</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>License Status</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bizList.map(b => {
                  const subFee = b.subscription === 'Premium' ? 199 : b.subscription === 'Pro' ? 79 : 29;
                  const isSuspended = b.approvalStatus === 'Suspended';
                  return (
                    <tr key={b.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '1.2rem 1rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>{b.name}</td>
                      <td style={{ padding: '1.2rem 1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-pink)' }}>{b.id}.platform.com</td>
                      <td style={{ padding: '1.2rem 1rem' }}>
                        <span style={{ fontSize: '0.75rem', background: '#ECEFF1', padding: '3px 10px', borderRadius: '12px', fontWeight: 900 }}>{b.category}</span>
                      </td>
                      <td style={{ padding: '1.2rem 1rem', fontWeight: 800 }}>{b.subscription}</td>
                      <td style={{ padding: '1.2rem 1rem', fontWeight: 800, color: 'var(--color-brown)' }}>${subFee}.00</td>
                      <td style={{ padding: '1.2rem 1rem' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 900,
                          background: isSuspended ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                          color: isSuspended ? '#C62828' : '#2E7D32'
                        }}>
                          {isSuspended ? "Suspended" : "Approved"}
                        </span>
                      </td>
                      <td style={{ padding: '1.2rem 1rem' }}>
                        <button 
                          onClick={() => handleToggleApproval(b.id, b.approvalStatus)}
                          style={{
                            padding: '4px 12px',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            border: 'none',
                            background: isSuspended ? '#4CAF50' : '#F44336',
                            color: 'white',
                            cursor: 'pointer'
                          }}
                        >
                          {isSuspended ? "APPROVE" : "SUSPEND"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Global Gating Policy builder */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        
        {/* Subscription parameters */}
        <div className="card" style={{ background: 'white', padding: '2.5rem', borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={20} color="var(--color-pink)" /> Feature Gating Configurations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem', borderBottom: '1px solid #F3F4F6' }}>
              <span>Basic Plan Monthly Orders Cap:</span>
              <span style={{ fontWeight: 800 }}>50 orders</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem', borderBottom: '1px solid #F3F4F6' }}>
              <span>Pro Plan Automated WhatsApp Bot:</span>
              <span style={{ color: '#4CAF50', fontWeight: 800 }}>Enabled</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem' }}>
              <span>Premium Plan Webhook Triggers:</span>
              <span style={{ color: '#4CAF50', fontWeight: 800 }}>Enabled (Unlimited)</span>
            </div>
          </div>
        </div>

        {/* System Warnings / Logs */}
        <div className="card" style={{ background: 'white', padding: '2.5rem', borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={20} color="#FF9800" /> Platform Security Log
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-brown)' }}>
            <div style={{ display: 'flex', gap: '8px', padding: '0.5rem', borderLeft: '3px solid #4CAF50', background: '#F9FBF9' }}>
              <span style={{ fontWeight: 800 }}>[INFO]</span>
              <span>All 5 multi-tenant scopes compiled with pre-seeded demo catalogs.</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', padding: '0.5rem', borderLeft: '3px solid #4CAF50', background: '#F9FBF9' }}>
              <span style={{ fontWeight: 800 }}>[INFO]</span>
              <span>Subdomain routing router loaded in StrictMode context.</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};

export default SuperAdminDashboard;
