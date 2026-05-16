import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { useLoading } from '../context/LoadingContext';
import API_BASE_URL from '../api/config';
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
  Star,
  ArrowRight
} from 'lucide-react';
import '../styles/BookingPage_New.css';

const BookingPage = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useContext(AuthContext);
  const { formatPrice, currency: currentCurrency, exchangeRate } = useCurrency();
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [tour, setTour] = useState(null);
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isCoordinator, setIsCoordinator] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [inviteTrip, setInviteTrip] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentType, setPaymentType] = useState('full'); // 'full' or 'deposit'
  const [depositAmount, setDepositAmount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [bookingStep]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [user, authLoading, navigate, location]);

  useEffect(() => {
    const fetchTourAndVehicles = async () => {
      startLoading();
      try {
        const queryParams = new URLSearchParams(location.search);
        const inviteCode = queryParams.get('invite');
        const baseUrl = `${API_BASE_URL}/api`;

        const [tourRes, vehiclesRes] = await Promise.all([
          axios.get(`${baseUrl}/tours/${id}`),
          axios.get(`${baseUrl}/vehicles`)
        ]);
        
        setTour(tourRes.data);
        setVehicles(vehiclesRes.data);
        
        if (inviteCode) {
          try {
            const inviteRes = await axios.get(`${baseUrl}/bookings/invite/${inviteCode}`);
            setInviteTrip(inviteRes.data.trip);
            setSelectedVehicle(inviteRes.data.trip.vehicle);
            setBookedSeats(inviteRes.data.bookedSeats);
          } catch (err) {
            console.error("Invalid invite code", err);
          }
        }
        
        if (tourRes.data.eventDate) {
          setDate(new Date(tourRes.data.eventDate).toISOString().split('T')[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading();
      }
    };
    fetchTourAndVehicles();
  }, [id, location.search]);

  const toggleSeat = (seatNum) => {
    if (bookedSeats.includes(seatNum) || bookedSeats.includes(seatNum.toString())) return;
    
    setSelectedSeats(prev => {
      const isSelected = prev.includes(seatNum);
      if (isSelected) return prev.filter(s => s !== seatNum);
      if (prev.length >= people) return [...prev.slice(1), seatNum];
      return [...prev, seatNum];
    });
  };

  const calculateTotal = () => {
    if (!tour) return 0;
    const tourPrice = Number(tour.price) || 0;
    
    // Check if tour is all inclusive based on title
    const allInclusiveTours = [
      "Lake Victoria Expedition",
      "TUJIBAMBE PARADISE ESCAPE",
      "TUJIBAMBE ROAD TRIP EXPERIENCE"
    ];
    
    const isActuallyAllInclusive = tour.isAllInclusive || allInclusiveTours.some(t => 
      tour.title.toLowerCase().includes(t.toLowerCase())
    );

    const vehiclePrice = (!isActuallyAllInclusive && selectedVehicle && (isCoordinator || !inviteTrip)) 
      ? (Number(selectedVehicle.pricePerDay) || 0) : 0;
    return (tourPrice * people) + vehiclePrice;
  };

  const handleBooking = async (reference) => {
    setIsVerifying(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = `${API_BASE_URL}/api`;

      const total = calculateTotal();
      const amountPaid = paymentType === 'full' ? total : (total * 0.1);

      // Use only public key flow - directly create booking after successful popup payment
      await axios.post(`${baseUrl}/bookings`, {
        tour: id,
        bookingDate: date,
        numberOfPeople: people,
        totalPrice: total,
        amountPaid: amountPaid,
        currency: 'USD',
        selectedSeats,
        isCoordinator,
        vehicleId: selectedVehicle?.id,
        tripId: inviteTrip?.id,
        paymentReference: reference.reference
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert('Booking failed. Please contact support.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleIyonicPay = () => {
    if (selectedSeats.length !== parseInt(people)) {
      alert(`Please select ${people} seats.`);
      return;
    }

    if (!window.IyonicPay) {
      alert('Payment system is not ready. Please try again later.');
      return;
    }

    const total = calculateTotal();
    const amountToPayUSD = paymentType === 'full' ? total : (total * 0.1);
    const amountToPay = currentCurrency === 'KES' ? (amountToPayUSD * exchangeRate) : amountToPayUSD;

    window.IyonicPay.pay({
      username: 'tujibambe',
      amount: amountToPay,
      currency: currentCurrency === 'KES' ? 'KES' : 'USD',
      description: `Booking for ${tour.title}`,
      baseUrl: 'https://pay.iyonicorp.com',
      onSuccess: (ref) => {
        handleBooking({ reference: ref });
      }
    });
  };

  useEffect(() => {
    let timer;
    if (showSuccessModal && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    // Removed automatic redirect to dashboard
    return () => clearInterval(timer);
  }, [showSuccessModal, countdown]);

  if (!tour || !user) return null;

  return (
    <div className="booking-v2">
      <div className="booking-hero-v3">
        <div className="hero-visual-v3">
          <img src={tour.image} alt="" className="hero-img-v3" />
          <div className="hero-gradient-v3"></div>
        </div>
        
        <div className="hero-content-v3">
          <div className="hero-top-v3">
            <button className="back-circle-v3" onClick={() => navigate(-1)}>
              <ArrowLeft size={24} />
            </button>
            <div className="hero-badges-v3">
              <span className="badge-v3"><Sparkles size={14} /> Official Booking</span>
              <span className="badge-v3"><ShieldCheck size={14} /> Secured by IyonicPay</span>
            </div>
          </div>

          <div className="hero-main-v3">
            <h1 className="hero-title-v3">
              {tour.title.split(' ').map((word, i) => (
                <span key={`${word}-${i}`}>{word} </span>
              ))}
            </h1>
            <div className="hero-meta-v3">
              <div className="meta-pill-v3"><MapPin size={16} /> {tour.location}</div>
              <div className="meta-pill-v3"><Clock size={16} /> {tour.duration}</div>
              <div className="meta-pill-v3"><Star size={16} fill="var(--primary)" /> 4.9 Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="booking-container-v2">
        <div className="booking-grid-v2">
          <main className="booking-main-v2">
            {bookingStep === 1 ? (
              <div className="card-v2 fade-in">
                <div className="card-header-v2">
                  <h2>Booking Details</h2>
                  <p>Configure your adventure preferences</p>
                </div>
                
                <div className="form-group-v2">
                  <label><Calendar size={16} /> Choose your start date</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    disabled={tour.type === 'timed'}
                    className="input-v2"
                  />
                </div>

                <div className="form-group-v2">
                  <label><Users size={16} /> Number of travelers</label>
                  <div className="counter-v2">
                    <button onClick={() => setPeople(Math.max(1, people - 1))}>-</button>
                    <span>{people}</span>
                    <button onClick={() => setPeople(people + 1)}>+</button>
                  </div>
                </div>

                {tour.type === 'group' && !inviteTrip && (
                  <div className="coordinator-toggle-v2" onClick={() => setIsCoordinator(!isCoordinator)}>
                    <div className={`toggle-box-v2 ${isCoordinator ? 'active' : ''}`}>
                      {isCoordinator && <CheckCircle size={16} />}
                    </div>
                    <div className="toggle-text-v2">
                      <strong>Book as Vehicle Coordinator</strong>
                      <p>Lead the trip and invite friends to fill your seats later.</p>
                    </div>
                  </div>
                )}

                <div className="step-actions-v2">
                  <button 
                    className="primary-action-v2"
                    onClick={() => {
                      setShowSeatModal(true);
                    }}
                  >
                    Select Vehicle & Seats <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="card-v2 fade-in">
                <div className="card-header-v2">
                  <h2>Review & Checkout</h2>
                  <p>Confirm your details before proceeding to payment</p>
                </div>

                <div className="checkout-summary-v2">
                  <div className="summary-item-v3">
                    <div className="item-icon-v3"><Calendar /></div>
                    <div className="item-content-v3">
                      <label>Selected Date</label>
                      <span>{new Date(date).toLocaleDateString(undefined, { dateStyle: 'full' })}</span>
                    </div>
                  </div>
                  <div className="summary-item-v3">
                    <div className="item-icon-v3"><Users /></div>
                    <div className="item-content-v3">
                      <label>Total Travelers</label>
                      <span>{people} {people === 1 ? 'Explorer' : 'Explorers'}</span>
                    </div>
                  </div>
                  <div className="summary-item-v3">
                    <div className="item-icon-v3"><Armchair /></div>
                    <div className="item-content-v3">
                      <label>Seat Allocation</label>
                      <span>{selectedSeats.length > 0 ? `Seats: ${selectedSeats.join(', ')}` : 'Not Selected'}</span>
                      <button className="edit-seats-link" onClick={() => setShowSeatModal(true)}>Modify Seats</button>
                    </div>
                  </div>
                </div>

                <div className="payment-security-v3">
                  <div className="security-icon-v3"><ShieldCheck size={32} /></div>
                  <div className="security-text-v3">
                    <h4>Secure Checkout</h4>
                    <p>Your transaction is encrypted and processed via IyonicPay.</p>
                  </div>
                </div>

                <div className="payment-options-v3">
                  <h4 className="options-title-v3">Payment Options</h4>
                  <div className="options-grid-v3">
                    <div 
                      className={`option-card-v3 ${paymentType === 'full' ? 'active' : ''}`}
                      onClick={() => setPaymentType('full')}
                    >
                      <div className="option-header-v3">
                        <span className="option-label-v3">Full Payment</span>
                        {paymentType === 'full' && <CheckCircle size={18} className="text-primary" />}
                      </div>
                      <span className="option-amount-v3">{formatPrice(calculateTotal())}</span>
                      <p className="option-desc-v3">Pay the entire amount now and secure your spot.</p>
                    </div>

                    <div 
                      className={`option-card-v3 ${paymentType === 'deposit' ? 'active' : ''}`}
                      onClick={() => setPaymentType('deposit')}
                    >
                      <div className="option-header-v3">
                        <span className="option-label-v3">10% Deposit</span>
                        {paymentType === 'deposit' && <CheckCircle size={18} className="text-primary" />}
                      </div>
                      <span className="option-amount-v3">{formatPrice(calculateTotal() * 0.1)}</span>
                      <p className="option-desc-v3">Pay a small deposit now and the balance later.</p>
                    </div>
                  </div>
                </div>

                <div className="action-row-v3">
                  <button className="secondary-action-v3" onClick={() => setBookingStep(1)}>
                    <ArrowLeft size={18} /> Back to Plans
                  </button>
                  <button 
                    className="pay-now-btn-v3" 
                    onClick={handleIyonicPay}
                    disabled={isVerifying}
                  >
                    {isVerifying ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Verifying...
                      </span>
                    ) : (
                      `Confirm & Pay ${formatPrice(paymentType === 'full' ? calculateTotal() : calculateTotal() * 0.1)}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </main>

          <aside className="booking-summary-v2">
            <div className="summary-card-v2">
              <h3>Pricing Summary</h3>
              <div className="summary-row-v2">
                <span className="row-label-v3"><Ticket size={16} /> {tour.title} (x{people})</span>
                <span className="row-value-v3">{formatPrice(tour.price * people)}</span>
              </div>
              {(() => {
                const allInclusiveTours = [
                  "Lake Victoria Expedition",
                  "TUJIBAMBE PARADISE ESCAPE",
                  "TUJIBAMBE ROAD TRIP EXPERIENCE"
                ];
                const isActuallyAllInclusive = tour.isAllInclusive || allInclusiveTours.some(t => 
                  tour.title.toLowerCase().includes(t.toLowerCase())
                );

                if (!isActuallyAllInclusive && selectedVehicle && (isCoordinator || !inviteTrip)) {
                  return (
                    <div className="summary-row-v2">
                      <span className="row-label-v3"><Car size={16} /> {selectedVehicle.name} Rental</span>
                      <span className="row-value-v3">{formatPrice(selectedVehicle.pricePerDay)}</span>
                    </div>
                  );
                } else if (isActuallyAllInclusive && selectedVehicle) {
                  return (
                    <div className="summary-row-v2 all-inclusive-row-v3">
                      <span className="row-label-v3"><Car size={16} /> {selectedVehicle.name}</span>
                      <span className="row-value-v3 inclusive-tag-v3">Included</span>
                    </div>
                  );
                }
                return null;
              })()}
              <div className="summary-divider-v2"></div>
              <div className="summary-total-v2">
                <span>Grand Total</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
              <div className="guarantee-badge-v3">
                <ShieldCheck size={18} />
                <span>Best Price Guarantee</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modern realistic seat selection popup */}
      {showSeatModal && (
        <div className="seat-modal-overlay-v3 fade-in">
          <div className="seat-modal-v3 scale-up">
            <button className="close-modal-v3" onClick={() => setShowSeatModal(false)}>
              <X size={24} />
            </button>
            
            <div className="seat-modal-grid-v3">
              <div className="seat-modal-left-v3">
                {!selectedVehicle && !inviteTrip ? (
                  <div className="vehicle-picker-v3">
                    <h2>Choose Your Ride</h2>
                    <p>Select the vehicle for your expedition</p>
                    <div className="v-grid-v3">
                      {vehicles.map(v => (
                        <div key={v.id} className="v-option-v3" onClick={() => setSelectedVehicle(v)}>
                          <div className="v-image-v3">
                            <img src={v.image} alt="" />
                          </div>
                          <div className="v-details-v3">
                            <h4>{v.name}</h4>
                            <div className="v-meta-v3">
                              <span><Users size={14} /> {v.capacity} Total Seats</span>
                              <span><CreditCard size={14} /> {formatPrice(v.pricePerDay)} Per Day</span>
                            </div>
                          </div>
                          <ChevronRight size={18} className="v-arrow-v3" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="realistic-bus-container-v3">
                    <div className="vehicle-header-v3">
                      <button className="back-to-v-v3" onClick={() => !inviteTrip && setSelectedVehicle(null)}>
                        <ArrowLeft size={16} /> {inviteTrip ? 'Assigned Vehicle' : 'Switch Vehicle'}
                      </button>
                      <h3>{(selectedVehicle || inviteTrip).name}</h3>
                    </div>

                    <div className="realistic-bus-wrapper-v3">
                      <div className="bus-body-v3">
                        <div className="bus-gloss-v3"></div>
                        <div className="bus-cockpit-v3">
                          <div className="steering-v3">
                            <div className="wheel-v3"></div>
                          </div>
                          <div className="dashboard-v3"></div>
                          <div className="driver-seat-v3">
                            <div className="realistic-seat-v3 booked">
                              <div className="seat-headrest-v3"></div>
                              <div className="seat-top-v3"></div>
                              <div className="seat-base-v3">
                                <span className="seat-label-v3">DRV</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="cabin-v3">
                          <div className="bus-windows-v3">
                            <span></span><span></span><span></span><span></span>
                          </div>
                          <div className="seats-grid-v3">
                            {Array.from({ length: (selectedVehicle || inviteTrip).capacity }).map((_, i) => {
                              const seatNum = i + 1;
                              const isBooked = bookedSeats.includes(seatNum) || bookedSeats.includes(seatNum.toString());
                              const isSelected = selectedSeats.includes(seatNum);
                              return (
                                <div 
                                  key={seatNum}
                                  className={`realistic-seat-v3 ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                                  onClick={() => toggleSeat(seatNum)}
                                >
                                  <div className="seat-headrest-v3"></div>
                                  <div className="seat-top-v3"></div>
                                  <div className="seat-base-v3">
                                    <span className="seat-label-v3">{seatNum}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="seat-modal-right-v3">
                <div className="selection-card-v3">
                  <div className="selection-header-v3">
                    <h3>Selection Status</h3>
                    <div className="travelers-count-v3">{people} Travelers</div>
                  </div>

                  <div className="legend-v3">
                    <div className="legend-row-v3">
                      <div className="l-box available"></div> <span>Available</span>
                    </div>
                    <div className="legend-row-v3">
                      <div className="l-box selected"></div> <span>Your Selection</span>
                    </div>
                    <div className="legend-row-v3">
                      <div className="l-box booked"></div> <span>Occupied</span>
                    </div>
                  </div>

                  <div className="selected-numbers-v3">
                    <label>Selected Seats</label>
                    <div className="numbers-flow-v3">
                      {selectedSeats.length > 0 ? selectedSeats.sort((a,b)=>a-b).map(n => (
                        <div key={n} className="num-tag-v3">{n}</div>
                      )) : <span className="no-selection-v3">No seats picked yet</span>}
                    </div>
                  </div>

                  <div className="selection-footer-v3">
                    <div className="selection-progress-v3">
                      <div className="progress-bar-v3">
                        <div 
                          className="progress-fill-v3" 
                          style={{ width: `${(selectedSeats.length / people) * 100}%` }}
                        ></div>
                      </div>
                      <span>{selectedSeats.length} / {people} Confirmed</span>
                    </div>
                    
                    <button 
                      className="confirm-seats-btn-v3"
                      disabled={selectedSeats.length !== parseInt(people)}
                      onClick={() => {
                        setShowSeatModal(false);
                        setBookingStep(2);
                      }}
                    >
                      Lock Seating & Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay-v2 success-overlay-v3">
          <div className="success-modal-v3 fade-in scale-up">
            <div className="confetti-container"></div>
            
            <div className="success-header-v3">
              <div className="check-icon-wrapper-v3">
                <div className="check-circle-v3">
                  <CheckCircle size={48} />
                </div>
                <div className="ripple-v3"></div>
              </div>
              <h2>Adventure Awaits!</h2>
              <p>Your journey is officially confirmed</p>
            </div>

            <div className="success-body-v3">
              <div className="tour-confirm-card-v3">
                <img src={tour.image} alt="" className="tour-confirm-img-v3" />
                <div className="tour-confirm-info-v3">
                  <span className="confirm-tag-v3">Confirmed</span>
                  <h3>{tour.title}</h3>
                  <div className="confirm-meta-v3">
                    <span><Calendar size={14} /> {new Date(date).toLocaleDateString()}</span>
                    <span><Users size={14} /> {people} {people === 1 ? 'Explorer' : 'Explorers'}</span>
                  </div>
                </div>
              </div>

              <div className="payment-summary-v3-modern">
                <div className="summary-pill-v3">
                  <label>Amount Paid</label>
                  <span className="paid-amount-v3">{formatPrice(paymentType === 'full' ? calculateTotal() : calculateTotal() * 0.1)}</span>
                </div>
                {paymentType === 'deposit' && (
                  <div className="summary-pill-v3 balance-pill-v3">
                    <label>Balance</label>
                    <span className="balance-amount-v3">{formatPrice(calculateTotal() * 0.9)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="success-footer-v3">
              <button className="finish-btn-v3" onClick={() => navigate('/dashboard')}>
                Explore My Dashboard <ArrowRight size={20} />
              </button>
              <button className="close-link-v3" onClick={() => setShowSuccessModal(false)}>
                Stay on page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
