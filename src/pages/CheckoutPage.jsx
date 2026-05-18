import React, { useState } from 'react';
import { CreditCard, MapPin, Truck, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Credit / Debit Card');
  const [address, setAddress] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '', zip: ''
  });

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!address.firstName || !address.lastName || !address.street || !address.city || !address.zip) {
      alert("Please fill in all address fields before proceeding.");
      return;
    }
    navigate('/tracking/1');
  };

  return (
    <div style={{ padding: '60px 5% 6rem', maxWidth: '1300px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '3.5rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginTop: '40px' }}>Checkout</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'start' }}>
        
        {/* Left Side: Forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Address Section */}
          <section className="card" style={{ padding: '3rem', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-cream)', borderRadius: '16px' }}>
                <MapPin size={28} color="var(--color-pink)" />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>Delivery Address</h3>
            </div>
            
            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <input value={address.firstName} onChange={e => setAddress({...address, firstName: e.target.value})} type="text" placeholder="First Name" className="checkout-input" />
              <input value={address.lastName} onChange={e => setAddress({...address, lastName: e.target.value})} type="text" placeholder="Last Name" className="checkout-input" />
              <input value={address.email} onChange={e => setAddress({...address, email: e.target.value})} type="text" placeholder="Email Address" className="checkout-input" style={{ gridColumn: 'span 2' }} />
              <input value={address.street} onChange={e => setAddress({...address, street: e.target.value})} type="text" placeholder="Street Address" className="checkout-input" style={{ gridColumn: 'span 2' }} />
              <input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} type="text" placeholder="City" className="checkout-input" />
              <input value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} type="text" placeholder="Zip Code" className="checkout-input" />
              <style>{`
                .checkout-input {
                  padding: 1.2rem;
                  border-radius: var(--radius-md);
                  border: 2px solid var(--color-cream);
                  font-family: var(--font-body);
                  background: white;
                  outline: none;
                  font-size: 1rem;
                  transition: all 0.2s ease;
                }
                .checkout-input:focus { 
                  border-color: var(--color-pink);
                  box-shadow: 0 0 0 4px rgba(242, 140, 163, 0.1);
                }
              `}</style>
            </form>
          </section>

          {/* Payment Section */}
          <section className="card" style={{ padding: '3rem', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-cream)', borderRadius: '16px' }}>
                <CreditCard size={28} color="var(--color-pink)" />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>Payment Method</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { name: 'Credit / Debit Card', icon: '💳' },
                { name: 'PayPal', icon: '🅿️' },
                { name: 'Apple Pay', icon: '🍎' }
              ].map(method => {
                const isSelected = paymentMethod === method.name;
                return (
                <div key={method.name} onClick={() => setPaymentMethod(method.name)} style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: isSelected ? '2.5px solid var(--color-pink)' : '2px solid var(--color-cream)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'rgba(242, 140, 163, 0.05)' : 'white',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>{method.icon}</span>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-brown-dark)' }}>{method.name}</span>
                  </div>
                  {isSelected && <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--color-pink)', boxShadow: '0 0 0 4px rgba(242, 140, 163, 0.2)' }}></div>}
                </div>
              )})}
            </div>
          </section>
        </div>

        {/* Right Side: Summary */}
        <aside>
          <div className="card" style={{ position: 'sticky', top: '120px', padding: '3rem', background: 'white', boxShadow: 'var(--shadow-medium)' }}>
            <h3 style={{ marginBottom: '2.5rem', fontSize: '1.8rem', fontWeight: 800 }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1.2rem' }}>
                <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=120&q=80" 
                  style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} 
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--color-brown-dark)', fontSize: '1.1rem' }}>Velvet Rose Dream</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-brown)', opacity: 0.7, marginTop: '0.3rem', fontWeight: 600 }}>1kg • Qty: 1</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--color-brown-dark)' }}>$45.00</div>
              </div>
            </div>

            <div style={{ borderTop: '2px solid var(--color-cream)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--color-brown)' }}>
                <span>Subtotal</span>
                <span>$45.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--color-brown)' }}>
                <span>Delivery</span>
                <span style={{ color: '#4CAF50', fontWeight: 800 }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--color-brown)' }}>
                <span>Tax</span>
                <span>$3.50</span>
              </div>
              <div style={{ 
                marginTop: '1.5rem', 
                paddingTop: '1.5rem', 
                borderTop: '2px dashed var(--color-pink)', 
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--color-pink)'
              }}>
                <span>Total</span>
                <span>$48.50</span>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '0.8rem' }}>
              <input type="text" placeholder="Promo Code" style={{
                flex: 1,
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--color-cream)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                outline: 'none'
              }} />
              <button className="btn-secondary" style={{ padding: '0 1.5rem', fontWeight: 800 }}>Apply</button>
            </div>

            <button onClick={handleConfirm} className="btn-primary" style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center', 
              marginTop: '2.5rem',
              fontSize: '1.2rem',
              padding: '1.2rem',
              boxShadow: 'var(--shadow-glow)',
              border: 'none',
              cursor: 'pointer'
            }}>
              Confirm & Pay $48.50
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginTop: '2rem', opacity: 0.6 }}>
              <ShieldCheck size={18} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Secure 256-bit SSL encrypted payment</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;

