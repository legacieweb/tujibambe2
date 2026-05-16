import React from 'react';
import { Car, Calendar, User, CheckCircle, Trash2 } from 'lucide-react';

const AdminCarBookings = ({ bookings = [], handleDeleteBooking, handleUpdateBookingStatus }) => {
  return (
    <div className="admin-cars-section">
      <div className="admin-table-header" style={{ marginBottom: '25px' }}>
        <h2>Car Rental Bookings</h2>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Vehicle</th>
              <th>Rental Period</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? bookings.map((booking, index) => (
              <tr key={booking._id || `car-${index}`}>
                <td>
                  <div style={{ fontWeight: '600' }}>{booking.user?.name || 'Guest'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{booking.user?.email}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Car size={16} color="var(--admin-accent)" />
                    <span style={{ fontWeight: '600' }}>{booking.carModel || 'SUV 4x4'}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.85rem' }}>
                    <span style={{ color: 'white' }}>{new Date(booking.startDate).toLocaleDateString()}</span>
                    <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>to {new Date(booking.endDate).toLocaleDateString()}</span>
                  </div>
                </td>
                <td style={{ fontWeight: '700' }}>${booking.totalPrice?.toLocaleString() || 0}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: booking.status === 'confirmed' ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 171, 0, 0.1)',
                    color: booking.status === 'confirmed' ? '#00ff7f' : '#ffab00'
                  }}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {booking.status === 'pending' && (
                      <button 
                        onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                        style={{ background: 'none', border: 'none', color: '#00ff7f', cursor: 'pointer' }}
                        title="Confirm"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteBooking(booking._id)}
                      style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-muted)' }}>
                  No car rental bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCarBookings;
