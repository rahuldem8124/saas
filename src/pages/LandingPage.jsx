import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionTemplate } from 'framer-motion';
import { Star, Truck, Heart, Palette, ChevronRight, Camera as IgIcon, MessageCircle, Play, Sparkles, AlertTriangle, ArrowRight, ShieldCheck, Clock, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import CakeCard from '../components/CakeCard';
import cake3D from '../assets/cake_white_bg.png';
import floatingPastryImg from '../assets/floating_pastry.png';
import SaaSSandboxBanner from '../components/SaaSSandboxBanner';

const LandingPage = () => {
  const popularCakes = [
    { id: 1, name: "Velvet Rose Dream", price: "$45", rating: 4.9, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80", category: "Trending" },
    { id: 2, name: "Chocolate Truffle", price: "$38", rating: 4.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", category: "Best Seller" },
    { id: 3, name: "Lemon Zest Bliss", price: "$42", rating: 4.7, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=400&q=80", category: "Trending" },
    { id: 4, name: "Berry Vanilla Spark", price: "$50", rating: 5.0, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80", category: "Best Seller" },
  ];

  const categories = [
    { name: "Birthday Cakes", path: "/birthday", color: "#FFD6A5", image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=300&q=80", desc: "Magical custom birthday tiers." },
    { name: "Wedding Collection", path: "/wedding", color: "#FFE0E5", image: "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=300&q=80", desc: "Gold & floral luxury masterpieces." },
    { name: "Custom Studio", path: "/custom", color: "#FFF9E5", image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?auto=format&fit=crop&w=300&q=80", desc: "Designed by you, baked by experts." },
  ];

  const testimonials = [
    { name: "Jessica Miller", role: "Bride", review: "Our 3-tier floral wedding cake was an absolute masterpiece! It looked stunning and tasted like heaven.", stars: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
    { name: "Liam Thorne", role: "Parent", review: "The Dinosaur theme cake made my son's 5th birthday unforgettable. Incredible attention to detail!", stars: 5, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" },
    { name: "Sophia Khan", role: "Food Critic", review: "The WhatsApp ordering is so convenient. CakeFlow is truly the Shopify operating system for high-end bakers.", stars: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" }
  ];

  const igPosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80", likes: "1.2k" },
    { id: 2, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", likes: "849" },
    { id: 3, image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80", likes: "2.1k" },
    { id: 4, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=400&q=80", likes: "932" }
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
      setRecentlyViewed(items.slice(0, 4));
    } catch (e) {
      console.error("Failed to parse recently viewed items", e);
    }
  }, []);

  const { scrollY } = useScroll();
  
  // Advanced Scroll Physics
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Parallax Lag (Y offset) & Curved Path (X offset)
  const velocityYOffset = useTransform(smoothVelocity, [-1000, 0, 1000], [60, 0, -60]);
  const pathX = useTransform(scrollY, [0, 1000, 2000, 3000], [0, -50, 30, -20]);
  
  // Bouncing/Slowing near sections (approximate pixel heights)
  const sectionBounceY = useTransform(scrollY, [0, 700, 800, 1500, 1600], [0, 0, -25, 0, -25]);
  
  // Velocity Transformations (Tilt, Scale, Blur)
  const tilt = useTransform(smoothVelocity, [-1000, 0, 1000], isMobile ? [0, 0, 0] : [-12, 0, 12]);
  const velocityScale = useTransform(smoothVelocity, [-1000, 0, 1000], isMobile ? [1, 1, 1] : [0.92, 1, 0.92]);
  const blurAmount = useTransform(smoothVelocity, [-1500, 0, 1500], isMobile ? [0, 0, 0] : [3, 0, 3]);
  const blurFilter = useMotionTemplate`blur(${blurAmount}px)`;
  
  // Fade in/out
  const pastryOpacity = useTransform(scrollY, [0, 300, 2500, 3000], [0, 1, 1, 0]);

  // Sprinkle Trail Physics (Lagging behind main path)
  const sprinkleX1 = useSpring(pathX, { stiffness: 40, damping: 25 });
  const sprinkleY1 = useSpring(velocityYOffset, { stiffness: 40, damping: 25 });
  const sprinkleX2 = useSpring(pathX, { stiffness: 25, damping: 15 });
  const sprinkleY2 = useSpring(velocityYOffset, { stiffness: 25, damping: 15 });
  const sprinkleX3 = useSpring(pathX, { stiffness: 60, damping: 30 });
  const sprinkleY3 = useSpring(velocityYOffset, { stiffness: 60, damping: 30 });

  // Drips
  const dripY1 = useTransform(scrollY, [0, 800], [0, 200]);
  const dripY2 = useTransform(scrollY, [0, 1000], [0, 280]);
  const dripY3 = useTransform(scrollY, [0, 600], [0, 150]);

  return (
    <div className="landing-page" style={{ paddingTop: '80px' }}>
      
      {/* Dynamic Offer & Emergency Delivery Banners */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'var(--color-brown-dark)', color: 'white', padding: '0.6rem 5%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem', fontWeight: 700, zIndex: 10 }}>
          <Sparkles size={14} color="var(--color-pink)" />
          <span>USE CODE <b style={{ color: 'var(--color-pink)' }}>WELCOME10</b> FOR 10% OFF YOUR FIRST ORDER!</span>
        </div>
        <div style={{ background: 'var(--gradient-pink)', color: 'white', padding: '0.8rem 5%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', fontWeight: 800, zIndex: 10, boxShadow: 'var(--shadow-soft)' }}>
          <AlertTriangle size={16} />
          <span>NEED A CAKE TODAY? 🚨 CONTACT OUR INSTANT WHATSAPP LINE FOR EXPRESS 2-HOUR EMERGENCY DELIVERY!</span>
          <a href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'white', color: 'var(--color-pink)', padding: '0.3rem 1rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 900, marginLeft: '1rem' }}>
            CHAT NOW <ArrowRight size={12} />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-container" style={{ minHeight: 'calc(100vh - 120px)', paddingTop: '40px' }}>
        {/* Background Decorative Elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'rgba(242, 140, 163, 0.08)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px', background: 'rgba(255, 214, 165, 0.15)', borderRadius: '50%', filter: 'blur(60px)' }}></div>

        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              background: 'var(--color-white)',
              padding: '0.6rem 1.5rem',
              borderRadius: '25px',
              color: 'var(--color-pink)',
              fontWeight: 800,
              fontSize: '0.9rem',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-soft)',
              border: '1px solid rgba(242, 140, 163, 0.2)'
            }}
          >
            <Sparkles size={16} /> FRESHLY BAKED WITH PREMIUM INGREDIENTS
          </motion.div>
          <h1 style={{ fontSize: '6.5rem', lineHeight: 0.9, marginBottom: '2.5rem', fontWeight: 900, color: 'var(--color-brown-dark)', letterSpacing: '-2px' }}>
            Baking <span style={{ color: 'var(--color-pink)', fontStyle: 'italic' }}>Art</span> <br /> Into Every <br /> Single Slice.
          </h1>
          <p style={{ fontSize: '1.4rem', marginBottom: '3.5rem', color: 'var(--color-brown)', maxWidth: '600px', fontWeight: 500, lineHeight: 1.6, opacity: 0.9 }}>
            Elevate your celebrations with CakeFlow's artisanal creations. From Instagram-worthy designs to heavenly flavors, we deliver perfection.
          </p>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/birthday" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1.2rem 3.5rem', boxShadow: 'var(--shadow-glow)' }}>Start Your Order</Link>
            <Link to="/wedding" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800, color: 'var(--color-brown-dark)', fontSize: '1.1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-soft)' }}>
                <Play size={20} fill="var(--color-pink)" color="var(--color-pink)" />
              </div>
              Explore Wedding Collection
            </Link>
          </div>
        </motion.div>

        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div 
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 3, -2, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '650px',
              aspectRatio: '1/1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              perspective: '1000px'
            }}
          >
            <motion.img 
              whileHover={{ scale: 1.05, rotateY: 15, rotateX: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              src={cake3D} 
              alt="Premium 3D Cake" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                objectFit: 'contain', 
                mixBlendMode: 'multiply',
                filter: 'drop-shadow(0px 40px 30px rgba(122, 78, 58, 0.4))' 
              }}
            />
          </motion.div>
          {/* Floating badge */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'absolute', bottom: '40px', left: '-40px', background: 'white', padding: '1.5rem 2.5rem', borderRadius: '25px', boxShadow: 'var(--shadow-medium)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          >
            <div style={{ background: 'var(--color-cream)', padding: '0.8rem', borderRadius: '50%' }}>
              <Star size={24} fill="var(--color-peach)" color="var(--color-peach)" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.4rem' }}>4.9/5.0</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-brown)', fontWeight: 700 }}>5,000+ Happy Customers</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Popular Categories Section */}
      <section style={{ padding: '8rem 5% 4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
          Explore Our <span style={{ color: 'var(--color-pink)' }}>Collections</span>
        </h2>
        <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 5rem', fontWeight: 600, opacity: 0.8 }}>
          Delicious artisanal categories designed to wow your guests and elevate your feed.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -15, scale: 1.02 }}
              style={{
                background: 'white',
                borderRadius: '30px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-soft)',
                border: '2px solid var(--color-cream)'
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: cat.color, padding: '0.4rem 1.2rem', borderRadius: '15px', fontWeight: 900, fontSize: '0.75rem', color: 'var(--color-brown-dark)' }}>
                  TRENDING NOW
                </div>
              </div>
              <div style={{ padding: '2.5rem', textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.8rem', color: 'var(--color-brown-dark)' }}>{cat.name}</h3>
                <p style={{ color: 'var(--color-brown)', fontSize: '1rem', opacity: 0.7, marginBottom: '2rem', fontWeight: 600 }}>{cat.desc}</p>
                <Link to={cat.path} className="btn-secondary" style={{ display: 'inline-flex', padding: '0.8rem 2rem', fontSize: '0.9rem', width: '100%', boxSizing: 'border-box', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}>
                  Explore Category <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Signature Treats (Original Popular Cakes) */}
      <section style={{ padding: '8rem 5% 4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem' }}>
          <div>
            <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '0.5rem' }}>Our Signature Treats</h2>
            <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', fontWeight: 600, opacity: 0.7 }}>Handpicked favorites from our master pastry chefs.</p>
          </div>
          <Link to="/birthday" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--color-pink)', fontSize: '1.1rem' }}>
            View Full Collection <ChevronRight size={22} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          {popularCakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </section>

      {/* Trending & Bestsellers Section (Extensions) */}
      <section style={{ padding: '6rem 5% 4rem', backgroundColor: 'var(--color-white)' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Trending & <span style={{ color: 'var(--color-pink)' }}>Best Sellers</span>
          </h2>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', fontWeight: 600, opacity: 0.8 }}>
            These creations are taking Instagram by storm. Try one today!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {[
            { id: 104, name: "Rainbow Cream Swirl", price: "$40", rating: 4.9, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80", tag: "BEST SELLER" },
            { id: 106, name: "Elegant Floral Bday", price: "$50", rating: 4.9, image: "https://images.unsplash.com/photo-1562233237-10d74499d8c1?auto=format&fit=crop&w=400&q=80", tag: "TRENDING" },
            { id: 201, name: "Eternal White Lace", price: "$450", rating: 5.0, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80", tag: "LUXURY" }
          ].map((cake) => (
            <motion.div key={cake.id} whileHover={{ y: -10 }} style={{ background: 'var(--color-cream)', borderRadius: '24px', overflow: 'hidden', padding: '1rem', border: '1px solid rgba(122, 78, 58, 0.05)' }}>
              <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden' }}>
                <img src={cake.image} alt={cake.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--gradient-pink)', color: 'white', padding: '0.4rem 1rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 900 }}>
                  {cake.tag}
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>{cake.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FFD700', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  <Star size={16} fill="#FFD700" /> {cake.rating}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-pink)' }}>{cake.price}</span>
                  <Link to={`/product/${cake.id}`} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', textDecoration: 'none' }}>Order Now</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Seasonal Offers Section */}
      <section style={{ padding: '8rem 5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(74, 44, 42, 0.95) 0%, rgba(122, 78, 58, 0.9) 100%)',
          borderRadius: '40px',
          padding: '5rem',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          alignItems: 'center',
          gap: '4rem',
          boxShadow: 'var(--shadow-medium)'
        }}>
          {/* Decorative circular backgrounds */}
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '400px', height: '400px', background: 'rgba(242, 140, 163, 0.2)', borderRadius: '50%', filter: 'blur(70px)' }}></div>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.2rem', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-pink)', marginBottom: '2rem' }}>
              <Clock size={16} /> SEASONAL FLAVOR EVENT
            </div>
            <h2 style={{ fontSize: '4.5rem', fontWeight: 900, color: 'white', lineHeight: 1, marginBottom: '2rem' }}>
              Summer Berry <span style={{ color: 'var(--color-pink)', fontStyle: 'italic' }}>Jubilee</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '3rem', fontWeight: 500 }}>
              Enjoy our signature handpicked strawberry and raspberry mousse cakes with a premium <b style={{ color: 'white' }}>20% seasonal markdown</b>. Lovingly prepared with organic ingredients.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link to="/birthday" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1.1rem 3rem' }}>Shop Seasonal</Link>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 800 }}>PROMO CODE</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-pink)' }}>FESTIVE20</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&q=80" 
              alt="Seasonal Berry Cake" 
              style={{ width: '100%', maxWidth: '380px', borderRadius: '30px', border: '8px solid rgba(255,255,255,0.1)', boxShadow: 'var(--shadow-medium)', transform: 'rotate(3deg)' }} 
            />
          </div>
        </div>
      </section>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <section style={{ padding: '4rem 5% 6rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '3rem', color: 'var(--color-brown-dark)' }}>
            Recently <span style={{ color: 'var(--color-pink)' }}>Viewed</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
            {recentlyViewed.map((cake) => (
              <motion.div 
                key={cake.id} 
                whileHover={{ y: -5 }} 
                style={{ background: 'white', borderRadius: '20px', padding: '1rem', border: '1px solid rgba(122, 78, 58, 0.05)', boxShadow: 'var(--shadow-soft)', display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                <img src={cake.image} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>{cake.name}</h4>
                  <div style={{ color: 'var(--color-pink)', fontWeight: 900, marginTop: '0.3rem' }}>{cake.price}</div>
                  <Link to={`/product/${cake.id}`} style={{ fontSize: '0.8rem', color: 'var(--color-brown)', fontWeight: 700, textDecoration: 'underline', marginTop: '0.2rem', display: 'inline-block' }}>View Details</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Customer Testimonials Section */}
      <section style={{ padding: '8rem 5%', backgroundColor: 'var(--color-cream)', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '4.5rem', fontWeight: 900, color: 'var(--color-brown-dark)', letterSpacing: '-1px' }}>
            Sweet Reviews from <span style={{ color: 'var(--color-pink)' }}>Happy Clients</span>
          </h2>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', fontWeight: 600, opacity: 0.8 }}>
            Don't just take our word for it—see what our Instagram followers are raving about.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '30px',
                boxShadow: 'var(--shadow-soft)',
                border: '1px solid rgba(122, 78, 58, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', color: '#FFD700', gap: '0.2rem', marginBottom: '1.5rem' }}>
                  {[...Array(item.stars)].map((_, i) => <Star key={i} size={18} fill="#FFD700" color="#FFD700" />)}
                </div>
                <p style={{ color: 'var(--color-brown-dark)', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '2rem', fontWeight: 500 }}>
                  "{item.review}"
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.avatar} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} alt={item.name} />
                <div>
                  <h4 style={{ margin: 0, fontWeight: 900, fontSize: '1.1rem' }}>{item.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-pink)', fontWeight: 800 }}>{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instagram Gallery Section */}
      <section style={{ padding: '8rem 5% 10rem', backgroundColor: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
          Follow Us on <span style={{ color: 'var(--color-pink)', fontStyle: 'italic' }}>Instagram</span>
        </h2>
        <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 6rem', fontWeight: 600, opacity: 0.8 }}>
          Join our 50k+ family online! Double tap to satisfy your sweet cravings. 📸
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
          {igPosts.map((post) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-soft)',
                aspectRatio: '1/1',
                display: 'block'
              }}
            >
              <img src={post.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Instagram Post Mock" />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(74, 44, 42, 0.7)',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: '1.2rem',
                gap: '0.5rem',
                transition: 'opacity 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = 1}
              onMouseOut={(e) => e.currentTarget.style.opacity = 0}
            >
              <Heart fill="white" size={24} /> {post.likes}
            </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Why Choose Us Redesign */}
      <section style={{ padding: '8rem 5%', backgroundColor: 'var(--color-cream)', position: 'relative', overflow: 'hidden' }}>
        {/* Background blobs for depth */}
        <div style={{ position: 'absolute', top: 0, left: '-10%', width: '500px', height: '500px', background: 'rgba(242, 140, 163, 0.15)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: 0, right: '-10%', width: '600px', height: '600px', background: 'rgba(255, 214, 165, 0.2)', borderRadius: '50%', filter: 'blur(100px)' }}></div>

        <div style={{ textAlign: 'center', marginBottom: '6rem', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--color-brown-dark)', letterSpacing: '-1px' }}>
            The CakeFlow <span style={{ color: 'var(--color-pink)', fontStyle: 'italic' }}>Difference</span>
          </h2>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto', fontWeight: 500, opacity: 0.8 }}>We combine traditional baking techniques with modern design aesthetics to create unforgettable experiences.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', position: 'relative', zIndex: 2 }}>
          {[
            { icon: <Heart color="white" size={32} />, bg: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)", title: "Baked with Heart", desc: "We use only the finest organic ingredients and Madagascan vanilla for every creation." },
            { icon: <Palette color="white" size={32} />, bg: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", title: "Artistic Vision", desc: "Our decorators treat every cake as a canvas, ensuring a stunning center-piece for your event." },
            { icon: <Truck color="white" size={32} />, bg: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", title: "White Glove Delivery", desc: "Temperature-controlled delivery ensures your masterpiece arrives as fresh as it left the oven." },
            { icon: <IgIcon color="white" size={32} />, bg: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", title: "Social Highlight", desc: "Beautifully presented and packaged, our cakes are designed to be the talk of the party." },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ 
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                padding: '3rem 2.5rem',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 20px 40px rgba(122, 78, 58, 0.05)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{ 
                marginBottom: '2.5rem', 
                background: item.bg,
                padding: '1.2rem',
                borderRadius: '24px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-5deg)'
              }}>
                {item.icon}
              </div>
              <h3 style={{ marginBottom: '1.2rem', fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-brown)', lineHeight: 1.7, fontSize: '1.1rem', fontWeight: 500, opacity: 0.85 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Pastry Follower with Realistic Physics */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '150px',
          right: '50px',
          zIndex: 2500,
          opacity: pastryOpacity,
          pointerEvents: 'none',
        }}
      >
        {/* Soft Moving Shadow */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.1, 0.2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '15%',
            width: '70%',
            height: '20px',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(5px)',
            x: pathX,
          }}
        />

        {/* Sprinkle Trail */}
        {!isMobile && (
          <>
            <motion.div style={{ position: 'absolute', right: '-10px', top: '60px', x: sprinkleX1, y: sprinkleY1, width: '12px', height: '12px', background: '#F4EFE6', borderRadius: '50%', opacity: 0.9 }} />
            <motion.div style={{ position: 'absolute', left: '-20px', top: '140px', x: sprinkleX2, y: sprinkleY2, width: '8px', height: '24px', background: '#D4AF37', borderRadius: '4px', rotate: 45, opacity: 0.9 }} />
            <motion.div style={{ position: 'absolute', right: '40px', top: '-10px', x: sprinkleX3, y: sprinkleY3, width: '14px', height: '14px', background: '#F28CA3', borderRadius: '50%', opacity: 0.8 }} />
          </>
        )}
        {/* Main Cake Physics Wrapper */}
        <motion.div
          style={{
            x: pathX,
            y: velocityYOffset,
            scale: velocityScale,
            rotate: tilt,
            filter: blurFilter,
            pointerEvents: 'auto',
          }}
        >
          {/* Section Bounce Wrapper */}
          <motion.div style={{ y: sectionBounceY }}>
            {/* Gentle Floating Motion */}
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              style={{ width: '270px', height: '270px', cursor: 'pointer' }}
            >
              <Link to="/exclusives" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                {/* Scroll-linked Realistic Cream Drips */}
                <motion.div style={{ position: 'absolute', bottom: '60px', left: '25%', y: dripY1, zIndex: 1, marginLeft: '-10px' }}>
                  <svg viewBox="0 0 30 40" width="16" height="24" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }}>
                    <path d="M15 0 C15 0, 0 20, 0 30 C0 38.3, 6.7 40, 15 40 C23.3 40, 30 38.3, 30 30 C30 20, 15 0, 15 0 Z" fill="#F4EFE6" />
                  </svg>
                </motion.div>
                <motion.div style={{ position: 'absolute', bottom: '30px', left: '50%', y: dripY2, zIndex: 1, marginLeft: '-10px' }}>
                  <svg viewBox="0 0 30 40" width="22" height="32" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }}>
                    <path d="M15 0 C15 0, 0 20, 0 30 C0 38.3, 6.7 40, 15 40 C23.3 40, 30 38.3, 30 30 C30 20, 15 0, 15 0 Z" fill="#F4EFE6" />
                  </svg>
                </motion.div>
                <motion.div style={{ position: 'absolute', bottom: '45px', left: '75%', y: dripY3, zIndex: 1, marginLeft: '-10px' }}>
                  <svg viewBox="0 0 30 40" width="18" height="28" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' }}>
                    <path d="M15 0 C15 0, 0 20, 0 30 C0 38.3, 6.7 40, 15 40 C23.3 40, 30 38.3, 30 30 C30 20, 15 0, 15 0 Z" fill="#F4EFE6" />
                  </svg>
                </motion.div>

                <img 
                  src={floatingPastryImg} 
                  alt="Floating Pastry" 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    mixBlendMode: 'screen',
                    zIndex: 2
                  }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* WhatsApp Floating Button */}
      <motion.a 
        href="https://wa.me/yournumber" 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          width: '75px',
          height: '75px',
          background: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 15px 40px rgba(37, 211, 102, 0.4)',
          zIndex: 3000,
          textDecoration: 'none'
        }}
      >
        <MessageCircle size={40} fill="white" />
      </motion.a>
    </div>
  );
};

export default LandingPage;
