import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cars, t } = useApp();

  const car = cars.find((c) => c.id === Number(id));

  if (!car) {
    return (
      <div style={{ paddingTop: '140px', minHeight: '80vh', textAlign: 'center' }}>
        <div className="container">
          <i
            className="fa-solid fa-triangle-exclamation"
            style={{ fontSize: '3rem', color: 'var(--primary-gold)', marginBottom: '20px' }}
          ></i>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-white)', marginBottom: '16px' }}>
            Vehicle Not Found
          </h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>
            The requested vehicle reference could not be found or has been removed.
          </p>
          <Link to="/inventory" className="btn btn-primary">
            <i className="fa-solid fa-arrow-left"></i> Return to Inventory
          </Link>
        </div>
      </div>
    );
  }

  const isSold = car.status === 'Sold';
  const isNew = car.condition === 'New';
  const formatPrice = (price: number) => '$' + price.toLocaleString('en-US');
  const formatMileage = (mileage: number) => {
    if (mileage === 0) return t.inventory.new;
    return mileage.toLocaleString('en-US') + ' km';
  };

  const getCleanImageUrl = (img: string) => {
    if (!img) return '/static/images/hyundai_palisade.jpg';
    if (img.startsWith('http')) return img;
    if (img.startsWith('/static/')) return img;
    if (img.startsWith('static/')) return '/' + img;
    if (img.startsWith('images/')) return '/static/' + img;
    return img.startsWith('/') ? img : '/' + img;
  };

  const whatsappMessage = isSold
    ? `Hello Hamsa Holdings! I saw the exported ${car.brand} ${car.model} (${car.year}, Ref #${car.id}). Can you source and export a similar vehicle for me?`
    : `Hello Hamsa Holdings! I am interested in purchasing ${car.brand} ${car.model} (${car.year}, Ref #${car.id}, FOB: ${formatPrice(car.price)}). Please provide more details and shipping options.`;

  return (
    <section className="car-detail-section" style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '85vh' }}>
      <div className="container">
        {/* Header Breadcrumbs & Title */}
        <div className="detail-header" style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{ marginBottom: '15px' }}>
            <Link
              to="/inventory"
              style={{
                color: 'var(--primary-gold)',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Inventory
            </Link>
          </div>
          <h1 className="detail-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--text-white)', marginBottom: '8px' }}>
            {car.year} {car.brand} {car.model}
          </h1>
          <div className="detail-price" style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--primary-gold)', fontWeight: 700, marginBottom: '16px' }}>
            {formatPrice(car.price)}{' '}
            <span style={{ fontSize: '1rem', color: 'var(--text-gray)', fontWeight: 'normal' }}>
              (FOB Korea)
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span
              className="feature-tag"
              style={{
                background: isSold ? 'rgba(220, 38, 38, 0.9)' : 'rgba(16, 185, 129, 0.9)',
                color: '#ffffff',
                border: isSold ? '1px solid rgba(248, 113, 113, 0.6)' : '1px solid rgba(52, 211, 153, 0.6)',
                fontWeight: 700,
                padding: '6px 14px',
                borderRadius: '30px',
              }}
            >
              <i className={`fa-solid ${isSold ? 'fa-lock' : 'fa-circle-check'}`} style={{ marginRight: '6px' }}></i>
              {isSold ? 'SOLD' : 'AVAILABLE'}
            </span>

            <span
              className="feature-tag"
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-white)',
                padding: '6px 14px',
                borderRadius: '30px',
              }}
            >
              <i className="fa-solid fa-certificate" style={{ color: 'var(--primary-gold)', marginRight: '6px' }}></i>
              Condition: {isNew ? 'New' : 'Used'}
            </span>
          </div>
        </div>

        {/* Detail Card Grid */}
        <div
          className="detail-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '40px',
            alignItems: 'start',
            maxWidth: '1100px',
            margin: '0 auto',
            background: 'var(--bg-card)',
            padding: '36px',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Vehicle Photo */}
          <div className="detail-image" style={{ width: '100%', overflow: 'hidden', borderRadius: 'var(--border-radius-md)' }}>
            <img
              src={getCleanImageUrl(car.image)}
              alt={`${car.brand} ${car.model}`}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--border-radius-md)', objectFit: 'cover' }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/static/images/hyundai_palisade.jpg';
              }}
            />
          </div>

          {/* Vehicle Info & Specs */}
          <div className="detail-info" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p className="detail-desc" style={{ color: 'var(--text-gray)', lineHeight: '1.6', fontSize: '1.05rem' }}>
              {car.description}
            </p>

            <div className="specs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="spec-item" style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-calendar" style={{ color: 'var(--primary-gold)', width: '20px', textAlign: 'center' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500, fontSize: '0.95rem' }}>Year: {car.year}</span>
              </div>
              <div className="spec-item" style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-gauge-high" style={{ color: 'var(--primary-gold)', width: '20px', textAlign: 'center' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500, fontSize: '0.95rem' }}>{formatMileage(car.mileage)}</span>
              </div>
              <div className="spec-item" style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-gas-pump" style={{ color: 'var(--primary-gold)', width: '20px', textAlign: 'center' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500, fontSize: '0.95rem' }}>{car.fuel}</span>
              </div>
              <div className="spec-item" style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-gear" style={{ color: 'var(--primary-gold)', width: '20px', textAlign: 'center' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500, fontSize: '0.95rem' }}>{car.transmission}</span>
              </div>
              <div className="spec-item" style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-microchip" style={{ color: 'var(--primary-gold)', width: '20px', textAlign: 'center' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500, fontSize: '0.95rem' }}>{car.engine || 'Standard'}</span>
              </div>
              <div className="spec-item" style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-compass" style={{ color: 'var(--primary-gold)', width: '20px', textAlign: 'center' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500, fontSize: '0.95rem' }}>{car.driveType}</span>
              </div>
              <div className="spec-item" style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-palette" style={{ color: 'var(--primary-gold)', width: '20px', textAlign: 'center' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500, fontSize: '0.95rem' }}>Color: {car.color}</span>
              </div>
              <div className="spec-item" style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-car-side" style={{ color: 'var(--primary-gold)', width: '20px', textAlign: 'center' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500, fontSize: '0.95rem' }}>Body: {car.bodyType}</span>
              </div>
            </div>

            {car.features && car.features.length > 0 && (
              <div>
                <h4 style={{ color: 'var(--text-white)', fontSize: '1rem', marginBottom: '10px', marginTop: '10px' }}>
                  Installed Features & Options:
                </h4>
                <div className="features-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {car.features.map((f, i) => (
                    <span
                      key={i}
                      className="feature-tag"
                      style={{
                        background: 'rgba(229,184,66,0.1)',
                        color: 'var(--primary-gold)',
                        padding: '6px 14px',
                        borderRadius: '30px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-actions" style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/821067719498?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${isSold ? 'btn-order-similar' : 'btn-primary'} btn-large`}
                style={{ flex: 1, padding: '14px 24px', fontSize: '1.05rem', textAlign: 'center', justifyContent: 'center' }}
              >
                <i className="fa-brands fa-whatsapp"></i> {isSold ? 'Order Similar Vehicle via WhatsApp' : 'Inquire on WhatsApp'}
              </a>

              <Link
                to="/contact"
                className="btn btn-secondary btn-large"
                style={{ padding: '14px 24px', fontSize: '1.05rem' }}
              >
                <i className="fa-solid fa-envelope"></i> Send Formal Inquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
