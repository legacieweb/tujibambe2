import React from 'react';
import { Compass, MapPin, DollarSign } from 'lucide-react';

const UserProfile = ({ user, bookings }) => {
  return (
    <div className="tab-view-container profile-view-elite fade-in">
      <div className="section-head-elite">
        <div className="title-area">
          <span className="subtitle-pill">Personal Identity</span>
          <h2>Account <span className="text-gradient">Profile</span></h2>
        </div>
      </div>
      
      <div className="profile-grid-elite">
        <div className="profile-main-card elite-glass">
          <div className="profile-cover-area"></div>
          <div className="profile-identity-section">
            <div className="avatar-wrapper-elite">
              <div className="avatar-large-elite">
                {user?.name?.charAt(0)}
              </div>
              <button className="edit-avatar-btn">+</button>
            </div>
            <div className="identity-text">
              <h3>{user?.name}</h3>
              <p className="member-since-tag">Explorer since {new Date().getFullYear()}</p>
            </div>
          </div>

          <div className="profile-info-grid">
            <div className="info-item-elite">
              <label>Full Name</label>
              <div className="info-value">{user?.name}</div>
            </div>
            <div className="info-item-elite">
              <label>Email Address</label>
              <div className="info-value">{user?.email}</div>
            </div>
            <div className="info-item-elite">
              <label>Phone Number</label>
              <div className="info-value">+254 7XX XXX XXX</div>
            </div>
            <div className="info-item-elite">
              <label>Country of Origin</label>
              <div className="info-value">Kenya</div>
            </div>
          </div>
          
          <div className="profile-actions-elite">
            <button className="btn-modern-primary sm">Edit Profile Info</button>
            <button className="btn-secondary-modern sm">Download Data</button>
          </div>
        </div>

        <div className="profile-stats-panel">
          <div className="stat-card-modern glass-card">
            <div className="stat-icon-wrap gold"><Compass size={24} /></div>
            <div className="stat-data">
              <strong>{bookings.filter(b => b.status === 'completed').length}</strong>
              <span>Trips Finished</span>
            </div>
          </div>
          <div className="stat-card-modern glass-card">
            <div className="stat-icon-wrap blue"><MapPin size={24} /></div>
            <div className="stat-data">
              <strong>1,240 km</strong>
              <span>Travelled</span>
            </div>
          </div>
          <div className="stat-card-modern glass-card">
            <div className="stat-icon-wrap green"><DollarSign size={24} /></div>
            <div className="stat-data">
              <strong>Elite</strong>
              <span>Membership</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
