import React from 'react';
import { Car, Fuel, Settings, CheckCircle, XCircle, Plus, Users } from 'lucide-react';

const AdminVehicles = ({ vehicles = [] }) => {
  return (
    <div className="admin-vehicles-section">
      <div className="admin-table-header" style={{ marginBottom: '25px' }}>
        <h2>Fleet Management</h2>
        <button className="admin-btn-primary" style={{
          background: 'var(--admin-accent-gradient)',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '12px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <Plus size={18} /> Add New Vehicle
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Fuel / Trans</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? vehicles.map((vehicle, index) => (
              <tr key={vehicle.id || `vehicle-${index}`}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '60px',
                      height: '40px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: '#222'
                    }}>
                      <img src={vehicle.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontWeight: '600' }}>{vehicle.name}</span>
                  </div>
                </td>
                <td>
                  <span style={{ 
                    padding: '4px 10px', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    color: 'var(--admin-text-muted)'
                  }}>
                    {vehicle.type}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                    <Users size={14} color="var(--admin-text-muted)" />
                    {vehicle.capacity} Seats
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Fuel size={12} /> {vehicle.fuel}
                    </div>
                    <div>{vehicle.transmission}</div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {vehicle.availability ? (
                      <><CheckCircle size={14} color="#00ff7f" /> <span style={{ color: '#00ff7f', fontSize: '0.85rem' }}>Available</span></>
                    ) : (
                      <><XCircle size={14} color="#ff4444" /> <span style={{ color: '#ff4444', fontSize: '0.85rem' }}>Booked</span></>
                    )}
                  </div>
                </td>
                <td>
                  <button style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>
                    <Settings size={18} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-muted)' }}>
                  No vehicles in fleet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVehicles;
