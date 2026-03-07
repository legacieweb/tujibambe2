import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Car, Users, Zap, Fuel, Star } from 'lucide-react';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://tujibambe2.onrender.com';
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Land Cruiser',
    capacity: 7,
    image: '',
    pricePerDay: 150,
    transmission: 'Manual',
    fuel: 'Diesel',
    features: '',
    description: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/vehicles`);
      setVehicles(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = {
      ...formData,
      features: typeof formData.features === 'string' ? formData.features.split(',').map(f => f.trim()) : formData.features
    };

    try {
      if (editingVehicle) {
        await axios.put(`${API_BASE_URL}/api/vehicles/${editingVehicle._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/vehicles`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchVehicles();
      setShowModal(false);
      setEditingVehicle(null);
      resetForm();
    } catch (err) {
      console.error('Error saving vehicle:', err);
      alert('Failed to save vehicle');
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      capacity: vehicle.capacity,
      image: vehicle.image,
      pricePerDay: vehicle.pricePerDay,
      transmission: vehicle.transmission || 'Manual',
      fuel: vehicle.fuel || 'Diesel',
      features: vehicle.features.join(', '),
      description: vehicle.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`${API_BASE_URL}/api/vehicles/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchVehicles();
      } catch (err) {
        console.error('Error deleting vehicle:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'Land Cruiser',
      capacity: 7,
      image: '',
      pricePerDay: 150,
      transmission: 'Manual',
      fuel: 'Diesel',
      features: '',
      description: ''
    });
  };

  if (loading) return (
    <div className="modern-loading-container">
      <div className="loading-pulse"></div>
      <p>Synchronizing Fleet Data...</p>
    </div>
  );

  return (
    <div className="admin-fleet-section fade-in">
      <div className="section-head mb-8">
        <div className="header-info">
          <div className="title-with-subtitle">
            <h2><Car size={24} className="text-primary" /> Fleet Management</h2>
            <p>Maintain and deploy your high-performance adventure vehicles.</p>
          </div>
        </div>
        <button className="btn-luxury-primary" onClick={() => { resetForm(); setEditingVehicle(null); setShowModal(true); }}>
          <Plus size={20} /> Register Vehicle
        </button>
      </div>

      <div className="admin-content-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="tours-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="glass-panel tour-card admin-theme" style={{ padding: '0', overflow: 'hidden' }}>
              <div className="tour-card-image" style={{ height: '220px', position: 'relative' }}>
                <img src={vehicle.image} alt={vehicle.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="tour-price-badge" style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--primary)', padding: '5px 12px', borderRadius: '10px', fontWeight: '800', fontSize: '0.85rem' }}>
                  ${vehicle.pricePerDay}<small>/day</small>
                </div>
              </div>
              <div className="tour-card-content" style={{ padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'white' }}>{vehicle.name}</h3>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '5px', color: 'var(--primary)', fontWeight: '700' }}>
                    {vehicle.type}
                  </span>
                </div>
                
                <div className="tour-meta" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                  <div className="meta-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#888' }}>
                    <Users size={14} className="text-primary" /> {vehicle.capacity} Seats
                  </div>
                  <div className="meta-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#888' }}>
                    <Zap size={14} className="text-primary" /> {vehicle.transmission}
                  </div>
                  <div className="meta-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#888' }}>
                    <Fuel size={14} className="text-primary" /> {vehicle.fuel}
                  </div>
                  <div className="meta-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#888' }}>
                    <Star size={14} className="text-primary" /> Featured
                  </div>
                </div>

                <div className="admin-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                  <button className="text-btn" onClick={() => handleEdit(vehicle)} style={{ justifyContent: 'center', gap: '8px' }}>
                    <Edit2 size={16} /> Edit
                  </button>
                  <button className="text-btn danger" onClick={() => handleDelete(vehicle._id)} style={{ justifyContent: 'center', gap: '8px', color: '#ef4444' }}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Vehicle Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="Land Cruiser">Land Cruiser</option>
                    <option value="Van">Safari Van</option>
                    <option value="SUV">SUV</option>
                    <option value="Bus">Bus</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Price Per Day ($)</label>
                  <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Transmission</label>
                  <select name="transmission" value={formData.transmission} onChange={handleInputChange}>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fuel Type</label>
                  <select name="fuel" value={formData.fuel} onChange={handleInputChange}>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Image URL</label>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} required />
                </div>
                <div className="form-group full-width">
                  <label>Features (comma separated)</label>
                  <input type="text" name="features" value={formData.features} onChange={handleInputChange} placeholder="AC, Wi-Fi, Roof Hatch, GPS" />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3"></textarea>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-modern-primary">Save Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVehicles;
