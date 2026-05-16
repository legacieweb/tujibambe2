import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  Map, 
  Home, 
  Info, 
  Phone, 
  Car, 
  Compass, 
  Calendar, 
  Users, 
  ShieldCheck,
  FileText,
  Cookie,
  Eye
} from 'lucide-react';
import '../styles/Legal.css';

const Sitemap = () => {
  const links = [
    { title: 'Main Pages', items: [
      { name: 'Home', path: '/', icon: <Home size={18} /> },
      { name: 'Tours & Safaris', path: '/tours', icon: <Compass size={18} /> },
      { name: 'Car Hire', path: '/car-hire', icon: <Car size={18} /> },
      { name: 'Safari Rally 2026', path: '/safari-rally', icon: <Compass size={18} /> },
      { name: 'About Us', path: '/about', icon: <Info size={18} /> },
      { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
    ]},
    { title: 'Services', items: [
      { name: 'Corporate Retreats', path: '/corporate-retreats', icon: <Users size={18} /> },
      { name: 'Private Parties', path: '/private-parties', icon: <Calendar size={18} /> },
      { name: 'Wild Bush Weddings', path: '/wild-bush-weddings', icon: <Calendar size={18} /> },
      { name: 'Epic Fun Times', path: '/epic-fun-times', icon: <Compass size={18} /> },
      { name: 'Event Planner', path: '/event-planner', icon: <Calendar size={18} /> },
    ]},
    { title: 'Legal', items: [
      { name: 'Terms & Conditions', path: '/terms', icon: <FileText size={18} /> },
      { name: 'Privacy Policy', path: '/privacy', icon: <Eye size={18} /> },
      { name: 'Cookie Policy', path: '/cookies', icon: <Cookie size={18} /> },
      { name: 'Sitemap', path: '/sitemap', icon: <Map size={18} /> },
    ]}
  ];

  return (
    <div className="legal-page sitemap-page">
      <SEO 
        title="Sitemap - Tujibambe Adventures"
        description="Navigate through all pages of Tujibambe Adventures website."
      />
      
      <div className="legal-hero">
        <div className="legal-container">
          <h1 className="legal-title">Site<span className="text-primary">map</span></h1>
          <p className="legal-subtitle">Complete guide to our website structure</p>
        </div>
      </div>

      <div className="legal-content-section">
        <div className="legal-container">
          <div className="sitemap-grid">
            {links.map((group, index) => (
              <div key={index} className="sitemap-group">
                <h3>{group.title}</h3>
                <div className="sitemap-links">
                  {group.items.map((item, idx) => (
                    <Link key={idx} to={item.path} className="sitemap-link-item">
                      <span className="icon">{item.icon}</span>
                      <span className="name">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
