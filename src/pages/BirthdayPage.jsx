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
      <header style={{ marginBottom: '5rem', marginTop: '60px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: 'var(--color-cream)', padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-xl)', color: 'var(--color-pink)', fontWeight: 800, marginBottom: '1.5rem', fontSize: '0.9rem' }}
        >
          <Sparkles size={18} />
          <span>MAKE THEIR DAY MAGICAL</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '4rem', marginBottom: '1.2rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}
        >
          Birthday <span style={{ color: 'var(--color-pink)' }}>Celebrations</span>
        </motion.h1>
        <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
          From first birthdays to grand centennials, find the perfect cake for every milestone.
        </p>
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
