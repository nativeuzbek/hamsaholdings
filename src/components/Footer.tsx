import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t, isAdminLoggedIn } = useApp();
  const navigate = useNavigate();

  const handleBrandClick = (brandName: string) => {
    navigate(`/inventory?brand=${encodeURIComponent(brandName)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Brand Info */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo logo-area">
            <img
              src="/static/images/hamsa_logo.jpg"
              alt="Hamsa Holdings Logo"
              className="nav-logo"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/hamsa_logo.jpg';
              }}
            />
            <span className="logo-text">
              HAMSA <span className="accent-text">HOLDINGS</span>
            </span>
          </Link>
          <p className="footer-about">
            Direct automobile export company headquartered in Seoul, South Korea. Exporting premium
            new and certified pre-owned Hyundai, Kia, Genesis, and world-class vehicles directly
            from Incheon and Busan ports worldwide.
          </p>
          <div className="social-links" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <a
              href="https://wa.me/821067719498"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="WhatsApp"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--bg-input)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-gold)',
                border: '1px solid var(--border-color)',
              }}
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a
              href="https://telegram.me"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="Telegram"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--bg-input)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-gold)',
                border: '1px solid var(--border-color)',
              }}
            >
              <i className="fa-brands fa-telegram"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title="Instagram"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--bg-input)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-gold)',
                border: '1px solid var(--border-color)',
              }}
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">{t.nav.home}</Link>
            </li>
            <li>
              <Link to="/inventory">{t.nav.inventory}</Link>
            </li>
            <li>
              <Link to="/how-it-works">{t.nav.howItWorks}</Link>
            </li>
            <li>
              <Link to="/shipping">{t.nav.shipping}</Link>
            </li>
            <li>
              <Link to="/about">{t.nav.about}</Link>
            </li>
            <li>
              <Link to="/contact">{t.nav.contact}</Link>
            </li>
          </ul>
        </div>

        {/* Popular Brands */}
        <div className="footer-col">
          <h4 className="footer-title">{t.inventory.popularBrands}</h4>
          <ul className="footer-links">
            <li>
              <button
                type="button"
                onClick={() => handleBrandClick('Genesis')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Genesis
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleBrandClick('Hyundai')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Hyundai
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleBrandClick('Kia')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Kia
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleBrandClick('Ssangyong')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Ssangyong / KGM
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleBrandClick('Chevrolet')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Chevrolet Korea
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleBrandClick('BMW')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                BMW
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleBrandClick('Mercedes')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Mercedes-Benz
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h4 className="footer-title">Headquarters</h4>
          <div className="footer-contact-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>Haengdang-dong 317-189 3rd floor, Seongdong-gu, Seoul, Republic of Korea</span>
          </div>
          <div className="footer-contact-item">
            <i className="fa-brands fa-whatsapp"></i>
            <a href="https://wa.me/821067719498" target="_blank" rel="noopener noreferrer">
              +82 10-6771-9498
            </a>
          </div>
          <div className="footer-contact-item">
            <i className="fa-solid fa-envelope"></i>
            <span>info@hamsaholdings.com</span>
          </div>
          <div className="footer-contact-item" style={{ marginTop: '16px' }}>
            <Link
              to={isAdminLoggedIn ? '/admin' : '/admin/login'}
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className="fa-solid fa-lock"></i>
              {isAdminLoggedIn ? 'Admin Panel' : 'Staff Login'}
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} Hamsa Holdings. All Rights Reserved. Seoul, South Korea.</p>
          <div className="footer-legal">
            <Link to="/how-it-works">Export Terms</Link>
            <Link to="/shipping">Shipping Policy</Link>
            <Link to="/contact">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
