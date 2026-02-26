import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Tours.css';

import { Map, Clock, ArrowRight, Search, Filter, Star, Heart, DollarSign } from 'lucide-react';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get('https://tujibambe2.onrender.com/api/tours');
        setTours(res.data);
        setFilteredTours(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const handleFilter = (cat) => {
    setCategory(cat);
    if (cat === 'All') {
      setFilteredTours(tours);
    } else {
      setFilteredTours(tours.filter(t => t.category === cat));
    }
  };

  const handleSort = (sortBy) => {
    setSort(sortBy);
    switch (sortBy) {
      case 'price-low':
        setFilteredTours([...filteredTours].sort((a, b) => a.price - b.price));
        break;
      case 'price-high':
        setFilteredTours([...filteredTours].sort((a, b) => b.price - a.price));
        break;
      case 'rating':
        setFilteredTours([...filteredTours].sort((a, b) => b.rating - a.rating));
        break;
      default:
        setFilteredTours(tours);
    }
  };

  const toggleFavorite = (tourId) => {
    setFavorites(prev => {
      if (prev.includes(tourId)) {
        return prev.filter(id => id !== tourId);
      } else {
        return [...prev, tourId];
      }
    });
  };

  if (loading) return <div className="loading">Loading Adventures...</div>;

  const categories = ['All', ...new Set(tours.map(t => t.category))];

  return (
    <div className="tours-page">
      <header className="tours-hero">
        <div className="hero-overlay"></div>
        <div className="tours-hero-content">
          <div className="hero-badge fade-in">
            <span className="badge-dot"></span>
            <span>Wild Kenya Awaits</span>
          </div>
          <h1>Discover Kenya's Wonders</h1>
          <p>Experience the magic of Kenya with our curated selection of adventures. From savannah safaris to coastal escapes, your dream journey starts here.</p>
        </div>
      </header>

      <div className="tours-container">
        <div className="stats-strip fade-in">
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Destinations</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">12k+</span>
            <span className="stat-label">Happy Travelers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Local Guides</span>
          </div>
        </div>

        <div className="filter-bar">
          <div className="search-box">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search adventures..." 
              onChange={(e) => {
                const term = e.target.value.toLowerCase();
                setFilteredTours(tours.filter(t => 
                  t.title.toLowerCase().includes(term) || 
                  t.location.toLowerCase().includes(term) ||
                  t.category.toLowerCase().includes(term)
                ));
              }}
            />
          </div>
          <div className="category-filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${category === cat ? 'active' : ''}`}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="sort-options">
            <select onChange={(e) => handleSort(e.target.value)}>
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="tour-grid">
          {filteredTours.map(tour => (
            <Link to={`/tours/${tour._id}`} key={tour._id} className="tour-card fade-in">
              <div className="tour-image" style={{backgroundImage: `url(${tour.image})`}}>
                <div className="tour-price-tag">${tour.price}</div>
                <div className="tour-favorite" onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(tour._id);
                }}>
                  <Heart 
                    size={20} 
                    className={favorites.includes(tour._id) ? 'favorite-active' : ''}
                  />
                </div>
              </div>
              <div className="tour-info">
                <div className="tour-badges">
                  <span className="tour-category">{tour.category}</span>
                  <span className="tour-rating">
                    <Star size={14} className="star-icon" />
                    {tour.rating || 4.8}
                  </span>
                </div>
                <h3>{tour.title}</h3>
                <p className="tour-desc">{tour.description.substring(0, 100)}...</p>
                <div className="tour-meta">
                  <span><Map size={16} /> {tour.location}</span>
                  <span><Clock size={16} /> {tour.duration}</span>
                  <span><DollarSign size={16} /> {tour.maxGroupSize} people max</span>
                </div>
                <div className="tour-footer">
                  <div className="view-details">
                    Explore Adventure <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tours;
