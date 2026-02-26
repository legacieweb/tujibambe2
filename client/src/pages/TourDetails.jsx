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
  CheckCircle, 
  ShieldCheck, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Star,
  Share2,
  Heart
} from 'lucide-react';
import '../styles/TourDetails.css';
import safariRallyVideo from '../assets/safari-rally.mp4';

const TourDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/tours/${id}`);
        setTour(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  const nextImage = () => {
    if (!tour?.gallery) return;
    setActiveImageIndex((prev) => (prev + 1) % tour.gallery.length);
  };

  const prevImage = () => {
    if (!tour?.gallery) return;
    setActiveImageIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length);
  };

  if (loading) return (
    <div className="modern-loading-container">
      <div className="loading-pulse"></div>
      <p>Unfolding the map for your next journey...</p>
    </div>
  );
  
  if (!tour) return <div className="error-container">Tour not found</div>;

  const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image];
  const isDeadlinePassed = tour?.bookingDeadline && new Date(tour.bookingDeadline) < new Date();

  return (
    <div className="tour-details-modern-page">
      {/* Dynamic Image Gallery Slider */}
      <section className="gallery-slider-section">
        <div className="slider-main">
          <img src={images[activeImageIndex]} alt={tour.title} className="slider-img" />
          <div className="slider-overlay"></div>
          
          <div className="slider-controls">
            <button className="slider-btn prev" onClick={prevImage}><ChevronLeft size={24} /></button>
            <button className="slider-btn next" onClick={nextImage}><ChevronRight size={24} /></button>
          </div>

          <div className="slider-dots">
            {images.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === activeImageIndex ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(idx)}
              ></span>
            ))}
          </div>

          <div className="tour-header-floating">
            <div className="tour-badges">
              <span className="badge-category">{tour.category}</span>
              <span className="badge-rating"><Star size={14} fill="currentColor" /> 4.9 (120 Reviews)</span>
            </div>
            <h1>{tour.title}</h1>
            <div className="tour-quick-meta">
              <span><MapPin size={18} /> {tour.location}</span>
              <span><Clock size={18} /> {tour.duration}</span>
              <span><Users size={18} /> Max {tour.maxGroupSize} People</span>
            </div>
          </div>

          <div className="gallery-actions">
            <button className="action-circle-btn"><Heart size={20} /></button>
            <button className="action-circle-btn"><Share2 size={20} /></button>
          </div>
        </div>

        <div className="thumbnail-strip">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`thumb-box ${idx === activeImageIndex ? 'active' : ''}`}
              onClick={() => setActiveImageIndex(idx)}
            >
              <img src={img} alt={`Thumbnail ${idx}`} />
            </div>
          ))}
        </div>
      </section>

      <div className="tour-details-grid-container">
        <div className="tour-content-main">
          <div className="content-card info-card">
            <div className="card-header">
              <h2><Info size={24} /> About this Experience</h2>
            </div>
            <div className="card-body">
              <p className="tour-description-text">{tour.description}</p>
              
              <div className="experience-highlights">
                <div className="highlight-item">
                  <CheckCircle size={18} />
                  <span>Professional Guide</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={18} />
                  <span>Transport Included</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={18} />
                  <span>Lunch & Refreshments</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={18} />
                  <span>Park Entry Fees</span>
                </div>
              </div>
            </div>
          </div>

          <div className="content-card video-card">
            <div className="card-header">
              <h2><Play size={24} /> Experience Highlights</h2>
            </div>
            <div className="card-body">
              <div className="video-container-modern">
                <video 
                  src={safariRallyVideo} 
                  controls 
                  className="experience-video"
                  poster={tour.image}
                ></video>
              </div>
            </div>
          </div>
        </div>

        <div className="tour-sidebar-booking">
          <div className="booking-sticky-card">
            <div className="booking-price-section">
              <span className="from-label">From</span>
              <div className="main-price">
                {formatPrice(tour.price)}
                <span className="per-person">/ person</span>
              </div>
            </div>

            <div className="booking-features">
              <div className="feature-line">
                <Calendar size={18} />
                <span>{tour.type === 'timed' ? `Fixed Date: ${new Date(tour.eventDate).toLocaleDateString()}` : 'Flexible Dates'}</span>
              </div>
              <div className="feature-line">
                <ShieldCheck size={18} />
                <span>Free Cancellation (up to 48h)</span>
              </div>
            </div>

            <div className="auto-shift-policy-box">
              <h4><Info size={16} /> Important Policies</h4>
              <p className="policy-text">
                <strong>Auto-Shift Policy:</strong> Single-person vehicle bookings may be consolidated for efficiency on the final day.
              </p>
              {tour.isAllInclusive && (
                <p className="policy-text">
                  <strong>All-Inclusive Transport:</strong> This tour price covers all transport costs to and from the venue.
                </p>
              )}
            </div>

            <button 
              className={`primary-book-now-btn ${isDeadlinePassed ? 'disabled' : ''}`}
              disabled={isDeadlinePassed}
              onClick={() => navigate(`/book/${id}`)}
            >
              {isDeadlinePassed ? 'Booking Closed' : 'Book Your Seats'}
            </button>

            <p className="no-money-yet">No money will be charged yet</p>
            
            <div className="guarantees">
              <div className="guarantee-item">
                <ShieldCheck size={16} /> Best Price Guaranteed
              </div>
              <div className="guarantee-item">
                <ShieldCheck size={16} /> Secure Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
