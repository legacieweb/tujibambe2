import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight, AlertCircle, Sparkles, Award } from 'lucide-react';
import '../styles/Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual-side">
        <img 
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Adventure Background" 
          className="auth-bg-image"
        />
        <div className="auth-visual-overlay"></div>
        <div className="auth-visual-content">
          <div className="featured-badge" style={{ marginBottom: '2rem' }}>
            <Award size={16} /> 
            <Sparkles size={16} style={{ marginRight: '8px' }} /> 
            Elite Experience
          </div>
          <h1>Discover <span>Kenya</span></h1>
          <p>Unforgettable safaris, mountain treks, and beach escapes await you.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card fade-in">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join our community of explorers</p>
          </div>

          {error && (
            <div className="error-msg">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="Enter your name" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                placeholder="name@example.com" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                placeholder="Minimum 8 characters" 
                required 
              />
            </div>
            
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <span className="preloader"></span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={20} className="btn-icon" />
                </>
              )}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
