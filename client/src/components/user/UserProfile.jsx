import React from 'react';
import { User, Mail, Phone, MapPin, Edit3, Camera } from 'lucide-react';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile-section-modern">
      <div className="section-header-modern">
        <h1 className="section-title-modern">My Profile</h1>
        <p className="section-subtitle-modern">Manage your personal information and preferences</p>
      </div>
      
      <div className="profile-grid-modern">
        <div className="modern-card profile-avatar-card">
          <div className="avatar-large" style={{ position: 'relative' }}>
            {user?.name?.charAt(0) || 'U'}
            <button className="avatar-edit-btn" style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '50%',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
              <Camera size={16} />
            </button>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '5px', color: 'white' }}>{user?.name || 'User'}</h2>
          <p style={{ color: 'var(--user-text-muted)', marginBottom: '25px' }}>{user?.email}</p>
          <button className="btn-modern-primary" style={{
            background: 'var(--user-accent-gradient)',
            border: 'none',
            color: '#fff',
            padding: '14px 25px',
            borderRadius: '14px',
            fontWeight: '700',
            width: '100%',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Edit Profile
          </button>
        </div>

        <div className="modern-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Personal Details
          </h3>
          <div className="profile-info-grid-modern">
            <div className="info-box-modern">
              <label><User size={14} /> Full Name</label>
              <p>{user?.name || 'N/A'}</p>
            </div>
            <div className="info-box-modern">
              <label><Mail size={14} /> Email Address</label>
              <p>{user?.email || 'N/A'}</p>
            </div>
            <div className="info-box-modern">
              <label><Phone size={14} /> Phone Number</label>
              <p>{user?.phone || '+254 7XX XXX XXX'}</p>
            </div>
            <div className="info-box-modern">
              <label><MapPin size={14} /> Location</label>
              <p>{user?.location || 'Nairobi, Kenya'}</p>
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(255, 77, 0, 0.05)', borderRadius: '16px', border: '1px dashed rgba(255, 77, 0, 0.2)' }}>
            <h4 style={{ color: '#ff4d00', marginBottom: '10px', fontSize: '1rem', fontWeight: '700' }}>Account Security</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Your account is secured with multi-factor authentication. 
              Keep your credentials safe for a better experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
