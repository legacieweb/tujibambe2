import React from 'react';
import { Search, Plus, Compass, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminTours = ({ tours, handleDeleteTour }) => {
  const navigate = useNavigate();

  return (
    <div className="tab-view-container fade-in">
      <div className="section-head-modern">
        <div className="title-group">
          <h2>Package Inventory</h2>
          <p>Curate and manage your collection of wild adventures ({tours.length} total).</p>
        </div>
        <div className="header-actions">
          <div className="search-box-modern">
            <Search size={18} />
            <input type="text" placeholder="Filter by title..." />
          </div>
          <button className="btn-modern-primary" onClick={() => navigate('/admin/add-tour')}>
            <Plus size={18} /> New Adventure
          </button>
        </div>
      </div>

      <div className="glass-panel mt-6">
        <div className="table-responsive-modern">
          <table className="modern-admin-table">
            <thead>
              <tr>
                <th>Package Details</th>
                <th>Destination</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map(t => (
                <tr key={t._id}>
                  <td>
                    <div className="user-cell">
                      <div className="tour-thumb-sm">
                        <img src={t.image} alt="" />
                      </div>
                      <div className="user-info-text">
                        <span className="name">{t.title}</span>
                        <span className="sub">{t.type} Experience</span>
                      </div>
                    </div>
                  </td>
                  <td><div className="location-cell"><Compass size={14} /> {t.location}</div></td>
                  <td><span className="tag-outline">{t.category}</span></td>
                  <td className="amount-cell">${t.price}</td>
                  <td>
                    <div className="item-actions justify-end">
                      <button className="icon-btn-sm" onClick={() => navigate(`/admin/edit-tour/${t._id}`)} title="Edit Package">
                        <Edit size={16} />
                      </button>
                      <button className="icon-btn-sm delete" onClick={() => handleDeleteTour(t._id)} title="Remove Package">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTours;
