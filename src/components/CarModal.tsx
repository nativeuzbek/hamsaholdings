import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const CarModal: React.FC = () => {
  const { activeModalCar, setActiveModalCar, t } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalCar) {
        setActiveModalCar(null);
      }
    };
    if (activeModalCar) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalCar, setActiveModalCar]);

  if (!activeModalCar) return null;

  const car = activeModalCar;
  const isSold = car.status === 'Sold';
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
    : `Hello Hamsa Holdings! I would like to query export details for: ${car.brand} ${car.model} (${car.year}, Ref #${car.id}). Details: FOB ${formatPrice(car.price)}, Mileage ${formatMileage(car.mileage)}.`;

  return (
    <div className="car-modal active" id="carModal" aria-hidden="false">
      <div className="modal-backdrop" onClick={() => setActiveModalCar(null)}></div>
      <div className="modal-container">
        <button
          type="button"
          className="modal-close"
          id="modalCloseBtn"
          onClick={() => setActiveModalCar(null)}
          aria-label="Close vehicle specifications modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-content" id="modalContent">
          <div className="modal-img-container">
            <img
              src={getCleanImageUrl(car.image)}
              alt={`${car.brand} ${car.model}`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/static/images/hyundai_palisade.jpg';
              }}
            />
          </div>

          <div className="modal-details">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="modal-brand">{car.brand}</span>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  background: isSold ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: isSold ? '#ef4444' : '#10b981',
                  border: `1px solid ${isSold ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                }}
              >
                {isSold ? t.inventory.sold : t.inventory.available}
              </span>
            </div>

            <h2 className="modal-name">{car.model}</h2>

            <div className="modal-price-area">
              <span className="price-label">
                {isSold ? t.inventory.soldPrice : t.inventory.exportFobPrice}
              </span>
              <div className="modal-price-val">{formatPrice(car.price)}</div>
            </div>

            <div className="specs-list-grid">
              <div className="spec-list-item">
                <i className="fa-solid fa-calendar"></i>
                <span>
                  {t.inventory.modalYear}: <strong>{car.year}</strong>
                </span>
              </div>
              <div className="spec-list-item">
                <i className="fa-solid fa-gauge-high"></i>
                <span>
                  {t.inventory.modalMileage}: <strong>{formatMileage(car.mileage)}</strong>
                </span>
              </div>
              <div className="spec-list-item">
                <i className="fa-solid fa-gas-pump"></i>
                <span>
                  {t.inventory.modalFuel}: <strong>{car.fuel}</strong>
                </span>
              </div>
              <div className="spec-list-item">
                <i className="fa-solid fa-gear"></i>
                <span>
                  {t.inventory.modalTransmission}: <strong>{car.transmission}</strong>
                </span>
              </div>
              <div className="spec-list-item">
                <i className="fa-solid fa-microchip"></i>
                <span>
                  {t.inventory.modalEngine}: <strong>{car.engine || 'Standard'}</strong>
                </span>
              </div>
              <div className="spec-list-item">
                <i className="fa-solid fa-compass"></i>
                <span>
                  {t.inventory.modalDrive}: <strong>{car.driveType}</strong>
                </span>
              </div>
              <div className="spec-list-item">
                <i className="fa-solid fa-palette"></i>
                <span>
                  {t.inventory.modalColor}: <strong>{car.color}</strong>
                </span>
              </div>
              <div className="spec-list-item">
                <i className="fa-solid fa-circle-check"></i>
                <span>
                  {t.inventory.modalStatus}: <strong>{car.condition} stock</strong>
                </span>
              </div>
            </div>

            {car.features && car.features.length > 0 && (
              <div className="features-tags-wrap">
                <h4 className="features-tags-title">{t.inventory.keyPackageOptions}</h4>
                <div className="features-tags">
                  {car.features.map((f, i) => (
                    <span key={i} className="feature-pill">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="modal-desc">{car.description}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <Link
                to={`/car/${car.id}`}
                onClick={() => setActiveModalCar(null)}
                className="btn btn-secondary"
                style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
              >
                <i className="fa-solid fa-up-right-from-square"></i> Full Page Details
              </Link>

              <a
                href={`https://wa.me/821067719498?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ flex: 2, textAlign: 'center', justifyContent: 'center' }}
              >
                <i className="fa-brands fa-whatsapp"></i> {t.inventory.startWhatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
