import React from 'react';
import { Sparkles, Calendar, DollarSign, Trash2, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminEventPlanning = ({ bookings, handleDeleteBooking, handleUpdateBookingStatus }) => {
  const navigate = useNavigate();

  return (
    <div className="admin-bookings-tab fade-in">
      <div className="section-head">
        <div className="title-with-subtitle">
          <h2><Sparkles size={24} className="text-secondary" /> Event Planning Inquiries</h2>
          <p>Review and manage bespoke event planning requests</p>
        </div>
      </div>

      <div className="table-responsive-modern">
        <table className="modern-admin-table">
          <thead>
            <tr>
              <th>Traveler</th>
              <th>Event Theme</th>
              <th>Proposed Date</th>
              <th>Budget Estimate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No Event Planning inquiries found
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
                    <span className="tour-title font-bold text-secondary">{b.eventTitle || 'Custom Event'}</span>
                  </td>
                  <td>
                    <div className="date-cell">
                      <Calendar size={14} />
                      <span>{new Date(b.bookingDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>
                    <div className="budget-cell">
                      <DollarSign size={14} className="text-green-500" />
                      <span className="amount font-bold">
                        {b.currency === 'KES' ? 'KSh' : '$'}{b.totalPrice?.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td>
                    <select 
                      className={`status-pill ${b.status}`} 
                      value={b.status}
                      onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                    >
                      <option value="pending">Reviewing</option>
                      <option value="confirmed">Approved</option>
                      <option value="cancelled">Declined</option>
                    </select>
                  </td>
                  <td>
                    <div className="item-actions">
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

      <div className="admin-info-banner mt-8">
        <div className="banner-icon"><Clock size={24} /></div>
        <div className="banner-text">
          <h4>Planning Process Tip</h4>
          <p>Once you review an event budget, contact the user directly via email to finalize details. Mark as "Approved" only after the budget is agreed upon and the user is ready to pay.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminEventPlanning;
