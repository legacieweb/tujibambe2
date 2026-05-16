import React from 'react';
import { Mail, Phone, Calendar, User } from 'lucide-react';

const AdminCustomers = ({ customers, bookings }) => {
  return (
    <div className="admin-customers-section">
      <div className="admin-table-header" style={{ marginBottom: '25px' }}>
        <h2>Customer Base</h2>
        <div className="customer-stats" style={{ display: 'flex', gap: '20px' }}>
          <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
            Total Customers: <span style={{ color: 'white', fontWeight: '700' }}>{customers.length}</span>
          </div>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact Info</th>
              <th>Member Since</th>
              <th>Bookings</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => {
              const customerBookings = bookings.filter(b => b.user?._id === customer._id || b.user?.email === customer.email);
              const totalSpent = customerBookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);
              
              return (
                <tr key={customer._id || `customer-${index}`}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--admin-accent-gradient)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.9rem'
                      }}>
                        {customer.name?.charAt(0) || 'U'}
                      </div>
                      <span style={{ fontWeight: '600' }}>{customer.name}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--admin-text-muted)' }}>
                        <Mail size={14} /> {customer.email}
                      </div>
                      {customer.phone && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--admin-text-muted)' }}>
                          <Phone size={14} /> {customer.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                      <Calendar size={14} />
                      {new Date(customer.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      padding: '4px 10px', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {customerBookings.length} Bookings
                    </span>
                  </td>
                  <td style={{ fontWeight: '700', color: '#00ff7f' }}>
                    ${totalSpent.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
