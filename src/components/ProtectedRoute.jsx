import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';
import { 
  Lock, Sparkles, CreditCard, Check, ShieldCheck, Zap, 
  BarChart2, RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

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

const ProtectedRoute = ({ children }) => {
  const { user, switchRole, loginSeller } = useAuth();
  const { businesses, updateBusiness } = useTenant();

  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];

  // Custom detailed form states for subscription barrier
  const [selectedFeatures, setSelectedFeatures] = useState(['Advanced Custom Fields Builder']);
  const [customMessagesCount, setCustomMessagesCount] = useState(200);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessingPay, setIsProcessingPay] = useState(false);

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

  // If the user's business is already subscribed, let them through
  if (biz && biz.isSubscribed) {
    return children;
  }

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

  // Dynamic Gating Cost Calculations
  const getBillingDetails = () => {
    if (!selectedBizType) {
      return { baseHosting: 0, featuresCost: 0, msgCount: 0, totalMsgCost: 0, subtotal: 0, tax: 0, total: 0 };
    }
    const baseHosting = 199;
    
    // Feature costs
    let featuresCost = 0;
    if (selectedFeatures.includes('Advanced Custom Fields Builder')) featuresCost += 150;
    if (selectedFeatures.includes('AI Chatbot Automation')) featuresCost += 250;
    if (selectedFeatures.includes('Shipping Integration')) featuresCost += 300;
    if (selectedFeatures.includes('Advanced Styling Themes')) featuresCost += 100;
    if (selectedFeatures.includes('Commission-Free Sales')) featuresCost += 200;

    // Messages cost: starts at 200, increments in blocks of 50
    const msgCount = Math.max(200, customMessagesCount || 200);
    const baseMsgCost = 100; // first 200 msgs
    const extraMsgBlocks = Math.max(0, Math.floor((msgCount - 200) / 50));
    const extraMsgCost = extraMsgBlocks * 25; // ₹25 per 50 extra messages
    const totalMsgCost = baseMsgCost + extraMsgCost;

    const subtotal = baseHosting + featuresCost + totalMsgCost;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    return { baseHosting, featuresCost, msgCount, totalMsgCost, subtotal, tax, total };
  };

  const handleSubscribe = () => {
    if (!selectedBizType) return;
    setIsProcessingPay(true);
    
    setTimeout(() => {
      setIsProcessingPay(false);
      setShowCheckout(false);
      
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
      updateBusiness(activeBizId, {
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
      loginSeller(activeBizId, `${bizName || biz.name} Operator`);
      
      alert(`🎉 Workspace Subscribed Successfully!\nSelected Features: core webpage catalog + ${selectedFeatures.length} checked add-ons.\nStarting Monthly messages: ${customMessagesCount} messages.\n\nOperator Panel unlocked!`);
    }, 1200);
  };

  const billing = getBillingDetails();

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.05) 0%, rgba(15, 23, 42, 0.03) 90%), #F8FAFC',
        padding: '8rem 2rem 4rem',
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
          style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '700px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(79, 70, 229, 0.08)',
            color: '#4F46E5',
            padding: '0.6rem 1.2rem',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1.2rem'
          }}>
            <Lock size={14} /> Gated Seller Suite
          </div>

          {/* Purple Visual Debug Badge */}
          <div style={{ display: 'block', margin: '0 auto 1.2rem', width: 'fit-content' }}>
            <div style={{ background: '#7C3AED', color: 'white', padding: '6px 14px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 4px 10px rgba(124, 58, 237, 0.2)' }}>
              NEW BUSINESS CONFIG LOADED
            </div>
          </div>
          
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '2.8rem',
            fontWeight: 900,
            color: '#0F172A',
            margin: '0 0 1rem',
            lineHeight: 1.15
          }}>
            Unlock Operator Panel for <span style={{ color: '#4F46E5' }}>{biz?.name || activeBizId}</span>
          </h1>
          
          <p style={{
            fontSize: '1.05rem',
            color: '#64748B',
            fontWeight: 500,
            lineHeight: 1.6,
            margin: 0
          }}>
            To review product catalogs, accept custom orders, configure WhatsApp templates, and check customer databases, customize your features list and subscribe to secure your public webpage.
          </p>
        </motion.div>

        {/* Detailed Form & Checkout Split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
          gap: '2.5rem',
          width: '100%',
          maxWidth: '1200px',
          marginBottom: '3rem',
          alignItems: 'start'
        }}>
          
          {/* Left: Custom Feature Form selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            
            {/* Core Webpage Card */}
            <div style={{
              background: 'rgba(79, 70, 229, 0.04)',
              color: '#0F172A',
              padding: '1.8rem',
              borderRadius: '24px',
              border: '2.5px solid rgba(79, 70, 229, 0.15)',
              boxShadow: '0 10px 30px rgba(79, 70, 229, 0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', color: 'white', padding: '3px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 900 }}>INCLUDED</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>Responsive Storefront Catalog</h3>
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#4F46E5' }}>₹199<span style={{ fontSize: '0.8rem', opacity: 0.7 }}>/mo</span></span>
              </div>
              <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0, fontWeight: 650, lineHeight: 1.4 }}>
                Active custom public catalog page (`/store/${activeBizId}`) complete with localized currency (₹), checkout forms, size charts, and tracking indicators.
              </p>
            </div>

            {/* MASTER CARD: SELECT YOUR BUSINESS EXPERIENCE */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.2rem', 
              background: '#FFFFFF', 
              border: '3px solid red', // VISUAL DEBUG BORDER
              padding: '1.8rem', 
              borderRadius: '24px', 
              boxShadow: '0 10px 35px -5px rgba(15, 23, 42, 0.04)',
              boxSizing: 'border-box'
            }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 950, color: '#0F172A', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '-0.3px' }}>
                  SELECT YOUR BUSINESS EXPERIENCE
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, fontWeight: 600, lineHeight: 1.4 }}>
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
                      <div style={{ fontWeight: 800, fontSize: '0.75rem', color: '#0F172A' }}>{item.label.substring(2)}</div>
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
                  <div style={{ fontSize: '0.72rem', fontWeight: 500, color: '#64748B' }}>We will automatically configure pages, dynamic builders, and customized pricing values upon selection.</div>
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
                      color: '#64748B'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: '#0F172A', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Selected: {selectedBizType} Business</span>
                      <span style={{ color: '#10B981', fontWeight: 900, fontSize: '0.65rem', background: 'rgba(16,185,129,0.08)', padding: '2px 8px', borderRadius: '100px' }}>● Auto-generated preview</span>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '4px' }}>Pages Included:</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {getPreviewData().pages.map(p => (
                            <span key={p} style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 650, color: '#0F172A' }}>{p}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span style={{ fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '4px' }}>Dashboard Modules:</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {getPreviewData().modules.map(m => (
                            <span key={m} style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 650, color: '#0F172A' }}>{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ borderTop: '1px dashed rgba(0,0,0,0.06)', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#0F172A', fontWeight: 650 }}>
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
                  <div style={{ fontWeight: 900, fontSize: '0.85rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🛠️ BUILD YOUR STORE EXPERIENCE</span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>BUSINESS NAME</label>
                      <input
                        type="text"
                        placeholder="e.g. Velvet Rose"
                        value={bizName}
                        onChange={e => setBizName(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box', fontWeight: 650 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>STORE TAGLINE</label>
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
                      <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>PREFERRED THEME</label>
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
                      <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>BRAND COLOR</label>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={e => setPrimaryColor(e.target.value)}
                          style={{ width: '28px', height: '28px', border: 'none', padding: 0, cursor: 'pointer', background: 'transparent' }}
                        />
                        <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 700, color: '#0F172A' }}>{primaryColor}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>TARGET AUDIENCE</label>
                    <input
                      type="text"
                      placeholder="e.g. Wedding couples, Gen Z streetwear enthusiasts"
                      value={targetAudience}
                      onChange={e => setTargetAudience(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box', fontWeight: 650 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>DESCRIBE YOUR STORE REQUIREMENTS</label>
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
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>💼 CUSTOM CHECKOUT FIELDS</span>
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
                          <label style={{ fontSize: '0.6rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: '2px' }}>FIELD NAME</label>
                          <input
                            type="text"
                            placeholder="e.g. Solitaire Size, Flavor Notes"
                            value={newFieldName}
                            onChange={e => setNewFieldName(e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.6rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: '2px' }}>FIELD TYPE</label>
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
                          <label style={{ fontSize: '0.6rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: '2px' }}>ENTER CUSTOM FIELD TYPE</label>
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
                    <div style={{ fontSize: '0.7rem', color: '#64748B', fontStyle: 'italic' }}>No custom fields added yet. Dynamic storefront will use default parameters.</div>
                  )}
                </div>
              )}

              {/* Step 6 Bespoke Custom Business Panel */}
              {selectedBizType === 'Custom' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'rgba(79, 70, 229, 0.03)', border: '1px dashed #4F46E5', padding: '1.2rem', borderRadius: '20px', marginTop: '0.5rem' }}>
                  <div style={{ fontWeight: 900, fontSize: '0.85rem', color: '#4F46E5', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>✨ BESPOKE ENTERPRISE CONFIGURATOR</span>
                  </div>
                  <p style={{ fontSize: '0.68rem', color: '#64748B', margin: 0, fontWeight: 500 }}>Describe your exact blueprint and our system will configure a custom multi-tenant environment.</p>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>WHAT DO YOU SELL?</label>
                    <textarea
                      placeholder="e.g. Handmade wooden surfboards, personalized gift bundles..."
                      value={customAnswers.sellType}
                      onChange={e => setCustomAnswers({ ...customAnswers, sellType: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>REQUIRED PAGES</label>
                    <textarea
                      placeholder="e.g. Catalog grid, custom gallery, 3D configurator..."
                      value={customAnswers.pagesNeeded}
                      onChange={e => setCustomAnswers({ ...customAnswers, pagesNeeded: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>HOW SHOULD ORDERING WORK?</label>
                    <textarea
                      placeholder="e.g. Pay 50% deposit via UPI, receive WhatsApp approval step..."
                      value={customAnswers.orderingFlow}
                      onChange={e => setCustomAnswers({ ...customAnswers, orderingFlow: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>EXPECTED CUSTOMER JOURNEY</label>
                    <textarea
                      placeholder="Describe how a custom buyer discovers, configures options, checks out, and tracks delivery..."
                      value={customAnswers.customerJourney}
                      onChange={e => setCustomAnswers({ ...customAnswers, customerJourney: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>BUSINESS EXAMPLES</label>
                    <textarea
                      placeholder="Reference direct competitors or websites that represent your ideal flow..."
                      value={customAnswers.referenceExamples}
                      onChange={e => setCustomAnswers({ ...customAnswers, referenceExamples: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>CUSTOM WORKFLOW NOTES</label>
                    <textarea
                      placeholder="Detail any backend requirements, CRM plugins, or invoice patterns..."
                      value={customAnswers.workflowNotes}
                      onChange={e => setCustomAnswers({ ...customAnswers, workflowNotes: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.7rem', outline: 'none', boxSizing: 'border-box', height: '36px', resize: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: '#64748B', marginBottom: '2px' }}>UPLOAD INSPIRATION IMAGES</label>
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
                {/* Modular add-ons checkboxes */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '28px',
                  padding: '2.2rem',
                  border: '1.5px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: '0 10px 35px -5px rgba(15, 23, 42, 0.04)'
                }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: '0 0 4px', fontFamily: "'Outfit', sans-serif" }}>
                    Select Storefront Add-on Features
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '1.5rem' }}>
                    Build your custom workspace scope. Pay only for the specific integrations you check:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { name: 'Advanced Custom Fields Builder', price: 150, desc: 'Allow custom dropdowns, dates, or text monograms on customer checkout drawer.' },
                      { name: 'AI Chatbot Automation', price: 250, desc: 'Enable automated confirmation logs & AI auto-replies on client WhatsApp chat logs.' },
                      { name: 'Shipping Integration', price: 300, desc: 'Integrate tracking dispatches with Delhivery, Shiprocket, or Porter routes.' },
                      { name: 'Advanced Styling Themes', price: 100, desc: 'Select from multiple accent editors (Luxury, Minimal, Dark templates).' },
                      { name: 'Commission-Free Sales', price: 200, desc: '0% platform transactional commission fees. Retain 100% of purchase values.' }
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
                            padding: '1.1rem 1.3rem',
                            borderRadius: '16px',
                            background: isChecked ? 'rgba(79, 70, 229, 0.04)' : '#FFFFFF',
                            border: isChecked ? '2px solid #4F46E5' : '1px solid rgba(0,0,0,0.06)',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', paddingRight: '1rem' }}>
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '6px',
                              border: isChecked ? 'none' : '2px solid rgba(0,0,0,0.15)',
                              background: isChecked ? '#4F46E5' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              marginTop: '2px',
                              flexShrink: 0
                            }}>
                              {isChecked && <Check size={12} strokeWidth={4} />}
                            </div>
                            <div>
                              <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>{feat.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500, marginTop: '3px', lineHeight: 1.3 }}>{feat.desc}</div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 900, color: isChecked ? '#4F46E5' : '#0F172A' }}>
                              +₹{feat.price}
                            </span>
                            <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 700 }}>/ month</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Messages Quota panel */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '28px',
                  padding: '2.2rem',
                  border: '1.5px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: '0 10px 35px -5px rgba(15, 23, 42, 0.04)'
                }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: '0 0 4px', fontFamily: "'Outfit', sans-serif" }}>
                    Custom Social Messaging Quota Limit
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '1.5rem' }}>
                    Set your starting WhatsApp message allocations. Baseline starts at **200 messages/month** for a fixed **₹100/mo** cost, scaling in steps of **50 messages** at **₹25/block**:
                  </p>

                  <div style={{ background: 'rgba(79, 70, 229, 0.04)', padding: '1.2rem', borderRadius: '18px', border: '1px solid rgba(79, 70, 229, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#4F46E5', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      ALLOCATION CONTROLLER
                    </span>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (customMessagesCount > 200) setCustomMessagesCount(prev => prev - 50);
                        }}
                        disabled={customMessagesCount <= 200}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '1px solid rgba(0,0,0,0.1)',
                          background: customMessagesCount <= 200 ? '#F1F5F9' : '#FFFFFF',
                          color: customMessagesCount <= 200 ? '#94A3B8' : '#0F172A',
                          fontSize: '1.4rem',
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
                      
                      <div style={{ textAlign: 'center', width: '200px' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 950, color: '#0F172A', letterSpacing: '-0.5px' }}>
                          {customMessagesCount}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginTop: '2px' }}>
                          Messages / Month
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setCustomMessagesCount(prev => prev + 50)}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '1px solid rgba(0,0,0,0.1)',
                          background: '#FFFFFF',
                          color: '#0F172A',
                          fontSize: '1.4rem',
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

                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>
                      {customMessagesCount <= 200 
                        ? '✨ Baseline Quota (₹100 included in core price)' 
                        : `📈 Accruing +${customMessagesCount - 200} extra messages at ₹25 per 50 block`}
                    </span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Right: Cost calculator ledger & razorpay payment block */}
          <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            
            {selectedBizType === "" ? (
              /* REQUIRED CHECKPOINT GATED RIGHT COLUMN */
              <div style={{
                background: '#FFFFFF',
                color: '#0F172A',
                padding: '2.5rem 2rem',
                borderRadius: '28px',
                border: '1.5px solid rgba(15, 23, 42, 0.08)',
                boxShadow: '0 15px 35px rgba(15, 23, 42, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '1rem',
                minHeight: '300px'
              }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={22} color="#4F46E5" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', margin: '0 0 6px' }}>Ledger Gated</h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                    Select your business experience type in the left column to unlock the pricing ledger, add-ons configurator, and checkout modules.
                  </p>
                </div>
              </div>
            ) : (
              /* Live Cost Projection */
              <div style={{
                background: '#FFFFFF',
                color: '#0F172A',
                padding: '2.2rem 2rem',
                borderRadius: '28px',
                border: '1.5px solid rgba(15, 23, 42, 0.08)',
                boxShadow: '0 15px 35px rgba(15, 23, 42, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', paddingBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BarChart2 size={16} color="#4F46E5" /> Live Cost Projection
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                    <span style={{ color: '#475569', opacity: 0.8 }}>Core Storefront webpage hosting:</span>
                    <span style={{ fontWeight: 900 }}>₹{billing.baseHosting}/mo</span>
                  </div>
                  
                  {/* Checked features list */}
                  {selectedFeatures.map(feat => {
                    let fPrice = 150;
                    if (feat === 'AI Chatbot Automation') fPrice = 250;
                    if (feat === 'Shipping Integration') fPrice = 300;
                    if (feat === 'Advanced Styling Themes') fPrice = 100;
                    if (feat === 'Commission-Free Sales') fPrice = 200;
                    return (
                      <div key={feat} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, paddingLeft: '8px', borderLeft: '1.5px solid #4F46E5' }}>
                        <span style={{ color: '#475569', opacity: 0.75 }}>+ {feat}:</span>
                        <span style={{ fontWeight: 800 }}>₹{fPrice}/mo</span>
                      </div>
                    );
                  })}

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                    <span style={{ color: '#475569', opacity: 0.8 }}>Custom Messages ({billing.msgCount} msgs):</span>
                    <span style={{ fontWeight: 900 }}>₹{billing.totalMsgCost}/mo</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 900, borderTop: '1px solid rgba(15, 23, 42, 0.08)', paddingTop: '0.8rem', marginTop: '0.5rem' }}>
                    <span style={{ color: '#0F172A' }}>Subtotal:</span>
                    <span style={{ fontWeight: 900 }}>₹{billing.subtotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                    <span style={{ color: '#475569', opacity: 0.8 }}>GST Tax (18%):</span>
                    <span style={{ fontWeight: 900 }}>₹{billing.tax}</span>
                  </div>
                </div>

                <div style={{ borderTop: '2px dashed rgba(15, 23, 42, 0.15)', paddingTop: '1.2rem', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A' }}>Total Billing:</span>
                    <motion.span 
                      key={billing.total}
                      initial={{ scale: 0.85, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      style={{ fontSize: '2.1rem', fontWeight: 950, color: '#4F46E5', tracking: '-1px' }}
                    >
                      ₹{billing.total}
                      <span style={{ fontSize: '0.8rem', color: '#475569', opacity: 0.6, fontWeight: 800 }}> / mo</span>
                    </motion.span>
                  </div>
                  
                  {showCheckout ? (
                    <div style={{ background: '#F8FAFC', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(15, 23, 42, 0.1)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => setPaymentMethod('UPI')} 
                          style={{ flex: 1, padding: '6px', borderRadius: '8px', border: 'none', background: paymentMethod === 'UPI' ? '#4F46E5' : 'rgba(15, 23, 42, 0.08)', color: paymentMethod === 'UPI' ? 'white' : '#475569', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}
                        >
                          Razorpay UPI QR
                        </button>
                        <button 
                          onClick={() => setPaymentMethod('Card')} 
                          style={{ flex: 1, padding: '6px', borderRadius: '8px', border: 'none', background: paymentMethod === 'Card' ? '#4F46E5' : 'rgba(15, 23, 42, 0.08)', color: paymentMethod === 'Card' ? 'white' : '#475569', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}
                        >
                          Razorpay Card
                        </button>
                      </div>

                      {paymentMethod === 'UPI' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '10px', borderRadius: '12px', color: '#0F172A', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
                          <div style={{ width: '100px', height: '100px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', fontWeight: 900, fontSize: '0.8rem', border: '1.5px solid #E2E8F0', padding: '10px', boxSizing: 'border-box', textAlign: 'center' }}>
                            [UPI QR CODE ₹{billing.total}]
                          </div>
                          <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 800 }}>Scan QR code from PhonePe / GPay</span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <input 
                            type="text" 
                            placeholder="4111 2222 3333 4444" 
                            maxLength="19"
                            style={{ padding: '8px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '8px', color: '#0F172A', fontSize: '0.8rem', fontWeight: 600, outline: 'none' }}
                          />
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <input 
                              type="text" 
                              placeholder="MM/YY" 
                              style={{ flex: 1, padding: '8px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '8px', color: '#0F172A', fontSize: '0.8rem', fontWeight: 600, outline: 'none' }}
                            />
                            <input 
                              type="text" 
                              placeholder="CVV" 
                              maxLength="3"
                              style={{ flex: 1, padding: '8px', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '8px', color: '#0F172A', fontSize: '0.8rem', fontWeight: 600, outline: 'none' }}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleSubscribe}
                        disabled={isProcessingPay}
                        style={{
                          width: '100%',
                          padding: '10px',
                          background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          fontWeight: 900,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          boxShadow: '0 4px 10px rgba(79,70,229,0.2)'
                        }}
                      >
                        {isProcessingPay ? (
                          <>
                            <RefreshCw size={14} className="spin" /> Verifying Razorpay Transaction...
                          </>
                        ) : (
                          <>
                            <ShieldCheck size={14} /> Validate Payment & Activate Store
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowCheckout(true)}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '1.2rem',
                        borderRadius: '16px',
                        fontSize: '1.05rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.3)',
                        transition: 'all 0.2s'
                      }}
                    >
                      Activate Custom Plan Trial <Zap size={16} />
                    </button>
                  )}

                </div>
              </div>
            )}

            {/* Switch roles or scopes actions */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button 
                onClick={() => {
                  switchRole('customer');
                }}
                style={{ background: 'none', border: 'none', color: '#64748B', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Back to Customer Store
              </button>
            </div>

          </div>

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
    </>
  );
};

export default ProtectedRoute;
