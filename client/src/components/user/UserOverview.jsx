import React from 'react';
import { 
  Ticket, DollarSign, Compass, Calendar, 
  Users, MapPin, ChevronRight, Share2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserOverview = ({ bookings }) => {
  const navigate = useNavigate();
  const totalSpent = bookings.reduce((sum, b) => {
    const amount = b.totalPrice || 0;
    return sum + (b.currency === 'KES' ? amount / 129 : amount);
  }, 0);
  const activeTrips = bookings.filter(b => b.status === 'active' || b.status === 'confirmed').length;

  return (
    <div className="user-grid-layout fade-in">
      {/* User Stats Strip */}
      <div className="stats-strip">
        <div className="mini-stat-card elite-card">
          <div className="stat-icon-box orange"><Ticket size={24} /></div>
          <div className="stat-val">
            <strong>{bookings.length}</strong>
            <span>Active Bookings</span>
          </div>
          <div className="stat-trend positive">+2 this month</div>
        </div>
        <div className="mini-stat-card elite-card">
          <div className="stat-icon-box green"><DollarSign size={24} /></div>
          <div className="stat-val">
            <strong>${totalSpent.toLocaleString()}</strong>
            <span>Total Investment</span>
          </div>
          <div className="stat-trend">Lifetime Value</div>
        </div>
        <div className="mini-stat-card elite-card">
          <div className="stat-icon-box blue"><Compass size={24} /></div>
          <div className="stat-val">
            <strong>{activeTrips}</strong>
            <span>Destinations Visited</span>
          </div>
          <div className="stat-trend positive">3 Countries</div>
        </div>
      </div>

      <div className="user-content-columns">
        {/* Primary List */}
        <section className="itinerary-section">
          <div className="section-head">
            <h2><Calendar size={20} /> Upcoming Adventures</h2>
            <div className="tab-filters">
              <button className="filter-chip active">All</button>
              <button className="filter-chip">Active</button>
              <button className="filter-chip">Completed</button>
            </div>
          </div>

          <div className="itinerary-list">
            {bookings.length === 0 ? (
              <div className="empty-user-state glass-panel fade-in">
                <div className="empty-state-visual">
                  <Compass size={64} />
                  <div className="pulse-ring"></div>
                </div>
                <h3>Start Your Journey</h3>
                <p>You haven't booked any adventures yet. The world is waiting for you!</p>
                <button className="btn-modern-primary lg" onClick={() => navigate('/tours')}>Explore Tours Now</button>
              </div>
            ) : (
              bookings.map(booking => (
                <div 
                  key={booking._id} 
                  className="itinerary-card elite-glass"
                  onClick={() => navigate(`/dashboard/booking/${booking._id}`)}
                >
                  <div className="trip-image-container">
                    <img 
                      src={booking.tour?.photo || booking.tour?.image || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                      alt={booking.tour?.title || 'Tour Image'} 
                    />
                    <div className="status-overlay">
                      <span className={`status-pill-modern ${booking.status}`}>{booking.status}</span>
                    </div>
                  </div>
                  <div className="trip-details-elite">
                    <div className="trip-header-row">
                      <h3>{booking.tour?.title || 'Tour details unavailable'}</h3>
                      <div className="trip-price-tag">
                        {booking.currency === 'KES' ? 'KSh' : '$'}{(booking.totalPrice || 0).toLocaleString()}
                      </div>
                    </div>
                    <p className="trip-description-short">{booking.tour?.description?.substring(0, 100)}...</p>
                    <div className="trip-meta-tags">
                      <div className="meta-tag"><Calendar size={14} /> {new Date(booking.bookingDate).toLocaleDateString()}</div>
                      <div className="meta-tag"><Users size={14} /> {booking.numberOfPeople} traveler{booking.numberOfPeople > 1 ? 's' : ''}</div>
                      <div className="meta-tag"><MapPin size={14} /> {booking.tour?.location || 'Location pending'}</div>
                    </div>
                    <div className="trip-footer-actions">
                      <button className="btn-details-link">Manage Booking <ChevronRight size={16} /></button>
                      <div className="trip-avatars-group">
                         {[1,2,3].map(i => <div key={i} className="mini-avatar"></div>)}
                         <span className="extra-count">+1</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Sidebar Widgets */}
        <aside className="user-widgets">
          <div className="widget-card-elite">
            <div className="widget-header">
              <h3><Share2 size={18} /> Social Groups</h3>
              <button className="add-btn">+</button>
            </div>
            <div className="widget-list">
              {bookings.filter(b => b.trip).length > 0 ? (
                bookings.filter(b => b.trip).slice(0, 3).map(b => (
                  <div key={b._id} className="social-group-item">
                    <div className="group-visual">{b.trip.inviteCode.slice(0, 2)}</div>
                    <div className="group-meta">
                      <strong>{b.tour?.title || 'Tour details'}</strong>
                      <div className="code-copy">
                         <span>Code: {b.trip.inviteCode}</span>
                         <Share2 size={12} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-widget-state">
                  <Users size={32} />
                  <p>Join or create a group trip.</p>
                </div>
              )}
            </div>
          </div>

          <div className="widget-card-elite promo-card">
            <div className="promo-background"></div>
            <div className="promo-body">
              <Compass size={40} className="floating-icon" />
              <h3>Safari Rally Elite</h3>
              <p>Exclusive access to VIP viewing areas and driver meetups.</p>
              <button className="btn-white-modern">Upgrade Now</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default UserOverview;
