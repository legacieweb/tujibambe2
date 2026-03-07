import React from 'react';
import { Zap, Calendar, User, Trash2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminEpicFunTimes = ({ bookings, handleDeleteBooking, handleUpdateBookingStatus }) => {
  const navigate = useNavigate();

  return (
    <div className="admin-bookings-tab fade-in">
      <div className="section-head">
        <div className="title-with-subtitle">
          <h2><Zap size={24} className="text-primary" /> Epic Fun Times Bookings</h2>
          <p>Manage tickets and entries for special events</p>
        </div>
      </div>

      <div className="table-responsive-modern">
        <table className="modern-admin-table">
          <thead>
            <tr>
              <th>Traveler</th>
              <th>Event Title</th>
              <th>Date</th>
              <th>Tickets</th>
              <th>Status</th>
              <th>Amount</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  No Epic Fun Times bookings found
                </td>
              </tr>
            ) : (
              bookings.map(b => (
                <tr key={b._id}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar-circle xsmall">{b.user?.name?.charAt(0)}</div>
                      <div className="user-info-text">
                        <span className="name">{b.user?.name}</span>
                        <span className="sub">{b.user?.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="tour-title font-bold">{b.eventTitle || 'Special Event'}</span>
                  </td>
                  <td>
                    <div className="date-cell">
                      <Calendar size={14} />
                      <span>{new Date(b.bookingDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge-modern">{b.numberOfPeople} Passes</span>
                  </td>
                  <td>
                    <select 
                      className={`status-pill ${b.status}`} 
                      value={b.status}
                      onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="amount-cell">
                    {b.currency === 'KES' ? 'KSh' : '$'}{b.totalPrice?.toLocaleString()}
                  </td>
                  <td>
                    <div className="item-actions justify-end">
                      <button className="icon-btn-sm" onClick={() => navigate(`/admin/booking/${b._id}`)}>
                        <ChevronRight size={16} />
                      </button>
                      <button className="icon-btn-sm delete" onClick={() => handleDeleteBooking(b._id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEpicFunTimes;
