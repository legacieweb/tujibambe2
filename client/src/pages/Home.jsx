import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import { 
  Compass, 
  Map, 
  Shield, 
  Award, 
  ArrowRight, 
  Mountain, 
  Wind, 
  Camera, 
  Music, 
  Utensils, 
  Palmtree, 
  Globe, 
  Play, 
  MapPin,
  Clock,
  ChevronRight, 
  ChevronLeft,
  Trophy,
  Flag,
  Zap,
  Star,
  Users,
  Calendar,
  Sparkles,
  Car
} from 'lucide-react';
import '../styles/Home.css';
import heroVideo from '../assets/184737-873923039_small.mp4';
import { useCurrency } from '../context/CurrencyContext';
import { useLoading } from '../context/LoadingContext';

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://localhost:5000/api'
          : 'https://tujibambe2.onrender.com/api';

        const [toursRes, vehiclesRes] = await Promise.all([
          axios.get(`${baseUrl}/tours`),
          axios.get(`${baseUrl}/vehicles`)
        ]);

        let tours = toursRes.data || [];
        setVehicles(vehiclesRes.data || []);
        
        // Sort prioritized tours to the top
        const priorityOrder = ["Lake Victoria Expedition", "ROAD TRIP EXPERIENCE", "PARADISE ESCAPE"];
        tours.sort((a, b) => {
          const aIndex = priorityOrder.findIndex(title => a.title.toUpperCase().includes(title.toUpperCase()));
          const bIndex = priorityOrder.findIndex(title => b.title.toUpperCase().includes(title.toUpperCase()));
          
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return 0;
        });

        setFeaturedTours(tours);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const getTourByTitle = (title) => {
    return featuredTours.find(t => t.title.toLowerCase().includes(title.toLowerCase()));
  };

  const hikingTour = getTourByTitle("Mount Kenya Expedition");
  const safariTour = getTourByTitle("Maasai Mara Safari");
  const beachTour = getTourByTitle("Diani Beach Relaxation");
  const amboseliTour = getTourByTitle("Amboseli National Park Safari");
  const lakeVictoriaTour = getTourByTitle("Lake Victoria Expedition");
  const roadTripTour = getTourByTitle("ROAD TRIP EXPERIENCE");
  const paradiseEscapeTour = getTourByTitle("PARADISE ESCAPE");

  // Define carousel slides as Services
  const carouselSlides = [
    {
      title: "Tujibambe Paradise Escape",
      subtitle: "Upcoming Exclusive",
      description: "Experience the ultimate coastal luxury and hidden gems of Kenya's paradise islands.",
      image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      buttonText: "Join Paradise",
      buttonLink: paradiseEscapeTour ? `/tours/${paradiseEscapeTour.slug || paradiseEscapeTour._id}` : "/tours",
      tourTitle: "Paradise Escape"
    },
    {
      title: "Lake Victoria Expedition",
      subtitle: "Heart of the Lakeside",
      description: `Ultimate adventure from Nairobi to Kisumu. Enjoy free chicken, fish, and goat meat with unlimited drinks for only ${formatPrice(31)}.`,
      image: "https://journeysbydesign.com/wp-content/uploads/2016/12/Lake-Victoria-Dhow.jpg",
      buttonText: "Book Lake Trip",
      buttonLink: lakeVictoriaTour ? `/tours/${lakeVictoriaTour.slug || lakeVictoriaTour._id}` : "/tours",
      tourTitle: "Lake Victoria Expedition"
    },
    {
      title: "Unforgettable Safaris",
      subtitle: "Nature & Wildlife",
      description: "Witness the Great Migration and the Big Five in Kenya's premier national parks and reserves.",
      image: "https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg",
      buttonText: "Explore Safaris",
      buttonLink: safariTour ? `/tours/${safariTour.slug || safariTour._id}` : "/tours",
      tourTitle: "Safaris"
    },
    {
      title: "Epic Adventures",
      subtitle: "Push Your Limits",
      description: "From mountain climbing to adrenaline-pumping sports, discover your next big thrill.",
      image: "https://worldexpeditions.com/croppedimages/Africa/Kenya/mt-kenya-6875402-1100px.jpg?1753676995",
      buttonText: "View Adventures",
      buttonLink: hikingTour ? `/tours/${hikingTour.slug || hikingTour._id}` : "/adventures",
      tourTitle: "Adventures"
    },
    {
      title: "Epic Fun Times",
      subtitle: "Events & Nightlife",
      description: "Join the most vibrant parties and social events. Featured Tropical Pool Party this April!",
      image: "https://nax.today/storage/uploads/2025/07/nightlife-1752224415.jpg",
      buttonText: "Join the Fun",
      buttonLink: "/epic-fun-times",
      tourTitle: "Epic Fun Times"
    },
    {
      title: "Premium Fleet Rental",
      subtitle: "Explore in Style",
      description: "Rent rugged 4x4s, safari land cruisers, or luxury vans for the ultimate Kenyan road trip experience.",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      buttonText: "View Fleet",
      buttonLink: "/car-hire",
      tourTitle: "Car Hire"
    },
    {
      title: "Elite Event Planning",
      subtitle: "Bespoke Celebrations",
      description: "From intimate wilderness weddings to high-stakes corporate retreats, we craft world-class experiences.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      buttonText: "Start Planning",
      buttonLink: "/event-planner",
      tourTitle: "Event Planning"
    }
  ];

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

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };



  return (
    <div className="home">
      {/* Hero Carousel Section */}
      <section className="hero-carousel">
        <div 
          className="carousel-container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Slides */}
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
                {slide.video && (
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="slide-video-bg"
                    poster={slide.image}
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>
                )}
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
                      <ArrowRight size={18} />
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

      {/* Lake Victoria Expedition Redesigned Experience Section */}
      <section className="rally-ultra-section">
        <div className="rally-bg-text">LAKE VICTORIA</div>
        <div className="rally-container">
          <div className="rally-visual-side">
            <div className="main-image-wrapper">
              <img src="https://journeysbydesign.com/wp-content/uploads/2016/12/Lake-Victoria-Dhow.jpg" alt="Lake Victoria" className="rally-img-main" />
              <div className="rally-overlay-tint"></div>
              <div className="speed-tag">
                <Palmtree size={20} />
                <span>LAKESIDE SERENITY</span>
              </div>
            </div>
            <div className="secondary-image-wrapper">
              <img src="https://www.africanmeccasafaris.com/wp-content/uploads/pineapplebayresort5.jpg" alt="Kisumu Waterfront" className="rally-img-sub" />
              <div className="exclusive-badge">
                <Star fill="currentColor" size={12} />
                <span>EXOTIC</span>
              </div>
            </div>
          </div>

          <div className="rally-content-side">
            <div className="rally-header">
              <div className="rally-tagline">
                <span className="line"></span>
                <span className="text">The Ultimate Lakeside Adventure</span>
              </div>
              <h2 className="rally-title">
                Lake Victoria<br />
                <span className="outline-text">Expedition</span> <span className="highlight-text">2026</span>
              </h2>
            </div>

            <p className="rally-lead">
              Journey from Nairobi to Kisumu for a 3-day epic experience. 
              Indulge in the finest lakeside cuisine and breathtaking views.
            </p>

            <div className="rally-perks">
              <div className="perk-card">
                <div className="perk-icon"><Utensils /></div>
                <div className="perk-info">
                  <h4>Free Food & Drinks</h4>
                  <p>Unlimited drinks plus chicken, fish, and goat meat.</p>
                </div>
              </div>
              <div className="perk-card">
                <div className="perk-icon"><Calendar /></div>
                <div className="perk-info">
                  <h4>May 30 - June 1</h4>
                  <p>A perfectly planned 3-day getaway to the heart of Kisumu.</p>
                </div>
              </div>
            </div>

            <div className="rally-footer">
              <div className="price-box">
                <span className="price-label">Booking Fee</span>
                <span className="price-amount">{formatPrice(31)}</span>
              </div>
              <Link to={lakeVictoriaTour ? `/tours/${lakeVictoriaTour.slug || lakeVictoriaTour._id}` : "/tours"} className="rally-cta-btn">
                <span>Book Now</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section - Make all trips available */}
      <section className="featured-tours-section">
        <div className="section-header">
          <span>Our Collection</span>
          <h2>Safaris, Car Hire & Events</h2>
        </div>
        
        <div className="featured-container-ultra">
          <div className="tours-grid-home">
            {featuredTours.slice(0, 6).map((tour, index) => (
              <div key={tour._id || index} className={`tour-card-home ${index === 0 ? 'card-spotlight' : ''}`}>
                <div 
                  className="tour-card-image" 
                  style={{ backgroundImage: `url(${tour.image})` }}
                >
                  <div className="tour-card-overlay">
                    <div className="tour-badge-top">{tour.category || 'Premium'}</div>
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
                    <span>Discover More</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="view-all-container">
          <Link to="/tours" className="btn-modern-secondary-prominent">
            EXPLORE FULL CATALOG
          </Link>
        </div>
      </section>

      {/* Premium Fleet Section */}
      <section className="fleet-section">
        <div className="section-header">
          <span>Elite Fleet</span>
          <h2>Premium Car Hire</h2>
        </div>
        <div className="fleet-grid-modern">
          {vehicles.slice(0, 3).map((vehicle) => (
            <div key={vehicle.id || vehicle._id} className="fleet-card-modern">
              <div className="fleet-image-modern">
                <img src={vehicle.image} alt={vehicle.name} />
                <div className="fleet-price-badge">{formatPrice(vehicle.pricePerDay)}<span>/day</span></div>
              </div>
              <div className="fleet-info-modern">
                <div className="fleet-type-tag">{vehicle.type}</div>
                <h3>{vehicle.name}</h3>
                <div className="fleet-specs-modern">
                  <span><Users size={14} /> {vehicle.capacity} Seats</span>
                  <span><Zap size={14} /> {vehicle.transmission || 'Auto/Manual'}</span>
                </div>
                <Link to="/car-hire" className="fleet-btn-modern">
                  Reserve Vehicle <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/car-hire" className="btn-luxury-outline-small">
            VIEW ENTIRE FLEET
          </Link>
        </div>
      </section>

      {/* Thrilling Activities Section -> Adventure Services */}
      <section id="services" className="activities-section">
        <div className="section-header">
          <span>Wild & Free</span>
          <h2>Our Signature Adventures</h2>
        </div>
        <div className="activities-grid">
          <div className="activity-card">
            <div className="activity-img" style={{backgroundImage: "url('https://www.outdoorer.co/web/image/29558-f960a767/Beginner%20to%20Mt.%20Kenya%20in%2090%20Days.jpg')"}}></div>
            <div className="activity-overlay">
              <h3>Mountain Expeditions</h3>
              <p>Conquer the majestic peaks of Mt. Kenya and beyond.</p>
              <Link to={hikingTour ? `/tours/${hikingTour._id}` : "/tours"} className="btn-small">Explore Peak</Link>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-img" style={{backgroundImage: "url('https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg')"}}></div>
            <div className="activity-overlay">
              <h3>Wilderness Safaris</h3>
              <p>Witness the Big Five in their natural, untouched habitat.</p>
              <Link to={safariTour ? `/tours/${safariTour._id}` : "/tours"} className="btn-small">Start Safari</Link>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}></div>
            <div className="activity-overlay">
              <h3>Coastal Escapes</h3>
              <p>Relax on the pristine white sands of the Indian Ocean.</p>
              <Link to={beachTour ? `/tours/${beachTour._id}` : "/tours"} className="btn-small">View Coast</Link>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-img" style={{backgroundImage: "url('https://www.discoverafrica.com/wp-content/uploads/2014/01/Hot-Air-Balloon.jpg')"}}></div>
            <div className="activity-overlay">
              <h3>Balloon Flights</h3>
              <p>Soar above the savannah for a bird's eye view of the wild.</p>
              <Link to="/tours" className="btn-small">Book Flight</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Landscape Gallery Section -> Adventure Gallery */}
      <section className="gallery-section">
        <div className="section-header">
          <span>Visual Journey</span>
          <h2>Breathtaking Landscapes</h2>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item large">
            <div className="image-frame">
              <img src="https://www.thoughtco.com/thmb/b6o-DRRF_0ah7TZR97zgIWOk0NQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ethiopia-rift-valley-aerial-view-sb10068596hq-001-5878cd753df78c17b65b7898.jpg" alt="Great Rift Valley" />
            </div>
            <div className="gallery-caption">Great Rift Valley</div>
          </div>
          <div className="gallery-item">
            <div className="image-frame">
              <img src="https://afar.brightspotcdn.com/dims4/default/006514a/2147483647/strip/true/crop/728x500+36+0/resize/660x453!/format/webp/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F52%2F27%2F75e5a780203adc8e148104996ede%2Foriginal-925782c19d188263e00bf14985b940b2.jpg" alt="Mt Kenya" />
            </div>
            <div className="gallery-caption">Mt. Kenya Peaks</div>
          </div>
          <div className="gallery-item">
            <div className="image-frame">
              <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Diani Beach" />
            </div>
            <div className="gallery-caption">Diani Shoreline</div>
          </div>
          <div className="gallery-item">
            <div className="image-frame">
              <img src="https://www.ngorongorocratertanzania.org/wp-content/uploads/2019/09/Amboseli.jpg" alt="Amboseli" />
            </div>
            <div className="gallery-caption">Amboseli Giants</div>
          </div>
          <div className="gallery-item">
            <div className="image-frame">
              <img src="https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg" alt="Mara Sunset" />
            </div>
            <div className="gallery-caption">Maasai Mara Sunset</div>
          </div>
        </div>
      </section>

      {/* Rich Culture Section */}
      <section className="culture-section">
        <div className="section-header">
          <span>Heritage & Heart</span>
          <h2>Kenya's Rich Culture</h2>
        </div>
        <div className="culture-grid">
          <div className="culture-card" style={{backgroundImage: "url('https://safarisoko.com/wp-content/uploads/2024/08/traditional-music-dance-tanzania-1-1024x683.jpg')"}}>
            <div className="card-overlay"></div>
            <div className="card-content">
              <h3>Traditional Dances</h3>
              <p>Experience the rhythmic beats and vibrant jumps of the Maasai warriors.</p>
            </div>
          </div>
          <div className="culture-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}>
            <div className="card-overlay"></div>
            <div className="card-content">
              <h3>Local Cuisine</h3>
              <p>Savor the flavors of Nyama Choma, Ugali, and Swahili dishes from the coast.</p>
            </div>
          </div>
          <div className="culture-card" style={{backgroundImage: "url('https://i0.wp.com/nairobifashionhub.co.ke/wp-content/uploads/2020/03/Nairobi-fashion-hub-Top-10-gift-shops-in-Kenya-1.jpg?ssl=1')"}}>
            <div className="card-overlay"></div>
            <div className="card-content">
              <h3>Artisan Crafts</h3>
              <p>Discover intricate beadwork, wood carvings, and colorful Kiondos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Background */}
      <section className="stats-parallax">
        <div className="stats-overlay"></div>
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon"><Users size={32} /></div>
            <div className="stat-info">
              <h3>12k+</h3>
              <p>Happy Travelers</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Globe size={32} /></div>
            <div className="stat-info">
              <h3>50+</h3>
              <p>Destinations</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Trophy size={32} /></div>
            <div className="stat-info">
              <h3>250+</h3>
              <p>Tours Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Calendar size={32} /></div>
            <div className="stat-info">
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
      </section>


      
      {/* Why Choose Us Section */}
      <section className="features-section">
        <div className="section-header">
          <span>The Art of Adventure</span>
          <h2>Why Adventure with Tujibambe?</h2>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Expert Guides</h3>
            <p>Our team of certified local experts is dedicated to your safety and discovery.</p>
          </div>
          <div className="feature-item">
            <h3>Untamed Landscapes</h3>
            <p>From savannahs to snow-capped peaks, experience Africa's raw beauty.</p>
          </div>
          <div className="feature-item">
            <h3>Eco-Friendly Travel</h3>
            <p>We prioritize sustainable tourism to protect the wild for generations to come.</p>
          </div>
          <div className="feature-item">
            <h3>Luxury Safari</h3>
            <p>Experience the perfect blend of wild adventure and premium comfort.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section -> Guest Stories */}
      <section className="testimonials">
        <div className="section-header">
          <span>Traveler Stories</span>
          <h2>Guest Stories</h2>
        </div>
        <div className="testimonial-grid single-story">
          <div className="testimonial-card featured-story">
            <div className="quote-icon">"</div>
            <p>"The most breathtaking experience I've ever had. The attention to detail and the wild atmosphere are truly unmatched. I left feeling like a new person."</p>
            <div className="user-info">
              <div className="avatar">SA</div>
              <div>
                <h4>SOPHIA ANDERSON</h4>
                <span>Adventure Enthusiast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          "name": "Tujibambe Adventures",
          "description": "Discover unforgettable adventure tours and safari experiences in Kenya with Tujibambe. From Maasai Mara wildlife safaris to Mount Kenya treks and coastal getaways.",
          "url": "https://tujibambe.iyonicorp.com",
          "telephone": "+254 (000) 111-222",
          "email": "hello@tujibambe.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Adventure Lane",
            "addressLocality": "Nairobi",
            "addressCountry": "KE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -1.2921,
            "longitude": 36.8219
          },
          "priceRange": "$$",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "08:00",
            "closes": "18:00"
          },
          "image": "https://tujibambe.iyonicorp.com/og-image.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "120"
          }
        })}
      </script>
    </div>
  );
};

export default Home;
