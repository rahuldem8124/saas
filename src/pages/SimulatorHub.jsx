import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '../context/TenantContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, Smartphone, Monitor, Rocket, Layers, Palette, 
  ShoppingBag, Check, CheckCircle2, ChevronRight, Eye, RefreshCw 
} from 'lucide-react';

const SimulatorHub = () => {
  const { createBusiness } = useTenant();
  const { loginSeller } = useAuth();
  const navigate = useNavigate();

  // Selected Niche Demo
  const [activeNiche, setActiveNiche] = useState('Cake'); // Cake, Sneakers, Jewelry, Pottery, Apparel
  const [previewMode, setPreviewMode] = useState('both'); // both, pc, mobile
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);

  // 1. CAKE CUSTOMIZER STATE
  const [cakeFlavor, setCakeFlavor] = useState('red-velvet'); // chocolate, red-velvet, vanilla, lemon
  const [cakeTopping, setCakeTopping] = useState('berries'); // rose, sprinkles, berries, glaze
  const [cakeTiers, setCakeTiers] = useState(2); // 1, 2, 3
  const [cakeStand, setCakeStand] = useState('gold'); // none, gold, wood

  // 2. SNEAKER CUSTOMIZER STATE
  const [shoeLaces, setShoeLaces] = useState('lime'); // lime, stealth, crimson, white
  const [shoeUpper, setShoeUpper] = useState('cyber'); // cyber, chicago, gold, midnight
  const [shoeSole, setShoeSole] = useState('platform'); // low, platform, bubble

  // 3. JEWELRY CUSTOMIZER STATE
  const [jewelMetal, setJewelMetal] = useState('rose'); // gold, rose, silver, platinum
  const [jewelGem, setJewelGem] = useState('diamond'); // diamond, sapphire, ruby, emerald, onyx
  const [jewelText, setJewelText] = useState('LOVE');

  // 4. POTTERY CUSTOMIZER STATE
  const [clayGlaze, setClayGlaze] = useState('celadon'); // celadon, raw, oatmeal, cobalt
  const [clayHandle, setClayHandle] = useState('classic'); // classic, block, twig, none
  const [clayShape, setClayShape] = useState('urn'); // mug, hourglass, urn

  // 5. APPAREL CUSTOMIZER STATE
  const [apparelPattern, setApparelPattern] = useState('cyberpunk'); // lavender, cyberpunk, charcoal, stripes
  const [apparelFit, setApparelFit] = useState('oversized'); // oversized, crop, regular
  const [apparelLogo, setApparelLogo] = useState('center'); // none, center, crest

  // Premium colors
  const colors = {
    bg: '#0F172A', // Slate 900
    cardBg: 'rgba(30, 41, 59, 0.7)', // Slate 800 glass
    border: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#F8FAFC',
    textMuted: '#94A3B8',
    primary: '#6366F1', // Indigo
    primaryGradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    goldGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    pinkGradient: 'linear-gradient(135deg, #EC4899 0%, #D946EF 100%)',
    greenGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    purpleGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  };

  // SVGs / Renders for custom attributes
  const renderCakeSvg = () => {
    // Colors based on flavor
    const flavorColors = {
      'chocolate': { base: '#4A2C2A', light: '#5C3A21', icing: '#3D251E' },
      'red-velvet': { base: '#8B0000', light: '#A52A2A', icing: '#F5F5F5' },
      'vanilla': { base: '#FFFDD0', light: '#FFFDD0', icing: '#FFB6C1' },
      'lemon': { base: '#FFF44F', light: '#FFFFE0', icing: '#FFFDD0' }
    };
    const c = flavorColors[cakeFlavor];

    // Toppings
    const drawTopping = (y) => {
      if (cakeTopping === 'rose') {
        return (
          <g>
            <circle cx="90" cy={y} r="8" fill="#FF5E7E" />
            <circle cx="110" cy={y} r="8" fill="#FF5E7E" />
            <circle cx="100" cy={y - 3} r="10" fill="#FF2E54" />
          </g>
        );
      }
      if (cakeTopping === 'sprinkles') {
        return (
          <g>
            <rect x="75" y={y} width="6" height="3" fill="#38BDF8" rx="1.5" transform="rotate(15 75 y)" />
            <rect x="95" y={y - 2} width="6" height="3" fill="#EC4899" rx="1.5" transform="rotate(-30 95 y)" />
            <rect x="110" y={y + 1} width="6" height="3" fill="#F59E0B" rx="1.5" transform="rotate(45 110 y)" />
            <circle cx="85" cy={y + 3} r="2" fill="#10B981" />
            <circle cx="118" cy={y - 1} r="2" fill="#E0F2FE" />
          </g>
        );
      }
      if (cakeTopping === 'berries') {
        return (
          <g>
            <circle cx="95" cy={y} r="5" fill="#DC2626" />
            <circle cx="100" cy={y + 2} r="5.5" fill="#312E81" />
            <circle cx="105" cy={y} r="5" fill="#EF4444" />
            <circle cx="88" cy={y + 1} r="4.5" fill="#DC2626" />
            <circle cx="112" cy={y + 1} r="4.5" fill="#312E81" />
          </g>
        );
      }
      // chocolate drip glaze
      return (
        <path d={`M 70 ${y + 5} Q 80 ${y + 15} 90 ${y + 5} T 110 ${y + 14} T 130 ${y + 5} L 130 ${y - 5} L 70 ${y - 5} Z`} fill="#4E2B1F" />
      );
    };

    return (
      <svg width="200" height="200" viewBox="0 0 200 200" style={{ display: 'block', margin: 'auto' }}>
        {/* STAND STYLE */}
        {cakeStand === 'gold' && (
          <g>
            <ellipse cx="100" cy="170" rx="60" ry="12" fill="#D4AF37" />
            <path d="M 90 170 L 85 190 L 115 190 L 110 170 Z" fill="#AA7C11" />
            <ellipse cx="100" cy="190" rx="40" ry="8" fill="#AA7C11" />
          </g>
        )}
        {cakeStand === 'wood' && (
          <g>
            <ellipse cx="100" cy="170" rx="65" ry="14" fill="#8B5A2B" />
            <ellipse cx="100" cy="172" rx="65" ry="14" fill="#5C3A21" />
            <path d="M 85 174 L 80 190 L 120 190 L 115 174 Z" fill="#3D251E" />
          </g>
        )}

        {/* TIER 3 (BOTTOM TIER) - Rendered if tiers >= 1 */}
        {cakeTiers >= 1 && (
          <g>
            <rect x="50" y="120" width="100" height="50" fill={c.base} rx="4" />
            {/* icing layers */}
            <rect x="50" y="135" width="100" height="8" fill={c.icing} />
            <rect x="50" y="155" width="100" height="6" fill={c.icing} />
          </g>
        )}

        {/* TIER 2 (MIDDLE TIER) - Rendered if tiers >= 2 */}
        {cakeTiers >= 2 && (
          <g>
            <rect x="65" y="80" width="70" height="42" fill={c.light} rx="4" />
            {/* icing layers */}
            <rect x="65" y="93" width="70" height="6" fill={c.icing} />
            <rect x="65" y="108" width="70" height="5" fill={c.icing} />
          </g>
        )}

        {/* TIER 1 (TOP TIER) - Rendered if tiers >= 3 */}
        {cakeTiers >= 3 && (
          <g>
            <rect x="78" y="45" width="44" height="36" fill={c.base} rx="3" />
            <rect x="78" y="58" width="44" height="5" fill={c.icing} />
          </g>
        )}

        {/* TOPPING (Placed on the highest active tier) */}
        {cakeTiers === 1 && drawTopping(120)}
        {cakeTiers === 2 && drawTopping(80)}
        {cakeTiers === 3 && drawTopping(45)}

        {/* Lit Candle on Top */}
        <g transform={`translate(100, ${cakeTiers === 1 ? 118 : cakeTiers === 2 ? 78 : 43})`}>
          <rect x="-2" y="-14" width="4" height="14" fill="#C084FC" />
          <line x1="0" y1="-14" x2="0" y2="-18" stroke="#1E293B" strokeWidth="1" />
          <path d="M -3 -18 C -3 -24, 3 -24, 3 -18 C 3 -14, -3 -14, -3 -18 Z" fill="#F59E0B" />
        </g>
      </svg>
    );
  };

  const renderSneakerSvg = () => {
    // Upper presets
    const upperColors = {
      'cyber': { base: '#7C3AED', panels: '#EC4899', detailing: '#06B6D4' },
      'chicago': { base: '#DC2626', panels: '#000000', detailing: '#FFFFFF' },
      'gold': { base: '#FFFFFF', panels: '#D4AF37', detailing: '#AA7C11' },
      'midnight': { base: '#1E293B', panels: '#0F172A', detailing: '#334155' }
    };
    const u = upperColors[shoeUpper];

    // Laces colors
    const laceColors = {
      'lime': '#A3E635',
      'stealth': '#0F172A',
      'crimson': '#EF4444',
      'white': '#F8FAFC'
    };
    const laceColor = laceColors[shoeLaces];

    return (
      <svg width="220" height="150" viewBox="0 0 220 150" style={{ display: 'block', margin: 'auto' }}>
        {/* Sole style */}
        {shoeSole === 'low' && (
          <path d="M 28 115 L 180 115 L 175 125 L 34 125 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
        )}
        {shoeSole === 'platform' && (
          <g>
            <path d="M 24 110 L 182 110 L 178 132 L 32 132 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
            <line x1="45" y1="120" x2="160" y2="120" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3,3" />
          </g>
        )}
        {shoeSole === 'bubble' && (
          <g>
            <path d="M 24 112 L 182 112 L 178 128 L 32 128 Z" fill="#E2E8F0" />
            {/* Air Bubbles */}
            <circle cx="50" cy="120" r="6" fill="#38BDF8" opacity="0.8" />
            <circle cx="80" cy="120" r="6" fill="#38BDF8" opacity="0.8" />
            <circle cx="110" cy="120" r="6" fill="#38BDF8" opacity="0.8" />
          </g>
        )}

        {/* Shoe Body silhouette */}
        <path d="M 28 112 C 16 112, 10 102, 15 90 C 20 78, 48 50, 75 35 C 90 28, 120 28, 128 45 L 155 75 L 180 90 L 180 112 Z" fill={u.base} />
        {/* Panels */}
        <path d="M 32 108 C 45 108, 55 90, 68 85 C 80 80, 115 50, 128 45 C 130 50, 150 78, 175 88 L 175 108 Z" fill={u.panels} opacity="0.85" />
        {/* Swoosh / Detail Decal */}
        <path d="M 72 88 Q 110 70 148 52 Q 130 90 85 96 Z" fill={u.detailing} />

        {/* Laces paths */}
        <g stroke={laceColor} strokeWidth="3" strokeLinecap="round" opacity="0.95">
          <line x1="90" y1="46" x2="105" y2="52" />
          <line x1="94" y1="56" x2="109" y2="62" />
          <line x1="98" y1="66" x2="113" y2="72" />
          <line x1="102" y1="76" x2="117" y2="82" />
        </g>

        {/* Sneaker collar / heel support */}
        <path d="M 120 30 C 128 30, 134 38, 132 46" stroke="#475569" strokeWidth="2.5" fill="none" />
      </svg>
    );
  };

  const renderJewelrySvg = () => {
    const metalColors = {
      'gold': { ring: '#F59E0B', sheen: '#FDE047' },
      'rose': { ring: '#FDA4AF', sheen: '#FECDD3' },
      'silver': { ring: '#CBD5E1', sheen: '#F1F5F9' },
      'platinum': { ring: '#475569', sheen: '#94A3B8' }
    };
    const m = metalColors[jewelMetal];

    const gemColors = {
      'diamond': '#E0F2FE',
      'sapphire': '#1D4ED8',
      'ruby': '#DC2626',
      'emerald': '#10B981',
      'onyx': '#0F172A'
    };
    const gemFill = gemColors[jewelGem];

    return (
      <svg width="180" height="180" viewBox="0 0 100 100" style={{ display: 'block', margin: 'auto' }}>
        {/* The Metal Ring band */}
        <circle cx="50" cy="55" r="30" fill="none" stroke={m.ring} strokeWidth="7" />
        <circle cx="50" cy="55" r="265" fill="none" stroke={m.sheen} strokeWidth="1.5" opacity="0.6" />

        {/* Prong holder */}
        <path d="M 44 26 L 46 22 L 54 22 L 56 26 Z" fill={m.ring} />

        {/* Gemstone */}
        <polygon points="50,8 38,18 42,24 58,24 62,18" fill={gemFill} stroke={m.sheen} strokeWidth="0.5" transform="translate(0, 4)" />
        <polygon points="50,8 44,18 56,18" fill="#FFFFFF" opacity="0.25" transform="translate(0, 4)" />

        {/* Custom text engraved inside the band center */}
        <text x="50" y="59" fill={m.sheen} fontSize="6" fontWeight="950" textAnchor="middle" letterSpacing="0.5">
          {jewelText.slice(0, 8).toUpperCase()}
        </text>
      </svg>
    );
  };

  const renderPotterySvg = () => {
    const glazeColors = {
      'celadon': { base: '#34D399', accent: '#059669', gloss: 'rgba(255,255,255,0.2)' },
      'raw': { base: '#CA8A04', accent: '#78350F', gloss: 'rgba(255,255,255,0.05)' },
      'oatmeal': { base: '#E2E8F0', accent: '#64748B', gloss: 'rgba(255,255,255,0.1)' },
      'cobalt': { base: '#1D4ED8', accent: '#1E3A8A', gloss: 'rgba(255,255,255,0.35)' }
    };
    const g = glazeColors[clayGlaze];

    return (
      <svg width="180" height="180" viewBox="0 0 100 100" style={{ display: 'block', margin: 'auto' }}>
        {/* Handle */}
        {clayHandle === 'classic' && (
          <path d="M 68 40 C 85 40, 85 70, 68 70" fill="none" stroke={g.accent} strokeWidth="8" strokeLinecap="round" />
        )}
        {clayHandle === 'block' && (
          <path d="M 68 38 L 84 38 L 84 68 L 68 68" fill="none" stroke={g.accent} strokeWidth="10" strokeLinejoin="round" />
        )}
        {clayHandle === 'twig' && (
          <g>
            <path d="M 68 40 C 85 40, 85 70, 68 70" fill="none" stroke={g.base} strokeWidth="4" />
            <path d="M 66 45 C 80 43, 80 65, 66 65" fill="none" stroke={g.accent} strokeWidth="4" />
          </g>
        )}

        {/* Vase Silhouette shape */}
        {clayShape === 'mug' && (
          <g>
            <path d="M 32 30 L 68 30 L 65 80 L 35 80 Z" fill={g.base} />
            <ellipse cx="50" cy="30" rx="18" ry="4" fill={g.accent} />
            <path d="M 32 30 L 68 30 L 68 45 Q 50 55 32 45 Z" fill={g.accent} opacity="0.3" />
          </g>
        )}
        {clayShape === 'hourglass' && (
          <g>
            <path d="M 35 25 Q 50 35 35 55 Q 26 75 35 85 L 65 85 Q 74 75 65 55 Q 50 35 65 25 Z" fill={g.base} />
            <ellipse cx="50" cy="25" rx="15" ry="4.5" fill={g.accent} />
          </g>
        )}
        {clayShape === 'urn' && (
          <g>
            <path d="M 40 20 L 60 20 L 58 35 Q 72 45 70 70 L 65 85 L 35 85 L 30 70 Q 28 45 42 35 Z" fill={g.base} />
            <ellipse cx="50" cy="20" rx="10" ry="3" fill={g.accent} />
            {/* Urn neck ring */}
            <rect x="38" y="28" width="24" height="4" fill={g.accent} rx="2" />
          </g>
        )}

        {/* Glaze Speckling / Shine Overlay */}
        <path d="M 36 35 C 38 48, 38 65, 42 78" stroke={g.gloss} strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    );
  };

  const renderApparelSvg = () => {
    const patterns = {
      'lavender': '#C084FC',
      'cyberpunk': '#111827', // Render custom graphic below
      'charcoal': '#374151',
      'stripes': '#FFFFFF' // Render stripes below
    };
    const fillBase = patterns[apparelPattern];

    return (
      <svg width="200" height="180" viewBox="0 0 100 100" style={{ display: 'block', margin: 'auto' }}>
        {/* Sleeves & Hood based on Fit */}
        {apparelFit === 'oversized' && (
          <g>
            {/* Draw Heavyweight Hoodie */}
            {/* Hood */}
            <path d="M 50 14 C 36 14, 30 24, 38 32 C 44 34, 56 34, 62 32 C 70 24, 64 14, 50 14 Z" fill="#1E293B" />
            {/* Body */}
            <path d="M 22 36 L 78 36 L 75 88 L 25 88 Z" fill={fillBase} />
            {/* Left Sleeve */}
            <path d="M 22 36 L 6 52 L 14 60 L 25 48 Z" fill={fillBase} />
            {/* Right Sleeve */}
            <path d="M 78 36 L 94 52 L 86 60 L 75 48 Z" fill={fillBase} />
            {/* Kangaroo pocket */}
            <path d="M 34 68 L 66 68 L 62 82 L 38 82 Z" fill="#1F2937" opacity="0.3" />
            {/* Drawstrings */}
            <line x1="46" y1="32" x2="44" y2="48" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="54" y1="32" x2="56" y2="48" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {/* Cropped Tee */}
        {apparelFit === 'crop' && (
          <g>
            {/* Short Crop Body */}
            <path d="M 28 36 L 72 36 L 70 65 L 30 65 Z" fill={fillBase} />
            {/* Short sleeves */}
            <path d="M 28 36 L 14 44 L 18 52 L 30 46 Z" fill={fillBase} />
            {/* Right Sleeve */}
            <path d="M 72 36 L 86 44 L 82 52 L 70 46 Z" fill={fillBase} />
            {/* Collar rim */}
            <ellipse cx="50" cy="36" rx="8" ry="3" fill="#1F2937" opacity="0.3" />
          </g>
        )}

        {/* Sweatshirt Fit */}
        {apparelFit === 'regular' && (
          <g>
            <path d="M 26 36 L 74 36 L 72 82 L 28 82 Z" fill={fillBase} />
            {/* Full Sleeves */}
            <path d="M 26 36 L 8 60 L 14 66 L 28 46 Z" fill={fillBase} />
            {/* Right Sleeve */}
            <path d="M 74 36 L 92 60 L 86 66 L 72 46 Z" fill={fillBase} />
            {/* Collar rim */}
            <ellipse cx="50" cy="36" rx="10" ry="3.5" fill="#1F2937" opacity="0.3" />
          </g>
        )}

        {/* Stripes Overlay */}
        {apparelPattern === 'stripes' && (
          <g opacity="0.3" stroke="#1E3A8A" strokeWidth="3">
            <line x1="30" y1="42" x2="70" y2="42" />
            <line x1="30" y1="50" x2="70" y2="50" />
            <line x1="30" y1="58" x2="70" y2="58" />
            <line x1="30" y1="66" x2="70" y2="66" />
          </g>
        )}

        {/* Cyberpunk Neon graphic */}
        {apparelPattern === 'cyberpunk' && (
          <g transform="translate(40, 44) scale(0.4)" opacity="0.9">
            <rect x="0" y="0" width="50" height="50" rx="10" fill="#EC4899" />
            <polygon points="25,5 5,40 45,40" fill="#06B6D4" />
            <circle cx="25" cy="27" r="10" fill="#E0F2FE" />
          </g>
        )}

        {/* Logo Badging */}
        {apparelLogo === 'center' && (
          <text x="50" y="55" fill="#F8FAFC" fontSize="6" fontWeight="900" textAnchor="middle" letterSpacing="0.4" opacity="0.8">
            THREADS
          </text>
        )}
        {apparelLogo === 'crest' && (
          <g transform="translate(34, 44)">
            <circle cx="0" cy="0" r="3" fill="#D4AF37" />
            <polygon points="0,-4 -3,2 3,2" fill="#AA7C11" />
          </g>
        )}
      </svg>
    );
  };

  const handleLaunchStore = () => {
    setIsDeploying(true);
    setDeployProgress(0);

    const interval = setInterval(() => {
      setDeployProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Map custom details and trigger auto setup
            const name = `My Custom ${activeNiche} Shop`;
            const newBizId = createBusiness({
              name,
              category: activeNiche,
              theme: activeNiche === 'Cake' ? 'Luxury' : activeNiche === 'Sneakers' ? 'Dark' : activeNiche === 'Accessories' ? 'Minimal' : activeNiche === 'Handmade' ? 'Minimal' : 'Modern',
              subscription: 'Custom Plan',
              whatsappNumber: '+919999988888',
              instagramUsername: `custom_${activeNiche.toLowerCase()}_store`
            });
            loginSeller(newBizId, `${name} Operator`);
            navigate('/admin');
          }, 800);
          return 100;
        }
        return prev + 25;
      });
    }, 450);
  };

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px', boxSizing: 'border-box', color: colors.textPrimary, fontFamily: "'Inter', sans-serif" }}>
      
      {/* Background Decorators */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '50%', filter: 'blur(130px)', pointerEvents: 'none', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', top: '40%', right: '10%', width: '400px', height: '400px', background: 'rgba(236, 72, 153, 0.12)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', zIndex: 0 }}></div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 1 }}>
        
        {/* Hub Header */}
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(99, 102, 241, 0.08)', padding: '0.5rem 1.2rem', borderRadius: '30px', border: `1px solid ${colors.primary}`, color: '#818CF8', fontWeight: 800, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            <Sparkles size={14} /> <span>UNIFIED LIVE SIMULATOR PLATFORM</span>
          </div>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 950, letterSpacing: '-1.5px', margin: '0 0 1rem', background: 'linear-gradient(to right, #F8FAFC, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Deployment-Ready <span style={{ color: '#818CF8' }}>Demo Customizer</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: colors.textMuted, maxWidth: '680px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            Configure real product attributes across five beautiful vertical niches. Observe instant PC and Mobile UI responsiveness, then launch your custom workspace with a single click.
          </p>
        </header>

        {/* Niche Selector Grid (Top Row) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3.5rem' }}>
          {[
            { id: 'Cake', label: 'Cake Bakery 🎂', desc: 'CakeFlow premium bakery catalog', grad: colors.pinkGradient },
            { id: 'Sneakers', label: 'Sneakers Lab 👟', desc: 'SoleVault urban streetwear', grad: colors.purpleGradient },
            { id: 'Accessories', label: 'Jewelry Boutique 💍', desc: 'RoseGold Atelier accessory store', grad: colors.goldGradient },
            { id: 'Handmade', label: 'Pottery & Craft 🎨', desc: 'Clay & Co. organic ceramics', grad: colors.greenGradient },
            { id: 'Clothing', label: 'Apparel Fashion 👕', desc: 'Threads crewneck fashion collection', grad: colors.primaryGradient }
          ].map(n => {
            const isActive = activeNiche === n.id;
            return (
              <div 
                key={n.id}
                onClick={() => setActiveNiche(n.id)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '24px',
                  background: isActive ? n.grad : colors.cardBg,
                  border: `1.5px solid ${isActive ? 'transparent' : colors.border}`,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 10px 25px rgba(99, 102, 241, 0.25)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF' }}>{n.label}</h3>
                <p style={{ margin: 0, fontSize: '0.78rem', color: isActive ? 'rgba(255,255,255,0.8)' : colors.textMuted, fontWeight: 600, lineHeight: 1.4 }}>{n.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Main Work Area Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: '3rem', alignItems: 'stretch' }}>
          
          {/* LEFT COLUMN: Customizer Controls Panel */}
          <div style={{ background: colors.cardBg, borderRadius: '30px', border: `1.5px solid ${colors.border}`, padding: '2rem', backdropFilter: 'blur(20px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1.5px solid ${colors.border}`, paddingBottom: '1.2rem', marginBottom: '2rem' }}>
              <Palette size={20} color="#818CF8" />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, color: colors.textPrimary }}>Customizer Attributes</h2>
            </div>

            {/* DYNAMIC ATTRIBUTES INJECTOR */}
            {activeNiche === 'Cake' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cake Base Flavor</label>
                  <select value={cakeFlavor} onChange={e => setCakeFlavor(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="chocolate">🍫 Royal Chocolate Truffle</option>
                    <option value="red-velvet">🍰 Deep Red Velvet</option>
                    <option value="vanilla">🧁 Vanilla Strawberry Blush</option>
                    <option value="lemon">🍋 Lemony Lemon Zest</option>
                  </select>
                </div>
                
                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Decoration Topping</label>
                  <select value={cakeTopping} onChange={e => setCakeTopping(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="berries">🍒 Fresh Forest Berries</option>
                    <option value="rose">🌹 Golden Dust & Rose Petals</option>
                    <option value="sprinkles">🍭 Rainbow Confetti & Macarons</option>
                    <option value="glaze">🍫 Creamy Chocolate Glaze</option>
                  </select>
                </div>

                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cake Layers / Tiers</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2, 3].map(t => (
                      <button key={t} onClick={() => setCakeTiers(t)} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: `1px solid ${colors.border}`, background: cakeTiers === t ? colors.primaryGradient : '#0F172A', color: 'white', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}>
                        {t} Tier{t > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pedestal Stand Style</label>
                  <select value={cakeStand} onChange={e => setCakeStand(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="none">❌ Flat Slab (No Stand)</option>
                    <option value="gold">🏆 Elegant Gold Pedestal</option>
                    <option value="wood">🪵 Rustic Oak Wood Slab</option>
                  </select>
                </div>
              </div>
            )}

            {activeNiche === 'Sneakers' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lacing Color</label>
                  <select value={shoeLaces} onChange={e => setShoeLaces(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="lime">🟢 Neon Lime Green</option>
                    <option value="crimson">🔴 Laser Crimson Red</option>
                    <option value="white">⚪ Classic White Lace</option>
                    <option value="stealth">⚫ Stealth Blackout</option>
                  </select>
                </div>

                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Upper Panels Style</label>
                  <select value={shoeUpper} onChange={e => setShoeUpper(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="cyber">🛸 Vanguard Cyberpunk (Neon Purple/Pink)</option>
                    <option value="chicago">🏀 Retro Chicago (Red/Black/White)</option>
                    <option value="gold">🥇 Championship Gold (White/Gold)</option>
                    <option value="midnight">🌌 Midnight Stealth (Dark Carbon)</option>
                  </select>
                </div>

                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Midsole / Sole structure</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['low', 'platform', 'bubble'].map(s => (
                      <button key={s} onClick={() => setShoeSole(s)} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: `1px solid ${colors.border}`, background: shoeSole === s ? colors.primaryGradient : '#0F172A', color: 'white', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize' }}>
                        {s} Sole
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeNiche === 'Accessories' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ring Metal Finish</label>
                  <select value={jewelMetal} onChange={e => setJewelMetal(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="gold">✨ 18k Yellow Gold</option>
                    <option value="rose">💖 18k Rose Gold</option>
                    <option value="silver">💍 925 Sterling Silver</option>
                    <option value="platinum">💎 Platinum Carbon Black</option>
                  </select>
                </div>

                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Centred Gemstone</label>
                  <select value={jewelGem} onChange={e => setJewelGem(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="diamond">💎 Diamond Sparkle</option>
                    <option value="sapphire">💙 Royal Blue Sapphire</option>
                    <option value="ruby">❤️ Crimson Ruby Fire</option>
                    <option value="emerald">💚 Emerald Vivid Green</option>
                    <option value="onyx">🖤 Midnight Onyx Shield</option>
                  </select>
                </div>

                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engraving Message</label>
                  <input type="text" maxLength={8} value={jewelText} onChange={e => setJewelText(e.target.value.toUpperCase())} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            )}

            {activeNiche === 'Handmade' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clay Glazing style</label>
                  <select value={clayGlaze} onChange={e => setClayGlaze(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="celadon">🟢 Crackle Emerald Celadon</option>
                    <option value="raw">🟠 Raw Terracotta Earth</option>
                    <option value="oatmeal">⚪ Speckled Oatmeal Matte</option>
                    <option value="cobalt">🔵 High-Gloss Ocean Cobalt</option>
                  </select>
                </div>

                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mug Handle Type</label>
                  <select value={clayHandle} onChange={e => setClayHandle(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="classic">↪️ D-Loop Classic Handle</option>
                    <option value="block">⏹️ Chunky Geometric Ring</option>
                    <option value="twig">🌿 Braided Organic Twig</option>
                    <option value="none">❌ No Handle (Tumbler)</option>
                  </select>
                </div>

                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vase/Cup Silhouette</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['mug', 'hourglass', 'urn'].map(sh => (
                      <button key={sh} onClick={() => setClayShape(sh)} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: `1px solid ${colors.border}`, background: clayShape === sh ? colors.primaryGradient : '#0F172A', color: 'white', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        {sh}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeNiche === 'Clothing' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fabric & Print</label>
                  <select value={apparelPattern} onChange={e => setApparelPattern(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="cyberpunk">👾 Cyberpunk Neon Graphic</option>
                    <option value="lavender">🌸 Solid Pastel Lavender</option>
                    <option value="charcoal">🌋 Wash Charcoal Black</option>
                    <option value="stripes">🦓 Breton Sailor Stripes</option>
                  </select>
                </div>

                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Apparel Silhouette Fit</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['oversized', 'crop', 'regular'].map(f => (
                      <button key={f} onClick={() => setApparelFit(f)} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: `1px solid ${colors.border}`, background: apparelFit === f ? colors.primaryGradient : '#0F172A', color: 'white', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                        {f === 'oversized' ? 'Hoodie' : f === 'crop' ? 'Crop Tee' : 'Sweatshirt'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="control-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: colors.textMuted, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Logo Badging</label>
                  <select value={apparelLogo} onChange={e => setApparelLogo(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: `1px solid ${colors.border}`, background: '#0F172A', color: 'white', fontWeight: 700, outline: 'none' }}>
                    <option value="center">🗣️ Center Signature text</option>
                    <option value="crest">🛡️ Top Left Golden Crest</option>
                    <option value="none">❌ Blank canvas (No Logo)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Launch Workspace Section */}
            <div style={{ borderTop: `1.5px solid ${colors.border}`, marginTop: '2.5rem', paddingTop: '2rem' }}>
              <button 
                onClick={handleLaunchStore}
                disabled={isDeploying}
                style={{
                  width: '100%',
                  padding: '1.2rem',
                  background: colors.primaryGradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  fontWeight: 900,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  boxShadow: '0 10px 25px rgba(99,102,241,0.3)',
                  transition: 'all 0.2s'
                }}
              >
                {isDeploying ? (
                  <>
                    <RefreshCw size={18} className="spin" />
                    <span>Deploying Custom Workspace... {deployProgress}%</span>
                  </>
                ) : (
                  <>
                    <Rocket size={18} />
                    <span>Launch Subscribed {activeNiche} Store</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: PREVIEW PANEL (PC & Mobile Side-By-Side) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* View controllers */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'both', label: 'Side-by-Side View 🖥️📱' },
                  { id: 'pc', label: 'PC Layout Only 🖥️' },
                  { id: 'mobile', label: 'Mobile Device Only 📱' }
                ].map(v => (
                  <button 
                    key={v.id} 
                    onClick={() => setPreviewMode(v.id)} 
                    style={{
                      background: previewMode === v.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                      border: `1px solid ${previewMode === v.id ? colors.border : 'transparent'}`,
                      color: previewMode === v.id ? 'white' : colors.textMuted,
                      padding: '0.5rem 1.2rem',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: colors.textMuted, fontWeight: 800 }}>
                <span style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%', display: 'inline-block' }} />
                <span>DEPLOYMENT READY LIVE SYNC ACTIVE</span>
              </div>
            </div>

            {/* PREVIEW CONTAINER */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: previewMode === 'both' ? '1.1fr 0.9fr' : '1fr',
              gap: '2.5rem',
              width: '100%',
              alignItems: 'stretch',
              justifyContent: 'center'
            }}>
              
              {/* PC PREVIEW SHELL */}
              {(previewMode === 'both' || previewMode === 'pc') && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <span style={{ fontSize: '0.78rem', color: colors.textMuted, fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>Desktop PC web preview</span>
                  
                  <div style={{
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    border: '1.5px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#0F172A',
                    height: '520px',
                    position: 'relative'
                  }}>
                    {/* Browser Toolbar top */}
                    <div style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '0.7rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <span style={{ width: '10px', height: '10px', background: '#EF4444', borderRadius: '50%' }} />
                        <span style={{ width: '10px', height: '10px', background: '#F59E0B', borderRadius: '50%' }} />
                        <span style={{ width: '10px', height: '10px', background: '#22C55E', borderRadius: '50%' }} />
                      </div>
                      <div style={{ background: '#FFFFFF', padding: '2px 1rem', borderRadius: '6px', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, flex: 1, border: '1px solid #E2E8F0' }}>
                        https://shopflow.platform.com/store/demo-brand
                      </div>
                    </div>

                    {/* PC Store Page */}
                    <div style={{ flex: 1, background: '#FFF8F6', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                      {/* Nav */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'white', alignItems: 'center' }}>
                        <span style={{ fontWeight: 950, fontSize: '1.2rem', color: '#4F46E5', fontFamily: 'Georgia, serif' }}>
                          {activeNiche === 'Cake' ? 'CakeFlow🍰' : activeNiche === 'Sneakers' ? 'SoleVault👟' : activeNiche === 'Accessories' ? 'RoseGold Atelier💍' : activeNiche === 'Handmade' ? 'Clay & Co.🎨' : 'Threads & Co.👕'}
                        </span>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>
                          <span>Collections</span>
                          <span>Customizer</span>
                          <span>Cart (0)</span>
                        </div>
                      </div>

                      {/* Content Split */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', padding: '2.2rem', flex: 1, alignItems: 'center' }}>
                        {/* Left: Product customized SVG display */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.02)', height: '280px', boxSizing: 'border-box' }}>
                          {activeNiche === 'Cake' && renderCakeSvg()}
                          {activeNiche === 'Sneakers' && renderSneakerSvg()}
                          {activeNiche === 'Accessories' && renderJewelrySvg()}
                          {activeNiche === 'Handmade' && renderPotterySvg()}
                          {activeNiche === 'Clothing' && renderApparelSvg()}
                        </div>

                        {/* Right: Meta & details */}
                        <div>
                          <div style={{ background: 'rgba(99, 102, 241, 0.08)', color: '#4F46E5', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', display: 'inline-block', fontWeight: 900, marginBottom: '0.5rem' }}>
                            PREVIEWING CUSTOM DEMO
                          </div>
                          <h2 style={{ fontSize: '1.4rem', fontWeight: 950, margin: '0 0 4px', lineHeight: 1.2 }}>
                            {activeNiche === 'Cake' ? 'Bespoke Celebration Layer Tier Cake' : activeNiche === 'Sneakers' ? 'Hyper-Street Suede Retro Highs' : activeNiche === 'Accessories' ? 'Monogram Custom Prong Solitaire Ring' : activeNiche === 'Handmade' ? 'Organic Speckled Stoneware Vase' : 'Heavyweight Oversized Street Hoodie'}
                          </h2>
                          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#4F46E5', margin: '6px 0 1rem' }}>
                            {activeNiche === 'Cake' ? '₹1,499' : activeNiche === 'Sneakers' ? '₹5,999' : activeNiche === 'Accessories' ? '₹2,490' : activeNiche === 'Handmade' ? '₹999' : '₹1,899'}
                          </div>

                          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '10px', fontSize: '0.75rem', lineHeight: 1.4, color: '#475569', fontWeight: 650, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <span style={{ fontWeight: 800, color: '#0F172A' }}>⚡ SELECTED SPECIFICATIONS:</span>
                            {activeNiche === 'Cake' && <>
                              <span>• Base Flavor: <b>{cakeFlavor.toUpperCase()}</b></span>
                              <span>• Topping Style: <b>{cakeTopping.toUpperCase()}</b></span>
                              <span>• Size Tiering: <b>{cakeTiers} TIERED BASE</b></span>
                              <span>• Pedestal Stand: <b>{cakeStand.toUpperCase()}</b></span>
                            </>}
                            {activeNiche === 'Sneakers' && <>
                              <span>• Lace Colorway: <b>{shoeLaces.toUpperCase()}</b></span>
                              <span>• Upper Panels: <b>{shoeUpper.toUpperCase()}</b></span>
                              <span>• Outsole Base: <b>{shoeSole.toUpperCase()} SOLE</b></span>
                            </>}
                            {activeNiche === 'Accessories' && <>
                              <span>• Metal Body: <b>{jewelMetal.toUpperCase()} GOLD</b></span>
                              <span>• Centered Gem: <b>{jewelGem.toUpperCase()} DIAMOND</b></span>
                              <span>• Monogram: <b>"{jewelText}"</b></span>
                            </>}
                            {activeNiche === 'Handmade' && <>
                              <span>• Clay Glazing: <b>{clayGlaze.toUpperCase()}</b></span>
                              <span>• Handle Style: <b>{clayHandle.toUpperCase()}</b></span>
                              <span>• Shape: <b>{clayShape.toUpperCase()}</b></span>
                            </>}
                            {activeNiche === 'Clothing' && <>
                              <span>• Fabric/Graphic: <b>{apparelPattern.toUpperCase()}</b></span>
                              <span>• Silhouette Fit: <b>{apparelFit.toUpperCase()}</b></span>
                              <span>• Chest Branding: <b>{apparelLogo.toUpperCase()}</b></span>
                            </>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MOBILE PREVIEW SHELL */}
              {(previewMode === 'both' || previewMode === 'mobile') && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: colors.textMuted, fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>Mobile Smartphone preview</span>
                  
                  {/* Smartphone Case Frame */}
                  <div style={{
                    width: '320px',
                    height: '520px',
                    background: '#1E293B',
                    borderRadius: '40px',
                    padding: '9px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                    border: '3px solid rgba(255,255,255,0.08)',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}>
                    {/* Speaker capsule notch */}
                    <div style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '14px', background: '#0F172A', borderRadius: '7px', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ width: '4px', height: '4px', background: '#38BDF8', borderRadius: '50%', marginRight: '3px' }} />
                      <span style={{ width: '25px', height: '2px', background: 'rgba(255,255,255,0.2)', borderRadius: '1px' }} />
                    </div>

                    {/* Smartphone Screen View */}
                    <div style={{
                      flex: 1,
                      background: '#FFFDFB',
                      borderRadius: '32px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      color: '#4A2C2A',
                      position: 'relative'
                    }}>
                      
                      {/* Mobile Storefront Header */}
                      <div style={{ padding: '24px 12px 10px 12px', background: '#FFFFFF', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 950, color: '#0F172A' }}>
                          {activeNiche === 'Cake' ? 'CakeFlow🍰' : activeNiche === 'Sneakers' ? 'SoleVault👟' : activeNiche === 'Accessories' ? 'RoseGold Atelier💍' : activeNiche === 'Handmade' ? 'Clay & Co.🎨' : 'Threads & Co.👕'}
                        </span>
                        <ShoppingBag size={16} />
                      </div>

                      {/* Mobile Storefront Body */}
                      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', boxSizing: 'border-box' }}>
                        
                        {/* Live customizable product container */}
                        <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '140px', marginBottom: '12px', boxSizing: 'border-box' }}>
                          <div style={{ transform: 'scale(0.8)' }}>
                            {activeNiche === 'Cake' && renderCakeSvg()}
                            {activeNiche === 'Sneakers' && renderSneakerSvg()}
                            {activeNiche === 'Accessories' && renderJewelrySvg()}
                            {activeNiche === 'Handmade' && renderPotterySvg()}
                            {activeNiche === 'Clothing' && renderApparelSvg()}
                          </div>
                        </div>

                        {/* Title and price */}
                        <h3 style={{ margin: '0 0 2px', fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.3 }}>
                          {activeNiche === 'Cake' ? 'Bespoke Celebration Layer Tier Cake' : activeNiche === 'Sneakers' ? 'Hyper-Street Suede Retro Highs' : activeNiche === 'Accessories' ? 'Monogram Custom Prong Solitaire Ring' : activeNiche === 'Handmade' ? 'Organic Speckled Stoneware Vase' : 'Heavyweight Oversized Street Hoodie'}
                        </h3>
                        <span style={{ fontSize: '1rem', fontWeight: 900, color: '#4F46E5', display: 'block', marginBottom: '8px' }}>
                          {activeNiche === 'Cake' ? '₹1,499' : activeNiche === 'Sneakers' ? '₹5,999' : activeNiche === 'Accessories' ? '₹2,490' : activeNiche === 'Handmade' ? '₹999' : '₹1,899'}
                        </span>

                        {/* Custom order form fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#F8FAFC', padding: '8px', borderRadius: '12px', border: '1px solid #E2E8F0', boxSizing: 'border-box' }}>
                          <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#64748B' }}>💬 BUYER SUBMISSION FIELDS:</span>
                          
                          {activeNiche === 'Cake' && (
                            <>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '3px' }}>
                                <span style={{ opacity: 0.7 }}>Flavor:</span>
                                <b>{cakeFlavor}</b>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '3px' }}>
                                <span style={{ opacity: 0.7 }}>Topping:</span>
                                <b>{cakeTopping}</b>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                                <span style={{ opacity: 0.7 }}>Weight Tiers:</span>
                                <b>{cakeTiers} Tiers</b>
                              </div>
                            </>
                          )}

                          {activeNiche === 'Sneakers' && (
                            <>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '3px' }}>
                                <span style={{ opacity: 0.7 }}>Laces:</span>
                                <b>{shoeLaces}</b>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '3px' }}>
                                <span style={{ opacity: 0.7 }}>Upper Styling:</span>
                                <b>{shoeUpper}</b>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                                <span style={{ opacity: 0.7 }}>Sole Structure:</span>
                                <b>{shoeSole}</b>
                              </div>
                            </>
                          )}

                          {activeNiche === 'Accessories' && (
                            <>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '3px' }}>
                                <span style={{ opacity: 0.7 }}>Metal Body:</span>
                                <b>{jewelMetal} Gold</b>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '3px' }}>
                                <span style={{ opacity: 0.7 }}>Gem Centred:</span>
                                <b>{jewelGem}</b>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                                <span style={{ opacity: 0.7 }}>Engraved:</span>
                                <b>"{jewelText}"</b>
                              </div>
                            </>
                          )}

                          {activeNiche === 'Handmade' && (
                            <>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '3px' }}>
                                <span style={{ opacity: 0.7 }}>Clay Glaze:</span>
                                <b>{clayGlaze}</b>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '3px' }}>
                                <span style={{ opacity: 0.7 }}>Handle Style:</span>
                                <b>{clayHandle}</b>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                                <span style={{ opacity: 0.7 }}>Cup Silhouette:</span>
                                <b>{clayShape}</b>
                              </div>
                            </>
                          )}

                          {activeNiche === 'Clothing' && (
                            <>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '3px' }}>
                                <span style={{ opacity: 0.7 }}>Fabric Pattern:</span>
                                <b>{apparelPattern}</b>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '3px' }}>
                                <span style={{ opacity: 0.7 }}>Apparel Fit:</span>
                                <b>{apparelFit}</b>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                                <span style={{ opacity: 0.7 }}>Logo Placement:</span>
                                <b>{apparelLogo}</b>
                              </div>
                            </>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SimulatorHub;
