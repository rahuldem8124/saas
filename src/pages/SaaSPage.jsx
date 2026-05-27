import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTenant } from '../context/TenantContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, MessageCircle, BarChart2, ArrowRight, Check, Rocket, Layers, 
  Palette, Shield, Globe, ShoppingCart, User, AlertCircle, Terminal, 
  Send, RefreshCw, Smartphone, TrendingUp, Users, Cpu, FileText, Truck,
  Settings, Zap, CheckCircle2, ChevronRight, Lock, MessageSquare, X
} from 'lucide-react';

const Instagram = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const SaaSPage = () => {
  const { createBusiness, businesses } = useTenant();
  const { loginSeller } = useAuth();
  const navigate = useNavigate();

  // Wizard state
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

  // Responsive tracker
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  // Premium SaaS Colors & Tokens
  const t = {
    bg: '#F8FAFC', // Slate 50 (Crisp background)
    bgLight: '#FFFFFF', // Pure white containers
    textPrimary: '#0F172A', // Slate 900
    textMuted: '#475569', // Slate 600
    primary: '#4F46E5', // Indigo 600
    primaryLight: 'rgba(79, 70, 229, 0.08)',
    primaryGradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    border: 'rgba(15, 23, 42, 0.08)',
    cardBg: '#FFFFFF', // Pure White for cards
    glassBg: 'rgba(255, 255, 255, 0.7)',
    accentBlue: '#0284C7', // Sky Blue
    accentGreen: '#16A34A', // Emerald Green
    accentPurple: '#7C3AED', // Purple Accent
    accentOrange: '#D97706', // Warm Gold/Orange
    shadowSoft: '0 10px 30px -10px rgba(15, 23, 42, 0.06)',
    shadowGlow: '0 10px 25px -5px rgba(79, 70, 229, 0.15)'
  };

  // Section Refs for smooth scrolling
  const wizardRef = useRef(null);
  const sandboxRef = useRef(null);
  const tourSectionRef = useRef(null);

  const scrollToSection = (elementRef) => {
    if (elementRef && elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // -- 9. FLOATING ACTIVITY TICKER STREAM --
  const [liveActivities, setLiveActivities] = useState([
    { id: 1, text: "🍰 Cakehouse received a custom $120 wedding cake order!", time: "Just now", type: "order" },
    { id: 2, text: "👟 SoleVault updated stock for Nike Air Jordan Retro 1 (Size 10)", time: "2m ago", type: "stock" },
    { id: 3, text: "💍 DaintyGold enabled automated custom field 'Engraving Text'", time: "4m ago", type: "feature" }
  ]);

  const dismissActivity = (id) => {
    setLiveActivities(prev => prev.filter(act => act.id !== id));
  };

  useEffect(() => {
    const templates = [
      { text: "🎂 Bakehouse processed custom 3-tier chocolate cake order ($180)", type: "order" },
      { text: "👟 Kickz premium storefront added 12 new summer items!", type: "stock" },
      { text: "🎨 ClayCo integrated Delhivery courier for automated shipping fulfillment", type: "feature" },
      { text: "💍 RoseGold upgraded automatic template triggers on WhatsApp Bot", type: "feature" },
      { text: "👕 Threads & Co. received an apparel order from Instagram comments ($95)", type: "order" },
      { text: "🧁 SweetSymphony activated Pro Plan license!", type: "license" }
    ];

    const interval = setInterval(() => {
      const selected = templates[Math.floor(Math.random() * templates.length)];
      setLiveActivities(prev => [
        { id: Date.now(), text: selected.text, time: "Just now", type: selected.type },
        ...prev.slice(0, 2)
      ]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // -- 1. HERO ANIMATED DASHBOARD PREVIEW STATES --
  const [salesCount, setSalesCount] = useState(48290);
  const [socialFeedIndex, setSocialFeedIndex] = useState(0);
  const socialFeed = [
    { source: "Instagram Comment", user: "@lucy_art", text: "'Love the Sneakers! Size 8 please'", action: "ShopFlow AI DMing Link..." },
    { source: "Instagram DM", user: "@james_b", text: "'Is the 2kg Chocolate Cake available for Friday?'", action: "Checking slot... Available!" },
    { source: "WhatsApp Bot Trigger", user: "+1 555 489 029", text: "'Send Cake Catalog'", action: "Pushing Interactive Checkout Link" },
    { source: "ShopFlow Checkout", user: "@lucy_art", text: "Custom Sizing Filed: Mesh/Size 8/Black", action: "Order Confirmed & Paid! $120.00" }
  ];

  useEffect(() => {
    const countInterval = setInterval(() => {
      setSalesCount(prev => prev + Math.floor(Math.random() * 25) + 5);
    }, 4500);

    const feedInterval = setInterval(() => {
      setSocialFeedIndex(prev => (prev + 1) % socialFeed.length);
    }, 4000);

    return () => {
      clearInterval(countInterval);
      clearInterval(feedInterval);
    };
  }, []);

  // -- 3. INTERACTIVE BUSINESS PREVIEW SELECTOR --
  const [activeNiche, setActiveNiche] = useState('Cake');
  const [activeUiMode, setActiveUiMode] = useState('Webpage');
  const [activeTheme, setActiveTheme] = useState('Modern');
  const [isSandboxVisible, setIsSandboxVisible] = useState(false);
  const niches = {
    Cake: {
      theme: 'Luxury Sweet',
      accent: '#FF8DA1',
      brand: 'CakeFlow Bakery',
      bannerImage: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80',
      tagline: 'Custom Layered Wedding Tiers & Celebration Confections',
      customFields: [
        { name: 'Select Flavor', val: 'Chocolate Truffle' },
        { name: 'Select Weight', val: '1.5kg' },
        { name: 'Cake Inscription', val: 'Happy Birthday Rahul!' }
      ],
      metrics: [
        { label: 'Oven Utilization', val: '82%', alert: 'Normal' },
        { label: 'Today\'s Baking Slots', val: '12 / 15 Filled', alert: 'Busy' },
        { label: 'Avg Prep Period', val: '2.5 Days', alert: 'Optimized' }
      ],
      products: [
        { name: 'Velvet Rose Dream', price: '$45.00', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80' },
        { name: 'Belgian Truffle Kiss', price: '$38.00', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80' }
      ]
    },
    Sneakers: {
      theme: 'Bold Urban Street',
      accent: '#38BDF8',
      brand: 'FastFoot Sneaker Lab',
      bannerImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      tagline: 'Hyper-Limited Premium Runners & Custom Streetwear',
      customFields: [
        { name: 'Sizing (US)', val: 'US 10' },
        { name: 'Select Colorway', val: 'Vanguard White / Hyper Red' },
        { name: 'Material Lining', val: 'Urban Suede' }
      ],
      metrics: [
        { label: 'US 10 Stock Alert', val: '2 Left', alert: 'Critical' },
        { label: 'Packaging Speed', val: '14 Mins', alert: 'Extremely Fast' },
        { label: 'Popular Color', val: 'Vanguard White (58%)', alert: 'Trending' }
      ],
      products: [
        { name: 'Vapor Runner Elite', price: '$120.00', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80' },
        { name: 'Retro Urban Lows', price: '$95.00', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80' }
      ]
    },
    Accessories: {
      theme: 'Classic Golden Luxe',
      accent: '#F59E0B',
      brand: 'RoseGold Atelier',
      bannerImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80',
      tagline: 'Handcrafted Rings, Dainty Hoop Sets & Personal Engravings',
      customFields: [
        { name: 'Metal Finish', val: '18k Rose Gold Plating' },
        { name: 'Monogram Letter', val: 'M.D.' },
        { name: 'Chain Option', val: 'Classic 18-inch Cable' }
      ],
      metrics: [
        { label: 'Engraving Machine Load', val: '3 Pending', alert: 'Normal' },
        { label: 'Custom Polish Requests', val: '92%', alert: 'Very High' },
        { label: 'Material Health', val: 'Sterling Silver: High', alert: 'Healthy' }
      ],
      products: [
        { name: 'Minimalist Silver Link', price: '$65.00', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80' },
        { name: 'Celestial Hoop Set', price: '$35.00', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80' }
      ]
    },
    Handmade: {
      theme: 'Earthy Clay Artisanal',
      accent: '#34D399',
      brand: 'Clay & Co. Pottery',
      bannerImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
      tagline: 'Organically Molded Ceramics & Hand-Painted Home Decor',
      customFields: [
        { name: 'Clay Finish Style', val: 'Double Glazed Matte' },
        { name: 'Add Gift Wrap Box', val: 'Deluxe Ribbon Kraft Box' },
        { name: 'Color Spiral Tone', val: 'Ocean Blue Swirls' }
      ],
      metrics: [
        { label: 'Drying Rack Units', val: '18 Pots', alert: 'Capacity Checked' },
        { label: 'Expedited Orders', val: '2 Urgent', alert: 'Priority' },
        { label: 'Glazing Kiln Tempe', val: '1240°C', alert: 'Hot' }
      ],
      products: [
        { name: 'Hand-Painted Clay Mug', price: '$25.00', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80' },
        { name: 'Woven Macrame Hanger', price: '$45.00', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=400&q=80' }
      ]
    }
  };

  const getThemeStyles = () => {
    const accentColor = niches[activeNiche].accent;
    switch (activeTheme) {
      case 'Minimal':
        return {
          bg: '#FFFFFF',
          text: '#000000',
          accent: '#000000',
          cardBg: '#FAFAFA',
          radius: '0px',
          shadow: 'none',
          gradient: 'linear-gradient(135deg, #000 0%, #000 100%)',
          borderColor: '#000000',
          mutedText: '#666666',
          dividerColor: '#E5E7EB'
        };
      case 'Luxury':
        return {
          bg: '#FFFBF7',
          text: '#4A2C2A',
          accent: '#D4AF37',
          cardBg: '#FFFDFB',
          radius: '20px',
          shadow: '0 10px 30px rgba(212, 175, 55, 0.05)',
          gradient: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)',
          borderColor: 'rgba(212, 175, 55, 0.25)',
          mutedText: '#8A6B69',
          dividerColor: 'rgba(212, 175, 55, 0.12)'
        };
      case 'Dark':
        return {
          bg: '#121212',
          text: '#F5F5F5',
          accent: accentColor,
          cardBg: '#1E1E1E',
          radius: '16px',
          shadow: '0 10px 30px rgba(255, 42, 84, 0.1)',
          gradient: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          mutedText: '#A0A0A0',
          dividerColor: 'rgba(255, 255, 255, 0.08)'
        };
      case 'Instagram-first':
        return {
          bg: '#FAFAFA',
          text: '#262626',
          accent: '#0095F6',
          cardBg: '#FFFFFF',
          radius: '8px',
          shadow: '0 4px 12px rgba(0,0,0,0.05)',
          gradient: 'linear-gradient(135deg, #E1306C 0%, #C13584 100%)',
          borderColor: '#DBDBDB',
          mutedText: '#8E8E8E',
          dividerColor: '#DBDBDB'
        };
      default: { // Modern
        let modernBg = '#FFF8F3'; // default cake cream
        let modernText = '#4A2C2A'; // default cake brown
        if (activeNiche === 'Sneakers') {
          modernBg = '#F0F9FF'; // Soft Sky Blue
          modernText = '#0F172A';
        } else if (activeNiche === 'Accessories') {
          modernBg = '#FFFDF5'; // Warm Gold
          modernText = '#1E293B';
        } else if (activeNiche === 'Handmade') {
          modernBg = '#F2FDF9'; // Light Emerald
          modernText = '#065F46';
        }
        return {
          bg: modernBg,
          text: modernText,
          accent: accentColor,
          cardBg: '#FFFFFF',
          radius: '24px',
          shadow: '0 10px 30px rgba(0,0,0,0.03)',
          gradient: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
          borderColor: 'rgba(0,0,0,0.05)',
          mutedText: '#64748B',
          dividerColor: 'rgba(0,0,0,0.03)'
        };
      }
    }
  };

  const s = getThemeStyles();

  // -- 4. DYNAMIC DASHBOARD CAROUSEL STATES --
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTourVisible, setIsTourVisible] = useState(false);
  const carouselItems = [
    {
      title: "Category-Tailored Order Pipeline",
      subtitle: "Never use generic order templates. Manage specific production steps in real time.",
      icon: <Layers size={24} color={t.primary} />,
      content: (
        <div style={{ padding: '1rem', background: '#1F2937', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 700 }}>🍰 CAKEHOUSE KITCHEN STATION</span>
            <span style={{ fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.2)', color: '#818CF8', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>LIVE SYNC</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.8rem', borderRadius: '8px', borderLeft: `3px solid ${t.accentOrange}` }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', fontWeight: 700 }}>OVEN SLOT queue (4)</span>
              <div style={{ marginTop: '0.5rem', background: '#111827', color: '#F8FAFC', padding: '6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                <b style={{ color: '#FCD34D' }}>#1042</b> <span style={{ color: '#F8FAFC' }}>- 2-tier Red Velvet</span>
              </div>
              <div style={{ marginTop: '0.4rem', background: '#111827', color: '#F8FAFC', padding: '6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                <b style={{ color: '#FCD34D' }}>#1045</b> <span style={{ color: '#F8FAFC' }}>- Chocolate Fudge</span>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.8rem', borderRadius: '8px', borderLeft: `3px solid ${t.primary}` }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', fontWeight: 700 }}>DECORATING table (2)</span>
              <div style={{ marginTop: '0.5rem', background: '#111827', color: '#F8FAFC', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#F8FAFC' }}><b style={{ color: '#818CF8' }}>#1039</b> - Lemon Zest</span>
                <span style={{ fontSize: '0.65rem', background: 'rgba(99, 102, 241, 0.2)', color: '#818CF8', padding: '2px 6px', borderRadius: '4px' }}>Frosting</span>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.8rem', borderRadius: '8px', borderLeft: `3px solid ${t.accentGreen}` }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', fontWeight: 700 }}>COMPLETED & CHILLED (8)</span>
              <div style={{ marginTop: '0.5rem', background: '#111827', color: '#F8FAFC', padding: '6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                <b style={{ color: '#34D399' }}>#1034</b> <span style={{ color: '#F8FAFC' }}>- Birthday Vanilla sponge</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Visual Checkout Form Customizer",
      subtitle: "Drag and drop checkout inputs. Solicit custom dates, file uploads, text values, or measurements.",
      icon: <Palette size={24} color={t.accentBlue} />,
      content: (
        <div style={{ padding: '1rem', background: '#1F2937', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.80rem', fontWeight: 800, color: '#F8FAFC' }}>🛒 ACTIVE CHECKOUT BLOCKS</span>
            <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 700 }}>+ Add Custom Field</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: "Delivery Date Picker", type: "Calendar Date Selection", req: true },
              { label: "Message on Cake", type: "Text Box (Max 60 Chars)", req: false },
              { label: "Upload Inspiration Card", type: "File Upload (.png, .jpg)", req: false }
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111827', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>☰</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F8FAFC' }}>{f.label}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{f.type}</span>
                  <span style={{ fontSize: '0.65rem', background: f.req ? 'rgba(52, 211, 153, 0.1)' : 'rgba(255,255,255,0.05)', color: f.req ? '#4ADE80' : '#94A3B8', padding: '2px 6px', borderRadius: '4px' }}>
                    {f.req ? 'Required' : 'Optional'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "WhatsApp Cloud Automation Bot",
      subtitle: "Map buyer variables directly into highly detailed, transactional WhatsApp APIs. Zero manual updates.",
      icon: <MessageCircle size={24} color={t.accentGreen} />,
      content: (
        <div style={{ padding: '1rem', background: '#1F2937', borderRadius: '12px' }}>
          <div style={{ background: '#111827', padding: '0.8rem', borderRadius: '8px', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#4ADE80', display: 'block', fontWeight: 800 }}>ACTIVE MESSAGE TEMPLATE: ORDER_CONFIRMED</span>
            <code style={{ fontSize: '0.75rem', color: '#F8FAFC', display: 'block', marginTop: '0.4rem', fontFamily: 'monospace' }}>
              "Hi &#123;customer&#125;, your order for &#123;product&#125; is secured! 🎂 Selected Flavor: &#123;flavor&#125;. Status: &#123;status&#125;. ETA: &#123;deliveryDate&#125;."
            </code>
          </div>
          <div style={{ background: 'rgba(52, 211, 153, 0.05)', padding: '0.6rem 1rem', borderRadius: '6px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#4ADE80' }}>
            <CheckCircle2 size={14} /> WhatsApp Cloud Sandbox Webhook Active and pinging nodes.
          </div>
        </div>
      )
    },
    {
      title: "Unified Carrier Delivery Integrations",
      subtitle: "Instantly calculate shipping weights, book Porter local couriers or Delhivery express, and generate labels.",
      icon: <Truck size={24} color="#A78BFA" />,
      content: (
        <div style={{ padding: '1rem', background: '#1F2937', borderRadius: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#111827', padding: '0.8rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#F8FAFC', fontWeight: 700 }}>Delhivery Express</span>
                <span style={{ width: '8px', height: '8px', background: '#4ADE80', borderRadius: '50%' }}></span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '0.5rem' }}>Auto-sync cargo slips</span>
              <button style={{ marginTop: '0.8rem', background: t.primaryGradient, color: 'white', fontSize: '0.7rem', padding: '4px', borderRadius: '4px', fontWeight: 700 }}>Sync Orders</button>
            </div>
            <div style={{ background: '#111827', padding: '0.8rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#F8FAFC', fontWeight: 700 }}>Porter Local Delivery</span>
                <span style={{ width: '8px', height: '8px', background: '#4ADE80', borderRadius: '50%' }}></span>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#94A3B8', marginTop: '0.5rem' }}>Instant local bike delivery</span>
              <button style={{ marginTop: '0.8rem', background: 'rgba(255,255,255,0.05)', color: '#F8FAFC', fontSize: '0.7rem', padding: '4px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 700 }}>Test Connection</button>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Set up IntersectionObserver to check if Tour Section is in viewport
  useEffect(() => {
    if (!tourSectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTourVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(tourSectionRef.current);
    return () => {
      if (tourSectionRef.current) observer.unobserve(tourSectionRef.current);
    };
  }, []);

  // Cycle the slides using high-fidelity 4-second linear progress (every 40ms) when visible & playing
  useEffect(() => {
    if (!isTourVisible || !isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCarouselIndex(oldIndex => (oldIndex + 1) % carouselItems.length);
          return 0;
        }
        return prev + 1; // Increment by 1% every 40ms (total 4000ms = 4 seconds)
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, [isTourVisible, isPlaying, carouselItems.length]);

  // Set up IntersectionObserver to check if Sandbox Section is in viewport
  useEffect(() => {
    if (!sandboxRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSandboxVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(sandboxRef.current);
    return () => {
      if (sandboxRef.current) observer.unobserve(sandboxRef.current);
    };
  }, []);

  // Cycle the active sandbox niche automatically when visible
  useEffect(() => {
    if (!isSandboxVisible) return;
    const keys = Object.keys(niches);
    const interval = setInterval(() => {
      setActiveNiche(current => {
        const nextIndex = (keys.indexOf(current) + 1) % keys.length;
        return keys[nextIndex];
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isSandboxVisible, niches]);

  // -- 6. INTERACTIVE WHATSAPP BOT CHAT SIMULATOR --
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Welcome to ShopFlow Automations! ⚡ How can I assist you with custom orders today?", time: "10:00 AM" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const simulateBotResponse = (userText, botText) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: "Just now" }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { sender: 'bot', text: botText, time: "Just now" }]);
    }, 1500);
  };

  // -- 8. SUPER ADMIN PREVIEW LIVE EVENT FEED --
  const [adminEvents, setAdminEvents] = useState([
    { id: 1, text: "EVENT [09:21:44] TENANT 'cakeflow' created new custom field flavor_dropdown", color: t.primary },
    { id: 2, text: "EVENT [09:22:01] SUBSCRIPTION payment of $79.00 processed for tenant 'fastfoot'", color: t.accentGreen },
    { id: 3, text: "EVENT [09:22:15] DISPATCH sync completed for partner 'Delhivery' on 'rosegold'", color: t.accentPurple }
  ]);

  useEffect(() => {
    const logs = [
      { text: "EVENT [09:23:02] INSTAGRAM comment trigger caught for post_id: #89283 for 'threads-co'", color: t.accentBlue },
      { text: "EVENT [09:23:14] WEBHOOK status check completed. CPU load 24%. Health normal.", color: t.accentGreen },
      { text: "EVENT [09:23:45] NEW TENANT 'claycraft' generated sandbox subdomain", color: t.accentOrange },
      { text: "EVENT [09:24:02] ORDER completed trigger. Confirmed auto WhatsApp dispatch alert to +1555029", color: t.primary }
    ];

    const interval = setInterval(() => {
      const selected = logs[Math.floor(Math.random() * logs.length)];
      setAdminEvents(prev => [
        { id: Date.now(), text: selected.text, color: selected.color },
        ...prev.slice(0, 2)
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  // Wizard register launcher
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

  const categories = [
    { name: 'Cake', desc: 'Bakers & Custom Confectioners', color: '#FFF3F5', icon: '🎂' },
    { name: 'Shoes', desc: 'Custom Sneakers & Footwear', color: '#F3F4F6', icon: '👟' },
    { name: 'Clothing', desc: 'Bespoke Apparel & Streetwear', color: '#EEF2FF', icon: '👕' },
    { name: 'Accessories', desc: 'Boutique Jewelry & Accessories', color: '#FAF5FF', icon: '💍' },
    { name: 'Handmade', desc: 'Artisanal Clay & Crafted Goods', color: '#FFFBEB', icon: '🎨' },
    { name: 'Custom', desc: 'Flexible templates for custom niches', color: '#ECFDF5', icon: '📦' }
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

  return (
    <div style={{ background: t.bg, minHeight: '100vh', paddingBottom: '100px', boxSizing: 'border-box', fontFamily: 'var(--font-body)', overflowX: 'hidden', position: 'relative', color: t.textPrimary }}>
      
      {/* Decorative Blur Spheres */}
      <div style={{ position: 'absolute', top: '5%', left: '5%', width: '400px', height: '400px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', top: '25%', right: '5%', width: '500px', height: '500px', background: 'rgba(56, 189, 248, 0.12)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '15%', left: '10%', width: '450px', height: '450px', background: 'rgba(167, 139, 250, 0.12)', borderRadius: '50%', filter: 'blur(130px)', pointerEvents: 'none', zIndex: 0 }}></div>

      {/* -- 9. FLOATING SYSTEM ACTIVITY TICKER FEED (SIDEBAR FIXED OVERLAY) -- */}
      {!isMobile && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '320px', zIndex: 99, pointerEvents: 'none' }}>
          <AnimatePresence>
            {liveActivities.map((act, index) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, x: 100 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  borderRadius: '16px',
                  padding: '1.2rem 1.8rem 1rem 1rem',
                  marginBottom: '0.6rem',
                  boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.15)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.8rem',
                  pointerEvents: 'auto',
                  position: 'relative'
                }}
              >
                {/* Close Button Cross */}
                <button
                  onClick={() => dismissActivity(act.id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: t.textMuted,
                    opacity: 0.6,
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
                >
                  <X size={12} />
                </button>

                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: act.type === 'order' ? t.accentGreen : act.type === 'stock' ? t.accentBlue : act.type === 'feature' ? t.accentPurple : t.accentOrange,
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: t.textPrimary, lineHeight: 1.4 }}>{act.text}</p>
                  <span style={{ fontSize: '0.65rem', color: t.textMuted, fontWeight: 700, textTransform: 'uppercase', display: 'block', marginTop: '4px' }}>⚡ System Activity • {act.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Main SaaS Content Gated by Wizard Pending */}
      {step < 5 && (
        <div>
          {/* -- SECTION 1: HERO WITH ANIMATED DASHBOARD PREVIEW -- */}
          <section style={{ maxWidth: '1400px', margin: '0 auto', padding: isTablet ? '120px 5% 4rem' : '150px 5% 6rem', position: 'relative', zIndex: 1 }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1.1fr 0.9fr', gap: '4rem', alignItems: 'center' }}>
              
              {/* Hero Copywriting */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: t.primaryLight, padding: '0.5rem 1.2rem', borderRadius: '30px', border: `1px solid ${t.primary}`, color: t.primary, fontWeight: 800, fontSize: '0.85rem', marginBottom: '2rem', boxShadow: t.shadowSoft }}>
                  <Sparkles size={14} /> <span>SHOPFLOW SaaS SOCIAL COMMERCE V2.0</span>
                </div>
                
                <h1 style={{ fontSize: isMobile ? '2.8rem' : '4.5rem', fontWeight: 950, lineHeight: 1.05, color: t.textPrimary, letterSpacing: '-1.5px', marginBottom: '2rem', fontFamily: 'var(--font-body)' }}>
                  Transform Social Chats <br />
                  Into <span style={{ background: 'linear-gradient(to right, #6366F1, #38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Live Checkout</span> <br />
                  Storefronts.
                </h1>
                
                <p style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', color: t.textMuted, maxWidth: '680px', marginBottom: '3rem', lineHeight: 1.7, fontWeight: 500 }}>
                  Convert Instagram comments and WhatsApp chats directly into automated multi-tenant storefronts. Set custom fields, track oven queues or sneaker stock, auto-send invoices, and ship seamlessly.
                </p>

                <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => scrollToSection(wizardRef)} 
                    style={{
                      background: t.primaryGradient,
                      color: 'white',
                      border: 'none',
                      padding: '1.1rem 2.8rem',
                      fontSize: '1rem',
                      fontWeight: 800,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      boxShadow: t.shadowGlow,
                      cursor: 'pointer'
                    }}
                  >
                    Launch Onboarding Wizard <Rocket size={18} />
                  </button>
                  <button 
                    onClick={() => scrollToSection(sandboxRef)} 
                    style={{
                      background: t.bgLight,
                      color: t.textPrimary,
                      border: `1.5px solid ${t.border}`,
                      padding: '1.1rem 2.8rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      boxShadow: t.shadowSoft,
                      cursor: 'pointer'
                    }}
                  >
                    Explore Sandbox Stores <Globe size={18} />
                  </button>
                </div>
              </motion.div>

              {/* HERO: ANIMATED DASHBOARD PREVIEW */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  background: t.cardBg,
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  border: `1px solid ${t.border}`,
                  padding: '1.8rem',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
                  position: 'relative'
                }}
              >
                {/* Dashboard Frame Bar */}
                <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', background: '#EF4444', borderRadius: '50%' }}></span>
                    <span style={{ width: '10px', height: '10px', background: '#F59E0B', borderRadius: '50%' }}></span>
                    <span style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '50%' }}></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ width: '6px', height: '6px', background: t.accentGreen, borderRadius: '50%' }}></span>
                    <span style={{ fontSize: '0.65rem', color: t.textMuted, fontFamily: 'monospace', fontWeight: 700 }}>https://admin.shopflow.saas</span>
                  </div>
                </div>

                {/* Dashboard Core Mock */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: t.textMuted, fontWeight: 700, textTransform: 'uppercase' }}>ShopFlow Platform Revenue</span>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '2px 0 0', color: t.textPrimary, fontFamily: 'var(--font-body)' }}>
                        ${salesCount.toLocaleString()}
                      </h3>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: t.accentGreen, background: 'rgba(52, 211, 153, 0.1)', padding: '4px 8px', borderRadius: '6px', fontWeight: 800 }}>
                      <TrendingUp size={12} /> +14.2% today
                    </span>
                  </div>

                  {/* SVG Chart Mini Preview */}
                  <div style={{ height: '120px', width: '100%', position: 'relative', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.15)', borderRadius: '12px', padding: '10px 0', overflow: 'hidden' }}>
                    <svg viewBox="0 0 400 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                      <defs>
                        <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={t.primary} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={t.primary} stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      {/* Fill Area */}
                      <path d="M 0 90 Q 50 70, 100 80 T 200 40 T 300 30 T 400 10 L 400 100 L 0 100 Z" fill="url(#glowGrad)" />
                      {/* Glowing Line */}
                      <path d="M 0 90 Q 50 70, 100 80 T 200 40 T 300 30 T 400 10" fill="none" stroke={t.primary} strokeWidth="3.5" strokeLinecap="round" />
                      {/* Glowing dot */}
                      <circle cx="400" cy="10" r="5" fill={t.accentBlue} />
                      <circle cx="400" cy="10" r="10" fill="none" stroke={t.accentBlue} strokeWidth="2" opacity="0.5" />
                    </svg>
                  </div>

                  {/* Real-time Order Stream Section inside Hero Mock */}
                  <div style={{ background: '#111827', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase' }}>💬 LIVE CONVERSION HUB</span>
                      <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.1)', color: '#38BDF8', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Instagram Sync</span>
                    </div>

                    <div style={{ minHeight: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={socialFeedIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C084FC' }}>{socialFeed[socialFeedIndex].source}</span>
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>{socialFeed[socialFeedIndex].user}</span>
                          </div>
                          <p style={{ margin: '0 0 6px', fontSize: '0.8rem', fontStyle: 'italic', color: '#F8FAFC' }}>
                            {socialFeed[socialFeedIndex].text}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#4ADE80', fontWeight: 700 }}>
                            <Zap size={10} /> <span>{socialFeed[socialFeedIndex].action}</span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>
          </section>

          {/* -- SECTION 2: THE INTERACTIVE COMMERCE PIPELINE -- */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 5% 5rem', position: 'relative', zIndex: 1 }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-1px', fontFamily: 'var(--font-body)' }}>
              The Modern <span style={{ color: t.primary }}>Commerce Pipeline</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: t.textMuted, textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem', fontWeight: 500, lineHeight: 1.6 }}>
              Visualizing how social conversations are programmatically transformed into completed deliveries, seamlessly managed behind the scenes.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : 'repeat(6, 1fr)', gap: '1.2rem', position: 'relative' }}>
              
              {/* Glowing Line for connectors (desktop only) */}
              {!isTablet && (
                <div style={{ position: 'absolute', top: '40px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(to right, #6366F1, #38BDF8, #34D399)', zIndex: 0 }}></div>
              )}

              {[
                { s: 1, title: "1. Instagram comment", desc: "Buyer states product interest ('want this!')", color: t.primary, icon: <MessageCircle size={18} /> },
                { s: 2, title: "2. Automate DM", desc: "ShopFlow AI instantly pushes secure cart url", color: t.accentPurple, icon: <Zap size={18} /> },
                { s: 3, title: "3. Tailored Store", desc: "Buyer files custom weights/flavors/sizes", color: t.accentBlue, icon: <Smartphone size={18} /> },
                { s: 4, title: "4. Direct Payment", desc: "Unified checkout handles credit card or UPI", color: t.accentGreen, icon: <ShoppingCart size={18} /> },
                { s: 5, title: "5. Active Queues", desc: "Orders appear instantly on niche merchant panel", color: t.accentOrange, icon: <Layers size={18} /> },
                { s: 6, title: "6. Carrier Pickup", desc: "Logistics labels printed, parcel collected", color: t.primary, icon: <Truck size={18} /> }
              ].map((stepNode) => (
                <motion.div
                  key={stepNode.s}
                  whileHover={{ y: -6 }}
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    boxShadow: t.shadowSoft
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: `2px solid ${stepNode.color}`,
                    color: stepNode.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.2rem',
                    boxShadow: `0 0 15px ${stepNode.color}25`
                  }}>
                    {stepNode.icon}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 0.5rem', color: t.textPrimary, fontFamily: 'var(--font-body)' }}>
                    {stepNode.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: t.textMuted, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                    {stepNode.desc}
                  </p>
                </motion.div>
              ))}

            </div>
          </motion.section>

          {/* -- SECTION 3: HIGH-FIDELITY SANDBOX BUSINESS SELECTOR -- */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            ref={sandboxRef}
            style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 5%', position: 'relative', zIndex: 1 }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-1px', fontFamily: 'var(--font-body)' }}>
              Interactive <span style={{ color: t.accentBlue }}>Sandbox Selector</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: t.textMuted, textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem', fontWeight: 500, lineHeight: 1.6 }}>
              Select a customized template to observe storefront styling and dashboard modifications swap in real-time.
            </p>

            {/* Selector Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
              {Object.keys(niches).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveNiche(key)}
                  style={{
                    background: activeNiche === key ? t.primaryGradient : 'rgba(255,255,255,0.03)',
                    color: activeNiche === key ? 'white' : t.textMuted,
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '0.8rem 2rem',
                    borderRadius: '30px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: activeNiche === key ? t.shadowGlow : 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>{key === 'Cake' ? '🎂' : key === 'Sneakers' ? '👟' : key === 'Accessories' ? '💍' : '🎨'}</span>
                  <span>{key} Niche</span>
                </button>
              ))}
            </div>

            {/* Sandbox Main Preview Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '0.9fr 1.1fr', gap: '3rem', alignItems: 'stretch' }}>
              
              {/* MOCKUP A: Buyer Mobile storefront View */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: t.accentBlue, fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.8rem', display: 'block', textAlign: 'center' }}>
                  📱 BUYER MOBILE VIEW (NICHE: {activeNiche.toUpperCase()})
                </span>

                {/* Elegant Pastel Segmented Selector Hub */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '0.4rem 0.8rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  marginBottom: '0.5rem',
                  maxWidth: '360px',
                  width: '100%',
                  margin: '0 auto 0.6rem auto',
                  gap: '0.25rem',
                  boxSizing: 'border-box',
                  overflowX: 'auto'
                }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748B', marginRight: '4px', whiteSpace: 'nowrap' }}>THEME:</span>
                  {['Modern', 'Minimal', 'Luxury', 'Dark', 'Instagram-first'].map(themeName => {
                    const isActive = activeTheme === themeName;
                    const activeBg = themeName === 'Modern' ? niches[activeNiche].accent :
                                     themeName === 'Minimal' ? '#000000' :
                                     themeName === 'Luxury' ? '#D4AF37' :
                                     themeName === 'Dark' ? '#FF2A54' : '#0095F6';
                    return (
                      <button
                        key={themeName}
                        onClick={() => setActiveTheme(themeName)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          borderRadius: '12px',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          background: isActive ? activeBg : 'transparent',
                          color: isActive ? '#FFFFFF' : '#64748B',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {themeName}
                      </button>
                    );
                  })}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '0.35rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  marginBottom: '1rem',
                  maxWidth: '360px',
                  width: '100%',
                  margin: '0 auto 1.2rem auto',
                  gap: '0.2rem',
                  boxSizing: 'border-box'
                }}>
                  {[
                    { mode: 'Webpage', label: 'Webpage', icon: Globe },
                    { mode: 'WhatsApp', label: 'WhatsApp UI', icon: MessageSquare },
                    { mode: 'Instagram', label: 'Instagram UI', icon: Instagram }
                  ].map(({ mode, label, icon: Icon }) => {
                    const isActive = activeUiMode === mode;
                    return (
                      <button
                        key={mode}
                        onClick={() => setActiveUiMode(mode)}
                        style={{
                          flex: 1,
                          padding: '0.5rem 0.6rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          background: isActive ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' : 'transparent',
                          color: isActive ? '#FFFFFF' : '#64748B',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'center'
                        }}
                      >
                        <Icon size={12} />
                        {label}
                      </button>
                    );
                  })}
                </div>

                <div style={{
                  background: activeUiMode === 'Webpage' ? s.bg : activeUiMode === 'WhatsApp' ? (activeTheme === 'Dark' ? '#0b141a' : '#efeae2') : '#FFFFFF',
                  color: activeUiMode === 'Webpage' ? s.text : activeUiMode === 'WhatsApp' ? (activeTheme === 'Dark' ? '#e9edef' : '#303030') : '#262626',
                  border: '10px solid #374151',
                  borderRadius: '36px',
                  padding: activeUiMode === 'Webpage' ? '1.2rem' : '0px',
                  maxWidth: '360px',
                  width: '100%',
                  margin: '0 auto',
                  height: '520px',
                  boxShadow: '0 25px 40px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                  overflow: 'hidden'
                }}>
                  {activeUiMode === 'Webpage' && (
                    <>
                      {/* Phone Mock Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${s.borderColor}`, paddingBottom: '0.6rem', marginBottom: '0.8rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: s.accent, fontFamily: activeTheme === 'Luxury' ? 'Georgia, serif' : 'inherit' }}>{niches[activeNiche].brand}</span>
                        <div style={{ display: 'flex', gap: '8px', color: s.mutedText }}>
                          <ShoppingCart size={14} />
                          <User size={14} />
                        </div>
                      </div>

                      {/* Product Details Area inside Phone */}
                      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '2px' }}>
                        <div style={{ width: '100%', height: '120px', borderRadius: s.radius === '0px' ? '0px' : '12px', overflow: 'hidden', marginBottom: '0.8rem', position: 'relative' }}>
                          <img src={niches[activeNiche].bannerImage} alt="Sandbox" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '6px' }}>
                            <span style={{ fontSize: '0.65rem', background: s.accent, color: 'white', padding: '2px 6px', borderRadius: s.radius === '0px' ? '0px' : '4px', fontWeight: 800 }}>Featured Niche Item</span>
                          </div>
                        </div>

                        <h4 style={{ margin: '0 0 2px', fontSize: '1rem', fontWeight: 900, color: s.text, fontFamily: activeTheme === 'Luxury' ? 'Georgia, serif' : 'inherit' }}>{niches[activeNiche].products[0].name}</h4>
                        <span style={{ fontSize: '0.9rem', color: s.accent, fontWeight: 800, display: 'block', marginBottom: '0.6rem' }}>{niches[activeNiche].products[0].price}</span>

                        {/* Custom fields configured inside Mock */}
                        <div style={{ background: s.cardBg, padding: '0.8rem', borderRadius: s.radius, border: `1px solid ${s.borderColor}`, marginBottom: '0.8rem', boxShadow: s.shadow }}>
                          <span style={{ fontSize: '0.65rem', color: s.mutedText, display: 'block', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                            Dynamic Custom Fields:
                          </span>
                          {niches[activeNiche].customFields.map((f, idx) => (
                            <div key={idx} style={{ marginBottom: '6px' }}>
                              <span style={{ fontSize: '0.65rem', color: s.text, display: 'block', fontWeight: 600 }}>{f.name}</span>
                              <div style={{ width: '100%', background: activeTheme === 'Dark' ? '#2c2c2c' : '#F9FAFB', padding: '6px 8px', borderRadius: s.radius === '0px' ? '0px' : '4px', fontSize: '0.7rem', color: s.mutedText, border: `1px solid ${s.borderColor}`, boxSizing: 'border-box' }}>
                                {f.val}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sticky Purchase Button inside phone */}
                      <button style={{
                        width: '100%',
                        background: s.gradient,
                        color: 'white',
                        border: 'none',
                        padding: '8px',
                        borderRadius: s.radius,
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}>
                        Checkout with Customizations 🚀
                      </button>
                    </>
                  )}

                  {activeUiMode === 'WhatsApp' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                      {/* WhatsApp Header */}
                      <div style={{
                        padding: '0.6rem 0.8rem',
                        background: '#075E54',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', color: 'white' }}>
                            {niches[activeNiche].brand[0]}
                          </div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, color: 'white' }}>{niches[activeNiche].brand}</h4>
                            <span style={{ fontSize: '0.55rem', opacity: 0.85, display: 'block' }}>Automated Chatbot</span>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.55rem', background: '#4CAF50', color: 'white', padding: '2px 6px', borderRadius: '10px', fontWeight: 800 }}>ONLINE</span>
                      </div>

                      {/* WhatsApp Body Messages */}
                      <div style={{
                        flex: 1,
                        padding: '0.8rem',
                        overflowY: 'auto',
                        background: '#E5DDD5',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.6rem'
                      }}>
                        {/* Bot Greeting */}
                        <div style={{
                          alignSelf: 'flex-start',
                          background: '#FFFFFF',
                          color: '#303030',
                          padding: '0.5rem 0.7rem',
                          borderRadius: '0px 10px 10px 10px',
                          boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                          fontSize: '0.75rem',
                          lineHeight: 1.3,
                          maxWidth: '85%'
                        }}>
                          👋 Welcome to <b>{niches[activeNiche].brand}</b>!
                        </div>

                        <div style={{
                          alignSelf: 'flex-start',
                          background: '#FFFFFF',
                          color: '#303030',
                          padding: '0.5rem 0.7rem',
                          borderRadius: '0px 10px 10px 10px',
                          boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                          fontSize: '0.75rem',
                          lineHeight: 1.3,
                          maxWidth: '85%'
                        }}>
                          Tap **Instant Order** to buy directly:
                        </div>

                        {/* WhatsApp Inline Catalog Item */}
                        <div style={{
                          alignSelf: 'flex-start',
                          width: '180px',
                          background: '#FFFFFF',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                          border: '1px solid rgba(0,0,0,0.05)',
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <img src={niches[activeNiche].bannerImage} style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
                          <div style={{ padding: '0.5rem' }}>
                            <h5 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800 }}>{niches[activeNiche].products[0].name}</h5>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: niches[activeNiche].accent, display: 'block', margin: '2px 0' }}>{niches[activeNiche].products[0].price}</span>
                            <button style={{
                              width: '100%',
                              background: '#128C7E',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px',
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              marginTop: '4px'
                            }}>
                              Instant Order 🛍️
                            </button>
                          </div>
                        </div>

                        {/* Customer simulated reply */}
                        <div style={{
                          alignSelf: 'flex-end',
                          background: '#DCF8C6',
                          color: '#303030',
                          padding: '0.5rem 0.7rem',
                          borderRadius: '10px 0px 10px 10px',
                          boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                          fontSize: '0.75rem',
                          lineHeight: 1.3,
                          maxWidth: '85%',
                          marginTop: '4px'
                        }}>
                          Order secured successfully!
                        </div>
                      </div>

                      {/* WhatsApp Footer Input Bar */}
                      <div style={{
                        padding: '0.4rem 0.6rem',
                        background: '#F0F0F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderTop: '1px solid rgba(0,0,0,0.05)'
                      }}>
                        <div style={{ flex: 1, background: 'white', borderRadius: '15px', padding: '4px 10px', fontSize: '0.7rem', color: '#999', border: '1px solid #ddd' }}>
                          Type a message...
                        </div>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem' }}>
                          🟢
                        </div>
                      </div>
                    </div>
                  )}

                  {activeUiMode === 'Instagram' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: '#FFFFFF' }}>
                      {/* Instagram Top Header */}
                      <div style={{
                        padding: '0.5rem 0.8rem',
                        background: '#FFFFFF',
                        color: '#262626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #DBDBDB'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(45deg, #F09433 0%, #E6683C 25%, #DC2743 50%, #CC2366 75%, #BC1888 100%)', padding: '1.5px', boxSizing: 'border-box' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.65rem' }}>
                              {niches[activeNiche].brand[0]}
                            </div>
                          </div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800 }}>{niches[activeNiche].brand.toLowerCase().replace(/\s+/g, '')}</h4>
                            <span style={{ fontSize: '0.55rem', color: '#999', display: 'block', marginTop: '-2px' }}>Sponsored</span>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 900, cursor: 'pointer' }}>•••</span>
                      </div>

                      {/* Instagram Post Image */}
                      <div style={{ flex: 1, background: '#FAFAFA', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                        <div style={{ width: '100%', height: '180px', position: 'relative', overflow: 'hidden' }}>
                          <img src={niches[activeNiche].bannerImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          
                          {/* Shop Tag */}
                          <div style={{
                            position: 'absolute',
                            bottom: '12px',
                            left: '12px',
                            background: 'rgba(0,0,0,0.85)',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                          }}>
                            🛍️ Buy: {niches[activeNiche].products[0].name}
                          </div>
                        </div>

                        {/* Instagram Interaction Bar */}
                        <div style={{ padding: '0.4rem 0.8rem 0.2rem 0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ fontSize: '0.8rem' }}>❤️</span>
                            <span style={{ fontSize: '0.8rem' }}>💬</span>
                            <span style={{ fontSize: '0.8rem' }}>✈️</span>
                          </div>
                          <span style={{ fontSize: '0.8rem' }}>🔖</span>
                        </div>

                        {/* Instagram Caption & Comments Section */}
                        <div style={{ padding: '0 0.8rem 0.8rem 0.8rem', fontSize: '0.7rem', color: '#262626', background: 'white', lineHeight: 1.3 }}>
                          <div><b>{niches[activeNiche].brand.toLowerCase().replace(/\s+/g, '')}</b> {niches[activeNiche].tagline} 💖</div>
                          <div style={{ color: '#8e8e8e', marginTop: '4px', fontWeight: 600, fontSize: '0.65rem' }}>
                            View all comments
                          </div>

                          {/* DM Automation badge */}
                          <div style={{
                            marginTop: '6px',
                            background: 'linear-gradient(135deg, rgba(225, 48, 108, 0.08) 0%, rgba(193, 53, 132, 0.08) 100%)',
                            border: '1px solid rgba(225, 48, 108, 0.15)',
                            padding: '4px 6px',
                            borderRadius: '6px',
                            fontSize: '0.6rem',
                            color: '#C13584',
                            fontWeight: 700
                          }}>
                            Comment WANT to buy instantly via DM! 🤖
                          </div>
                        </div>
                      </div>

                      {/* Instagram Action Button */}
                      <button style={{
                        width: '100%',
                        background: '#0095F6',
                        color: 'white',
                        border: 'none',
                        padding: '8px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}>
                        View Social Shop 🚀
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* MOCKUP B: Merchant Dashboard View */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: t.accentGreen, fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.8rem', display: 'block', textAlign: 'center' }}>
                  💻 MERCHANT DASHBOARD VIEW (NICHE: {activeNiche.toUpperCase()})
                </span>

                <div style={{
                  background: t.cardBg,
                  border: `1px solid ${t.border}`,
                  borderRadius: '24px',
                  padding: '1.8rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifycontent: 'space-between'
                }}>
                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem', marginBottom: '1.2rem', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: t.textPrimary }}>{niches[activeNiche].brand} Panel</h4>
                        <span style={{ fontSize: '0.65rem', color: t.textMuted, fontWeight: 600 }}>ShopFlow Tenant Control Room</span>
                      </div>
                      <span style={{ fontSize: '0.65rem', background: 'rgba(52, 211, 153, 0.1)', color: t.accentGreen, padding: '4px 8px', borderRadius: '6px', fontWeight: 800 }}>
                        Merchant Pro Mode
                      </span>
                    </div>

                    {/* Customized Metrics Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                      {niches[activeNiche].metrics.map((m, idx) => (
                        <div key={idx} style={{ background: '#111827', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                          <span style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block', fontWeight: 700 }}>{m.label}</span>
                          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#F8FAFC', display: 'block', margin: '4px 0' }}>{m.val}</span>
                          <span style={{ fontSize: '0.6rem', color: '#4ADE80', fontWeight: 700 }}>● {m.alert}</span>
                        </div>
                      ))}
                    </div>

                    {/* Active Order with Custom fields inside dashboard */}
                    <div style={{ background: '#1F2937', borderRadius: '12px', padding: '1rem' }}>
                      <span style={{ fontSize: '0.7rem', color: '#38BDF8', display: 'block', fontWeight: 800, marginBottom: '0.6rem' }}>
                        📥 ACTIVE CUSTOMER ORDER
                      </span>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem', marginBottom: '0.6rem', fontSize: '0.75rem', color: '#F8FAFC' }}>
                        <span>Order Ref: <b>#SF-1049</b></span>
                        <span style={{ color: '#4ADE80', fontWeight: 800 }}>Paid & Seeding</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem' }}>
                        {niches[activeNiche].customFields.map((f, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94A3B8' }}>{f.name}:</span>
                            <span style={{ fontWeight: 700, color: '#F8FAFC' }}>{f.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button 
                      onClick={() => scrollToSection(wizardRef)} 
                      style={{
                        background: t.primaryGradient,
                        color: 'white',
                        border: 'none',
                        padding: '0.8rem 1.8rem',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        borderRadius: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      Start Free Trial & Claim Domain 🚀
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </motion.section>

          {/* -- SECTION 4: DYNAMIC DASHBOARD SHOWCASE CAROUSEL -- */}
          <motion.section
            ref={tourSectionRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
            style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 5%', position: 'relative', zIndex: 1 }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-1px', fontFamily: 'var(--font-body)' }}>
              Interactive <span style={{ color: t.primary }}>Dashboard Tour</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: t.textMuted, textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem', fontWeight: 500, lineHeight: 1.6 }}>
              Experience the core engines powering the backend of every ShopFlow SaaS shop.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '0.8fr 1.2fr', gap: '3rem', alignItems: 'center' }}>
              
              {/* Left Column Controls */}
              <div>
                {carouselItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCarouselIndex(idx);
                      setProgress(0);
                    }}
                    style={{
                      background: carouselIndex === idx ? 'rgba(15, 23, 42, 0.02)' : 'transparent',
                      border: carouselIndex === idx ? `1px solid ${t.border}` : '1px solid transparent',
                      padding: '1.2rem',
                      borderRadius: '16px',
                      marginBottom: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Linear Progress Bar overlay */}
                    {carouselIndex === idx && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '3px',
                        background: t.primaryGradient,
                        width: `${progress}%`,
                        transition: 'width 0.04s linear'
                      }} />
                    )}

                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'rgba(15, 23, 42, 0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 2px', fontSize: '1rem', fontWeight: 800, color: carouselIndex === idx ? t.textPrimary : t.textMuted }}>
                        {item.title}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: t.textMuted, display: 'block', lineHeight: 1.4 }}>
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column Visual Display */}
              <div style={{
                background: t.cardBg,
                border: `1px solid ${t.border}`,
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: t.shadowSoft,
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifycontent: 'center'
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={carouselIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '1.2rem' }}>
                      <span style={{ padding: '4px 10px', background: t.primaryLight, color: t.primary, borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>
                        Core Module {carouselIndex + 1}
                      </span>
                      <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: t.textPrimary }}>{carouselItems[carouselIndex].title}</h3>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: t.textMuted, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                      {carouselItems[carouselIndex].subtitle}
                    </p>
                    {carouselItems[carouselIndex].content}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.section>

          {/* -- SECTION 5: SAAS PLATFORM STATISTICS -- */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ background: t.bgLight, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: '5rem 5%', position: 'relative', zIndex: 1 }}
          >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, textAlign: 'center', marginBottom: '4rem', letterSpacing: '-1px', fontFamily: 'var(--font-body)' }}>
                Platform-Wide Scale & <span style={{ color: t.accentGreen }}>Reliability</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '2rem' }}>
                {[
                  { title: "Processed Transactions", val: "$14.8M+", desc: "Aggregated gross sales volume completed natively inside custom checkouts.", color: t.primary },
                  { title: "Active Store Operators", val: "18,400+", desc: "Independent bakers, designers, and artisans using ShopFlow daily.", color: t.accentBlue },
                  { title: "Avg Checkout Completion", val: "98.9%", desc: "Near-flawless buyer session retention due to visual field builders.", color: t.accentGreen },
                  { title: "Average Page Load Speed", val: "< 1.2s", desc: "Edge-optimized delivery nodes for high mobile buyer speed.", color: t.accentPurple }
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.04)',
                      borderRadius: '20px',
                      padding: '2rem 1.5rem',
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: t.textMuted, display: 'block', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                      {stat.title}
                    </span>
                    <span style={{ fontSize: '2.5rem', fontWeight: 950, color: stat.color, display: 'block', marginBottom: '10px' }}>
                      {stat.val}
                    </span>
                    <p style={{ fontSize: '0.8rem', color: t.textMuted, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* -- SECTION 6: INTERACTIVE WHATSAPP BOT CHAT SIMULATOR -- */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 5%', position: 'relative', zIndex: 1 }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-1px', fontFamily: 'var(--font-body)' }}>
              WhatsApp <span style={{ color: t.accentGreen }}>Automation Chat</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: t.textMuted, textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem', fontWeight: 500, lineHeight: 1.6 }}>
              Click on a preset trigger query at the bottom to watch the ShopFlow bot immediately output automated transactional responses.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1.1fr 0.9fr', gap: '3rem', alignItems: 'center' }}>
              
              {/* WhatsApp Interface Mock */}
              <div style={{
                background: '#075E54', // Classic WhatsApp Dark Teal
                borderRadius: '24px',
                padding: '1rem',
                border: '8px solid #374151',
                boxShadow: '0 25px 40px rgba(0,0,0,0.5)',
                maxWidth: '450px',
                width: '100%',
                margin: '0 auto',
                boxSizing: 'border-box'
              }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.accentGreen, display: 'flex', alignItems: 'center', justifycontent: 'center', fontWeight: 800, color: 'white', fontSize: '1rem' }}>
                    S
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 850, color: 'white' }}>ShopFlow Automated Bot</h4>
                    <span style={{ fontSize: '0.65rem', color: '#34D399', fontWeight: 700 }}>● Online & Ready</span>
                  </div>
                </div>

                {/* Chat Message Box */}
                <div style={{ height: '240px', overflowY: 'auto', background: '#0b141a', borderRadius: '12px', padding: '0.8rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                        background: msg.sender === 'bot' ? '#202c33' : '#005c4b',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: msg.sender === 'bot' ? '0px 8px 8px 8px' : '8px 0px 8px 8px',
                        maxWidth: '85%',
                        fontSize: '0.75rem',
                        lineHeight: 1.4
                      }}
                    >
                      <p style={{ margin: 0 }}>{msg.text}</p>
                      <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textAlign: 'right', display: 'block', marginTop: '4px' }}>
                        {msg.time}
                      </span>
                    </div>
                  ))}

                  {isTyping && (
                    <div style={{ alignSelf: 'flex-start', background: '#202c33', color: 'white', padding: '8px 12px', borderRadius: '0px 8px 8px 8px', fontSize: '0.75rem' }}>
                      Typing state...
                    </div>
                  )}
                </div>

                {/* Simulated Input */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ flex: 1, background: '#2a3942', borderRadius: '30px', padding: '8px 16px', fontSize: '0.75rem', color: t.textMuted }}>
                    Message encrypted via Cloud API webhook...
                  </div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#00a884', display: 'flex', alignItems: 'center', justifycontent: 'center', color: 'white' }}>
                    <Send size={14} />
                  </div>
                </div>
              </div>

              {/* Presets Column Selector */}
              <div>
                <span style={{ fontSize: '0.75rem', color: t.accentPurple, fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
                  ⚡ TEST THE AUTOMATION webhook
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem', color: t.textPrimary }}>Click a button below to prompt the bot:</h3>
                <p style={{ color: t.textMuted, fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                  See how the webhook intercepts buyer inquiries and pushes interactive checkout modules natively into WhatsApp.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {[
                    {
                      q: "🎂 Can I see the CakeFlow Bakery catalog link?",
                      a: "Absolutely! Tapping the link below will open our fully customized mobile-first catalog: \n\n👉 shopflow.store/cakeflow \n\nLet me know if you need to custom order!"
                    },
                    {
                      q: "👟 What shoe size selections are currently available?",
                      a: "FastFoot has stock for sizes: US 7, US 8, US 9, US 10, and US 11. Select size directly inside our custom visual checkout."
                    },
                    {
                      q: "📦 Track order CF-1001 status",
                      a: "Order CF-1001 status updated: [Baking 🎂]. Our master pastry chefs are putting on velvet layers. ETA: 2026-05-21!"
                    }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => simulateBotResponse(item.q, item.a)}
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: t.textPrimary,
                        padding: '1rem 1.5rem',
                        borderRadius: '14px',
                        textAlign: 'left',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.border = `1px solid ${t.primary}`}
                      onMouseLeave={(e) => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'}
                    >
                      <span>{item.q}</span>
                      <ChevronRight size={16} color={t.textMuted} />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.section>

          {/* -- SECTION 8: SUPER ADMIN PREVIEW LIVE PORTAL -- */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 5%', position: 'relative', zIndex: 1 }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-1px', fontFamily: 'var(--font-body)' }}>
              Super Admin <span style={{ color: t.accentPurple }}>Control Portal</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: t.textMuted, textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem', fontWeight: 500, lineHeight: 1.6 }}>
              A live preview of the central SaaS platform operator's control panel, showing platform health and billing flows.
            </p>

            <div style={{
              background: '#090D16',
              border: `1px solid ${t.border}`,
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              
              {/* Blur Shield badge overlay */}
              <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(167, 139, 250, 0.1)', border: `1px solid ${t.accentPurple}`, padding: '4px 12px', borderRadius: '20px' }}>
                <Lock size={12} color={t.accentPurple} />
                <span style={{ fontSize: '0.65rem', color: t.accentPurple, fontWeight: 800, textTransform: 'uppercase' }}>Super Admin Gated</span>
              </div>

              {/* Mini Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: t.textMuted, display: 'block', fontWeight: 700 }}>LIVE DOMAIN PING</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: t.accentBlue }}>8,129 Tenants Live</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.65rem', color: t.textMuted, display: 'block', fontWeight: 700 }}>AGGREGATE CPU LOAD</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: t.accentGreen }}>24.2% Operational</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.65rem', color: t.textMuted, display: 'block', fontWeight: 700 }}>DATABASE CLUSTER</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: t.textPrimary }}>Active Shards (3)</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.65rem', color: t.textMuted, display: 'block', fontWeight: 700 }}>MONTHLY SAAS ARPU</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: t.accentOrange }}>$452,190.00 ARR</span>
                </div>
              </div>

              {/* Console log ticker */}
              <div style={{ background: '#030712', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.04)', minHeight: '120px' }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  <Terminal size={14} color={t.textMuted} />
                  <span style={{ fontSize: '0.70rem', color: t.textMuted, fontFamily: 'monospace', fontWeight: 850 }}>console_system_logs ~ active stream</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  <AnimatePresence>
                    {adminEvents.map((ev) => (
                      <motion.div
                        key={ev.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        style={{ color: ev.color }}
                      >
                        {ev.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </motion.section>

          {/* -- SECTION 7: PREMIUM BUSINESS ONBOARDING WIZARD -- */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            ref={wizardRef}
            style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 5% 5rem', position: 'relative', zIndex: 1 }}
          >
            
            <div style={{ background: t.cardBg, padding: isMobile ? '2.5rem 1.5rem' : '4rem 3.5rem', borderRadius: '30px', boxShadow: t.shadowSoft, border: `1px solid ${t.border}`, backdropFilter: 'blur(20px)' }}>
              
              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span style={{ fontSize: '0.80rem', color: t.primary, fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>
                  Free Onboarding Wizard
                </span>
                <h2 style={{ fontSize: isMobile ? '2rem' : '2.8rem', fontWeight: 900, color: t.textPrimary, margin: 0, fontFamily: 'var(--font-body)' }}>
                  Launch Your Custom <span style={{ color: t.primary }}>Store Trial</span>
                </h2>
                <p style={{ fontSize: '0.95rem', color: t.textMuted, marginTop: '8px', maxWidth: '600px', margin: '8px auto 0' }}>
                  Configure your product attributes, styling themes, and cloud database details inside our wizard.
                </p>
              </div>

              {/* Step Indicators */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `2.5px solid rgba(255,255,255,0.05)`, paddingBottom: '2rem', marginBottom: '4rem', overflowX: 'auto', gap: '1rem' }}>
                {[
                  { s: 1, label: "Business Category" },
                  { s: 2, label: "Setup Profile" },
                  { s: 3, label: "Choose Theme" },
                  { s: 4, label: "Select Subscription" }
                ].map(ind => (
                  <div key={ind.s} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', opacity: step === ind.s ? 1 : 0.4, flexShrink: 0 }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: step === ind.s ? t.primaryGradient : 'rgba(255,255,255,0.05)', 
                      color: step === ind.s ? 'white' : t.textMuted,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900
                    }}>
                      {ind.s}
                    </div>
                    <span style={{ fontWeight: 800, color: t.textPrimary, fontSize: '0.9rem' }} className="hide-on-mobile">{ind.label}</span>
                  </div>
                ))}
              </div>

              <AnimatePresence mode='wait'>
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem', color: t.textPrimary }}>What are you selling?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                      {categories.map(cat => (
                        <div 
                          key={cat.name}
                          onClick={() => setFormData({...formData, category: cat.name})}
                          style={{
                            background: formData.category === cat.name ? t.primaryGradient : '#F8FAFC',
                            color: formData.category === cat.name ? 'white' : t.textPrimary,
                            border: formData.category === cat.name ? 'none' : `2px solid rgba(15, 23, 42, 0.08)`,
                            padding: '2.5rem 2rem',
                            borderRadius: '24px',
                            cursor: 'pointer',
                            boxShadow: t.shadowSoft,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{cat.icon}</div>
                          <h3 style={{ margin: '0 0 0.8rem', color: 'inherit', fontWeight: 900 }}>{cat.name}</h3>
                          <p style={{ margin: 0, opacity: 0.8, fontSize: '0.85rem', fontWeight: 600 }}>{cat.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => setStep(2)} 
                        style={{ background: t.primaryGradient, color: 'white', border: 'none', padding: '1rem 2.8rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: t.shadowGlow }}
                      >
                        Continue <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem', color: t.textPrimary }}>Create your business profile</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
                      <div className="form-group">
                        <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.8rem', color: t.textPrimary }}>Business Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. SneakerLab Premium, GoldCraft Boutique" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: `1px solid rgba(15, 23, 42, 0.15)`, background: '#F1F5F9', color: t.textPrimary, fontSize: '1.1rem', outline: 'none', fontWeight: 600, boxSizing: 'border-box' }}
                        />
                        <div style={{ fontSize: '0.85rem', color: t.textMuted, marginTop: '0.6rem', fontWeight: 600 }}>
                          Your storefront will be generated at: <b style={{ color: t.primary }}>{formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'yourname'}.platform.com</b>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                        <div className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.8rem', color: t.textPrimary }}>WhatsApp Business Number</label>
                          <input 
                            type="tel" 
                            placeholder="e.g. +1 555 1234" 
                            value={formData.whatsappNumber}
                            onChange={e => setFormData({...formData, whatsappNumber: e.target.value})}
                            style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: `1px solid rgba(15, 23, 42, 0.15)`, background: '#F1F5F9', color: t.textPrimary, fontSize: '1.1rem', outline: 'none', fontWeight: 600, boxSizing: 'border-box' }}
                          />
                        </div>
                        <div className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.8rem', color: t.textPrimary }}>Instagram Handle</label>
                          <input 
                            type="text" 
                            placeholder="e.g. your_brand_handle" 
                            value={formData.instagramUsername}
                            onChange={e => setFormData({...formData, instagramUsername: e.target.value})}
                            style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: `1px solid rgba(15, 23, 42, 0.15)`, background: '#F1F5F9', color: t.textPrimary, fontSize: '1.1rem', outline: 'none', fontWeight: 600, boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button 
                        onClick={() => setStep(1)} 
                        style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.06)`, padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 800, color: t.textPrimary, cursor: 'pointer' }}
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setStep(3)} 
                        style={{ background: t.primaryGradient, color: 'white', border: 'none', padding: '1rem 2.8rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: t.shadowGlow }}
                      >
                        Continue <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem', color: t.textPrimary }}>Select Storefront Theme</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                      {themes.map(th => (
                        <div 
                          key={th.name}
                          onClick={() => setFormData({...formData, theme: th.name})}
                          style={{
                            background: formData.theme === th.name ? t.primaryGradient : '#F8FAFC',
                            color: formData.theme === th.name ? 'white' : t.textPrimary,
                            border: formData.theme === th.name ? 'none' : `2px solid rgba(15, 23, 42, 0.08)`,
                            padding: '2.5rem 2rem',
                            borderRadius: '24px',
                            cursor: 'pointer',
                            boxShadow: t.shadowSoft,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <h3 style={{ margin: '0 0 0.8rem', color: 'inherit', fontWeight: 900 }}>{th.name}</h3>
                          <p style={{ margin: 0, opacity: 0.8, fontSize: '0.85rem', fontWeight: 600 }}>{th.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button 
                        onClick={() => setStep(2)} 
                        style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.06)`, padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 800, color: t.textPrimary, cursor: 'pointer' }}
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setStep(4)} 
                        style={{ background: t.primaryGradient, color: 'white', border: 'none', padding: '1rem 2.8rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: t.shadowGlow }}
                      >
                        Continue <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem', textAlign: 'center', color: t.textPrimary }}>Choose Subscription Plan</h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                      {subscriptionTiers.map(tier => (
                        <div 
                          key={tier.name}
                          onClick={() => setFormData({...formData, subscription: tier.name})}
                          style={{
                            background: '#111827',
                            border: formData.subscription === tier.name ? `3px solid ${t.primary}` : `1px solid rgba(255,255,255,0.06)`,
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
                            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: t.primaryGradient, color: 'white', padding: '0.4rem 1.2rem', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 900, boxShadow: t.shadowGlow }}>
                              RECOMMENDED
                            </div>
                          )}
                          <h3 style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: '0.8rem', color: '#FFFFFF' }}>{tier.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '2.8rem', fontWeight: 900, color: '#FFFFFF' }}>{tier.price}</span>
                            <span style={{ opacity: 0.8, fontSize: '0.9rem', fontWeight: 700, color: '#94A3B8' }}>{tier.billing}</span>
                          </div>
                          <p style={{ color: '#E2E8F0', fontSize: '0.9rem', marginBottom: '2.5rem', fontWeight: 500, minHeight: '44px', lineHeight: 1.5 }}>{tier.desc}</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: `1.5px solid rgba(255,255,255,0.05)`, paddingTop: '2rem' }}>
                            {tier.features.map((feat, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>
                                <Check size={14} color="#4ADE80" strokeWidth={3} />
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
                        style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.06)`, padding: '1rem 2.5rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 800, color: t.textPrimary, cursor: 'pointer' }}
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleLaunch} 
                        style={{ background: t.primaryGradient, color: 'white', border: 'none', padding: '1.2rem 3.5rem', fontSize: '1.05rem', fontWeight: 900, borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.8rem', boxShadow: t.shadowGlow, cursor: 'pointer' }}
                      >
                        Launch Storefront <Rocket size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.section>

          {/* -- SECTION 10: CUSTOMER TESTIMONIALS -- */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 5%', position: 'relative', zIndex: 1 }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-1px', fontFamily: 'var(--font-body)' }}>
              Trusted by <span style={{ color: t.accentPurple }}>Active Makers</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: t.textMuted, textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem', fontWeight: 500, lineHeight: 1.6 }}>
              Read the stories of brand owners who eliminated manual order tracking.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
              {[
                {
                  quote: "I was losing half my sales in Instagram comments. Now, the comment triggers automatically slide into checkout lists and book baking dates without lifting a finger.",
                  author: "Maria Santos",
                  niche: "🎂 CAKE DECORATOR",
                  biz: "SweetSymphony"
                },
                {
                  quote: "ShopFlow let me build custom shoe sizing options and leather selectors in 10 seconds. My checkout completion rate jumped from 12% to 48% in under two weeks.",
                  author: "Marcus Vance",
                  niche: "👟 SNEAKER CUSTOMIZER",
                  biz: "SoleVault Lab"
                },
                {
                  quote: "The seamless integration with Shiprocket and WhatsApp bot templates is a literal lifesaver. Buyers get automatic tracking codes pushed on dispatch.",
                  author: "Diana Prince",
                  niche: "💍 ACCESSORIES DESIGNER",
                  biz: "RoseGold Boutique"
                }
              ].map((testi, i) => (
                <div
                  key={i}
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                    borderRadius: '20px',
                    padding: '2.5rem 2rem',
                    boxShadow: t.shadowSoft,
                    display: 'flex',
                    flexDirection: 'column',
                    justifycontent: 'space-between'
                  }}
                >
                  <p style={{ fontSize: '0.9rem', color: t.textMuted, fontStyle: 'italic', margin: '0 0 2rem', lineHeight: 1.6 }}>
                    "{testi.quote}"
                  </p>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: t.textPrimary }}>{testi.author}</h5>
                    <span style={{ fontSize: '0.7rem', color: t.primary, fontWeight: 800, textTransform: 'uppercase', display: 'block', marginTop: '4px' }}>
                      {testi.niche} • {testi.biz}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

        </div>
      )}

      {/* -- STEP 5 Loader: Spindling Dynamic Database -- */}
      {step === 5 && (
        <div style={{ position: 'fixed', inset: 0, background: t.bg, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ textAlign: 'center', maxWidth: '500px', padding: '3rem', boxSizing: 'border-box' }}
          >
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 3rem' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                style={{ position: 'absolute', inset: 0, border: `4px solid rgba(255,255,255,0.05)`, borderTop: `4px solid ${t.primary}`, borderRadius: '50%' }}
              />
              <Rocket size={48} color={t.primary} style={{ position: 'absolute', top: '36px', left: '36px' }} />
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: t.textPrimary, marginBottom: '1.2rem', fontFamily: 'var(--font-body)' }}>Spindling Database...</h2>
            <p style={{ color: t.textMuted, fontWeight: 600, opacity: 0.8, marginBottom: '3rem', minHeight: '24px' }}>
              {creationProgress < 25 && "Securing dynamic subdomains..."}
              {creationProgress >= 25 && creationProgress < 50 && "Seeding custom catalogs & images..."}
              {creationProgress >= 50 && creationProgress < 75 && "Connecting WhatsApp Cloud webhooks..."}
              {creationProgress >= 75 && "Compiling tailored dashboards..."}
            </p>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
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
