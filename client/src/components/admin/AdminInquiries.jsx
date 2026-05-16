import React from 'react';
import { Mail, Trash2, Eye, EyeOff, MessageSquare, User, Clock } from 'lucide-react';

const AdminInquiries = ({ inquiries = [], handleUpdateInquiryStatus, handleDeleteInquiry }) => {
  return (
    <div className="admin-inquiries-section">
      <div className="admin-table-header" style={{ marginBottom: '25px' }}>
        <h2>Customer Inquiries</h2>
        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
          Total Inquiries: <span style={{ color: 'white', fontWeight: '700' }}>{inquiries.length}</span>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>From</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? inquiries.map((inquiry, index) => (
              <tr key={inquiry.id || `inquiry-${index}`}>
                <td>
                  <div style={{ fontWeight: '600' }}>{inquiry.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Mail size={12} /> {inquiry.email}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: '600' }}>{inquiry.subject}</div>
                </td>
                <td>
                  <div style={{ 
                    maxWidth: '300px', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    fontSize: '0.85rem',
                    color: 'var(--admin-text-muted)'
                  }}>
                    {inquiry.message}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>
                    <Clock size={14} />
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    background: inquiry.status === 'pending' ? 'rgba(255, 171, 0, 0.1)' : 'rgba(0, 255, 127, 0.1)',
                    color: inquiry.status === 'pending' ? '#ffab00' : '#00ff7f',
                    textTransform: 'capitalize'
                  }}>
                    {inquiry.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => handleUpdateInquiryStatus(inquiry.id, inquiry.status === 'pending' ? 'read' : 'responded')}
                      style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}
                      title="Mark as Read/Responded"
                    >
                      {inquiry.status === 'pending' ? <Eye size={18} /> : <MessageSquare size={18} />}
                    </button>
                    <button 
                      onClick={() => handleDeleteInquiry(inquiry.id)}
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
                  No inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInquiries;
