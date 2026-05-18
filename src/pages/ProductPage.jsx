import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, Calendar, Clock, Minus, Plus, Heart, Share2, ChevronLeft, ShieldCheck, Sparkles, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [weight, setWeight] = useState('1kg');
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  
  const [zipCode, setZipCode] = useState('');
  const [zipEstimate, setZipEstimate] = useState(null);

  // Deep catalog dictionary
  const catalog = {
    "1": {
      id: 1,
      name: "Velvet Rose Dream",
      price: 45,
      rating: 4.9,
      reviews: 124,
      category: "Birthday",
      description: "A luxurious red velvet cake layered with silky cream cheese frosting and decorated with fresh organic roses. Perfect for romantic gestures and elegant celebrations.",
      ingredients: "Organic Flour, Madagascan Vanilla, Cocoa, Cream Cheese, Fresh Roses",
      images: [
        "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "101": {
      id: 101,
      name: "Confetti Celebration",
      price: 45,
      rating: 4.9,
      reviews: 82,
      category: "Birthday",
      description: "A classic moist vanilla cake filled with fun confetti sprinkles and layered with velvety sweet buttercream. Bringing absolute joy to children and adults alike!",
      ingredients: "Organic Flour, Vanilla Extract, Sprinkles, Butter, Sugar",
      images: [
        "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "102": {
      id: 102,
      name: "Superhero Theme",
      price: 65,
      rating: 4.8,
      reviews: 32,
      category: "Birthday",
      description: "Action-packed design celebrating your favorite heroes. Crafted with rich Belgian chocolate and premium icing toppings.",
      ingredients: "Chocolate, Cocoa, Cream, Sugar, Premium Fondant Decor",
      images: [
        "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "104": {
      id: 104,
      name: "Rainbow Swirl",
      price: 40,
      rating: 4.9,
      reviews: 74,
      category: "Birthday",
      description: "Vibrant spectrum layers of light vanilla sponge, decorated with swirling multi-color pastel cream. Absolutely mesmerizing!",
      ingredients: "Sponge Mix, Natural Food Dye, Meringue Icing, Passion Fruit Drizzle",
      images: [
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "106": {
      id: 106,
      name: "Elegant Floral Bday",
      price: 50,
      rating: 4.9,
      reviews: 95,
      category: "Birthday",
      description: "A breathtaking tiered combination of delicate pastel blossoms and cream swirls. An instant highlight for elegant parties.",
      ingredients: "Rosewater essence, white chocolate shards, egg whites, sweet sponge",
      images: [
        "https://images.unsplash.com/photo-1562233237-10d74499d8c1?auto=format&fit=crop&w=800&q=80"
      ]
    },
    "201": {
      id: 201,
      name: "Luxury White Lace",
      price: 450,
      rating: 5.0,
      reviews: 18,
      category: "Wedding",
      description: "Extravagant 3-tier masterwork decorated with edible delicate white lace frosting. The ultimate crown jewel of high-end wedding receptions.",
      ingredients: "Premium cake base, white chocolate mousse, vanilla bean caviar",
      images: [
        "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=800&q=80"
      ]
    }
  };

  // Find cake or fallback
  const cake = catalog[id] || {
    id: Number(id) || 1,
    name: "Artisanal Cake Creation",
    price: 42,
    rating: 4.8,
    reviews: 50,
    category: "Birthday",
    description: "A signature recipe lovingly created by our master baking team. Hand-crafted with organic ingredients and baked fresh daily.",
    ingredients: "Organic Flour, Madagascan Vanilla, Butter, Cocoa, Cream",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80"
    ]
  };

  const [mainImage, setMainImage] = useState(cake.images[0]);

  useEffect(() => {
    setMainImage(cake.images[0]);
    // Save to recently viewed
    const recentlyViewed = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
    const newItem = { id: cake.id, name: cake.name, image: cake.images[0], price: `$${cake.price}` };
    const filtered = recentlyViewed.filter(item => item.id !== cake.id);
    localStorage.setItem('recently_viewed', JSON.stringify([newItem, ...filtered].slice(0, 4)));
  }, [cake.id]);

  const handleAddToCart = () => {
    addToCart({
      id: cake.id,
      name: cake.name,
      price: `$${cake.price}`,
      weight: weight,
      quantity: quantity,
      image: cake.images[0],
      customMessage: customMessage
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleZipCheck = (e) => {
    e.preventDefault();
    if (!zipCode.trim() || zipCode.length < 5) {
      setZipEstimate("Invalid zip code");
      return;
    }
    const days = Math.floor(Math.random() * 2) + 1; // 1-2 days
    setZipEstimate(`Deliverable in ${days} days! Standard express fee applies.`);
  };

  const customerReviews = [
    { name: "Sarah K.", rating: 5, comment: "Absolutely delightful! The frosting is light and not overly sweet. Will buy again!", date: "2 days ago" },
    { name: "David M.", rating: 4, comment: "Stunning presentation. My daughters loved the design. Highly recommended.", date: "1 week ago" }
  ];

  const relatedCakes = [
    { id: 101, name: "Confetti Celebration", price: "$45", image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=200&q=80" },
    { id: 104, name: "Rainbow Swirl", price: "$40", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=200&q=80" },
    { id: 106, name: "Elegant Floral Bday", price: "$50", image: "https://images.unsplash.com/photo-1562233237-10d74499d8c1?auto=format&fit=crop&w=200&q=80" }
  ].filter(c => c.id !== cake.id);

  const isFav = isFavorite(cake.id);

  return (
    <div style={{ padding: '40px 5% 6rem', maxWidth: '1400px', margin: '0 auto' }}>
      
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'none', 
          border: 'none', 
          color: 'var(--color-brown)', 
          fontWeight: 800, 
          cursor: 'pointer',
          marginBottom: '2rem',
          opacity: 0.6,
          marginTop: '40px'
        }}
      >
        <ChevronLeft size={20} /> Back to Collection
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', marginBottom: '8rem' }}>
        
        {/* Gallery */}
        <div className="product-gallery">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-medium)', border: '8px solid white' }}
          >
            <motion.img 
              key={mainImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={mainImage} 
              alt={cake.name} 
              style={{ 
                width: '100%', 
                aspectRatio: '1/1',
                objectFit: 'cover',
                display: 'block'
              }} 
            />
            <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.9)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 900, color: 'var(--color-pink)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={14} /> SIGNATURE RECIPE
            </div>
          </motion.div>
          {cake.images.length > 1 && (
            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1.5rem' }}>
              {cake.images.map((img, i) => (
                <motion.img 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  src={img} 
                  onClick={() => setMainImage(img)}
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: 'var(--radius-md)', 
                    cursor: 'pointer',
                    border: mainImage === img ? '3px solid var(--color-pink)' : '2px solid white',
                    boxShadow: mainImage === img ? 'var(--shadow-glow)' : 'var(--shadow-soft)',
                    objectFit: 'cover'
                  }} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="product-info">
          <header style={{ marginBottom: '2.5rem' }}>
            <div style={{ color: 'var(--color-pink)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>
              PREMIUM SELECTION
            </div>
            <h1 style={{ fontSize: '4.5rem', marginBottom: '0.8rem', fontWeight: 900, color: 'var(--color-brown-dark)', lineHeight: 1 }}>
              {cake.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', color: '#FFD700', alignItems: 'center', gap: '0.4rem', fontSize: '1.2rem' }}>
                <Star size={22} fill="#FFD700" color="#FFD700" />
                <span style={{ fontWeight: 900, color: 'var(--color-brown-dark)' }}>{cake.rating}</span>
              </div>
              <span style={{ color: 'var(--color-brown)', fontWeight: 600, opacity: 0.6 }}>({cake.reviews} Verified Reviews)</span>
              <div style={{ height: '20px', width: '2px', backgroundColor: 'rgba(122, 78, 58, 0.1)' }}></div>
              <span style={{ color: '#4CAF50', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} /> Baked Fresh Daily
              </span>
            </div>
            <div style={{ 
              fontSize: '3.5rem', 
              fontWeight: 900, 
              marginTop: '2.5rem', 
              color: 'var(--color-brown-dark)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.8rem'
            }}>
              ${(cake.price * quantity).toFixed(2)}
              <span style={{ fontSize: '1.1rem', color: 'var(--color-brown)', opacity: 0.5, fontWeight: 700 }}>TAX INCLUDED</span>
            </div>
          </header>

          <p style={{ color: 'var(--color-brown)', marginBottom: '3rem', fontSize: '1.2rem', lineHeight: 1.8, fontWeight: 500 }}>
            {cake.description}
          </p>

          {/* Selectors */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ marginBottom: '1.2rem', fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>1. SELECT WEIGHT</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['0.5kg', '1kg', '2kg'].map(w => (
                <button 
                  key={w}
                  onClick={() => setWeight(w)}
                  style={{
                    padding: '1rem 2.5rem',
                    borderRadius: '20px',
                    border: weight === w ? 'none' : '2px solid var(--color-cream)',
                    background: weight === w ? 'var(--gradient-pink)' : 'white',
                    color: weight === w ? 'white' : 'var(--color-brown-dark)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    boxShadow: weight === w ? 'var(--shadow-glow)' : 'var(--shadow-soft)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h4 style={{ marginBottom: '1.2rem', fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>2. MESSAGE ON CAKE</h4>
            <input 
              type="text" 
              placeholder="e.g. Happy Birthday Sarah! 🎂" 
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                borderRadius: '20px',
                border: '2px solid var(--color-cream)',
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: 600,
                background: 'white',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          {/* Quantity Selector & Dual Buy Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem', 
                padding: '0.8rem 1.8rem', 
                background: 'white',
                border: '2px solid var(--color-cream)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-soft)'
              }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ color: 'var(--color-pink)' }}><Minus size={22} strokeWidth={3} /></button>
                <span style={{ fontWeight: 900, width: '40px', textAlign: 'center', fontSize: '1.3rem' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ color: 'var(--color-pink)' }}><Plus size={22} strokeWidth={3} /></button>
              </div>
              
              <button onClick={handleAddToCart} className="btn-secondary" style={{ 
                flex: 1, 
                fontSize: '1.2rem',
                fontWeight: 900,
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem'
              }}>
                <ShoppingCart size={20} /> Add to Cart
              </button>
              
              <button 
                onClick={() => toggleFavorite(cake)}
                style={{ 
                  width: '64px',
                  height: '64px',
                  border: '2px solid var(--color-cream)', 
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-soft)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <Heart size={28} fill={isFav ? "var(--color-pink)" : "none"} color={isFav ? "var(--color-pink)" : "var(--color-brown-dark)"} />
              </button>
            </div>

            <button onClick={handleBuyNow} className="btn-primary" style={{ 
              width: '100%', 
              fontSize: '1.2rem', 
              fontWeight: 900, 
              padding: '1.2rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.8rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              Buy Now & Express Checkout <ArrowRight size={20} />
            </button>
          </div>

          {/* Delivery Zip Estimate */}
          <div className="card" style={{ padding: '2rem', background: 'white', marginBottom: '3rem' }}>
            <h4 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 800 }}>Delivery Zip Estimator</h4>
            <form onSubmit={handleZipCheck} style={{ display: 'flex', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Enter Zip Code (e.g. 10001)" 
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '1rem', outline: 'none' }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', fontSize: '0.95rem' }}>Estimate</button>
            </form>
            {zipEstimate && (
              <div style={{ marginTop: '1rem', color: 'var(--color-pink)', fontWeight: 800, fontSize: '0.95rem' }}>
                {zipEstimate}
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '2px solid var(--color-cream)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--color-cream)', padding: '0.8rem', borderRadius: '50%' }}>
                <Truck size={24} color="var(--color-pink)" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>Express Delivery</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>On-time guarantee</div>
              </div>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '2px solid var(--color-cream)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--color-cream)', padding: '0.8rem', borderRadius: '50%' }}>
                <Calendar size={24} color="var(--color-pink)" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>Selectable Slots</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Choose date & time</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs for reviews / ingredients */}
      <section style={{ marginBottom: '6rem' }}>
        <div style={{ display: 'flex', borderBottom: '2px solid var(--color-cream)', marginBottom: '3rem', gap: '2rem' }}>
          {['description', 'ingredients', 'reviews'].map(t => (
            <button 
              key={t} 
              onClick={() => setActiveTab(t)}
              style={{
                padding: '1rem 0.5rem',
                fontSize: '1.2rem',
                fontWeight: 800,
                color: activeTab === t ? 'var(--color-pink)' : 'var(--color-brown)',
                borderBottom: activeTab === t ? '4px solid var(--color-pink)' : 'none',
                opacity: activeTab === t ? 1 : 0.6,
                textTransform: 'uppercase'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="card" style={{ padding: '3rem', background: 'white' }}>
          {activeTab === 'description' && <p style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>{cake.description}</p>}
          {activeTab === 'ingredients' && (
            <div>
              <h4 style={{ fontWeight: 800, marginBottom: '1rem' }}>Ingredients List</h4>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>{cake.ingredients}</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {customerReviews.map((r, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--color-cream)', paddingBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <div style={{ fontWeight: 800 }}>{r.name}</div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-brown)', opacity: 0.6 }}>{r.date}</span>
                  </div>
                  <div style={{ display: 'flex', color: '#FFD700', gap: '0.1rem', marginBottom: '0.8rem' }}>
                    {[...Array(r.rating)].map((_, idx) => <Star key={idx} size={16} fill="#FFD700" color="#FFD700" />)}
                  </div>
                  <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-brown-dark)', fontStyle: 'italic' }}>"{r.comment}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Cakes */}
      {relatedCakes.length > 0 && (
        <section>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '3rem', color: 'var(--color-brown-dark)' }}>
            Related <span style={{ color: 'var(--color-pink)' }}>Cakes</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem' }}>
            {relatedCakes.map(item => (
              <motion.div 
                key={item.id} 
                whileHover={{ y: -5 }} 
                style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(122, 78, 58, 0.05)', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column' }}
              >
                <img src={item.image} style={{ width: '100%', aspectRatio: '1.2/1', objectFit: 'cover' }} />
                <div style={{ padding: '2rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 800 }}>{item.name}</h4>
                  <div style={{ color: 'var(--color-pink)', fontWeight: 900, fontSize: '1.3rem', marginBottom: '1.5rem' }}>{item.price}</div>
                  <Link to={`/product/${item.id}`} className="btn-secondary" style={{ display: 'block', textAlign: 'center', padding: '0.6rem', fontSize: '0.9rem', textDecoration: 'none' }}>View Details</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductPage;
