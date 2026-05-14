import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight, AlertCircle, Sparkles, Award, Eye, EyeOff } from 'lucide-react';
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
      if (data.user.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
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
          src="https://www.newsbharati.com/Encyc/2018/5/31/2_09_24_35_adventure_1_H@@IGHT_435_W@@IDTH_800.jpg" 
          alt="Travel Background" 
          className="auth-bg-image"
        />
        <div className="auth-visual-overlay"></div>
        <div className="auth-visual-content">
          <div className="featured-badge" style={{ marginBottom: '2rem' }}>
            Featured Experience
          </div>
          <h1>Experience <span>The Wild</span></h1>
          <p>Join thousands of adventurers exploring the breathtaking landscapes of Kenya.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card fade-in">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your adventure</p>
          </div>

          {error && (
            <div className="error-msg">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@example.com" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input 
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
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <span className="preloader"></span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="auth-footer">
            New to Tujibambe? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
