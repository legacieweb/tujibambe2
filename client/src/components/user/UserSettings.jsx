import React from 'react';
import { Shield, Bell, MapPin } from 'lucide-react';

const UserSettings = () => {
  return (
    <div className="tab-view-container settings-view-elite fade-in">
      <div className="section-head-elite">
        <div className="title-area">
          <span className="subtitle-pill">Preferences</span>
          <h2>System <span className="text-gradient">Settings</span></h2>
        </div>
      </div>

      <div className="settings-grid-elite">
        <div className="settings-group-card elite-glass">
          <div className="group-header">
            <h3><Shield size={20} /> Security & Privacy</h3>
            <p>Manage your account credentials and data protection.</p>
          </div>
          <div className="settings-list-elite">
            <div className="setting-item-elite">
              <div className="setting-info">
                <strong>Two-Factor Authentication</strong>
                <p>Add an extra layer of security to your account logins.</p>
              </div>
              <button className="elite-toggle"></button>
            </div>
            <div className="setting-item-elite">
              <div className="setting-info">
                <strong>Change Account Password</strong>
                <p>Update your password to keep your travel data safe.</p>
              </div>
              <button className="btn-modern-primary sm">Update Now</button>
            </div>
          </div>
        </div>

        <div className="settings-group-card elite-glass">
          <div className="group-header">
            <h3><Bell size={20} /> Notification Settings</h3>
            <p>Control how and when you receive travel updates.</p>
          </div>
          <div className="settings-list-elite">
            <div className="setting-item-elite">
              <div className="setting-info">
                <strong>Email Itinerary Updates</strong>
                <p>Receive digital copies of your booking confirmations.</p>
              </div>
              <button className="elite-toggle active"></button>
            </div>
            <div className="setting-item-elite">
              <div className="setting-info">
                <strong>SMS Travel Alerts</strong>
                <p>Get real-time updates about your trip status.</p>
              </div>
              <button className="elite-toggle"></button>
            </div>
          </div>
        </div>

        <div className="settings-group-card elite-glass">
          <div className="group-header">
            <h3><MapPin size={20} /> Regional Preferences</h3>
            <p>Customize your currency and location-based experience.</p>
          </div>
          <div className="settings-list-elite">
            <div className="setting-item-elite">
              <div className="setting-info">
                <strong>Default Currency</strong>
                <p>Used for all booking price displays.</p>
              </div>
              <select className="elite-select">
                <option>USD - US Dollar</option>
                <option>KES - Kenyan Shilling</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
