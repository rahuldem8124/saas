import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CustomCakeForm = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    occasion: 'Birthday',
    flavor: 'Chocolate Truffle',
    weight: '1kg',
    message: '',
    color: '#F28CA3',
    date: '',
    instructions: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPriceEstimate = () => {
    let base = 50;
    if (formData.weight === '2kg') base += 40;
    if (formData.weight === '3kg+') base += 90;
    
    if (formData.occasion === 'Wedding') base += 100; // wedding design complexity fee
    return base;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceEstimate = getPriceEstimate();
    const customId = `custom-cake-${Date.now()}`;

    addToCart({
      id: customId,
      name: `Custom ${formData.occasion} Cake (${formData.flavor})`,
      price: `$${priceEstimate}`,
      weight: formData.weight,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?auto=format&fit=crop&w=400&q=80",
      customMessage: formData.message,
      color: formData.color,
      instructions: formData.instructions,
      date: formData.date,
      isCustom: true
    });

    alert(`Congratulations! Your custom cake design has been estimated at $${priceEstimate}.00 and successfully added to your cart. Guided to checkout...`);
    navigate('/checkout');
  };

  const estimate = getPriceEstimate();

  return (
    <div className="cart-grid" style={{ marginTop: '2rem' }}>
      {/* Form Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card"
        style={{ padding: '3rem', background: 'white' }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>Design Your Dream Cake</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="custom-form-row">
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Occasion</label>
              <select name="occasion" value={formData.occasion} className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }}>
                <option value="Birthday">Birthday</option>
                <option value="Wedding">Wedding</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Flavor</label>
              <select name="flavor" value={formData.flavor} className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }}>
                <option value="Chocolate Truffle">Chocolate Truffle</option>
                <option value="Vanilla Bean">Vanilla Bean</option>
                <option value="Red Velvet">Red Velvet</option>
                <option value="Butterscotch">Butterscotch</option>
              </select>
            </div>
          </div>

          <div className="custom-form-row">
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Weight</label>
              <select name="weight" value={formData.weight} className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }}>
                <option value="1kg">1kg (Single Tier)</option>
                <option value="2kg">2kg (Double Tier)</option>
                <option value="3kg+">3kg+ (Triple Tier)</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Delivery Date</label>
              <input type="date" name="date" required className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }} />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Cake Message</label>
            <input type="text" name="message" value={formData.message} placeholder="e.g. Happy Birthday Sarah" className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }} />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Theme Color</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input type="color" name="color" value={formData.color} onChange={handleChange} style={{ width: '50px', height: '50px', border: 'none', borderRadius: '50%', cursor: 'pointer', background: 'none' }} />
              <span style={{ fontWeight: 600, color: 'var(--color-brown)' }}>{formData.color}</span>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Reference Image</label>
            <div style={{ border: '2px dashed var(--color-pink)', padding: '2rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: 'var(--color-cream)', opacity: 0.8 }} onClick={() => alert('Reference upload mock active!')}>
              <Upload size={24} color="var(--color-pink)" style={{ marginBottom: '1rem', marginLeft: 'auto', marginRight: 'auto' }} />
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-brown)' }}>Click to upload reference</div>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Special Instructions</label>
            <textarea name="instructions" value={formData.instructions} rows="3" className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', resize: 'none' }} placeholder="Any specific requirements..."></textarea>
          </div>

          <button type="submit" className="btn-primary" style={{ padding: '1.2rem', marginTop: '1rem', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', boxShadow: 'var(--shadow-glow)' }}>
            Send Design & Add to Cart <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>

      {/* Preview Side */}
      <aside style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
          style={{ padding: '2.5rem', background: 'var(--color-cream)', border: '2px solid var(--color-pink)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Sparkles size={24} color="var(--color-pink)" />
              <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Live Preview</h3>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>
              Est. ${estimate}.00
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '20px', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', boxShadow: 'var(--shadow-soft)' }}>
            
            {/* Visual Multi-Tier Representation */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '220px' }}>
              {/* TIER 3 (Top - only shown for 3kg+) */}
              {formData.weight === '3kg+' && (
                <motion.div 
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  style={{ 
                    width: '100px', 
                    height: '50px', 
                    background: formData.color, 
                    borderRadius: '12px 12px 2px 2px',
                    boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.15)',
                    zIndex: 3,
                    borderBottom: '4px solid #fff'
                  }}
                />
              )}

              {/* TIER 2 (Middle - shown for 2kg & 3kg+) */}
              {(formData.weight === '2kg' || formData.weight === '3kg+') && (
                <motion.div 
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  style={{ 
                    width: '140px', 
                    height: '55px', 
                    background: formData.color, 
                    borderRadius: '14px 14px 2px 2px',
                    boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.15)',
                    zIndex: 2,
                    marginTop: formData.weight === '3kg+' ? '-8px' : '0',
                    borderBottom: '4px solid #fff'
                  }}
                />
              )}

              {/* TIER 1 (Base - always shown) */}
              <div style={{ 
                width: '180px', 
                height: '70px', 
                background: formData.color, 
                borderRadius: '18px 18px 5px 5px',
                position: 'relative',
                boxShadow: 'inset 0 -8px 20px rgba(0,0,0,0.15)',
                zIndex: 1,
                marginTop: (formData.weight === '2kg' || formData.weight === '3kg+') ? '-10px' : '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  width: '200px', 
                  height: '10px', 
                  background: 'rgba(0,0,0,0.08)', 
                  position: 'absolute',
                  bottom: '-5px',
                  borderRadius: '50%',
                  zIndex: 0
                }}></div>
                <div style={{ color: 'white', fontWeight: 900, textAlign: 'center', padding: '0.4rem', fontSize: '0.9rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)', wordBreak: 'break-word', maxWidth: '140px' }}>
                  {formData.message || 'YOUR TEXT'}
                </div>
              </div>
            </div>

            <div style={{ width: '100%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem', background: 'var(--color-cream)', borderRadius: '10px' }}>
                <span style={{ fontWeight: 700 }}>Flavor</span>
                <span style={{ fontWeight: 800, color: 'var(--color-pink)' }}>{formData.flavor}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem', background: 'var(--color-cream)', borderRadius: '10px' }}>
                <span style={{ fontWeight: 700 }}>Weight / Size</span>
                <span style={{ fontWeight: 800, color: 'var(--color-pink)' }}>{formData.weight}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem', background: 'var(--color-cream)', borderRadius: '10px' }}>
                <span style={{ fontWeight: 700 }}>Theme Accent</span>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: formData.color, border: '1px solid rgba(0,0,0,0.1)' }}></div>
              </div>
            </div>

          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--color-brown)', opacity: 0.7, textAlign: 'center', fontWeight: 600 }}>
            * This is an automated estimate. Final custom price might vary depending on detail requests.
          </p>
        </motion.div>
      </aside>
    </div>
  );
};

export default CustomCakeForm;
