import React from 'react';
import { Search, Bell, ChevronRight } from 'lucide-react';

const AdminCustomers = ({ customers, bookings }) => {
  return (
    <div className="tab-view-container fade-in">
      <div className="section-head-modern">
        <div className="title-group">
          <h2>Traveler Directory</h2>
          <p>Verified community of adventurers ({customers.length} total).</p>
        </div>
        <div className="search-box-modern">
          <Search size={18} />
          <input type="text" placeholder="Search by name or email..." />
        </div>
      </div>

      <div className="glass-panel mt-6">
        <div className="table-responsive-modern">
          <table className="modern-admin-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Join Date</th>
                <th>Activity</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c._id || c.email}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar-circle xsmall">{c.name?.charAt(0)}</div>
                      <div className="user-info-text">
                        <span className="name">{c.name}</span>
                        <span className="sub">{c.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td className="amount-cell">{bookings.filter(b => b.user?.email === c.email).length} bookings</td>
                  <td><span className="status-pill confirmed">Verified</span></td>
                  <td>
                    <div className="item-actions justify-end">
                      <button className="icon-btn-sm" title="Message traveler">
                        <Bell size={16} />
                      </button>
                      <button className="icon-btn-sm" title="View History">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
