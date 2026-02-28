import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
  Sparkles
} from 'lucide-react';
import '../styles/Home.css';
import heroVideo from '../assets/184737-873923039_small.mp4';
import safariRallyVideo from '../assets/safari-rally.mp4';
import { useCurrency } from '../context/CurrencyContext';

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get('https://tujibambe2.onrender.com/api/tours');
        console.log('Fetched tours:', res.data); // Debug log
        
        // Update images in frontend to ensure they show correctly even if DB hasn't synced
        const updatedTours = res.data.map(tour => {
          if (tour.title.toLowerCase().includes('maasai mara')) {
            return { ...tour, image: "https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg" };
          }
          if (tour.title.toLowerCase().includes('amboseli')) {
            return { ...tour, image: "https://www.amboselikenyasafaris.com/wp-content/uploads/2024/02/GIRAFFES-IN-AMBOSELI-750x450.jpg" };
          }
          return tour;
        });

        setFeaturedTours(updatedTours);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };
    fetchTours();
  }, []);

  const getTourByTitle = (title) => {
    return featuredTours.find(t => t.title.toLowerCase().includes(title.toLowerCase()));
  };

  const hikingTour = getTourByTitle("Mount Kenya Expedition");
  const safariTour = getTourByTitle("Maasai Mara Safari");
  const beachTour = getTourByTitle("Diani Beach Relaxation");
  const safariRallyTour = getTourByTitle("Safari Rally Kenya");
  const amboseliTour = getTourByTitle("Amboseli National Park Safari");

  // Define carousel slides with direct tour IDs
  const carouselSlides = [
    {
      title: "Safari Rally Kenya 2026",
      subtitle: "World Rally Championship",
      description: `Experience the thrill of high-speed rally racing across Kenya's stunning landscapes. All-inclusive transport for only ${formatPrice(20)}.`,
      image: "https://image.api.sportal365.com/process/smp-images-production/pulselive.co.ke/22082024/e9bbcf6d-d167-4b86-b649-1743f9967943",
      video: safariRallyVideo,
      isFeatured: true,
      buttonText: "Book Your Seat",
      buttonLink: safariRallyTour ? `/tours/${safariRallyTour._id}` : "/tours",
      tourTitle: "Safari Rally Kenya"
    },
    {
      title: "Maasai Mara Safari",
      subtitle: "Witness the Great Migration",
      description: "Experience the world's most famous wildlife reserve and the Big Five",
      image: "https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg",
      buttonText: "Explore",
      buttonLink: safariTour ? `/tours/${safariTour._id}` : "/tours", // Direct Maasai Mara ID
      tourTitle: "Maasai Mara Safari"
    },
    {
      title: "Amboseli National Park Safari",
      subtitle: "Elephant Paradise",
      description: "Witness massive elephant herds against the backdrop of Mt. Kilimanjaro",
      image: "https://www.amboselikenyasafaris.com/wp-content/uploads/2024/02/GIRAFFES-IN-AMBOSELI-750x450.jpg",
      buttonText: "View Park",
      buttonLink: amboseliTour ? `/tours/${amboseliTour._id}` : "/tours",
      tourTitle: "Amboseli National Park Safari"
    },
    {
      title: "Mount Kenya Expedition",
      subtitle: "Climb Africa's Second Highest Peak",
      description: "A thrilling adventure to the summit with breathtaking alpine views",
      image: "https://worldexpeditions.com/croppedimages/Africa/Kenya/mt-kenya-6875402-1100px.jpg?1753676995",
      buttonText: "Start Climb",
      buttonLink: hikingTour ? `/tours/${hikingTour._id}` : "/tours", // Direct Mount Kenya ID
      tourTitle: "Mount Kenya Expedition"
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
              className={`carousel-slide ${index === currentSlide ? 'active' : ''} ${slide.isFeatured ? 'featured-slide' : ''}`}
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
                  {slide.isFeatured && <span className="featured-badge"><Award size={16} /> <Sparkles size={16} style={{marginRight: '8px'}} /> Exclusive Experience</span>}
                  <span className="carousel-subtitle">{slide.subtitle}</span>
                  <h1 className="carousel-title">
                    {slide.title.split(' ').map((word, i) => (
                      i === slide.title.split(' ').length - 1 ? <span key={i} className="text-gradient"> {word}</span> : word + ' '
                    ))}
                  </h1>
                  <p className="carousel-description">{slide.description}</p>
                  
                  {slide.tour && (
                    <div className="carousel-details">
                      <div className="detail-item">
                        <span className="detail-label">Next Date:</span>
                        <span className="detail-value">{new Date(slide.tour.eventDate).toLocaleDateString('en-GB', { 
                          day: 'numeric', 
                          month: 'long'
                        })}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">From:</span>
                        <span className="detail-value text-gradient">{formatPrice(slide.tour.price)}</span>
                      </div>
                    </div>
                  )}

                  <div className="carousel-btns">
                    <Link 
                      to={slide.buttonLink}
                      className="btn-modern-primary"
                    >
                      <span className="btn-text">{slide.buttonText}</span>
                      <span className="btn-icon"><ChevronRight size={20} /></span>
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

      {/* Why Choose Us Section */}
      <section className="features-section">
        <div className="section-header">
          <span>The Art of Adventure</span>
          <h2>Why Adventure with Tujibambe?</h2>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <div className="icon-box"><Compass /></div>
            <h3>Expert Guides</h3>
            <p>Our team of certified local experts is dedicated to your safety and discovery.</p>
          </div>
          <div className="feature-item">
            <div className="icon-box"><Map /></div>
            <h3>Untamed Landscapes</h3>
            <p>From savannahs to snow-capped peaks, experience Africa's raw beauty.</p>
          </div>
          <div className="feature-item">
            <div className="icon-box"><Shield /></div>
            <h3>Eco-Friendly Travel</h3>
            <p>We prioritize sustainable tourism to protect the wild for generations to come.</p>
          </div>
          <div className="feature-item">
            <div className="icon-box"><Award /></div>
            <h3>Luxury Safari</h3>
            <p>Experience the perfect blend of wild adventure and premium comfort.</p>
          </div>
        </div>
      </section>

      {/* Safari Rally Redesigned Elite Experience Section - V2 "Speed & Dust" */}
      <section className="rally-ultra-section">
        <div className="rally-bg-text">SAFARI RALLY</div>
        <div className="rally-container">
          <div className="rally-visual-side">
            <div className="main-image-wrapper">
              <img src="https://image.api.sportal365.com/process/smp-images-production/pulselive.co.ke/22082024/e9bbcf6d-d167-4b86-b649-1743f9967943" alt="Safari Rally" className="rally-img-main" />
              <div className="rally-overlay-tint"></div>
              <div className="speed-tag">
                <Zap size={20} />
                <span>TOP SPEED EXPERIENCE</span>
              </div>
            </div>
            <div className="secondary-image-wrapper">
              <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Rally Fans" className="rally-img-sub" />
              <div className="exclusive-badge">
                <Star fill="currentColor" size={12} />
                <span>EXCLUSIVE</span>
              </div>
            </div>
          </div>

          <div className="rally-content-side">
            <div className="rally-header">
              <div className="rally-tagline">
                <span className="line"></span>
                <span className="text">World Rally Championship</span>
              </div>
              <h2 className="rally-title">
                Safari Rally<br />
                <span className="outline-text">Kenya</span> <span className="highlight-text">2026</span>
              </h2>
            </div>

            <p className="rally-lead">
              Experience the pulse-pounding thrill of the world's toughest rally. 
              Witness dust, speed, and raw power in the heart of the Kenyan wild.
            </p>

            <div className="rally-perks">
              <div className="perk-card">
                <div className="perk-icon"><Flag /></div>
                <div className="perk-info">
                  <h4>Prime Stages</h4>
                  <p>Access to the most iconic viewing points.</p>
                </div>
              </div>
              <div className="perk-card">
                <div className="perk-icon"><Users /></div>
                <div className="perk-info">
                  <h4>VIP Transport</h4>
                  <p>Luxury shuttle from CBD to the stages.</p>
                </div>
              </div>
            </div>

            <div className="rally-footer">
              <div className="price-box">
                <span className="price-label">All-Inclusive</span>
                <span className="price-amount">{formatPrice(20)}</span>
              </div>
              <Link to={safariRallyTour ? `/tours/${safariRallyTour._id}` : "/tours"} className="rally-cta-btn">
                <span>Book Your Seat</span>
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section - Make all trips available */}
      <section className="featured-tours-section">
        <div className="section-header">
          <span>Explore Kenya</span>
          <h2>Available Adventures</h2>
        </div>
        <div className="tours-grid-home">
          {featuredTours.map((tour) => (
            <div key={tour._id} className="tour-card-home">
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
                <Link to={`/tours/${tour._id}`} className="tour-card-btn">
                  View Details <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/tours" className="btn-modern-secondary">
            View All Adventures <ArrowRight size={20} />
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
              <Mountain size={40} />
              <h3>Mountain Expeditions</h3>
              <p>Conquer the majestic peaks of Mt. Kenya and beyond.</p>
              <Link to={hikingTour ? `/tours/${hikingTour._id}` : "/tours"} className="btn-small">Explore Peak</Link>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-img" style={{backgroundImage: "url('https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg')"}}></div>
            <div className="activity-overlay">
              <Wind size={40} />
              <h3>Wilderness Safaris</h3>
              <p>Witness the Big Five in their natural, untouched habitat.</p>
              <Link to={safariTour ? `/tours/${safariTour._id}` : "/tours"} className="btn-small">Start Safari</Link>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}></div>
            <div className="activity-overlay">
              <Palmtree size={40} />
              <h3>Coastal Escapes</h3>
              <p>Relax on the pristine white sands of the Indian Ocean.</p>
              <Link to={beachTour ? `/tours/${beachTour._id}` : "/tours"} className="btn-small">View Coast</Link>
            </div>
          </div>
          <div className="activity-card">
            <div className="activity-img" style={{backgroundImage: "url('https://www.amboselikenyasafaris.com/wp-content/uploads/2024/02/GIRAFFES-IN-AMBOSELI-750x450.jpg')"}}></div>
            <div className="activity-overlay">
              <Camera size={40} />
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
              <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Great Rift Valley" />
            </div>
            <div className="gallery-caption">Great Rift Valley</div>
          </div>
          <div className="gallery-item">
            <div className="image-frame">
              <img src="https://images.unsplash.com/photo-1589182397057-b82d519d99c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Mt Kenya" />
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
              <img src="https://www.amboselikenyasafaris.com/wp-content/uploads/2024/02/GIRAFFES-IN-AMBOSELI-750x450.jpg" alt="Amboseli" />
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
          <div className="culture-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}>
            <div className="card-overlay"></div>
            <div className="card-content">
              <Music size={50} />
              <h3>Traditional Dances</h3>
              <p>Experience the rhythmic beats and vibrant jumps of the Maasai warriors.</p>
            </div>
          </div>
          <div className="culture-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}>
            <div className="card-overlay"></div>
            <div className="card-content">
              <Utensils size={50} />
              <h3>Local Cuisine</h3>
              <p>Savor the flavors of Nyama Choma, Ugali, and Swahili dishes from the coast.</p>
            </div>
          </div>
          <div className="culture-card" style={{backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"}}>
            <div className="card-overlay"></div>
            <div className="card-content">
              <Camera size={50} />
              <h3>Artisan Crafts</h3>
              <p>Discover intricate beadwork, wood carvings, and colorful Kiondos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Background */}
      <section className="stats-parallax">
        <div className="stats-container">
          <div className="stat-card">
            <h3>12k+</h3>
            <p>Happy Travelers</p>
          </div>
          <div className="stat-card">
            <h3>50+</h3>
            <p>Destinations</p>
          </div>
          <div className="stat-card">
            <h3>250+</h3>
            <p>Tours Completed</p>
          </div>
          <div className="stat-card">
            <h3>15+</h3>
            <p>Years Experience</p>
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

      {/* Newsletter Section -> Adventure Club */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join the Adventure Club</h2>
          <p>Subscribe to receive exclusive tour offers and wilderness tips.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
