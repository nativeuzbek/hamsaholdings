import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { useApp } from '../context/AppContext';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { setActiveModalCar, t } = useApp();
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
    ? `Hello Hamsa Holdings! I saw the exported ${car.brand} ${car.model} (${car.year}). Can you source and export a similar vehicle for me?`
    : `Hello Hamsa Holdings! I am interested in the ${car.brand} ${car.model} (${car.year}, FOB: ${formatPrice(car.price)}). Please provide more details and shipping quote.`;

  return (
    <div className={`car-card ${isSold ? 'is-sold' : ''}`}>
      <div className="car-image-wrapper">
        <Link to={`/car/${car.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img
            src={getCleanImageUrl(car.image)}
            alt={`${car.brand} ${car.model}`}
            className="car-img"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/static/images/hyundai_palisade.jpg';
            }}
          />
        </Link>

        <div className="badge-status-wrap">
          <span className={`badge-status ${isSold ? 'sold' : 'available'}`}>
            <i className={`fa-solid ${isSold ? 'fa-handshake' : 'fa-circle-check'}`}></i>{' '}
            {isSold ? t.inventory.sold : t.inventory.available}
          </span>
          <span className={`badge-condition ${isNew ? 'new' : ''}`}>
            {isNew ? t.inventory.new : t.inventory.used}
          </span>
        </div>

        {isSold && (
          <div className="sold-watermark-ribbon">
            <span>
              <i className="fa-solid fa-lock"></i> {t.inventory.sold}
            </span>
          </div>
        )}

        <span className="badge-fuel">{car.fuel}</span>
      </div>

      <div className="car-info">
        <span className="car-brand">{car.brand}</span>
        <h3 className="car-name" title={`${car.brand} ${car.model}`}>
          <Link to={`/car/${car.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {car.model}
          </Link>
        </h3>

        <div className="car-specs">
          <div className="spec-item">
            <i className="fa-solid fa-calendar"></i>
            <span className="spec-value">{car.year}</span>
          </div>
          <div className="spec-item">
            <i className="fa-solid fa-gauge-high"></i>
            <span className="spec-value">{formatMileage(car.mileage)}</span>
          </div>
          <div className="spec-item">
            <i className="fa-solid fa-gear"></i>
            <span className="spec-value">{car.transmission}</span>
          </div>
        </div>

        <div className="car-footer">
          <div className="price-box">
            <span className="price-label">
              {isSold ? t.inventory.soldPrice : t.inventory.fobPrice}
            </span>
            <span className="price-amount">{formatPrice(car.price)}</span>
          </div>

          <div className="card-actions">
            <button
              type="button"
              className="btn-icon-only details-trigger"
              onClick={() => setActiveModalCar(car)}
              title={t.inventory.viewSpecs}
            >
              <i className="fa-solid fa-circle-info"></i>
            </button>

            <a
              href={`https://wa.me/821067719498?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${isSold ? 'btn-order-similar' : 'btn-primary'}`}
              title={isSold ? t.inventory.orderSimilar : t.inventory.inquire}
            >
              <i className="fa-brands fa-whatsapp"></i>{' '}
              {isSold ? t.inventory.orderSimilar : t.inventory.inquire}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
