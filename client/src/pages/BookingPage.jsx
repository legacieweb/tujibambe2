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
  Sparkles,
  Star
} from 'lucide-react';
import '../styles/BookingPage_New.css';

const BookingPage = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);
  const { formatPrice } = useCurrency();
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
    if (!authLoading && !user) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [user, authLoading, navigate, location]);

  useEffect(() => {
    const fetchTourAndVehicles = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const inviteCode = queryParams.get('invite');
        const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://localhost:5000/api'
          : 'https://tujibambe2.onrender.com/api';

        const [tourRes, vehiclesRes] = await Promise.all([
          axios.get(`${baseUrl}/tours/${id}`),
          axios.get(`${baseUrl}/vehicles`)
        ]);
        
        setTour(tourRes.data);
        setVehicles(vehiclesRes.data);
        
        if (inviteCode) {
          try {
            const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
              ? 'http://localhost:5000/api'
              : 'https://tujibambe2.onrender.com/api';
            const inviteRes = await axios.get(`${baseUrl}/bookings/invite/${inviteCode}`);
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
        const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://localhost:5000/api'
          : 'https://tujibambe2.onrender.com/api';
        const occupancy = {};
        for (const v of vehicles) {
          try {
            const res = await axios.get(`${baseUrl}/bookings/occupancy/${id}/${date}/${v._id}`);
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
          const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:5000/api'
            : 'https://tujibambe2.onrender.com/api';
          const res = await axios.get(`${baseUrl}/bookings/booked-seats/${id}/${date}`);
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
  const convertedTotal = formatPrice(totalAmount);
  
  const handleIyonicPay = () => {
    if (selectedSeats.length !== parseInt(people)) {
      alert(`Please select exactly ${people} seats.`);
      return;
    }

    if (window.IyonicPay) {
      const amount = parseFloat(totalAmount.toFixed(2));
      window.IyonicPay.pay({
        username: 'tujibambe',
        amount: amount,
        currency: 'USD',
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
      const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/api'
        : 'https://tujibambe2.onrender.com/api';

      await axios.post(`${baseUrl}/bookings`, {
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


   
  if (!tour) return <div className="error-state">Tour not found</div>;

  const steps = [
    { id: 1, name: 'Configuration', icon: <Calendar size={18} /> },
    { id: 2, name: 'Vehicle & Seats', icon: <Car size={18} /> },
    { id: 3, name: 'Confirmation', icon: <CheckCircle size={18} /> }
  ];

  // Calculate total people including coordinator
  const totalTravelers = isCoordinator ? people + 1 : people;

  return (
    <div className="booking-page-new">
      {/* Hero Section */}
      <section className="booking-hero-section">
        <div className="hero-bg-overlay"></div>
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Premium Experience</span>
          </div>
          <h1>Complete Your Booking</h1>
          <p className="hero-subtitle">{tour.title} • {tour.location}</p>
        </div>
      </section>

      {/* Main Booking Container */}
      <div className="booking-main-container">
        {/* Progress Steps */}
        <div className="booking-progress-nav">
          <div className="progress-container">
            {steps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`progress-step ${bookingStep === step.id ? 'active' : ''} ${bookingStep > step.id ? 'completed' : ''}`}
              >
                <div className="step-circle">
                  {bookingStep > step.id ? (
                    <CheckCircle size={20} />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="step-text">
                  <span className="step-number">Step {idx + 1}</span>
                  <span className="step-label">{step.name}</span>
                </div>
                {idx < steps.length - 1 && <div className="step-line" />}
              </div>
            ))}
          </div>
        </div>

        <div className="booking-content-grid">
          {/* Main Form Area */}
          <div className="booking-form-area">
            {/* Step 1: Configuration */}
            {bookingStep === 1 && (
              <div className="form-step-card fade-in-up">
                <div className="step-header">
                  <h2>Trip Details</h2>
                  <p>Customize your journey experience</p>
                </div>

                <div className="modern-form-sections">
                  <div className="form-section-item">
                    <div className="section-label">
                      <Calendar size={20} />
                      <h3>Select Date</h3>
                    </div>
                    <div className="date-selection-box">
                      <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        disabled={tour.type === 'timed'}
                        className="modern-date-input"
                      />
                      {tour.type === 'timed' && (
                        <div className="fixed-date-badge">
                          <Zap size={14} /> Fixed Date Event
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-section-item">
                    <div className="section-label">
                      <Users size={20} />
                      <h3>Number of Guests</h3>
                    </div>
                    <div className="guest-counter-modern">
                      <button 
                        className="modern-counter-btn"
                        onClick={() => setPeople(Math.max(1, people - 1))}
                        disabled={people <= 1}
                      >−</button>
                      <div className="modern-counter-value">
                        <span className="count">{people}</span>
                        <span className="label">{people === 1 ? 'Guest' : 'Guests'}</span>
                      </div>
                      <button 
                        className="modern-counter-btn"
                        onClick={() => setPeople(people + 1)}
                      >+</button>
                    </div>
                  </div>

                  {tour.type === 'group' && !inviteTrip && (
                    <div className="form-section-item coordinator-section">
                      <div className="coordinator-card-modern">
                        <div className="coordinator-info-modern">
                          <div className="coordinator-icon-box">
                            <ShieldCheck size={24} />
                          </div>
                          <div className="coordinator-text-box">
                            <h4>Trip Coordinator</h4>
                            <p>Are you leading this group trip?</p>
                          </div>
                        </div>
                        <label className="modern-switch">
                          <input 
                            type="checkbox" 
                            checked={isCoordinator}
                            onChange={(e) => setIsCoordinator(e.target.checked)}
                          />
                          <span className="modern-slider"></span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="modern-form-actions">
                  <button 
                    className="btn-modern-primary large"
                    onClick={() => setBookingStep(2)}
                    disabled={!date}
                  >
                    Next: Choose Vehicle <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle & Seats */}
            {bookingStep === 2 && (
              <div className="form-step-card fade-in-up">
                <div className="step-header">
                  <div className="step-title-area">
                    <h2>Choose Your Transport</h2>
                    <p>Select a vehicle that fits your group size and comfort level</p>
                  </div>
                </div>

                <div className="modern-vehicles-grid">
                  {vehicles.map(v => (
                    <div 
                      key={v._id}
                      className={`modern-vehicle-card ${selectedVehicle?._id === v._id ? 'selected' : ''} ${inviteTrip && selectedVehicle?._id !== v._id ? 'disabled' : ''}`}
                      onClick={() => {
                        if (!inviteTrip) {
                          setSelectedVehicle(v);
                          setSelectedSeats([]);
                        }
                      }}
                    >
                      <div className="vehicle-img-container">
                        <img src={v.image} alt={v.name} />
                        <div className="vehicle-overlay-info">
                          <span className="capacity">
                            <Users size={14} /> {v.capacity} Seats
                          </span>
                        </div>
                        {selectedVehicle?._id === v._id && (
                          <div className="selection-indicator">
                            <CheckCircle size={20} />
                          </div>
                        )}
                      </div>
                      <div className="vehicle-info-footer">
                        <div className="name-occupancy">
                          <h4>{v.name}</h4>
                          {vehicleOccupancy[v._id] && (
                            <div className="mini-occupancy">
                              <div className="occupancy-track">
                                <div 
                                  className="occupancy-progress"
                                  style={{
                                    width: `${Math.min(100, vehicleOccupancy[v._id].percentage)}%`,
                                    background: vehicleOccupancy[v._id].percentage > 80 ? '#e74c3c' : '#2ecc71'
                                  }}
                                />
                              </div>
                              <span>{vehicleOccupancy[v._id].booked}/{vehicleOccupancy[v._id].total}</span>
                            </div>
                          )}
                        </div>
                        <div className="pricing-tag">
                          {tour.isAllInclusive ? (
                            <span className="all-inc">Included</span>
                          ) : (
                            <span className="price">{formatPrice(v.pricePerDay)}<small>/day</small></span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seat Selection Integration */}
                <div className={`modern-seat-action-box ${selectedVehicle ? 'active' : ''}`} ref={seatSelectionRef}>
                  <div className="action-content">
                    <div className="action-icon">
                      <Armchair size={24} />
                    </div>
                    <div className="action-text">
                      <h4>Seat Assignment</h4>
                      <p>{selectedSeats.length > 0 ? `${selectedSeats.length} seats reserved` : `Required for ${people} travelers`}</p>
                    </div>
                  </div>
                  <button
                    className={`btn-modern-outline ${selectedVehicle ? 'active' : 'disabled'}`}
                    disabled={!selectedVehicle}
                    onClick={() => setShowSeatModal(true)}
                  >
                    {selectedSeats.length > 0 ? 'Modify Selection' : 'Select Seats'}
                  </button>
                </div>

                <div className="modern-form-actions split">
                  <button className="btn-modern-ghost" onClick={() => setBookingStep(1)}>
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button 
                    className="btn-modern-primary"
                    onClick={() => setBookingStep(3)}
                    disabled={!selectedVehicle || selectedSeats.length !== people}
                  >
                    Review & Confirm <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {bookingStep === 3 && (
              <div className="form-step-card fade-in-up">
                <div className="step-header">
                  <h2>Final Confirmation</h2>
                  <p>Please review your booking details before payment</p>
                </div>

                <div className="modern-summary-container">
                  <div className="summary-section">
                    <h3><Info size={18} /> Trip Details</h3>
                    <div className="summary-detail-grid">
                      <div className="detail-row">
                        <span className="label">Destination</span>
                        <span className="value">{tour.title}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Departure Date</span>
                        <span className="value">{new Date(date).toLocaleDateString(undefined, { dateStyle: 'full' })}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Travelers</span>
                        <span className="value">{people} {people === 1 ? 'Guest' : 'Guests'} {isCoordinator && '(Coordinator)'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="summary-section">
                    <h3><Car size={18} /> Transport & Seating</h3>
                    <div className="summary-detail-grid">
                      <div className="detail-row">
                        <span className="label">Vehicle Type</span>
                        <span className="value">{selectedVehicle?.name}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Selected Seats</span>
                        <span className="value highlight">#{selectedSeats.sort((a,b) => a-b).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="summary-section policies">
                    <h3><ShieldCheck size={18} /> Terms & Policies</h3>
                    <div className="policy-chips">
                      <div className="policy-chip">
                        <CheckCircle size={14} /> Free Cancellation (48h)
                      </div>
                      <div className="policy-chip">
                        <CheckCircle size={14} /> Instant Confirmation
                      </div>
                      <div className="policy-chip warning">
                        <AlertCircle size={14} /> Auto-Shift Policy Active
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modern-form-actions split">
                  <button className="btn-modern-ghost" onClick={() => setBookingStep(2)}>
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button className="btn-modern-primary pay-btn" onClick={handleIyonicPay}>
                    <CreditCard size={18} /> Complete Payment - {convertedTotal}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* New Modern Sidebar Summary */}
          <aside className="booking-summary-sidebar">
            <div className="sticky-summary-card">
              <div className="tour-mini-hero" style={{backgroundImage: `url(${tour.image})`}}>
                <div className="hero-overlay">
                  <span className="tour-cat">{tour.category}</span>
                  <h3>{tour.title}</h3>
                </div>
              </div>

              <div className="summary-content">
                <div className="summary-quick-info">
                  <div className="info-item">
                    <Calendar size={16} />
                    <span>{date ? new Date(date).toLocaleDateString() : 'Pick a date'}</span>
                  </div>
                  <div className="info-item">
                    <Users size={16} />
                    <span>{people} Travelers</span>
                  </div>
                </div>

                <div className="price-breakdown-modern">
                  <div className="breakdown-item">
                    <span>Base Fare</span>
                    <span>{formatPrice(Number(tour.price) * people)}</span>
                  </div>
                  {!tour.isAllInclusive && selectedVehicle && (
                    <div className="breakdown-item">
                      <span>Vehicle Rental</span>
                      <span>{formatPrice(selectedVehicle.pricePerDay)}</span>
                    </div>
                  )}
                  <div className="breakdown-total-modern">
                    <span>Total</span>
                    <span className="total">{convertedTotal}</span>
                  </div>
                </div>

                <div className="secure-payment-info">
                  <ShieldCheck size={16} />
                  <span>Secure 256-bit SSL encrypted payment</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Seat Selection Modal */}
      {showSeatModal && (
        <div className="modal-overlay" onClick={() => setShowSeatModal(false)}>
          <div className="seat-modal slide-up" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <Armchair size={26} className="text-primary" />
                <div>
                  <h2>Select Your Seats</h2>
                  <p>{selectedVehicle?.name} • Capacity: {selectedVehicle?.capacity}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowSeatModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {/* Seat Legend */}
              <div className="seat-legend">
                <div className="legend-item">
                  <div className="seat-sample available"></div>
                  <span>Available</span>
                </div>
                <div className="legend-item">
                  <div className="seat-sample selected"></div>
                  <span>Selected</span>
                </div>
                <div className="legend-item">
                  <div className="seat-sample occupied"></div>
                  <span>Occupied</span>
                </div>
              </div>

              {/* Realistic Vehicle Layout */}
              <div className="seat-layout-container">
                <div className="vehicle-front">
                  <div className="steering-wheel">
                    <div className="inner-wheel"></div>
                  </div>
                  <div className="driver-seat">
                    <Users size={20} />
                  </div>
                </div>

                <div className="cabin-aisle">
                  {(() => {
                    const capacity = selectedVehicle?.capacity || 8;
                    const isBus = capacity > 14;
                    const seatsPerRow = isBus ? 4 : 3;
                    const leftSeatsCount = isBus ? 2 : 1;
                    const rows = [];
                    
                    for (let i = 0; i < capacity; i += seatsPerRow) {
                      const rowSeats = [];
                      for (let j = 0; j < seatsPerRow; j++) {
                        const seatIndex = i + j;
                        if (seatIndex < capacity) {
                          const seatNum = seatIndex + 1;
                          const isBooked = bookedSeats.includes(seatNum) || bookedSeats.includes(seatNum.toString());
                          const isSelected = selectedSeats.includes(seatNum);
                          
                          rowSeats.push(
                            <button
                              key={seatNum}
                              className={`seat-button ${isBooked ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
                              onClick={() => toggleSeat(seatNum)}
                              disabled={isBooked}
                            >
                              <Armchair size={16} className="armchair-icon" />
                              <span>{seatNum}</span>
                            </button>
                          );
                        }
                      }

                      // Insert aisle space
                      const rowWithAisle = [
                        <div key={`left-${i}`} className="seat-group">
                          {rowSeats.slice(0, leftSeatsCount)}
                        </div>,
                        <div key={`aisle-${i}`} className="aisle-space"></div>,
                        <div key={`right-${i}`} className="seat-group">
                          {rowSeats.slice(leftSeatsCount)}
                        </div>
                      ];

                      rows.push(
                        <div key={`row-${i}`} className="seat-row">
                          {rowWithAisle}
                        </div>
                      );
                    }
                    return rows;
                  })()}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer" ref={lockSeatingRef}>
                <div className="selection-progress">
                  <span className="progress-label">
                    {selectedSeats.length} of {people} seats assigned
                  </span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(selectedSeats.length / people) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  className="btn-primary"
                  disabled={selectedSeats.length !== parseInt(people)}
                  onClick={() => {
                    setShowSeatModal(false);
                    setBookingStep(3);
                  }}
                >
                  {selectedSeats.length === parseInt(people) ? (
                    <>Lock Seating & Continue <CheckCircle size={18} /></>
                  ) : (
                    <>Select {parseInt(people) - selectedSeats.length} more seats</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-overlay" onClick={() => navigate('/dashboard')}>
          <div className="success-card slide-up" onClick={e => e.stopPropagation()}>
            <div className="success-icon-wrapper">
              <PartyPopper size={52} />
            </div>
            <h2>Booking Confirmed!</h2>
            <p>Your adventure with Tujibambe has been successfully booked.</p>
            
            <div className="success-details">
              <div className="success-item">
                <Ticket size={18} />
                <span>Booking ID: <strong>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong></span>
              </div>
              <div className="success-item">
                <Calendar size={18} />
                <span>Date: {new Date(date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="countdown-timer">
              Redirecting in <strong>{countdown}s</strong>
            </div>

            <button className="btn-primary" onClick={() => navigate('/dashboard')}>
              View My Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
