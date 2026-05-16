import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AlertCircle, Eye, EyeOff, User, Mail } from 'lucide-react';
import '../styles/Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
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
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="African Landscape" 
          className="auth-bg-image"
        />
        <div className="auth-visual-overlay"></div>
        <div className="auth-visual-content">
          <div className="featured-badge">
            Join the Journey
          </div>
          <h1>Explore <span>Kenya</span></h1>
          <p>Create an account to start planning your dream safari and join our community of adventurers.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Your adventure starts here</p>
          </div>

          {error && (
            <div className="error-msg">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="password-input-wrapper">
                <input 
                  id="name"
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  placeholder="e.g. Jane Doe" 
                  required 
                />
                <div className="password-toggle" style={{ cursor: 'default', color: '#ccc' }}>
                  <User size={18} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="password-input-wrapper">
                <input 
                  id="email"
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  placeholder="e.g. jane@example.com" 
                  required 
                />
                <div className="password-toggle" style={{ cursor: 'default', color: '#ccc' }}>
                  <Mail size={18} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  placeholder="Min. 8 characters" 
                  required 
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <span className="preloader"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in instead</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
