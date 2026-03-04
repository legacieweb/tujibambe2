import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, Users, MapPin, Armchair, Share2, ArrowLeft, 
  Ticket, CheckCircle, ShieldCheck, CreditCard, 
  Compass, Copy, HelpCircle, ChevronRight
} from 'lucide-react';
import '../styles/BookingDetails.css';

const SeatLayout = ({ seats, capacity, bookedSeats }) => {
  const renderSeats = () => {
    const seatElements = [];
    const mySeats = seats?.map(String) || [];
    const othersBooked = bookedSeats?.map(String) || [];
    
    for (let i = 1; i <= capacity; i++) {
      const seatNum = i.toString();
      const isMySeat = mySeats.includes(seatNum);
      const isBooked = othersBooked.includes(seatNum) && !isMySeat;
      
      seatElements.push(
        <div 
          key={i} 
          className={`seat-minimal ${isMySeat ? 'user' : ''} ${isBooked ? 'booked' : 'available'}`}
        >
          {isMySeat ? <div className="user-dot" /> : null}
          <span className="num">{i}</span>
        </div>
      );
    }
    return seatElements;
  };

  return (
    <div className="modern-bus-viz">
      <div className="bus-front">
        <div className="steering-indicator">
          <Compass size={14} />
        </div>
      </div>
      <div className="bus-cabin">
        <div className="seats-flow">
          {renderSeats()}
        </div>
      </div>
    </div>
  );
};

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem('token');
        // Use relative URL or process.env.REACT_APP_API_URL
        const res = await axios.get(`https://tujibambe2.onrender.com/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooking(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const copyInvite = () => {
    if (booking?.trip?.inviteCode) {
      const inviteUrl = `${window.location.origin}/tours/${booking.tour?._id}?invite=${booking.trip.inviteCode}`;
      navigator.clipboard.writeText(inviteUrl);
      alert('Invite link copied to clipboard!');
    }
  };

  if (loading) return (
    <div className="modern-loading-container full-page">
      <div className="loading-pulse"></div>
      <p>Fine-tuning your itinerary...</p>
    </div>
  );
  
  if (!booking) return (
    <div className="modern-loading-container full-page">
      <HelpCircle size={48} color="#ef4444" />
      <h3>Booking not found</h3>
      <button className="minimal-back-btn" onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={18} /> Return to Dashboard
      </button>
    </div>
  );

  return (
    <div className="premium-details-page fade-in">
      <div className="details-header-nav">
        <button className="minimal-back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="header-meta">
          <span className="id-tag">REF: #{booking._id.slice(-6).toUpperCase()}</span>
          <span className={`status-pill-modern ${booking.status}`}>{booking.status}</span>
        </div>
      </div>

      <div className="premium-layout">
        <div className="layout-visual">
          <div className="main-hero-card">
            <img 
              src={booking.tour?.photo || booking.tour?.image || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
              alt={booking.tour?.title} 
            />
            <div className="hero-content">
              <h1>{booking.tour?.title}</h1>
              <div className="loc-badge"><MapPin size={14} /> {booking.tour?.location}</div>
            </div>
          </div>

          <div className="overview-cards">
            <div className="ov-card">
              <Calendar size={20} className="ov-icon" />
              <div>
                <label>Departure</label>
                <span>{new Date(booking.bookingDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <div className="ov-card">
              <Users size={20} className="ov-icon" />
              <div>
                <label>Travelers</label>
                <span>{booking.numberOfPeople} Guest{booking.numberOfPeople > 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="ov-card">
              <CreditCard size={20} className="ov-icon" />
              <div>
                <label>Total Paid</label>
                <span>{booking.currency === 'KES' ? 'KSh' : '$'}{(booking.totalPrice || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="details-card-modern">
            <div className="card-head">
              <h2>Adventure Overview</h2>
              <ShieldCheck size={20} color="#c2912e" />
            </div>
            <p className="description-text">{booking.tour?.description}</p>
            
            <div className="perks-row">
              {booking.tour?.isAllInclusive && (
                <div className="perk"><Ticket size={14} /> All-Inclusive</div>
              )}
              <div className="perk"><CheckCircle size={14} /> Confirmed</div>
            </div>
          </div>
        </div>

        <div className="layout-controls">
          <div className="vehicle-management-card">
            <div className="card-head">
              <h3><Armchair size={18} /> Seat Selection</h3>
              <div className="v-badge-minimal">{booking.trip?.vehicle?.name || 'Safari Cruiser'}</div>
            </div>
            
            <SeatLayout 
              seats={booking.selectedSeats} 
              capacity={booking.trip?.vehicle?.capacity || 8}
              bookedSeats={booking.trip?.bookedSeats}
            />

            <div className="minimal-legend">
              <div className="leg-item"><div className="dot user" /> Reserved</div>
              <div className="leg-item"><div className="dot booked" /> Occupied</div>
              <div className="leg-item"><div className="dot available" /> Available</div>
            </div>
          </div>

          {booking.trip && (
            <div className="invite-management-card">
              <div className="card-head">
                <h3><Share2 size={18} /> Group Invitation</h3>
                <span className="type-t" style={{fontSize: '0.75rem', fontWeight: 700, color: '#c2912e'}}>ACTIVE</span>
              </div>
              <p style={{fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem'}}>Invite friends to join this specific departure and travel together.</p>
              <div className="invite-box-minimal">
                <span className="code">{booking.trip.inviteCode}</span>
                <button onClick={copyInvite} title="Copy Invitation Link"><Copy size={16} /></button>
              </div>
            </div>
          )}

          <div className="help-section-card">
            <div className="help-info">
              <HelpCircle size={24} color="#1a2f23" />
              <div>
                <h4>Need Assistance?</h4>
                <p>Our concierge team is available 24/7 for your travel needs.</p>
              </div>
            </div>
            <button className="secondary-action-btn" onClick={() => navigate('/contact')}>
              Get in Touch <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
