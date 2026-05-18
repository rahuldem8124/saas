import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles } from 'lucide-react';

const CustomCakeForm = () => {
  const [formData, setFormData] = useState({
    occasion: '',
    flavor: '',
    weight: '1kg',
    message: '',
    color: '#F28CA3',
    date: '',
    instructions: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '2rem' }}>
      {/* Form Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card"
        style={{ padding: '3rem', background: 'white' }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>Design Your Dream Cake</h2>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Occasion</label>
              <select name="occasion" className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }}>
                <option>Birthday</option>
                <option>Wedding</option>
                <option>Anniversary</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Flavor</label>
              <select name="flavor" className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }}>
                <option>Chocolate Truffle</option>
                <option>Vanilla Bean</option>
                <option>Red Velvet</option>
                <option>Butterscotch</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Weight</label>
              <select name="weight" className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }}>
                <option>1kg</option>
                <option>2kg</option>
                <option>3kg+</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Delivery Date</label>
              <input type="date" name="date" className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }} />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Cake Message</label>
            <input type="text" name="message" placeholder="e.g. Happy Birthday Sarah" className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }} />
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
            <div style={{ border: '2px dashed var(--color-pink)', padding: '2rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: 'var(--color-cream)', opacity: 0.8 }}>
              <Upload size={24} color="var(--color-pink)" style={{ marginBottom: '1rem' }} />
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-brown)' }}>Click to upload reference</div>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>Special Instructions</label>
            <textarea name="instructions" rows="3" className="form-input" onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', resize: 'none' }} placeholder="Any specific requirements..."></textarea>
          </div>

          <button className="btn-primary" style={{ padding: '1.2rem', marginTop: '1rem', fontSize: '1.1rem', fontWeight: 800 }}>
            Send Design for Quote
          </button>
        </form>
      </motion.div>

      {/* Preview Side */}
      <aside style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
          style={{ padding: '2rem', background: 'var(--color-cream)', border: '2px solid var(--color-pink)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
            <Sparkles size={24} color="var(--color-pink)" />
            <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Live Preview</h3>
          </div>

          <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', boxShadow: 'var(--shadow-soft)' }}>
            {/* Visual Representation */}
            <div style={{ 
              width: '180px', 
              height: '140px', 
              background: formData.color, 
              borderRadius: '20px 20px 5px 5px',
              position: 'relative',
              boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ 
                width: '200px', 
                height: '10px', 
                background: 'rgba(0,0,0,0.05)', 
                position: 'absolute',
                bottom: '-5px',
                borderRadius: '50%'
              }}></div>
              <div style={{ color: 'white', fontWeight: 900, textAlign: 'center', padding: '1rem', fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                {formData.message || 'HAPPY BDAY'}
              </div>
            </div>

            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem', background: 'var(--color-cream)', borderRadius: '10px' }}>
                <span style={{ fontWeight: 700 }}>Flavor</span>
                <span style={{ fontWeight: 800, color: 'var(--color-pink)' }}>{formData.flavor || 'Truffle'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem', background: 'var(--color-cream)', borderRadius: '10px' }}>
                <span style={{ fontWeight: 700 }}>Weight</span>
                <span style={{ fontWeight: 800, color: 'var(--color-pink)' }}>{formData.weight}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem', background: 'var(--color-cream)', borderRadius: '10px' }}>
                <span style={{ fontWeight: 700 }}>Theme</span>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: formData.color }}></div>
              </div>
            </div>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--color-brown)', opacity: 0.7, textAlign: 'center', fontWeight: 600 }}>
            * This is a visual representation. Final design may vary slightly based on actual reference image.
          </p>
        </motion.div>
      </aside>
    </div>
  );
};

export default CustomCakeForm;
