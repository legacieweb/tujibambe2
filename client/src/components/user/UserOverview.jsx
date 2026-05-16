import React from 'react';
import axios from 'axios';
import API_BASE_URL from '../../api/config';
import { Calendar, CreditCard, Clock, ChevronRight, TrendingUp, MapPin } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const UserOverview = ({ bookings }) => {
  const { formatPrice, currency: currentCurrency, exchangeRate } = useCurrency();
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const totalPaid = bookings.reduce((acc, curr) => acc + (curr.amountPaid || 0), 0);
  
  const handlePayBalance = (booking) => {
    const balanceUSD = (booking.totalPrice || 0) - (booking.amountPaid || 0);
    if (balanceUSD <= 0) return;

    if (!window.IyonicPay) {
      alert('Payment system is not ready. Please try again later.');
      return;
    }

    const amountToPay = currentCurrency === 'KES' ? (balanceUSD * exchangeRate) : balanceUSD;

    window.IyonicPay.pay({
      username: 'tujibambe',
      amount: amountToPay,
      currency: currentCurrency === 'KES' ? 'KES' : 'USD',
      description: `Balance payment for ${booking.tour?.title || 'Tour'}`,
      baseUrl: 'https://pay.iyonicorp.com',
      onSuccess: async (ref) => {
        try {
          const token = localStorage.getItem('token');
          await axios.post(`${API_BASE_URL}/api/bookings/${booking.id}/pay`, {
            amount: balanceUSD, 
            paymentReference: ref,
            currency: currentCurrency
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          window.location.reload(); 
        } catch (err) {
          console.error(err);
          alert('Failed to update payment. Please contact support.');
        }
      }
    });
  };

  return (
    <div className="user-overview-modern">
      <div className="section-header-modern">
        <h1 className="section-title-modern">Overview</h1>
        <p className="section-subtitle-modern">Track your adventures and manage upcoming trips</p>
      </div>

      <div className="dashboard-stats-grid">
        <div className="modern-card stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'rgba(255, 77, 0, 0.1)', color: '#ff4d00' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-info-modern">
            <p>Total Bookings</p>
            <h3>{bookings.length}</h3>
          </div>
        </div>
        
        <div className="modern-card stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'rgba(39, 174, 96, 0.1)', color: '#27ae60' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info-modern">
            <p>Active Trips</p>
            <h3>{confirmedBookings}</h3>
          </div>
        </div>

        <div className="modern-card stat-card-modern">
          <div className="stat-icon-modern" style={{ background: 'rgba(255, 135, 0, 0.1)', color: '#ff8700' }}>
            <CreditCard size={24} />
          </div>
          <div className="stat-info-modern">
            <p>Total Invested</p>
            <h3>{formatPrice(totalPaid)}</h3>
          </div>
        </div>
      </div>

      <div className="modern-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="admin-table-header">
          <h2>Recent Bookings</h2>
          <button className="view-all-btn" style={{
            background: 'none',
            border: 'none',
            color: 'var(--user-accent)',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="bookings-table-container-modern" style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: '30px' }}>Adventure</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Balance</th>
                <th style={{ textAlign: 'right', paddingRight: '30px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.slice(0, 5).map((booking, index) => {
                  const balanceUSD = (booking.totalPrice || 0) - (booking.amountPaid || 0);
                  return (
                    <tr key={booking.id || booking._id || `booking-${index}`}>
                      <td style={{ padding: '20px 30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            background: 'rgba(255,255,255,0.03)', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: '1px solid var(--user-border)'
                          }}>
                            <MapPin size={18} color="var(--user-accent)" />
                          </div>
                          <strong style={{ color: 'white' }}>{booking.tour?.title || booking.eventTitle || 'Custom Experience'}</strong>
                        </div>
                      </td>
                      <td style={{ color: 'var(--user-text-muted)' }}>{new Date(booking.bookingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                      <td style={{ fontWeight: '700' }}>{formatPrice(booking.totalPrice || 0)}</td>
                      <td>
                        <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`} style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          background: booking.status === 'confirmed' ? 'rgba(0, 255, 127, 0.1)' : 'rgba(255, 171, 0, 0.1)',
                          color: booking.status === 'confirmed' ? '#00ff7f' : '#ffab00'
                        }}>
                          {booking.status || 'Pending'}
                        </span>
                      </td>
                      <td style={{ color: balanceUSD > 0 ? '#ff8700' : '#00ff7f', fontWeight: '700' }}>
                        {formatPrice(balanceUSD)}
                      </td>
                      <td style={{ textAlign: 'right', paddingRight: '30px' }}>
                        {balanceUSD > 0 ? (
                          <button 
                            className="pay-balance-btn"
                            onClick={() => handlePayBalance(booking)}
                            style={{
                              background: 'var(--user-accent-gradient)',
                              padding: '8px 20px',
                              borderRadius: '10px',
                              color: '#fff',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: '700'
                            }}
                          >
                            Pay
                          </button>
                        ) : (
                          <span style={{ color: '#00ff7f', fontWeight: '700', fontSize: '0.85rem' }}>Completed</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '60px', color: 'var(--user-text-muted)' }}>
                    <div style={{ opacity: 0.3, marginBottom: '15px' }}>
                      <Calendar size={48} />
                    </div>
                    No bookings found. Start your first adventure today!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
