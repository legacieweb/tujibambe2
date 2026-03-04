import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Armchair, 
  CheckCircle, 
  AlertCircle, 
  X, 
  ShieldCheck, 
  Car, 
  ArrowLeft,
  CreditCard,
  Info,
  ChevronRight,
  PartyPopper
} from 'lucide-react';
import '../styles/BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { formatPrice, currency, convertPrice } = useCurrency();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is authenticated
  if (!user) {
    return (
      <div className="auth-required-container">
        <div className="auth-required-content">
          <ShieldCheck size={64} />
          <h2>Authentication Required</h2>
          <p>Please log in or sign up to book this tour.</p>
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="btn-primary">
              Log In
            </button>
            <button onClick={() => navigate('/signup')} className="btn-secondary">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const [tour, setTour] = useState(null);
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [inviteTrip, setInviteTrip] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [vehicleOccupancy, setVehicleOccupancy] = useState({});
  
  useEffect(() => {
    let timer;
    if (showSuccessModal && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (showSuccessModal && countdown === 0) {
      navigate('/dashboard');
    }
    return () => clearInterval(timer);
  }, [showSuccessModal, countdown, navigate]);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [user, navigate, location]);

  useEffect(() => {
    const fetchTourAndVehicles = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const inviteCode = queryParams.get('invite');

        const [tourRes, vehiclesRes] = await Promise.all([
          axios.get(`https://tujibambe2.onrender.com/api/tours/${id}`),
          axios.get('https://tujibambe2.onrender.com/api/vehicles')
        ]);
        
        setTour(tourRes.data);
        setVehicles(vehiclesRes.data);
        
        if (inviteCode) {
          try {
            const inviteRes = await axios.get(`https://tujibambe2.onrender.com/api/bookings/invite/${inviteCode}`);
            setInviteTrip(inviteRes.data.trip);
            setSelectedVehicle(inviteRes.data.trip.vehicle);
            setBookedSeats(inviteRes.data.bookedSeats);
          } catch (err) {
            console.error("Invalid invite code", err);
            setSelectedVehicle(vehiclesRes.data[0]);
          }
        } else {
          setSelectedVehicle(vehiclesRes.data[0]);
        }
        
        if (tourRes.data.type === 'timed' && tourRes.data.eventDate) {
          setDate(new Date(tourRes.data.eventDate).toISOString().split('T')[0]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTourAndVehicles();
  }, [id, location.search]);

  useEffect(() => {
    const fetchAllVehicleOccupancy = async () => {
      if (date && vehicles.length > 0 && tour) {
        const occupancy = {};
        for (const v of vehicles) {
          try {
            const res = await axios.get(`https://tujibambe2.onrender.com/api/bookings/occupancy/${id}/${date}/${v._id}`);
            occupancy[v._id] = res.data; // { booked, total, percentage }
          } catch (err) {
            occupancy[v._id] = { booked: 0, total: v.capacity, percentage: 0 };
          }
        }
        setVehicleOccupancy(occupancy);
      }
    };
    fetchAllVehicleOccupancy();
  }, [date, vehicles, tour, id]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (date && tour && !inviteTrip) {
        try {
          const res = await axios.get(`https://tujibambe2.onrender.com/api/bookings/booked-seats/${id}/${date}`);
          setBookedSeats(res.data);
          setSelectedSeats(prev => prev.filter(s => !res.data.includes(s)));
        } catch (err) {
          console.error("Error fetching booked seats:", err);
        }
      }
    };
    fetchBookedSeats();
  }, [date, tour, id, inviteTrip]);

  const toggleSeat = (seatNum) => {
    if (bookedSeats.includes(seatNum) || bookedSeats.includes(seatNum.toString())) return;
    
    setSelectedSeats(prev => {
      const isSelected = prev.includes(seatNum);
      if (isSelected) {
        return prev.filter(s => s !== seatNum);
      } else {
        if (prev.length >= people) {
          return [...prev.slice(1), seatNum];
        }
        return [...prev, seatNum];
      }
    });
  };

  const calculateTotal = () => {
    if (!tour) return 0;
    const tourPrice = Number(tour.price) || 0;
    // Only charge vehicle price if not all-inclusive AND (is a coordinator OR not joining an existing trip)
    const shouldChargeVehicle = !tour.isAllInclusive && selectedVehicle && (isCoordinator || !inviteTrip);
    const vehiclePrice = shouldChargeVehicle ? (Number(selectedVehicle.pricePerDay) || 0) : 0;
    return (tourPrice * (Number(people) || 1)) + vehiclePrice;
  };

  const totalAmount = calculateTotal();
  const convertedTotal = convertPrice(totalAmount);
  
  const handleIyonicPay = () => {
    if (selectedSeats.length !== parseInt(people)) {
      alert(`Please select exactly ${people} seats.`);
      return;
    }

    if (window.IyonicPay) {
      const amount = parseFloat(convertedTotal.toFixed(2));
      window.IyonicPay.pay({
        username: 'tujibambe',
        amount: amount,
        currency: currency,
        description: `Booking for ${tour.title} - ${people} travelers`,
        onSuccess: (ref) => {
          handleBooking({ reference: ref });
        },
        onCancel: () => console.log('Payment cancelled')
      });
    } else {
      alert('IyonicPay SDK failed to load. Please try again later.');
    }
  };

  const handleBooking = async (reference) => {
    if (selectedSeats.length !== parseInt(people)) {
      alert(`Please select exactly ${people} seats.`);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const totalPriceUSD = calculateTotal(); 

      await axios.post('https://tujibambe2.onrender.com/api/bookings', {
        tour: id,
        bookingDate: date,
        numberOfPeople: people,
        totalPrice: totalPriceUSD,
        currency: 'USD',
        selectedSeats,
        isCoordinator,
        vehicleId: selectedVehicle?._id,
        tripId: inviteTrip?._id,
        paymentReference: reference?.reference
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert('Booking failed. Please contact support if your payment was successful.');
    }
  };

  if (loading) return (
    <div className="modern-loading-container">
      <div className="loading-pulse"></div>
      <p>Preparing your booking experience...</p>
    </div>
  );
  if (!tour) return <div className="error-state">Tour not found</div>;

  return (
    <>
      <div className="booking-page">
        <div className="booking-content-container">
        <div className="booking-main-panel">
          {bookingStep === 1 && (
            <div className="step-container fade-in">
              <div className="step-header">
                <h2>Trip Configuration</h2>
                <p className="step-subtitle">Customize your travel details to get started.</p>
              </div>
              
              <div className="booking-form-grid">
                <div className="form-group card-style">
                  <label><Calendar size={18} /> Travel Date</label>
                  <div className="input-wrapper">
                    <input 
                      type="date" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                      disabled={tour.type === 'timed'} 
                      className="booking-input"
                    />
                    {tour.type === 'timed' && <AlertCircle size={16} className="fixed-date-icon" />}
                  </div>
                  {tour.type === 'timed' && <p className="input-hint">This is a fixed-date event.</p>}
                </div>
                
                <div className="form-group card-style">
                  <label><Users size={18} /> Number of Travelers</label>
                  <div className="people-selector-modern">
                    <button 
                      className="count-btn" 
                      onClick={() => setPeople(Math.max(1, people - 1))}
                      aria-label="Decrease"
                    >-</button>
                    <div className="count-display">
                      <span className="count-value">{people}</span>
                      <span className="count-label">{people === 1 ? 'Traveler' : 'Travelers'}</span>
                    </div>
                    <button 
                      className="count-btn" 
                      onClick={() => setPeople(people + 1)}
                      aria-label="Increase"
                    >+</button>
                  </div>
                </div>
              </div>

              {tour.type === 'group' && (
                <div className="coordinator-selection-card">
                  <div className="coordinator-visual">
                    <div className="icon-circle">
                      <ShieldCheck size={28} />
                    </div>
                  </div>
                  <div className="coordinator-text">
                    <h3>Trip Coordinator</h3>
                    <p>Be the leader! Manage the group and invite others to join your vehicle.</p>
                  </div>
                  <div className="coordinator-toggle">
                    <label className="modern-switch">
                      <input 
                        type="checkbox" 
                        checked={isCoordinator} 
                        onChange={(e) => setIsCoordinator(e.target.checked)} 
                      />
                      <span className="switch-slider"></span>
                    </label>
                  </div>
                </div>
              )}

              <div className="step-footer">
                <button className="next-step-btn" onClick={() => setBookingStep(2)}>
                  Select Your Vehicle <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {bookingStep === 2 && (
            <div className="step-container fade-in">
              <div className="step-header-with-badge">
                <div className="step-title-area">
                  <h2>Vehicle & Seats</h2>
                  <p className="step-subtitle">Choose your preferred transport and select your seats.</p>
                </div>
                {inviteTrip && <span className="invite-badge">Group Trip Vehicle Locked</span>}
              </div>
              
              <div className="vehicle-selection-section">
                <label className="section-label"><Car size={18} /> Available Vehicles</label>
                <div className="vehicle-selection-grid-modern">
                  {Array.isArray(vehicles) && vehicles.map(v => (
                    <div 
                      key={v._id} 
                      className={`vehicle-card-modern ${selectedVehicle?._id === v._id ? 'selected' : ''} ${inviteTrip && selectedVehicle?._id !== v._id ? 'disabled' : ''}`}
                      onClick={() => {
                        if (!inviteTrip) {
                          setSelectedVehicle(v);
                          setSelectedSeats([]);
                        }
                      }}
                    >
                      <div className="v-card-image">
                        <img src={v.image} alt={v.name} />
                        <div className="v-card-badge">{v.capacity} Seats</div>
                        {selectedVehicle?._id === v._id && (
                          <div className="v-selected-check">
                            <CheckCircle size={24} fill="currentColor" />
                          </div>
                        )}
                      </div>
                      <div className="v-card-content">
                        <div className="v-card-header">
                          <h4>{v.name}</h4>
                          <span className="v-card-type">{v.type}</span>
                        </div>
                        
                        {vehicleOccupancy[v._id] && (
                          <div className="v-occupancy-container">
                            <div className="v-occupancy-header">
                              <span>Capacity</span>
                              <span className="v-occupancy-stats">
                                {vehicleOccupancy[v._id].booked}/{vehicleOccupancy[v._id].total} Booked
                              </span>
                            </div>
                            <div className="v-progress-bar-bg">
                              <div 
                                className="v-progress-bar-fill" 
                                style={{ 
                                  width: `${Math.min(100, vehicleOccupancy[v._id].percentage)}%`,
                                  backgroundColor: vehicleOccupancy[v._id].percentage > 90 ? '#ef4444' : 
                                                  vehicleOccupancy[v._id].percentage > 70 ? '#f59e0b' : '#10b981'
                                }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="v-card-price">
                          {tour.isAllInclusive ? (
                            <span className="v-inc">All-Inclusive</span>
                          ) : (
                            <div className="v-price-display">
                              <span className="v-amount">${v.pricePerDay}</span>
                              <span className="v-period">/ day</span>
                            </div>
                          )}
                        </div>
                        <div className="v-card-features">
                          {v.features?.slice(0, 3).map((f, idx) => (
                            <span key={idx} className="feat-pill">{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!vehicles || vehicles.length === 0) && <p>No vehicles available.</p>}
                </div>
              </div>

              <div className="seat-selection-integration-card">
                <div className="seat-card-visual">
                  <div className="seat-icon-container">
                    <Armchair size={32} />
                    <div className="seat-count-badge">{selectedSeats.length}</div>
                  </div>
                </div>
                <div className="seat-card-text">
                  <h3>Secure Your Seats</h3>
                  <p>
                    {selectedSeats.length === parseInt(people) 
                      ? "All travelers have seats assigned." 
                      : `Please select ${people - selectedSeats.length} more ${people - selectedSeats.length === 1 ? 'seat' : 'seats'}.`}
                  </p>
                </div>
                <button className="primary-outline-btn" onClick={() => setShowSeatModal(true)}>
                  {selectedSeats.length > 0 ? 'Modify Seats' : 'Pick Seats'}
                </button>
              </div>

              <div className="step-footer split">
                <button className="back-step-btn" onClick={() => setBookingStep(1)}>
                  <ArrowLeft size={18} /> Back
                </button>
                <button 
                  className="next-step-btn" 
                  disabled={selectedSeats.length !== parseInt(people)}
                  onClick={() => setBookingStep(3)}
                >
                  Review Booking <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {bookingStep === 3 && (
            <div className="step-container fade-in">
              <h2>Confirm Your Booking</h2>
              <div className="confirmation-summary">
                <div className="summary-item">
                  <MapPin size={20} />
                  <div>
                    <label>Destination</label>
                    <p>{tour.title}</p>
                  </div>
                </div>
                <div className="summary-item">
                  <Calendar size={20} />
                  <div>
                    <label>Date</label>
                    <p>{new Date(date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="summary-item">
                  <Users size={20} />
                  <div>
                    <label>Travelers</label>
                    <p>{people} {people === 1 ? 'Person' : 'People'}</p>
                  </div>
                </div>
                <div className="summary-item">
                  <Car size={20} />
                  <div>
                    <label>Vehicle Choice</label>
                    <p>{selectedVehicle?.name} ({selectedVehicle?.capacity} Seats)</p>
                    {selectedVehicle?.image && <img src={selectedVehicle.image} alt={selectedVehicle.name} style={{width: '60px', borderRadius: '4px', marginTop: '5px'}} />}
                  </div>
                </div>
                <div className="summary-item">
                  <Armchair size={20} />
                  <div>
                    <label>Seats</label>
                    <p>{selectedSeats.join(', ')}</p>
                  </div>
                </div>
                <div className="summary-item">
                  <CreditCard size={20} />
                  <div>
                    <label>Transport Fee</label>
                    <p>{formatPrice(Number(tour.price) || 0)} per person</p>
                  </div>
                </div>
              </div>

              <div className="policy-notice">
                <Info size={20} />
                <div className="policy-content">
                  <p><strong>Refund Policy:</strong> All payments are refundable after the 48 hours of the order cancellations on your dashboard.</p>
                  <p><strong>Auto-Shift Policy:</strong> Single-person vehicle bookings may be consolidated for efficiency on the final day.</p>
                  {tour.isAllInclusive && (
                    <p><strong>All-Inclusive Policy:</strong> This tour price covers all transport costs. You only pay for your seat in the vehicle.</p>
                  )}
                </div>
              </div>

              <div className="step-actions">
                <button className="back-step-btn" onClick={() => setBookingStep(2)}>Back</button>
                <button className="confirm-btn" onClick={handleIyonicPay}>
                   Pay with IyonicPay
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="booking-sidebar-panel">
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-tour-info">
              <img src={tour.image} alt={tour.title} />
              <div>
                <h4>{tour.title}</h4>
                <p>{tour.location}</p>
              </div>
            </div>
            
            <div className="price-breakdown">
              <div className="price-row">
                <span>{people} x Transport Fee</span>
                <span>{formatPrice((Number(tour.price) || 0) * (Number(people) || 1))}</span>
              </div>
              {selectedVehicle && (
                <div className="price-row">
                  <span>Vehicle Selection ({selectedVehicle.name})</span>
                  <span>{tour.isAllInclusive ? 'Included' : formatPrice(selectedVehicle.pricePerDay)}</span>
                </div>
              )}
              <div className="price-row total">
                <span>Total</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="safe-booking">
              <ShieldCheck size={16} /> Secure Checkout
            </div>
          </div>
        </div>
      </div>

      {showSeatModal && (
        <div className="seat-modal-overlay glass-backdrop fade-in">
          <div className="seat-modal-content-modern slide-up">
            <div className="modal-header-v3">
              <div className="modal-header-info">
                <div className="header-icon-box">
                  <Armchair size={24} className="primary-icon" />
                </div>
                <div>
                  <h2>Select Your Preferred Seats</h2>
                  <p className="vehicle-subtitle"><Car size={14} /> {selectedVehicle?.name} • {selectedVehicle?.type}</p>
                </div>
              </div>
              
              <div className="selection-progress-modern">
                <div className="progress-stats">
                  <span className="label">Assignment Progress</span>
                  <span className="ratio">{selectedSeats.length} / {people}</span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(selectedSeats.length / people) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button className="close-v3" onClick={() => setShowSeatModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-v3">
              <div className="modern-selection-grid">
                <div className="vehicle-visual-v3">
                  <div className="chassis-container">
                    <div className="vehicle-front-v3">
                      <div className="dashboard-v3"></div>
                      <div className="controls-v3">
                        <div className="steering-v3"></div>
                        <div className="driver-zone">
                          <Users size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="cabin-v3">
                      <div className={`seats-grid-v3 ${selectedVehicle?.capacity > 20 ? 'bus-config' : selectedVehicle?.capacity > 10 ? 'van-config' : 'mpv-config'}`}>
                        {Array.from({ length: selectedVehicle?.capacity || 8 }).map((_, i) => {
                          const seatNum = i + 1;
                          const isBooked = bookedSeats.includes(seatNum) || bookedSeats.includes(seatNum.toString());
                          const isSelected = selectedSeats.includes(seatNum);
                          
                          // Add Aisle for Bus
                          const showAisle = selectedVehicle?.capacity > 20 && (i + 1) % 2 === 0 && (i + 1) % 4 !== 0;
                          
                          return (
                            <React.Fragment key={seatNum}>
                              <div 
                                className={`seat-modern-v3 ${isBooked ? 'is-booked' : ''} ${isSelected ? 'is-selected' : ''}`}
                                onClick={() => toggleSeat(seatNum)}
                              >
                                <div className="seat-top"></div>
                                <div className="seat-main">
                                  <span className="s-num">{seatNum}</span>
                                  {isSelected && <CheckCircle size={12} className="s-check" />}
                                </div>
                                <div className="seat-shadow"></div>
                              </div>
                              {showAisle && <div className="aisle-v3"></div>}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="selection-details-v3">
                  <div className="detail-section-v3">
                    <div className="section-title-v3">
                      <Armchair size={16} />
                      <h4>Selected Seats</h4>
                    </div>
                    <div className="selected-pills-v3">
                      {selectedSeats.length > 0 ? (
                        selectedSeats.map(s => (
                          <div key={s} className="seat-pill-v3">
                            <span>Seat {s}</span>
                            <button className="remove-s" onClick={() => toggleSeat(s)}><X size={12} /></button>
                          </div>
                        ))
                      ) : (
                        <div className="no-selection-v3">
                          <Info size={16} />
                          <p>Click on any seat to begin assignment</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="detail-section-v3">
                    <div className="section-title-v3">
                      <Info size={16} />
                      <h4>Seating Legend</h4>
                    </div>
                    <div className="legend-v3">
                      <div className="leg-v3">
                        <div className="dot-v3 available"></div>
                        <span>Available</span>
                      </div>
                      <div className="leg-v3">
                        <div className="dot-v3 selected"></div>
                        <span>Your Selection</span>
                      </div>
                      <div className="leg-v3">
                        <div className="dot-v3 booked"></div>
                        <span>Unavailable</span>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-action-v3">
                    <div className="traveler-summary-v3">
                      <Users size={16} />
                      <span>Booking for <strong>{people} {people === 1 ? 'Traveler' : 'Travelers'}</strong></span>
                    </div>
                    <button 
                      className="confirm-seats-v3"
                      disabled={selectedSeats.length !== parseInt(people)}
                      onClick={() => setShowSeatModal(false)}
                    >
                      {selectedSeats.length === parseInt(people) ? 'Lock Seating' : `Select ${parseInt(people) - selectedSeats.length} more`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal-content slide-up">
            <div className="success-icon-wrapper">
              <div className="success-icon-background"></div>
              <PartyPopper size={48} className="success-icon" />
            </div>
            <h2>Booking Confirmed!</h2>
            <p>Your journey with Tujibambe has been successfully booked.</p>
            <div className="success-details">
              <div className="detail-item">
                <span className="detail-label">Redirection in</span>
                <span className="detail-value-countdown">{countdown}s</span>
              </div>
            </div>
            <button 
              className="proceed-dashboard-btn"
              onClick={() => navigate('/dashboard')}
            >
              Proceed to Dashboard <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default BookingPage;
