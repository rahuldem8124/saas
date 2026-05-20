import React, { useState } from 'react';
import { Truck, LayoutDashboard, ShoppingBag, Package, Users, DollarSign, BarChart2, Ticket, Settings as SettingsIcon, Eye, MapPin, Clock, Plus, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';

const AdminDelivery = () => {
  const { user, switchRole } = useAuth();
  const { businesses } = useTenant();
  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { name: 'Payments', icon: <DollarSign size={20} />, path: '/admin/payments' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/admin/analytics' },
    { name: 'Delivery', icon: <Truck size={20} />, path: '/admin/delivery', active: true },
    { name: 'Coupons', icon: <Ticket size={20} />, path: '/admin/coupons' },
    { name: 'Settings', icon: <SettingsIcon size={20} />, path: '/admin/settings' },
    { name: 'Communication', icon: <MessageSquare size={20} />, path: '/admin/communication' }
  ];

  const [deliveryZones, setDeliveryZones] = useState([
    { zone: "Manhattan", fee: "$15.00", status: "Active", time: "2-4 hours" },
    { zone: "Brooklyn", fee: "$20.00", status: "Active", time: "3-5 hours" },
    { zone: "Queens", fee: "$25.00", status: "Limited", time: "4-6 hours" },
    { zone: "The Bronx", fee: "$30.00", status: "Inactive", time: "N/A" },
  ]);

  const [slots, setSlots] = useState([
    { time: "10:00 AM - 12:00 PM", status: "Full", count: 8 },
    { time: "02:00 PM - 04:00 PM", status: "Available", count: 3 },
    { time: "06:00 PM - 08:00 PM", status: "Available", count: 5 },
  ]);

  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [newZoneName, setNewZoneName] = useState("");

  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [newSlotTime, setNewSlotTime] = useState("");

  const confirmAddZone = () => {
    if (newZoneName.trim()) {
      setDeliveryZones([...deliveryZones, { zone: newZoneName, fee: "$15.00", status: "Active", time: "2-4 hours" }]);
      setNewZoneName("");
      setIsZoneModalOpen(false);
    }
  };

  const confirmAddSlot = () => {
    if (newSlotTime.trim()) {
      setSlots([...slots, { time: newSlotTime, status: "Available", count: 0 }]);
      setNewSlotTime("");
      setIsSlotModalOpen(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-cream)' }}>
      <aside style={{ width: '280px', backgroundColor: 'var(--color-white)', borderRight: '1px solid rgba(122, 78, 58, 0.1)', padding: '2.5rem 1.5rem', position: 'fixed', height: '100vh', boxSizing: 'border-box', zIndex: 1100, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', marginBottom: '2.5rem', color: 'var(--color-brown-dark)' }}>
          <div>{biz.name}</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-pink)', fontWeight: 900, textTransform: 'uppercase' }}>
            {biz.category} OPERATOR
          </span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
          {navItems.map(item => (
            <Link key={item.name} to={item.path} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.2rem', 
              padding: '1rem 1.2rem', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: item.active ? 'var(--color-cream)' : 'transparent',
              color: item.active ? 'var(--color-pink)' : 'var(--color-brown)', 
              fontWeight: item.active ? 800 : 700, 
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}>
              {item.icon} {item.name}
            </Link>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(122, 78, 58, 0.1)' }}>
            <Link to="/home" onClick={() => switchRole('user')} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.2rem', borderRadius: 'var(--radius-md)', color: 'var(--color-brown)', fontWeight: 700, textDecoration: 'none', opacity: 0.8 }}>
              <Eye size={20} /> Customer View
            </Link>
          </div>
        </nav>
      </aside>

      <main style={{ marginLeft: '280px', flex: 1, padding: '40px 4rem 4rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Delivery Logistics</h1>
            <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Manage delivery zones, fees, and time slots.</p>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
          <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Delivery Zones</h3>
              <button onClick={() => setIsZoneModalOpen(true)} className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', cursor: 'pointer' }}>+ Add Zone</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-cream)' }}>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Zone Name</th>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Delivery Fee</th>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Est. Time</th>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {deliveryZones.map((z, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-cream)' }}>
                    <td style={{ padding: '1.5rem 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 700, color: 'var(--color-brown-dark)' }}>
                        <MapPin size={18} color="var(--color-pink)" /> {z.zone}
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem 0', fontWeight: 800, color: 'var(--color-pink)' }}>{z.fee}</td>
                    <td style={{ padding: '1.5rem 0', fontWeight: 600 }}>{z.time}</td>
                    <td style={{ padding: '1.5rem 0' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        fontSize: '0.8rem', 
                        fontWeight: 800,
                        backgroundColor: z.status === 'Active' ? 'rgba(76, 175, 80, 0.1)' : z.status === 'Limited' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                        color: z.status === 'Active' ? '#2E7D32' : z.status === 'Limited' ? '#E65100' : '#C62828'
                      }}>{z.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
            <h3 style={{ marginBottom: '2.5rem', fontSize: '1.8rem', fontWeight: 800 }}>Time Slots</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {slots.map((s, i) => (
                <div key={i} style={{ 
                  padding: '1.5rem', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '2px solid var(--color-cream)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: s.status === 'Full' ? 'rgba(122, 78, 58, 0.05)' : 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Clock size={24} color={s.status === 'Full' ? 'var(--color-brown)' : 'var(--color-pink)'} />
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--color-brown-dark)' }}>{s.time}</div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.6, fontWeight: 600 }}>{s.count} orders booked</div>
                    </div>
                  </div>
                  <span style={{ 
                    fontWeight: 800, 
                    fontSize: '0.8rem', 
                    color: s.status === 'Full' ? '#F44336' : '#4CAF50' 
                  }}>{s.status.toUpperCase()}</span>
                </div>
              ))}
              <button onClick={() => setIsSlotModalOpen(true)} style={{ 
                marginTop: '1rem', 
                padding: '1.2rem', 
                border: '2px dashed var(--color-pink)', 
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-cream)',
                color: 'var(--color-pink)',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem'
              }}>
                <Plus size={20} /> Add New Slot
              </button>
            </div>
          </div>
        </div>

        {isZoneModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ background: 'white', padding: '2.5rem', width: '400px', borderRadius: 'var(--radius-xl)' }}>
              <h2 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Add Delivery Zone</h2>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Zone Name</label>
                <input 
                  type="text" 
                  value={newZoneName} 
                  onChange={(e) => setNewZoneName(e.target.value)} 
                  placeholder="e.g. Staten Island"
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '1rem', outline: 'none' }}
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button onClick={() => setIsZoneModalOpen(false)} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid rgba(122, 78, 58, 0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button onClick={confirmAddZone} className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', border: 'none', fontWeight: 600 }}>Add Zone</button>
              </div>
            </div>
          </div>
        )}

        {isSlotModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ background: 'white', padding: '2.5rem', width: '400px', borderRadius: 'var(--radius-xl)' }}>
              <h2 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Add Time Slot</h2>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Slot Time Range</label>
                <input 
                  type="text" 
                  value={newSlotTime} 
                  onChange={(e) => setNewSlotTime(e.target.value)} 
                  placeholder="e.g. 08:00 AM - 10:00 AM"
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '1rem', outline: 'none' }}
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button onClick={() => setIsSlotModalOpen(false)} style={{ padding: '0.8rem 1.5rem', background: 'transparent', border: '1px solid rgba(122, 78, 58, 0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button onClick={confirmAddSlot} className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer', border: 'none', fontWeight: 600 }}>Add Slot</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDelivery;
