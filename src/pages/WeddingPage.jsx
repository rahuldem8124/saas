import React from 'react';
import { motion } from 'framer-motion';
import CakeCard from '../components/CakeCard';
import { Heart, Star, Sparkles, Utensils } from 'lucide-react';

const WeddingPage = () => {
  const weddingCakes = [
    { id: 201, name: "Eternal White Lace", price: "$450", rating: 5.0, weight: "5kg", category: "Luxury", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80" },
    { id: 202, name: "Gold Leaf 3-Tier", price: "$650", rating: 4.9, weight: "8kg", category: "3-tier", image: "https://images.unsplash.com/photo-1525257023410-c41252a3f970?auto=format&fit=crop&w=600&q=80" },
    { id: 203, name: "Reception Berry Semi-Naked", price: "$250", rating: 4.8, weight: "3kg", category: "Reception", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&q=80" },
    { id: 204, name: "Floral Cascade Tier", price: "$550", rating: 5.0, weight: "6kg", category: "Floral", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600&q=80" },
    { id: 205, name: "Modern Minimalist Luxury", price: "$400", rating: 4.9, weight: "4kg", category: "Luxury", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80" },
    { id: 206, name: "Rose Quartz 3-Tier", price: "$700", rating: 5.0, weight: "9kg", category: "3-tier", image: "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=600&q=80" },
  ];

  const sections = [
    { title: "Luxury Wedding Cakes", icon: <Sparkles size={24} color="#D4AF37" />, filter: "Luxury" },
    { title: "3-Tier Masterpieces", icon: <Star size={24} color="#D4AF37" />, filter: "3-tier" },
    { title: "Reception Specials", icon: <Utensils size={24} color="#D4AF37" />, filter: "Reception" },
    { title: "Floral Fantasies", icon: <Heart size={24} color="#D4AF37" />, filter: "Floral" },
  ];

  return (
    <div style={{ padding: '0 0 120px' }}>
      {/* Wedding Hero Banner Redesign */}
      <section style={{ 
        height: '70vh',
        minHeight: '600px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '6rem',
        overflow: 'hidden'
      }}>
        {/* Animated Background Image */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -2
          }}
        />
        {/* Gradient Overlay for Readability */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(74, 53, 44, 0.6) 0%, rgba(242, 140, 163, 0.4) 100%)',
          zIndex: -1
        }}></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '40px',
            padding: '4rem 6rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
            maxWidth: '900px',
            width: '90%'
          }}
        >
          <motion.div
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
             style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', color: 'white', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1.5rem' }}
          >
            The Wedding Collection
          </motion.div>
          <h1 style={{ fontSize: '5.5rem', fontWeight: 900, marginBottom: '1.5rem', color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.2)', lineHeight: 1.1 }}>
            Celebrate Your <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, color: '#FFE0E5' }}>Forever</span>
          </h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 400, color: 'rgba(255,255,255,0.95)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            Handcrafted luxury tiers designed for your most magical moments. Let our master bakers bring your dream cake to life.
          </p>
        </motion.div>
      </section>

      <div style={{ padding: '0 5%', maxWidth: '1400px', margin: '0 auto' }}>
        {sections.map((section, idx) => (
          <section key={idx} style={{ marginBottom: '6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '3rem', borderLeft: '4px solid #D4AF37', paddingLeft: '1.5rem' }}>
              <div style={{ background: '#FFF9E5', padding: '0.8rem', borderRadius: '12px' }}>
                {section.icon}
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, color: 'var(--color-brown-dark)' }}>{section.title}</h2>
            </div>

            <div className="responsive-grid">
              {weddingCakes
                .filter(cake => cake.category === section.filter)
                .map(cake => (
                  <CakeCard key={cake.id} cake={cake} />
                ))
              }
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default WeddingPage;
