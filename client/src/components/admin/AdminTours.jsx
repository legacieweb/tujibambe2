import React from 'react';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminTours = ({ tours, handleDeleteTour }) => {
  const navigate = useNavigate();

  return (
    <div className="admin-tours-section">
      <div className="admin-table-header" style={{ marginBottom: '25px' }}>
        <h2>Tour Management</h2>
        <button 
          className="admin-btn-primary" 
          onClick={() => navigate('/admin/tours/new')}
          style={{
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
          }}
        >
          <Plus size={18} /> Add New Tour
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tour Details</th>
              <th>Location</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour._id || tour.id || `tour-${index}`}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#222'
                    }}>
                      {tour.image && <img src={tour.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                    <span style={{ fontWeight: '600' }}>{tour.title}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--admin-text-muted)' }}>
                    <MapPin size={14} />
                    <span>{tour.location || 'Kenya'}</span>
                  </div>
                </td>
                <td style={{ fontWeight: '700', color: 'var(--admin-accent)' }}>
                  ${tour.price?.toLocaleString()}
                </td>
                <td>{tour.duration || '3 Days'}</td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => navigate(`/admin/tours/edit/${tour._id || tour.id}`)}
                      style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteTour(tour._id || tour.id)}
                      style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTours;
