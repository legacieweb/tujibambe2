import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Car, Clock, Shield, CheckCircle, Trash2, X } from 'lucide-react';

const AdminCarBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/car-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching car bookings:', err);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/car-bookings/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBookings();
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Failed to update status');
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:5000/api/car-bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBookings();
      } catch (err) {
        console.error('Error deleting booking:', err);
      }
    }
  };

  if (loading) return <div>Loading car hires...</div>;

  return (
    <div className="admin-bookings-section financials-theme">
      <div className="section-header">
        <div className="header-info">
          <h2>Car Hire <span className="text-gradient">Bookings</span></h2>
          <p>Monitor and manage all vehicle rentals.</p>
        </div>
      </div>

      <div className="financials-table-container">
        <table className="financials-table admin-theme">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Customer</th>
              <th>Dates</th>
              <th>Route</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>
                  <div className="table-item-info">
                    <img src={booking.vehicle.image} alt={booking.vehicle.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    <span>{booking.vehicle.name}</span>
                  </div>
                </td>
                <td>
                  <div className="table-item-info">
                    <div className="avatar-small">{booking.user.name.charAt(0)}</div>
                    <span>{booking.user.name}</span>
                  </div>
                </td>
                <td>
                  <div className="date-range">
                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div className="route-info">
                    {booking.pickupLocation} → {booking.dropoffLocation}
                  </div>
                </td>
                <td>
                  <span className="price-tag">${booking.totalPrice}</span>
                </td>
                <td>
                  <span className={`status-pill ${booking.status}`}>{booking.status}</span>
                </td>
                <td>
                  <div className="action-btns">
                    {booking.status === 'pending' && (
                      <button className="btn-action-confirm" onClick={() => updateStatus(booking._id, 'confirmed')} title="Confirm Booking">
                        <CheckCircle size={16} />
                      </button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <button className="btn-action-cancel" onClick={() => updateStatus(booking._id, 'cancelled')} title="Cancel Booking">
                        <X size={16} />
                      </button>
                    )}
                    <button className="btn-action-delete" onClick={() => deleteBooking(booking._id)} title="Delete Record">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {bookings.length === 0 && (
          <div className="empty-table-msg">
            <Car size={48} />
            <p>No car hire records found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCarBookings;
