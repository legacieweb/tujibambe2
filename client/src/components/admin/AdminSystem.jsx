import React from 'react';
import { Settings, Shield, HardDrive, Cpu, Database, Bell, RefreshCw } from 'lucide-react';

const AdminSystem = () => {
  const systemStats = [
    { label: 'CPU Usage', value: '12%', icon: <Cpu size={20} />, color: '#00ff7f' },
    { label: 'Memory', value: '1.2GB / 4GB', icon: <HardDrive size={20} />, color: '#ff4d00' },
    { label: 'Database', value: 'Healthy', icon: <Database size={20} />, color: '#00d1ff' },
  ];

  return (
    <div className="admin-system-section">
      <div className="admin-table-header" style={{ marginBottom: '25px' }}>
        <h2>System Configuration</h2>
        <button className="admin-btn-secondary" style={{
          background: 'rgba(255,255,255,0.05)',
          color: 'white',
          border: '1px solid var(--admin-border)',
          padding: '8px 15px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <RefreshCw size={16} /> Force Refresh
        </button>
      </div>

      <div className="admin-stats-grid" style={{ marginBottom: '30px' }}>
        {systemStats.map((stat, index) => (
          <div key={index} className="admin-stat-card">
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
            <div className="stat-icon-wrapper" style={{ background: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="settings-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px' 
      }}>
        <div className="admin-table-container" style={{ padding: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Shield size={20} color="var(--admin-accent)" />
            <h3 style={{ margin: 0 }}>Security Settings</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600' }}>Two-Factor Authentication</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Required for all admin accounts</div>
              </div>
              <div style={{ width: '40px', height: '20px', background: 'var(--admin-accent)', borderRadius: '20px', position: 'relative' }}>
                <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600' }}>Session Timeout</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Automatically log out after 30 mins</div>
              </div>
              <select style={{ background: '#222', color: 'white', border: '1px solid #333', padding: '5px', borderRadius: '5px' }}>
                <option>30 Minutes</option>
                <option>1 Hour</option>
                <option>4 Hours</option>
              </select>
            </div>
          </div>
        </div>

        <div className="admin-table-container" style={{ padding: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Bell size={20} color="#ffab00" />
            <h3 style={{ margin: 0 }}>Notification Settings</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600' }}>Email Alerts</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Notify on new bookings</div>
              </div>
              <div style={{ width: '40px', height: '20px', background: 'var(--admin-accent)', borderRadius: '20px', position: 'relative' }}>
                <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600' }}>Inquiry Notifications</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Push notifications for messages</div>
              </div>
              <div style={{ width: '40px', height: '20px', background: '#333', borderRadius: '20px', position: 'relative' }}>
                <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', left: '2px', top: '2px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSystem;
