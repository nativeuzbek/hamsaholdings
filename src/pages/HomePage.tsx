import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HeroSearch } from '../components/HeroSearch';
import { CarCard } from '../components/CarCard';

export const HomePage: React.FC = () => {
  const { cars, t } = useApp();
  const navigate = useNavigate();

  // Featured cars: first 6 cars (or available ones)
  const featuredCars = cars.slice(0, 6);

  const brandLogos = [
    { name: 'Hyundai', img: 'https://www.carlogos.org/car-logos/hyundai-logo.png' },
    { name: 'Kia', img: 'https://www.carlogos.org/car-logos/kia-logo.png' },
    { name: 'Genesis', img: 'https://www.carlogos.org/car-logos/genesis-logo.png' },
    { name: 'Chevrolet', img: 'https://www.carlogos.org/car-logos/chevrolet-logo.png' },
    { name: 'Ssangyong', img: 'https://www.carlogos.org/car-logos/ssangyong-logo.png' },
    { name: 'Renault', img: 'https://www.carlogos.org/car-logos/renault-logo.png' },
    { name: 'BMW', img: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
    { name: 'Mercedes', img: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png' },
  ];

  const handleBrandClick = (brandName: string) => {
    navigate(`/inventory?brand=${encodeURIComponent(brandName)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="home" className="hero">
        <div
          className="hero-bg-overlay"
          style={{
            backgroundImage: "url('/static/images/hero_bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container hero-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content">
            <span className="hero-badge">
              <i className="fa-solid fa-award"></i> {t.hero.badge}
            </span>
            <h1 className="hero-title">
              {t.hero.title} <br />
              <span className="gradient-text">{t.hero.subtitle}</span>
            </h1>
            <p className="hero-subtitle">{t.hero.description}</p>

            {/* Search Widget */}
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Popular Brands Ticker */}
      <section className="section" style={{ padding: '30px 0', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {brandLogos.map((brand) => (
              <button
                key={brand.name}
                type="button"
                onClick={() => handleBrandClick(brand.name)}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '30px',
                  padding: '8px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-silver)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-gold)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img src={brand.img} alt={brand.name} style={{ width: '22px', height: '16px', objectFit: 'contain' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{brand.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="section catalog-section" style={{ padding: '70px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <h2 className="section-title">{t.home.featuredTitle}</h2>
            <p className="section-desc">{t.home.featuredSubtitle}</p>
          </div>

          <div className="car-grid" id="carGrid">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '45px' }}>
            <Link to="/inventory" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              <i className="fa-solid fa-list" style={{ marginRight: '8px' }}></i>
              {t.home.viewAllInventory} ({cars.length} Cars)
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-tag">Value Proposition</span>
            <h2 className="section-title">{t.home.whyChooseTitle}</h2>
            <p className="section-desc">{t.home.whyChooseSubtitle}</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-anchor"></i>
              </div>
              <h3 className="service-title">{t.home.reason1Title}</h3>
              <p className="service-text">{t.home.reason1Desc}</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-clipboard-check"></i>
              </div>
              <h3 className="service-title">{t.home.reason2Title}</h3>
              <p className="service-text">{t.home.reason2Desc}</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-file-invoice"></i>
              </div>
              <h3 className="service-title">{t.home.reason3Title}</h3>
              <p className="service-text">{t.home.reason3Desc}</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-tag"></i>
              </div>
              <h3 className="service-title">{t.home.reason4Title}</h3>
              <p className="service-text">{t.home.reason4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Import CTA */}
      <section className="section" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '16px' }}>
            {t.home.ctaTitle}
          </h2>
          <p className="section-desc" style={{ fontSize: '1.15rem', marginBottom: '32px' }}>
            {t.home.ctaDesc}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/821067719498?text=Hello%20Hamsa%20Holdings!%20I%20want%20to%20discuss%20importing%20a%20car%20from%20Korea."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '1.05rem' }}
            >
              <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              className="btn btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1.05rem' }}
            >
              <i className="fa-solid fa-envelope"></i> {t.home.contactUsNow}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
