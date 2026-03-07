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

  // Fetch tours data
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('https://tujibambe2.onrender.com/api/tours');
        
        // Map high-quality images for specific tours to ensure they show correctly
        const updatedTours = (response.data || []).map(tour => {
          const title = tour.title?.toLowerCase() || '';
          if (title.includes('maasai mara')) {
            return { ...tour, image: "https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg" };
          }
          if (title.includes('amboseli')) {
            return { ...tour, image: "https://summerbreaksafaris.com/wp-content/uploads/2024/06/Amboseli-Tsavo-SaltLick-Safari.jpg" };
          }
          if (title.includes('mount kenya')) {
            return { ...tour, image: "https://worldexpeditions.com/croppedimages/Africa/Kenya/mt-kenya-6875402-1100px.jpg?1753676995" };
          }
          if (title.includes('safari rally')) {
            return { ...tour, image: "https://image.api.sportal365.com/process/smp-images-production/pulselive.co.ke/22082024/e9bbcf6d-d167-4b86-b649-1743f9967943" };
          }
          return tour;
        });

        setTours(updatedTours);
        setFilteredTours(updatedTours);
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
      <SEO 
        title="Kenya Tours & Safari Packages - Tujibambe Adventures"
        description="Explore our hand-picked selection of adventure tours and safari packages in Kenya. From Maasai Mara wildlife safaris to Mount Kenya treks and coastal getaways."
        keywords="Kenya tours, safari packages, Maasai Mara, Mount Kenya, Diani Beach, Amboseli, Kenya travel, adventure tours, wildlife safaris, Kenyan destinations"
        canonical="https://tujibambe.iyonicorp.com/tours"
      />
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
          <h1 className="hero-title">Tujibambe <span className="text-gradient">Safaris</span></h1>
          <p className="hero-subtitle">Your Journey, Our Passion. Experience the wild like never before with our curated adventure packages.</p>

        </div>
      </section>

      <div className="tours-container">
        {/* Advanced Filter Bar */}
        <div className="filter-bar-redesign">
          <div className="search-box-redesign">
            <Search className="search-icon" size={22} />
            <input
              type="text"
              placeholder="Where do you want to go?"
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
