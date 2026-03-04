import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Compass, MapPin, Tag, DollarSign, Image as ImageIcon, Type } from 'lucide-react';

const AdminTourForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    image: '',
    category: '',
    type: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const fetchTour = async () => {
        try {
          const res = await axios.get(`https://tujibambe2.onrender.com/api/tours/${id}`);
          setFormData(res.data);
        } catch (err) {
          console.error(err);
          alert('Failed to fetch tour details');
        }
      };
      fetchTour();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (isEdit) {
        await axios.put(`https://tujibambe2.onrender.com/api/tours/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('https://tujibambe2.onrender.com/api/tours', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert('Failed to save tour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-main-content" style={{marginLeft: 0, padding: '2rem'}}>
        <div className="section-head-modern">
          <div className="title-group">
            <h2>{isEdit ? 'Edit Adventure' : 'New Adventure'}</h2>
            <p>{isEdit ? 'Update details for ' + formData.title : 'Create a brand new wild experience for travelers.'}</p>
          </div>
          <button className="btn-modern-secondary" onClick={() => navigate('/admin')}>
            <X size={18} /> Cancel
          </button>
        </div>

        <div className="glass-panel mt-6" style={{maxWidth: '800px', margin: '2rem auto', padding: '2rem'}}>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
              <div className="form-group" style={{gridColumn: 'span 2'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600}}>
                  <Type size={16} /> Tour Title
                </label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g. Maasai Mara Luxury Safari"
                  required
                  style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}
                />
              </div>

              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600}}>
                  <MapPin size={16} /> Location
                </label>
                <input 
                  type="text" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  placeholder="e.g. Narok, Kenya"
                  required
                  style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}
                />
              </div>

              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600}}>
                  <DollarSign size={16} /> Price (USD)
                </label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  placeholder="e.g. 1200"
                  required
                  style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}
                />
              </div>

              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600}}>
                  <Tag size={16} /> Category
                </label>
                <input 
                  type="text" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  placeholder="e.g. Wildlife"
                  required
                  style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}
                />
              </div>

              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600}}>
                  <Compass size={16} /> Tour Type
                </label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  required
                  style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}
                >
                  <option value="">Select Type</option>
                  <option value="group">Group Adventure</option>
                  <option value="timed">Fixed Date Event</option>
                </select>
              </div>

              <div className="form-group" style={{gridColumn: 'span 2'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600}}>
                  <ImageIcon size={16} /> Image URL
                </label>
                <input 
                  type="text" 
                  name="image" 
                  value={formData.image} 
                  onChange={handleChange} 
                  placeholder="https://images.unsplash.com/..."
                  required
                  style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0'}}
                />
              </div>

              <div className="form-group" style={{gridColumn: 'span 2'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600}}>
                  Description
                </label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Describe the adventure..."
                  rows="5"
                  style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', resize: 'vertical'}}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-modern-primary" 
              disabled={loading}
              style={{marginTop: '2rem', width: '100%', justifyContent: 'center'}}
            >
              <Save size={18} /> {loading ? 'Saving...' : (isEdit ? 'Update Tour' : 'Create Tour')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminTourForm;
