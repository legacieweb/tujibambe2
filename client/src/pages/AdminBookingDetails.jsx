import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, Users, MapPin, Armchair, ArrowLeft, 
  Ticket, CheckCircle, ShieldCheck, CreditCard, 
  Compass, Mail, User, Hash, Info
} from 'lucide-react';
import '../styles/BookingDetails.css';

const AdminSeatLayout = ({ seats, capacity, bookedSeats }) => {
  const isBus = capacity > 20;
  const layoutClass = isBus ? 'bus-layout' : capacity > 10 ? 'van-layout' : 'mpv-layout';

  const renderSeats = () => {
    const seatElements = [];
    const currentSeats = seats?.map(String) || [];
    const othersBooked = bookedSeats?.map(String) || [];
    
    for (let i = 1; i <= capacity; i++) {
      const seatNum = i.toString();
      const isCurrentBookingSeat = currentSeats.includes(seatNum);
      const isBooked = othersBooked.includes(seatNum) && !isCurrentBookingSeat;
      
      // Add Aisle for Bus
      const showAisle = isBus && i % 2 === 0 && i % 4 !== 0;

      seatElements.push(
        <React.Fragment key={i}>
          <div 
            className={`seat-minimal ${isCurrentBookingSeat ? 'user' : ''} ${isBooked ? 'booked' : 'available'}`}
          >
            {isCurrentBookingSeat ? <div className="user-dot" /> : null}
            <span className="num">{i}</span>
          </div>
          {showAisle && <div className="seat-aisle-spacer"></div>}
        </React.Fragment>
      );
    }
    return seatElements;
  };

  return (
    <div className="modern-bus-viz admin-view">
      <div className="bus-front">
        <div className="steering-indicator">
          <Compass size={14} />
        </div>
      </div>
      <div className="bus-cabin">
        <div className={`seats-flow ${layoutClass}`}>
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

  const handleUpdateStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://tujibambe2.onrender.com/api/bookings/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooking({...booking, status: newStatus});
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  if (loading) return (
    <div className="modern-loading-container full-page">
      <div className="loading-pulse"></div>
      <p>Accessing secure records...</p>
    </div>
  );
  
  if (!booking) return (
    <div className="modern-loading-container full-page">
      <Info size={48} color="#ef4444" />
      <h3>Record not found</h3>
      <button className="minimal-back-btn" onClick={() => navigate('/admin')}>
        <ArrowLeft size={18} /> Return to Admin Panel
      </button>
    </div>
  );

  const vehicle = booking.trip?.vehicle || booking.vehicle;
  const bookedSeats = booking.trip?.bookedSeats || [];

  return (
    <div className="premium-details-page fade-in admin-version">
      <div className="details-header-nav">
        <button className="minimal-back-btn" onClick={() => navigate('/admin')}>
          <ArrowLeft size={18} /> Back to Admin Panel
        </button>
        <div className="header-meta">
          <span className="id-tag">ADMIN VIEW: #{booking._id.toUpperCase()}</span>
          <select 
            className={`status-pill-modern ${booking.status}`}
            value={booking.status}
            onChange={(e) => handleUpdateStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="premium-layout">
        <div className="layout-visual">
          <div className="main-hero-card admin-hero">
            <img 
              src={booking.tour?.image || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
              alt={booking.tour?.title} 
            />
            <div className="hero-content">
              <span className="category-tag">{booking.tour?.category}</span>
              <h1>{booking.tour?.title}</h1>
              <div className="loc-badge"><MapPin size={14} /> {booking.tour?.location}</div>
            </div>
          </div>

          <div className="admin-customer-card details-card-modern">
            <div className="card-head">
              <h2>Traveler Information</h2>
              <User size={20} color="#f97316" />
            </div>
            <div className="customer-info-grid">
              <div className="info-item">
                <User size={16} />
                <div>
                  <label>Full Name</label>
                  <p>{booking.user?.name}</p>
                </div>
              </div>
              <div className="info-item">
                <Mail size={16} />
                <div>
                  <label>Email Address</label>
                  <p>{booking.user?.email}</p>
                </div>
              </div>
              <div className="info-item">
                <Hash size={16} />
                <div>
                  <label>Payment Reference</label>
                  <p className="ref-text">{booking.paymentReference || 'No Reference'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overview-cards">
            <div className="ov-card">
              <Calendar size={20} className="ov-icon" />
              <div>
                <label>Trip Date</label>
                <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="ov-card">
              <Users size={20} className="ov-icon" />
              <div>
                <label>Group Size</label>
                <span>{booking.numberOfPeople} Person(s)</span>
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
        </div>

        <div className="layout-controls">
          <div className="vehicle-management-card">
            <div className="card-head">
              <h3><Armchair size={18} /> Vehicle & Seat Map</h3>
              <div className="v-badge-minimal">{vehicle?.name || 'Assigned Vehicle'}</div>
            </div>
            
            {vehicle?.image && (
              <div className="vehicle-preview-admin">
                <img src={vehicle.image} alt={vehicle.name} className="v-admin-img" />
              </div>
            )}
            
            <div className="vehicle-info-mini">
              <span><strong>Type:</strong> {vehicle?.type || 'N/A'}</span>
              <span><strong>Capacity:</strong> {vehicle?.capacity || 8} Seats</span>
            </div>

            <div className="v-admin-features">
              {vehicle?.features?.map((f, i) => (
                <span key={i} className="feat-pill">{f}</span>
              ))}
            </div>

            <AdminSeatLayout 
              seats={booking.selectedSeats} 
              capacity={vehicle?.capacity || 8}
              bookedSeats={bookedSeats}
            />

            <div className="minimal-legend">
              <div className="leg-item"><div className="dot user" /> This Customer</div>
              <div className="leg-item"><div className="dot booked" /> Other Bookings</div>
              <div className="leg-item"><div className="dot available" /> Empty</div>
            </div>
          </div>

          <div className="admin-actions-card details-card-modern">
            <div className="card-head">
              <h3>System Actions</h3>
              <ShieldCheck size={18} color="#f97316" />
            </div>
            <div className="action-buttons-stack">
              <button className="secondary-action-btn" onClick={() => window.print()}>
                Print Booking Receipt
              </button>
              {booking.isCoordinator && (
                <div className="coordinator-badge-large">
                  <ShieldCheck size={20} />
                  <span>TRIP COORDINATOR</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetails;
