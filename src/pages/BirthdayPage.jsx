import React from 'react';
import { motion } from 'framer-motion';
import CakeCard from '../components/CakeCard';
import { Sparkles, Gift, Camera, Star } from 'lucide-react';

const BirthdayPage = () => {
  const birthdayCakes = [
    { id: 101, name: "Confetti Celebration", price: "$45", rating: 4.9, weight: "1kg", category: "Birthday", image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=400&q=80" },
    { id: 102, name: "Superhero Theme", price: "$65", rating: 4.8, weight: "1.5kg", category: "Kids", image: "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=400&q=80" },
    { id: 103, name: "Photo Memory Cake", price: "$55", rating: 4.7, weight: "1kg", category: "Photo", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=400&q=80" },
    { id: 104, name: "Rainbow Swirl", price: "$40", rating: 4.9, weight: "1kg", category: "Birthday", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80" },
    { id: 105, name: "Dinosaur Jungle", price: "$70", rating: 4.8, weight: "2kg", category: "Kids", image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=400&q=80" },
    { id: 106, name: "Elegant Floral Bday", price: "$50", rating: 4.9, weight: "1kg", category: "Best Seller", image: "https://images.unsplash.com/photo-1562233237-10d74499d8c1?auto=format&fit=crop&w=400&q=80" },
    { id: 107, name: "Vanilla Bean Blast", price: "$42", rating: 4.8, weight: "1kg", category: "Birthday", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80" },
    { id: 108, name: "Chocolate Fudge Magic", price: "$55", rating: 4.9, weight: "1.5kg", category: "Best Seller", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=400&q=80" },
    { id: 109, name: "Unicorn Fantasy", price: "$75", rating: 5.0, weight: "2kg", category: "Kids", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=400&q=80" },
    { id: 110, name: "Custom Picture Cake", price: "$60", rating: 4.6, weight: "1.5kg", category: "Photo", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=400&q=80" },
  ];

  const sections = [
    { title: "Trending Birthday Cakes", icon: <Sparkles size={24} color="var(--color-pink)" />, filter: "Birthday" },
    { title: "Kids Theme Cakes", icon: <Gift size={24} color="var(--color-pink)" />, filter: "Kids" },
    { title: "Photo Cakes", icon: <Camera size={24} color="var(--color-pink)" />, filter: "Photo" },
    { title: "Best Sellers", icon: <Star size={24} color="var(--color-pink)" />, filter: "Best Seller" },
  ];

  return (
    <div style={{ padding: '40px 5% 120px', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ 
        position: 'relative',
        marginBottom: '5rem', 
        marginTop: '60px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(255, 248, 243, 0.9) 0%, rgba(255, 224, 229, 0.45) 100%)',
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
          background: 'rgba(242, 140, 163, 0.3)', 
          borderRadius: '50%', 
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />

        {/* Floating Sparkles decorative icons */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.2, color: 'var(--color-pink)' }}
        >
          <Sparkles size={32} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -15, 0] }}
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
            <Sparkles size={16} style={{ filter: 'drop-shadow(0 2px 4px rgba(242,140,163,0.3))' }} />
            <span>MAKE THEIR DAY MAGICAL</span>
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
            Birthday <span style={{ 
              background: 'linear-gradient(135deg, #FF6B8B 0%, #F28CA3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>Celebrations</span>
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
            From first birthdays to grand centennials, find the perfect cake for every milestone.
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

      {sections.map((section, idx) => (
        <section key={idx} style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ background: 'var(--color-cream)', padding: '0.8rem', borderRadius: '12px' }}>
              {section.icon}
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>{section.title}</h2>
          </div>

          <div className="responsive-grid">
            {birthdayCakes
              .filter(cake => cake.category === section.filter)
              .map(cake => (
                <CakeCard key={cake.id} cake={cake} />
              ))
            }
          </div>
        </section>
      ))}
    </div>
  );
};

export default BirthdayPage;
