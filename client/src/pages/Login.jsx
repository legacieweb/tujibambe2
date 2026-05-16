import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login({ email, password });
      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual-side">
        <img 
          src="https://ceoworld.biz/wp-content/uploads/2024/04/Adventure-Tourism.jpg" 
          alt="African Safari" 
          className="auth-bg-image"
        />
        <div className="auth-visual-overlay"></div>
        <div className="auth-visual-content">
          <div className="featured-badge">
            Premium Adventures
          </div>
          <h1>Experience <span>The Magic</span></h1>
          <p>Sign in to access your bookings and discover the hidden gems of East Africa.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Ready for your next adventure?</p>
          </div>

          {error && (
            <div className="error-msg">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="password-input-wrapper">
                <input 
                  id="email"
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="e.g. wanderer@tujibambe.com" 
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
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
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
                "Sign In"
              )}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account yet? <Link to="/signup">Join the community</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
