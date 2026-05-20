import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTenant } from '../context/TenantContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, MessageCircle, BarChart2, ArrowRight, Check, Rocket, Layers, Palette, Shield, Globe } from 'lucide-react';

const SaaSPage = () => {
  const { createBusiness } = useTenant();
  const { loginSeller } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cake',
    theme: 'Modern',
    subscription: 'Pro',
    whatsappNumber: '',
    instagramUsername: ''
  });

  const [isCreating, setIsCreating] = useState(false);
  const [creationProgress, setCreationProgress] = useState(0);

  // Subtle SaaS Light Theme configuration
  const t = {
    bg: '#F8FAFC', // Crisp slate white
    textPrimary: '#0F172A', // Slate-900
    textMuted: '#475569', // Slate-600
    primary: '#4F46E5', // Indigo-600
    primaryLight: '#EEF2FF', // Indigo-50
    primaryGradient: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
    border: '#E2E8F0', // Slate-200
    cardBg: '#FFFFFF',
    shadowSoft: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
    shadowMedium: '0 20px 40px -10px rgba(15, 23, 42, 0.08)',
    shadowGlow: '0 8px 25px -5px rgba(79, 70, 229, 0.25)'
  };

  const categories = [
    { name: 'Cake', desc: 'Bakers & Custom Confectioners', color: '#FFF3F5' },
    { name: 'Shoes', desc: 'Custom Sneakers & Footwear', color: '#F3F4F6' },
    { name: 'Accessories', desc: 'Boutique Jewelry & Accessories', color: '#FAF5FF' },
    { name: 'Handmade', desc: 'Artisanal Clay & Crafted Goods', color: '#FFFBEB' },
    { name: 'Custom', desc: 'Flexible templates for custom niches', color: '#ECFDF5' }
  ];

  const themes = [
    { name: 'Modern', desc: 'Sleek, fluid, and conversion-optimized.' },
    { name: 'Minimal', desc: 'Clean aesthetics, highlighting single items.' },
    { name: 'Luxury', desc: 'Elegant serif typography with golden/floral tones.' },
    { name: 'Dark', desc: 'High-contrast aesthetic for street-wear and bold products.' },
    { name: 'Instagram-first', desc: 'Tailored for absolute mobile conversions, mimicking feed structures.' }
  ];

  const subscriptionTiers = [
    {
      name: 'Basic',
      price: '$29',
      billing: 'per month',
      desc: 'Perfect for small side-hustle makers getting started.',
      features: ['50 orders / month limit', 'Standard checkout schemas', 'Direct WhatsApp share link', 'Basic analytics dashboard'],
      color: '#64748B'
    },
    {
      name: 'Pro',
      price: '$79',
      billing: 'per month',
      desc: 'The complete social commerce toolkit for scaling brands.',
      features: ['Unlimited orders & traffic', 'WhatsApp business automation bot', 'Dynamic custom field builder', 'Shiprocket & Delhivery integrations', 'Communication templates hub'],
      popular: true,
      color: '#4F46E5'
    },
    {
      name: 'Premium',
      price: '$199',
      billing: 'per month',
      desc: 'Enterprise-grade custom features and api endpoints.',
      features: ['White-label custom domain', 'Unlimited WhatsApp bot credits', 'Custom API access webhook triggers', 'Dedicated account manager support', 'Full drag-and-drop builder blocks'],
      color: '#0F172A'
    }
  ];

  const handleLaunch = () => {
    if (!formData.name.trim()) {
      alert("Please name your business!");
      return;
    }
    setIsCreating(true);
    setStep(5);

    const interval = setInterval(() => {
      setCreationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newBizId = createBusiness({
              name: formData.name,
              category: formData.category,
              theme: formData.theme,
              subscription: formData.subscription,
              whatsappNumber: formData.whatsappNumber || "+15550000",
              instagramUsername: formData.instagramUsername || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '')
            });
            loginSeller(newBizId, `${formData.name} Owner`);
            navigate('/admin');
          }, 800);
          return 100;
        }
        return prev + 25;
      });
    }, 500);
  };

  return (
    <div style={{ background: t.bg, minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px', boxSizing: 'border-box', fontFamily: 'var(--font-body)' }}>
      
      {/* SaaS Landing Panel */}
      {step < 5 && (
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5% 5rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: t.primaryLight, padding: '0.6rem 1.5rem', borderRadius: '30px', color: t.primary, fontWeight: 800, marginBottom: '2rem', boxShadow: t.shadowSoft }}
            >
              <Sparkles size={16} /> <span>SHOPFLOW SaaS SOCIAL COMMERCE</span>
            </motion.div>
            
            <h1 style={{ fontSize: '4.5rem', fontWeight: 950, lineHeight: 1.1, color: t.textPrimary, letterSpacing: '-1.5px', marginBottom: '2.5rem' }}>
              One Platform. <span style={{ background: 'linear-gradient(to right, #4F46E5, #0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Any Business.</span> <br />
              Launch Storefronts In Seconds.
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: t.textMuted, maxWidth: '780px', margin: '0 auto 4rem', lineHeight: 1.7, fontWeight: 500 }}>
              Convert Instagram comments and WhatsApp chats directly into automated multi-tenant storefronts. ShopFlow provides visual custom checkout fields, industry-specific panels, automated replies, and shipping partners.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setStep(1)} 
                style={{
                  background: t.primaryGradient,
                  color: 'white',
                  border: 'none',
                  padding: '1.2rem 3rem',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  boxShadow: t.shadowGlow,
                  cursor: 'pointer'
                }}
              >
                Create Your Business <Rocket size={20} />
              </button>
              <a 
                href="#features" 
                style={{
                  background: t.cardBg,
                  color: t.textPrimary,
                  border: `1.5px solid ${t.border}`,
                  padding: '1.2rem 3rem',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  borderRadius: '16px',
                  textDecoration: 'none',
                  boxShadow: t.shadowSoft,
                  cursor: 'pointer'
                }}
              >
                See Features
              </a>
            </div>
          </div>

          {/* Visual Business Selector Section */}
          <div style={{ marginBottom: '8rem' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, textAlign: 'center', color: t.textPrimary, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              🚀 Explore <span style={{ color: t.primary }}>Live Sandbox Stores</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: t.textMuted, textAlign: 'center', maxWidth: '650px', margin: '0 auto 4rem', fontWeight: 500, lineHeight: 1.6 }}>
              Select a category to test the interactive mobile buyer view. Each storefront utilizes dynamic layout builders. To access the seller dashboard, activate a trial subscription.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {[
                { id: 'cakeflow', name: 'CakeFlow Bakery', category: 'Cake', icon: '🎂', desc: 'Elegant layered wedding tiers, custom weight selection & flavor options.', path: '/store/cakeflow', color: '#FFF3F5' },
                { id: 'fastfoot', name: 'FastFoot Sneaker Lab', category: 'Shoes', icon: '👟', desc: 'High-contrast sport aesthetic, modular shoe size selectors & custom colors.', path: '/store/fastfoot', color: '#F3F4F6' },
                { id: 'rose-gold', name: 'RoseGold Atelier', category: 'Accessories', icon: '💍', desc: 'Luxury brand styling with custom metal polish options & engraving.', path: '/store/rose-gold', color: '#FAF5FF' },
                { id: 'crafty', name: 'Clay & Co. Pottery', category: 'Handmade', icon: '🎨', desc: 'Artisanal pottery models, paint options, and custom gift wrapping.', path: '/store/crafty', color: '#FFFBEB' },
                { id: 'builder-box', name: 'Flex Custom Atelier', category: 'Custom', icon: '📦', desc: 'Modular visual arrangements, custom text attachments & mystery boxes.', path: '/store/builder-box', color: '#ECFDF5' }
              ].map(demo => (
                <Link key={demo.id} to={demo.path} style={{ textDecoration: 'none' }}>
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.01 }}
                    style={{
                      background: t.cardBg,
                      border: `1px solid ${t.border}`,
                      borderRadius: '24px',
                      padding: '2.5rem 2rem',
                      height: '100%',
                      boxSizing: 'border-box',
                      boxShadow: t.shadowSoft,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ width: '60px', height: '60px', borderRadius: '18px', backgroundColor: demo.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
                        {demo.icon}
                      </div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: t.textPrimary, margin: '0 0 0.5rem' }}>{demo.name}</h3>
                      <span style={{ fontSize: '0.8rem', color: t.primary, fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '1.2rem' }}>{demo.category}</span>
                      <p style={{ fontSize: '0.9rem', color: t.textMuted, lineHeight: 1.6, fontWeight: 500, margin: 0 }}>{demo.desc}</p>
                    </div>

                    <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: t.primary, fontWeight: 800, fontSize: '0.9rem' }}>
                      <span>Explore Sandbox Store</span> <ArrowRight size={15} />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Interactive Steps Form */}
          <div style={{ background: t.cardBg, padding: '4rem 3.5rem', borderRadius: '30px', boxShadow: t.shadowMedium, border: `1px solid ${t.border}` }}>
            
            {/* Step Indicators */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `2.5px solid ${t.bg}`, paddingBottom: '2rem', marginBottom: '4rem' }}>
              {[
                { s: 1, label: "Business Category" },
                { s: 2, label: "Setup Profile" },
                { s: 3, label: "Choose Theme" },
                { s: 4, label: "Select Subscription" }
              ].map(ind => (
                <div key={ind.s} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: step === ind.s ? 1 : 0.4 }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: step === ind.s ? t.primaryGradient : t.bg, 
                    color: step === ind.s ? 'white' : t.textMuted,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900
                  }}>
                    {ind.s}
                  </div>
                  <span style={{ fontWeight: 800, color: t.textPrimary }} className="hide-on-mobile">{ind.label}</span>
                </div>
              ))}
            </div>

            <AnimatePresence mode='wait'>
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2.5rem', color: t.textPrimary }}>What are you selling?</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {categories.map(cat => (
                      <div 
                        key={cat.name}
                        onClick={() => setFormData({...formData, category: cat.name})}
                        style={{
                          background: formData.category === cat.name ? t.primaryGradient : t.cardBg,
                          color: formData.category === cat.name ? 'white' : t.textPrimary,
                          border: formData.category === cat.name ? 'none' : `2px solid ${t.bg}`,
                          padding: '2.5rem 2rem',
                          borderRadius: '24px',
                          cursor: 'pointer',
                          boxShadow: t.shadowSoft,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <h3 style={{ margin: '0 0 0.8rem', color: 'inherit', fontWeight: 900 }}>{cat.name}</h3>
                        <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem', fontWeight: 600 }}>{cat.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => setStep(2)} 
                      style={{ background: t.primaryGradient, color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: t.shadowGlow }}
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2.5rem', color: t.textPrimary }}>Create your business profile</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
                    <div className="form-group">
                      <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.8rem', color: t.textPrimary }}>Business Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. SneakerLab Premium, GoldCraft Boutique" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: `2px solid ${t.border}`, fontSize: '1.1rem', outline: 'none', fontWeight: 600, boxSizing: 'border-box' }}
                      />
                      <div style={{ fontSize: '0.85rem', color: t.textMuted, marginTop: '0.6rem', fontWeight: 600 }}>
                        Your storefront will be generated at: <b style={{ color: t.primary }}>{formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'yourname'}.platform.com</b>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                      <div className="form-group">
                        <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.8rem', color: t.textPrimary }}>WhatsApp Business Number</label>
                        <input 
                          type="tel" 
                          placeholder="e.g. +1 555 1234" 
                          value={formData.whatsappNumber}
                          onChange={e => setFormData({...formData, whatsappNumber: e.target.value})}
                          style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: `2px solid ${t.border}`, fontSize: '1.1rem', outline: 'none', fontWeight: 600, boxSizing: 'border-box' }}
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.8rem', color: t.textPrimary }}>Instagram Handle</label>
                        <input 
                          type="text" 
                          placeholder="e.g. your_brand_handle" 
                          value={formData.instagramUsername}
                          onChange={e => setFormData({...formData, instagramUsername: e.target.value})}
                          style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: `2px solid ${t.border}`, fontSize: '1.1rem', outline: 'none', fontWeight: 600, boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button 
                      onClick={() => setStep(1)} 
                      style={{ background: 'white', border: `1px solid ${t.border}`, padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 800, color: t.textPrimary, cursor: 'pointer' }}
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setStep(3)} 
                      style={{ background: t.primaryGradient, color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: t.shadowGlow }}
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2.5rem', color: t.textPrimary }}>Select Storefront Theme</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {themes.map(th => (
                      <div 
                        key={th.name}
                        onClick={() => setFormData({...formData, theme: th.name})}
                        style={{
                          background: formData.theme === th.name ? t.primaryGradient : t.cardBg,
                          color: formData.theme === th.name ? 'white' : t.textPrimary,
                          border: formData.theme === th.name ? 'none' : `2px solid ${t.bg}`,
                          padding: '2.5rem 2rem',
                          borderRadius: '24px',
                          cursor: 'pointer',
                          boxShadow: t.shadowSoft,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <h3 style={{ margin: '0 0 0.8rem', color: 'inherit', fontWeight: 900 }}>{th.name}</h3>
                        <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem', fontWeight: 600 }}>{th.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button 
                      onClick={() => setStep(2)} 
                      style={{ background: 'white', border: `1px solid ${t.border}`, padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 800, color: t.textPrimary, cursor: 'pointer' }}
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setStep(4)} 
                      style={{ background: t.primaryGradient, color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: t.shadowGlow }}
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '2.5rem', textAlign: 'center', color: t.textPrimary }}>Choose Subscription Plan</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {subscriptionTiers.map(tier => (
                      <div 
                        key={tier.name}
                        onClick={() => setFormData({...formData, subscription: tier.name})}
                        style={{
                          background: 'white',
                          border: formData.subscription === tier.name ? `3px solid ${t.primary}` : `1px solid ${t.border}`,
                          padding: '3rem 2.5rem',
                          borderRadius: '30px',
                          cursor: 'pointer',
                          boxShadow: t.shadowSoft,
                          position: 'relative',
                          transition: 'all 0.2s ease',
                          transform: formData.subscription === tier.name ? 'scale(1.01)' : 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        {tier.popular && (
                          <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: t.primaryGradient, color: 'white', padding: '0.4rem 1.2rem', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 900, boxShadow: t.shadowGlow }}>
                            RECOMMENDED
                          </div>
                        )}
                        <h3 style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: '0.8rem', color: t.textPrimary }}>{tier.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '1.5rem' }}>
                          <span style={{ fontSize: '2.8rem', fontWeight: 900, color: t.textPrimary }}>{tier.price}</span>
                          <span style={{ opacity: 0.6, fontSize: '0.9rem', fontWeight: 700, color: t.textMuted }}>{tier.billing}</span>
                        </div>
                        <p style={{ color: t.textMuted, fontSize: '0.95rem', marginBottom: '2.5rem', fontWeight: 500, minHeight: '44px', lineHeight: 1.5 }}>{tier.desc}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: `1.5px solid ${t.bg}`, paddingTop: '2rem' }}>
                          {tier.features.map((feat, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', fontWeight: 600, color: t.textPrimary }}>
                              <Check size={16} color={t.primary} strokeWidth={3} />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button 
                      onClick={() => setStep(3)} 
                      style={{ background: 'white', border: `1px solid ${t.border}`, padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 800, color: t.textPrimary, cursor: 'pointer' }}
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleLaunch} 
                      style={{ background: t.primaryGradient, color: 'white', border: 'none', padding: '1.2rem 3.5rem', fontSize: '1.1rem', fontWeight: 900, borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.8rem', boxShadow: t.shadowGlow, cursor: 'pointer' }}
                    >
                      Launch Storefront <Rocket size={20} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Features pitch section */}
          <div id="features" style={{ marginTop: '10rem' }}>
            <h2 style={{ fontSize: '3.2rem', fontWeight: 900, textAlign: 'center', marginBottom: '5rem', letterSpacing: '-1px', color: t.textPrimary }}>
              Supercharged SaaS Core <span style={{ color: t.primary }}>Capabilities</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              {[
                { icon: <MessageCircle size={28} />, title: "Automated Communication", desc: "Native bot logic maps custom ordering variables directly into customizable WhatsApp API notification scripts. Zero manual updates." },
                { icon: <Palette size={28} />, title: "Category Specific UX", desc: "No generic templates. Sneaker shops get sport highlights grids and shoe variants; bakeries get layered orders and flavor selectors." },
                { icon: <Layers size={28} />, title: "Dynamic Custom Fields", desc: "Drag, select, and edit checkout fields: delivery dates, dropdown options, file upload attachments, and custom inputs." },
                { icon: <BarChart2 size={28} />, title: "Industry Dashboards", desc: "Category tailored order queues. Cake bakers track oven slots, accessories and shoe designers track custom sizes and stock logs." }
              ].map((item, i) => (
                <div key={i} style={{ background: t.cardBg, padding: '3rem 2rem', borderRadius: '24px', boxShadow: t.shadowSoft, border: `1px solid ${t.border}`, textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: t.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary, margin: '0 auto 2rem' }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontWeight: 900, marginBottom: '1rem', fontSize: '1.35rem', color: t.textPrimary }}>{item.title}</h3>
                  <p style={{ color: t.textMuted, fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* Creation seeding screen loader */}
      {step === 5 && (
        <div style={{ position: 'fixed', inset: 0, background: t.bg, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ textAlign: 'center', maxWidth: '500px', padding: '3rem' }}
          >
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 3rem' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                style={{ position: 'absolute', inset: 0, border: `4px solid ${t.border}`, borderTop: `4px solid ${t.primary}`, borderRadius: '50%' }}
              />
              <Rocket size={48} color={t.primary} style={{ position: 'absolute', top: '36px', left: '36px' }} />
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: t.textPrimary, marginBottom: '1.2rem' }}>Spindling Database...</h2>
            <p style={{ color: t.textMuted, fontWeight: 600, opacity: 0.8, marginBottom: '3rem' }}>
              {creationProgress < 25 && "Securing dynamic subdomains..."}
              {creationProgress >= 25 && creationProgress < 50 && "Seeding custom catalogs & images..."}
              {creationProgress >= 50 && creationProgress < 75 && "Connecting WhatsApp Cloud webhooks..."}
              {creationProgress >= 75 && "Compiling tailored dashboards..."}
            </p>
            <div style={{ width: '100%', height: '8px', background: 'white', borderRadius: '4px', overflow: 'hidden' }}>
              <motion.div 
                animate={{ width: `${creationProgress}%` }}
                style={{ height: '100%', background: t.primaryGradient, borderRadius: '4px' }} 
              />
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: t.primary, fontWeight: 800, marginTop: '0.5rem' }}>
              {creationProgress}%
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default SaaSPage;
