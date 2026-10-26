import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { t } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requestedCar: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const textMsg = `Hello Hamsa Holdings!
My name is ${formData.name}. I am looking to import a vehicle from Korea.
Details:
- Phone/WhatsApp: ${formData.phone}
- Email: ${formData.email || 'Not provided'}
- Requested Car: ${formData.requestedCar || 'General inquiry'}
- Extra Info: ${formData.message || 'No extra message'}`;

    const whatsappURL = `https://wa.me/821067719498?text=${encodeURIComponent(textMsg)}`;
    window.open(whatsappURL, '_blank');

    setSubmitted(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      requestedCar: '',
      message: '',
    });
  };

  return (
    <div className="contact-page" style={{ paddingTop: '100px', minHeight: '85vh' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="section-title">{t.contact.title}</h1>
        <p className="section-desc">{t.contact.subtitle}</p>
      </div>

      <section id="contact" className="contact-section section" style={{ paddingTop: '10px' }}>
        <div className="container contact-container">
          {/* Left: Contact Info Panel */}
          <div className="contact-info-panel">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '14px' }}>
              {t.contact.formTitle}
            </h2>
            <p className="contact-intro" style={{ color: 'var(--text-gray)', marginBottom: '30px', lineHeight: '1.6' }}>
              {t.contact.formSubtitle}
            </p>

            <div className="contact-details" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="contact-detail-item" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  className="icon-circle"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-gold)',
                    flexShrink: 0,
                  }}
                >
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-white)', fontSize: '1.1rem', marginBottom: '4px' }}>
                    {t.contact.officeTitle}
                  </h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {t.contact.officeAddress}
                  </p>
                </div>
              </div>

              <div className="contact-detail-item" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  className="icon-circle"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-gold)',
                    flexShrink: 0,
                  }}
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-white)', fontSize: '1.1rem', marginBottom: '4px' }}>
                    {t.contact.phoneTitle}
                  </h4>
                  <a
                    href="https://wa.me/821067719498"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary-gold)', fontSize: '1.05rem', fontWeight: 600 }}
                  >
                    +82 10-6771-9498
                  </a>
                </div>
              </div>

              <div className="contact-detail-item" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  className="icon-circle"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-gold)',
                    flexShrink: 0,
                  }}
                >
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-white)', fontSize: '1.1rem', marginBottom: '4px' }}>
                    {t.contact.emailTitle}
                  </h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>info@hamsaholdings.com</p>
                </div>
              </div>

              <div className="contact-detail-item" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  className="icon-circle"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-gold)',
                    flexShrink: 0,
                  }}
                >
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <h4 style={{ color: 'var(--text-white)', fontSize: '1.1rem', marginBottom: '4px' }}>
                    {t.contact.hoursTitle}
                  </h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>{t.contact.hoursDesc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            className="contact-form-panel"
            style={{
              background: 'var(--bg-card)',
              padding: '36px',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid var(--border-color)',
            }}
          >
            {submitted && (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#10b981',
                  padding: '14px 18px',
                  borderRadius: 'var(--border-radius-sm)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <i className="fa-solid fa-circle-check"></i>
                <span>Thank you! WhatsApp message prepared and dispatched.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" id="contactForm">
              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-silver)', fontSize: '0.9rem' }}>
                  {t.contact.name} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jamshid or Alexander"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    color: 'var(--text-white)',
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-silver)', fontSize: '0.9rem' }}>
                  {t.contact.phone} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67 or +7 999 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    color: 'var(--text-white)',
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-silver)', fontSize: '0.9rem' }}>
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    color: 'var(--text-white)',
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-silver)', fontSize: '0.9rem' }}>
                  {t.contact.requestedCar}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Genesis G80 (2023) or Kia Carnival"
                  value={formData.requestedCar}
                  onChange={(e) => setFormData({ ...formData, requestedCar: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    color: 'var(--text-white)',
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-silver)', fontSize: '0.9rem' }}>
                  {t.contact.message}
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your target budget, preferred color, trim, destination port, etc."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    color: 'var(--text-white)',
                    resize: 'vertical',
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1.05rem', justifyContent: 'center' }}
              >
                <i className="fa-brands fa-whatsapp"></i> {t.contact.submitBtn}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
