import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Users,
  Heart,
  Play,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  Compass
} from 'lucide-react';
import '../styles/Tours.css';
import { useCurrency } from '../context/CurrencyContext';

const Tours = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Fetch tours data
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://localhost:5000/api/tours'
          : 'https://tujibambe2.onrender.com/api/tours';
        const response = await axios.get(apiUrl);
        
        setTours(response.data || []);
        setFilteredTours(response.data || []);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Filter and sort tours
  useEffect(() => {
    let filtered = tours.filter(tour => {
      const matchesSearch = (tour.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (tour.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (tour.description || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || tour.category === selectedCategory;
      const matchesPrice = (tour.price || 0) >= priceRange[0] && (tour.price || 0) <= priceRange[1];
      const matchesRating = selectedRating === 0 || (tour.rating || 4.8) >= selectedRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Sort tours
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 4.8) - (a.rating || 4.8);
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredTours(filtered);
  }, [tours, searchTerm, selectedCategory, priceRange, selectedRating, sortBy]);

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (tourId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(tourId)) {
        newFavorites.delete(tourId);
      } else {
        newFavorites.add(tourId);
      }
      return newFavorites;
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange([0, 5000]);
    setSelectedRating(0);
    setSortBy('name');
  };

  const categories = ['All', ...new Set((tours || []).map(tour => tour.category).filter(Boolean))];



  // Carousel slides data
  const carouselSlides = [
    {
      title: "Epic Safaris",
      subtitle: "Wildlife & Nature",
      description: "Witness the Great Migration and the Big Five in Kenya's premier national parks and reserves.",
      image: "https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg",
      buttonText: "Explore Safaris",
      buttonLink: "/tours"
    },
    {
      title: "Mountain Expeditions",
      subtitle: "Adventure Awaits",
      description: "Conquer the majestic peaks of Mount Kenya and experience breathtaking alpine scenery.",
      image: "https://worldexpeditions.com/croppedimages/Africa/Kenya/mt-kenya-6875402-1100px.jpg?1753676995",
      buttonText: "Start Climbing",
      buttonLink: "/tours"
    },
    {
      title: "Coastal Escapes",
      subtitle: "Beach Paradise",
      description: "Relax on pristine white sands of the Indian Ocean with world-class snorkeling and diving.",
      image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      buttonText: "View Coastal Tours",
      buttonLink: "/tours"
    }
  ];

  return (
    <div className="tours-page">
      <SEO 
        title="Kenya Tours & Safari Packages - Tujibambe Adventures"
        description="Explore our hand-picked selection of adventure tours and safari packages in Kenya. From Maasai Mara wildlife safaris to Mount Kenya treks and coastal getaways."
        keywords="Kenya tours, safari packages, Maasai Mara, Mount Kenya, Diani Beach, Amboseli, Kenya travel, adventure tours, wildlife safaris, Kenyan destinations"
        canonical="https://tujibambe.iyonicorp.com/tours"
      />
      
      {/* Hero Carousel Section - Matching Home Page Style */}
      <section className="hero-carousel">
        <div 
          className="carousel-container" 
          ref={carouselRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div 
                className="carousel-bg"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="carousel-overlay"></div>
              </div>
              <div className="carousel-content">
                <div className="carousel-content-wrapper">
                  <div className="carousel-meta-top">
                    <span className="carousel-subtitle">{slide.subtitle}</span>
                    <div className="carousel-line"></div>
                  </div>
                  
                  <h1 className="carousel-title">
                    {slide.title.split(' ').map((word, i) => (
                      <React.Fragment key={i}>
                        {i === slide.title.split(' ').length - 1 ? <span className="text-gradient"> {word}</span> : word + ' '}
                      </React.Fragment>
                    ))}
                  </h1>
                  
                  <p className="carousel-description">{slide.description}</p>
                  
                  <div className="carousel-btns">
                    <Link 
                      to={slide.buttonLink}
                      className="btn-modern-primary"
                    >
                      <span className="btn-text">{slide.buttonText}</span>
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button 
            className="carousel-arrow prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            className="carousel-arrow next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={32} />
          </button>

          {/* Indicators */}
          <div className="carousel-indicators">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
       </section>

      {/* Featured Tours Section - Like Homepage */}
      <section className="featured-tours-section">
        <div className="section-header">
          <span>Explore Kenya</span>
          <h2>Safaris, Adventures & More</h2>
        </div>
        <div className="tours-grid-home">
          {tours.slice(0, 6).map((tour, index) => (
            <div key={tour._id || index} className="tour-card-home">
              <div 
                className="tour-card-image" 
                style={{ backgroundImage: `url(${tour.image})` }}
              >
                <div className="tour-card-overlay">
                  <div className="tour-card-price">{formatPrice(tour.price)}</div>
                </div>
              </div>
              <div className="tour-card-content">
                <h3>{tour.title}</h3>
                <div className="tour-card-meta">
                  <span><MapPin size={14} /> {tour.location}</span>
                  <span><Clock size={14} /> {tour.duration}</span>
                </div>
                <Link to={`/tours/${tour.slug || tour._id}`} className="tour-card-btn">
                  View Details <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/tours" className="btn-modern-secondary-prominent">
            View All Adventures <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* All Tours Section with Filters */}
      <section className="all-tours-section">
        <div className="section-header">
          <span>Browse All</span>
          <h2>Available Tours & Experiences</h2>
        </div>
        
        <div className="tours-container-inner">
          {/* Advanced Filter Bar */}
          <div className="filter-bar-redesign">
            <div className="search-box-redesign">
              <Search className="search-icon" size={22} />
              <input
                type="text"
                placeholder="Search tours, destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className={`filter-btn-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
            </div>

            {showFilters && (
              <div className="filters-expanded">
                <div className="filter-grid">
                  <div className="filter-item">
                    <label>Category</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-item">
                    <label>Price Range</label>
                    <div className="price-inputs">
                      <span>{formatPrice(priceRange[0])}</span>
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      />
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>

                  <div className="filter-item">
                    <label>Sort By</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="name">Name (A-Z)</option>
                      <option value="price-low">Price (Low to High)</option>
                      <option value="price-high">Price (High to Low)</option>
                      <option value="rating">Rating</option>
                      <option value="duration">Duration</option>
                    </select>
                  </div>
                </div>
                
                <div className="filter-actions">
                  <button className="reset-btn" onClick={clearFilters}>Reset All</button>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="results-summary">
            <p>
              Showing {filteredTours.length} of {tours.length} tours
              {favorites.size > 0 && (
                <span className="favorites-count"> • {favorites.size} favorited</span>
              )}
            </p>
          </div>

          {/* Tour Grid */}
          {filteredTours.length > 0 ? (
            <div className="tour-grid">
              {filteredTours.map((tour, index) => (
                <div
                  key={tour._id}
                  className="tour-card-wrapper"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="tour-card">
                    <div
                      className="tour-image"
                      style={{ backgroundImage: `url(${tour.image || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'})` }}
                    >
                      <div className="tour-overlay"></div>

                      <div className="tour-price-tag">
                        {formatPrice(tour.price)}
                      </div>

                      <button
                        className={`tour-favorite ${favorites.has(tour._id) ? 'favorite-active' : ''}`}
                        onClick={() => toggleFavorite(tour._id)}
                      >
                        <Heart size={20} fill={favorites.has(tour._id) ? 'currentColor' : 'none'} />
                      </button>

                      <button 
                        className="tour-play-btn"
                        onClick={() => navigate(`/tours/${tour.slug || tour._id}`)}
                      >
                        <Play size={20} />
                      </button>
                    </div>

                    <div className="tour-info">
                      <div className="tour-header">
                        <div className="tour-badges">
                          <span className="tour-category">{tour.category}</span>
                          <div className="tour-rating">
                            <Star size={14} fill="currentColor" />
                            {tour.rating || 4.8}
                          </div>
                        </div>

                        <h3>{tour.title}</h3>
                        <p className="tour-desc">{tour.description}</p>
                      </div>

                      <div className="tour-meta">
                        <span>
                          <MapPin size={16} />
                          {tour.location}
                        </span>
                        <span>
                          <Clock size={16} />
                          {tour.duration}
                        </span>
                        <span>
                          <Users size={16} />
                          Max {tour.maxGroupSize}
                        </span>
                      </div>

                      <div className="tour-footer">
                        <Link 
                          to={`/tours/${tour.slug || tour._id}`} 
                          className="view-details"
                        >
                          View Details
                          <ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-content">
                <Search size={64} />
                <h3>No tours found</h3>
                <p>Try adjusting your filters or search terms to find more adventures.</p>
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tours;
