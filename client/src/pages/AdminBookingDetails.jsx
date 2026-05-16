import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api/config';
import { 
  Calendar, Users, MapPin, Armchair, ArrowLeft, 
  CheckCircle, ShieldCheck, CreditCard, 
  Compass, HelpCircle, ChevronRight, User, Mail, Phone, Hash, Info, Zap
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

const AdminBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/api/bookings/${id}`, {
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

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_BASE_URL}/api/bookings/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooking({ ...booking, status: res.data.status });
      alert(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return null;

  if (!booking) return (
    <div className="modern-loading-container full-page">
      <HelpCircle size={48} color="#ef4444" />
      <h3>Booking not found</h3>
      <button className="minimal-back-btn" onClick={() => navigate('/admin')}>
        <ArrowLeft size={18} /> Return to Admin Panel
      </button>
    </div>
  );

  const isTour = booking.eventType === 'Tour' || !booking.eventType;
  const isEvent = booking.eventType === 'EventPlanning';
  const isEpic = booking.eventType === 'EpicFunTime';

  return (
    <div className="premium-details-page fade-in">
      <div className="details-header-nav">
        <button className="minimal-back-btn" onClick={() => navigate('/admin')}>
          <ArrowLeft size={18} /> Back to Admin Panel
        </button>
        <div className="header-meta">
          <span className="id-tag">ADMIN VIEW</span>
          <span className={`status-pill-modern ${booking.status}`}>{booking.status}</span>
        </div>
      </div>

      <div className="premium-layout">
        <div className="layout-visual">
          <div className="details-card-modern" style={{marginBottom: '2rem'}}>
            <div className="card-head">
              <h2>Customer Information</h2>
              <User size={20} color="#c2912e" />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div className="info-item">
                <label style={{fontSize: '0.75rem', color: '#888', display: 'block'}}>Full Name</label>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600}}>
                  <User size={14} /> {booking.user?.name || 'Unknown'}
                </div>
              </div>
              <div className="info-item">
                <label style={{fontSize: '0.75rem', color: '#888', display: 'block'}}>Email Address</label>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600}}>
                  <Mail size={14} /> {booking.user?.email || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className="main-hero-card">
            <img 
              src={booking.tour?.photo || booking.tour?.image || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
              alt={booking.tour?.title || booking.eventTitle} 
            />
            <div className="hero-content">
              <h1>{booking.tour?.title || booking.eventTitle}</h1>
              <div className="loc-badge"><MapPin size={14} /> {booking.tour?.location || 'Nairobi, Kenya'}</div>
            </div>
          </div>

          <div className="overview-cards">
            <div className="ov-card">
              <Calendar size={20} className="ov-icon" />
              <div>
                <label>{isEvent ? 'Planned Date' : 'Departure'}</label>
                <span>{new Date(booking.bookingDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <div className="ov-card">
              <Users size={20} className="ov-icon" />
              <div>
                <label>Capacity</label>
                <span>{booking.numberOfPeople} Guest{booking.numberOfPeople > 1 ? 's' : ''}</span>
              </div>
            </div>
            <div className="ov-card">
              <CreditCard size={20} className="ov-icon" />
              <div>
                <label>Revenue</label>
                <span>{booking.currency === 'KES' ? 'KSh' : '$'}{(booking.totalPrice || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="details-card-modern">
            <div className="card-head">
              <h2>Payment & Reference</h2>
              <ShieldCheck size={20} color="#c2912e" />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div className="info-item">
                <label style={{fontSize: '0.75rem', color: '#888'}}>Transaction Ref</label>
                <div style={{fontFamily: 'monospace', background: '#f8fafc', padding: '0.5rem', borderRadius: '4px'}}>
                  {booking.paymentReference || 'NO REFERENCE PROVIDED'}
                </div>
              </div>
              <div className="info-item">
                <label style={{fontSize: '0.75rem', color: '#888'}}>Payment Status</label>
                <span className={`status-pill-modern ${booking.paymentStatus}`} style={{marginLeft: '1rem'}}>
                  {booking.paymentStatus || 'pending'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="layout-controls">
          <div className="details-card-modern" style={{background: 'var(--booking-secondary)', color: 'white'}}>
            <div className="card-head">
              <h3 style={{color: 'white'}}>Admin Actions</h3>
              <Zap size={18} color="var(--booking-primary)" />
            </div>
            <p style={{fontSize: '0.875rem', opacity: 0.8, marginBottom: '1.5rem'}}>Manage this booking's lifecycle and verify payment fulfillment.</p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <button 
                className="btn-modern-primary" 
                onClick={() => updateStatus('confirmed')}
                disabled={updating || booking.status === 'confirmed'}
              >
                Confirm Booking
              </button>
              <button 
                className="btn-modern-secondary" 
                style={{color: 'white', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)'}}
                onClick={() => updateStatus('cancelled')}
                disabled={updating || booking.status === 'cancelled'}
              >
                Cancel Booking
              </button>
            </div>
          </div>

          {isTour && (
            <div className="vehicle-management-card">
              <div className="card-head">
                <h3><Armchair size={18} /> Reserved Seats</h3>
                <div className="v-badge-minimal">{booking.trip?.vehicle?.name || 'Safari Cruiser'}</div>
              </div>
              
              <SeatLayout 
                seats={booking.selectedSeats} 
                capacity={booking.trip?.vehicle?.capacity || 8}
                bookedSeats={booking.trip?.bookedSeats}
              />
            </div>
          )}

          <div className="help-section-card">
            <div className="help-info">
              <Info size={24} color="#1a2f23" />
              <div>
                <h4>Internal Note</h4>
                <p>System logs indicate this booking was created via {booking.paymentReference ? 'Online Gateway' : 'Manual Entry'}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetails;
