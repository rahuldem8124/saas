import React, { useState, useEffect } from 'react';
import { useTenant } from '../context/TenantContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Users, BarChart2, DollarSign, ArrowLeft, Check, X, Award, 
  AlertTriangle, Layers, Info, Trash, Zap, RefreshCw, Cpu, Database, 
  Activity, Tag, Eye, Sliders, Server, HardDrive, Plus, Radio, Globe, 
  FileText, Share2, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SuperAdminDashboard = () => {
  const { businesses, updateBusiness, PLAN_LIMITS, topUpMessageQuota, createBusiness } = useTenant();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const bizList = Object.values(businesses);
  
  // Custom Responsive state to prevent ReferenceError: isMobile is not defined
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom States
  const [selectedService, setSelectedService] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedBiz, setInspectedBiz] = useState(null);
  
  // GDPR privacy shield state
  const [isGdprShieldActive, setIsGdprShieldActive] = useState(true);

  // GDPR data masking helper
  const maskPersonalData = (value, isActive) => {
    if (!value) return '';
    if (!isActive) return value;
    
    if (value.includes('@')) {
      const [local, domain] = value.split('@');
      if (local.length <= 2) return `${local[0]}***@${domain}`;
      return `${local[0]}***${local[local.length - 1]}@${domain}`;
    }
    
    if (value.startsWith('+') || /^\d+$/.test(value.replace(/\s+/g, ''))) {
      const clean = value.replace(/\s+/g, '');
      if (clean.length > 6) {
        return value.slice(0, 7) + '*** **' + value.slice(-3);
      }
    }

    const words = value.split(' ');
    if (words.length > 1) {
      return words.map(w => w.length > 2 ? `${w[0]}***${w[w.length - 1]}` : `${w[0]}***`).join(' ');
    }
    if (value.length > 2) {
      return `${value[0]}***${value[value.length - 1]}`;
    }
    return '***';
  };
  
  // System maintenance simulation states
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizeProgress, setOptimizeProgress] = useState(0);
  const [systemUptime, setSystemUptime] = useState(99.98);

  // Dynamic Gating local states
  const [basicOrdersCap, setBasicOrdersCap] = useState(100);
  const [proMessagesCap, setProMessagesCap] = useState(5000);
  const [whatsappPerMsgCost, setWhatsappPerMsgCost] = useState(0.60);

  // Global Plan Pricing Adjustments
  const [globalBasicPrice, setGlobalBasicPrice] = useState(499);
  const [globalProPrice, setGlobalProPrice] = useState(999);
  const [globalPremiumPrice, setGlobalPremiumPrice] = useState(2499);
  const [isSavingPricing, setIsSavingPricing] = useState(false);

  // Dynamic Graph States
  const [activeGraphTab, setActiveGraphTab] = useState('MRR'); // 'MRR' | 'Orders' | 'Refills'
  const [graphHoverIndex, setGraphHoverIndex] = useState(null);

  // Regional Network Outage Failover Simulator States
  const [isEdgeFailing, setIsEdgeFailing] = useState(false);
  const [activeEdgeNode, setActiveEdgeNode] = useState('primary-in-mumbai-01');
  const [edgeLatency, setEdgeLatency] = useState(28); // in ms

  // Seeding Tenant Generator States
  const [selectedSeedTemplate, setSelectedSeedTemplate] = useState('perfume'); // 'perfume' | 'matcha' | 'pet' | 'cyberpunk'

  // Multichannel Broadcast States
  const [broadcastTarget, setBroadcastTarget] = useState('All');
  const [broadcastText, setBroadcastText] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);

  // Audited Financial Transactions Ledger States
  const [billingTransactions, setBillingTransactions] = useState([
    { id: 'TXN-9021', date: 'May 25, 2026', merchant: 'CakeFlow Flagship', type: 'WhatsApp Refill (+1000)', amount: 500, gateway: 'Razorpay', status: 'Success' },
    { id: 'TXN-9020', date: 'May 24, 2026', merchant: 'RoseGold Atelier', type: 'Basic Subscription (Monthly)', amount: 499, gateway: 'Stripe', status: 'Success' },
    { id: 'TXN-9019', date: 'May 24, 2026', merchant: 'Clay & Co. Handmade', type: 'Pro Subscription (Monthly)', amount: 999, gateway: 'Razorpay', status: 'Success' },
    { id: 'TXN-9018', date: 'May 23, 2026', merchant: 'FastFoot Sneaker Lab', type: 'WhatsApp Refill (+5000)', amount: 2000, gateway: 'Razorpay', status: 'Success' },
    { id: 'TXN-9017', date: 'May 22, 2026', merchant: 'Flex Custom Atelier', type: 'Premium Subscription (Monthly)', amount: 2499, gateway: 'Razorpay', status: 'Success' }
  ]);
  const [activeInvoice, setActiveInvoice] = useState(null);

  // Interactive Coupon builder states
  const [coupons, setCoupons] = useState([
    { code: 'GROWTH50', discount: 50, tier: 'Pro', active: true },
    { code: 'FESTIVE80', discount: 80, tier: 'All', active: true },
    { code: 'PREMIUM100', discount: 100, tier: 'Premium', active: false }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(20);
  const [newCouponTier, setNewCouponTier] = useState('All');

  // Dynamic system terminal stream logs
  const [sysLogs, setSysLogs] = useState([
    { id: 1, time: '10:14:02', text: 'SYSTEM: Subdomain resolver connected to edge proxy.', type: 'info' },
    { id: 2, time: '10:14:15', text: 'DATABASE: Postgres buffer pool optimization complete. 12 active connections.', type: 'info' },
    { id: 3, time: '10:14:38', text: 'WEBHOOK: Delhivery status fetch loop verified healthy.', type: 'success' }
  ]);

  // Periodic simulated system log additions
  useEffect(() => {
    const logPool = [
      { text: 'SYSTEM: Garbage collection complete. Freed 24.5MB cache.', type: 'info' },
      { text: 'ROUTER: Resolved edge route for rose-gold.platform.com.', type: 'info' },
      { text: 'MONITOR: Dynamic field limits verified for all active databases.', type: 'success' },
      { text: 'BACKUP: Platform snapshot generated successfully to AWS bucket s3://saas-snapshot.', type: 'success' },
      { text: 'BOT ENGINE: Verified auto-confirm delivery trigger for cakeflow.', type: 'success' }
    ];

    const interval = setInterval(() => {
      if (isEdgeFailing) return; // Freeze normal logs when edge failure active

      const selectedLog = logPool[Math.floor(Math.random() * logPool.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setSysLogs(prev => [
        { id: Date.now(), time: timeStr, text: selectedLog.text, type: selectedLog.type },
        ...prev.slice(0, 4)
      ]);

      // Tiny micro fluctuations in uptime simulation
      setSystemUptime(prev => {
        const delta = (Math.random() - 0.5) * 0.01;
        return Math.min(Math.max(parseFloat((prev + delta).toFixed(4)), 99.95), 100);
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [isEdgeFailing]);

  // Compute platform MRR in Rupees based on all businesses
  const mrrSum = bizList.reduce((sum, b) => {
    const fee = b.subscription === 'Premium' ? globalPremiumPrice : b.subscription === 'Pro' ? globalProPrice : b.subscription === 'Basic' ? globalBasicPrice : 0;
    return sum + fee;
  }, 0);

  // Compute total transacted orders across platform
  const totalPlatformOrders = bizList.reduce((sum, b) => sum + (b.orders ? b.orders.length : 0), 0);

  // Toggle suspended/approved store state
  const handleToggleApproval = (bizId, currentStatus) => {
    const newStatus = currentStatus === 'Suspended' ? 'Approved' : 'Suspended';
    updateBusiness(bizId, { approvalStatus: newStatus });
    
    // Auto-update inspected status if open
    if (inspectedBiz && inspectedBiz.id === bizId) {
      setInspectedBiz(prev => ({ ...prev, approvalStatus: newStatus }));
    }
  };

  // Simulated Cache Optimization Routine
  const handleOptimizeSystem = () => {
    setIsOptimizing(true);
    setOptimizeProgress(0);
    const interval = setInterval(() => {
      setOptimizeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          const now = new Date().toTimeString().split(' ')[0];
          setSysLogs(prevLogs => [
            { id: Date.now(), time: now, text: 'MAINTENANCE: Full buffer pool clean & vacuum operation completed successfully.', type: 'success' },
            ...prevLogs
          ]);
          alert('🎉 Platform cache cleaned & database indexes optimized successfully!');
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  // Coupon Manager
  const handleAddCoupon = () => {
    if (!newCouponCode.trim()) {
      alert('Please enter a coupon code!');
      return;
    }
    const cleanCode = newCouponCode.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (coupons.some(c => c.code === cleanCode)) {
      alert('This coupon code already exists!');
      return;
    }
    const newC = {
      code: cleanCode,
      discount: parseInt(newCouponDiscount) || 10,
      tier: newCouponTier,
      active: true
    };
    setCoupons(prev => [newC, ...prev]);
    setNewCouponCode('');
  };

  const handleToggleCoupon = (code) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, active: !c.active } : c));
  };

  const handleDeleteCoupon = (code) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  // Filter businesses by selected service/category and search query
  const filteredBizList = bizList.filter(b => {
    const matchesCategory = selectedService === 'All' || b.category?.toLowerCase() === selectedService.toLowerCase();
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Edge failure simulator actions
  const handleSimulateOutage = () => {
    setIsEdgeFailing(true);
    setEdgeLatency(846);
    setSystemUptime(98.45);
    const now = new Date().toTimeString().split(' ')[0];
    setSysLogs(prev => [
      { id: Date.now() + 1, time: now, text: 'CRITICAL: Edge route primary-in-mumbai-01 dropped packet rate >85%. Gateway Timeout (504).', type: 'error' },
      { id: Date.now() + 2, time: now, text: 'ALERT: Uptime score dropped to 98.45%. Critical connectivity warning.', type: 'error' },
      ...prev
    ]);

    // Automatically trigger cloud failover after 2.5s
    setTimeout(() => {
      setEdgeLatency(124);
      setActiveEdgeNode('fallback-de-frankfurt-02');
      const failoverTime = new Date().toTimeString().split(' ')[0];
      setSysLogs(prev => [
        { id: Date.now() + 3, time: failoverTime, text: 'ROUTER: Activating Cloudflare failover DNS redirect policy...', type: 'info' },
        { id: Date.now() + 4, time: failoverTime, text: 'SYSTEM: Subdomain traffic redirected successfully to backup Frankfurt nodes.', type: 'success' },
        ...prev
      ]);
    }, 2500);
  };

  const handleRestorePrimaryNode = () => {
    setIsEdgeFailing(false);
    setEdgeLatency(28);
    setActiveEdgeNode('primary-in-mumbai-01');
    const now = new Date().toTimeString().split(' ')[0];
    setSysLogs(prev => [
      { id: Date.now() + 5, time: now, text: 'SYSTEM: Regional latency verified at 28ms (0% packet drop). Primary node online.', type: 'success' },
      { id: Date.now() + 6, time: now, text: 'ROUTER: Reverted traffic control route back to primary-in-mumbai-01 edge server.', type: 'success' },
      ...prev
    ]);
  };

  // Seed demo storefront action
  const handleProvisionDemoMerchant = () => {
    const templates = {
      perfume: {
        name: "Aura Artisanal Parfums",
        category: "Accessories",
        theme: "Luxury",
        whatsappNumber: "+91 88888 77777",
        automationChannel: "WhatsApp + Instagram",
        brandColor: "#BE9B7B",
        tagline: "Bespoke sensory journeys in crystal glass bottles.",
        preferredLayout: "Grid",
        fields: [
          { id: "scent", name: "Scent Family Selection", type: "Dropdown", options: ["Woody Oudh", "Smoky Vanilla", "Citrus Vetiver", "Fresh Ambergris"], required: true },
          { id: "size", name: "Vial Volume", type: "Dropdown", options: ["50ml Extrait", "100ml Extrait"], required: true },
          { id: "engraving", name: "Initials Engraving (Glass cap)", type: "Text", required: false, placeholder: "e.g. A.R." }
        ]
      },
      matcha: {
        name: "Matcha Mind Organics",
        category: "Handmade",
        theme: "Minimal",
        whatsappNumber: "+91 77777 66666",
        automationChannel: "WhatsApp",
        brandColor: "#5B8C5A",
        tagline: "Stone-ground ceremonial Uji matcha crafted slow.",
        preferredLayout: "Grid",
        fields: [
          { id: "grade", name: "Matcha Grade Selection", type: "Dropdown", options: ["Pinnacle Imperial", "Ceremonial Supreme", "Daily Culinary Blend"], required: true },
          { id: "size", name: "Pouch Weight", type: "Dropdown", options: ["30g Tin", "100g Bag", "250g Pouch"], required: true }
        ]
      },
      pet: {
        name: "Pet Paw-tisserie Treats",
        category: "Cake",
        theme: "Modern",
        whatsappNumber: "+91 99999 88888",
        automationChannel: "Instagram",
        brandColor: "#ECC19C",
        tagline: "Organic custom single-ingredient treats for your fluffy companions.",
        preferredLayout: "Grid",
        fields: [
          { id: "protein", name: "Single Source Protein", type: "Dropdown", options: ["Dehydrated Quail", "Organic Rabbit Chunk", "Wild caught Salmon Fillet"], required: true },
          { id: "celebration", name: "Occasion Theme", type: "Dropdown", options: ["Puppy Birthday Bash", "Gotcha Day Feast", "Daily Good Boy Snack"], required: true }
        ]
      },
      cyberpunk: {
        name: "NeonGrid Cyberwear",
        category: "Clothing",
        theme: "Dark",
        whatsappNumber: "+91 66666 55555",
        automationChannel: "Instagram",
        brandColor: "#00F0FF",
        tagline: "Reflective apparel engineered for the dark net.",
        preferredLayout: "List",
        fields: [
          { id: "mesh", name: "Lining Mesh Tech", type: "Dropdown", options: ["Thermoreactive Nano-Grid", "Waterproof Cyber-Membrane", "Standard Cotton Armor"], required: true },
          { id: "size", name: "Sizing Matrix", type: "Dropdown", options: ["N-1 (S)", "N-2 (M)", "N-3 (L)", "N-4 (XL)"], required: true }
        ]
      }
    };
    
    const selected = templates[selectedSeedTemplate];
    const newId = createBusiness({
      ...selected,
      subscription: "Pro",
      whatsappMessagesCount: 5000,
      topUpMessages: 1000,
      messagesUsed: 230,
      isSubscribed: true
    });
    
    // Add success system log
    const now = new Date().toTimeString().split(' ')[0];
    setSysLogs(prev => [
      { id: Date.now(), time: now, text: `PROVISIONER: Instantly generated tenant instance for subdomain '${newId}.platform.com'. Seeding complete.`, type: 'success' },
      ...prev
    ]);
    
    // Append to transactions audit
    const newTx = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Today',
      merchant: selected.name,
      type: 'Pro Subscription (Setup Seed)',
      amount: globalProPrice,
      gateway: 'Razorpay',
      status: 'Success'
    };
    setBillingTransactions(prev => [newTx, ...prev]);

    // Highlight seeded business in table search queries
    setSearchQuery(newId);
    
    alert(`🚀 SaaS Tenant Provisioned Successfully!\nSubdomain: ${newId}.platform.com\nSubscription: Pro (₹${globalProPrice}/mo)\nCategory: ${selected.category}\nTheme Preset: ${selected.theme}`);
  };

  // Broadcast announcement action
  const handleSendBroadcast = () => {
    if (!broadcastText.trim()) {
      alert("Please compose an announcement first!");
      return;
    }
    
    setIsBroadcasting(true);
    setBroadcastProgress(0);
    
    const filteredBiz = bizList.filter(b => {
      if (broadcastTarget === 'All') return true;
      if (broadcastTarget === 'Suspended') return b.approvalStatus === 'Suspended';
      return b.subscription === broadcastTarget;
    });
    
    if (filteredBiz.length === 0) {
      alert(`No active merchants match the targeted filter tier (${broadcastTarget})!`);
      setIsBroadcasting(false);
      return;
    }
    
    const interval = setInterval(() => {
      setBroadcastProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Dispatches announcement to chats
          filteredBiz.forEach(biz => {
            const newChat = {
              id: Date.now() + Math.random(),
              sender: 'bot',
              text: `📢 [PLATFORM BROADCAST FROM SUPER ADMIN]: ${broadcastText}`,
              timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            
            updateBusiness(biz.id, {
              chats: [...(biz.chats || []), newChat],
              messagesUsed: (biz.messagesUsed || 0) + 1
            });
          });
          
          const now = new Date().toTimeString().split(' ')[0];
          setSysLogs(prevLogs => [
            { id: Date.now(), time: now, text: `BROADCAST: SaaS notification push transmitted to ${filteredBiz.length} storefront operator backends.`, type: 'success' },
            ...prevLogs
          ]);
          
          setIsBroadcasting(false);
          setBroadcastText('');
          alert(`🎉 SaaS global announcement successfully broadcasted to ${filteredBiz.length} storefront channels!`);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  // Save global pricing edits simulation
  const handleSaveGlobalPricing = () => {
    setIsSavingPricing(true);
    setTimeout(() => {
      setIsSavingPricing(false);
      const now = new Date().toTimeString().split(' ')[0];
      setSysLogs(prevLogs => [
        { id: Date.now(), time: now, text: `CONFIG: Dynamic plan values modified. Basic: ₹${globalBasicPrice}, Pro: ₹${globalProPrice}, Premium: ₹${globalPremiumPrice}. Applied instantly.`, type: 'success' },
        ...prevLogs
      ]);
      alert('💾 Platform subscription price caps updated and applied globally!');
    }, 800);
  };

  // Dynamic Graphic Plots Coordinates
  const graphDatasets = {
    MRR: {
      data: [25000, 38000, 52000, 78000, 105000, mrrSum],
      label: 'Accrued Platform Monthly Revenue (₹)',
      color: '#10B981',
      unit: '₹'
    },
    Orders: {
      data: [180, 290, 480, 710, 1150, totalPlatformOrders * 12 + 1200], // Scaling order value dynamically
      label: 'Monthly Completed Orders Count',
      color: '#8B5CF6',
      unit: ' orders'
    },
    Refills: {
      data: [8000, 15000, 28000, 52000, 85000, bizList.reduce((acc, b) => acc + (b.messagesUsed || 0), 0) * 10 + 20000],
      label: 'Accrued Message Refill Volume',
      color: '#EC4899',
      unit: ' msgs'
    }
  };

  const graphMonths = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const activeDataset = graphDatasets[activeGraphTab];
  const maxDataVal = Math.max(...activeDataset.data) * 1.15;

  // Render SVG smooth line coordinates
  const svgWidth = 500;
  const svgHeight = 160;
  const paddingX = 40;
  const paddingY = 20;

  const points = activeDataset.data.map((val, idx) => {
    const x = paddingX + (idx * (svgWidth - paddingX * 2)) / (activeDataset.data.length - 1);
    const y = svgHeight - paddingY - (val / maxDataVal) * (svgHeight - paddingY * 2);
    return { x, y, val, month: graphMonths[idx] };
  });

  // Construct path string
  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Gradient area path string
  const areaD = points.length > 0 ? `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z` : '';

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '130px 5% 120px', boxSizing: 'border-box', fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>
      
      {/* Header */}
      <header style={{ maxWidth: '1400px', margin: '0 auto 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--color-brown-dark)', color: 'white', padding: '5px 14px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 900, marginBottom: '0.8rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <Shield size={14} /> PLATFORM SUPERVISOR ACTIVE
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: 0, tracking: '-1px' }}>Platform Super Admin Center</h1>
          <p style={{ color: 'var(--color-brown)', fontWeight: 600, opacity: 0.7, margin: '0.4rem 0 0', fontSize: '0.95rem' }}>Global overview of multi-tenant operations, dynamic parameters, licensing controls, and promotions.</p>
        </div>
        <button 
          onClick={() => {
            switchRole('admin', 'cakeflow');
            navigate('/admin');
          }} 
          className="btn-secondary" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.6rem', borderRadius: '14px', fontWeight: 800, cursor: 'pointer' }}
        >
          <ArrowLeft size={16} /> Switch to Flagship Admin
        </button>
      </header>

      {/* Global Performance Cards */}
      <section style={{ maxWidth: '1400px', margin: '0 auto 2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {[
          { label: "Total Platform MRR", value: `₹${mrrSum.toLocaleString()}`, desc: "Accrued subscription fees", icon: <DollarSign />, color: '#10B981' },
          { label: "Active Tenant Stores", value: bizList.length.toString(), desc: "Makers, fashion, custom shops", icon: <Users />, color: '#3B82F6' },
          { label: "Total Social Orders", value: totalPlatformOrders.toLocaleString(), icon: <Layers />, desc: "Global transacted volume", color: '#8B5CF6' },
          { label: "System Uptime Rate", value: `${systemUptime}%`, icon: <Activity />, desc: isEdgeFailing ? "⚠️ Outage redirect active" : "Edge routing network uptime", color: isEdgeFailing ? '#EF4444' : '#10B981' }
        ].map((item, i) => (
          <div key={i} style={{ padding: '2.2rem 2rem', background: '#FFFFFF', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.04)', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-brown)', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</span>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: '0.4rem 0' }}>{item.value}</div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: item.color }}>{item.desc}</span>
            </div>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(74, 44, 42, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brown-dark)' }}>
              {item.icon}
            </div>
          </div>
        ))}
      </section>

      {/* NEW: Interactive Platform Metrics Graph Row */}
      <section style={{ maxWidth: '1400px', margin: '0 auto 2.5rem' }}>
        <div style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '28px', border: '1px solid rgba(15, 23, 42, 0.06)', boxShadow: '0 10px 40px -15px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem', marginBottom: '1.8rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart2 size={18} color="var(--color-pink)" /> SaaS Platform Performance Analytics
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Interactive telemetry metrics scaled dynamically across tenant storefront registries.</span>
            </div>
            
            {/* Tab switchers */}
            <div style={{ display: 'flex', background: '#F1F5F9', padding: '4px', borderRadius: '12px' }}>
              {[
                { key: 'MRR', icon: <DollarSign size={13} />, label: 'MRR Growth' },
                { key: 'Orders', icon: <Layers size={13} />, label: 'Orders Volume' },
                { key: 'Refills', icon: <Radio size={13} />, label: 'Message Volume' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveGraphTab(tab.key);
                    setGraphHoverIndex(null);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeGraphTab === tab.key ? 'var(--color-brown-dark)' : 'transparent',
                    color: activeGraphTab === tab.key ? 'white' : 'var(--color-brown)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Graph Render space */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '3.2fr 0.8fr', gap: '2rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
              <svg 
                viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                style={{ width: '100%', height: 'auto', background: '#FDFDFD', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.02)' }}
                onMouseLeave={() => setGraphHoverIndex(null)}
              >
                <defs>
                  <linearGradient id="graph-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={activeDataset.color} stopOpacity="0.22" />
                    <stop offset="100%" stopColor={activeDataset.color} stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                {[0, 1, 2, 3].map(g => {
                  const y = paddingY + (g * (svgHeight - paddingY * 2)) / 3;
                  return (
                    <line 
                      key={g} 
                      x1={paddingX} 
                      y1={y} 
                      x2={svgWidth - paddingX} 
                      y2={y} 
                      stroke="#E2E8F0" 
                      strokeDasharray="4 4" 
                      strokeWidth="1" 
                    />
                  );
                })}

                {/* Gradient area */}
                <path d={areaD} fill="url(#graph-grad)" />

                {/* Line Path */}
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke={activeDataset.color} 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {/* Points */}
                {points.map((p, idx) => (
                  <g key={idx}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={graphHoverIndex === idx ? "7" : "4.5"}
                      fill="white"
                      stroke={activeDataset.color}
                      strokeWidth="2.5"
                      style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={() => setGraphHoverIndex(idx)}
                    />
                    <text
                      x={p.x}
                      y={svgHeight - 4}
                      textAnchor="middle"
                      fill="#64748B"
                      fontSize="8"
                      fontWeight="700"
                    >
                      {p.month}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Metric Tooltip Panel */}
            <div style={{ background: 'rgba(74, 44, 42, 0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown)', opacity: 0.6, textTransform: 'uppercase' }}>
                {activeDataset.label}
              </span>
              
              <div style={{ marginTop: '0.8rem' }}>
                {graphHoverIndex !== null ? (
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748B' }}>
                      Month: <span style={{ color: 'var(--color-brown-dark)' }}>{points[graphHoverIndex].month} 2026</span>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: activeDataset.color, marginTop: '4px' }}>
                      {activeDataset.unit === '₹' ? '₹' : ''}
                      {points[graphHoverIndex].val.toLocaleString()}
                      {activeDataset.unit !== '₹' ? activeDataset.unit : ''}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700 }}>✓ Live Platform Sync</span>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748B' }}>Current Peak Value</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginTop: '4px' }}>
                      {activeDataset.unit === '₹' ? '₹' : ''}
                      {activeDataset.data[activeDataset.data.length - 1].toLocaleString()}
                      {activeDataset.unit !== '₹' ? activeDataset.unit : ''}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Hover points to inspect history</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Control Panel split */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
        
        {/* Table & Searches Section */}
        <section style={{ width: '100%' }}>
          <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '28px', border: '1px solid rgba(15, 23, 42, 0.06)', boxShadow: '0 10px 40px -15px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: 0 }}>Registered Multi-Tenant Stores</h2>
                <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Inspect profiles, suspension status, and inject message credits.</span>
              </div>

              {/* Search bar input */}
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  placeholder="Search store name, category..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ padding: '0.7rem 1rem', width: '240px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.85rem', outline: 'none', fontWeight: 600 }}
                />
                <div style={{ fontSize: '0.75rem', background: 'rgba(74, 44, 42, 0.06)', color: 'var(--color-brown-dark)', padding: '6px 12px', borderRadius: '8px', fontWeight: 800 }}>
                  Active: {filteredBizList.length} Stores
                </div>
              </div>
            </div>

            {/* Category selection bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '1.5rem' }}>
              {['All', 'Cake', 'Shoes', 'Clothing', 'Accessories', 'Handmade', 'Custom'].map(cat => {
                const count = bizList.filter(b => cat === 'All' ? true : b.category?.toLowerCase() === cat.toLowerCase()).length;
                const isActive = selectedService === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedService(cat)}
                    style={{
                      padding: '0.5rem 1.2rem',
                      borderRadius: '100px',
                      fontSize: '0.8rem',
                      fontWeight: 750,
                      border: 'none',
                      background: isActive ? 'var(--color-brown-dark)' : '#ECEFF1',
                      color: isActive ? 'white' : 'var(--color-brown)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{cat}</span>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)', 
                      color: isActive ? 'white' : 'var(--color-brown-dark)',
                      padding: '1px 5px',
                      borderRadius: '20px',
                      fontWeight: 800
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Stores database Table */}
            <div style={{ overflowX: 'auto' }} className="no-scrollbar">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #F1F5F9' }}>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.85rem', color: '#64748B' }}>Store Details</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.85rem', color: '#64748B' }}>Subscription / Niche</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.85rem', color: '#64748B' }}>Channel Bot</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.85rem', color: '#64748B' }}>Cost / Msg</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.85rem', color: '#64748B' }}>Orders / Limit</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.85rem', color: '#64748B' }}>WhatsApp Quota</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.85rem', color: '#64748B' }}>Billed</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.85rem', color: '#64748B' }}>Status</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.85rem', color: '#64748B', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBizList.map(b => {
                    const isSuspended = b.approvalStatus === 'Suspended';
                    const subscription = b.subscription === 'Custom Plan' ? '🛡️ Custom Plan' : (b.subscription || 'Custom Plan');

                    const orderCount = b.orders ? b.orders.length : 0;
                    const isOrdersUnlimited = true;
                    const ordersPercent = 0;
                    const orderLimit = PLAN_LIMITS[b.subscription]?.orders || 100;

                    const msgUsed = b.messagesUsed || 0;
                    const baseMsgLimit = b.whatsappMessagesCount || 200;
                    const topUpCount = b.topUpMessages || 0;
                    const isMessagesUnlimited = false;
                    const msgLimit = baseMsgLimit + topUpCount;
                    const msgRemaining = Math.max(msgLimit - msgUsed, 0);
                    const msgPercent = Math.min((msgUsed / msgLimit) * 100, 100);

                    const isLowOnMessages = (msgRemaining / msgLimit) < 0.20;
                    const channel = b.automationChannel || "WhatsApp";
                    const rate = b.perMessageCost || 0.60;
                    const billingValue = msgUsed * rate;

                    return (
                      <tr key={b.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'all 0.2s' }} className="table-row-hover">
                        <td style={{ padding: '1.2rem 1rem' }}>
                          <div style={{ fontWeight: 900, color: 'var(--color-brown-dark)', fontSize: '0.95rem' }}>{b.name}</div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', fontFamily: 'monospace' }}>{b.id}.platform.com</span>
                        </td>
                        <td style={{ padding: '1.2rem 1rem' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)', display: 'block' }}>{b.subscription}</span>
                          <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>{b.category}</span>
                        </td>
                        <td style={{ padding: '1.2rem 1rem' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            background: channel.includes('Both') || channel.includes('+') ? 'rgba(139, 92, 246, 0.1)' : channel === 'WhatsApp' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                            color: channel.includes('Both') || channel.includes('+') ? '#8B5CF6' : channel === 'WhatsApp' ? '#10B981' : '#3B82F6',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }} />
                            {channel}
                          </span>
                        </td>
                        <td style={{ padding: '1.2rem 1rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>
                          ₹{rate.toFixed(2)}
                        </td>
                        <td style={{ padding: '1.2rem 1rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', width: '90px', gap: '3px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>{orderCount} / {isOrdersUnlimited ? '∞' : orderLimit}</span>
                            <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ width: `${isOrdersUnlimited ? 100 : ordersPercent}%`, height: '100%', background: 'linear-gradient(90deg, #F472B6, #EC4899)', borderRadius: '2px' }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1.2rem 1rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', width: '110px', gap: '3px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>{msgUsed} / {isMessagesUnlimited ? '∞' : msgLimit}</span>
                            <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ width: `${isMessagesUnlimited ? 100 : msgPercent}%`, height: '100%', background: isLowOnMessages ? '#EF4444' : '#10B981', borderRadius: '2px' }} />
                            </div>
                            <span style={{ fontSize: '0.65rem', color: isLowOnMessages ? '#EF4444' : '#64748B', fontWeight: 700 }}>
                              {isLowOnMessages ? '⚠️ Low Capacity' : `${msgRemaining.toLocaleString()} remaining`}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '1.2rem 1rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>₹{billingValue.toFixed(2)}</span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--color-pink)', fontWeight: 800 }}>ACCRUED BOT FEE</span>
                          </div>
                        </td>
                        <td style={{ padding: '1.2rem 1rem' }}>
                          <span style={{
                            padding: '3px 10px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            background: isSuspended ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                            color: isSuspended ? '#EF4444' : '#10B981'
                          }}>
                            {isSuspended ? "Suspended" : "Approved"}
                          </span>
                        </td>
                        <td style={{ padding: '1.2rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              type="button"
                              onClick={() => setInspectedBiz(b)}
                              style={{ padding: '6px', background: '#F1F5F9', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '8px', color: 'var(--color-brown-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                              title="Inspect Store profile details"
                            >
                              <Eye size={13} /> <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>Inspect</span>
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleToggleApproval(b.id, b.approvalStatus)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '8px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                border: 'none',
                                background: isSuspended ? '#10B981' : '#EF4444',
                                color: 'white',
                                cursor: 'pointer'
                              }}
                            >
                              {isSuspended ? "UNSUSPEND" : "SUSPEND"}
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

        {/* Global parameter config & diagnostics cards split */}
        <section style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: '2.5rem', width: '100%' }}>
          
          {/* Left Column: Coupon Engine & Parameter configuration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* 1. Subscription & Feature Gating parameter sliders */}
            <div className="card" style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '24px', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--color-brown-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sliders size={18} color="var(--color-pink)" /> Feature Gating & Accrual pricing
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-brown)', opacity: 0.8, marginBottom: '1.8rem', fontWeight: 600 }}>Adjust parameters globally. Active limits adapt instantly across storefront trial generators.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>
                    <span>Basic Plan Monthly Orders Cap:</span>
                    <span style={{ color: 'var(--color-pink)' }}>{basicOrdersCap} orders/mo</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    step="10"
                    value={basicOrdersCap}
                    onChange={e => setBasicOrdersCap(parseInt(e.target.value))}
                    style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', outline: 'none', cursor: 'pointer' }}
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>
                    <span>Pro Plan Base Messages Quota:</span>
                    <span style={{ color: 'var(--color-pink)' }}>{proMessagesCap.toLocaleString()} msgs/mo</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="20000" 
                    step="500"
                    value={proMessagesCap}
                    onChange={e => setProMessagesCap(parseInt(e.target.value))}
                    style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', outline: 'none', cursor: 'pointer' }}
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>
                    <span>WhatsApp cost per message:</span>
                    <span style={{ color: 'var(--color-pink)' }}>₹{whatsappPerMsgCost.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.10" 
                    max="3.00" 
                    step="0.05"
                    value={whatsappPerMsgCost}
                    onChange={e => setWhatsappPerMsgCost(parseFloat(e.target.value))}
                    style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', outline: 'none', cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* NEW: Global Subscription Plans Pricing Modifiers */}
              <div style={{ marginTop: '2rem', borderTop: '1px solid #F1F5F9', paddingTop: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <DollarSign size={15} color="var(--color-pink)" /> Global SaaS Subscription Fee Editor
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '4px' }}>Basic Fee (₹)</label>
                    <input 
                      type="number" 
                      value={globalBasicPrice}
                      onChange={e => setGlobalBasicPrice(Math.max(0, parseInt(e.target.value) || 0))}
                      style={{ padding: '8px 12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '4px' }}>Pro Fee (₹)</label>
                    <input 
                      type="number" 
                      value={globalProPrice}
                      onChange={e => setGlobalProPrice(Math.max(0, parseInt(e.target.value) || 0))}
                      style={{ padding: '8px 12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '4px' }}>Premium Fee (₹)</label>
                    <input 
                      type="number" 
                      value={globalPremiumPrice}
                      onChange={e => setGlobalPremiumPrice(Math.max(0, parseInt(e.target.value) || 0))}
                      style={{ padding: '8px 12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, width: '100%', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSaveGlobalPricing}
                  disabled={isSavingPricing}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'var(--color-brown-dark)',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {isSavingPricing ? (
                    <>
                      <RefreshCw size={14} className="spin" /> Applying billing policy modifications...
                    </>
                  ) : (
                    <>
                      <Check size={14} /> Commit SaaS Subscription Pricing
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* NEW: Automated Seed Niche Tenant Provisioner */}
            <div className="card" style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '24px', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--color-brown-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} color="var(--color-pink)" /> Instant Seed Store Provisioner
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-brown)', opacity: 0.8, marginBottom: '1.5rem', fontWeight: 600 }}>
                Instantly seed a fully functional multi-tenant storefront preset loaded with templates, products, and diagnostic loops.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', alignItems: 'flex-end', background: '#F8FAFC', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.02)' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--color-brown-dark)', fontSize: '0.75rem' }}>
                    Select Niche Brand Template Preset
                  </label>
                  <select
                    value={selectedSeedTemplate}
                    onChange={e => setSelectedSeedTemplate(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.85rem', fontWeight: 700, boxSizing: 'border-box', outline: 'none' }}
                  >
                    <option value="perfume">💎 Aura Artisanal Parfums (Luxury Niche)</option>
                    <option value="matcha">🍵 Matcha Mind Organics (Minimal Craft)</option>
                    <option value="pet">🐶 Pet Paw-tisserie Treats (Custom Cake Niche)</option>
                    <option value="cyberpunk">⚡ NeonGrid Cyberwear (Dark Theme Streetwear)</option>
                  </select>
                </div>

                <button
                  onClick={handleProvisionDemoMerchant}
                  style={{
                    background: 'var(--gradient-pink)',
                    color: 'white',
                    border: 'none',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(242,140,163,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Zap size={13} /> Insta-Provision
                </button>
              </div>
            </div>

            {/* 2. Site-wide Coupon & Promo code Engine */}
            <div className="card" style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '24px', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--color-brown-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Tag size={18} color="var(--color-pink)" /> Global Promotion Coupon Engine
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-brown)', opacity: 0.8, marginBottom: '1.5rem', fontWeight: 600 }}>Issue promo codes that merchants can apply to subscription bills at Razorpay checkouts.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.8rem', background: '#F8FAFC', padding: '1.2rem', borderRadius: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '0.8rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--color-brown-dark)', fontSize: '0.75rem' }}>Coupon Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g. SUMMER30" 
                      value={newCouponCode}
                      onChange={e => setNewCouponCode(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.8rem', fontWeight: 700, boxSizing: 'border-box' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--color-brown-dark)', fontSize: '0.75rem' }}>Discount %</label>
                    <input 
                      type="number" 
                      min="5" 
                      max="100"
                      value={newCouponDiscount}
                      onChange={e => setNewCouponDiscount(parseInt(e.target.value) || 20)}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.8rem', fontWeight: 750, boxSizing: 'border-box' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--color-brown-dark)', fontSize: '0.75rem' }}>Target Plan</label>
                    <select 
                      value={newCouponTier} 
                      onChange={e => setNewCouponTier(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.8rem', fontWeight: 700, boxSizing: 'border-box' }}
                    >
                      <option value="All">All Plans</option>
                      <option value="Basic">Basic Only</option>
                      <option value="Pro">Pro Only</option>
                      <option value="Premium">Premium Only</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleAddCoupon}
                  style={{ background: 'var(--color-brown-dark)', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Generate Promotional Coupon
                </button>
              </div>

              {/* List of active promotional coupons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {coupons.map(c => (
                  <div key={c.code} style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between', padding: '0.8rem 1rem', background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <span style={{ background: 'rgba(242, 140, 163, 0.1)', color: 'var(--color-pink)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 900, fontFamily: 'monospace' }}>
                        {c.code}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>
                        {c.discount}% OFF • {c.tier === 'All' ? 'All Plans' : `${c.tier} Tier`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => handleToggleCoupon(c.code)}
                        style={{ background: 'none', border: 'none', color: c.active ? '#10B981' : '#64748B', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        {c.active ? 'Active' : 'Paused'}
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(c.code)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Platform health logs, Broadcast & Maintenance center */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* NEW: DNS Regional Edge Proxy Outage Simulator */}
            <div className="card" style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '24px', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-brown-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  <Globe size={18} color="var(--color-pink)" /> Regional Edge Outage Simulator
                </h3>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  background: isEdgeFailing ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  color: isEdgeFailing ? '#EF4444' : '#10B981',
                  textTransform: 'uppercase'
                }}>
                  {isEdgeFailing ? 'Failover Active' : 'Edge Healthy'}
                </span>
              </div>

              <div style={{ background: '#F8FAFC', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.03)', marginBottom: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 800 }}>ACTIVE ROUTE INSTANCE</span>
                    <b style={{ color: 'var(--color-brown-dark)' }}>{activeEdgeNode}</b>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 800 }}>NETWORK LATENCY</span>
                    <b style={{ color: isEdgeFailing && activeEdgeNode.includes('mumbai') ? '#EF4444' : '#10B981' }}>{edgeLatency} ms</b>
                  </div>
                </div>
              </div>

              {isEdgeFailing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ background: '#FEF2F2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #FCA5A5', fontSize: '0.75rem', color: '#B91C1C', fontWeight: 700 }}>
                    ⚠️ Regional DNS Packet Drop Spike simulated. Secondary routing nodes dispatched!
                  </div>
                  <button
                    onClick={handleRestorePrimaryNode}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '10px',
                      border: 'none',
                      background: '#10B981',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <RefreshCw size={13} /> Restore Primary Mumbai Edge
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSimulateOutage}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#EF4444',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <AlertTriangle size={13} strokeWidth={2.5} /> Trigger Mumbai Node Packet Outage
                </button>
              )}
            </div>

            {/* NEW: Multichannel Selective Platform Broadcast Composer */}
            <div className="card" style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '24px', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.4rem', color: 'var(--color-brown-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Radio size={18} color="var(--color-pink)" /> Global SaaS Announcement Broadcast
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-brown)', opacity: 0.8, marginBottom: '1.5rem', fontWeight: 600 }}>
                Send automated push notifications directly to the chat dashboard terminals of registered store owners.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--color-brown-dark)', fontSize: '0.75rem' }}>
                    Target Merchant Tier Group
                  </label>
                  <select
                    value={broadcastTarget}
                    onChange={e => setBroadcastTarget(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.8rem', fontWeight: 700 }}
                  >
                    <option value="All">All Registered Tenants (Global)</option>
                    <option value="Basic">Basic Subscription Tier Only</option>
                    <option value="Pro">Pro Subscription Tier Only</option>
                    <option value="Premium">Premium Subscription Tier Only</option>
                    <option value="Suspended">Suspended Merchant Shops Only</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--color-brown-dark)', fontSize: '0.75rem' }}>
                    Broadcast Text Announcement Message
                  </label>
                  <textarea
                    rows="3"
                    value={broadcastText}
                    onChange={e => setBroadcastText(e.target.value)}
                    placeholder="e.g. Scheduled updates on June 2. Node failovers ensure 100% storefront uptime during route upgrades."
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.8rem', fontWeight: 600, boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none', resize: 'none' }}
                  />
                </div>

                {isBroadcasting ? (
                  <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginBottom: '4px' }}>
                      <span>Transmitting logs & triggers...</span>
                      <span>{broadcastProgress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${broadcastProgress}%`, height: '100%', background: 'var(--gradient-pink)', borderRadius: '2px' }} />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleSendBroadcast}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'var(--color-brown-dark)',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Share2 size={13} /> Dispatch Announcement Signal
                  </button>
                )}
              </div>
            </div>

            {/* 3. Platform Health Logs & Diagnostic stream */}
            <div className="card" style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '24px', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-brown-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  <Server size={18} color="var(--color-pink)" /> System Diagnostics & Health
                </h3>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isEdgeFailing ? '#F59E0B' : '#10B981', display: 'block' }} className="pulse" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                    <Cpu size={12} /> Cpu Core Load
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>{isEdgeFailing ? '68%' : '24%'}</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                    <Database size={12} /> Buffer Pools
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10B981' }}>Healthy</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                    <HardDrive size={12} /> Postgres Vacuum
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>0 pending</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                    <Activity size={12} /> WebSockets
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>147 active</div>
                </div>
              </div>

              {/* Maintenance Optimize Cache Simulator Button */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: '0 0 2px 0' }}>Platform Vacuum & Maintenance</h4>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Optimize Postgres indexes, purge memory caches, and garbage-collect routes.</span>
                </div>
                
                {isOptimizing ? (
                  <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginBottom: '6px' }}>
                      <span>Re-indexing dynamic tables...</span>
                      <span>{optimizeProgress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${optimizeProgress}%`, height: '100%', background: 'var(--gradient-pink)', borderRadius: '3px' }} />
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleOptimizeSystem}
                    style={{ background: 'var(--gradient-pink)', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(242,140,163,0.2)' }}
                  >
                    <RefreshCw size={15} /> Clear Cache & Re-index Pools
                  </button>
                )}
              </div>
            </div>

            {/* 4. Real-time platform log stream */}
            <div className="card" style={{ background: '#FFFFFF', padding: '2.2rem', borderRadius: '24px', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--color-brown-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="#EF4444" /> Live Platform Operations Terminal
              </h3>
              
              <div style={{ 
                background: '#0F172A', 
                borderRadius: '16px', 
                padding: '1.2rem', 
                fontFamily: 'monospace', 
                fontSize: '0.75rem', 
                color: '#38BDF8', 
                height: '190px', 
                overflowY: 'auto',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.6)'
              }} className="no-scrollbar">
                {sysLogs.map(log => (
                  <div key={log.id} style={{ marginBottom: '8px', lineHeight: 1.4 }}>
                    <span style={{ color: '#64748B' }}>[{log.time}]</span>{' '}
                    <span style={{ color: log.type === 'error' ? '#EF4444' : log.type === 'success' ? '#10B981' : '#38BDF8' }}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* NEW: Razorpay / Stripe Billing & Refill Ledger Table */}
        <section style={{ width: '100%', marginTop: '1rem' }}>
          <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '28px', border: '1px solid rgba(15, 23, 42, 0.06)', boxShadow: '0 10px 40px -15px rgba(15, 23, 42, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem', marginBottom: '2rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} color="var(--color-pink)" /> Refills & Subscriptions Transactions Audit
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Secured multi-tenant licensing invoicing ledger history.</span>
              </div>
              <span style={{ fontSize: '0.75rem', background: '#F1F5F9', padding: '5px 12px', borderRadius: '8px', color: 'var(--color-brown)', fontWeight: 800 }}>
                Gateways: Razorpay SECURE & Stripe
              </span>
            </div>

            <div style={{ overflowX: 'auto' }} className="no-scrollbar">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #F1F5F9' }}>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.8rem', color: '#64748B' }}>Invoice ID</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.8rem', color: '#64748B' }}>Date</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.8rem', color: '#64748B' }}>Merchant Domain</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.8rem', color: '#64748B' }}>Transaction Item Details</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.8rem', color: '#64748B' }}>Billing Value</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.8rem', color: '#64748B' }}>Gateway</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.8rem', color: '#64748B' }}>Security Verification</th>
                    <th style={{ padding: '1rem', fontWeight: 800, fontSize: '0.8rem', color: '#64748B', textAlign: 'right' }}>Invoice Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billingTransactions.map(tx => (
                    <tr key={tx.id} style={{ borderBottom: '1px solid #F1F5F9' }} className="table-row-hover">
                      <td style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)', fontFamily: 'monospace' }}>
                        {tx.id}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>
                        {tx.date}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>
                        {tx.merchant}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
                        {tx.type}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>
                        ₹{tx.amount.toLocaleString()}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 750, color: 'var(--color-brown)' }}>
                        {tx.gateway}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', fontSize: '0.7rem', fontWeight: 900 }}>
                          {tx.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => setActiveInvoice(tx)}
                          style={{
                            padding: '4px 10px',
                            background: '#F1F5F9',
                            border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            color: 'var(--color-brown-dark)',
                            cursor: 'pointer'
                          }}
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>

      {/* NEW: Printable/Interactive Invoice Modal Popup */}
      <AnimatePresence>
        {activeInvoice && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveInvoice(null)}
              style={{ position: 'absolute', inset: 0, background: '#000' }}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                position: 'relative',
                background: '#FFFFFF',
                width: '100%',
                maxWidth: '460px',
                padding: '2.5rem',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed #E2E8F0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-pink)', textTransform: 'uppercase' }}>SAAS SUBSCRIPTION LEDGER</div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>SECURE INVOICE</h3>
                </div>
                <button
                  onClick={() => setActiveInvoice(null)}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F1F5F9', border: 'none', cursor: 'pointer', fontWeight: 900 }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 700 }}>Invoice Code:</span>
                  <b style={{ color: 'var(--color-brown-dark)', fontFamily: 'monospace' }}>{activeInvoice.id}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 700 }}>Date of Settlement:</span>
                  <b style={{ color: 'var(--color-brown-dark)' }}>{activeInvoice.date}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 700 }}>Tenant Store:</span>
                  <b style={{ color: 'var(--color-brown-dark)' }}>{activeInvoice.merchant}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 700 }}>Item Description:</span>
                  <b style={{ color: 'var(--color-brown-dark)' }}>{activeInvoice.type}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B', fontWeight: 700 }}>Settlement Gateway:</span>
                  <b style={{ color: 'var(--color-brown-dark)' }}>{activeInvoice.gateway}</b>
                </div>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>Total Billed Sum:</span>
                  <b style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10B981' }}>₹{activeInvoice.amount.toLocaleString()}</b>
                </div>

                <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.03)', fontSize: '0.7rem', color: '#64748B', textAlign: 'center', lineHeight: '1.4', marginTop: '1rem' }}>
                  🔒 Razorpay Cryptographic Hash: sha256_verified_txn_{activeInvoice.id.toLowerCase()}_platform_saas_node
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Inspected Store Drawer Overlay */}
      <AnimatePresence>
        {inspectedBiz && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectedBiz(null)}
              style={{ position: 'absolute', inset: 0, background: '#000000' }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'relative', width: isMobile ? '100%' : '480px', height: '100%', background: '#FFFFFF', boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', padding: '3.5rem 2.2rem', boxSizing: 'border-box', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-pink)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Merchant Inspector Drawer</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: 0 }}>{inspectedBiz.name}</h3>
                </div>
                <button 
                  onClick={() => setInspectedBiz(null)}
                  style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifycontent: 'center', fontWeight: 900, display: 'flex', justifyContent: 'center' }}
                >
                  <X size={16} style={{ alignSelf: 'center' }} />
                </button>
              </div>

              {/* GDPR Personal Data Privacy Shield Switch */}
              <div style={{ 
                background: isGdprShieldActive ? 'rgba(16, 185, 129, 0.04)' : 'rgba(239, 68, 68, 0.04)', 
                padding: '1rem 1.2rem', 
                borderRadius: '16px', 
                border: `1.5px solid ${isGdprShieldActive ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{isGdprShieldActive ? '🛡️' : '⚠️'}</span>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 900, color: isGdprShieldActive ? '#10B981' : '#EF4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      GDPR Privacy Shield {isGdprShieldActive ? 'Active' : 'Disabled'}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, display: 'block', marginTop: '1px' }}>
                      {isGdprShieldActive ? 'Masks client emails, numbers, and addresses.' : 'Warning: Personal data exposed to operator views.'}
                    </span>
                  </div>
                </div>
                
                <div 
                  onClick={() => setIsGdprShieldActive(!isGdprShieldActive)}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '20px',
                    background: isGdprShieldActive ? '#10B981' : '#CBD5E1',
                    padding: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isGdprShieldActive ? 'flex-end' : 'flex-start',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
                </div>
              </div>

              {/* Store summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ background: '#F8FAFC', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>SUBDOMAIN</span>
                      <b style={{ color: 'var(--color-brown-dark)', fontFamily: 'monospace' }}>{inspectedBiz.id}.platform.com</b>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>NICHE CATEGORY</span>
                      <b style={{ color: 'var(--color-brown-dark)' }}>{inspectedBiz.category}</b>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>ACTIVE THEME</span>
                      <b style={{ color: 'var(--color-brown-dark)' }}>{inspectedBiz.theme || 'Modern'}</b>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>WHATSAPP NUMBER</span>
                      <b style={{ color: 'var(--color-brown-dark)' }}>
                        {maskPersonalData(inspectedBiz.whatsappNumber || '+91 98765 00000', isGdprShieldActive)}
                      </b>
                    </div>
                  </div>
                </div>

                {/* Plan & Message Validity Audit Panel */}
                <div style={{ background: '#0F172A', color: 'white', padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.2rem', boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 900, textTransform: 'uppercase' }}>PLAN VALIDITY STATE</span>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FFFFFF', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {inspectedBiz.subscription === 'Custom Plan' ? '🛡️ Custom Modular Plan' : `${inspectedBiz.subscription} Tier`}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 900, textTransform: 'uppercase', display: 'block' }}>RENEWAL DATE</span>
                      <b style={{ color: '#10B981', fontSize: '0.85rem' }}>June 25, 2026</b>
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 900, textTransform: 'uppercase' }}>MESSAGE LIMIT VALIDITY</span>
                      <b style={{ fontSize: '0.85rem', color: '#38BDF8' }}>
                        {inspectedBiz.messagesUsed || 0} / {Math.max(200, inspectedBiz.whatsappMessagesCount || 200) + (inspectedBiz.topUpMessages || 0)} used
                      </b>
                    </div>
                    
                    {/* Progress Bar */}
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${Math.min(((inspectedBiz.messagesUsed || 0) / (Math.max(200, inspectedBiz.whatsappMessagesCount || 200) + (inspectedBiz.topUpMessages || 0))) * 100, 100)}%`, 
                          height: '100%', 
                          background: 'linear-gradient(90deg, #38BDF8, #818CF8)', 
                          borderRadius: '3px' 
                        }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Custom Features Checklist */}
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown)', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem', letterSpacing: '0.5px' }}>
                    Active Custom Features
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span style={{ padding: '4px 10px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#4F46E5' }}>
                      ✓ Responsive Storefront Catalog
                    </span>
                    {inspectedBiz.additionalFeatures && inspectedBiz.additionalFeatures.length > 0 ? (
                      inspectedBiz.additionalFeatures.map((feat, idx) => (
                        <span key={idx} style={{ padding: '4px 10px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#4F46E5' }}>
                          ✓ {feat}
                        </span>
                      ))
                    ) : (
                      <>
                        <span style={{ padding: '4px 10px', background: '#F1F5F9', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#64748B' }}>
                          ✓ Advanced Custom Fields Builder
                        </span>
                        <span style={{ padding: '4px 10px', background: '#F1F5F9', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, color: '#64748B' }}>
                          ✓ AI Chatbot Automation
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Track Customer Activities in Webpage Timeline */}
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.2rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown)', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem', letterSpacing: '0.5px' }}>
                    📈 Webpage & Customer Activity Log Trail
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {[
                      { time: '10:48 AM', icon: '🛒', desc: `New catalog order placed by client ${maskPersonalData(inspectedBiz.orders?.[0]?.customer || 'Sarah Connor', isGdprShieldActive)} for ₹${String(inspectedBiz.orders?.[0]?.amount || '₹999').replace(/[^0-9.]/g, '')}` },
                      { time: 'Yesterday', icon: '📦', desc: `Product inventory checked: ${inspectedBiz.products?.[0]?.name || 'Chocolate Truffle'} (Stock OK)` },
                      { time: '2 days ago', icon: '⚙️', desc: `Custom checkout fields configuration saved by merchant.` }
                    ].map((act, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1rem', background: 'rgba(74,44,42,0.05)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {act.icon}
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                          <span style={{ color: 'var(--color-brown-dark)', fontWeight: 700, fontSize: '0.8rem', lineHeight: '1.3' }}>{act.desc}</span>
                          <span style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700 }}>{act.time} • Action IP Trace Verified</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inspected Store Customer Records Database */}
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.2rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brown)', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem', letterSpacing: '0.5px' }}>
                    👥 Client Database Records ({inspectedBiz.orders?.length || 1})
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {(inspectedBiz.orders && inspectedBiz.orders.length > 0 ? inspectedBiz.orders : [
                      { customer: 'Emma Watson', email: 'emma@example.com', amount: '₹599' }
                    ]).map((ord, idx) => (
                      <div key={idx} style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <b style={{ fontSize: '0.85rem', color: 'var(--color-brown-dark)', display: 'block' }}>
                            {maskPersonalData(ord.customer || 'Alice Green', isGdprShieldActive)}
                          </b>
                          <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'monospace' }}>
                            {maskPersonalData(ord.email || 'alice@example.com', isGdprShieldActive)}
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--color-brown-dark)', display: 'block' }}>
                            {ord.amount}
                          </span>
                          <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '1px 5px', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 900 }}>
                            Paid
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action tools */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid #F1F5F9', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      topUpMessageQuota(inspectedBiz.id, 1000);
                      alert(`🎉 Successfully injected +1000 credits to ${inspectedBiz.name}!`);
                    }}
                    style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', background: '#FFFFFF', border: '1px solid rgba(122, 78, 58, 0.25)', color: 'var(--color-brown-dark)', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    +1000 Credits Injection
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleApproval(inspectedBiz.id, inspectedBiz.approvalStatus)}
                    style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', background: inspectedBiz.approvalStatus === 'Suspended' ? '#10B981' : '#EF4444', border: 'none', color: 'white', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    {inspectedBiz.approvalStatus === 'Suspended' ? 'APPROVE INSTANCE' : 'SUSPEND INSTANCE'}
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    switchRole('admin', inspectedBiz.id);
                    navigate('/admin');
                  }}
                  style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', background: 'var(--gradient-pink)', border: 'none', color: 'white', fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', boxShadow: '0 4px 12px rgba(242,140,163,0.2)' }}
                >
                  <Zap size={14} /> GOTO MERCHANT DASHBOARD VIEW
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SuperAdminDashboard;
