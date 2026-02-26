import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, Users, MapPin, Armchair, Share2, ArrowLeft, 
  Ticket, CheckCircle, Clock, Info, ShieldCheck, CreditCard, 
  Compass, ChevronRight, Copy, HelpCircle
} from 'lucide-react';
import '../styles/Dashboard.css';

const SeatLayout = ({ seats, capacity, bookedSeats }) => {
  const renderSeats = () => {
    const seatElements = [];
    for (let i = 1; i <= capacity; i++) {
      const seatNum = i;
      const isMySeat = seats?.map(String).includes(seatNum.toString());
      const isBooked = bookedSeats?.map(String).includes(seatNum.toString()) && !isMySeat;
      
      seatElements.push(
        <div 
          key={i} 
          className={`seat-minimal ${isMySeat ? 'user' : ''} ${isBooked ? 'booked' : 'available'}`}
        >
          {isMySeat ? <div className="user-dot" /> : null}
          <span className="num">{seatNum}</span>
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
    navigator.clipboard.writeText(`${window.location.origin}/tours/${booking.tour?._id}?invite=${booking.trip.inviteCode}`);
    alert('Invite link copied!');
  };

  if (loading) return (
    <div className="modern-loading-container full-page">
      <div className="loading-pulse"></div>
      <p>Fine-tuning your itinerary...</p>
    </div>
  );
  if (!booking) return <div className="error">Booking not found.</div>;

  return (
    <div className="premium-details-page">
      <div className="details-header-nav">
        <button className="minimal-back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} /> Dashboard
        </button>
        <div className="header-meta">
          <span className="id-tag">REF: #{booking._id.slice(-6).toUpperCase()}</span>
          <span className={`status-pill-modern ${booking.status}`}>{booking.status}</span>
        </div>
      </div>

      <div className="premium-layout">
        {/* Left Side: Visual & Primary Info */}
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
                <label>Date</label>
                <span>{new Date(booking.bookingDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <div className="ov-card">
              <Users size={20} className="ov-icon" />
              <div>
                <label>Guests</label>
                <span>{booking.numberOfPeople} Person{booking.numberOfPeople > 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="ov-card">
              <CreditCard size={20} className="ov-icon" />
              <div>
                <label>Total</label>
                <span>{booking.currency === 'KES' ? 'KSh' : '$'}{booking.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="details-card-modern">
            <div className="card-head">
              <h2>Experience Details</h2>
              <ShieldCheck size={18} className="shield-v" />
            </div>
            <p className="description-text">{booking.tour?.description}</p>
            
            <div className="perks-row">
              {booking.tour?.isAllInclusive && (
                <div className="perk"><Ticket size={14} /> All-Inclusive</div>
              )}
              <div className="perk"><CheckCircle size={14} /> Instant Confirmation</div>
            </div>
          </div>
        </div>

        {/* Right Side: Vehicle & Trip Management */}
        <div className="layout-controls">
          <div className="vehicle-management-card">
            <div className="card-head">
              <h3><Armchair size={18} /> Seat Configuration</h3>
              <div className="v-badge-minimal">{booking.trip?.vehicle?.name || 'Safari Van'}</div>
            </div>
            
            <SeatLayout 
              seats={booking.selectedSeats} 
              capacity={booking.trip?.vehicle?.capacity || 8}
              bookedSeats={booking.trip?.bookedSeats}
            />

            <div className="minimal-legend">
              <div className="leg-item"><div className="dot user" /> Mine</div>
              <div className="leg-item"><div className="dot booked" /> Taken</div>
              <div className="leg-item"><div className="dot available" /> Open</div>
            </div>
          </div>

          {booking.trip && (
            <div className="invite-management-card">
              <div className="card-head">
                <h3><Share2 size={18} /> Group Trip</h3>
                <span className="type-t">Invite Active</span>
              </div>
              <p>Share this trip with your friends to travel together.</p>
              <div className="invite-box-minimal">
                <span className="code">{booking.trip.inviteCode}</span>
                <button onClick={copyInvite} title="Copy Link"><Copy size={16} /></button>
              </div>
            </div>
          )}

          <div className="help-section-card">
            <div className="help-info">
              <HelpCircle size={20} />
              <div>
                <h4>Support & Help</h4>
                <p>24/7 access to our team</p>
              </div>
            </div>
            <button className="secondary-action-btn" onClick={() => navigate('/contact')}>
              Contact Support <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;