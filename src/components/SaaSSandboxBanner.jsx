import React, { useState } from 'react';
import { useTenant } from '../context/TenantContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, CreditCard, Lock, Check, Zap, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Real sample configurations for preloading (Step 2 & 5 requirement)
const sampleConfigs = {
  Cake: {
    name: "CakeFlow Studio",
    tagline: "Premium Cakes For Every Celebration",
    theme: "Luxury",
    color: "#7A4E3A",
    requirements: "I want a premium wedding cake storefront with custom cake builder, WhatsApp updates and same-day delivery.",
    fields: [
      { name: "Flavor", type: "Flavor" },
      { name: "Weight", type: "Weight" },
      { name: "Cake Message", type: "Message field" },
      { name: "Delivery Date", type: "Date picker" }
    ],
    features: ['Advanced Custom Fields Builder', 'AI Chatbot Automation', 'Shipping Integration']
  },
  Shoes: {
    name: "KickzHub",
    tagline: "Unmatched streetwear and sneakers",
    theme: "Modern",
    color: "#4F46E5",
    requirements: "Looking for a clean sneaker shop layout with rapid checkout and delivery carrier syncing.",
    fields: [
      { name: "Size", type: "Size" },
      { name: "Color", type: "Color selector" },
      { name: "Material", type: "Material" }
    ],
    features: ['Shipping Integration', 'AI Chatbot Automation']
  },
  Accessories: {
    name: "GlowCraft",
    tagline: "Aesthetic minimalist accessories",
    theme: "Minimal",
    color: "#EC4899",
    requirements: "Need a delicate boutique presentation for rings and chains, with premium custom metal engraving fields.",
    fields: [
      { name: "Material", type: "Material" },
      { name: "Color", type: "Color selector" },
      { name: "Pattern", type: "Text field" }
    ],
    features: ['Advanced Styling Themes', 'Advanced Custom Fields Builder']
  },
  Fashion: {
    name: "VogueLine",
    tagline: "Aesthetic organic clothing & apparel",
    theme: "Modern",
    color: "#10B981",
    requirements: "A high-end clothing boutique catalog featuring custom sizing, color selection, and sizing charts.",
    fields: [
      { name: "Size", type: "Size" },
      { name: "Color", type: "Color selector" },
      { name: "Fit", type: "Dropdown" }
    ],
    features: ['Advanced Styling Themes', 'Shipping Integration']
  },
  Handmade: {
    name: "CraftNest",
    tagline: "Artisanal pottery & custom crafts",
    theme: "Instagram-first",
    color: "#F59E0B",
    requirements: "A handmade craft studio with high-res reference photo upload support at checkout so clients can share custom instructions.",
    fields: [
      { name: "Reference image", type: "Reference image" },
      { name: "Customization notes", type: "Message field" },
      { name: "Delivery preferences", type: "Dropdown" }
    ],
    features: ['Advanced Custom Fields Builder', 'Commission-Free Sales']
  },
  Custom: {
    name: "Bespoke Creator",
    tagline: "Crafting unique custom experiences",
    theme: "Modern",
    color: "#6366F1",
    requirements: "Fully custom workflow configured for custom enterprise operations.",
    fields: [],
    features: ['Commission-Free Sales', 'Advanced Custom Fields Builder', 'AI Chatbot Automation']
  }
};

const SaaSSandboxBanner = ({ businessId }) => {
  const { businesses, updateBusiness } = useTenant();
  const { loginSeller } = useAuth();

  const biz = businesses[businessId] || businesses['cakeflow'];
  const isSubscribed = biz?.isSubscribed;

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Custom detailed plan states for storefront bottom banner
  const [selectedFeatures, setSelectedFeatures] = useState(['Advanced Custom Fields Builder']);
  const [customMessagesCount, setCustomMessagesCount] = useState(200);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // STEP 1 checkpoint initialized to empty string (checkpoint requirement)
  const [selectedBizType, setSelectedBizType] = useState("");
  const [bizName, setBizName] = useState('');
  const [bizTagline, setBizTagline] = useState('');
  const [preferredTheme, setPreferredTheme] = useState('Modern');
  const [primaryColor, setPrimaryColor] = useState('#4F46E5');
  const [targetAudience, setTargetAudience] = useState('');
  const [storeRequirements, setStoreRequirements] = useState('');
  
  // Custom checkout options builder states
  const [customFields, setCustomFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('Text field');
  const [customWriteInType, setCustomWriteInType] = useState('');
  const [showFieldBuilder, setShowFieldBuilder] = useState(false);

  // Bespoke Custom specifications text answers (Step 6 requirement)
  const [customAnswers, setCustomAnswers] = useState({
    sellType: '',
    pagesNeeded: '',
    orderingFlow: '',
    workflowNotes: '',
    customerJourney: '',
    referenceExamples: '',
    inspirationImage: null
  });

  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectBizType = (type) => {
    setSelectedBizType(type);
    const conf = sampleConfigs[type];
    if (conf) {
      setBizName(conf.name);
      setBizTagline(conf.tagline);
      setPreferredTheme(conf.theme);
      setPrimaryColor(conf.color);
      setStoreRequirements(conf.requirements);
      setCustomFields(conf.fields);
      setSelectedFeatures(conf.features);
    }
  };

  const getPreviewData = () => {
    switch (selectedBizType) {
      case 'Cake':
        return {
          title: 'Cake Business (CakeFlow Studio)',
          pages: ['Birthday', 'Wedding', 'Tracking', 'Cart', 'Checkout'],
          modules: ['Orders', 'Revenue', 'Analytics', 'Delivery tracking'],
          sample: { name: 'Chocolate Truffle', detail: '1kg', status: 'Baking' }
        };
      case 'Shoes':
        return {
          title: 'Sneaker Lab (KickzHub)',
          pages: ['Runners', 'Classics', 'Tracking', 'Cart', 'Checkout'],
          modules: ['Inventory Alert', 'Orders', 'Revenue', 'Analytics'],
          sample: { name: 'Nike Air', detail: 'Size 9', status: 'Packed' }
        };
      case 'Accessories':
        return {
          title: 'Jewelry Boutique (GlowCraft)',
          pages: ['Bracelets', 'Earrings', 'Tracking', 'Cart', 'Checkout'],
          modules: ['Engraving Station', 'Orders', 'Revenue', 'Analytics'],
          sample: { name: 'Silver Bracelet', detail: 'Rose Gold', status: 'Shipped' }
        };
      case 'Fashion':
        return {
          title: 'Apparel Store (VogueLine)',
          pages: ['Essentials', 'Jackets', 'Tracking', 'Cart', 'Checkout'],
          modules: ['Monogram Queue', 'Orders', 'Revenue', 'Analytics'],
          sample: { name: 'Classic Denim Jacket', detail: 'Size M', status: 'Packed' }
        };
      case 'Handmade':
        return {
          title: 'Pottery & Craft (CraftNest)',
          pages: ['Ceramics', 'Decor', 'Tracking', 'Cart', 'Checkout'],
          modules: ['Drying Rack Queue', 'Glazing Station', 'Orders', 'Revenue'],
          sample: { name: 'Anime Mug', detail: 'Standard', status: 'In Progress' }
        };
      default:
        return {
          title: 'Bespoke Custom Enterprise Workspace',
          pages: ['Custom Catalog', 'Dynamic Checkout', 'Cart', 'Tracking'],
          modules: ['Flexible Fields', 'Modular Order Pipeline', 'Orders'],
          sample: { name: 'Custom Mystery Gift', detail: 'Standard Specifications', status: 'Preparing' }
        };
    }
  };

  // Dynamic cost calculations in Indian Rupees (₹)
  const getBillingDetails = () => {
    if (!selectedBizType) {
      return { baseHosting: 0, featuresCost: 0, msgCount: 0, totalMsgCost: 0, subtotal: 0, tax: 0, total: 0 };
    }
    const baseHosting = 199;
    
    let featuresCost = 0;
    if (selectedFeatures.includes('Advanced Custom Fields Builder')) featuresCost += 150;
    if (selectedFeatures.includes('AI Chatbot Automation')) featuresCost += 250;
    if (selectedFeatures.includes('Shipping Integration')) featuresCost += 300;
    if (selectedFeatures.includes('Advanced Styling Themes')) featuresCost += 100;
    if (selectedFeatures.includes('Commission-Free Sales')) featuresCost += 200;

    const msgCount = Math.max(200, customMessagesCount || 200);
    const baseMsgCost = 100;
    const extraMsgBlocks = Math.max(0, Math.floor((msgCount - 200) / 50));
    const extraMsgCost = extraMsgBlocks * 25;
    const totalMsgCost = baseMsgCost + extraMsgCost;

    const subtotal = baseHosting + featuresCost + totalMsgCost;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    return { baseHosting, featuresCost, msgCount, totalMsgCost, subtotal, tax, total };
  };

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
    if (!selectedBizType) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsOpen(false);
      
      // Category specific seeding of products and orders for state persistence (Step 4 requirement)
      let defaultProducts = [];
      let defaultOrders = [];
      const timestamp = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      if (selectedBizType === 'Cake') {
        defaultProducts = [
          { id: Date.now() + 1, name: "Belgian Chocolate Dream", price: "₹999", rating: 4.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", category: "Chocolate", desc: "Melted Belgian chocolate cream." }
        ];
        defaultOrders = [
          { id: `CF-1001`, customer: "Jack Miller", date: timestamp, amount: "₹999", status: "Baking", payment: "Paid", email: "jack@example.com", customFields: { flavor: "Chocolate Truffle", weight: "1kg", message: "Sweet 16!" }, items: [{ name: "Belgian Chocolate Dream", price: "₹999", quantity: 1 }] }
        ];
      } else if (selectedBizType === 'Shoes') {
        defaultProducts = [
          { id: Date.now() + 1, name: "Vapor Runner Elite", price: "₹5499", rating: 4.9, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", category: "Runners", desc: "Super responsive foam sole." }
        ];
        defaultOrders = [
          { id: `SH-2001`, customer: "Marcus Vance", date: timestamp, amount: "₹5499", status: "Packed", payment: "Paid", email: "marcus@example.com", customFields: { size: "9", color: "Hyper Black", material: "Breathable Mesh" }, items: [{ name: "Nike Air", price: "₹5499", quantity: 1 }] }
        ];
      } else if (selectedBizType === 'Accessories') {
        defaultProducts = [
          { id: Date.now() + 1, name: "Infinite Band Ring", price: "₹1499", rating: 4.7, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80", category: "Rings", desc: "Crafted with 92.5 pure silver." }
        ];
        defaultOrders = [
          { id: `AC-3001`, customer: "Diana Prince", date: timestamp, amount: "₹1499", status: "Shipped", payment: "Paid", email: "diana@example.com", customFields: { metal: "Rose Gold", engraving: "For D" }, items: [{ name: "Infinite Band Ring", price: "₹1499", quantity: 1 }] }
        ];
      } else if (selectedBizType === 'Fashion') {
        defaultProducts = [
          { id: Date.now() + 1, name: "Classic Organic Tee", price: "₹1499", rating: 4.8, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80", category: "Essentials", desc: "Mid-weight organic cotton tee with a perfect premium drape." }
        ];
        defaultOrders = [
          { id: `CL-6001`, customer: "Robert Downey", date: timestamp, amount: "₹1499", status: "Packed", payment: "Paid", email: "robert@example.com", customFields: { size: "M", color: "Vintage Indigo", fit: "Relaxed Fit" }, items: [{ name: "Classic Organic Tee", price: "₹1499", quantity: 1 }] }
        ];
      } else if (selectedBizType === 'Handmade') {
        defaultProducts = [
          { id: Date.now() + 1, name: "Eco Clay Plant Pot", price: "₹899", rating: 5.0, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80", category: "Clay", desc: "A breathable, handmade planter." }
        ];
        defaultOrders = [
          { id: `HM-4001`, customer: "Sarah Connor", date: timestamp, amount: "₹899", status: "In Progress", payment: "Paid", email: "sarah@example.com", customFields: { notes: "Anime mug with Hunter X Hunter themes" }, items: [{ name: "Eco Clay Plant Pot", price: "₹899", quantity: 1 }] }
        ];
      } else {
        defaultProducts = [
          { id: Date.now() + 1, name: "Bespoke Custom Creation", price: "₹2499", rating: 4.8, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80", category: "Custom", desc: "A bespoke custom creation configured to specifications." }
        ];
        defaultOrders = [
          { id: `CS-5001`, customer: "Bruce Wayne", date: timestamp, amount: "₹2499", status: "Preparing", payment: "Paid", email: "bruce@example.com", customFields: { customNotes: "Standard custom specifications" }, items: [{ name: "Bespoke Custom Creation", price: "₹2499", quantity: 1 }] }
        ];
      }

      // Update business subscription limits & subscribe state with newly built custom details
      updateBusiness(biz.id, {
        isSubscribed: true,
        name: bizName || biz.name,
        category: selectedBizType === 'Fashion' ? 'Clothing' : selectedBizType,
        theme: preferredTheme,
        brandColor: primaryColor,
        tagline: bizTagline,
        targetAudience: targetAudience,
        customRequirements: storeRequirements,
        fields: [
          ...customFields.map((f, i) => ({
            id: `custom-${f.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${i}`,
            name: f.name,
            type: f.type,
            required: false
          }))
        ],
        products: defaultProducts,
        orders: defaultOrders,
        subscription: 'Custom Plan',
        whatsappMessagesCount: customMessagesCount,
        additionalFeatures: selectedFeatures,
        customAnswers: selectedBizType === 'Custom' ? customAnswers : null
      });

      // Auto-log them in as the operator for this business
      loginSeller(biz.id, `${bizName || biz.name} Operator`);
      
      alert(`🎉 Workspace Subscribed Successfully!\nSelected Features: core webpage catalog + ${selectedFeatures.length} checked add-ons.\nStarting Monthly messages: ${customMessagesCount} messages.\n\nOperator Panel unlocked!`);
      window.location.href = '/admin';
    }, 1500);
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
                top: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '95%',
                maxWidth: isMobile ? '500px' : '1000px',
                height: '90vh',
                background: 'white',
                borderRadius: '28px',
                padding: isMobile ? '1.5rem 1rem' : '2.5rem 3rem',
                zIndex: 10001,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                border: `1px solid ${t.border}`,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem', flexShrink: 0 }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: t.primaryLight, color: t.primary, display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                  <CreditCard size={20} />
                </div>
                {/* Purple Visual Debug Badge */}
                <div style={{ background: '#7C3AED', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 900, display: 'inline-block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  NEW BUSINESS CONFIG LOADED
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 0.1rem', color: t.textDark }}>Activate SaaS Subscription</h3>
                <p style={{ color: t.textMuted, fontSize: '0.8rem', margin: 0, fontWeight: 500 }}>Unlock complete dashboard scopes for your custom workspace</p>
              </div>

              <form onSubmit={handleSubscribe} style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : '1.25fr 0.75fr', 
                gap: '2.5rem', 
                flex: 1,
                minHeight: 0,
                height: 'calc(100% - 100px)',
                overflow: 'hidden',
                paddingRight: '8px',
                boxSizing: 'border-box'
              }}>
                
                {/* LEFT COLUMN: Configurations & Onboarding */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', minHeight: 0, paddingRight: '8px' }} className="no-scrollbar">
                  
                  {/* Core Webpage Card */}
                  <div style={{ background: 'linear-gradient(135deg, #FFFDFB 0%, #FFF5F2 100%)', color: 'var(--color-brown-dark)', padding: '1.2rem', borderRadius: '16px', border: '1.5px solid rgba(122, 78, 58, 0.15)', boxShadow: '0 4px 15px rgba(122,78,58,0.02)', flexShrink: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ background: 'var(--gradient-pink)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 900 }}>INCLUDED</div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: 0 }}>Responsive Storefront Catalog</h4>
                      </div>
                      <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-pink)' }}>₹199<span style={{ fontSize: '0.75rem', opacity: 0.7 }}>/mo</span></span>
                    </div>
                    <p style={{ color: 'var(--color-brown)', fontSize: '0.75rem', margin: 0, fontWeight: 650, lineHeight: 1.35 }}>
                      Active custom public catalog page (`/store/${biz.id}`) with Rupee support, order cart checkout, and settings variables.
                    </p>
                  </div>

                  {/* MASTER SECTION CARD: SELECT YOUR BUSINESS EXPERIENCE */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1.2rem', 
                    background: '#FFFFFF', 
                    border: '3px solid red', 
                    padding: '1.5rem', 
                    borderRadius: '20px', 
                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                    boxSizing: 'border-box'
                  }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 950, color: t.textDark, margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '-0.3px' }}>
                        SELECT YOUR BUSINESS EXPERIENCE
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: t.textMuted, margin: 0, fontWeight: 600, lineHeight: 1.4 }}>
                        Tell us what kind of business you're building and we'll configure your workspace automatically.
                      </p>
                    </div>

                    {/* Step 1 Selection Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                      {[
                        { id: 'Cake', icon: '🎂', label: '🎂 Cake' },
                        { id: 'Shoes', icon: '👟', label: '👟 Shoes' },
                        { id: 'Accessories', icon: '💍', label: '💍 Accessories' },
                        { id: 'Fashion', icon: '👕', label: '👕 Fashion' },
                        { id: 'Handmade', icon: '🧵', label: '🧵 Handmade' },
                        { id: 'Custom', icon: '✨', label: '✨ Custom Business' }
                      ].map(item => {
                        const isSelected = selectedBizType === item.id;
                        return (
                          <motion.div
                            key={item.id}
                            onClick={() => handleSelectBizType(item.id)}
                            whileHover={{ scale: 1.04, boxShadow: '0 8px 20px rgba(79, 70, 229, 0.15)' }}
                            whileTap={{ scale: 0.96 }}
                            animate={isSelected ? { scale: [1, 1.03, 1] } : {}}
                            transition={isSelected ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
                            style={{
                              padding: '0.8rem 0.5rem',
                              borderRadius: '14px',
                              background: isSelected ? 'rgba(79, 70, 229, 0.08)' : '#FFFFFF',
                              border: isSelected ? '2.5px solid #4F46E5' : '1px solid rgba(0,0,0,0.06)',
                              cursor: 'pointer',
                              textAlign: 'center',
                              boxSizing: 'border-box'
                            }}
                          >
                            <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{item.icon.split(' ')[0]}</div>
                            <div style={{ fontWeight: 800, fontSize: '0.75rem', color: t.textDark }}>{item.label.substring(2)}</div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* REQUIRED CHECKPOINT WARNING BUBBLE */}
                    {selectedBizType === "" && (
                      <div style={{
                        textAlign: 'center',
                        padding: '2.5rem 1.5rem',
                        background: 'rgba(248, 250, 252, 0.75)',
                        borderRadius: '16px',
                        border: '1px dashed #CBD5E1',
                        color: '#64748B',
                        fontWeight: 700,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.6rem'
                      }}>
                        <Sparkles size={24} color="#4F46E5" />
                        <div style={{ fontSize: '0.9rem', color: '#0F172A', fontWeight: 900 }}>Select your business type to continue</div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 500, color: t.textMuted }}>We will automatically configure pages, dynamic builders, and customized pricing values upon selection.</div>
                      </div>
                    )}

                    {/* Step 2 Dynamic Preview Container */}
                    <AnimatePresence mode="wait">
                      {selectedBizType !== "" && (
                        <motion.div
                          key={selectedBizType}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            background: '#F8FAFC',
                            border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '16px',
                            padding: '1.2rem',
                            fontSize: '0.75rem',
                            lineHeight: 1.4,
                            color: t.textMuted
                          }}
                        >
                          <div style={{ fontWeight: 800, color: t.textDark, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Selected: {selectedBizType} Business</span>
                            <span style={{ color: '#10B981', fontWeight: 900, fontSize: '0.65rem', background: 'rgba(16,185,129,0.08)', padding: '2px 8px', borderRadius: '100px' }}>● Auto-generated preview</span>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '8px' }}>
                            <div>
                              <span style={{ fontWeight: 800, color: t.textDark, display: 'block', marginBottom: '4px' }}>Pages Included:</span>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                {getPreviewData().pages.map(p => (
                                  <span key={p} style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 650, color: t.textDark }}>{p}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span style={{ fontWeight: 800, color: t.textDark, display: 'block', marginBottom: '4px' }}>Dashboard Modules:</span>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                {getPreviewData().modules.map(m => (
                                  <span key={m} style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 650, color: t.textDark }}>{m}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ borderTop: '1px dashed rgba(0,0,0,0.06)', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: t.textDark, fontWeight: 650 }}>
                              <b>Sample Booking:</b> {getPreviewData().sample.name} ({getPreviewData().sample.detail})
                            </span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '2px 6px', borderRadius: '6px', fontSize: '0.62rem', fontWeight: 800 }}>Paid</span>
                              <span style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', padding: '2px 6px', borderRadius: '6px', fontSize: '0.62rem', fontWeight: 800 }}>{getPreviewData().sample.status}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 3 Brand Specifications Inputs */}
                    {selectedBizType !== "" && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.2rem' }}>
                        <div style={{ fontWeight: 900, fontSize: '0.85rem', color: t.textDark, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>🛠️ BUILD YOUR STORE EXPERIENCE</span>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>BUSINESS NAME</label>
                            <input
                              type="text"
                              placeholder="e.g. Velvet Rose"
                              value={bizName}
                              onChange={e => setBizName(e.target.value)}
                              style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box', fontWeight: 650 }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>STORE TAGLINE</label>
                            <input
                              type="text"
                              placeholder="Custom layer cakes..."
                              value={bizTagline}
                              onChange={e => setBizTagline(e.target.value)}
                              style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box', fontWeight: 650 }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '0.8rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>PREFERRED THEME</label>
                            <select
                              value={preferredTheme}
                              onChange={e => setPreferredTheme(e.target.value)}
                              style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', background: 'white', fontWeight: 650 }}
                            >
                              <option value="Modern">Modern Premium</option>
                              <option value="Minimal">Minimal Dark/White</option>
                              <option value="Luxury">Luxury Serif</option>
                              <option value="Dark">Dark Street Accent</option>
                              <option value="Instagram-first">Instagram Feed Style</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>BRAND COLOR</label>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <input
                                type="color"
                                value={primaryColor}
                                onChange={e => setPrimaryColor(e.target.value)}
                                style={{ width: '28px', height: '28px', border: 'none', padding: 0, cursor: 'pointer', background: 'transparent' }}
                              />
                              <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 700, color: t.textDark }}>{primaryColor}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>TARGET AUDIENCE</label>
                          <input
                            type="text"
                            placeholder="e.g. Wedding couples, Gen Z streetwear enthusiasts"
                            value={targetAudience}
                            onChange={e => setTargetAudience(e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box', fontWeight: 650 }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>DESCRIBE YOUR STORE REQUIREMENTS</label>
                          <textarea
                            placeholder="I want a premium wedding cake storefront with custom cake builder, WhatsApp updates and same-day delivery."
                            value={storeRequirements}
                            onChange={e => setStoreRequirements(e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box', height: '50px', resize: 'none', fontFamily: 'inherit', fontWeight: 600, lineHeight: 1.3 }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4 Custom Checkout Options Builder */}
                    {selectedBizType !== "" && (
                      <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: t.textDark }}>💼 CUSTOM CHECKOUT FIELDS</span>
                          <button
                            type="button"
                            onClick={() => setShowFieldBuilder(!showFieldBuilder)}
                            style={{ border: 'none', background: 'none', color: '#4F46E5', fontWeight: 800, fontSize: '0.7rem', cursor: 'pointer', outline: 'none' }}
                          >
                            {showFieldBuilder ? '× Close Builder' : '* Add Custom Requirement'}
                          </button>
                        </div>

                        {showFieldBuilder && (
                          <div style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.06)', padding: '1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                              <div>
                                <label style={{ fontSize: '0.6rem', color: t.textMuted, fontWeight: 700, display: 'block', marginBottom: '2px' }}>FIELD NAME</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Solitaire Size, Flavor Notes"
                                  value={newFieldName}
                                  onChange={e => setNewFieldName(e.target.value)}
                                  style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: '0.6rem', color: t.textMuted, fontWeight: 700, display: 'block', marginBottom: '2px' }}>FIELD TYPE</label>
                                <select
                                  value={newFieldType}
                                  onChange={e => setNewFieldType(e.target.value)}
                                  style={{ width: '100%', padding: '5px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', background: 'white' }}
                                >
                                  {['Text field', 'Dropdown', 'Date picker', 'Upload', 'Color selector', 'Message field', 'Reference image', 'Weight', 'Size', 'Flavor', 'Material', 'Other / Custom Field'].map(ty => (
                                    <option key={ty} value={ty}>{ty}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {newFieldType === 'Other / Custom Field' && (
                              <div>
                                <label style={{ fontSize: '0.6rem', color: t.textMuted, fontWeight: 700, display: 'block', marginBottom: '2px' }}>ENTER CUSTOM FIELD TYPE</label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. Prong Solitaire Style, Twig Handle Celadon"
                                  value={customWriteInType}
                                  onChange={e => setCustomWriteInType(e.target.value)}
                                  style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                if (!newFieldName.trim()) return;
                                const finalType = newFieldType === 'Other / Custom Field' ? (customWriteInType.trim() || 'Custom Field') : newFieldType;
                                setCustomFields(prev => [...prev, { name: newFieldName, type: finalType }]);
                                setNewFieldName('');
                                setCustomWriteInType('');
                                setShowFieldBuilder(false);
                              }}
                              style={{ width: '100%', padding: '6px', background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}
                            >
                              Inject Custom Field Block
                            </button>
                          </div>
                        )}

                        {customFields.length > 0 ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                            {customFields.map((field, idx) => (
                              <span
                                key={idx}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  background: 'rgba(79, 70, 229, 0.08)',
                                  color: '#4F46E5',
                                  padding: '4px 10px',
                                  borderRadius: '100px',
                                  fontSize: '0.68rem',
                                  fontWeight: 800
                                }}
                              >
                                <span>{field.name} ({field.type})</span>
                                <button
                                  type="button"
                                  onClick={() => setCustomFields(prev => prev.filter((_, i) => i !== idx))}
                                  style={{ border: 'none', background: 'none', color: '#4F46E5', cursor: 'pointer', fontWeight: 900, padding: 0, outline: 'none' }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div style={{ fontSize: '0.7rem', color: t.textMuted, fontStyle: 'italic' }}>No custom fields added yet. Dynamic storefront will use default parameters.</div>
                        )}
                      </div>
                    )}

                    {/* Step 6 Bespoke Custom Business Panel */}
                    {selectedBizType === 'Custom' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'rgba(79, 70, 229, 0.03)', border: '1px dashed #4F46E5', padding: '1.2rem', borderRadius: '20px', marginTop: '0.5rem' }}>
                        <div style={{ fontWeight: 900, fontSize: '0.85rem', color: '#4F46E5', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>✨ BESPOKE ENTERPRISE CONFIGURATOR</span>
                        </div>
                        <p style={{ fontSize: '0.68rem', color: t.textMuted, margin: 0, fontWeight: 500 }}>Describe your exact blueprint and our system will configure a custom multi-tenant environment.</p>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>WHAT DO YOU SELL?</label>
                          <textarea
                            placeholder="e.g. Handmade wooden surfboards, personalized gift bundles..."
                            value={customAnswers.sellType}
                            onChange={e => setCustomAnswers({ ...customAnswers, sellType: e.target.value })}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>REQUIRED PAGES</label>
                          <textarea
                            placeholder="e.g. Catalog grid, custom gallery, 3D configurator..."
                            value={customAnswers.pagesNeeded}
                            onChange={e => setCustomAnswers({ ...customAnswers, pagesNeeded: e.target.value })}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>HOW SHOULD ORDERING WORK?</label>
                          <textarea
                            placeholder="e.g. Pay 50% deposit via UPI, receive WhatsApp approval step..."
                            value={customAnswers.orderingFlow}
                            onChange={e => setCustomAnswers({ ...customAnswers, orderingFlow: e.target.value })}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>EXPECTED CUSTOMER JOURNEY</label>
                          <textarea
                            placeholder="Describe how a custom buyer discovers, configures options, checks out, and tracks delivery..."
                            value={customAnswers.customerJourney}
                            onChange={e => setCustomAnswers({ ...customAnswers, customerJourney: e.target.value })}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>BUSINESS EXAMPLES</label>
                          <textarea
                            placeholder="Reference direct competitors or websites that represent your ideal flow..."
                            value={customAnswers.referenceExamples}
                            onChange={e => setCustomAnswers({ ...customAnswers, referenceExamples: e.target.value })}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>CUSTOM WORKFLOW NOTES</label>
                          <textarea
                            placeholder="Detail any backend requirements, CRM plugins, or invoice patterns..."
                            value={customAnswers.workflowNotes}
                            onChange={e => setCustomAnswers({ ...customAnswers, workflowNotes: e.target.value })}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: t.textMuted, marginBottom: '2px' }}>UPLOAD INSPIRATION IMAGES</label>
                          <div style={{ border: '2px dashed rgba(79, 70, 229, 0.2)', padding: '0.6rem', borderRadius: '10px', textAlign: 'center', background: '#FFFFFF', cursor: 'pointer' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                              📷 Drag & drop design mockups or click to browse
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BOTTOM SECTIONS: Add-ons & Messages Quota - Hidden/Disabled until selection is made */}
                  {selectedBizType !== "" && (
                    <>
                      {/* Features Checklist */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: t.textDark, margin: '0 0 2px 0' }}>Select Storefront Add-On Features</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          {[
                            { name: 'Advanced Custom Fields Builder', price: 150, desc: 'Allow custom dropdowns, date pickers, or text fields on catalog checkouts.' },
                            { name: 'AI Chatbot Automation', price: 250, desc: 'Enable automated confirmation logs & AI conversational auto-replies on WhatsApp.' },
                            { name: 'Shipping Integration', price: 300, desc: 'Provide tracking dispatches synced directly with Delhivery, Shiprocket, or Porter.' },
                            { name: 'Advanced Styling Themes', price: 100, desc: 'Unlock premium styling theme templates (Luxury, Minimal, Dark Accent editors).' },
                            { name: 'Commission-Free Sales', price: 200, desc: '0% platform sales commission fees on all transacted orders.' }
                          ].map(feat => {
                            const isChecked = selectedFeatures.includes(feat.name);
                            return (
                              <div
                                key={feat.name}
                                onClick={() => {
                                  setSelectedFeatures(prev => 
                                    isChecked ? prev.filter(x => x !== feat.name) : [...prev, feat.name]
                                  );
                                }}
                                style={{
                                  padding: '0.8rem 1rem',
                                  borderRadius: '12px',
                                  background: isChecked ? 'rgba(79, 70, 229, 0.04)' : '#FFFFFF',
                                  border: isChecked ? '2px solid #4F46E5' : '1px solid rgba(0,0,0,0.06)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  transition: 'all 0.2s',
                                  boxSizing: 'border-box'
                                }}
                              >
                                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', paddingRight: '0.8rem' }}>
                                  <div style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '4px',
                                    border: isChecked ? 'none' : '2px solid rgba(0,0,0,0.15)',
                                    background: isChecked ? '#4F46E5' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    marginTop: '2px',
                                    flexShrink: 0
                                  }}>
                                    {isChecked && <Check size={10} strokeWidth={4} />}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 800, color: t.textDark, fontSize: '0.8rem' }}>{feat.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: t.textMuted, marginTop: '2px', lineHeight: 1.2 }}>{feat.desc}</div>
                                  </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 900, color: isChecked ? '#4F46E5' : t.textDark }}>
                                    +₹{feat.price}
                                  </span>
                                  <span style={{ fontSize: '0.6rem', color: t.textMuted, fontWeight: 700 }}>/ mo</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Messages Quota Controller */}
                      <div style={{ background: '#FFF8F3', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(122,78,58,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                        <span style={{ fontSize: '0.68rem', color: 'var(--color-pink)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Social Message Quota limit
                        </span>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                          <button
                            type="button"
                            onClick={() => {
                              if (customMessagesCount > 200) setCustomMessagesCount(prev => prev - 50);
                            }}
                            disabled={customMessagesCount <= 200}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              border: '1px solid rgba(0,0,0,0.1)',
                              background: customMessagesCount <= 200 ? '#F1F5F9' : '#FFFFFF',
                              color: customMessagesCount <= 200 ? '#94A3B8' : 'var(--color-brown-dark)',
                              fontSize: '1.1rem',
                              fontWeight: 'bold',
                              cursor: customMessagesCount <= 200 ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                              outline: 'none'
                            }}
                          >
                            −
                          </button>
                          
                          <div style={{ textAlign: 'center', width: '120px' }}>
                            <div style={{ fontSize: '1.6rem', fontWeight: 950, color: 'var(--color-brown-dark)', letterSpacing: '-0.5px' }}>
                              {customMessagesCount}
                            </div>
                            <span style={{ fontSize: '0.65rem', color: t.textMuted, fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>
                              Messages / Month
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setCustomMessagesCount(prev => prev + 50)}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              border: '1px solid rgba(0,0,0,0.1)',
                              background: '#FFFFFF',
                              color: 'var(--color-brown-dark)',
                              fontSize: '1.1rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                              outline: 'none'
                            }}
                          >
                            +
                          </button>
                        </div>

                        <span style={{ fontSize: '0.68rem', color: t.textMuted, fontWeight: 700 }}>
                          {customMessagesCount <= 200 
                            ? '✨ Baseline Quota (₹100 included in core price)' 
                            : `📈 Accruing +${customMessagesCount - 200} extra messages at ₹25 per 50 block`}
                        </span>
                      </div>
                    </>
                  )}

                </div>

                {/* RIGHT COLUMN: Ledger & Razorpay simulated billing card (Step 5 dynamic sync) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: isMobile ? 'static' : 'sticky', top: 0 }}>
                  
                  {selectedBizType === "" ? (
                    /* REQUIRED CHECKPOINT LOCKED RIGHT COLUMN CARD */
                    <div style={{
                      background: '#0F172A',
                      color: 'white',
                      padding: '2.5rem 1.5rem',
                      borderRadius: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      gap: '1rem',
                      minHeight: '260px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      boxSizing: 'border-box',
                      opacity: 0.85
                    }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Lock size={18} color="#94A3B8" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: 'white', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Ledger Gated</h4>
                        <p style={{ fontSize: '0.72rem', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
                          Select your business experience type in Step 1 to unlock pricing ledger, configurations, and checkout checkout fields.
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* ACTIVE LEDGER & SIMULATED PAYMENTS BLOCK */
                    <div style={{
                      background: '#0F172A',
                      color: 'white',
                      padding: '1.2rem',
                      borderRadius: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      boxSizing: 'border-box'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', marginBottom: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ opacity: 0.75 }}>Core Storefront:</span>
                          <span>₹{getBillingDetails().baseHosting}</span>
                        </div>
                        {selectedFeatures.map(feat => {
                          let fPrice = 150;
                          if (feat === 'AI Chatbot Automation') fPrice = 250;
                          if (feat === 'Shipping Integration') fPrice = 300;
                          if (feat === 'Advanced Styling Themes') fPrice = 100;
                          if (feat === 'Commission-Free Sales') fPrice = 200;
                          return (
                            <div key={feat} style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '6px', borderLeft: '1.5px solid rgba(255,255,255,0.15)' }}>
                              <span style={{ opacity: 0.65 }}>+ {feat.replace('Advanced ', '')}:</span>
                              <span>₹{fPrice}</span>
                            </div>
                          );
                        })}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ opacity: 0.75 }}>Messages ({getBillingDetails().msgCount} msgs):</span>
                          <span>₹{getBillingDetails().totalMsgCost}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.4rem', marginTop: '0.2rem', fontWeight: 800 }}>
                          <span>Subtotal:</span>
                          <span>₹{getBillingDetails().subtotal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ opacity: 0.75 }}>GST Tax (18%):</span>
                          <span>₹{getBillingDetails().tax}</span>
                        </div>
                      </div>

                      <div style={{ borderTop: '2px dashed rgba(255,255,255,0.12)', paddingTop: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 900 }}>Total Billed:</span>
                          <motion.span 
                            key={getBillingDetails().total}
                            initial={{ scale: 0.85, opacity: 0.8 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            style={{ fontSize: '1.5rem', fontWeight: 950, color: '#60A5FA' }}
                          >
                            ₹{getBillingDetails().total}
                            <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 800 }}> / mo</span>
                          </motion.span>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button 
                              type="button"
                              onClick={() => setPaymentMethod('upi')} 
                              style={{ flex: 1, padding: '4px', borderRadius: '6px', border: 'none', background: paymentMethod === 'upi' ? 'var(--color-pink)' : 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 800, fontSize: '0.65rem', cursor: 'pointer' }}
                            >
                              UPI QR
                            </button>
                            <button 
                              type="button"
                              onClick={() => setPaymentMethod('card')} 
                              style={{ flex: 1, padding: '4px', borderRadius: '6px', border: 'none', background: paymentMethod === 'card' ? 'var(--color-pink)' : 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 800, fontSize: '0.65rem', cursor: 'pointer' }}
                            >
                              Card
                            </button>
                          </div>

                          {paymentMethod === 'upi' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: '#FFFFFF', padding: '6px', borderRadius: '8px', color: '#0F172A' }}>
                              <div style={{ width: '60px', height: '60px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontWeight: 900, fontSize: '0.55rem', border: '1.5px solid #E2E8F0', padding: '4px', boxSizing: 'border-box' }}>
                                [QR ₹{getBillingDetails().total}]
                              </div>
                              <span style={{ fontSize: '0.6rem', color: '#64748B', fontWeight: 800 }}>Scan QR from PhonePe / GPay</span>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <input 
                                type="text" 
                                placeholder="4000 1234 5678 9010" 
                                maxLength="19"
                                style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.7rem', fontWeight: 600, outline: 'none' }}
                              />
                              <div style={{ display: 'flex', gap: '4px' }}>
                                <input 
                                  type="text" 
                                  placeholder="MM/YY" 
                                  style={{ flex: 1, padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.7rem', fontWeight: 600, outline: 'none' }}
                                />
                                <input 
                                  type="password" 
                                  placeholder="CVV" 
                                  maxLength="3"
                                  style={{ flex: 1, padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.7rem', fontWeight: 600, outline: 'none' }}
                                />
                              </div>
                            </div>
                          )}

                          <button 
                            type="submit" 
                            disabled={loading}
                            style={{
                              width: '100%',
                              padding: '10px',
                              background: t.primaryGradient,
                              color: 'white',
                              border: 'none',
                              borderRadius: '10px',
                              fontWeight: 900,
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              boxShadow: t.shadowGlow
                            }}
                          >
                            {loading ? (
                              <>
                                <RefreshCw size={12} className="spin" style={{ margin: 'auto' }} /> Simulating Razorpay...
                              </>
                            ) : (
                              <>
                                <ShieldCheck size={12} /> Pay ₹{getBillingDetails().total} & Unlock
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SaaSSandboxBanner;
