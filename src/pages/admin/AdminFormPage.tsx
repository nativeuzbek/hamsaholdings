import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Car } from '../../types';

export const AdminFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cars, addCar, updateCar, isAdminLoggedIn, logoutAdmin } = useApp();

  const isEditing = Boolean(id);
  const existingCar = isEditing ? cars.find((c) => c.id === Number(id)) : null;

  // Auth guard
  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [isAdminLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    brand: 'Genesis',
    model: '',
    year: 2024,
    mileage: 0,
    price: 35000,
    condition: 'New' as 'New' | 'Used',
    status: 'Available' as 'Available' | 'Sold',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.5L Turbo',
    color: 'Black',
    driveType: 'AWD',
    bodyType: 'sedan' as Car['bodyType'],
    features: 'Leather Seats, Panoramic Sunroof, Adaptive Cruise Control',
    image: '/static/images/genesis_g80.jpg',
    description: '',
  });

  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (existingCar) {
      setFormData({
        brand: existingCar.brand,
        model: existingCar.model,
        year: existingCar.year,
        mileage: existingCar.mileage,
        price: existingCar.price,
        condition: existingCar.condition,
        status: existingCar.status,
        fuel: existingCar.fuel,
        transmission: existingCar.transmission,
        engine: existingCar.engine,
        color: existingCar.color,
        driveType: existingCar.driveType,
        bodyType: existingCar.bodyType,
        features: existingCar.features ? existingCar.features.join(', ') : '',
        image: existingCar.image,
        description: existingCar.description,
      });
    }
  }, [existingCar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const featuresList = formData.features
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const carPayload = {
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      year: Number(formData.year),
      mileage: Number(formData.mileage),
      price: Number(formData.price),
      condition: formData.condition,
      status: formData.status,
      fuel: formData.fuel,
      transmission: formData.transmission,
      engine: formData.engine.trim(),
      color: formData.color.trim(),
      driveType: formData.driveType,
      bodyType: formData.bodyType,
      features: featuresList,
      image: formData.image.trim() || '/static/images/hyundai_palisade.jpg',
      description: formData.description.trim(),
    };

    if (isEditing && existingCar) {
      updateCar(existingCar.id, carPayload);
      setSuccessMsg(`"${carPayload.brand} ${carPayload.model}" muvaffaqiyatli tahrirlandi!`);
    } else {
      addCar(carPayload);
      setSuccessMsg(`"${carPayload.brand} ${carPayload.model}" muvaffaqiyatli qo'shildi!`);
    }

    setTimeout(() => {
      navigate('/admin');
    }, 1200);
  };

  const brandsList = [
    'Genesis',
    'Hyundai',
    'Kia',
    'Chevrolet',
    'Ssangyong',
    'Renault',
    'BMW',
    'Mercedes',
    'Volkswagen',
    'Toyota',
  ];

  return (
    <div className="admin-body">
      <div className="admin-layout">
        {/* Sidebar */}
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
            <Link to="/admin" className="admin-nav-link">
              <i className="fa-solid fa-car"></i> Mashinalar
            </Link>
            <Link to="/" className="admin-nav-link" target="_blank">
              <i className="fa-solid fa-globe"></i> Saytni ko'rish
            </Link>
            <Link to="/admin/add" className={`admin-nav-link add-link ${!isEditing ? 'active' : ''}`}>
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
              <i className={`fa-solid ${isEditing ? 'fa-pen-to-square' : 'fa-plus-circle'}`}></i>
              {isEditing ? ` ${formData.brand} ${formData.model} — Tahrirlash` : ' Yangi mashina qo\'shish'}
            </h1>
            <Link to="/admin" className="admin-btn admin-btn-secondary">
              <i className="fa-solid fa-arrow-left"></i> Orqaga
            </Link>
          </div>

          {successMsg && (
            <div className="admin-alert admin-alert-success">
              <i className="fa-solid fa-circle-check"></i>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {/* Column 1: Basic Info */}
              <div className="admin-form-section">
                <h3>
                  <i className="fa-solid fa-circle-info"></i> Asosiy ma'lumotlar
                </h3>

                <div className="admin-field">
                  <label htmlFor="brand">Brend *</label>
                  <select
                    id="brand"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  >
                    {brandsList.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label htmlFor="model">Model *</label>
                  <input
                    type="text"
                    id="model"
                    required
                    placeholder="G80, Palisade, EV6..."
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>

                <div className="admin-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="admin-field">
                    <label htmlFor="year">Yil *</label>
                    <input
                      type="number"
                      id="year"
                      required
                      min={1990}
                      max={2030}
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="mileage">Yurgan masofa (km)</label>
                    <input
                      type="number"
                      id="mileage"
                      min={0}
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="admin-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="admin-field">
                    <label htmlFor="price">FOB Narxi ($ USD) *</label>
                    <input
                      type="number"
                      id="price"
                      required
                      min={0}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="condition">Holati</label>
                    <select
                      id="condition"
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value as 'New' | 'Used' })}
                    >
                      <option value="New">New (Yangi)</option>
                      <option value="Used">Used (Minilgan)</option>
                    </select>
                  </div>
                </div>

                <div className="admin-field">
                  <label htmlFor="status">Sotuv statusi</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Available' | 'Sold' })}
                  >
                    <option value="Available">Available (Sotuvda)</option>
                    <option value="Sold">Sold (Sotilgan)</option>
                  </select>
                </div>
              </div>

              {/* Column 2: Technical Specifications */}
              <div className="admin-form-section">
                <h3>
                  <i className="fa-solid fa-gears"></i> Texnik xususiyatlar
                </h3>

                <div className="admin-field">
                  <label htmlFor="fuel">Yoqilg'i turi</label>
                  <select
                    id="fuel"
                    value={formData.fuel}
                    onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                  >
                    <option value="Gasoline">Gasoline (Benzin)</option>
                    <option value="Diesel">Diesel (Dizel)</option>
                    <option value="Electric">Electric (Elektro)</option>
                    <option value="Hybrid">Hybrid (Gibrid)</option>
                    <option value="LPG">LPG (Gaz)</option>
                  </select>
                </div>

                <div className="admin-field">
                  <label htmlFor="transmission">Uzatma qutisi</label>
                  <select
                    id="transmission"
                    value={formData.transmission}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                  >
                    <option value="Automatic">Automatic (Avtomat)</option>
                    <option value="Manual">Manual (Mexanika)</option>
                  </select>
                </div>

                <div className="admin-field">
                  <label htmlFor="engine">Dvigatel</label>
                  <input
                    type="text"
                    id="engine"
                    placeholder="2.5L Turbo, 3.8L V6, 77.4 kWh..."
                    value={formData.engine}
                    onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                  />
                </div>

                <div className="admin-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="admin-field">
                    <label htmlFor="driveType">Yuritma (Privod)</label>
                    <select
                      id="driveType"
                      value={formData.driveType}
                      onChange={(e) => setFormData({ ...formData, driveType: e.target.value })}
                    >
                      <option value="FWD">FWD (Oldi)</option>
                      <option value="AWD">AWD (To'liq)</option>
                      <option value="RWD">RWD (Orqa)</option>
                      <option value="4WD">4WD (Ulanuvchi)</option>
                    </select>
                  </div>

                  <div className="admin-field">
                    <label htmlFor="bodyType">Kuzov turi</label>
                    <select
                      id="bodyType"
                      value={formData.bodyType}
                      onChange={(e) => setFormData({ ...formData, bodyType: e.target.value as Car['bodyType'] })}
                    >
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="van">Van</option>
                      <option value="truck">Truck</option>
                      <option value="compact">Compact</option>
                    </select>
                  </div>
                </div>

                <div className="admin-field">
                  <label htmlFor="color">Kuzov rangi</label>
                  <input
                    type="text"
                    id="color"
                    placeholder="Black, White, Cardiff Green..."
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
              </div>

              {/* Column 3: Media & Features */}
              <div className="admin-form-section" style={{ gridColumn: '1 / -1' }}>
                <h3>
                  <i className="fa-solid fa-photo-film"></i> Rasm, Opsiyalar va Tavsif
                </h3>

                <div className="admin-field">
                  <label htmlFor="image">Rasm yo'li yoki havolasi (URL)</label>
                  <input
                    type="text"
                    id="image"
                    placeholder="/static/images/genesis_g80.jpg yoki https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Mavjud namunalar: /static/images/genesis_g80.jpg, /static/images/hyundai_palisade.jpg, /static/images/kia_ev6.jpg, /static/images/hyundai_sonata.jpg, /static/images/bmw_5series.jpg
                  </div>
                </div>

                <div className="admin-field">
                  <label htmlFor="features">Komplektatsiya va opsiyalar (vergul bilan ajrating)</label>
                  <input
                    type="text"
                    id="features"
                    placeholder="Leather Seats, Panoramic Sunroof, Adaptive Cruise Control, Head-Up Display"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="description">Batafsil tavsif</label>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Avtomobil holati, servis tarixi, afzalliklari..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
                  <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '12px 28px' }}>
                    <i className="fa-solid fa-floppy-disk"></i> {isEditing ? 'O\'zgarishlarni saqlash' : 'Mashinani qo\'shish'}
                  </button>

                  <Link to="/admin" className="admin-btn admin-btn-secondary" style={{ padding: '12px 24px' }}>
                    Bekor qilish
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
