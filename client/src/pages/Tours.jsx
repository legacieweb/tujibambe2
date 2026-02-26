import React, { useState, useEffect, useRef } from 'react';
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
  X,
  Loader2
} from 'lucide-react';
import '../styles/Tours.css';
import { useCurrency } from '../context/CurrencyContext';
import safariRallyVideo from '../assets/safari-rally.mp4';

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
  const [heroStats, setHeroStats] = useState({
    totalTours: 0,
    totalDestinations: 0,
    totalReviews: 0
  });

  // Fetch tours data
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('https://tujibambe2.onrender.com/api/tours');
        setTours(response.data);
        setFilteredTours(response.data);

        // Calculate hero stats
        const destinations = new Set(response.data.map(tour => tour.location)).size;
        const reviews = response.data.reduce((sum, tour) => sum + (tour.reviews || 0), 0);

        setHeroStats({
          totalTours: response.data.length,
          totalDestinations: destinations,
          totalReviews: reviews
        });
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
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tour.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || tour.category === selectedCategory;
      const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1];
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

  const categories = ['All', ...new Set(tours.map(tour => tour.category))];

  if (loading) {
    return (
      <div className="modern-loading-container full-page">
        <div className="loading-pulse"></div>
        <h2>Discovering Kenya's Wonders</h2>
        <p>Loading amazing adventures...</p>
      </div>
    );
  }

  return (
    <div className="tours-page">
      {/* Immersive Hero Section */}
      <section className="tours-hero">
        <div className="hero-video-bg">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            poster="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-safari-jeep-driving-through-the-savanna-at-sunset-34354-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Explore Our Tours</h1>
          <p className="hero-subtitle">Discover the magic of Kenya through our hand-picked adventure experiences.</p>
        </div>
      </section>

      <div className="tours-container">
        {/* Advanced Filter Bar */}
        <div className="filter-bar">
          <div className="search-section">
            <div className="search-box">
              <Search size={20} color="#888" />
              <input
                type="text"
                placeholder="Search tours, destinations, or experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Advanced Filters
              <ChevronDown className={showFilters ? 'rotated' : ''} size={16} />
            </button>
          </div>

          {showFilters && (
            <div className="advanced-filters">
              <div className="filter-group">
                <label>Category</label>
                <div className="category-filters">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</label>
                <div className="price-slider">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Minimum Rating</label>
                <div className="rating-filters">
                  {[0, 3, 4, 4.5, 5].map(rating => (
                    <button
                      key={rating}
                      className={`rating-btn ${selectedRating === rating ? 'active' : ''}`}
                      onClick={() => setSelectedRating(rating)}
                    >
                      {rating === 0 ? 'All' : (
                        <>
                          <Star size={14} fill="currentColor" />
                          {rating}+
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Sort By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Rating</option>
                  <option value="duration">Duration</option>
                </select>
              </div>

              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All Filters
              </button>
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
                      onClick={(e) => {
                        if (tour.title.includes('Safari Rally')) {
                          // Navigate to tour details page to watch video
                          navigate(`/tours/${tour._id}`);
                        }
                      }}
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
                        to={`/tours/${tour._id}`} 
                        className="view-details"
                        onClick={() => console.log('Tour ID:', tour._id)}
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
    </div>
  );
};

export default Tours;
