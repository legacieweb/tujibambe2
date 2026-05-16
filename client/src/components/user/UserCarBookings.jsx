import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api/config';
import { Car, MapPin, Calendar, Clock, ChevronRight, Fuel, Gauge, Shield, Users, Loader2 } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const UserCarBookings = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/vehicles`);
        setVehicles(res.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', 
        padding: '100px',
        gap: '20px',
        color: 'var(--user-text-muted)'
      }}>
        <Loader2 size={40} className="animate-spin" style={{ color: 'var(--user-accent)' }} />
        <p style={{ fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.1em' }}>RETRIEVING FLEET...</p>
      </div>
    );
  }

  return (
    <div className="user-car-bookings-modern">
      <div className="section-header-modern">
        <h1 className="section-title-modern">Premium Fleet</h1>
        <p className="section-subtitle-modern">Choose the perfect vehicle for your next adventure or executive travel</p>
      </div>

      <div className="car-rentals-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '30px'
      }}>
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="modern-card car-card-modern" style={{ padding: '0', overflow: 'hidden' }}>
            <div className="car-card-image" style={{
              backgroundImage: `url(${vehicle.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '220px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                height: '50%',
                background: 'linear-gradient(to top, var(--user-card-bg), transparent)'
              }}></div>
              <span className="car-tag" style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 77, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: '800',
                color: '#fff',
                textTransform: 'uppercase'
              }}>
                {vehicle.type}
              </span>
            </div>
            
            <div style={{ padding: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'white', margin: '0' }}>{vehicle.name}</h3>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--user-accent)', fontWeight: '900', fontSize: '1.2rem' }}>{formatPrice(vehicle.pricePerDay)}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--user-text-muted)', textTransform: 'uppercase' }}>Per Day</div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--user-text-muted)', fontSize: '0.85rem' }}>
                  <Users size={16} />
                  <span>{vehicle.capacity} Seats</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--user-text-muted)', fontSize: '0.85rem' }}>
                  <Fuel size={16} />
                  <span>{vehicle.fuel || 'Diesel'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--user-text-muted)', fontSize: '0.85rem' }}>
                  <Gauge size={16} />
                  <span>{vehicle.transmission || 'Manual'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--user-text-muted)', fontSize: '0.85rem' }}>
                  <Shield size={16} />
                  <span>Fully Insured</span>
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid var(--user-border)', paddingTop: '20px', display: 'flex', gap: '10px' }}>
                <button style={{
                  flex: '1',
                  background: 'var(--user-accent-gradient)',
                  border: 'none',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}>
                  Rent Now
                </button>
                <button style={{
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--user-border)',
                  color: '#fff',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="modern-card" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed var(--user-border)',
          background: 'rgba(255, 77, 0, 0.02)',
          minHeight: '400px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(255,77,0,0.1)',
            color: 'var(--user-accent)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '25px',
            transform: 'rotate(-10deg)'
          }}>
            <Shield size={40} />
          </div>
          <h4 style={{ fontWeight: '900', marginBottom: '15px', color: 'white', fontSize: '1.4rem' }}>Custom Logistics?</h4>
          <p style={{ color: 'var(--user-text-muted)', fontSize: '1rem', marginBottom: '30px', lineHeight: '1.6' }}>
            Need a long-term rental or a specialized fleet for your event? Contact our executive team.
          </p>
          <button style={{
            background: 'transparent',
            border: '1px solid var(--user-accent)',
            color: 'var(--user-accent)',
            padding: '12px 35px',
            borderRadius: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCarBookings;
