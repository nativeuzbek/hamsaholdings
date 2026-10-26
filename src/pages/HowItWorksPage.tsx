import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const HowItWorksPage: React.FC = () => {
  const { t } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    {
      num: 1,
      icon: 'fa-solid fa-car-side',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
    },
    {
      num: 2,
      icon: 'fa-solid fa-microscope',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
    },
    {
      num: 3,
      icon: 'fa-solid fa-file-contract',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
    },
    {
      num: 4,
      icon: 'fa-solid fa-stamp',
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
    },
    {
      num: 5,
      icon: 'fa-solid fa-ship',
      title: t.howItWorks.step5Title,
      desc: t.howItWorks.step5Desc,
    },
    {
      num: 6,
      icon: 'fa-solid fa-envelope-open-text',
      title: t.howItWorks.step6Title,
      desc: t.howItWorks.step6Desc,
    },
  ];

  const faqs = [
    {
      q: 'Can I request a car that is not in your current inventory?',
      a: 'Yes, absolutely! Over 60% of our exports are custom orders. We search across major Korean domestic dealer platforms, corporate lease auctions, and certified private collections in Seoul and Gyeonggi-do.',
    },
    {
      q: 'How do you verify the condition of the car?',
      a: 'Our certified automotive inspectors visit the vehicle on-site. We carry out electronic paint depth gauge scans (to detect any repainted or repaired body panels), computerized OBD-II diagnostics for transmission and engine fault codes, full mechanical checks, and test drives.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept international bank wire transfers (Telegraphic Transfer / T/T) directly in USD or EUR to our official corporate bank account registered with the South Korean Chamber of Commerce.',
    },
    {
      q: 'How are documents sent to the buyer?',
      a: 'Immediately upon vessel departure and issuance of the original Bill of Lading (B/L) by the shipping line, we courier all original documents (B/L, Export Certificate, Commercial Invoice, Packing List) via DHL Express with express tracking number.',
    },
  ];

  return (
    <div className="how-it-works-page" style={{ paddingTop: '100px', minHeight: '85vh' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="section-title">{t.howItWorks.title}</h1>
        <p className="section-desc">{t.howItWorks.subtitle}</p>
      </div>

      {/* 6 Step Timeline Section */}
      <section className="process-section section" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div className="timeline">
            {steps.map((step) => (
              <div key={step.num} className="timeline-item">
                <div className="timeline-number">{step.num}</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">
                    <i className={step.icon} style={{ color: 'var(--primary-gold)', marginRight: '8px' }}></i>
                    {step.title}
                  </h3>
                  <p className="timeline-text">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantees Box */}
          <div
            style={{
              marginTop: '60px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              padding: '40px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                color: 'var(--primary-gold)',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              <i className="fa-solid fa-shield-halved" style={{ marginRight: '10px' }}></i>
              {t.howItWorks.guaranteesTitle}
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fa-solid fa-check" style={{ color: 'var(--primary-gold)', fontSize: '1.2rem' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500 }}>{t.howItWorks.g1}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fa-solid fa-check" style={{ color: 'var(--primary-gold)', fontSize: '1.2rem' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500 }}>{t.howItWorks.g2}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fa-solid fa-check" style={{ color: 'var(--primary-gold)', fontSize: '1.2rem' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500 }}>{t.howItWorks.g3}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fa-solid fa-check" style={{ color: 'var(--primary-gold)', fontSize: '1.2rem' }}></i>
                <span style={{ color: 'var(--text-silver)', fontWeight: 500 }}>{t.howItWorks.g4}</span>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div style={{ marginTop: '70px', maxWidth: '850px', margin: '70px auto 0' }}>
            <h3
              className="section-title"
              style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '30px' }}
            >
              Frequently Asked Questions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--border-radius-md)',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '18px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-white)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <span>{faq.q}</span>
                      <i
                        className={`fa-solid fa-chevron-down`}
                        style={{
                          color: 'var(--primary-gold)',
                          transition: 'transform 0.3s',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      ></i>
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          padding: '0 24px 20px',
                          color: 'var(--text-gray)',
                          lineHeight: '1.6',
                          fontSize: '0.95rem',
                          borderTop: '1px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/inventory" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                <i className="fa-solid fa-magnifying-glass"></i> Browse Current Inventory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
