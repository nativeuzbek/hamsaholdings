import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const Header: React.FC = () => {
  const { language, setLanguage, t, isAdminLoggedIn } = useApp();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/inventory', label: t.nav.inventory },
    { to: '/how-it-works', label: t.nav.howItWorks },
    { to: '/shipping', label: t.nav.shipping },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo-area">
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

        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} id="navMenu">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          {isAdminLoggedIn && (
            <Link
              to="/admin"
              className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
              style={{ color: 'var(--primary-gold)' }}
            >
              <i className="fa-solid fa-gauge-high" style={{ marginRight: '6px' }}></i>
              {t.nav.admin}
            </Link>
          )}
        </nav>

        <div className="header-actions">
          {/* Language Selector */}
          <div
            className="lang-selector"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <span className="active-lang">{language.toUpperCase()}</span>
            <i
              className={`fa-solid fa-chevron-down lang-chevron ${
                langDropdownOpen ? 'rotated' : ''
              }`}
              style={{
                marginLeft: '6px',
                transition: 'transform 0.2s',
                transform: langDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            ></i>
            {langDropdownOpen && (
              <div
                className="lang-dropdown show"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-sm)',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '120px',
                  zIndex: 1000,
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  className="lang-option"
                  style={{
                    padding: '8px 14px',
                    textAlign: 'left',
                    background: language === 'en' ? 'rgba(229,184,66,0.1)' : 'transparent',
                    color: language === 'en' ? 'var(--primary-gold)' : 'var(--text-silver)',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '0.9rem',
                  }}
                  onClick={() => handleLangSelect('en')}
                >
                  English
                </button>
                <button
                  type="button"
                  className="lang-option"
                  style={{
                    padding: '8px 14px',
                    textAlign: 'left',
                    background: language === 'uz' ? 'rgba(229,184,66,0.1)' : 'transparent',
                    color: language === 'uz' ? 'var(--primary-gold)' : 'var(--text-silver)',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '0.9rem',
                  }}
                  onClick={() => handleLangSelect('uz')}
                >
                  O'zbekcha
                </button>
                <button
                  type="button"
                  className="lang-option"
                  style={{
                    padding: '8px 14px',
                    textAlign: 'left',
                    background: language === 'ru' ? 'rgba(229,184,66,0.1)' : 'transparent',
                    color: language === 'ru' ? 'var(--primary-gold)' : 'var(--text-silver)',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '0.9rem',
                  }}
                  onClick={() => handleLangSelect('ru')}
                >
                  Русский
                </button>
              </div>
            )}
          </div>

          {/* WhatsApp Direct Inquiry Button */}
          <a
            href="https://wa.me/821067719498?text=Hello%20Hamsa%20Holdings!%20I%20would%20like%20to%20inquire%20about%20importing%20vehicles%20from%20South%20Korea."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-nav"
          >
            <i className="fa-brands fa-whatsapp"></i> {t.nav.inquiry}
          </a>

          {/* Hamburger Menu Toggle */}
          <button
            className={`hamburger-menu ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
