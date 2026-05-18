import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Truck, Heart, Palette, ChevronRight, Camera as IgIcon, MessageCircle, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CakeCard from '../components/CakeCard';
import cake3D from '../assets/cake_white_bg.png';
import floatingPastryImg from '../assets/floating_pastry.png';

const LandingPage = () => {
  const popularCakes = [
    { id: 1, name: "Velvet Rose Dream", price: "$45", rating: 4.9, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Chocolate Truffle", price: "$38", rating: 4.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Lemon Zest Bliss", price: "$42", rating: 4.7, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Berry Vanilla Spark", price: "$50", rating: 5.0, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80" },
  ];

  const { scrollY } = useScroll();
  const dripY1 = useTransform(scrollY, [0, 800], [0, 200]);
  const dripY2 = useTransform(scrollY, [0, 1000], [0, 280]);
  const dripY3 = useTransform(scrollY, [0, 600], [0, 150]);
  const pastryOpacity = useTransform(scrollY, [0, 2500, 3000], [1, 1, 0]);

  return (
    <div className="landing-page">
      {/* Hero Section Refined */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 5% 60px',
        background: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        {/* Background Decorative Elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'rgba(242, 140, 163, 0.08)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px', background: 'rgba(255, 214, 165, 0.15)', borderRadius: '50%', filter: 'blur(60px)' }}></div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: '55%', zIndex: 1 }}
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
            <Link to="/home" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1.2rem 3.5rem', boxShadow: 'var(--shadow-glow)' }}>Start Your Order</Link>
            <Link to="/wedding" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800, color: 'var(--color-brown-dark)', fontSize: '1.1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-soft)' }}>
                <Play size={20} fill="var(--color-pink)" color="var(--color-pink)" />
              </div>
              Explore Wedding Collection
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ width: '45%', position: 'relative', display: 'flex', justifyContent: 'center' }}
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

      {/* Popular Cakes */}
      <section style={{ padding: '10rem 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem' }}>
          <div>
            <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '0.5rem' }}>Our Signature Treats</h2>
            <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', fontWeight: 600, opacity: 0.7 }}>Handpicked favorites from our master pastry chefs.</p>
          </div>
          <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--color-pink)', fontSize: '1.1rem' }}>
            View Full Collection <ChevronRight size={22} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          {popularCakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Redesign */}
      <section style={{ padding: '10rem 5%', backgroundColor: 'var(--color-cream)', position: 'relative', overflow: 'hidden' }}>
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

      {/* Floating Pastry Follower with Realistic Scroll Drip */}
      <Link to="/exclusives" style={{ zIndex: 2500, display: 'block' }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          style={{
            position: 'fixed',
            bottom: '150px',
            right: '50px',
            width: '270px',
            height: '270px',
            zIndex: 2500,
            opacity: pastryOpacity,
            pointerEvents: 'auto',
            cursor: 'pointer'
          }}
        >
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
        </motion.div>
      </Link>

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
