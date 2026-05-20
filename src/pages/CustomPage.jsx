import React from 'react';
import CustomCakeForm from '../components/CustomCakeForm';
import { motion } from 'framer-motion';
import { Palette, Sparkles } from 'lucide-react';

const CustomPage = () => {
  return (
    <div style={{ padding: '40px 5% 120px', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ 
        position: 'relative',
        marginBottom: '5rem', 
        marginTop: '60px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(255, 248, 243, 0.9) 0%, rgba(255, 235, 224, 0.5) 100%)',
        padding: '5rem 2rem',
        borderRadius: '32px',
        border: '1px solid rgba(122, 78, 58, 0.08)',
        boxShadow: '0 20px 50px rgba(122, 78, 58, 0.04)',
        overflow: 'hidden'
      }}>
        {/* Glassmorphic Ambient Glows */}
        <div style={{ 
          position: 'absolute', 
          top: '-30%', 
          left: '-10%', 
          width: '300px', 
          height: '300px', 
          background: 'rgba(255, 214, 165, 0.35)', 
          borderRadius: '50%', 
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />
        <div style={{ 
          position: 'absolute', 
          bottom: '-30%', 
          right: '-10%', 
          width: '350px', 
          height: '350px', 
          background: 'rgba(242, 140, 163, 0.25)', 
          borderRadius: '50%', 
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />

        {/* Floating Creative Icons */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.25, color: 'var(--color-pink)' }}
        >
          <Palette size={32} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '15%', right: '10%', opacity: 0.2, color: 'var(--color-pink)' }}
        >
          <Sparkles size={28} />
        </motion.div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Glassmorphic Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              background: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              padding: '0.6rem 1.6rem', 
              borderRadius: '30px', 
              color: 'var(--color-pink)', 
              fontWeight: 900, 
              marginBottom: '1.8rem', 
              fontSize: '0.8rem',
              letterSpacing: '2px',
              border: '1px solid rgba(242, 140, 163, 0.25)',
              boxShadow: '0 4px 15px rgba(242, 140, 163, 0.08)',
              textTransform: 'uppercase',
              cursor: 'default'
            }}
          >
            <Palette size={16} style={{ filter: 'drop-shadow(0 2px 4px rgba(242,140,163,0.3))' }} />
            <span>BRING YOUR IMAGINATION TO LIFE</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            style={{ 
              fontSize: '4.2rem', 
              marginBottom: '1.2rem', 
              fontWeight: 950, 
              color: 'var(--color-brown-dark)',
              letterSpacing: '-1.5px',
              textShadow: '0 2px 10px rgba(74, 44, 42, 0.03)'
            }}
          >
            Custom <span style={{ 
              background: 'linear-gradient(135deg, #FF6B8B 0%, #F28CA3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>Creations</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            style={{ 
              color: 'var(--color-brown)', 
              fontSize: '1.25rem', 
              lineHeight: '1.8',
              fontWeight: 600,
              opacity: 0.8, 
              maxWidth: '620px', 
              margin: '0 auto' 
            }}
          >
            Upload your inspiration, choose your flavors, and let our master bakers create a centerpiece that's uniquely yours.
          </motion.p>
          
          {/* Aesthetic Bottom Sparkle Divider */}
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 0.15, width: '120px' }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ 
              height: '2px', 
              background: 'var(--color-pink)', 
              margin: '2rem auto 0',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'var(--color-pink)',
              padding: '4px',
              borderRadius: '50%'
            }} />
          </motion.div>
        </div>
      </header>

      <CustomCakeForm />
    </div>
  );
};

export default CustomPage;
