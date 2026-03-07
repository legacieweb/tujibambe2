import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SEO from '../components/SEO';
import { 
  Car, 
  Calendar, 
  MapPin, 
  Users, 
  Fuel, 
  Zap, 
  Shield, 
  Star,
  ChevronRight,
  Filter,
  Search,
  CheckCircle,
  Clock,
  ArrowRight,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import '../styles/Home.css';
import '../styles/Tours.css'; // Reusing some styles
import '../styles/CarHire.css';

const CarHire = () => {
  const { formatPrice, currency } = useCurrency();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    pickupLocation: 'Nairobi Airport',
    dropoffLocation: 'Nairobi Airport'
  });
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (bookingData.startDate && bookingData.endDate && selectedVehicle) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      const diffTime = Math.abs(end - start);
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      setTotalDays(days);
      setTotalPrice(days * selectedVehicle.pricePerDay);
    }
  }, [bookingData.startDate, bookingData.endDate, selectedVehicle]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('https://tujibambe2.onrender.com/api/vehicles');
      const data = await response.json();
      setVehicles(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setLoading(false);
    }
  };

  const handleBookClick = (vehicle) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setSelectedVehicle(vehicle);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!totalPrice) {
      alert('Please select valid dates');
      return;
    }

    try {
      await axios.post('https://tujibambe2.onrender.com/api/car-bookings', {
        vehicle: selectedVehicle._id,
        ...bookingData,
        totalPrice,
        currency
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert('Car hire request submitted successfully!');
      setShowBookingModal(false);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error booking car:', err);
      alert('Failed to submit booking. Please try again.');
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || v.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="car-hire-page home" style={{ paddingTop: '100px' }}>
      <SEO 
        title="Premium Car Hire Kenya - Tujibambe Adventures"
        description="Rent premium 4x4 vehicles, safari land cruisers, and luxury vans for your Kenya adventure. Best rates and well-maintained fleet for the ultimate road trip."
        keywords="car hire Kenya, rent a car Nairobi, safari vehicle rental, 4x4 rental Kenya, Tujibambe car hire"
        canonical="https://tujibambe.iyonicorp.com/car-hire"
      />

      {/* Hero Section */}
      <section className="car-hero">
        <div className="container">
          <span className="elite-subtitle">Elite Fleet</span>
          <h1 className="elite-title">Premium <span className="text-gradient">Car Hire</span> Solutions</h1>
          <p className="elite-description">
            Experience the freedom of the open road with our premium fleet of adventure-ready vehicles. 
            From rugged 4x4s to luxury vans, we have the perfect ride for your journey.
          </p>
          
          <div className="search-filter-bar">
            <div className="search-input-group">
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Search your dream car..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <Filter size={20} />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="All">All Vehicle Types</option>
                <option value="Land Cruiser">Land Cruisers</option>
                <option value="Van">Safari Vans</option>
                <option value="SUV">SUVs</option>
                <option value="Bus">Buses</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="vehicles-section">
        <div className="container">
          {loading ? (
            <div className="loading-state">Loading our fleet...</div>
          ) : filteredVehicles.length > 0 ? (
            <div className="vehicles-grid">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle._id} className="vehicle-card">
                  <div className="vehicle-image">
                    <img src={vehicle.image} alt={vehicle.name} />
                    <div className="vehicle-price-tag">
                      <span className="amount">{formatPrice(vehicle.pricePerDay)}</span>
                      <span className="period">/ day</span>
                    </div>
                  </div>
                  <div className="vehicle-content">
                    <div className="vehicle-header">
                      <h3>{vehicle.name}</h3>
                      <div className="vehicle-rating">
                        <Star size={16} fill="var(--primary)" color="var(--primary)" />
                        <span>{vehicle.rating || 4.8}</span>
                      </div>
                    </div>
                    <p className="vehicle-type">{vehicle.type}</p>
                    
                    <div className="vehicle-specs">
                      <div className="spec-item">
                        <Users size={16} />
                        <span>{vehicle.capacity} Seats</span>
                      </div>
                      <div className="spec-item">
                        <Zap size={16} />
                        <span>{vehicle.transmission || 'Manual'}</span>
                      </div>
                      <div className="spec-item">
                        <Fuel size={16} />
                        <span>{vehicle.fuel || 'Diesel'}</span>
                      </div>
                    </div>

                    <div className="vehicle-features-list">
                      {vehicle.features && vehicle.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="feature-pill">{f}</span>
                      ))}
                    </div>

                    <div className="vehicle-footer">
                      <button className="btn-modern-primary" onClick={() => handleBookClick(vehicle)}>
                        <span className="btn-text">Book Now</span>
                        <span className="btn-icon"><ArrowRight size={18} /></span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No vehicles found matching your search.</h3>
              <p>Try different keywords or filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && selectedVehicle && (
        <div className="admin-modal-overlay">
          <div className="admin-modal car-booking-modal modern-popup">
            <button className="close-modal" onClick={() => setShowBookingModal(false)}><X /></button>
            <div className="modal-flex">
              <div className="modal-image">
                <img src={selectedVehicle.image} alt={selectedVehicle.name} />
                <div className="selected-info">
                  <span className="elite-subtitle" style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>SECURE BOOKING</span>
                  <h3>{selectedVehicle.name}</h3>
                  <div className="modal-spec-row">
                    <span><Users size={14} /> {selectedVehicle.capacity} Seats</span>
                    <span><Zap size={14} /> {selectedVehicle.transmission}</span>
                  </div>
                </div>
              </div>
              <div className="modal-form-side">
                <div className="form-header">
                  <h3>Finalize Your <span className="text-gradient">Rental</span></h3>
                  <p>Experience premium comfort and safety.</p>
                </div>
                
                <form onSubmit={handleBookingSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Pickup Date</label>
                      <input 
                        type="date" 
                        required 
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingData.startDate}
                        onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Drop-off Date</label>
                      <input 
                        type="date" 
                        required 
                        min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                        value={bookingData.endDate}
                        onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Pickup Location</label>
                      <div className="input-with-icon">
                        <MapPin size={18} />
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g., Jomo Kenyatta Intl Airport"
                          value={bookingData.pickupLocation}
                          onChange={(e) => setBookingData({...bookingData, pickupLocation: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="form-group full-width">
                      <label>Drop-off Location</label>
                      <div className="input-with-icon">
                        <MapPin size={18} />
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g., Diani Beach Hotel"
                          value={bookingData.dropoffLocation}
                          onChange={(e) => setBookingData({...bookingData, dropoffLocation: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="booking-summary-card">
                    <div className="summary-row">
                      <span>Rate per day</span>
                      <span>{formatPrice(selectedVehicle.pricePerDay)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Duration</span>
                      <span>{totalDays} {totalDays === 1 ? 'Day' : 'Days'}</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                      <span>Total Price</span>
                      <span className="text-gradient">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <button type="submit" className="btn-modern-primary full-width hire-btn">
                    <span className="btn-text">Confirm Rental Request</span>
                    <span className="btn-icon"><CheckCircle size={20} /></span>
                  </button>
                  <p className="form-footer-note">No upfront payment required for reservation.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us */}
      <section className="why-hire-section">
        <div className="container">
          <div className="section-header center">
            <span className="elite-subtitle">The Tujibambe Advantage</span>
            <h2 className="elite-title">Why Rent From <span className="text-gradient">Us?</span></h2>
          </div>
          
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="icon-box"><Shield /></div>
              <h3>Full Insurance</h3>
              <p>Drive with peace of mind. All our rentals include comprehensive insurance coverage.</p>
            </div>
            <div className="advantage-card">
              <div className="icon-box"><MapPin /></div>
              <h3>Unlimited Mileage</h3>
              <p>No hidden costs. Explore as much as you want without worrying about mileage limits.</p>
            </div>
            <div className="advantage-card">
              <div className="icon-box"><Clock /></div>
              <h3>24/7 Support</h3>
              <p>Our dedicated support team is always available to assist you wherever you are.</p>
            </div>
            <div className="advantage-card">
              <div className="icon-box"><CheckCircle /></div>
              <h3>Well Maintained</h3>
              <p>Our fleet undergoes regular rigorous inspections to ensure safety and reliability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="car-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need a Custom Solution?</h2>
            <p>Looking for long-term rentals or corporate fleet services? Contact our experts for a personalized quote.</p>
            <Link to="/contact" className="btn-modern-secondary">
              <span className="btn-text">Get in Touch</span>
              <span className="btn-icon"><ChevronRight size={20} /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarHire;
