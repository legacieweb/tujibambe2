import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Car, Clock, Shield, CheckCircle } from 'lucide-react';

const UserCarBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/car-bookings/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching car bookings:', err);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div>Loading car hires...</div>;

  return (
    <div className="user-bookings-section fade-in">
      <div className="section-header-elite">
        <div className="title-area">
          <span className="subtitle-pill">Your Fleet</span>
          <h2>My <span className="text-gradient">Car Hires</span></h2>
        </div>
        <button className="btn-modern-primary sm" onClick={() => window.location.href='/car-hire'}>Rent New Vehicle</button>
      </div>

      {bookings.length > 0 ? (
        <div className="car-bookings-grid-elite">
          {bookings.map((booking) => (
            <div key={booking._id} className="car-booking-card-elite">
              <div className="car-visual-section">
                <img src={booking.vehicle.image} alt={booking.vehicle.name} />
                <div className="car-overlay-badges">
                  <span className={`status-pill-modern ${booking.status}`}>{booking.status}</span>
                  <div className="car-category-badge"><Car size={12} /> Premium</div>
                </div>
              </div>
              <div className="car-info-section">
                <div className="car-info-header">
                  <h3>{booking.vehicle.name}</h3>
                  <div className="car-price-display">
                    <span className="currency">$</span>
                    <span className="amount">{booking.totalPrice}</span>
                  </div>
                </div>
                
                <div className="car-specs-mini">
                  <div className="spec-tag"><Clock size={14} /> 4 Days</div>
                  <div className="spec-tag"><Shield size={14} /> Fully Insured</div>
                </div>

                <div className="car-route-details">
                  <div className="route-step">
                    <div className="route-icon pickup"></div>
                    <div className="route-text">
                      <small>Pickup</small>
                      <span>{booking.pickupLocation}</span>
                      <time>{new Date(booking.startDate).toLocaleDateString()}</time>
                    </div>
                  </div>
                  <div className="route-line"></div>
                  <div className="route-step">
                    <div className="route-icon dropoff"></div>
                    <div className="route-text">
                      <small>Dropoff</small>
                      <span>{booking.dropoffLocation}</span>
                      <time>{new Date(booking.endDate).toLocaleDateString()}</time>
                    </div>
                  </div>
                </div>

                <div className="car-card-footer">
                  <button className="btn-secondary-modern">View Agreement</button>
                  {booking.status === 'pending' && (
                    <button className="btn-danger-link">Cancel Hire</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state-elite">
          <div className="empty-visual">
            <Car size={64} />
            <div className="road-line"></div>
          </div>
          <h3>Ready for a Road Trip?</h3>
          <p>You haven't rented any vehicles yet. Our premium fleet is waiting to take you on your next adventure.</p>
          <button className="btn-modern-primary lg" onClick={() => window.location.href='/car-hire'}>
            Browse Our Fleet
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCarBookings;
