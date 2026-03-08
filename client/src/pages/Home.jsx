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
        const updatedTours = (res.data || []).map(tour => {
          const title = tour.title?.toLowerCase() || '';
          if (title.includes('maasai mara')) {
            return { ...tour, image: "https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg" };
          }
          if (title.includes('amboseli')) {
            return { ...tour, image: "https://summerbreaksafaris.com/wp-content/uploads/2024/06/Amboseli-Tsavo-SaltLick-Safari.jpg" };
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

  // Define carousel slides as Services
  const carouselSlides = [
    {
      title: "Safari Rally Kenya",
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
      title: "Unforgettable Safaris",
      subtitle: "Nature & Wildlife",
      description: "Witness the Great Migration and the Big Five in Kenya's premier national parks and reserves.",
      image: "https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg",
      buttonText: "Explore Safaris",
      buttonLink: "/tours",
      tourTitle: "Safaris"
    },
    {
      title: "Epic Adventures",
      subtitle: "Push Your Limits",
      description: "From mountain climbing to adrenaline-pumping sports, discover your next big thrill.",
      image: "https://worldexpeditions.com/croppedimages/Africa/Kenya/mt-kenya-6875402-1100px.jpg?1753676995",
      buttonText: "View Adventures",
      buttonLink: "/adventures",
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
      title: "Premium Car Hire",
      subtitle: "Travel in Comfort",
      description: "Reliable and luxury vehicle rentals for your self-drive or chauffeured needs across Kenya.",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      buttonText: "Rent a Car",
      buttonLink: "/car-hire",
      tourTitle: "Car Hire"
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
                  {slide.isFeatured && (
                    <div className="miniplayer-mobile">
                      <video autoPlay muted loop playsInline>
                        <source src={slide.video} type="video/mp4" />
                      </video>
                      <div className="miniplayer-label">
                        <Play size={12} fill="currentColor" />
                        LIVE ACTION
                      </div>
                    </div>
                  )}
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
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kenya_KCB_Rally_Naivasha_3.jpg/1920px-Kenya_KCB_Rally_Naivasha_3.jpg" alt="Rally Fans" className="rally-img-sub" />
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
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section - Make all trips available */}
      <section className="featured-tours-section">
        <div className="section-header">
          <span>Explore Kenya</span>
          <h2>Safaris, Car Hire and Events</h2>
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
          <Link to="/tours" className="btn-modern-secondary-prominent">
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
            <div className="activity-img" style={{backgroundImage: "url('https://www.discoverafrica.com/wp-content/uploads/2014/01/Hot-Air-Balloon.jpg')"}}></div>
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
              <img src="https://summerbreaksafaris.com/wp-content/uploads/2024/06/Amboseli-Tsavo-SaltLick-Safari.jpg" alt="Amboseli" />
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
          <div className="culture-card" style={{backgroundImage: "url('https://i0.wp.com/nairobifashionhub.co.ke/wp-content/uploads/2020/03/Nairobi-fashion-hub-Top-10-gift-shops-in-Kenya-1.jpg?ssl=1')"}}>
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
