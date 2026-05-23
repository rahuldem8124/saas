import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Users, BarChart2, DollarSign, ArrowLeft, ToggleLeft, ToggleRight, Check, X, Award, AlertTriangle, Layers, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const SuperAdminDashboard = () => {
  const { businesses, updateBusiness, PLAN_LIMITS, topUpMessageQuota } = useTenant();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const bizList = Object.values(businesses);
  const [selectedService, setSelectedService] = useState('All');

  // Compute platform MRR based on all businesses
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

  // Filter businesses by selected service/category
  const filteredBizList = selectedService === 'All'
    ? bizList
    : bizList.filter(b => b.category?.toLowerCase() === selectedService.toLowerCase());

  return (
    <div style={{ background: '#F3F4F6', minHeight: '100vh', padding: '130px 5% 120px', boxSizing: 'border-box' }}>
      
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0 }}>Registered Social Stores</h2>
            <div style={{ fontSize: '0.8rem', background: 'var(--color-cream)', color: 'var(--color-brown-dark)', padding: '6px 12px', borderRadius: '10px', fontWeight: 800 }}>
              Showing {filteredBizList.length} of {bizList.length} Stores
            </div>
          </div>

          {/* Service Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2.5rem', borderBottom: '1px solid #ECEFF1', paddingBottom: '1.5rem' }}>
            {['All', 'Cake', 'Shoes', 'Clothing', 'Accessories', 'Handmade', 'Custom'].map(cat => {
              const count = bizList.filter(b => cat === 'All' ? true : b.category?.toLowerCase() === cat.toLowerCase()).length;
              const isActive = selectedService === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedService(cat)}
                  style={{
                    padding: '0.6rem 1.4rem',
                    borderRadius: '100px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: 'none',
                    background: isActive ? 'var(--color-brown-dark)' : '#ECEFF1',
                    color: isActive ? 'white' : 'var(--color-brown)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 10px rgba(74, 44, 42, 0.15)' : 'none'
                  }}
                >
                  <span>{cat}</span>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)', 
                    color: isActive ? 'white' : 'var(--color-brown-dark)',
                    padding: '2px 6px',
                    borderRadius: '20px',
                    fontWeight: 800
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F3F4F6', textAlign: 'left' }}>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Store Name</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Subscription & Category</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Automation Channel</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Per-Msg Rate</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Orders Processed</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Message Quota</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Simulated Billing</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>License Status</th>
                  <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--color-brown)' }}>Refills & Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBizList.map(b => {
                  const isSuspended = b.approvalStatus === 'Suspended';

                  const subscription = b.subscription || 'Basic';
                  const limits = PLAN_LIMITS[subscription] || PLAN_LIMITS['Basic'];

                  const orderCount = b.orders ? b.orders.length : 0;
                  const orderLimit = limits.orders;
                  const isOrdersUnlimited = orderLimit === Infinity;
                  const ordersPercent = isOrdersUnlimited ? 0 : Math.min((orderCount / orderLimit) * 100, 100);

                  const msgUsed = b.messagesUsed || 0;
                  const baseMsgLimit = limits.messages;
                  const topUpCount = b.topUpMessages || 0;
                  const isMessagesUnlimited = baseMsgLimit === Infinity;
                  const msgLimit = isMessagesUnlimited ? Infinity : baseMsgLimit + topUpCount;
                  const msgRemaining = isMessagesUnlimited ? Infinity : Math.max(msgLimit - msgUsed, 0);
                  const msgPercent = isMessagesUnlimited ? 0 : Math.min((msgUsed / msgLimit) * 100, 100);
                  
                  const isLowOnMessages = !isMessagesUnlimited && (msgRemaining / msgLimit) < 0.15;

                  const channel = b.automationChannel || "WhatsApp";
                  const rate = b.perMessageCost || 0.01;
                  const billingValue = msgUsed * rate;

                  return (
                    <tr key={b.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '1.2rem 1rem' }}>
                        <div style={{ fontWeight: 900, color: 'var(--color-brown-dark)' }}>{b.name}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-pink)' }}>{b.id}.platform.com</div>
                      </td>
                      <td style={{ padding: '1.2rem 1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>{b.subscription}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-brown)', opacity: 0.6, fontWeight: 700 }}>{b.category}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1.2rem 1rem' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          background: channel === 'WhatsApp' ? 'rgba(16, 185, 129, 0.1)' : channel === 'Instagram' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                          color: channel === 'WhatsApp' ? '#10B981' : channel === 'Instagram' ? '#3B82F6' : '#8B5CF6',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
                          {channel}
                        </span>
                      </td>
                      <td style={{ padding: '1.2rem 1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-brown-dark)' }}>
                        ${rate.toFixed(3)}
                      </td>
                      <td style={{ padding: '1.2rem 1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginBottom: '4px' }}>
                            <span>{orderCount} / {isOrdersUnlimited ? '∞' : orderLimit}</span>
                          </div>
                          <div style={{ width: '100%', height: '4px', background: '#ECEFF1', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${isOrdersUnlimited ? 100 : ordersPercent}%`,
                              height: '100%',
                              background: 'var(--gradient-pink)',
                              borderRadius: '2px'
                            }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1.2rem 1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '120px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginBottom: '4px' }}>
                            <span>{msgUsed} / {isMessagesUnlimited ? '∞' : msgLimit}</span>
                          </div>
                          <div style={{ width: '100%', height: '4px', background: '#ECEFF1', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${isMessagesUnlimited ? 100 : msgPercent}%`,
                              height: '100%',
                              background: isMessagesUnlimited ? '#10B981' : isLowOnMessages ? '#EF4444' : '#10B981',
                              borderRadius: '2px'
                            }} />
                          </div>
                          <div style={{ fontSize: '0.7rem', color: isLowOnMessages ? '#EF4444' : '#6B7280', marginTop: '2px', fontWeight: 600 }}>
                            {isLowOnMessages ? '⚠️ Low' : `${msgRemaining.toLocaleString()} remaining`}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1.2rem 1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>${billingValue.toFixed(2)}</span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--color-pink)', fontWeight: 800 }}>BILLABLE MSG FEE</span>
                        </div>
                      </td>
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {!isMessagesUnlimited ? (
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button
                                onClick={() => topUpMessageQuota(b.id, 500)}
                                className="touch-friendly"
                                style={{
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.7rem',
                                  fontWeight: 800,
                                  border: '1px solid rgba(122, 78, 58, 0.15)',
                                  background: 'white',
                                  color: 'var(--color-brown-dark)',
                                  cursor: 'pointer'
                                }}
                              >
                                +500
                              </button>
                              <button
                                onClick={() => topUpMessageQuota(b.id, 1000)}
                                className="touch-friendly"
                                style={{
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.7rem',
                                  fontWeight: 800,
                                  border: '1px solid rgba(122, 78, 58, 0.15)',
                                  background: 'white',
                                  color: 'var(--color-brown-dark)',
                                  cursor: 'pointer'
                                }}
                              >
                                +1k
                              </button>
                              <button
                                onClick={() => topUpMessageQuota(b.id, 5000)}
                                className="touch-friendly"
                                style={{
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.7rem',
                                  fontWeight: 800,
                                  border: '1px solid var(--color-pink)',
                                  background: 'rgba(242, 140, 163, 0.05)',
                                  color: 'var(--color-pink)',
                                  cursor: 'pointer'
                                }}
                              >
                                +5k
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 800 }}>Unlimited Msgs</span>
                          )}
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
                              cursor: 'pointer',
                              width: 'fit-content'
                            }}
                          >
                            {isSuspended ? "APPROVE LICENSE" : "SUSPEND LICENSE"}
                          </button>
                        </div>
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
