import React from 'react';
import { Calendar, Users, Map, ChevronRight, MapPin } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const UserTours = ({ bookings }) => {
  const { formatPrice } = useCurrency();

  return (
    <div className="user-tours-modern">
      <div className="section-header-modern">
        <h1 className="section-title-modern">My Tour Bookings</h1>
        <p className="section-subtitle-modern">Manage your upcoming adventures and past explorations</p>
      </div>

      <div className="tours-grid-modern" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '25px'
      }}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="modern-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '180px' }}>
                <img 
                  src={booking.tour?.image || 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963'} 
                  alt={booking.tour?.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className={`status-badge ${booking.status?.toLowerCase()}`} style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: booking.status === 'confirmed' ? 'rgba(39, 174, 96, 0.9)' : 'rgba(255, 77, 0, 0.9)',
                  backdropFilter: 'blur(10px)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#fff'
                }}>
                  {booking.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>
              
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '15px', color: 'white' }}>{booking.tour?.title || 'Custom Tour'}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--user-text-muted)', fontSize: '0.9rem' }}>
                    <Calendar size={16} />
                    <span>{new Date(booking.bookingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--user-text-muted)', fontSize: '0.9rem' }}>
                    <Users size={16} />
                    <span>{booking.guests} {booking.guests > 1 ? 'Guests' : 'Guest'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--user-text-muted)', fontSize: '0.9rem' }}>
                    <MapPin size={16} />
                    <span>{booking.tour?.location || 'East Africa'}</span>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  borderTop: '1px solid var(--user-border)', 
                  paddingTop: '15px' 
                }}>
                  <div style={{ color: 'var(--user-accent)', fontWeight: '800', fontSize: '1.1rem' }}>
                    {formatPrice(booking.totalPrice || 0)}
                  </div>
                  <button style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--user-border)',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="modern-card" style={{
            gridColumn: '1 / -1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed var(--user-border)',
            background: 'transparent',
            minHeight: '380px',
            padding: '30px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'rgba(255,77,0,0.1)',
              color: 'var(--user-accent)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Map size={32} />
            </div>
            <h4 style={{ fontWeight: '800', marginBottom: '10px', color: 'white', fontSize: '1.2rem' }}>No tour bookings yet?</h4>
            <p style={{ color: 'var(--user-text-muted)', textAlign: 'center', fontSize: '0.95rem', marginBottom: '25px', lineHeight: '1.5' }}>
              Your future adventures will appear here. Start exploring our curated holiday packages!
            </p>
            <button style={{
              background: 'var(--user-accent-gradient)',
              border: 'none',
              color: '#fff',
              padding: '12px 30px',
              borderRadius: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 20px rgba(255, 77, 0, 0.2)'
            }}>
              Browse Tours
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTours;
