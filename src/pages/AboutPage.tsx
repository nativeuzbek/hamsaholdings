import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const { t } = useApp();
  const [ceoOpen, setCeoOpen] = useState(true);

  return (
    <div className="about-page" style={{ paddingTop: '100px', minHeight: '85vh' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="section-title">{t.about.title}</h1>
        <p className="section-desc">{t.about.subtitle}</p>
      </div>

      {/* Story & Image Section */}
      <section className="about-story section" style={{ paddingTop: '10px' }}>
        <div className="container story-container">
          <div className="story-image-area" style={{ position: 'relative' }}>
            <img
              src="/static/images/hero_bg.jpg"
              alt="Port Logistics in South Korea"
              className="story-img"
              style={{ width: '100%', borderRadius: 'var(--border-radius-lg)', objectFit: 'cover', minHeight: '360px' }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/hero_bg.jpg';
              }}
            />
            <div
              className="story-overlay-box"
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                background: 'rgba(18, 24, 32, 0.92)',
                backdropFilter: 'blur(10px)',
                padding: '20px 24px',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--primary-gold)' }}>
                10+
              </h4>
              <p style={{ color: 'var(--text-silver)', fontSize: '0.85rem' }}>Years Sourcing Locally</p>
            </div>
          </div>

          <div className="story-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="section-tag">{t.about.tag}</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '16px' }}>
              {t.about.heading}
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '16px' }}>
              {t.about.storyP1}
            </p>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              {t.about.storyP2}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="section" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', color: 'var(--primary-gold)', fontWeight: 800 }}>
                {t.about.stat1}
              </div>
              <div style={{ color: 'var(--text-gray)', fontSize: '1rem', marginTop: '6px' }}>
                {t.about.stat1Lbl}
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', color: 'var(--primary-gold)', fontWeight: 800 }}>
                {t.about.stat2}
              </div>
              <div style={{ color: 'var(--text-gray)', fontSize: '1rem', marginTop: '6px' }}>
                {t.about.stat2Lbl}
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', color: 'var(--primary-gold)', fontWeight: 800 }}>
                {t.about.stat3}
              </div>
              <div style={{ color: 'var(--text-gray)', fontSize: '1rem', marginTop: '6px' }}>
                {t.about.stat3Lbl}
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', color: 'var(--primary-gold)', fontWeight: 800 }}>
                {t.about.stat4}
              </div>
              <div style={{ color: 'var(--text-gray)', fontSize: '1rem', marginTop: '6px' }}>
                {t.about.stat4Lbl}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message Section with Accordion */}
      <section className="section" style={{ padding: '70px 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              overflow: 'hidden',
            }}
          >
            <div
              onClick={() => setCeoOpen(!ceoOpen)}
              style={{
                padding: '24px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <i className="fa-solid fa-quote-left" style={{ color: 'var(--primary-gold)', fontSize: '1.4rem' }}></i>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-white)' }}>
                  {t.about.ceoTitle}
                </h3>
              </div>
              <i
                className="fa-solid fa-chevron-down"
                style={{
                  color: 'var(--primary-gold)',
                  transition: 'transform 0.3s',
                  transform: ceoOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              ></i>
            </div>

            {ceoOpen && (
              <div style={{ padding: '30px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img
                    src="/static/images/ceo.jpg"
                    alt={t.about.ceoName}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--primary-gold)',
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/ceo.jpg';
                    }}
                  />
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <blockquote
                      style={{
                        fontStyle: 'italic',
                        color: 'var(--text-silver)',
                        fontSize: '1.1rem',
                        lineHeight: '1.6',
                        marginBottom: '14px',
                      }}
                    >
                      {t.about.ceoQuote}
                    </blockquote>
                    <div style={{ fontWeight: 700, color: 'var(--primary-gold)' }}>{t.about.ceoName}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>{t.about.ceoRole}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Core Principles */}
          <div style={{ marginTop: '60px' }}>
            <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '35px' }}>
              {t.about.valuesTitle}
            </h3>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <h3 className="service-title">{t.about.v1Title}</h3>
                <p className="service-text">{t.about.v1Desc}</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <i className="fa-solid fa-comments"></i>
                </div>
                <h3 className="service-title">{t.about.v2Title}</h3>
                <p className="service-text">{t.about.v2Desc}</p>
              </div>

              <div className="service-card">
                <div className="service-icon">
                  <i className="fa-solid fa-network-wired"></i>
                </div>
                <h3 className="service-title">{t.about.v3Title}</h3>
                <p className="service-text">{t.about.v3Desc}</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 30px' }}>
              <i className="fa-solid fa-envelope"></i> Contact Us in Seoul
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
