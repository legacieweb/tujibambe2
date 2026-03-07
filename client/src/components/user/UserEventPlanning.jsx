import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  Zap,
  Briefcase,
  MapPin,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import axios from 'axios';

const UserEventPlanning = () => {
  const { formatPrice, currency, convertPrice } = useCurrency();
  const [pendingPlan, setPendingPlan] = useState(null);
  const [approvedInquiries, setApprovedInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for pending plan from calculator
    const savedPlan = localStorage.getItem('pendingEventPlan');
    if (savedPlan) {
      setPendingPlan(JSON.parse(savedPlan));
    }

    // Fetch inquiries from backend (filtered by eventType: 'EventPlanning')
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://tujibambe2.onrender.com/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Filter for event planning type
        const eventPlans = res.data.filter(b => b.eventType === 'EventPlanning');
        setApprovedInquiries(eventPlans);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const submitInquiry = async () => {
    if (!pendingPlan) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://tujibambe2.onrender.com/api/bookings', {
        eventTitle: `Custom Plan: ${pendingPlan.services.slice(0, 2).join(', ')}...`,
        eventType: 'EventPlanning',
        bookingDate: pendingPlan.date,
        numberOfPeople: 1, // Default for inquiries
        totalPrice: pendingPlan.estimatedBudget,
        currency: 'USD',
        status: 'pending' // Admin must approve before payment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Inquiry submitted! Our team will contact you shortly.');
      localStorage.removeItem('pendingEventPlan');
      setPendingPlan(null);
      // Refresh list
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to submit inquiry.');
    }
  };

  const handlePayment = (booking) => {
    if (window.IyonicPay) {
      const convertedTotal = convertPrice(booking.totalPrice);
      window.IyonicPay.pay({
        username: 'tujibambe',
        amount: parseFloat(convertedTotal.toFixed(2)),
        currency: currency,
        description: `Event Planning Payment: ${booking.eventTitle}`,
        onSuccess: async (ref) => {
          try {
            const token = localStorage.getItem('token');
            await axios.put(`https://tujibambe2.onrender.com/api/bookings/${booking._id}`, {
              status: 'confirmed',
              paymentReference: ref.reference,
              paymentStatus: 'completed'
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });
            alert('Payment successful!');
            window.location.reload();
          } catch (err) {
            console.error(err);
          }
        },
        onCancel: () => console.log('Payment cancelled')
      });
    }
  };

  return (
    <div className="event-planning-dashboard fade-in">
      <div className="section-head">
        <h2><Calendar size={20} /> Event Planning Management</h2>
        <p>Track your inquiries, approved budgets, and make payments for your elite events.</p>
      </div>

      {pendingPlan && (
        <div className="pending-plan-card elite-glass">
          <div className="plan-status">
            <Clock size={16} />
            <span>Unsubmitted Draft</span>
          </div>
          <div className="plan-main">
            <h3>Custom Event Inquiry</h3>
            <div className="services-chips">
              {pendingPlan.services.map((s, i) => (
                <span key={i} className="service-chip">{s}</span>
              ))}
            </div>
            <div className="plan-footer">
              <div className="est-budget">
                <label>Estimated Budget</label>
                <strong>{formatPrice(pendingPlan.estimatedBudget)}</strong>
              </div>
              <button className="btn-modern-primary" onClick={submitInquiry}>
                Submit Inquiry to Admin <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="plan-notice">
            <AlertCircle size={14} />
            <span>Submitting this will allow our team to review your needs and contact you with a final quote.</span>
          </div>
        </div>
      )}

      <div className="inquiries-list">
        <h3>Active Inquiries & Bookings</h3>
        {loading ? (
          <p>Loading your event plans...</p>
        ) : approvedInquiries.length === 0 && !pendingPlan ? (
          <div className="empty-state glass-panel">
            <Briefcase size={48} />
            <p>No event plans yet. Use the Budget Calculator in the Event Planner page to start.</p>
          </div>
        ) : (
          <div className="event-plans-grid">
            {approvedInquiries.map(plan => (
              <div key={plan._id} className="event-plan-card glass-panel">
                <div className="plan-header">
                  <div className={`status-pill-modern ${plan.status}`}>
                    {plan.status === 'pending' ? 'Reviewing' : plan.status}
                  </div>
                  <span className="date">{new Date(plan.bookingDate).toLocaleDateString()}</span>
                </div>
                <h4>{plan.eventTitle}</h4>
                <div className="plan-price">
                  <label>Total Budget:</label>
                  <span>{formatPrice(plan.totalPrice)}</span>
                </div>
                
                <div className="plan-actions">
                  {plan.status === 'pending' ? (
                    <div className="waiting-badge">
                      <Clock size={14} /> Waiting for Admin Approval
                    </div>
                  ) : plan.status === 'confirmed' ? (
                    <div className="confirmed-badge">
                      <CheckCircle size={14} /> Confirmed & Paid
                    </div>
                  ) : (
                    <button className="btn-pay-event" onClick={() => handlePayment(plan)}>
                      Pay to Secure Event <DollarSign size={16} />
                    </button>
                  )}
                  <button className="btn-details-link">View Detailed Breakdown</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="info-section elite-glass">
        <div className="info-icon-box">
          <HelpCircle size={24} />
        </div>
        <div className="info-text">
          <h4>How it works</h4>
          <ol>
            <li>Select your event elements in the Event Planner.</li>
            <li>Submit your inquiry from this dashboard.</li>
            <li>Our admin team reviews the budget and contacts you.</li>
            <li>Once approved, you can complete the payment here to secure your date.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UserEventPlanning;
