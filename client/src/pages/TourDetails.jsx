import React, { useEffect, useState, useContext } from 'react';
import SEO from '../components/SEO';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import API_BASE_URL from '../api/config';
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
  X,
  ArrowRight,
  Compass
} from 'lucide-react';
import '../styles/TourDetails.css';

const TourDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const baseUrl = `${API_BASE_URL}/api`;
        const res = await axios.get(`${baseUrl}/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.error(err);
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

  if (!tour) return null;

  const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image];
  const isDeadlinePassed = tour.type === 'timed' 
    ? new Date(tour.eventDate) < new Date() 
    : (tour?.bookingDeadline && new Date(tour.bookingDeadline) < new Date());

  return (
    <div className="tour-details-v2">
      <SEO 
        title={`${tour.title} - Tujibambe Adventures`}
        description={tour.description}
        image={tour.image}
      />

      <div className="tour-hero-v2">
        <div className="hero-background-v2">
          <img src={images[activeImageIndex]} alt={tour.title} className="hero-img-v2" />
          <div className="hero-overlay-v2"></div>
        </div>

        <div className="hero-content-v2">
          <div className="container-v2">
            <div className="badge-row">
              <span className="glass-badge category-badge">{tour.category}</span>
              <span className="glass-badge rating-badge"><Star size={14} fill="var(--primary)" /> 4.9 (120)</span>
            </div>
            <h1 className="hero-title-v2">{tour.title}</h1>
            <div className="hero-meta-v2">
              <div className="meta-item-v2"><MapPin size={18} /> {tour.location}</div>
              <div className="meta-item-v2"><Clock size={18} /> {tour.duration}</div>
              <div className="meta-item-v2"><Users size={18} /> Max {tour.maxGroupSize} Guests</div>
            </div>
          </div>
        </div>

        <div className="hero-gallery-controls">
          <div className="gallery-counter">{activeImageIndex + 1} / {images.length}</div>
          <div className="gallery-nav-btns">
            <button onClick={prevImage} className="nav-btn-v2"><ChevronLeft size={20} /></button>
            <button onClick={nextImage} className="nav-btn-v2"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>

      <div className="details-container-v2">
        <div className="details-grid-v2">
          <main className="details-main-v2">
            <section className="section-v2">
              <div className="section-title-v2">
                <Compass size={24} className="text-primary" />
                <h2>The Experience</h2>
              </div>
              <p className="description-v2">{tour.description}</p>
            </section>

            <div className="features-grid-v2">
              <div className="feature-card-v2 inclusion">
                <h3>What's Included</h3>
                <ul className="feature-list-v2">
                  <li><CheckCircle size={18} /> Professional Guide</li>
                  <li><CheckCircle size={18} /> 4x4 Transport</li>
                  <li><CheckCircle size={18} /> {tour.title.toLowerCase().includes('lake victoria') ? 'Authentic Meals' : 'Lunch & Water'}</li>
                  <li><CheckCircle size={18} /> All Entry Fees</li>
                </ul>
              </div>

              <div className="feature-card-v2 exclusion">
                <h3>Not Included</h3>
                <ul className="feature-list-v2">
                  <li><X size={18} /> Personal Insurance</li>
                  <li><X size={18} /> Gratuities</li>
                  <li><X size={18} /> Extra Activities</li>
                </ul>
              </div>
            </div>

            {tour.video && (
              <section className="section-v2">
                <div className="section-title-v2">
                  <Play size={24} className="text-primary" />
                  <h2>Sneak Peek</h2>
                </div>
                <div className="video-wrapper-v2">
                  <video src={tour.video} controls poster={tour.image} className="video-player-v2" />
                </div>
              </section>
            )}
          </main>

          <aside className="details-sidebar-v2">
            <div className="booking-card-v2">
              <div className="price-tag-v2">
                <span className="price-label-v2">Starting from</span>
                <div className="price-value-v2">
                  {formatPrice(tour.price)}
                  <span className="price-unit-v2">/person</span>
                </div>
              </div>

              <div className="booking-features-v2">
                <div className="b-feature-v2">
                  <ShieldCheck size={18} />
                  <span>Free Cancellation</span>
                </div>
                <div className="b-feature-v2">
                  <CreditCard size={18} />
                  <span>Secure Payment</span>
                </div>
              </div>

              <button 
                className={`book-btn-v2 ${isDeadlinePassed ? 'disabled' : ''}`}
                disabled={isDeadlinePassed}
                onClick={() => navigate(`/booking/${id}`)}
              >
                {isDeadlinePassed ? 'Booking Closed' : 'Reserve Your Spot'}
                <ArrowRight size={20} />
              </button>

              <div className="booking-footer-v2">
                <Zap size={14} />
                <span>Quick confirmation guaranteed</span>
              </div>
            </div>

            <div className="sidebar-info-v2">
              <h4>Need Help?</h4>
              <p>Our travel experts are available 24/7 to help you plan your perfect trip.</p>
              <button className="help-btn-v2">Contact Support</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
