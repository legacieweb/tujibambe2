import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Car, Users, Zap, Fuel, Star } from 'lucide-react';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
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
      const response = await axios.get('http://localhost:5000/api/vehicles');
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
      features: formData.features.split(',').map(f => f.trim())
    };

    try {
      if (editingVehicle) {
        await axios.put(`http://localhost:5000/api/vehicles/${editingVehicle._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/vehicles', data, {
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
        await axios.delete(`http://localhost:5000/api/vehicles/${id}`, {
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

  if (loading) return <div>Loading fleet...</div>;

  return (
    <div className="admin-tours-section">
      <div className="section-header">
        <div className="header-info">
          <h2>Fleet <span className="text-gradient">Management</span></h2>
          <p>Add and manage your adventure vehicles.</p>
        </div>
        <button className="btn-modern-primary" onClick={() => { resetForm(); setEditingVehicle(null); setShowModal(true); }}>
          <Plus size={20} /> Add Vehicle
        </button>
      </div>

      <div className="tours-grid">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="tour-card admin-theme">
            <div className="tour-card-image">
              <img src={vehicle.image} alt={vehicle.name} />
              <div className="tour-price-badge">${vehicle.pricePerDay}/day</div>
            </div>
            <div className="tour-card-content">
              <h3>{vehicle.name}</h3>
              <p className="tour-location">{vehicle.type}</p>
              
              <div className="tour-meta">
                <div className="meta-item"><Users size={14} /> {vehicle.capacity} Seats</div>
                <div className="meta-item"><Zap size={14} /> {vehicle.transmission}</div>
                <div className="meta-item"><Fuel size={14} /> {vehicle.fuel}</div>
              </div>

              <div className="admin-actions">
                <button className="btn-edit" onClick={() => handleEdit(vehicle)}>
                  <Edit2 size={16} /> Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(vehicle._id)}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
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
