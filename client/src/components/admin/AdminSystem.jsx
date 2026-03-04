import React from 'react';
import { Database, Settings, Shield, Bell } from 'lucide-react';

const AdminSystem = () => {
  return (
    <div className="tab-view-container fade-in">
      <div className="section-head-modern">
        <div className="title-group">
          <h2>System Infrastructure</h2>
          <p>Global configuration and performance monitoring.</p>
        </div>
        <div className="header-actions">
           <button className="btn-modern-secondary sm">
             <Database size={16} /> Export Logs
           </button>
           <button className="btn-modern-primary">
             <Settings size={16} /> Advanced Config
           </button>
        </div>
      </div>

      <div className="admin-content-grid mt-6">
        <div className="glass-panel p-8">
          <div className="section-head border-b border-border pb-4 mb-6">
            <div className="title-with-subtitle">
              <h3><Database size={20} /> Core Services</h3>
              <p>Primary backend and data storage</p>
            </div>
          </div>
          <div className="system-config-list">
            <div className="config-card">
              <div className="config-main">
                <div className="status-indicator online"></div>
                <div className="config-details">
                  <h4>Database Engine</h4>
                  <span>MongoDB Atlas Cluster v6.0</span>
                </div>
              </div>
              <span className="badge-modern">Healthy</span>
            </div>
            <div className="config-card mt-4">
              <div className="config-main">
                <div className="status-indicator online"></div>
                <div className="config-details">
                  <h4>API Gateway</h4>
                  <span>Node.js / Express Runtime</span>
                </div>
              </div>
              <span className="badge-modern">99.9% Uptime</span>
            </div>
            <div className="config-card mt-4">
              <div className="config-main">
                <div className="status-indicator online"></div>
                <div className="config-details">
                  <h4>Static Assets</h4>
                  <span>Cloudinary CDN Storage</span>
                </div>
              </div>
              <span className="badge-modern">Active</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8">
          <div className="section-head border-b border-border pb-4 mb-6">
            <div className="title-with-subtitle">
              <h3><Shield size={20} /> Security & Auth</h3>
              <p>Identity and access management</p>
            </div>
          </div>
          <div className="security-config-list">
            <div className="config-card">
              <div className="config-main">
                <Shield size={18} className="text-primary" />
                <div className="config-details">
                  <h4>JWT Authentication</h4>
                  <span>Strict HS256 Mode</span>
                </div>
              </div>
            </div>
            <div className="config-card mt-4">
              <div className="config-main">
                <Database size={18} className="text-primary" />
                <div className="config-details">
                  <h4>CORS Policy</h4>
                  <span>Internal Whitelist Active</span>
                </div>
              </div>
            </div>
            <div className="config-card mt-4">
              <div className="config-main">
                <Bell size={18} className="text-primary" />
                <div className="config-details">
                  <h4>Rate Limiting</h4>
                  <span>100 requests / minute</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSystem;
