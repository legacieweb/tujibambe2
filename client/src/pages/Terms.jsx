import React from 'react';
import SEO from '../components/SEO';
import '../styles/Legal.css';

const Terms = () => {
  return (
    <div className="legal-page">
      <SEO 
        title="Terms & Conditions - Tujibambe Adventures"
        description="Read our terms and conditions for using our services."
      />
      
      <div className="legal-hero">
        <div className="legal-container">
          <h1 className="legal-title">Terms & <span className="text-primary">Conditions</span></h1>
          <p className="legal-subtitle">Last updated: May 2026</p>
        </div>
      </div>

      <div className="legal-content-section">
        <div className="legal-container">
          <div className="legal-text-wrapper">
            <section>
              <h2>1. Agreement to Terms</h2>
              <p>By accessing our website at tujibambe.iyonicorp.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            </section>

            <section>
              <h2>2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on Tujibambe Adventures' website for personal, non-commercial transitory viewing only.</p>
            </section>

            <section>
              <h2>3. Disclaimer</h2>
              <p>The materials on Tujibambe Adventures' website are provided on an 'as is' basis. Tujibambe Adventures makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </section>

            <section>
              <h2>4. Limitations</h2>
              <p>In no event shall Tujibambe Adventures or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tujibambe Adventures' website.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
