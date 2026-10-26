import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CarCard } from '../components/CarCard';

export const InventoryPage: React.FC = () => {
  const { cars, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter state
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedBodyType, setSelectedBodyType] = useState('all');
  const [budgetRange, setBudgetRange] = useState('all');
  const [condition, setCondition] = useState('all');
  const [status, setStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Sync initial state from URL parameters
  useEffect(() => {
    const brandParam = searchParams.get('brand');
    const modelParam = searchParams.get('model');
    const budgetMaxParam = searchParams.get('budgetMax');

    if (brandParam) setSelectedBrand(brandParam);
    if (modelParam) setSearchQuery(modelParam);
    if (budgetMaxParam) {
      const maxVal = Number(budgetMaxParam);
      if (maxVal <= 10000) setBudgetRange('under-10k');
      else if (maxVal <= 20000) setBudgetRange('10k-20k');
      else if (maxVal <= 35000) setBudgetRange('20k-35k');
      else if (maxVal <= 50000) setBudgetRange('35k-50k');
      else setBudgetRange('all');
    }
  }, [searchParams]);

  const brandButtons = [
    { name: 'all', label: 'All', icon: 'fa-solid fa-border-all' },
    { name: 'Hyundai', label: 'Hyundai', img: 'https://www.carlogos.org/car-logos/hyundai-logo.png' },
    { name: 'Kia', label: 'Kia', img: 'https://www.carlogos.org/car-logos/kia-logo.png' },
    { name: 'Genesis', label: 'Genesis', img: 'https://www.carlogos.org/car-logos/genesis-logo.png' },
    { name: 'Chevrolet', label: 'Chevrolet', img: 'https://www.carlogos.org/car-logos/chevrolet-logo.png' },
    { name: 'Ssangyong', label: 'Ssangyong', img: 'https://www.carlogos.org/car-logos/ssangyong-logo.png' },
    { name: 'Renault', label: 'Renault', img: 'https://www.carlogos.org/car-logos/renault-logo.png' },
    { name: 'BMW', label: 'BMW', img: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
    { name: 'Mercedes', label: 'Mercedes', img: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png' },
    { name: 'Volkswagen', label: 'Volkswagen', img: 'https://www.carlogos.org/car-logos/volkswagen-logo.png' },
    { name: 'Toyota', label: 'Toyota', img: 'https://www.carlogos.org/car-logos/toyota-logo.png' },
  ];

  const bodyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'electric', label: 'Electric (EV)' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'van', label: 'Van / MPV' },
    { value: 'truck', label: 'Truck / Pickup' },
    { value: 'compact', label: 'Compact / City' },
  ];

  const budgetOptions = [
    { value: 'all', label: 'Any Budget' },
    { value: 'under-10k', label: 'Under $10,000' },
    { value: '10k-20k', label: '$10,000 - $20,000' },
    { value: '20k-35k', label: '$20,000 - $35,000' },
    { value: '35k-50k', label: '$35,000 - $50,000' },
    { value: 'above-50k', label: '$50,000+' },
  ];

  const clearAllFilters = () => {
    setSelectedBrand('all');
    setSelectedBodyType('all');
    setBudgetRange('all');
    setCondition('all');
    setStatus('all');
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({});
  };

  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        // Brand filter
        if (selectedBrand !== 'all') {
          if (selectedBrand === 'Mercedes' && !car.brand.includes('Mercedes')) return false;
          else if (selectedBrand !== 'Mercedes' && car.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
        }

        // Body type filter
        if (selectedBodyType !== 'all') {
          if (car.bodyType !== selectedBodyType) return false;
        }

        // Budget filter
        if (budgetRange === 'under-10k' && car.price >= 10000) return false;
        if (budgetRange === '10k-20k' && (car.price < 10000 || car.price > 20000)) return false;
        if (budgetRange === '20k-35k' && (car.price < 20000 || car.price > 35000)) return false;
        if (budgetRange === '35k-50k' && (car.price < 35000 || car.price > 50000)) return false;
        if (budgetRange === 'above-50k' && car.price < 50000) return false;

        // Condition filter
        if (condition !== 'all' && car.condition !== condition) return false;

        // Status filter
        if (status !== 'all' && car.status !== status) return false;

        // Search text query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchBrand = car.brand.toLowerCase().includes(q);
          const matchModel = car.model.toLowerCase().includes(q);
          const matchEngine = car.engine ? car.engine.toLowerCase().includes(q) : false;
          const matchFuel = car.fuel ? car.fuel.toLowerCase().includes(q) : false;
          const matchFeatures = car.features ? car.features.some((f) => f.toLowerCase().includes(q)) : false;
          const matchYear = car.year.toString().includes(q);
          if (!matchBrand && !matchModel && !matchEngine && !matchFuel && !matchFeatures && !matchYear) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'mileage-asc') return a.mileage - b.mileage;
        return 0; // Default
      });
  }, [cars, selectedBrand, selectedBodyType, budgetRange, condition, status, searchQuery, sortBy]);

  return (
    <div className="inventory-page" style={{ paddingTop: '100px', minHeight: '90vh' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="section-title">{t.inventory.title}</h1>
        <p className="section-desc">{t.inventory.subtitle}</p>
      </div>

      <section id="catalog" className="catalog-section section" style={{ paddingTop: '0' }}>
        <div className="container">
          {/* Filter Panel */}
          <div className="filter-panel">
            {/* Brand Logo Grid */}
            <div className="brand-logo-grid" id="brandLogoGrid">
              <h4 className="filter-section-title">
                <i className="fa-solid fa-car"></i> {t.inventory.popularBrands}
              </h4>
              <div className="brand-logos">
                {brandButtons.map((btn) => (
                  <button
                    key={btn.name}
                    type="button"
                    className={`brand-logo-btn ${selectedBrand === btn.name ? 'active' : ''}`}
                    onClick={() => setSelectedBrand(btn.name)}
                    title={btn.label}
                  >
                    {btn.img ? (
                      <img src={btn.img} alt={btn.label} />
                    ) : (
                      <i className={btn.icon}></i>
                    )}
                    <span>{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters Grid */}
            <div
              className="filters-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-color)',
              }}
            >
              {/* Body Type */}
              <div className="filter-item">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '6px', display: 'block' }}>
                  <i className="fa-solid fa-shapes" style={{ color: 'var(--primary-gold)', marginRight: '6px' }}></i>
                  {t.inventory.bodyType}
                </label>
                <select
                  value={selectedBodyType}
                  onChange={(e) => setSelectedBodyType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-white)',
                    borderRadius: 'var(--border-radius-sm)',
                  }}
                >
                  {bodyTypes.map((bt) => (
                    <option key={bt.value} value={bt.value}>
                      {bt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="filter-item">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '6px', display: 'block' }}>
                  <i className="fa-solid fa-dollar-sign" style={{ color: 'var(--primary-gold)', marginRight: '6px' }}></i>
                  {t.inventory.budget}
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-white)',
                    borderRadius: 'var(--border-radius-sm)',
                  }}
                >
                  {budgetOptions.map((bo) => (
                    <option key={bo.value} value={bo.value}>
                      {bo.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div className="filter-item">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '6px', display: 'block' }}>
                  <i className="fa-solid fa-certificate" style={{ color: 'var(--primary-gold)', marginRight: '6px' }}></i>
                  {t.inventory.condition}
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-white)',
                    borderRadius: 'var(--border-radius-sm)',
                  }}
                >
                  <option value="all">All Conditions</option>
                  <option value="New">{t.inventory.new}</option>
                  <option value="Used">{t.inventory.used}</option>
                </select>
              </div>

              {/* Status */}
              <div className="filter-item">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '6px', display: 'block' }}>
                  <i className="fa-solid fa-signal" style={{ color: 'var(--primary-gold)', marginRight: '6px' }}></i>
                  {t.inventory.status}
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-white)',
                    borderRadius: 'var(--border-radius-sm)',
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="Available">{t.inventory.available}</option>
                  <option value="Sold">{t.inventory.sold}</option>
                </select>
              </div>
            </div>

            {/* Search Input & Sort Bar */}
            <div
              className="search-sort-bar"
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-color)',
              }}
            >
              <div style={{ flex: '1 1 300px', position: 'relative' }}>
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                  }}
                ></i>
                <input
                  type="text"
                  placeholder={t.inventory.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    color: 'var(--text-white)',
                    outline: 'none',
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-gray)',
                      cursor: 'pointer',
                    }}
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', whiteSpace: 'nowrap' }}>
                  {t.inventory.sortBy}:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '11px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    color: 'var(--text-white)',
                  }}
                >
                  <option value="default">{t.inventory.defaultSort}</option>
                  <option value="price-asc">{t.inventory.priceLowHigh}</option>
                  <option value="price-desc">{t.inventory.priceHighLow}</option>
                  <option value="year-desc">{t.inventory.yearNewest}</option>
                  <option value="mileage-asc">{t.inventory.mileageLowest}</option>
                </select>
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearAllFilters}
                style={{ padding: '11px 18px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
              >
                <i className="fa-solid fa-rotate-left"></i> {t.inventory.clearFilters}
              </button>
            </div>
          </div>

          {/* Results Summary Counter */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '25px 0 20px',
              padding: '0 4px',
            }}
          >
            <div style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
              Showing <strong style={{ color: 'var(--primary-gold)' }}>{filteredCars.length}</strong> {t.inventory.vehiclesFound}
            </div>
          </div>

          {/* Cars Grid or No Results */}
          {filteredCars.length === 0 ? (
            <div
              className="no-results"
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                background: 'var(--bg-card)',
                borderRadius: 'var(--border-radius-lg)',
                border: '1px solid var(--border-color)',
              }}
            >
              <i
                className="fa-solid fa-car-tunnel"
                style={{ fontSize: '3.5rem', color: 'var(--primary-gold)', marginBottom: '16px', opacity: 0.8 }}
              ></i>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-white)', marginBottom: '8px' }}>
                {t.inventory.noVehicles}
              </h3>
              <p style={{ color: 'var(--text-gray)', maxWidth: '500px', margin: '0 auto 24px' }}>
                {t.inventory.noVehiclesDesc}
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={clearAllFilters}
                style={{ padding: '10px 24px' }}
              >
                {t.inventory.clearFilters}
              </button>
            </div>
          ) : (
            <div className="car-grid" id="carGrid">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
