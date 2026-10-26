import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const AdminDashboardPage: React.FC = () => {
  const { cars, isAdminLoggedIn, logoutAdmin, deleteCar, toggleCarStatus, t } = useApp();
  const navigate = useNavigate();

  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Auth guard
  React.useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [isAdminLoggedIn, navigate]);

  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(cars.map((c) => c.brand)));
  }, [cars]);

  const availableCount = cars.filter((c) => c.status !== 'Sold').length;
  const soldCount = cars.filter((c) => c.status === 'Sold').length;

  const filteredCars = useMemo(() => {
    return cars.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (searchFilter.trim() !== '') {
        const q = searchFilter.toLowerCase().trim();
        const matchName = `${c.brand} ${c.model}`.toLowerCase().includes(q);
        const matchYear = c.year.toString().includes(q);
        const matchPrice = c.price.toString().includes(q);
        return matchName || matchYear || matchPrice;
      }
      return true;
    });
  }, [cars, statusFilter, searchFilter]);

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`"${name}" mashinasini o'chirishni tasdiqlaysizmi?`)) {
      deleteCar(id);
      setAlertMessage(`"${name}" muvaffaqiyatli o'chirildi!`);
      setTimeout(() => setAlertMessage(null), 4000);
    }
  };

  const handleToggleStatus = (id: number, name: string, currentStatus: string) => {
    toggleCarStatus(id);
    const newStatus = currentStatus === 'Available' ? 'Sold' : 'Available';
    setAlertMessage(`"${name}" statusi "${newStatus}"ga o'zgartirildi!`);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const getCleanImageUrl = (img: string) => {
    if (!img) return '/static/images/hyundai_palisade.jpg';
    if (img.startsWith('http')) return img;
    if (img.startsWith('/static/')) return img;
    if (img.startsWith('static/')) return '/' + img;
    if (img.startsWith('images/')) return '/static/' + img;
    return img.startsWith('/') ? img : '/' + img;
  };

  return (
    <div className="admin-body">
      <div className="admin-layout">
        {/* Admin Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <Link to="/" className="admin-sidebar-logo">
              <img
                src="/static/images/hamsa_logo.jpg"
                alt="Hamsa Holdings"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/hamsa_logo.jpg';
                }}
              />
            </Link>
            <h2>Admin Panel</h2>
          </div>

          <nav className="admin-sidebar-nav">
            <Link to="/admin" className="admin-nav-link active">
              <i className="fa-solid fa-car"></i> Mashinalar
            </Link>
            <Link to="/" className="admin-nav-link" target="_blank">
              <i className="fa-solid fa-globe"></i> Saytni ko'rish
            </Link>
            <Link to="/admin/add" className="admin-nav-link add-link">
              <i className="fa-solid fa-plus"></i> Yangi qo'shish
            </Link>
          </nav>

          <div className="admin-sidebar-footer">
            <div className="admin-user-info">
              <i className="fa-solid fa-user-shield"></i>
              <span>Admin</span>
            </div>
            <button
              type="button"
              onClick={() => {
                logoutAdmin();
                navigate('/admin/login');
              }}
              className="admin-logout-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
            >
              <i className="fa-solid fa-right-from-bracket"></i> Chiqish
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <div className="admin-topbar">
            <h1>
              <i className="fa-solid fa-gauge-high"></i> Dashboard
            </h1>
            <Link to="/admin/add" className="admin-btn admin-btn-primary">
              <i className="fa-solid fa-plus"></i> Yangi mashina qo'shish
            </Link>
          </div>

          {alertMessage && (
            <div className="admin-alert admin-alert-success">
              <i className="fa-solid fa-circle-check"></i>
              <span>{alertMessage}</span>
            </div>
          )}

          {/* Stats Cards */}
          <div className="admin-stats-row">
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <i className="fa-solid fa-car"></i>
              </div>
              <div className="admin-stat-info">
                <span className="admin-stat-number">{cars.length}</span>
                <span className="admin-stat-label">Jami mashinalar</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div
                className="admin-stat-icon"
                style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}
              >
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div className="admin-stat-info">
                <span className="admin-stat-number">{availableCount}</span>
                <span className="admin-stat-label">Sotuvda</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div
                className="admin-stat-icon"
                style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}
              >
                <i className="fa-solid fa-handshake"></i>
              </div>
              <div className="admin-stat-info">
                <span className="admin-stat-number">{soldCount}</span>
                <span className="admin-stat-label">Sotilgan</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon brands">
                <i className="fa-solid fa-tags"></i>
              </div>
              <div className="admin-stat-info">
                <span className="admin-stat-number">{uniqueBrands.length}</span>
                <span className="admin-stat-label">Brendlar</span>
              </div>
            </div>
          </div>

          {/* Cars Table Container */}
          <div className="admin-table-container">
            <div
              className="admin-table-header"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <h2>
                <i className="fa-solid fa-list"></i> Mashinalar ro'yxati ({filteredCars.length})
              </h2>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Qidirish (brand, model)..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    color: 'var(--text-white)',
                    fontSize: '0.9rem',
                  }}
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    color: 'var(--text-white)',
                    fontSize: '0.9rem',
                  }}
                >
                  <option value="all">Barcha statuslar</option>
                  <option value="Available">Sotuvda</option>
                  <option value="Sold">Sotilgan</option>
                </select>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Rasm</th>
                    <th>Brend & Model</th>
                    <th>Yili</th>
                    <th>Yurgan</th>
                    <th>FOB Narx</th>
                    <th>Yoqilg'i</th>
                    <th>Status</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map((car) => {
                    const isSold = car.status === 'Sold';
                    return (
                      <tr key={car.id}>
                        <td>
                          <img
                            src={getCleanImageUrl(car.image)}
                            alt={car.model}
                            style={{
                              width: '60px',
                              height: '42px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/static/images/hyundai_palisade.jpg';
                            }}
                          />
                        </td>
                        <td>
                          <strong>{car.brand}</strong> {car.model}
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            ID: #{car.id} &bull; {car.bodyType}
                          </div>
                        </td>
                        <td>{car.year}</td>
                        <td>{car.mileage === 0 ? 'Yangi' : `${car.mileage.toLocaleString()} km`}</td>
                        <td style={{ color: 'var(--primary-gold)', fontWeight: 600 }}>
                          ${car.price.toLocaleString()}
                        </td>
                        <td>{car.fuel}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(car.id, `${car.brand} ${car.model}`, car.status)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              border: 'none',
                              background: isSold ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                              color: isSold ? '#ef4444' : '#22c55e',
                            }}
                            title="Statusni o'zgartirish uchun bosing"
                          >
                            <i className={`fa-solid ${isSold ? 'fa-lock' : 'fa-check'}`} style={{ marginRight: '4px' }}></i>
                            {isSold ? 'Sotilgan' : 'Sotuvda'}
                          </button>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <Link
                              to={`/car/${car.id}`}
                              target="_blank"
                              className="admin-action-btn"
                              title="Saytda ko'rish"
                              style={{ color: 'var(--text-gray)' }}
                            >
                              <i className="fa-solid fa-eye"></i>
                            </Link>

                            <Link
                              to={`/admin/edit/${car.id}`}
                              className="admin-action-btn edit"
                              title="Tahrirlash"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleDelete(car.id, `${car.brand} ${car.model}`)}
                              className="admin-action-btn delete"
                              title="O'chirish"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
