import React from 'react';
import { Bell, Lock, Shield, Eye, CreditCard, HelpCircle } from 'lucide-react';

const UserSettings = () => {
  return (
    <div className="user-settings-section-modern">
      <div className="section-header-modern">
        <h1 className="section-title-modern">Settings</h1>
        <p className="section-subtitle-modern">Manage your account preferences, security, and notification settings</p>
      </div>

      <div className="modern-card">
        <div className="settings-list-modern">
          <div className="settings-item-modern">
            <div className="settings-item-icon">
              <Bell size={20} />
            </div>
            <div className="settings-item-text">
              <h4>Push Notifications</h4>
              <p>Get alerted about new tour availability and booking updates</p>
            </div>
            <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
              <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
              <span className="slider round" style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(255,255,255,0.1)',
                transition: '.4s',
                borderRadius: '34px'
              }}></span>
            </label>
          </div>

          <div className="settings-item-modern">
            <div className="settings-item-icon">
              <Lock size={20} />
            </div>
            <div className="settings-item-text">
              <h4>Change Password</h4>
              <p>Update your password to keep your account secure</p>
            </div>
            <button className="btn-modern-outline" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--user-border)',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>Update</button>
          </div>

          <div className="settings-item-modern">
            <div className="settings-item-icon">
              <CreditCard size={20} />
            </div>
            <div className="settings-item-text">
              <h4>Payment Methods</h4>
              <p>Manage your saved cards and payment preferences</p>
            </div>
            <button className="btn-modern-outline" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--user-border)',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>Manage</button>
          </div>

          <div className="settings-item-modern">
            <div className="settings-item-icon">
              <Shield size={20} />
            </div>
            <div className="settings-item-text">
              <h4>Two-Factor Authentication</h4>
              <p>Add an extra layer of security to your account</p>
            </div>
            <button className="btn-modern-outline" style={{
              background: 'rgba(255, 77, 0, 0.05)',
              border: '1px solid var(--user-accent)',
              color: 'var(--user-accent)',
              padding: '10px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>Enable</button>
          </div>

          <div className="settings-item-modern">
            <div className="settings-item-icon">
              <HelpCircle size={20} />
            </div>
            <div className="settings-item-text">
              <h4>Support & Help</h4>
              <p>Need help? Contact our support team 24/7</p>
            </div>
            <button className="btn-modern-outline" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--user-border)',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
