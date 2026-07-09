import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mountain, 
  Wind, 
  Compass, 
  Map, 
  Zap, 
  ArrowRight, 
  ChevronRight,
  Globe,
  Camera,
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  Utensils
} from 'lucide-react';
import SEO from '../components/SEO';
import InquiryModal from '../components/InquiryModal';
import '../styles/Adventures.css';
import { useCurrency } from '../context/CurrencyContext';
import axios from 'axios';
import API_BASE_URL from '../api/config';

const categoryIcons = {
  'Mountain Expeditions': Mountain,
  'Wildlife Safaris': Wind,
  'Coastal Getaways': Globe,
  'Cultural Immersions': Users,
  'Adrenaline Sports': Zap,
  'Photography Tours': Camera,
  'Safaris': Wind,
  'Mountain': Mountain,
  'Beach': Globe,
  'Culture': Users
};

const categoryImages = {
  'Mountain Expeditions': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Wildlife Safaris': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Coastal Getaways': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Cultural Immersions': 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Adrenaline Sports': 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Photography Tours': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Safaris': 'https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg',
  'Mountain': 'https://worldexpeditions.com/croppedimages/Africa/Kenya/mt-kenya-6875402-1100px.jpg?1753676995',
  'Beach': 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'Culture': 'https://safarisoko.com/wp-content/uploads/2024/08/traditional-music-dance-tanzania-1-1024x683.jpg'
};

const Adventures = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const { formatPrice } = useCurrency();
  const [tours, setTours] = useState([]);
  const [adventureCategories, setAdventureCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getCategoryDescription = (category) => {
    const descriptions = {
      'Mountain Expeditions': 'Conquer Kenya\'s majestic peaks and witness breathtaking alpine views.',
      'Wildlife Safaris': 'Get up close with Africa\'s Big Five in their natural habitat.',
      'Coastal Getaways': 'Relax on pristine white sands and dive into turquoise waters.',
      'Cultural Immersions': 'Experience the rich traditions and vibrant heritage of Kenya.',
      'Adrenaline Sports': 'From bungee jumping to white-water rafting, feel the ultimate thrill.',
      'Photography Tours': 'Capture perfect shots with expert guides and stunning backdrops.',
      'Safaris': 'Witness the Great Migration and the Big Five in Kenya\'s premier parks.',
      'Mountain': 'Trek through breathtaking landscapes and conquer towering summits.',
      'Beach': 'Unwind on golden shores with crystal-clear waters.',
      'Culture': 'Immerse yourself in Kenya\'s rich cultural traditions.'
    };
    return descriptions[category] || `Explore our collection of ${category.toLowerCase()} adventures.`;
  };

  const getCategoryDuration = (category) => {
    const durations = {
      'Mountain Expeditions': '3-5 Days',
      'Wildlife Safaris': '2-4 Days',
      'Coastal Getaways': '3-7 Days',
      'Cultural Immersions': '1-2 Days',
      'Adrenaline Sports': '1 Day',
      'Photography Tours': '2-3 Days',
      'Safaris': '2-4 Days',
      'Mountain': '2-5 Days',
      'Beach': '3-5 Days',
      'Culture': '1-2 Days'
    };
    return durations[category] || '1-3 Days';
  };

  useEffect(() => {
    const fetchToursAndBuildCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/tours`);
        const toursData = response.data || [];
        setTours(toursData);

        // Build categories from tours - group by category
        const categoryMap = {};
        toursData.forEach(tour => {
          if (tour.category) {
            if (!categoryMap[tour.category]) {
              categoryMap[tour.category] = {
                title: tour.category,
                tours: [],
                minPrice: tour.price
              };
            }
            categoryMap[tour.category].tours.push(tour);
            categoryMap[tour.category].minPrice = Math.min(categoryMap[tour.category].minPrice || tour.price, tour.price || 10000);
          }
        });

        // Transform to display format
        const categories = Object.values(categoryMap).map(cat => ({
          title: cat.title,
          description: getCategoryDescription(cat.title),
          image: categoryImages[cat.title] || cat.tours[0]?.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
          price: cat.minPrice,
          duration: getCategoryDuration(cat.title),
          bookings: cat.tours.reduce((sum, t) => sum + (t.bookings || 0), 0) || Math.floor(Math.random() * 100) + 50,
          tourCount: cat.tours.length,
          tours: cat.tours,
          link: `/tours?category=${encodeURIComponent(cat.title)}`
        }));

        // Sort by tour count descending
        categories.sort((a, b) => b.tourCount - a.tourCount);
        setAdventureCategories(categories);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchToursAndBuildCategories();
  }, []);

  const filteredCategories = selectedCategory === 'All' 
    ? adventureCategories 
    : adventureCategories.filter(cat => cat.title === selectedCategory);

  const getFeaturedTour = (category) => {
    return tours.find(t => t.category === category);
  };

  const lakeVictoriaAdventure = {
    title: "The Ultimate Lakeside Adventure",
    subtitle: "Lake Victoria",
    location: "Kisumu, Kenya",
    duration: "3 Days / 2 Nights",
    price: 4026,
    image: "https://journeysbydesign.com/wp-content/uploads/2016/12/Lake-Victoria-Dhow.jpg",
    secondaryImage: "https://www.africanmeccasafaris.com/wp-content/uploads/pineapplebayresort5.jpg",
    gallery: [
      "https://journeysbydesign.com/wp-content/uploads/2016/12/Lake-Victoria-Dhow.jpg",
      "https://www.africanmeccasafaris.com/wp-content/uploads/pineapplebayresort5.jpg",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Journey from Nairobi to Kisumu for a 3-day epic experience. Indulge in the finest lakeside cuisine and breathtaking views.",
    features: [
      { icon: Utensils, title: "Free Food & Drinks", desc: "Unlimited drinks plus chicken, fish, and goat meat." }
    ]
  };

  return (
    <div className="adventures-page">
      <SEO 
        title="Epic Adventures - Tujibambe"
        description="Discover thrilling adventures across Kenya. From mountain climbing to coastal escapes."
      />

      <section className="adv-hero">
        <div className="adv-hero-bg">
          <div className="adv-hero-overlay"></div>
          <video autoPlay muted loop playsInline className="adv-hero-video">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-mountain-landscape-at-sunset-41716-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="adv-hero-content">
          <span className="adv-tag">PUSH YOUR LIMITS</span>
          <h1 className="adv-title">Epic <span className="text-primary">Adventures</span></h1>
          <p className="adv-description">
            Life is either a daring adventure or nothing at all. 
            Choose your next thrill and create memories that last a lifetime.
          </p>
          <div className="adv-hero-btns">
            <a href="#available-adventures" className="btn-modern-primary">
              Explore Now <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section id="explore" className="adv-categories">
        <div className="container">
          <div className="section-header-modern">
            <span>Choose Your Vibe</span>
            <h2>Adventure Categories</h2>
            <p>Handcrafted experiences from our tour collection. Each category powered by real adventures.</p>
          </div>

          <div className="category-filter-bar">
            <button 
              className={`filter-btn ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Adventures
            </button>
            {adventureCategories.map(cat => (
              <button 
                key={cat.title}
                className={`filter-btn ${selectedCategory === cat.title ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.title)}
              >
                {cat.title} ({cat.tourCount})
              </button>
            ))}
          </div>

          <div className="adv-grid">
            {filteredCategories.map((cat, index) => {
              const Icon = categoryIcons[cat.title] || Map;
              return (
                <div key={index} className="adv-card-enhanced">
                  <div className="adv-card-img" style={{backgroundImage: `url(${cat.image})`}}>
                    <div className="adv-card-overlay"></div>
                    <div className="adv-card-icon">
                      <Icon size={40} />
                    </div>
                  </div>
                  <div className="adv-card-content">
                    <div className="adv-badge-wrapper">
                      <span className="adv-tour-count">{cat.tourCount} Adventures</span>
                    </div>
                    <h3>{cat.title}</h3>
                    <p>{cat.description}</p>
                    <div className="adv-card-stats">
                      <div className="stat-item">
                        <span className="stat-value">{formatPrice(cat.price)}</span>
                        <span className="stat-label">Starting Price</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">{cat.bookings}+</span>
                        <span className="stat-label">Bookings</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">{cat.duration}</span>
                        <span className="stat-label">Duration</span>
                      </div>
                    </div>
                    <Link to={cat.link} className="adv-card-link">
                      Explore Adventures <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="available-adventures" className="all-adventures-section">
        <div className="container">
          <div className="section-header-modern">
            <span>All Adventures</span>
            <h2>Book Your Next Journey</h2>
            <p>Choose from our collection of epic experiences. Select your preferred dates and start your adventure.</p>
          </div>

          <div className="adventures-grid-modern">
            {filteredCategories.map((adv, index) => {
              const featuredTour = getFeaturedTour(adv.title);
              const tourImage = featuredTour?.image || adv.image;
              return (
                <div key={index} className="adventure-card-enhanced">
                  <div className="adventure-image-new" style={{backgroundImage: `url(${tourImage})`}}>
                    <div className="adventure-overlay-new">
                      <div className="adventure-price-badge">{formatPrice(adv.price)}<span>/person</span></div>
                      <div className="adventure-date-selector">
                        <Calendar size={16} />
                        <input type="date" className="date-input" />
                      </div>
                    </div>
                  </div>
                  <div className="adventure-content-new">
                    <div className="adventure-meta-new">
                      <span className="adventure-category-new">{adv.title}</span>
                      <div className="adventure-rating-new">
                        <Star size={14} fill="var(--primary)" />
                        <span>4.8</span>
                      </div>
                    </div>
                    <h3 className="adventure-title-new">{adv.description}</h3>
                    <div className="adventure-details-new">
                      <span><MapPin size={14} /> Kenya</span>
                      <span><Clock size={14} /> {adv.duration}</span>
                    </div>
                    <div className="adventure-tours-preview">
                      {adv.tours?.slice(0, 3).map((tour, idx) => (
                        <div key={tour._id || idx} className="tour-preview-item">
                          <span className="tour-preview-name">{tour.title}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={adv.link} className="adventure-book-btn">
                      <span>View {adv.tourCount} Tours</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="view-all-container">
            <Link to="/tours" className="btn-modern-secondary-prominent">
              VIEW ALL TOURS
            </Link>
          </div>
        </div>
      </section>

      <section className="lake-victoria-adventure-section">
        <div className="container">
          <div className="lake-adventure-wrapper">
            <div className="lake-gallery">
              <div className="main-image">
                <img src={lakeVictoriaAdventure.image} alt="Lake Victoria" />
                <div className="gallery-overlay">
                  <span className="gallery-badge">EXOTIC</span>
                </div>
              </div>
              <div className="thumbnail-grid">
                {lakeVictoriaAdventure.gallery.slice(1).map((img, idx) => (
                  <div key={idx} className="thumb-item" style={{backgroundImage: `url(${img})`}}></div>
                ))}
              </div>
            </div>
            
            <div className="lake-adventure-content">
              <div className="rally-tagline">
                <span className="line"></span>
                <span className="text">{lakeVictoriaAdventure.subtitle} Expedition</span>
              </div>
              <h2 className="rally-title">
                {lakeVictoriaAdventure.title}
                <span className="year-badge">2026</span>
              </h2>
              <p className="rally-lead">{lakeVictoriaAdventure.description}</p>

              <div className="lake-perks">
                {lakeVictoriaAdventure.features.map((feature, idx) => (
                  <div key={idx} className="perk-card">
                    <div className="perk-icon"><feature.icon /></div>
                    <div className="perk-info">
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lake-adventure-footer">
                <div className="price-box">
                  <span className="price-label">Booking Fee</span>
                  <span className="price-amount">{formatPrice(lakeVictoriaAdventure.price)}</span>
                </div>
                <Link to="/tours/lake-victoria-expedition" className="rally-cta-btn">
                  Book Now <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="adv-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready for your next journey?</h2>
            <p>Contact our experts to plan your customized adventure today.</p>
            <button 
              onClick={() => setIsInquiryOpen(true)} 
              className="btn-modern-primary"
            >
              Start Planning <Compass size={20} />
            </button>
          </div>
        </div>
      </section>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        defaultSubject="Adventure Planning Inquiry"
      />
    </div>
  );
};

export default Adventures;