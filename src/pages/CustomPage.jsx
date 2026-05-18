import React from 'react';
import CustomCakeForm from '../components/CustomCakeForm';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

const CustomPage = () => {
  return (
    <div style={{ padding: '40px 5% 120px', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ marginBottom: '5rem', marginTop: '60px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: 'var(--color-cream)', padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-xl)', color: 'var(--color-pink)', fontWeight: 800, marginBottom: '1.5rem', fontSize: '0.9rem' }}
        >
          <Palette size={18} />
          <span>BRING YOUR IMAGINATION TO LIFE</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '4.5rem', marginBottom: '1.2rem', fontWeight: 900, color: 'var(--color-brown-dark)', letterSpacing: '-2px' }}
        >
          Custom <span style={{ color: 'var(--color-pink)' }}>Creations</span>
        </motion.h1>
        <p style={{ color: 'var(--color-brown)', fontSize: '1.4rem', opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontWeight: 600 }}>
          Upload your inspiration, choose your flavors, and let our master bakers create a centerpiece that's uniquely yours.
        </p>
      </header>

      <CustomCakeForm />
    </div>
  );
};

export default CustomPage;
