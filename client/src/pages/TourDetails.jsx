import React, { useEffect, useState, useContext } from 'react';
import SEO from '../components/SEO';
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
  Zap,
  CreditCard,
  Info,
  Star,
  Share2,
  Heart,
  X
} from 'lucide-react';
import '../styles/TourDetails.css';

const TourDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://localhost:5000/api'
          : 'https://tujibambe2.onrender.com/api';
        const res = await axios.get(`${baseUrl}/tours/${id}`);
        let tourData = res.data;

        setTour(tourData);
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


  
  if (!tour) return <div className="error-container">Tour not found</div>;

  const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image];
  // Determine if booking is closed: 
  // For timed events (like Safari Rally), use the eventDate. If eventDate is passed, booking is closed.
  // For other tours, use bookingDeadline if available.
  const isDeadlinePassed = tour.type === 'timed' 
    ? new Date(tour.eventDate) < new Date() 
    : (tour?.bookingDeadline && new Date(tour.bookingDeadline) < new Date());

  return (
    <div className="tour-details-modern-page">
      <SEO 
        title={`${tour.title} - Tujibambe Adventures in Kenya`}
        description={tour.description}
        keywords={`${tour.title}, Kenya tours, ${tour.location}, adventure tours, safari, ${tour.category}`}
        canonical={`https://tujibambe.iyonicorp.com/tours/${id}`}
        image={tour.image}
      />

      {/* Structured Data for Tour */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TourPackage",
          "name": tour.title,
          "description": tour.description,
          "url": `https://tujibambe.iyonicorp.com/tours/${id}`,
          "provider": {
            "@type": "TouristAttraction",
            "name": "Tujibambe Adventures",
            "telephone": "+254 (000) 111-222",
            "email": "hello@tujibambe.com"
          },
          "image": tour.image,
          "price": tour.price,
          "priceCurrency": "USD",
          "location": {
            "@type": "Place",
            "name": tour.location,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "KE"
            }
          },
          "duration": tour.duration,
          "maximumAttendeeCapacity": tour.maxGroupSize,
          "inclusion": [
            "Professional Certified Guide",
            "Comfortable 4x4 Transport",
            "Lunch & Bottled Water",
            "All Park Entry Fees"
          ],
          "exclusion": [
            "Personal Insurance",
            "Optional Activities & Gratuities",
            "Alcoholic Beverages"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "120"
          }
        })}
      </script>
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
              {tour.isAllInclusive && <span className="badge-all-inclusive">All-Inclusive</span>}
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
              
              <div className="modern-inclusion-exclusion-grid">
                <div className="inclusion-card">
                  <div className="inclusion-card-header">
                    <div className="icon-wrapper">
                      <CheckCircle size={24} />
                    </div>
                    <h3>What's Included</h3>
                  </div>
                  <div className="inclusion-list">
                    <div className="inclusion-item">
                      <div className="inclusion-dot"></div>
                      <span>Professional Certified Guide</span>
                    </div>
                    <div className="inclusion-item">
                      <div className="inclusion-dot"></div>
                      <span>Comfortable 4x4 Transport</span>
                    </div>
                    <div className="inclusion-item">
                      <div className="inclusion-dot"></div>
                      <span>{tour.title.toLowerCase().includes('lake victoria') ? 'Chicken, Fish & Goat Meat' : 'Lunch & Bottled Water'}</span>
                    </div>
                    <div className="inclusion-item">
                      <div className="inclusion-dot"></div>
                      <span>{tour.title.toLowerCase().includes('lake victoria') ? 'Unlimited Drinks' : 'All Park Entry Fees'}</span>
                    </div>
                  </div>
                </div>

                <div className="exclusion-card">
                  <div className="exclusion-card-header">
                    <div className="icon-wrapper">
                      <X size={24} />
                    </div>
                    <h3>What's Not Included</h3>
                  </div>
                  <div className="inclusion-list exclusion">
                    <div className="inclusion-item">
                      <div className="exclusion-dot"></div>
                      <span>Personal Insurance</span>
                    </div>
                    <div className="inclusion-item">
                      <div className="exclusion-dot"></div>
                      <span>Optional Activities & Gratuities</span>
                    </div>
                    {!tour.title.toLowerCase().includes('lake victoria') && (
                      <div className="inclusion-item">
                        <div className="exclusion-dot"></div>
                        <span>Alcoholic Beverages</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {tour.video && (
            <div className="content-card video-card">
              <div className="card-header">
                <h2><Play size={24} /> Experience Highlights</h2>
              </div>
              <div className="card-body">
                <div className="video-container-modern">
                  <video 
                    src={tour.video} 
                    controls 
                    className="experience-video"
                    poster={tour.image}
                  ></video>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="tour-sidebar-booking">
          <div className="booking-sticky-card glass-morphism">
            <div className="popular-badge">
              <Zap size={14} />
              <span>Most Popular Choice</span>
            </div>

            <div className="booking-price-section">
              <div className="price-label-group">
                <span className="from-label">Special Offer From</span>
                <div className="main-price">
                  {formatPrice(tour.price)}
                  <span className="per-person">/ guest</span>
                </div>
              </div>
              <div className="save-badge">Save 15%</div>
            </div>

            <div className="booking-meta-grid">
              <div className="meta-item">
                <div className="meta-icon">
                  <Calendar size={18} />
                </div>
                <div className="meta-content">
                  <span className="meta-title">Selected Date</span>
                  <span className="meta-value">
                    {tour.type === 'timed' ? new Date(tour.eventDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible Dates'}
                  </span>
                </div>
              </div>
              
              <div className="meta-item">
                <div className="meta-icon">
                  <ShieldCheck size={18} />
                </div>
                <div className="meta-content">
                  <span className="meta-title">Cancellation</span>
                  <span className="meta-value">Free (up to 48h)</span>
                </div>
              </div>
            </div>

            <div className="policy-highlights">
              <div className="policy-card">
                <div className="policy-header">
                  <Info size={16} />
                  <span>Important Policy</span>
                </div>
                <p><strong>Auto-Shift:</strong> Single-person bookings may be consolidated for maximum efficiency.</p>
              </div>
            </div>

            <div className="booking-action-area">
              <button 
                className={`primary-book-now-btn ${isDeadlinePassed ? 'disabled' : ''}`}
                disabled={isDeadlinePassed}
                onClick={() => navigate(`/book/${id}`)}
              >
                {isDeadlinePassed ? 'Booking Closed' : 'Secure Your Spot Now'}
                <ChevronRight size={20} />
              </button>
              <p className="no-money-yet">
                <Zap size={12} className="text-primary" />
                No immediate payment required
              </p>
            </div>
            
            <div className="trust-signals">
              <div className="trust-item">
                <ShieldCheck size={16} />
                <span>Best Price Guarantee</span>
              </div>
              <div className="trust-item">
                <CreditCard size={16} />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
