import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const HeroSearch: React.FC = () => {
  const { cars, t } = useApp();
  const navigate = useNavigate();

  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all');
  const [maxPrice, setMaxPrice] = useState('999999');

  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(cars.map((c) => c.brand))).sort();
  }, [cars]);

  const availableModels = useMemo(() => {
    if (selectedBrand === 'all') return [];
    return Array.from(
      new Set(cars.filter((c) => c.brand === selectedBrand).map((c) => c.model))
    ).sort();
  }, [cars, selectedBrand]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setSelectedModel('all');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBrand !== 'all') params.set('brand', selectedBrand);
    if (selectedModel !== 'all') params.set('model', selectedModel);
    if (maxPrice !== '999999') params.set('budgetMax', maxPrice);

    navigate(`/inventory?${params.toString()}`);
  };

  return (
    <div className="hero-search-widget">
      <form onSubmit={handleSearch} className="hero-search-form">
        <div className="search-group">
          <label>{t.hero.make}</label>
          <select value={selectedBrand} onChange={handleBrandChange}>
            <option value="all">{t.hero.allBrands}</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="search-group">
          <label>{t.hero.model}</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={selectedBrand === 'all'}
          >
            <option value="all">{t.hero.allModels}</option>
            {availableModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="search-group">
          <label>{t.hero.maxPrice}</label>
          <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
            <option value="999999">{t.hero.anyPrice}</option>
            <option value="10000">Under $10,000</option>
            <option value="20000">Under $20,000</option>
            <option value="35000">Under $35,000</option>
            <option value="50000">Under $50,000</option>
            <option value="75000">Under $75,000</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary search-submit-btn">
          <i className="fa-solid fa-magnifying-glass"></i> {t.hero.search}
        </button>
      </form>
    </div>
  );
};
