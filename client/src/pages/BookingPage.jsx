import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import Preloader from '../components/Preloader';
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
          axios.get(`http://127.0.0.1:5000/api/tours/${id}`),
          axios.get('http://127.0.0.1:5000/api/vehicles')
        ]);
        
        setTour(tourRes.data);
        setVehicles(vehiclesRes.data);
        
        if (inviteCode) {
          try {
            const inviteRes = await axios.get(`http://127.0.0.1:5000/api/bookings/invite/${inviteCode}`);
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
    const fetchBookedSeats = async () => {
      if (date && tour && !inviteTrip) {
        try {
          const res = await axios.get(`http://127.0.0.1:5000/api/bookings/booked-seats/${id}/${date}`);
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
    const tourPrice = tour.price || 0;
    // Only charge vehicle price if not all-inclusive AND (is a coordinator OR not joining an existing trip)
    const shouldChargeVehicle = !tour.isAllInclusive && selectedVehicle && (isCoordinator || !inviteTrip);
    const vehiclePrice = shouldChargeVehicle ? (selectedVehicle.pricePerDay || 0) : 0;
    return (tourPrice * people) + vehiclePrice;
  };

  const totalAmount = calculateTotal();
  const convertedTotal = convertPrice(totalAmount);
  
  const handleIyonicPay = () => {
    if (selectedSeats.length !== parseInt(people)) {
      alert(`Please select exactly ${people} seats.`);
      return;
    }

    if (window.IyonicPay) {
      // Use production IyonicPay directly
      // We manually construct the production URL to bypass the SDK's localhost redirect
      const baseUrl = 'https://pay.iyonicorp.com';
      const amount = parseFloat(convertedTotal.toFixed(2));
      const desc = encodeURIComponent(`Booking for ${tour.title} - ${people} travelers`);
      const url = `${baseUrl}/request?user=tujibambe&embed=true&amount=${amount}&desc=${desc}&currency=${currency}`;
      
      // We use the SDK's own modal logic but with our forced production URL
      // If the SDK doesn't expose a way to set the URL, we'll use its pay method 
      // but the user said "iyonicpay has everything", implying we should trust their hosted service.
      
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
      const totalPriceUSD = calculateTotal(); // Original USD price

      await axios.post('http://127.0.0.1:5000/api/bookings', {
        tour: id,
        bookingDate: date,
        numberOfPeople: people,
        totalPrice: totalPriceUSD,
        currency: 'USD', // Always store in USD for consistency
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
              <h2>Trip Configuration</h2>
              <div className="booking-form">
                <div className="form-group">
                  <label><Calendar size={18} /> Travel Date</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    disabled={tour.type === 'timed'}
                    className="booking-input"
                  />
                  {tour.type === 'timed' && <p className="input-hint">This is a fixed-date event.</p>}
                </div>
                
                <div className="form-group">
                  <label><Users size={18} /> Number of Travelers</label>
                  <div className="people-selector">
                    <button onClick={() => setPeople(Math.max(1, people - 1))}>-</button>
                    <span>{people}</span>
                    <button onClick={() => setPeople(people + 1)}>+</button>
                  </div>
                </div>

                {tour.type === 'group' && (
                  <div className="coordinator-card">
                    <div className="coordinator-info">
                      <h3>Are you the coordinator?</h3>
                      <p>Becoming a coordinator allows you to manage a group trip and invite others.</p>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={isCoordinator} 
                        onChange={(e) => setIsCoordinator(e.target.checked)} 
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                )}

                <button className="next-step-btn" onClick={() => setBookingStep(2)}>
                  Continue to Vehicle Selection <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {bookingStep === 2 && (
            <div className="step-container fade-in">
              <div className="step-header-with-badge">
                <h2>Vehicle & Seat Selection</h2>
                {inviteTrip && <span className="invite-badge">Group Trip Vehicle Locked</span>}
              </div>
              
              <div className="vehicle-selection-grid">
                {vehicles.map(v => (
                  <div 
                    key={v._id} 
                    className={`vehicle-card ${selectedVehicle?._id === v._id ? 'selected' : ''} ${inviteTrip && selectedVehicle?._id !== v._id ? 'disabled' : ''}`}
                    onClick={() => {
                      if (!inviteTrip) {
                        setSelectedVehicle(v);
                        setSelectedSeats([]);
                      }
                    }}
                  >
                    <div className="vehicle-image-wrapper">
                      <img src={v.image} alt={v.name} />
                      {selectedVehicle?._id === v._id && (
                        <div className="selection-overlay">
                          <CheckCircle className="selected-icon-large" size={32} />
                        </div>
                      )}
                    </div>
                    <div className="vehicle-card-info">
                      <div className="v-header">
                        <h4>{v.name}</h4>
                        <span className="v-capacity">{v.capacity} Seats</span>
                      </div>
                      <p className="v-type">{v.type}</p>
                      <div className="v-footer">
                        <span className="v-price-tag">
                          {tour.isAllInclusive ? (
                            <span className="inc-badge">Included</span>
                          ) : (
                            <>${v.pricePerDay}<small>/day</small></>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="seat-selection-preview-card">
                <div className="preview-info">
                  <div className="info-icon-box"><Armchair size={24} /></div>
                  <div>
                    <h3>Seat Selection</h3>
                    <p>{selectedSeats.length > 0 ? `${selectedSeats.length} of ${people} seats selected` : 'No seats selected yet'}</p>
                  </div>
                </div>
                <button className="open-seat-modal-btn" onClick={() => setShowSeatModal(true)}>
                  {selectedSeats.length > 0 ? 'Edit Seat Selection' : 'Select Your Seats'}
                </button>
              </div>

              <div className="step-actions">
                <button className="back-step-btn" onClick={() => setBookingStep(1)}>Back</button>
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
                    <label>Vehicle</label>
                    <p>{selectedVehicle?.name}</p>
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
                    <p>{formatPrice(tour.price)} per person</p>
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
                <span>{formatPrice(tour.price * people)}</span>
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
        <div className="seat-modal-overlay fade-in">
          <div className="seat-modal-content slide-up">
            <div className="modal-header">
              <div className="modal-title-area">
                <h2>Choose Your Seats</h2>
                <p>Select {people} {people === 1 ? 'seat' : 'seats'} for your journey</p>
              </div>
              <button className="close-modal-btn" onClick={() => setShowSeatModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="seat-selection-container">
                <div className="vehicle-view-area">
                  <div className="vehicle-layout-modern">
                    <div className="bus-chassis-modern">
                      <div className="driver-section-modern">
                        <div className="steering-wheel-modern"></div>
                        <div className="driver-seat">
                          <Users size={18} />
                        </div>
                      </div>
                      
                      <div className="seats-grid-modern" style={{ 
                        gridTemplateColumns: `repeat(4, 1fr)`,
                      }}>
                        {Array.from({ length: selectedVehicle?.capacity || 8 }).map((_, i) => {
                          const seatNum = i + 1;
                          const isBooked = bookedSeats.includes(seatNum) || bookedSeats.includes(seatNum.toString());
                          const isSelected = selectedSeats.includes(seatNum);
                          
                          return (
                            <div 
                              key={seatNum}
                              className={`seat-modern ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                              onClick={() => toggleSeat(seatNum)}
                            >
                              <Armchair size={22} />
                              <span className="seat-num-label">{seatNum}</span>
                              {isSelected && <CheckCircle className="seat-check" size={12} />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="selection-sidebar">
                  <div className="selection-stats">
                    <div className="stat-card">
                      <span className="stat-label">Travelers</span>
                      <span className="stat-value">{people}</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Selected</span>
                      <span className={`stat-value ${selectedSeats.length === parseInt(people) ? 'success' : ''}`}>
                        {selectedSeats.length}
                      </span>
                    </div>
                  </div>

                  <div className="selected-seats-list">
                    <h4>Your Selected Seats</h4>
                    <div className="seats-pills">
                      {selectedSeats.length > 0 ? (
                        selectedSeats.map(s => (
                          <span key={s} className="seat-pill">
                            Seat {s}
                            <button onClick={() => toggleSeat(s)}><X size={12} /></button>
                          </span>
                        ))
                      ) : (
                        <p className="no-seats-hint">No seats selected yet</p>
                      )}
                    </div>
                  </div>

                  <div className="legend-modern">
                    <h4>Legend</h4>
                    <div className="legend-grid">
                      <div className="legend-item-modern"><div className="l-box avail"></div> Available</div>
                      <div className="legend-item-modern"><div className="l-box sel"></div> Your Selection</div>
                      <div className="legend-item-modern"><div className="l-box book"></div> Occupied</div>
                    </div>
                  </div>

                  <button 
                    className="confirm-selection-btn"
                    disabled={selectedSeats.length !== parseInt(people)}
                    onClick={() => setShowSeatModal(false)}
                  >
                    Confirm Selection
                  </button>
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
