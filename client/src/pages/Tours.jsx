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
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  Compass
} from 'lucide-react';
import '../styles/Tours.css';
import { useCurrency } from '../context/CurrencyContext';
import API_BASE_URL from '../api/config';

const Tours = () => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
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
        const response = await axios.get(`${API_BASE_URL}/api/tours`);
        
        setTours(response.data || []);
        setFilteredTours(response.data || []);
      } catch (error) {
        console.error('Error fetching tours:', error);
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
      
      <section className="hero-carousel tours-hero">
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
                style={{ backgroundImage: `url(${slide.image})` }}
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
            <ChevronLeft size={24} />
          </button>
          <button 
            className="carousel-arrow next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          <div className="carousel-indicators">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="all-tours-section">
        <div className="tours-container-inner">
          <div className="filter-wrapper-modern">
            <div className="section-header">
              <span>Our Collection</span>
              <h2>Discovery Awaits</h2>
            </div>

            <div className="filter-bar-modern">
              <div className="search-box-modern">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-actions-modern">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="name">Sort By Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                <button 
                  className={`filter-toggle ${showFilters ? 'active' : ''}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} />
                  <span>Advanced</span>
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="advanced-filters-modern">
                <div className="filter-item-modern">
                  <label>Max Price: {formatPrice(priceRange[1])}</label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                </div>
                <button className="reset-btn-modern" onClick={clearFilters}>Reset Filters</button>
              </div>
            )}
          </div>

          <div className="tours-grid-modern">
            {filteredTours.length > 0 ? (
              filteredTours.map((tour, index) => (
                <div key={tour._id || index} className="tour-card-home">
                  <div 
                    className="tour-card-image" 
                    style={{ backgroundImage: `url(${tour.image})` }}
                  >
                    <div className="tour-card-overlay">
                      <div className="tour-badge-top">{tour.category}</div>
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
                      <span>View Experience</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results-modern">
                <Compass size={60} />
                <h3>No adventures found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
                <button onClick={clearFilters} className="btn-modern-primary">Clear All Filters</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
