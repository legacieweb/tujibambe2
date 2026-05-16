import React from 'react';
import SEO from '../components/SEO';
import '../styles/Legal.css';

const Privacy = () => {
  return (
    <div className="legal-page">
      <SEO 
        title="Privacy Policy - Tujibambe Adventures"
        description="Learn how we handle your personal information and data."
      />
      
      <div className="legal-hero">
        <div className="legal-container">
          <h1 className="legal-title">Privacy <span className="text-primary">Policy</span></h1>
          <p className="legal-subtitle">Last updated: May 2026</p>
        </div>
      </div>

      <div className="legal-content-section">
        <div className="legal-container">
          <div className="legal-text-wrapper">
            <section>
              <h2>1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us.</p>
            </section>

            <section>
              <h2>2. How We Use Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, such as to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, and provide customer support.</p>
            </section>

            <section>
              <h2>3. Sharing of Information</h2>
              <p>We may share the information we collect about you as described in this statement or as described at the time of collection or sharing, including with third-party service providers who require access to such information to carry out work on our behalf.</p>
            </section>

            <section>
              <h2>4. Data Security</h2>
              <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
