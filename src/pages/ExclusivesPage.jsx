import React from 'react';
import { motion } from 'framer-motion';
import CakeCard from '../components/CakeCard';
import { Crown, Star, Sparkles, Diamond } from 'lucide-react';

const ExclusivesPage = () => {
  const exclusiveCakes = [
    { id: 301, name: "The Royal Gold Tier", price: "$1200", rating: 5.0, weight: "10kg", category: "Grand", image: "https://images.unsplash.com/photo-1525257023410-c41252a3f970?auto=format&fit=crop&w=600&q=80" },
    { id: 302, name: "Diamond Encrusted Vanilla", price: "$950", rating: 4.9, weight: "8kg", category: "Luxury", image: "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=600&q=80" },
    { id: 303, name: "Midnight Velvet Sculpture", price: "$1100", rating: 5.0, weight: "7kg", category: "Sculpted", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&q=80" },
    { id: 304, name: "Billionaire's Berry Tower", price: "$1500", rating: 5.0, weight: "15kg", category: "Grand", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600&q=80" },
    { id: 305, name: "Platinum Rose Minimalist", price: "$800", rating: 4.9, weight: "6kg", category: "Luxury", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80" },
    { id: 306, name: "The Crystal Chandelier", price: "$2000", rating: 5.0, weight: "20kg", category: "Sculpted", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80" },
  ];

  const sections = [
    { title: "Grand Masterpieces", icon: <Crown size={24} color="#D4AF37" />, filter: "Grand" },
    { title: "Luxury Tiers", icon: <Diamond size={24} color="#D4AF37" />, filter: "Luxury" },
    { title: "Sculpted Art", icon: <Sparkles size={24} color="#D4AF37" />, filter: "Sculpted" },
  ];

  return (
    <div style={{ padding: '0 0 120px' }}>
      {/* Exclusives Hero Banner */}
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -2
          }}
        />
        {/* Royal Dark Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(5, 10, 25, 0.85) 0%, rgba(20, 20, 20, 0.7) 100%)',
          zIndex: -1
        }}></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: 'rgba(15, 20, 30, 0.65)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid rgba(212, 175, 55, 0.6)',
            borderRadius: '40px',
            padding: '4rem 6rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(212, 175, 55, 0.1)',
            maxWidth: '900px',
            width: '90%'
          }}
        >
          <motion.div
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
             style={{ 
               display: 'inline-block', 
               padding: '0.6rem 2rem', 
               background: 'linear-gradient(135deg, #D4AF37 0%, #AA8222 100%)', 
               borderRadius: '25px', 
               color: '#0A0A0A', 
               fontWeight: 800, 
               letterSpacing: '3px', 
               textTransform: 'uppercase', 
               fontSize: '0.85rem', 
               marginBottom: '2rem', 
               boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)'
             }}
          >
            The VIP Reserve
          </motion.div>
          <h1 style={{ fontSize: '5.5rem', fontWeight: 900, marginBottom: '1.5rem', color: 'white', textShadow: '0 4px 30px rgba(0,0,0,0.8)', lineHeight: 1.1 }}>
            CakeFlow <br />
            <span style={{ 
              fontFamily: 'Georgia, serif', 
              fontStyle: 'italic', 
              fontWeight: 600, 
              background: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 10px rgba(212,175,55,0.3))'
            }}>Exclusives</span>
          </h1>
          <p style={{ fontSize: '1.4rem', fontWeight: 400, color: 'rgba(255,255,255,0.85)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7, textShadow: '0 2px 15px rgba(0,0,0,0.6)' }}>
            Our most magnificent, towering grand cakes reserved for the most extravagant celebrations.
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
              {exclusiveCakes
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

export default ExclusivesPage;
