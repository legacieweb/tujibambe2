import React from 'react';
import SEO from '../components/SEO';
import '../styles/Legal.css';

const Cookies = () => {
  return (
    <div className="legal-page">
      <SEO 
        title="Cookie Policy - Tujibambe Adventures"
        description="Information about how we use cookies on our website."
      />
      
      <div className="legal-hero">
        <div className="legal-container">
          <h1 className="legal-title">Cookie <span className="text-primary">Policy</span></h1>
          <p className="legal-subtitle">Last updated: May 2026</p>
        </div>
      </div>

      <div className="legal-content-section">
        <div className="legal-container">
          <div className="legal-text-wrapper">
            <section>
              <h2>1. What Are Cookies</h2>
              <p>Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
            </section>

            <section>
              <h2>2. How We Use Cookies</h2>
              <p>We use cookies to enhance your experience while using our website. We use cookies for things like currency selection persistence, user authentication, and site analytics.</p>
            </section>

            <section>
              <h2>3. Types of Cookies We Use</h2>
              <ul>
                <li><strong>Essential Cookies:</strong> These are cookies that are required for the operation of our website.</li>
                <li><strong>Analytical/Performance Cookies:</strong> They allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it.</li>
                <li><strong>Functionality Cookies:</strong> These are used to recognise you when you return to our website.</li>
              </ul>
            </section>

            <section>
              <h2>4. Managing Cookies</h2>
              <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
