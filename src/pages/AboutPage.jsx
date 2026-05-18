import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div style={{ padding: '120px 5% 6rem', maxWidth: '800px', margin: '0 auto' }}>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '2rem' }}
      >
        Our Story
      </motion.h1>
      <div style={{ fontSize: '1.2rem', color: 'var(--color-brown)', lineHeight: '1.8', opacity: 0.8 }}>
        <p style={{ marginBottom: '1.5rem' }}>
          CakeFlow began with a simple mission: to bring the luxury bakery experience directly to your doorstep. Founded by master pastry chef Sarah Johnson in 2010, we've grown from a small neighborhood shop into a premium digital platform.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          We believe that every celebration, whether it's a first birthday or a golden wedding anniversary, deserves a centerpiece that is as unique as the occasion itself. That's why we combine traditional baking techniques with modern design aesthetics.
        </p>
        <p>
          Our team of dedicated bakers and designers work tirelessly to ensure that every cake that leaves our kitchen is a masterpiece of flavor and form.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
