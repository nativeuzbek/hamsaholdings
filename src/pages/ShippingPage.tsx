import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const ShippingPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="shipping-page" style={{ paddingTop: '100px', minHeight: '85vh' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="section-title">{t.shipping.title}</h1>
        <p className="section-desc">{t.shipping.subtitle}</p>
      </div>

      <section className="section" style={{ paddingTop: '10px' }}>
        <div className="container">
          {/* Shipping Methods Comparison */}
          <div className="services-grid" style={{ marginTop: '30px' }}>
            {/* Ro-Ro Card */}
            <div className="service-card" style={{ textAlign: 'left', padding: '36px' }}>
              <div className="service-icon" style={{ marginBottom: '20px' }}>
                <i className="fa-solid fa-ship"></i>
              </div>
              <h3 className="service-title" style={{ marginBottom: '14px', fontSize: '1.4rem' }}>
                {t.shipping.roroTitle}
              </h3>
              <p className="service-text" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                {t.shipping.roroDesc}
              </p>
              <ul style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>{t.shipping.roroItem1}</li>
                <li>{t.shipping.roroItem2}</li>
                <li>{t.shipping.roroItem3}</li>
              </ul>
            </div>

            {/* Container Card */}
            <div className="service-card" style={{ textAlign: 'left', padding: '36px' }}>
              <div className="service-icon" style={{ marginBottom: '20px' }}>
                <i className="fa-solid fa-boxes-stacked"></i>
              </div>
              <h3 className="service-title" style={{ marginBottom: '14px', fontSize: '1.4rem' }}>
                {t.shipping.containerTitle}
              </h3>
              <p className="service-text" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                {t.shipping.containerDesc}
              </p>
              <ul style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>{t.shipping.containerItem1}</li>
                <li>{t.shipping.containerItem2}</li>
                <li>{t.shipping.containerItem3}</li>
              </ul>
            </div>
          </div>

          {/* Departure Ports Grid */}
          <div style={{ marginTop: '60px' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '35px' }}>
              {t.shipping.portsTitle}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <i className="fa-solid fa-anchor" style={{ color: 'var(--primary-gold)', fontSize: '1.3rem' }}></i>
                  <h4 style={{ color: 'var(--text-white)', fontSize: '1.15rem' }}>Port of Incheon</h4>
                </div>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {t.shipping.port1}
                </p>
              </div>

              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <i className="fa-solid fa-anchor" style={{ color: 'var(--primary-gold)', fontSize: '1.3rem' }}></i>
                  <h4 style={{ color: 'var(--text-white)', fontSize: '1.15rem' }}>Port of Busan</h4>
                </div>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {t.shipping.port2}
                </p>
              </div>

              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <i className="fa-solid fa-anchor" style={{ color: 'var(--primary-gold)', fontSize: '1.3rem' }}></i>
                  <h4 style={{ color: 'var(--text-white)', fontSize: '1.15rem' }}>Port of Pyeongtaek</h4>
                </div>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {t.shipping.port3}
                </p>
              </div>
            </div>
          </div>

          {/* Destinations Table / Timeline */}
          <div
            style={{
              marginTop: '60px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '36px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                color: 'var(--primary-gold)',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              {t.shipping.destinationsTitle}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <i className="fa-solid fa-train" style={{ color: 'var(--primary-gold)', fontSize: '1.2rem', width: '25px' }}></i>
                <span style={{ color: 'var(--text-silver)', fontSize: '1rem' }}>{t.shipping.destCentralAsia}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <i className="fa-solid fa-ship" style={{ color: 'var(--primary-gold)', fontSize: '1.2rem', width: '25px' }}></i>
                <span style={{ color: 'var(--text-silver)', fontSize: '1rem' }}>{t.shipping.destMiddleEast}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <i className="fa-solid fa-earth-americas" style={{ color: 'var(--primary-gold)', fontSize: '1.2rem', width: '25px' }}></i>
                <span style={{ color: 'var(--text-silver)', fontSize: '1rem' }}>{t.shipping.destAmericas}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0' }}>
                <i className="fa-solid fa-earth-europe" style={{ color: 'var(--primary-gold)', fontSize: '1.2rem', width: '25px' }}></i>
                <span style={{ color: 'var(--text-silver)', fontSize: '1rem' }}>{t.shipping.destEurope}</span>
              </div>
            </div>
          </div>

          {/* Shipping Rates CTA */}
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <a
              href="https://wa.me/821067719498?text=Hello%20Hamsa%20Holdings!%20I%20would%20like%20to%20request%20a%20shipping%20rate%20quote%20to%20my%20destination%20port."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '14px 32px', fontSize: '1.05rem' }}
            >
              <i className="fa-brands fa-whatsapp"></i> Request Shipping Rate Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
