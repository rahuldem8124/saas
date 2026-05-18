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
      {/* Wedding Hero Banner */}
      <section style={{ 
        height: '60vh', 
        background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        marginBottom: '6rem'
      }}>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}
        >
          Celebrate Your Forever
        </motion.h1>
        <p style={{ fontSize: '1.5rem', fontWeight: 500, maxWidth: '800px', opacity: 0.9 }}>
          Handcrafted luxury tiers designed for your most magical moments.
        </p>
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
