import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTenant } from '../context/TenantContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, ShieldCheck, Heart, ArrowLeft, Trash2, Shield, Calendar, Clock, CreditCard, Send, Smile, Info, Check, MessageSquare, AlertCircle, RefreshCw, Globe, MessageCircle, Phone, Video, MoreVertical, Camera, User } from 'lucide-react';
import SaaSSandboxBanner from '../components/SaaSSandboxBanner';

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


const TenantStorefront = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { businesses, addOrder, addChatMessage } = useTenant();

  const biz = businesses[businessId] || businesses['cakeflow'];
  const [activeTheme, setActiveTheme] = useState(biz.theme || 'Modern');

  // Store Flow States
  const [storeCart, setStoreCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customFieldValues, setCustomFieldValues] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0 = Catalog, 1 = Cart Details, 2 = Checkout Form, 3 = Payment Simulator, 4 = Success/Tracking
  
  // Checkout Forms
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMethod: 'UPI'
  });
  
  // Tracking
  const [activeOrder, setActiveOrder] = useState(null);
  
  // Live Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');

  // Channel UI modes
  const [activeUiMode, setActiveUiMode] = useState('Webpage'); // 'Webpage' | 'WhatsApp' | 'Instagram'
  
  // WhatsApp States
  const [waChats, setWaChats] = useState([]);
  const [waTyping, setWaTyping] = useState(false);
  const [waChatInput, setWaChatInput] = useState('');
  const [waCheckoutProduct, setWaCheckoutProduct] = useState(null);
  
  // Instagram States
  const [igLikedPosts, setIgLikedPosts] = useState({});
  const [igShowDm, setIgShowDm] = useState(false);
  const [igActiveDmPost, setIgActiveDmPost] = useState(null);
  const [igDmMessages, setIgDmMessages] = useState([]);
  const [igCommentInputs, setIgCommentInputs] = useState({});
  const [igPostComments, setIgPostComments] = useState({});

  useEffect(() => {
    setActiveTheme(biz.theme || 'Modern');
    setStoreCart([]);
    setSelectedProduct(null);
    setCheckoutStep(0);
    setActiveOrder(null);
    setActiveUiMode('Webpage');
    
    // Seed WhatsApp chats from context
    if (biz.chats && biz.chats.length > 0) {
      setWaChats(biz.chats.map((c, idx) => ({
        id: idx,
        sender: c.sender === 'customer' ? 'customer' : 'bot',
        text: c.text,
        timestamp: c.timestamp || '10:30 AM'
      })));
    } else {
      setWaChats([
        { id: 1, sender: 'bot', text: `Welcome to ${biz.name} Shop Bot! Send catalog or order to get started.`, timestamp: '10:00 AM' }
      ]);
    }

    // Seed Instagram comments for each product
    const commentSeed = {};
    biz.products.forEach(p => {
      commentSeed[p.id] = [
        { id: 1, user: '@lucy_art', text: `This is incredibly beautiful! ✨` },
        { id: 2, user: '@sam_walker', text: `Perfect! Ordering this now.` }
      ];
    });
    setIgPostComments(commentSeed);
    setIgLikedPosts({});
    setIgShowDm(false);
    setIgActiveDmPost(null);
    setIgDmMessages([]);
    setIgCommentInputs({});
  }, [businessId, biz]);

  // Sync custom field states when selected product changes
  useEffect(() => {
    if (selectedProduct) {
      const initialFields = {};
      biz.fields.forEach(field => {
        initialFields[field.id] = field.type === 'Dropdown' ? field.options[0] : '';
      });
      setCustomFieldValues(initialFields);
    }
  }, [selectedProduct, biz]);

  // Auto-run payment simulation without manual confirmation
  useEffect(() => {
    if (checkoutStep === 3) {
      const timer = setTimeout(() => {
        simulatePayment();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [checkoutStep]);

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    // Auto-fill missing required fields instead of alerting!
    let finalFields = { ...customFieldValues };
    biz.fields.forEach(f => {
      if (f.required && !finalFields[f.id]) {
        finalFields[f.id] = f.options ? f.options[0] : (f.placeholder || "Standard Value");
      }
    });

    const newItem = {
      id: Date.now(),
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      customFields: finalFields,
      quantity: 1
    };

    setStoreCart(prev => [...prev, newItem]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setStoreCart(prev => prev.filter(i => i.id !== itemId));
  };

  const cartSubtotal = storeCart.reduce((sum, item) => {
    return sum + (parseFloat(item.price.replace('$', '')) * item.quantity);
  }, 0);

  const handlePlaceOrder = () => {
    // Auto-fill empty fields instead of alerting
    const finalForm = {
      name: checkoutForm.name || "Rahul Dev",
      email: checkoutForm.email || "rahul@example.com",
      address: checkoutForm.address || "123 Sweet Lane, Jaipur, Rajasthan",
      phone: checkoutForm.phone || "+91 98765 43210",
      paymentMethod: checkoutForm.paymentMethod
    };
    setCheckoutForm(finalForm);
    setCheckoutStep(3); // Payment gateway simulation loader
  };

  const simulatePayment = (forcedForm) => {
    const activeForm = forcedForm || checkoutForm;
    const finalForm = {
      name: activeForm.name || "Rahul Dev",
      email: activeForm.email || "rahul@example.com",
      address: activeForm.address || "123 Sweet Lane, Jaipur, Rajasthan",
      phone: activeForm.phone || "+91 98765 43210",
      paymentMethod: activeForm.paymentMethod
    };

    const orderData = {
      customer: finalForm.name,
      email: finalForm.email,
      amount: `$${cartSubtotal.toFixed(2)}`,
      customFields: storeCart[0]?.customFields || {},
      items: storeCart.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
      phone: finalForm.phone,
      address: finalForm.address,
      paymentMethod: finalForm.paymentMethod
    };
    
    const newOrderId = addOrder(biz.id, orderData);
    const generatedOrder = {
      id: newOrderId,
      date: "Today",
      status: "Paid",
      amount: `$${cartSubtotal.toFixed(2)}`,
      customer: finalForm.name,
      items: orderData.items,
      customFields: orderData.customFields
    };

    setActiveOrder(generatedOrder);
    setStoreCart([]);
    setCheckoutStep(4); // Success tracking page
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    addChatMessage(biz.id, { sender: 'customer', text: chatInput });
    setChatInput('');
  };

  // --- WhatsApp Simulator Helpers ---
  const handleWaSend = (textToSend) => {
    const msgText = textToSend || waChatInput;
    if (!msgText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'customer',
      text: msgText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setWaChats(prev => [...prev, newMsg]);
    if (!textToSend) setWaChatInput('');

    // Trigger WhatsApp Bot response
    setWaTyping(true);
    setTimeout(() => {
      setWaTyping(false);
      
      let botResponse = "";
      const txt = msgText.toLowerCase();
      
      let isCatalog = false;
      if (txt.includes('catalog') || txt.includes('shop') || txt.includes('menu') || txt.includes('see') || txt.includes('buy')) {
        botResponse = `Here is our live ShopFlow interactive catalog! Tap an item below to purchase directly in chat:`;
        isCatalog = true;
      } else if (txt.includes('delivery') || txt.includes('ship')) {
        botResponse = `We ship orders lightning-fast via *${biz.deliveryProvider}*! Custom orders usually ship in 1-2 days.`;
      } else if (txt.includes('custom') || txt.includes('option')) {
        botResponse = `Absolutely! You can choose custom sizes, weight, and messages during chat checkout.`;
      } else if (txt.includes('hello') || txt.includes('hi') || txt.includes('hey')) {
        botResponse = `Hello there! I am the automated virtual assistant for *${biz.name}*. \n\nHow can I help you today? \n• Reply *catalog* to browse items\n• Reply *delivery* to learn about transit codes`;
      } else {
        botResponse = `Thanks for writing! I've logged your request: "${msgText}". \n\nYou can type *catalog* to browse our latest collection, or tap one of our quick reply buttons below.`;
      }

      setWaChats(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isCatalog
      }]);
    }, 1000);
  };

  const handleWaCheckoutSubmit = (e) => {
    e.preventDefault();
    
    // Auto-fill empty fields instead of alerting
    const finalForm = {
      name: checkoutForm.name || "Rahul Dev",
      email: checkoutForm.email || "rahul@example.com",
      address: checkoutForm.address || "123 Sweet Lane, Jaipur, Rajasthan",
      phone: checkoutForm.phone || "+91 98765 43210",
      paymentMethod: checkoutForm.paymentMethod
    };
    setCheckoutForm(finalForm);

    const finalFields = { ...customFieldValues };
    biz.fields.forEach(f => {
      if (!finalFields[f.id]) {
        finalFields[f.id] = f.options ? f.options[0] : (f.placeholder || "Standard Option");
      }
    });
    setCustomFieldValues(finalFields);

    // Simulate order
    const orderData = {
      customer: finalForm.name,
      email: finalForm.email || `${finalForm.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      amount: waCheckoutProduct.price,
      customFields: finalFields,
      items: [{ name: waCheckoutProduct.name, price: waCheckoutProduct.price, quantity: 1 }],
      phone: finalForm.phone,
      address: finalForm.address,
      paymentMethod: finalForm.paymentMethod
    };

    const newOrderId = addOrder(biz.id, orderData);

    setWaChats(prev => [
      ...prev,
      {
        id: Date.now() + 3,
        sender: 'bot',
        text: `🎉 *ORDER SECURED SUCCESSFULLY!* \n\n*Invoice ID:* #${newOrderId}\n*Customer:* ${finalForm.name}\n*Item ordered:* ${waCheckoutProduct.name}\n*Total:* ${waCheckoutProduct.price}\n\n📍 *Delivery Address:* _${finalForm.address}_\n🚚 *Carrier Partner:* ${biz.deliveryProvider}\n\nThank you! We've dispatched your order details. You'll receive real-time shipping tracking alerts via this channel!`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    setWaCheckoutProduct(null);
  };

  // --- Instagram Simulator Helpers ---
  const handleIgLike = (productId) => {
    setIgLikedPosts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleIgCommentSubmit = (productId) => {
    const cText = igCommentInputs[productId];
    if (!cText || !cText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: '@you',
      text: cText
    };

    setIgPostComments(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newComment]
    }));

    setIgCommentInputs(prev => ({ ...prev, [productId]: '' }));

    // Trigger Social Commerce DM Reply
    const product = biz.products.find(p => p.id === productId);
    setTimeout(() => {
      setIgActiveDmPost(product);
      setIgDmMessages([
        {
          id: 1,
          sender: 'business',
          text: `👋 Hey! Thank you for commenting on our post about the beautiful *${product.name}*!`,
          timestamp: 'Just now'
        },
        {
          id: 2,
          sender: 'business',
          text: `We've generated an automated social purchase link just for you. Tap below to choose sizes/flavors and order instantly! 👇`,
          timestamp: 'Just now',
          isCheckoutLink: true
        }
      ]);
      setIgShowDm(true);
    }, 1000);
  };

  const handleIgDmCheckoutSubmit = (e) => {
    e.preventDefault();
    
    // Auto-fill empty fields instead of alerting
    const finalForm = {
      name: checkoutForm.name || "Rahul Dev",
      email: checkoutForm.email || "rahul@example.com",
      address: checkoutForm.address || "123 Sweet Lane, Jaipur, Rajasthan",
      phone: checkoutForm.phone || "+91 98765 43210",
      paymentMethod: checkoutForm.paymentMethod
    };
    setCheckoutForm(finalForm);

    const finalFields = { ...customFieldValues };
    biz.fields.forEach(f => {
      if (!finalFields[f.id]) {
        finalFields[f.id] = f.options ? f.options[0] : (f.placeholder || "Standard Option");
      }
    });
    setCustomFieldValues(finalFields);

    const orderData = {
      customer: finalForm.name,
      email: finalForm.email || `${finalForm.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      amount: igActiveDmPost.price,
      customFields: finalFields,
      items: [{ name: igActiveDmPost.name, price: igActiveDmPost.price, quantity: 1 }],
      phone: finalForm.phone,
      address: finalForm.address,
      paymentMethod: finalForm.paymentMethod
    };

    const newOrderId = addOrder(biz.id, orderData);

    setIgDmMessages(prev => [
      ...prev,
      {
        id: Date.now() + 4,
        sender: 'business',
        text: `✅ *Social Order Placed!* \n\n*Invoice:* #${newOrderId}\n*Item:* ${igActiveDmPost.name}\n*Total:* ${igActiveDmPost.price}\n\nYour courier transit code has been generated. Thank you for buying through Instagram DMs! 🚀`,
        timestamp: 'Just now'
      }
    ]);

    setIgActiveDmPost(null);
  };

  // Dynamic Styles Mapping based on Active Theme
  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'Minimal':
        return {
          bg: '#FFFFFF',
          text: '#000000',
          accent: '#000000',
          cardBg: '#FAFAFA',
          font: 'sans-serif',
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
          font: 'Georgia, serif',
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
          accent: '#FF2A54',
          cardBg: '#1E1E1E',
          font: 'sans-serif',
          radius: '16px',
          shadow: '0 10px 30px rgba(255, 42, 84, 0.1)',
          gradient: 'linear-gradient(135deg, #FF2A54 0%, #FF6B8B 100%)',
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
          font: 'sans-serif',
          radius: '8px',
          shadow: '0 4px 12px rgba(0,0,0,0.05)',
          gradient: 'linear-gradient(135deg, #E1306C 0%, #C13584 100%)',
          borderColor: '#DBDBDB',
          mutedText: '#8E8E8E',
          dividerColor: '#DBDBDB'
        };
      default: // Modern
        // Make Modern theme dynamic based on business category!
        if (biz.category === 'Shoes') {
          return {
            bg: '#F0F9FF', // Soft Sky Blue background
            text: '#0F172A', // Slate 900
            accent: '#0284C7', // Sky Blue 600
            cardBg: '#FFFFFF',
            font: 'sans-serif',
            radius: '16px',
            shadow: '0 10px 25px rgba(2, 132, 199, 0.06)',
            gradient: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
            borderColor: 'rgba(2, 132, 199, 0.1)',
            mutedText: '#475569',
            dividerColor: '#E0F2FE'
          };
        } else if (biz.category === 'Clothing') {
          return {
            bg: '#FAFAF9', // Warm stone-50
            text: '#1C1917', // Stone 900
            accent: '#4F46E5', // Indigo 600
            cardBg: '#FFFFFF',
            font: 'sans-serif',
            radius: '12px',
            shadow: '0 10px 25px rgba(79, 70, 229, 0.05)',
            gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
            borderColor: 'rgba(79, 70, 229, 0.1)',
            mutedText: '#57534E',
            dividerColor: '#F5F5F4'
          };
        } else {
          // Default Cake (Bakery) pastel modern theme
          return {
            bg: 'var(--color-cream)',
            text: 'var(--color-brown-dark)',
            accent: 'var(--color-pink)',
            cardBg: 'var(--color-white)',
            font: 'var(--font-body)',
            radius: 'var(--radius-lg)',
            shadow: 'var(--shadow-soft)',
            gradient: 'var(--gradient-pink)',
            borderColor: 'rgba(122, 78, 58, 0.1)',
            mutedText: 'var(--color-brown)',
            dividerColor: 'var(--color-cream)'
          };
        }
    }
  };

  const s = getThemeStyles();

  return (
    <div style={{ background: '#F1F5F9', minHeight: '100vh', paddingTop: '80px', paddingBottom: '100px', fontFamily: s.font, paddingLeft: '4%', paddingRight: '4%' }}>
      <style>{`
        @media (max-width: 900px) {
          .storefront-simulator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      
      <SaaSSandboxBanner />

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: '350px 1fr', 
        gap: '2.5rem',
        alignItems: 'start',
        marginTop: '2rem'
      }} className="storefront-simulator-grid">
        
        {/* Left Column: Glassmorphic Controls Sidebar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          padding: '2rem 1.8rem',
          boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.8rem',
          position: 'sticky',
          top: '100px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.3px' }}>🕹️ SIMULATOR HUB</h2>
            <p style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, margin: 0 }}>Select niche demos, toggle themes, and test UIs live.</p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.06)', margin: 0 }} />

          {/* 1. Category Switcher */}
          <div>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', margin: '0 0 10px 0', letterSpacing: '0.3px' }}>BUSINESS DEMO:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { id: 'cakeflow', label: '🎂 CakeFlow Bakery', cat: 'Cake', desc: 'Bespoke bakeries' },
                { id: 'fastfoot', label: '👟 FastFoot Sneakers', cat: 'Shoes', desc: 'Custom sneaker orders' },
                { id: 'threads-co', label: '👕 Threads & Co. Apparel', cat: 'Clothing', desc: 'Luxury monogrammed apparel' }
              ].map(item => {
                const isActive = biz.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(`/store/${item.id}`);
                    }}
                    style={{
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      background: isActive ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' : '#F8FAFC',
                      color: isActive ? '#FFFFFF' : '#334155',
                      border: isActive ? 'none' : '1px solid rgba(0,0,0,0.05)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 8px 16px rgba(15,23,42,0.15)' : 'none'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.8rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.65rem', opacity: isActive ? 0.8 : 0.6, marginTop: '2px', fontWeight: 500 }}>{item.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.06)', margin: 0 }} />

          {/* 2. Theme Selection */}
          <div>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', margin: '0 0 10px 0', letterSpacing: '0.3px' }}>SELECT THEME LIVE:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
              {['Modern', 'Minimal', 'Luxury', 'Dark', 'Instagram-first'].map(themeName => {
                const isActive = activeTheme === themeName;
                return (
                  <button
                    key={themeName}
                    onClick={() => setActiveTheme(themeName)}
                    style={{
                      padding: '0.5rem 0.6rem',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      background: isActive ? 'linear-gradient(135deg, #FF6B8B 0%, #FF2A54 100%)' : '#F8FAFC',
                      color: isActive ? '#FFFFFF' : '#475569',
                      border: isActive ? 'none' : '1px solid rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      gridColumn: themeName === 'Instagram-first' ? 'span 2' : 'auto',
                      textAlign: 'center'
                    }}
                  >
                    {themeName}
                  </button>
                );
              })}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.06)', margin: 0 }} />

          {/* 3. Channels Tab */}
          <div>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', margin: '0 0 10px 0', letterSpacing: '0.3px' }}>SELECT INTERFACE LIVE:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { mode: 'Webpage', label: 'Webpage Storefront', desc: 'Interactive catalog browser checkout', icon: Globe },
                { mode: 'WhatsApp', label: 'WhatsApp Bot Chat', desc: 'Simulated interactive chat catalog', icon: MessageSquare },
                { mode: 'Instagram', label: 'Instagram DM & Feed', desc: 'Auto-DM replies & secure purchase', icon: Instagram }
              ].map(({ mode, label, desc, icon: Icon }) => {
                const isActive = activeUiMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setActiveUiMode(mode)}
                    style={{
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      background: isActive ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' : '#F8FAFC',
                      color: isActive ? '#FFFFFF' : '#475569',
                      border: isActive ? 'none' : '1px solid rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                  >
                    <Icon size={18} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.75rem' }}>{label}</div>
                      <div style={{ fontSize: '0.6rem', opacity: isActive ? 0.9 : 0.6, marginTop: '1px', fontWeight: 500 }}>{desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.06)', margin: 0 }} />

          {/* SaaS shortcuts */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => navigate('/admin')}
              style={{
                flex: 1,
                padding: '0.6rem 0.5rem',
                borderRadius: '8px',
                background: '#F1F5F9',
                color: '#475569',
                border: 'none',
                fontSize: '0.7rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Go to Admin ⚙️
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                flex: 1,
                padding: '0.6rem 0.5rem',
                borderRadius: '8px',
                background: '#F1F5F9',
                color: '#475569',
                border: 'none',
                fontSize: '0.7rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Platform Home 🌐
            </button>
          </div>
        </div>

        {/* Right Column: Phone Mockup Wrapper */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          
          {/* Gorgeous Horizontal Theme & Interface Switcher Hub */}
          <div style={{
            width: '100%',
            maxWidth: '520px',
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '1.2rem 1.6rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxSizing: 'border-box'
          }}>
            {/* Theme Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: s.accent, letterSpacing: '0.5px' }}>SELECT THEME LIVE:</span>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {['Modern', 'Minimal', 'Luxury', 'Dark', 'Instagram-first'].map(themeName => {
                  const isActive = activeTheme === themeName;
                  return (
                    <button
                      key={themeName}
                      onClick={() => setActiveTheme(themeName)}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        background: isActive ? s.gradient || s.accent : '#F1F5F9',
                        color: isActive ? '#FFFFFF' : '#374151',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {themeName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)' }} />

            {/* Interface Channel Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: s.accent, letterSpacing: '0.5px' }}>SELECT INTERFACE LIVE:</span>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
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
                        padding: '0.4rem 0.9rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: isActive ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' : '#F1F5F9',
                        color: isActive ? '#FFFFFF' : '#374151',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Icon size={13} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Simulated Browser URL bar */}
          <div style={{ 
            width: '100%', 
            maxWidth: '520px', 
            background: '#1F2937', 
            color: '#9CA3AF', 
            borderRadius: '16px', 
            padding: '0.6rem 1.2rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
            marginBottom: '1rem',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#E5E7EB', letterSpacing: '0.5px' }}>
              🔒 https://{biz.id}.shopflow.io/{activeUiMode.toLowerCase()}
            </span>
            <span style={{ fontSize: '0.65rem', background: '#374151', color: '#F9FAFB', padding: '2px 8px', borderRadius: '20px', fontWeight: 800 }}>
              {biz.category.toUpperCase()}
            </span>
          </div>

          {/* Main Simulated Store Container */}
          <div style={{ 
            width: '100%',
            maxWidth: '520px', 
            background: s.bg, 
            color: s.text, 
            minHeight: '80vh', 
            borderRadius: s.radius, 
            boxShadow: s.shadow, 
            overflow: 'hidden', 
            position: 'relative',
            border: activeTheme === 'Minimal' ? '2px solid black' : 'none',
            display: 'flex',
            flexDirection: 'column'
          }}>

        
        {/* ==================== WEBPAGE UI MODE ==================== */}
        {activeUiMode === 'Webpage' && (
          <>
            {/* Header Storefront */}
            <header style={{ 
              padding: '2rem 1.5rem', 
              borderBottom: activeTheme === 'Minimal' ? '2px solid black' : '1px solid ' + s.dividerColor,
              background: s.cardBg,
              textAlign: activeTheme === 'Instagram-first' ? 'left' : 'center',
              position: 'relative'
            }}>
              {checkoutStep > 0 && (
                <button 
                  onClick={() => setCheckoutStep(prev => prev === 4 ? 0 : prev - 1)}
                  style={{ position: 'absolute', left: '1.5rem', top: '2.5rem', color: s.text, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <ArrowLeft size={22} />
                </button>
              )}

              {activeTheme === 'Instagram-first' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: s.gradient, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.8rem', color: s.text }}>
                        {biz.name[0]}
                      </div>
                    </div>
                    <div>
                      <h1 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 900 }}>{biz.name.replace(/\s+/g, '').toLowerCase()}</h1>
                      <span style={{ fontSize: '0.85rem', color: '#8e8e8e', fontWeight: 600 }}>Social Commerce Partner</span>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: 700 }}>
                        <span><b>{biz.products.length}</b> products</span>
                        <span><b>5.2k</b> followers</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{biz.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#262626', opacity: 0.9, lineHeight: 1.4 }}>
                      ✨ Official mobile storefront catalog <br />
                      🚀 Fast express shipping synced via {biz.deliveryProvider} <br />
                      💬 24/7 automated support bot integrated.
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button onClick={() => setIsCartOpen(true)} style={{ flex: 1, background: '#dbdbdb', color: 'black', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 800, border: 'none', cursor: 'pointer' }}>View Cart ({storeCart.length})</button>
                      <button onClick={() => setIsChatOpen(true)} style={{ background: '#dbdbdb', color: 'black', padding: '0.4rem 0.8rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}><MessageSquare size={16} /></button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 style={{ 
                    fontSize: activeTheme === 'Luxury' ? '2.4rem' : '1.8rem', 
                    margin: '0 0 0.5rem', 
                    fontWeight: 900,
                    fontFamily: activeTheme === 'Luxury' ? 'Georgia, serif' : 'inherit'
                  }}>
                    {biz.name}
                  </h1>
                  <p style={{ margin: 0, opacity: 0.6, fontSize: '0.85rem', fontWeight: 700 }}>
                    {biz.category} Boutique Social Catalog
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
                    <button onClick={() => setIsCartOpen(true)} style={{ color: s.accent, fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <ShoppingBag size={18} /> Cart ({storeCart.length})
                    </button>
                    <button onClick={() => setIsChatOpen(true)} style={{ color: s.text, opacity: 0.7, fontWeight: 800, fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                      Chat Support
                    </button>
                  </div>
                </div>
              )}
            </header>

            {/* Dynamic Pages renderer */}
            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
              
              {/* STEP 0: CATALOG PAGE */}
              {checkoutStep === 0 && (
                <AnimatePresence>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {biz.products.map(prod => (
                      <motion.div 
                        key={prod.id}
                        whileHover={{ y: -3 }}
                        onClick={() => setSelectedProduct(prod)}
                        style={{
                          background: s.cardBg,
                          borderRadius: s.radius,
                          overflow: 'hidden',
                          boxShadow: s.shadow,
                          border: activeTheme === 'Minimal' ? '2px solid black' : '1px solid ' + s.dividerColor,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div style={{ overflow: 'hidden', aspectRatio: '1/1', position: 'relative' }}>
                          <img src={prod.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={prod.name} />
                          <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 900, color: s.text }}>
                            {prod.price}
                          </div>
                        </div>
                        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
                          <h3 style={{ margin: '0 0 0.4rem', fontSize: '0.95rem', fontWeight: 900 }}>{prod.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFD700', fontSize: '0.8rem', fontWeight: 800 }}>
                            <Star size={12} fill="#FFD700" /> {prod.rating || 4.8}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}

              {/* STEP 2: CHECKOUT SHIPPING INFO FORM */}
              {checkoutStep === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1.5rem', textAlign: 'center' }}>Delivery & Checkout</h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: s.cardBg, padding: '2rem 1.5rem', borderRadius: s.radius, border: activeTheme === 'Minimal' ? '2px solid black' : 'none', boxShadow: s.shadow }}>
                    
                    <div className="form-group">
                      <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.4rem' }}>FULL NAME</label>
                      <input 
                        type="text" 
                        placeholder="Alice Green" 
                        value={checkoutForm.name}
                        onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: `1px solid ${s.borderColor}`, background: s.cardBg, color: s.text, fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.4rem' }}>EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        placeholder="alice@example.com" 
                        value={checkoutForm.email}
                        onChange={e => setCheckoutForm({...checkoutForm, email: e.target.value})}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: `1px solid ${s.borderColor}`, background: s.cardBg, color: s.text, fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.4rem' }}>PHONE NUMBER (FOR WHATSAPP NOTIF)</label>
                      <input 
                        type="tel" 
                        placeholder="+1 555 1234" 
                        value={checkoutForm.phone}
                        onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: `1px solid ${s.borderColor}`, background: s.cardBg, color: s.text, fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.4rem' }}>SHIPPING ADDRESS</label>
                      <textarea 
                        placeholder="123 Sweet Lane, City, State" 
                        value={checkoutForm.address}
                        onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: `1px solid ${s.borderColor}`, background: s.cardBg, color: s.text, fontSize: '0.95rem', outline: 'none', height: '80px', fontFamily: 'inherit' }}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.6rem' }}>SELECT PAYMENT METHOD</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                        {['UPI', 'Razorpay', 'Stripe', 'COD'].map(method => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setCheckoutForm({...checkoutForm, paymentMethod: method})}
                            style={{
                              padding: '0.6rem',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              fontWeight: 800,
                              border: checkoutForm.paymentMethod === method ? `2px solid ${s.accent}` : `1px solid ${s.borderColor}`,
                              background: checkoutForm.paymentMethod === method ? `${s.accent}10` : 'transparent',
                              color: s.text,
                              cursor: 'pointer'
                            }}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={handlePlaceOrder}
                      style={{
                        background: s.gradient,
                        color: 'white',
                        padding: '1rem',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 900,
                        fontSize: '1rem',
                        width: '100%',
                        cursor: 'pointer',
                        boxShadow: s.shadow,
                        marginTop: '1rem'
                      }}
                    >
                      Pay ${(cartSubtotal).toFixed(2)}
                    </button>

                  </div>
                </motion.div>
              )}

              {/* STEP 3: HIGH FIDELITY PAYMENT GATEWAY SIMULATION */}
              {checkoutStep === 3 && (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    style={{ width: '60px', height: '60px', border: `4px solid ${s.accent}20`, borderTop: `4px solid ${s.accent}`, borderRadius: '50%', margin: '0 auto 2.5rem' }}
                  />
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Simulating {checkoutForm.paymentMethod} Gateway</h2>
                  <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                    Executing automated transactional checkouts and triggering server webhooks to secure orders...
                  </p>
                  
                  <button 
                    onClick={simulatePayment}
                    style={{ background: s.gradient, color: 'white', padding: '0.8rem 2rem', border: 'none', borderRadius: '25px', fontWeight: 900, cursor: 'pointer' }}
                  >
                    Confirm Payment Hook
                  </button>
                </div>
              )}

              {/* STEP 4: TRACKING PAGE */}
              {checkoutStep === 4 && activeOrder && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 5px 15px rgba(76, 175, 80, 0.3)' }}>
                      <Check size={28} strokeWidth={3} />
                    </div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Payment Confirmed!</h2>
                    <p style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '0.3rem' }}>Invoice: #{activeOrder.id} • Method: {checkoutForm.paymentMethod}</p>
                  </div>

                  {/* Order Status Progress Bar */}
                  <div className="card" style={{ background: s.cardBg, padding: '2rem 1.5rem', borderRadius: s.radius, border: activeTheme === 'Minimal' ? '2px solid black' : '1px solid ' + s.dividerColor, boxShadow: s.shadow, marginBottom: '2rem' }}>
                    <h4 style={{ margin: '0 0 1.5rem', fontSize: '0.95rem', fontWeight: 800 }}>LIVE TRACKING</h4>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '2rem' }}>
                      {/* Background progress bar */}
                      <div style={{ position: 'absolute', top: '12px', left: '5%', right: '5%', height: '4px', background: '#e0e0e0', zIndex: 1 }} />
                      <div style={{ position: 'absolute', top: '12px', left: '5%', width: '45%', height: '4px', background: s.accent, zIndex: 2 }} />

                      {[
                        { label: "Placed", active: true },
                        { label: biz.category === 'Cake' ? "Baking" : biz.category === 'Shoes' ? "Packing" : biz.category === 'Clothing' ? "Tailoring" : "Preparing", active: true },
                        { label: "Shipped", active: false },
                        { label: "Delivered", active: false }
                      ].map((prog, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
                          <div style={{ 
                            width: '24px', 
                            height: '24px', 
                            borderRadius: '50%', 
                            background: prog.active ? s.gradient : '#e0e0e0', 
                            border: '3px solid white', 
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                          }} />
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, marginTop: '0.5rem', color: prog.active ? s.text : '#9e9e9e' }}>{prog.label}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid ' + s.dividerColor, paddingTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <AlertCircle size={18} color={s.accent} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.4 }}>
                        Your order details have been synchronized. WhatsApp receipts were simulated to: <b>{checkoutForm.email}</b>.
                      </span>
                    </div>
                  </div>

                  {/* Delivery Details card */}
                  <div className="card" style={{ background: s.cardBg, padding: '2rem 1.5rem', borderRadius: s.radius, border: activeTheme === 'Minimal' ? '2px solid black' : '1px solid ' + s.dividerColor, boxShadow: s.shadow }}>
                    <h4 style={{ margin: '0 0 1.2rem', fontSize: '0.95rem', fontWeight: 800 }}>COURIER ENGINE</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, opacity: 0.8, marginBottom: '0.8rem' }}>
                      <span>Partner:</span>
                      <span style={{ color: s.accent }}>{biz.deliveryProvider}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, opacity: 0.8 }}>
                      <span>Transit Code:</span>
                      <span>{biz.id.toUpperCase()}-{(Math.random() * 10000).toFixed(0)}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => setCheckoutStep(0)} style={{ background: s.gradient, color: 'white', padding: '0.8rem 2.5rem', border: 'none', borderRadius: '20px', fontWeight: 900, cursor: 'pointer' }}>
                      Return to Store
                    </button>
                  </div>

                </motion.div>
              )}

            </div>

            {/* CUSTOM PRODUCT ADD PANEL */}
            <AnimatePresence>
              {selectedProduct && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProduct(null)}
                    style={{ position: 'absolute', inset: 0, background: 'black', zIndex: 1500 }}
                  />
                  <motion.div 
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      maxHeight: '85%',
                      background: s.cardBg,
                      borderTopLeftRadius: '25px',
                      borderTopRightRadius: '25px',
                      boxShadow: '0 -15px 40px rgba(0,0,0,0.15)',
                      zIndex: 1600,
                      padding: '2rem 1.5rem',
                      overflowY: 'auto',
                      border: activeTheme === 'Minimal' ? '2px solid black' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                      <img src={selectedProduct.image} style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }} alt={selectedProduct.name} />
                      <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 900, margin: '0 0 0.4rem' }}>{selectedProduct.name}</h2>
                        <span style={{ fontSize: '1.4rem', fontWeight: 900, color: s.accent }}>{selectedProduct.price}</span>
                      </div>
                    </div>

                    {/* DYNAMIC FORMS INTEGRATOR */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 900, color: s.accent, letterSpacing: '1px' }}>CUSTOM OPTIONS</h4>
                      
                      {biz.fields.map(field => (
                        <div key={field.id} className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                            {field.name} {field.required && <span style={{ color: 'red' }}>*</span>}
                          </label>
                          
                          {field.type === 'Dropdown' && (
                            <select 
                              value={customFieldValues[field.id] || ''}
                              onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                              style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid ' + s.borderColor, fontSize: '0.95rem', background: s.cardBg, color: s.text, outline: 'none' }}
                            >
                              {field.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          )}

                          {field.type === 'Text' && (
                            <input 
                              type="text" 
                              placeholder={field.placeholder || "Enter details..."}
                              value={customFieldValues[field.id] || ''}
                              onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                              style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid ' + s.borderColor, fontSize: '0.95rem', background: s.cardBg, color: s.text, outline: 'none' }}
                            />
                          )}

                          {field.type === 'Date picker' && (
                            <input 
                              type="date" 
                              value={customFieldValues[field.id] || ''}
                              onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                              style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid ' + s.borderColor, fontSize: '0.95rem', background: s.cardBg, color: s.text, outline: 'none' }}
                            />
                          )}

                          {field.type === 'Upload' && (
                            <div style={{ border: '2px dashed ' + s.borderColor, padding: '1rem', borderRadius: '10px', textAlign: 'center', background: s.cardBg, color: s.text }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.6 }}>📷 Simulated Image Attachment Active</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => setSelectedProduct(null)} className="btn-secondary" style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.15)', cursor: 'pointer' }}>Cancel</button>
                      <button 
                        onClick={handleAddToCart}
                        style={{
                          background: s.gradient,
                          color: 'white',
                          padding: '0.8rem',
                          borderRadius: '12px',
                          border: 'none',
                          fontWeight: 900,
                          flex: 1.5,
                          cursor: 'pointer'
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>

                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* CUSTOMER CART DRAWER */}
            <AnimatePresence>
              {isCartOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsCartOpen(false)}
                    style={{ position: 'absolute', inset: 0, background: 'black', zIndex: 1500 }}
                  />
                  <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      width: '85%',
                      background: s.cardBg,
                      boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                      zIndex: 1600,
                      padding: '2rem 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      borderLeft: activeTheme === 'Minimal' ? '2px solid black' : 'none'
                    }}
                  >
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Shopping Cart</span>
                      <button onClick={() => setIsCartOpen(false)} style={{ color: s.text, background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                    </h2>

                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {storeCart.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.5, fontWeight: 700 }}>Your cart is empty.</div>
                      ) : (
                        storeCart.map(item => (
                          <div key={item.id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid ' + s.dividerColor, paddingBottom: '1rem' }}>
                            <img src={item.image} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} alt={item.name} />
                            <div style={{ flex: 1 }}>
                              <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>{item.name}</h4>
                              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: s.accent }}>{item.price}</span>
                              
                              {/* Selected Custom Variables Details */}
                              <div style={{ marginTop: '4px', fontSize: '0.75rem', opacity: 0.7, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {Object.entries(item.customFields).map(([k, v]) => (
                                  <div key={k}><b>{k}:</b> {v || 'N/A'}</div>
                                ))}
                              </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} style={{ color: '#F44336', background: 'none', border: 'none', cursor: 'pointer' }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {storeCart.length > 0 && (
                      <div style={{ borderTop: '2px solid ' + s.dividerColor, paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                          <span>Subtotal:</span>
                          <span>${cartSubtotal.toFixed(2)}</span>
                        </div>
                        <button 
                          onClick={() => {
                            setIsCartOpen(false);
                            setCheckoutStep(2);
                          }}
                          style={{
                            background: s.gradient,
                            color: 'white',
                            padding: '1rem',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 900,
                            width: '100%',
                            cursor: 'pointer'
                          }}
                        >
                          Checkout Now
                        </button>
                      </div>
                    )}

                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* INTEGRATED CUSTOMER LIVE CHAT DRAWER */}
            <AnimatePresence>
              {isChatOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsChatOpen(false)}
                    style={{ position: 'absolute', inset: 0, background: 'black', zIndex: 1700 }}
                  />
                  <motion.div 
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '75%',
                      background: s.cardBg,
                      borderTopLeftRadius: '25px',
                      borderTopRightRadius: '25px',
                      boxShadow: '0 -10px 30px rgba(0,0,0,0.1)',
                      zIndex: 1800,
                      padding: '2rem 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      border: activeTheme === 'Minimal' ? '2px solid black' : 'none'
                    }}
                  >
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: '0 0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Support Chat - {biz.name}</span>
                      <button onClick={() => setIsChatOpen(false)} style={{ color: s.text, background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                    </h3>

                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                      {biz.chats.map(chat => (
                        <div 
                          key={chat.id} 
                          style={{ 
                            alignSelf: chat.sender === 'customer' ? 'flex-end' : 'flex-start',
                            background: chat.sender === 'customer' ? s.accent : '#F5F5F5',
                            color: chat.sender === 'customer' ? 'white' : '#263238',
                            padding: '0.6rem 1rem',
                            borderRadius: '12px',
                            maxWidth: '80%',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            lineHeight: 1.4
                          }}
                        >
                          {chat.text}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        placeholder="Ask about sizes, customizations..." 
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid ' + s.borderColor, background: s.cardBg, color: s.text, fontSize: '0.9rem', outline: 'none' }}
                      />
                      <button type="submit" style={{ background: s.gradient, color: 'white', padding: '0.8rem', border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Send size={18} />
                      </button>
                    </form>

                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        )}

        {/* ==================== WHATSAPP UI MODE ==================== */}
        {activeUiMode === 'WhatsApp' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            {/* WhatsApp Header */}
            <div style={{
              padding: '0.8rem 1rem',
              background: s.gradient,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ArrowLeft size={20} style={{ cursor: 'pointer' }} onClick={() => setActiveUiMode('Webpage')} />
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}>
                    {biz.name[0]}
                  </div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4CAF50', border: '2px solid white', position: 'absolute', bottom: 0, right: 0 }} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'white' }}>{biz.name}</h4>
                  <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>{waTyping ? 'typing...' : 'Automated Bot • Online'}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Phone size={18} style={{ cursor: 'pointer', opacity: 0.9 }} />
                <Video size={18} style={{ cursor: 'pointer', opacity: 0.9 }} />
                <MoreVertical size={18} style={{ cursor: 'pointer', opacity: 0.9 }} />
              </div>
            </div>

            {/* Scrollable Messages Area */}
            <div style={{
              flex: 1,
              padding: '1rem',
              overflowY: 'auto',
              background: activeTheme === 'Dark' ? '#0b141a' : '#efeae2',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              position: 'relative',
              maxHeight: 'calc(80vh - 120px)'
            }}>
              {waChats.map(chat => (
                <div key={chat.id} style={{
                  alignSelf: chat.sender === 'customer' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{
                    background: chat.sender === 'customer' 
                      ? (activeTheme === 'Dark' ? '#005c4b' : '#d9fdd3')
                      : (activeTheme === 'Dark' ? '#202c33' : '#ffffff'),
                    color: chat.sender === 'customer'
                      ? (activeTheme === 'Dark' ? '#e9edef' : '#303030')
                      : (activeTheme === 'Dark' ? '#e9edef' : '#303030'),
                    padding: '0.6rem 0.8rem',
                    borderRadius: chat.sender === 'customer' ? '12px 0px 12px 12px' : '0px 12px 12px 12px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {chat.text}
                    
                    <div style={{ textAlign: 'right', fontSize: '0.65rem', opacity: 0.5, marginTop: '4px' }}>
                      {chat.timestamp}
                    </div>
                  </div>

                  {/* Render Product Cards inside WhatsApp chat flow */}
                  {chat.isCatalog && (
                    <div style={{
                      display: 'flex',
                      gap: '0.8rem',
                      overflowX: 'auto',
                      padding: '4px 0 10px',
                      maxWidth: '100%',
                      scrollbarWidth: 'none'
                    }}>
                      {biz.products.map(p => (
                        <div key={p.id} style={{
                          flex: '0 0 180px',
                          background: activeTheme === 'Dark' ? '#1f2c34' : 'white',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          border: activeTheme === 'Minimal' ? '2px solid black' : '1px solid rgba(0,0,0,0.05)',
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <img src={p.image} style={{ width: '100%', height: '110px', objectFit: 'cover' }} alt={p.name} />
                          <div style={{ padding: '0.6rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '4px' }}>
                            <div>
                              <h5 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800, color: activeTheme === 'Dark' ? '#e9edef' : '#303030', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</h5>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#FFD700', fontSize: '0.7rem', fontWeight: 800, marginTop: '2px' }}>
                                <Star size={10} fill="#FFD700" /> {p.rating || 4.8}
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                              <span style={{ fontSize: '0.85rem', fontWeight: 900, color: s.accent }}>{p.price}</span>
                              <button
                                onClick={() => {
                                  setWaCheckoutProduct(p);
                                  setCheckoutForm(prev => ({
                                    ...prev,
                                    phone: prev.phone || '555-0199',
                                    name: prev.name || 'Chat Shopper'
                                  }));
                                }}
                                style={{
                                  background: s.gradient,
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '3px 8px',
                                  fontSize: '0.7rem',
                                  fontWeight: 900,
                                  cursor: 'pointer'
                                }}
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {waTyping && (
                <div style={{
                  alignSelf: 'flex-start',
                  background: activeTheme === 'Dark' ? '#202c33' : '#ffffff',
                  color: activeTheme === 'Dark' ? '#e9edef' : '#303030',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '0px 12px 12px 12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 600
                }}>
                  <span>Bot is typing</span>
                  <span style={{ display: 'inline-flex', gap: '2px' }}>
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.accent }} />
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.accent }} />
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: s.accent }} />
                  </span>
                </div>
              )}
            </div>

            {/* Input & Quickreply Pills Area */}
            <div style={{
              padding: '0.8rem',
              background: activeTheme === 'Dark' ? '#1f2c34' : '#f0f2f5',
              borderTop: activeTheme === 'Minimal' ? '2px solid black' : '1px solid rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}>
              {/* Pills Quick replies */}
              <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' }}>
                {[
                  { txt: 'Browse Catalog 🛍️', cmd: 'catalog' },
                  { txt: 'Shipping Policy 🚚', cmd: 'delivery' },
                  { txt: 'Ask Customizations 🎨', cmd: 'custom' },
                  { txt: 'Hi Bot 👋', cmd: 'hello' }
                ].map(pill => (
                  <button
                    key={pill.txt}
                    onClick={() => handleWaSend(pill.cmd)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '15px',
                      background: activeTheme === 'Dark' ? '#2c3e46' : 'white',
                      color: activeTheme === 'Dark' ? '#d1d7db' : '#54656f',
                      border: '1px solid rgba(0,0,0,0.08)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                  >
                    {pill.txt}
                  </button>
                ))}
              </div>

              {/* Chat Send Message input Form */}
              <form onSubmit={(e) => { e.preventDefault(); handleWaSend(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  flex: 1,
                  background: activeTheme === 'Dark' ? '#2a3942' : 'white',
                  borderRadius: '24px',
                  padding: '4px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Smile size={18} style={{ color: '#8696a0', cursor: 'pointer' }} />
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={waChatInput}
                    onChange={e => setWaChatInput(e.target.value)}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      padding: '6px 0',
                      fontSize: '0.85rem',
                      color: activeTheme === 'Dark' ? '#e9edef' : '#3b3b3b'
                    }}
                  />
                  <Camera size={18} style={{ color: '#8696a0', cursor: 'pointer' }} />
                </div>
                
                <button
                  type="submit"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: s.gradient,
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>

            {/* Slide up checkout drawers inside WhatsApp */}
            <AnimatePresence>
              {waCheckoutProduct && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setWaCheckoutProduct(null)}
                    style={{ position: 'absolute', inset: 0, background: 'black', zIndex: 1500 }}
                  />
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      maxHeight: '85%',
                      background: s.cardBg,
                      borderTopLeftRadius: '25px',
                      borderTopRightRadius: '25px',
                      boxShadow: '0 -10px 30px rgba(0,0,0,0.2)',
                      zIndex: 1600,
                      padding: '1.5rem',
                      overflowY: 'auto',
                      border: activeTheme === 'Minimal' ? '2px solid black' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 900, color: s.accent, letterSpacing: '0.5px' }}>🟢 WHATSAPP IN-CHAT CHECKOUT</span>
                      <button onClick={() => setWaCheckoutProduct(null)} style={{ fontSize: '1.2rem', color: s.text, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 900 }}>×</button>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', background: 'rgba(0,0,0,0.02)', padding: '0.8rem', borderRadius: '12px' }}>
                      <img src={waCheckoutProduct.image} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} alt={waCheckoutProduct.name} />
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>{waCheckoutProduct.name}</h4>
                        <span style={{ fontSize: '1.1rem', fontWeight: 900, color: s.accent }}>{waCheckoutProduct.price}</span>
                      </div>
                    </div>

                    <form onSubmit={handleWaCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {/* Dynamic Options for Business */}
                      {biz.fields.map(field => (
                        <div key={field.id} className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                            {field.name.toUpperCase()} {field.required && <span style={{ color: 'red' }}>*</span>}
                          </label>
                          
                          {field.type === 'Dropdown' && (
                            <select 
                              value={customFieldValues[field.id] || ''}
                              onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', background: 'white' }}
                            >
                              {field.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          )}

                          {field.type === 'Text' && (
                            <input 
                              type="text" 
                              placeholder={field.placeholder || "Enter details..."}
                              value={customFieldValues[field.id] || ''}
                              onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', outline: 'none' }}
                            />
                          )}

                          {field.type === 'Date picker' && (
                            <input 
                              type="date" 
                              value={customFieldValues[field.id] || ''}
                              onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', outline: 'none' }}
                            />
                          )}

                          {field.type === 'Upload' && (
                            <div style={{ border: '2px dashed rgba(0,0,0,0.1)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', background: 'rgba(0,0,0,0.01)' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.6 }}>📷 In-chat image attachment enabled</span>
                            </div>
                          )}
                        </div>
                      ))}

                      <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.8rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <div className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.3rem' }}>CUSTOMER NAME</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Alice Green" 
                            value={checkoutForm.name}
                            onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', outline: 'none' }}
                          />
                        </div>

                        <div className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.3rem' }}>WHATSAPP NUMBER</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="+1 555 1234" 
                            value={checkoutForm.phone}
                            onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', outline: 'none' }}
                          />
                        </div>

                        <div className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.3rem' }}>SHIPPING ADDRESS</label>
                          <textarea 
                            required
                            placeholder="123 Sweet Lane, City, State" 
                            value={checkoutForm.address}
                            onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', outline: 'none', height: '50px', fontFamily: 'inherit' }}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        style={{
                          background: s.gradient,
                          color: 'white',
                          padding: '0.8rem',
                          border: 'none',
                          borderRadius: '10px',
                          fontWeight: 900,
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          boxShadow: s.shadow,
                          marginTop: '0.5rem'
                        }}
                      >
                        Confirm and Order via WhatsApp
                      </button>
                    </form>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== INSTAGRAM UI MODE ==================== */}
        {activeUiMode === 'Instagram' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            {/* Instagram Header bar */}
            <div style={{
              padding: '0.8rem 1rem',
              background: s.cardBg,
              color: s.text,
              borderBottom: '1px solid rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Camera size={20} style={{ cursor: 'pointer' }} />
                <span style={{ fontSize: '1.25rem', fontWeight: 900, fontStyle: 'italic', fontFamily: 'serif', letterSpacing: '0.5px' }}>
                  {biz.name.replace(/\s+/g, '').toLowerCase()}
                </span>
              </div>
              <div 
                onClick={() => {
                  setIgShowDm(true);
                  if (igDmMessages.length === 0) {
                    setIgDmMessages([
                      { id: 1, sender: 'business', text: `👋 Welcome to our Social Support DM! Write us a message or comment on our catalog posts to trigger secure, automated checkouts.`, timestamp: 'Active now' }
                    ]);
                  }
                }}
                style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <MessageCircle size={20} />
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#FF2A54', color: 'white', fontSize: '0.6rem', padding: '2px 5px', borderRadius: '50%', fontWeight: 900 }}>
                  1
                </span>
              </div>
            </div>

            {/* Scrollable Post feeds */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              background: s.bg,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              paddingBottom: '2rem',
              maxHeight: 'calc(80vh - 55px)'
            }}>
              {biz.products.map(p => {
                const comments = igPostComments[p.id] || [];
                const liked = igLikedPosts[p.id];
                const commentVal = igCommentInputs[p.id] || '';

                return (
                  <div key={p.id} style={{
                    background: s.cardBg,
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* Post Top Header Info */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: s.gradient, padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: s.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>
                            {biz.name[0]}
                          </div>
                        </div>
                        <div>
                          <h5 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 800 }}>{biz.id}_official</h5>
                          <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>Bespoke Catalog • Partner Shop</span>
                        </div>
                      </div>
                      <MoreVertical size={16} style={{ cursor: 'pointer', opacity: 0.7 }} />
                    </div>

                    {/* Main Image Grid Post */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
                      <img src={p.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={p.name} />
                    </div>

                    {/* Post CTA Action line */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem 0.4rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button onClick={() => handleIgLike(p.id)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: liked ? '#E1306C' : s.text }}>
                          <Heart size={20} fill={liked ? '#E1306C' : 'none'} />
                        </button>
                        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: s.text }}>
                          <MessageSquare size={20} />
                        </button>
                        <button 
                          onClick={() => {
                            setIgActiveDmPost(p);
                            setIgDmMessages([
                              { id: 1, sender: 'business', text: `Hey there! Thank you for browsing: *${p.name}*.`, timestamp: 'Just now' },
                              { id: 2, sender: 'business', text: `Tap below to securely order directly from this chat:`, timestamp: 'Just now', isCheckoutLink: true }
                            ]);
                            setIgShowDm(true);
                          }} 
                          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: s.text }}
                        >
                          <Send size={20} style={{ transform: 'rotate(-20deg)' }} />
                        </button>
                      </div>
                      
                      <span style={{ fontSize: '0.85rem', fontWeight: 900, color: s.accent }}>{p.price}</span>
                    </div>

                    {/* Total counts & Storyteller descriptions */}
                    <div style={{ padding: '0 1rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                        {liked ? '1,429 likes' : '1,428 likes'}
                      </div>
                      <div style={{ fontSize: '0.8rem', lineHeight: 1.4, color: s.text }}>
                        <span style={{ fontWeight: 800, marginRight: '6px' }}>{biz.id}_official</span>
                        Discover the magic of our customizable <b>{p.name}</b>. Exclusively synchronized to fit your options! Comment below or tap DM icon to purchase instantly. ✨🛍️ #shopflow
                      </div>
                    </div>

                    {/* Rendering Comments List */}
                    {comments.length > 0 && (
                      <div style={{ padding: '0.2rem 1rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {comments.map(c => (
                          <div key={c.id} style={{ fontSize: '0.75rem', lineHeight: 1.3 }}>
                            <span style={{ fontWeight: 800, marginRight: '6px' }}>{c.user}</span>
                            <span style={{ opacity: 0.95 }}>{c.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Post commenting section to auto-DM */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderTop: '1px solid rgba(0,0,0,0.03)',
                      padding: '0.4rem 1rem'
                    }}>
                      <input
                        type="text"
                        placeholder="Add a comment to trigger auto-DM..."
                        value={commentVal}
                        onChange={e => setIgCommentInputs({...igCommentInputs, [p.id]: e.target.value})}
                        style={{
                          flex: 1,
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          fontSize: '0.75rem',
                          padding: '4px 0',
                          color: s.text
                        }}
                      />
                      <button
                        onClick={() => handleIgCommentSubmit(p.id)}
                        disabled={!commentVal.trim()}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: commentVal.trim() ? '#0095F6' : 'rgba(0,149,246,0.3)',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          cursor: commentVal.trim() ? 'pointer' : 'default',
                          padding: '2px 0 2px 8px'
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct messages Chat slide overlay in frame */}
            <AnimatePresence>
              {igShowDm && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: s.cardBg,
                    zIndex: 1400,
                    display: 'flex',
                    flexDirection: 'column',
                    border: activeTheme === 'Minimal' ? '2px solid black' : 'none'
                  }}
                >
                  {/* DM Header title */}
                  <div style={{
                    padding: '0.8rem 1rem',
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: s.cardBg
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <ArrowLeft size={20} style={{ cursor: 'pointer' }} onClick={() => setIgShowDm(false)} />
                      <div style={{ position: 'relative' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: s.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '1rem' }}>
                          {biz.name[0]}
                        </div>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50', border: '1.5px solid white', position: 'absolute', bottom: 0, right: 0 }} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: s.text }}>{biz.name}</h4>
                        <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>Active Now • Automated partner</span>
                      </div>
                    </div>
                    <Info size={18} style={{ opacity: 0.7 }} />
                  </div>

                  {/* Message feed screen inside DMs */}
                  <div style={{
                    flex: 1,
                    padding: '1rem',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    background: activeTheme === 'Dark' ? '#121212' : '#FAFAFA'
                  }}>
                    {igDmMessages.map(msg => (
                      <div key={msg.id} style={{
                        alignSelf: msg.sender === 'customer' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}>
                        <div style={{
                          background: msg.sender === 'customer' 
                            ? s.accent 
                            : (activeTheme === 'Dark' ? '#262626' : '#EFEFEF'),
                          color: msg.sender === 'customer' 
                            ? '#ffffff' 
                            : (activeTheme === 'Dark' ? '#ffffff' : '#262626'),
                          padding: '0.6rem 0.8rem',
                          borderRadius: '18px',
                          fontSize: '0.8rem',
                          lineHeight: 1.4
                        }}>
                          {msg.text}
                        </div>

                        {/* Order Checkout dynamic seller links */}
                        {msg.isCheckoutLink && igActiveDmPost && (
                          <div style={{
                            background: activeTheme === 'Dark' ? '#1c1c1e' : 'white',
                            border: '1px solid rgba(0,0,0,0.08)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            marginTop: '4px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            width: '200px'
                          }}>
                            <img src={igActiveDmPost.image} style={{ width: '100%', height: '110px', objectFit: 'cover' }} alt={igActiveDmPost.name} />
                            <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <h5 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800, color: s.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{igActiveDmPost.name}</h5>
                              <span style={{ fontSize: '0.8rem', fontWeight: 900, color: s.accent }}>{igActiveDmPost.price}</span>
                              <button
                                onClick={() => {
                                  setCheckoutForm(prev => ({
                                    ...prev,
                                    name: prev.name || 'Instagram Shopper',
                                    phone: prev.phone || '555-0188'
                                  }));
                                }}
                                style={{
                                  background: s.gradient,
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '5px',
                                  fontSize: '0.7rem',
                                  fontWeight: 900,
                                  cursor: 'pointer',
                                  marginTop: '4px',
                                  textAlign: 'center',
                                  width: '100%'
                                }}
                              >
                                Checkout Now
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Empty Input footer drawer */}
                  <div style={{
                    padding: '0.6rem 1rem',
                    borderTop: '1px solid rgba(0,0,0,0.08)',
                    background: s.cardBg,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <input
                      type="text"
                      placeholder="DM order link generated above..."
                      style={{
                        flex: 1,
                        border: '1px solid rgba(0,0,0,0.12)',
                        borderRadius: '20px',
                        padding: '6px 12px',
                        fontSize: '0.8rem',
                        background: 'transparent',
                        outline: 'none',
                        color: s.text
                      }}
                      disabled
                    />
                    <button style={{ color: '#0095F6', background: 'none', border: 'none', fontWeight: 800, fontSize: '0.8rem', opacity: 0.5, cursor: 'default' }}>Send</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct messages sliding drawer checkout form info */}
            <AnimatePresence>
              {igActiveDmPost && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIgActiveDmPost(null)}
                    style={{ position: 'absolute', inset: 0, background: 'black', zIndex: 1500 }}
                  />
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      maxHeight: '85%',
                      background: s.cardBg,
                      borderTopLeftRadius: '25px',
                      borderTopRightRadius: '25px',
                      boxShadow: '0 -10px 30px rgba(0,0,0,0.2)',
                      zIndex: 1600,
                      padding: '1.5rem',
                      overflowY: 'auto',
                      border: activeTheme === 'Minimal' ? '2px solid black' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 900, color: s.accent, letterSpacing: '0.5px' }}>⚡️ INSTAGRAM DM SOCIAL PURCHASE</span>
                      <button onClick={() => setIgActiveDmPost(null)} style={{ fontSize: '1.2rem', color: s.text, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 900 }}>×</button>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', background: 'rgba(0,0,0,0.02)', padding: '0.8rem', borderRadius: '12px' }}>
                      <img src={igActiveDmPost.image} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} alt={igActiveDmPost.name} />
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>{igActiveDmPost.name}</h4>
                        <span style={{ fontSize: '1.1rem', fontWeight: 900, color: s.accent }}>{igActiveDmPost.price}</span>
                      </div>
                    </div>

                    <form onSubmit={handleIgDmCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {/* Dynamic Options Contexts */}
                      {biz.fields.map(field => (
                        <div key={field.id} className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                            {field.name.toUpperCase()} {field.required && <span style={{ color: 'red' }}>*</span>}
                          </label>
                          
                          {field.type === 'Dropdown' && (
                            <select 
                              value={customFieldValues[field.id] || ''}
                              onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', background: 'white' }}
                            >
                              {field.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          )}

                          {field.type === 'Text' && (
                            <input 
                              type="text" 
                              placeholder={field.placeholder || "Enter details..."}
                              value={customFieldValues[field.id] || ''}
                              onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', outline: 'none' }}
                            />
                          )}

                          {field.type === 'Date picker' && (
                            <input 
                              type="date" 
                              value={customFieldValues[field.id] || ''}
                              onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                              style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', outline: 'none' }}
                            />
                          )}

                          {field.type === 'Upload' && (
                            <div style={{ border: '2px dashed rgba(0,0,0,0.1)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', background: 'rgba(0,0,0,0.01)' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.6 }}>📷 DM image upload attachment ready</span>
                            </div>
                          )}
                        </div>
                      ))}

                      <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.8rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <div className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.3rem' }}>CUSTOMER NAME</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Alice Green" 
                            value={checkoutForm.name}
                            onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', outline: 'none' }}
                          />
                        </div>

                        <div className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.3rem' }}>PHONE NUMBER</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="+1 555 1234" 
                            value={checkoutForm.phone}
                            onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', outline: 'none' }}
                          />
                        </div>

                        <div className="form-group">
                          <label style={{ display: 'block', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.3rem' }}>DELIVERY ADDRESS</label>
                          <textarea 
                            required
                            placeholder="123 Sweet Lane, City, State" 
                            value={checkoutForm.address}
                            onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})}
                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '0.85rem', outline: 'none', height: '50px', fontFamily: 'inherit' }}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        style={{
                          background: s.gradient,
                          color: 'white',
                          padding: '0.8rem',
                          border: 'none',
                          borderRadius: '10px',
                          fontWeight: 900,
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          boxShadow: s.shadow,
                          marginTop: '0.5rem'
                        }}
                      >
                        Secure Order in Instagram DMs
                      </button>
                    </form>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
        </div>
      </div>
    </div>
  );
};


export default TenantStorefront;

