import React, { useEffect, useState, useContext, useRef } from 'react';
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
  PartyPopper,
  Zap,
  Ticket,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import '../styles/BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { formatPrice, currency, convertPrice } = useCurrency();
  const navigate = useNavigate();
  const location = useLocation();
  
  const seatSelectionRef = useRef(null);
  const lockSeatingRef = useRef(null);

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

  // Scroll to top on step 3
  useEffect(() => {
    if (bookingStep === 3) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [bookingStep]);

  // Scroll to seat selection when vehicle is selected
  useEffect(() => {
    if (selectedVehicle && bookingStep === 2) {
      setTimeout(() => {
        seatSelectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [selectedVehicle, bookingStep]);

  // Scroll to lock seating in modal when all seats are selected
  useEffect(() => {
    if (showSeatModal && selectedSeats.length === parseInt(people)) {
      setTimeout(() => {
        lockSeatingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedSeats.length, people, showSeatModal]);
  
  // Check if user is authenticated
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
          }
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

  if (!user) {
    return (
      <div className="auth-required-container">
        <div className="auth-required-content glass-morphism">
          <ShieldCheck size={64} className="text-primary" />
          <h2>Authentication Required</h2>
          <p>Please log in or sign up to book this tour.</p>
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="btn-modern-primary">
              Log In
            </button>
            <button onClick={() => navigate('/signup')} className="btn-modern-secondary">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="modern-loading-container">
      <div className="loading-pulse"></div>
      <p>Preparing your booking experience...</p>
    </div>
  );
  
  if (!tour) return <div className="error-state">Tour not found</div>;

  const steps = [
    { id: 1, name: 'Configuration', icon: <Calendar size={18} /> },
    { id: 2, name: 'Vehicle & Seats', icon: <Car size={18} /> },
    { id: 3, name: 'Confirmation', icon: <CheckCircle size={18} /> }
  ];

  return (
    <div className="booking-page-v4">
      <div className="booking-hero-v4">
        <div className="hero-overlay-v4"></div>
        <div className="hero-content-v4">
          <span className="hero-badge-v4"><Sparkles size={14} /> Premium Experience</span>
          <h1>Reserve Your Adventure</h1>
          <p>{tour.title}</p>
        </div>
      </div>

      <div className="booking-container-v4">
        <div className="booking-steps-nav-v4">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`step-item-v4 ${bookingStep === step.id ? 'active' : ''} ${bookingStep > step.id ? 'completed' : ''}`}
            >
              <div className="step-number-v4">
                {bookingStep > step.id ? <CheckCircle size={20} /> : step.icon}
              </div>
              <span className="step-name-v4">{step.name}</span>
              {step.id < 3 && <div className="step-connector-v4"></div>}
            </div>
          ))}
        </div>

        <div className="booking-layout-v4">
          <div className="booking-main-v4">
            {bookingStep === 1 && (
              <div className="step-view-v4 fade-in">
                <div className="view-header-v4">
                  <h2>Trip Details</h2>
                  <p>Customize your travel configuration to get started.</p>
                </div>

                <div className="config-grid-v4">
                  <div className="config-card-v4 glass-morphism">
                    <label><Calendar size={18} /> Travel Date</label>
                    <div className="input-group-v4">
                      <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        disabled={tour.type === 'timed'} 
                        className="v4-input"
                      />
                      {tour.type === 'timed' && <AlertCircle size={16} className="hint-icon-v4" />}
                    </div>
                    {tour.type === 'timed' && <p className="v4-hint">Fixed-date event</p>}
                  </div>

                  <div className="config-card-v4 glass-morphism">
                    <label><Users size={18} /> Travelers</label>
                    <div className="people-picker-v4">
                      <button 
                        className="picker-btn" 
                        onClick={() => setPeople(Math.max(1, people - 1))}
                      >-</button>
                      <div className="picker-value">
                        <span className="val">{people}</span>
                        <span className="lbl">{people === 1 ? 'Guest' : 'Guests'}</span>
                      </div>
                      <button 
                        className="picker-btn" 
                        onClick={() => setPeople(people + 1)}
                      >+</button>
                    </div>
                  </div>
                </div>

                {tour.type === 'group' && !inviteTrip && (
                  <div className="coordinator-card-v4 glass-morphism">
                    <div className="coord-icon-v4"><ShieldCheck size={28} /></div>
                    <div className="coord-text-v4">
                      <h3>Trip Coordinator</h3>
                      <p>Lead the group and manage the travel details for everyone.</p>
                    </div>
                    <label className="v4-switch">
                      <input 
                        type="checkbox" 
                        checked={isCoordinator} 
                        onChange={(e) => setIsCoordinator(e.target.checked)} 
                      />
                      <span className="v4-slider"></span>
                    </label>
                  </div>
                )}

                <div className="view-footer-v4">
                  <button className="btn-v4-primary" onClick={() => setBookingStep(2)}>
                    Continue to Vehicle <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="step-view-v4 fade-in">
                <div className="view-header-v4">
                  <div className="header-flex-v4">
                    <div>
                      <h2>Select Vehicle</h2>
                      <p>Choose your preferred transport for this adventure.</p>
                    </div>
                    {inviteTrip && <span className="locked-badge-v4">Group Vehicle Locked</span>}
                  </div>
                </div>

                <div className="vehicles-grid-v4">
                  {vehicles.map(v => (
                    <div 
                      key={v._id} 
                      className={`v4-vehicle-card glass-morphism ${selectedVehicle?._id === v._id ? 'selected' : ''} ${inviteTrip && selectedVehicle?._id !== v._id ? 'disabled' : ''}`}
                      onClick={() => {
                        if (!inviteTrip) {
                          setSelectedVehicle(v);
                          setSelectedSeats([]);
                        }
                      }}
                    >
                      <div className="v4-v-img">
                        <img src={v.image} alt={v.name} />
                        {selectedVehicle?._id === v._id && <div className="v4-v-check"><CheckCircle size={20} /></div>}
                      </div>
                      <div className="v4-v-info">
                        <div className="v4-v-head">
                          <h4>{v.name}</h4>
                          <span className="v4-v-capacity">{v.capacity} Seats</span>
                        </div>
                        
                        {vehicleOccupancy[v._id] && (
                          <div className="v4-v-occupancy">
                            <div className="occ-bar-bg">
                              <div 
                                className="occ-bar-fill" 
                                style={{ 
                                  width: `${Math.min(100, vehicleOccupancy[v._id].percentage)}%`,
                                  background: vehicleOccupancy[v._id].percentage > 80 ? '#ef4444' : '#10b981'
                                }}
                              ></div>
                            </div>
                            <span>{vehicleOccupancy[v._id].booked}/{vehicleOccupancy[v._id].total} booked</span>
                          </div>
                        )}

                        <div className="v4-v-price">
                          {tour.isAllInclusive ? 'Included' : `${formatPrice(v.pricePerDay)}/day`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="seat-integration-v4 glass-morphism" ref={seatSelectionRef}>
                  <div className="seat-info-v4">
                    <div className="seat-icon-v4"><Armchair size={24} /></div>
                    <div>
                      <h3>Seat Selection</h3>
                      <p>{selectedSeats.length} of {people} seats assigned</p>
                    </div>
                  </div>
                  <button 
                    className={`btn-v4-outline ${selectedVehicle ? 'active' : 'disabled'}`}
                    disabled={!selectedVehicle}
                    onClick={() => setShowSeatModal(true)}
                  >
                    {selectedSeats.length > 0 ? 'Edit Seats' : 'Choose Seats'}
                  </button>
                </div>

                <div className="view-footer-v4 split">
                  <button className="btn-v4-secondary" onClick={() => setBookingStep(1)}>
                    <ChevronLeft size={18} /> Back
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="step-view-v4 fade-in">
                <div className="view-header-v4">
                  <h2>Confirm Your Booking</h2>
                  <p>Review your booking details before final payment.</p>
                </div>

                <div className="summary-list-v4 glass-morphism">
                  <div className="summary-row-v4">
                    <MapPin size={18} />
                    <div className="row-content">
                      <label>Destination</label>
                      <span>{tour.title}</span>
                    </div>
                  </div>
                  <div className="summary-row-v4">
                    <Calendar size={18} />
                    <div className="row-content">
                      <label>Travel Date</label>
                      <span>{new Date(date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                    </div>
                  </div>
                  <div className="summary-row-v4">
                    <Users size={18} />
                    <div className="row-content">
                      <label>Travelers</label>
                      <span>{people} {people === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                  </div>
                  <div className="summary-row-v4">
                    <Car size={18} />
                    <div className="row-content">
                      <label>Vehicle & Seats</label>
                      <span>{selectedVehicle?.name} • Seats {selectedSeats.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="v4-policies glass-morphism">
                  <div className="policy-item-v4">
                    <ShieldCheck size={18} />
                    <p><strong>Refund Policy:</strong> Fully refundable up to 48 hours before departure.</p>
                  </div>
                  <div className="policy-item-v4">
                    <Info size={18} />
                    <p><strong>Auto-Shift:</strong> Single bookings may be optimized for vehicle efficiency.</p>
                  </div>
                </div>

                <div className="view-footer-v4 split">
                  <button className="btn-v4-secondary" onClick={() => setBookingStep(2)}>
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button className="btn-v4-pay" onClick={handleIyonicPay}>
                    Pay {formatPrice(totalAmount)} <Zap size={18} fill="currentColor" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {bookingStep === 3 && (
            <div className="booking-sidebar-v4">
              <div className="v4-sticky-summary glass-morphism">
                <h3>Price Details</h3>
                <div className="v4-tour-preview">
                  <img src={tour.image} alt={tour.title} />
                  <div>
                    <h4>{tour.title}</h4>
                    <span>{tour.location}</span>
                  </div>
                </div>
                
                <div className="v4-breakdown">
                  <div className="v4-b-row">
                    <span>Base Fare ({people}x)</span>
                    <span>{formatPrice(Number(tour.price) * people)}</span>
                  </div>
                  {!tour.isAllInclusive && selectedVehicle && (
                    <div className="v4-b-row">
                      <span>Vehicle Rental</span>
                      <span>{formatPrice(selectedVehicle.pricePerDay)}</span>
                    </div>
                  )}
                  <div className="v4-b-total">
                    <span>Total Amount</span>
                    <span className="amount">{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <div className="v4-secure-tag">
                  <ShieldCheck size={14} /> Encrypted & Secure Payment
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSeatModal && (
        <div className="v4-modal-overlay glass-backdrop">
          <div className="v4-modal-content slide-up">
            <div className="v4-modal-header">
              <div className="v4-modal-title">
                <Armchair size={24} className="text-primary" />
                <div>
                  <h2>Select Seats</h2>
                  <p>{selectedVehicle?.name}</p>
                </div>
              </div>
              <button className="v4-modal-close" onClick={() => setShowSeatModal(false)}><X /></button>
            </div>

            <div className="v4-modal-body">
              <div className="v4-seat-legend">
                <div className="leg-v4"><div className="dot-v4 av"></div> <span>Available</span></div>
                <div className="leg-v4"><div className="dot-v4 sel"></div> <span>Selected</span></div>
                <div className="leg-v4"><div className="dot-v4 occ"></div> <span>Occupied</span></div>
              </div>

              <div className="v4-bus-layout">
                <div className="v4-bus-cabin">
                  <div className={`v4-seats-grid ${selectedVehicle?.capacity > 20 ? 'bus' : 'van'}`}>
                    {Array.from({ length: selectedVehicle?.capacity || 8 }).map((_, i) => {
                      const seatNum = i + 1;
                      const isBooked = bookedSeats.includes(seatNum) || bookedSeats.includes(seatNum.toString());
                      const isSelected = selectedSeats.includes(seatNum);
                      
                      return (
                        <div 
                          key={seatNum} 
                          className={`v4-seat ${isBooked ? 'occ' : ''} ${isSelected ? 'sel' : ''}`}
                          onClick={() => toggleSeat(seatNum)}
                        >
                          {seatNum}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="v4-modal-footer">
                <div className="v4-progress-v2">
                  <span>Assigned: {selectedSeats.length} / {people}</span>
                  <div className="v4-progress-bg">
                    <div className="v4-progress-fill" style={{width: `${(selectedSeats.length/people)*100}%`}}></div>
                  </div>
                </div>
                <button 
                  ref={lockSeatingRef}
                  className="btn-v4-primary"
                  disabled={selectedSeats.length !== parseInt(people)}
                  onClick={() => {
                    setShowSeatModal(false);
                    setBookingStep(3);
                  }}
                >
                  {selectedSeats.length === parseInt(people) ? 'Lock Seating' : `Select ${parseInt(people) - selectedSeats.length} more`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="v4-success-overlay glass-backdrop">
          <div className="v4-success-card slide-up">
            <div className="success-icon-v4">
              <PartyPopper size={48} />
            </div>
            <h2>Booking Confirmed!</h2>
            <p>Your journey with Tujibambe has been secured.</p>
            <div className="success-timer-v4">
              Redirecting in <strong>{countdown}s</strong>
            </div>
            <button className="btn-v4-primary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
