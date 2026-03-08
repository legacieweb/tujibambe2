import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Mail, 
  User, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Filter,
  Search,
  Users,
  ExternalLink,
  ChevronDown,
  Trash2,
  Download,
  CheckSquare,
  Square
} from 'lucide-react';

const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://tujibambe2.onrender.com';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('inquiries'); // 'inquiries' or 'subscribers'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const [inqRes, subRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/contact/inquiries`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_BASE_URL}/api/contact/subscribers`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setInquiries(inqRes.data);
        setSubscribers(subRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`${API_BASE_URL}/api/contact/inquiry/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(inquiries.map(inq => inq._id === id ? { ...inq, status } : inq));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_BASE_URL}/api/contact/inquiry/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInquiries(inquiries.filter(inq => inq._id !== id));
    } catch (err) {
      console.error('Error deleting inquiry:', err);
    }
  };

  const deleteSubscriber = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_BASE_URL}/api/contact/subscriber/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscribers(subscribers.filter(sub => sub._id !== id));
      setSelectedSubscribers(selectedSubscribers.filter(sid => sid !== id));
    } catch (err) {
      console.error('Error deleting subscriber:', err);
    }
  };

  const bulkDeleteSubscribers = async () => {
    if (selectedSubscribers.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedSubscribers.length} subscribers?`)) return;
    
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_BASE_URL}/api/contact/subscribers/bulk-delete`, { ids: selectedSubscribers }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscribers(subscribers.filter(sub => !selectedSubscribers.includes(sub._id)));
      setSelectedSubscribers([]);
    } catch (err) {
      console.error('Error bulk deleting subscribers:', err);
    }
  };

  const toggleSubscriberSelection = (id) => {
    if (selectedSubscribers.includes(id)) {
      setSelectedSubscribers(selectedSubscribers.filter(sid => sid !== id));
    } else {
      setSelectedSubscribers([...selectedSubscribers, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedSubscribers.length === filteredSubscribers.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(filteredSubscribers.map(sub => sub._id));
    }
  };

  const exportSubscribersCSV = () => {
    const headers = ['Email', 'Subscription Date', 'Status'];
    const data = filteredSubscribers.map(sub => [
      sub.email,
      new Date(sub.subscribedAt).toLocaleDateString(),
      sub.isActive ? 'Active' : 'Unsubscribed'
    ]);
    
    const csvContent = [headers, ...data].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="admin-loading">
      <div className="spinner-modern"></div>
      <p>Loading messages and subscribers...</p>
    </div>
  );

  return (
    <div className="admin-content-section">
      <div className="admin-section-header-modern">
        <div className="header-titles">
          <h2 className="section-main-title">Communication Hub</h2>
          <p className="section-sub-title">Manage customer inquiries and email subscriptions</p>
        </div>
        
        <div className="admin-tabs-modern">
          <button 
            className={`admin-tab-btn ${activeView === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveView('inquiries')}
          >
            <MessageSquare size={18} /> Inquiries ({inquiries.length})
          </button>
          <button 
            className={`admin-tab-btn ${activeView === 'subscribers' ? 'active' : ''}`}
            onClick={() => setActiveView('subscribers')}
          >
            <Users size={18} /> Subscribers ({subscribers.length})
          </button>
        </div>
      </div>

      <div className="admin-filters-bar-modern">
        <div className="search-box-modern">
          <Search size={18} />
          <input 
            type="text" 
            placeholder={`Search ${activeView}...`} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {activeView === 'subscribers' && (
          <div className="admin-actions-group">
            <button 
              className="btn-action-modern export" 
              onClick={exportSubscribersCSV}
              disabled={filteredSubscribers.length === 0}
            >
              <Download size={18} /> Export CSV
            </button>
            {selectedSubscribers.length > 0 && (
              <button 
                className="btn-action-modern delete-bulk" 
                onClick={bulkDeleteSubscribers}
              >
                <Trash2 size={18} /> Delete Selected ({selectedSubscribers.length})
              </button>
            )}
          </div>
        )}
      </div>

      {activeView === 'inquiries' ? (
        <div className="inquiries-list-modern">
          {filteredInquiries.length === 0 ? (
            <div className="empty-state-modern">
              <Mail size={48} />
              <p>No inquiries found matching your search.</p>
            </div>
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-modern-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map(inq => (
                    <tr key={inq._id} className={`status-${inq.status}`}>
                      <td>
                        <div className="date-cell">
                          <span className="date-text">{new Date(inq.createdAt).toLocaleDateString()}</span>
                          <span className="time-text">{new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </td>
                      <td>
                        <div className="customer-cell">
                          <span className="customer-name">{inq.name}</span>
                          <span className="customer-email">{inq.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="subject-cell">
                          <span className="subject-tag">{inq.subject}</span>
                          <p className="message-preview" title={inq.message}>{inq.message}</p>
                        </div>
                      </td>
                      <td>
                        <div className={`status-badge-modern ${inq.status}`}>
                          {inq.status === 'pending' && <AlertCircle size={12} />}
                          {inq.status === 'read' && <Clock size={12} />}
                          {inq.status === 'responded' && <CheckCircle size={12} />}
                          {inq.status}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons-modern">
                          {inq.status === 'pending' && (
                            <button onClick={() => updateStatus(inq._id, 'read')} className="btn-icon-modern read" title="Mark as Read">
                              <Clock size={16} />
                            </button>
                          )}
                          {inq.status !== 'responded' && (
                            <button onClick={() => updateStatus(inq._id, 'responded')} className="btn-icon-modern respond" title="Mark as Responded">
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <a href={`mailto:${inq.email}?subject=RE: ${inq.subject}`} className="btn-icon-modern email" title="Reply via Email">
                            <ExternalLink size={16} />
                          </a>
                          <button onClick={() => deleteInquiry(inq._id)} className="btn-icon-modern delete" title="Delete Inquiry">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="subscribers-list-modern">
          {filteredSubscribers.length === 0 ? (
            <div className="empty-state-modern">
              <Users size={48} />
              <p>No subscribers found matching your search.</p>
            </div>
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-modern-table">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <button className="btn-check-all" onClick={toggleSelectAll}>
                        {selectedSubscribers.length === filteredSubscribers.length && filteredSubscribers.length > 0 ? (
                          <CheckSquare size={18} className="text-orange" />
                        ) : (
                          <Square size={18} />
                        )}
                      </button>
                    </th>
                    <th>Subscription Date</th>
                    <th>Email Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscribers.map(sub => (
                    <tr key={sub._id} className={selectedSubscribers.includes(sub._id) ? 'selected' : ''}>
                      <td className="checkbox-col">
                        <button className="btn-check" onClick={() => toggleSubscriberSelection(sub._id)}>
                          {selectedSubscribers.includes(sub._id) ? (
                            <CheckSquare size={18} className="text-orange" />
                          ) : (
                            <Square size={18} />
                          )}
                        </button>
                      </td>
                      <td>{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                      <td>
                        <div className="subscriber-email-cell">
                          <Mail size={16} className="email-icon-fade" />
                          <span>{sub.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className={`status-badge-modern ${sub.isActive ? 'active' : 'inactive'}`}>
                          {sub.isActive ? 'Active' : 'Unsubscribed'}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons-modern">
                          <a href={`mailto:${sub.email}`} className="btn-icon-modern email" title="Send Email">
                            <ExternalLink size={16} />
                          </a>
                          <button onClick={() => deleteSubscriber(sub._id)} className="btn-icon-modern delete" title="Delete Subscriber">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <style jsx="true">{`
        .admin-section-header-modern {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
        }

        .header-titles .section-main-title {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.5rem;
        }

        .header-titles .section-sub-title {
          color: rgba(255, 255, 255, 0.5);
        }

        .admin-tabs-modern {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          padding: 4px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .admin-tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-tab-btn.active {
          background: #f97316;
          color: white;
        }

        .admin-filters-bar-modern {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-box-modern {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 16px;
          border-radius: 12px;
          flex: 1;
          max-width: 400px;
        }

        .admin-actions-group {
          display: flex;
          gap: 12px;
        }

        .btn-action-modern {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-action-modern:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .btn-action-modern:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-action-modern.export {
          border-color: rgba(34, 197, 94, 0.3);
        }

        .btn-action-modern.export:hover:not(:disabled) {
          background: rgba(34, 197, 94, 0.1);
          border-color: #22c55e;
        }

        .btn-action-modern.delete-bulk {
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .btn-action-modern.delete-bulk:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
        }

        .search-box-modern input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          flex: 1;
        }

        .search-box-modern:focus-within {
          border-color: #f97316;
          background: rgba(255, 255, 255, 0.05);
        }

        .admin-modern-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px;
        }

        .admin-modern-table th {
          text-align: left;
          padding: 12px 20px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .checkbox-col {
          width: 40px;
          padding: 0 0 0 20px !important;
        }

        .btn-check, .btn-check-all {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: all 0.2s;
        }

        .btn-check:hover, .btn-check-all:hover {
          color: #f97316;
        }

        .text-orange { color: #f97316 !important; }

        .admin-modern-table tbody tr {
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.2s;
        }

        .admin-modern-table tbody tr.selected {
          background: rgba(249, 115, 22, 0.05);
          border-left: 2px solid #f97316;
        }

        .admin-modern-table tbody tr:hover {
          background: rgba(255, 255, 255, 0.04);
          transform: scale(1.002);
        }

        .admin-modern-table tbody tr.selected:hover {
          background: rgba(249, 115, 22, 0.08);
        }

        .admin-modern-table td {
          padding: 16px 20px;
          vertical-align: middle;
        }

        .admin-modern-table td:first-child { border-radius: 12px 0 0 12px; }
        .admin-modern-table td:last-child { border-radius: 0 12px 12px 0; }

        .date-cell .date-text { display: block; color: white; font-weight: 600; }
        .date-cell .time-text { display: block; color: rgba(255, 255, 255, 0.4); font-size: 0.8rem; }

        .customer-cell .customer-name { display: block; color: white; font-weight: 600; }
        .customer-cell .customer-email { display: block; color: #f97316; font-size: 0.85rem; }

        .subject-tag {
          display: inline-block;
          padding: 2px 8px;
          background: rgba(249, 115, 22, 0.1);
          color: #f97316;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .message-preview {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          max-width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .status-badge-modern {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-badge-modern.pending { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .status-badge-modern.read { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .status-badge-modern.responded { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
        .status-badge-modern.active { background: rgba(34, 197, 94, 0.1); color: #22c55e; }

        .action-buttons-modern {
          display: flex;
          gap: 8px;
        }

        .btn-icon-modern {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-icon-modern:hover { transform: translateY(-2px); }
        .btn-icon-modern.read:hover { background: #3b82f6; border-color: #3b82f6; }
        .btn-icon-modern.respond:hover { background: #22c55e; border-color: #22c55e; }
        .btn-icon-modern.email:hover { background: #f97316; border-color: #f97316; }
        .btn-icon-modern.delete:hover { background: #ef4444; border-color: #ef4444; }

        .subscriber-email-cell {
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          font-weight: 500;
        }

        .email-icon-fade { color: rgba(255, 255, 255, 0.3); }

        .admin-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .spinner-modern {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(249, 115, 22, 0.1);
          border-top-color: #f97316;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .empty-state-modern {
          text-align: center;
          padding: 4rem;
          color: rgba(255, 255, 255, 0.2);
        }

        .empty-state-modern p { margin-top: 1rem; font-size: 1.1rem; }
      `}</style>
    </div>
  );
};

export default AdminInquiries;
