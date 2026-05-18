import React, { useState, useEffect } from 'react';
import { CreditCard, MapPin, Truck, ChevronRight, ShieldCheck, Calendar, Clock, Edit2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('Credit / Debit Card');
  const [address, setAddress] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '', zip: ''
  });
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Afternoon (12:00 PM - 04:00 PM)');
  const [orderNotes, setOrderNotes] = useState('');
  
  // Coupon loading from localStorage
  const [discountRate, setDiscountRate] = useState(0);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    try {
      const activeCoupon = localStorage.getItem('cake_coupon');
      if (activeCoupon) {
        const parsed = JSON.parse(activeCoupon);
        setDiscountRate(parsed.rate);
        setCouponCode(parsed.code);
      }
    } catch(e) {
      console.error(e);
    }
  }, []);

  // Dynamic shop settings from admin dashboard
  const [shopSettings, setShopSettings] = useState({ deliveryFee: 10, freeDeliveryLimit: 50 });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cake_settings');
      if (stored) {
        setShopSettings(JSON.parse(stored));
      }
    } catch(e) {
      console.error(e);
    }
  }, []);

  // Price calculations
  const discountAmount = subtotal * discountRate;
  const deliveryFee = subtotal >= parseFloat(shopSettings.freeDeliveryLimit) ? 0 : parseFloat(shopSettings.deliveryFee);
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + deliveryFee + tax;

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!address.firstName || !address.lastName || !address.street || !address.city || !address.zip) {
      alert("Please fill in all delivery address fields before proceeding.");
      return;
    }
    if (!deliveryDate) {
      alert("Please select a delivery date.");
      return;
    }

    // Generate Order
    const orderId = `CF-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      customer: `${address.firstName} ${address.lastName}`,
      email: address.email,
      cake: cart[0]?.name + (cart.length > 1 ? ` + ${cart.length - 1} more` : ''),
      amount: `$${total.toFixed(2)}`,
      status: 'Placed',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      deliverySlot: { date: deliveryDate, time: deliverySlot },
      address: `${address.street}, ${address.city}, ${address.zip}`,
      notes: orderNotes,
      items: cart,
      subtotal: subtotal.toFixed(2),
      discount: discountAmount.toFixed(2),
      tax: tax.toFixed(2),
      deliveryFee: deliveryFee
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('cake_orders') || '[]');
      localStorage.setItem('cake_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch(e) {
      console.error(e);
    }

    // Clear state
    clearCart();
    localStorage.removeItem('cake_coupon');

    alert(`Order Placed Successfully! Your order ID is ${orderId}. Redirecting to tracking...`);
    navigate(`/tracking/${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '120px 5%', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--color-brown)', marginBottom: '3rem' }}>Add some delicious cakes to your cart before checking out!</p>
        <Link to="/birthday" className="btn-primary" style={{ padding: '1.2rem 3rem', textDecoration: 'none' }}>Browse Cakes</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 5% 6rem', maxWidth: '1300px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '3.5rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginTop: '40px' }}>Checkout</h1>
      
      <div className="cart-grid">
        
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
              <input value={address.firstName} onChange={e => setAddress({...address, firstName: e.target.value})} type="text" placeholder="First Name" className="checkout-input" required />
              <input value={address.lastName} onChange={e => setAddress({...address, lastName: e.target.value})} type="text" placeholder="Last Name" className="checkout-input" required />
              <input value={address.email} onChange={e => setAddress({...address, email: e.target.value})} type="email" placeholder="Email Address" className="checkout-input" style={{ gridColumn: 'span 2' }} required />
              <input value={address.street} onChange={e => setAddress({...address, street: e.target.value})} type="text" placeholder="Street Address" className="checkout-input" style={{ gridColumn: 'span 2' }} required />
              <input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} type="text" placeholder="City" className="checkout-input" required />
              <input value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} type="text" placeholder="Zip Code" className="checkout-input" required />
            </form>
          </section>

          {/* Delivery Slot scheduler */}
          <section className="card" style={{ padding: '3rem', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-cream)', borderRadius: '16px' }}>
                <Calendar size={28} color="var(--color-pink)" />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>Select Delivery Slot</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.8rem' }}>Preferred Date</label>
                <input type="date" required value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', fontSize: '1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.8rem' }}>Preferred Time Slot</label>
                <select value={deliverySlot} onChange={e => setDeliverySlot(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', fontSize: '1rem', background: 'white' }}>
                  <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                  <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.8rem' }}>Special Delivery Notes</label>
              <textarea value={orderNotes} onChange={e => setOrderNotes(e.target.value)} rows="3" placeholder="e.g. Leave with security guard, knock lightly, write 'Sweet Dreams' in icing, etc." style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', fontSize: '1rem', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>
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
        <aside className="mobile-sticky-summary">
          <div className="card" style={{ position: 'sticky', top: '120px', padding: '2.5rem', background: 'white', boxShadow: 'var(--shadow-medium)' }}>
            <h3 style={{ marginBottom: '2.5rem', fontSize: '1.8rem', fontWeight: 800 }}>Order Summary</h3>
            
            {/* Dynamic Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem', maxHeight: '300px', overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-cream)', paddingBottom: '1rem' }}>
                  <img src={item.image} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} alt={item.name} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--color-brown-dark)', fontSize: '1rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-brown)', opacity: 0.7, marginTop: '0.2rem', fontWeight: 600 }}>{item.weight} • Qty: {item.quantity}</div>
                    {item.customMessage && <div style={{ fontSize: '0.75rem', background: 'var(--color-cream)', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginTop: '0.3rem', color: 'var(--color-pink)', fontWeight: 800 }}>"{item.customMessage}"</div>}
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--color-brown-dark)' }}>
                    ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px solid var(--color-cream)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--color-brown)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discountRate > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--color-pink)' }}>
                  <span>Coupon Discount ({couponCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--color-brown)' }}>
                <span>Delivery</span>
                {deliveryFee === 0 ? (
                  <span style={{ color: '#4CAF50', fontWeight: 800 }}>Free</span>
                ) : (
                  <span>$10.00</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--color-brown)' }}>
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
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
                <span>${total.toFixed(2)}</span>
              </div>
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
              Confirm & Pay ${total.toFixed(2)}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginTop: '2rem', opacity: 0.6 }}>
              <ShieldCheck size={18} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Secure 256-bit SSL encrypted payment</span>
            </div>
          </div>
        </aside>
      </div>

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
    </div>
  );
};

export default CheckoutPage;
