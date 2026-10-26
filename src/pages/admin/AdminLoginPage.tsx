import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, isAdminLoggedIn, t } = useApp();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already logged in, redirect to admin
  React.useEffect(() => {
    if (isAdminLoggedIn) {
      navigate('/admin');
    }
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Login yoki parol noto\'g\'ri! (Default: admin / hamsa2024)');
    }
  };

  return (
    <div className="admin-body" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="admin-login-container" style={{ width: '100%', maxWidth: '440px' }}>
        <div className="admin-login-card">
          <div className="admin-login-header">
            <Link to="/" className="admin-login-logo">
              <img
                src="/static/images/hamsa_logo.jpg"
                alt="Hamsa Holdings"
                className="admin-logo-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/hamsa_logo.jpg';
                }}
              />
            </Link>
            <h1>{t.admin.loginTitle}</h1>
            <p>{t.admin.loginSubtitle}</p>
          </div>

          {error && (
            <div className="admin-alert admin-alert-danger">
              <i className="fa-solid fa-circle-xmark"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-input-group">
              <label htmlFor="username">
                <i className="fa-solid fa-user"></i> {t.admin.username}
              </label>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
              />
            </div>

            <div className="admin-input-group">
              <label htmlFor="password">
                <i className="fa-solid fa-lock"></i> {t.admin.password}
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
              />
            </div>

            <button type="submit" className="admin-login-btn">
              <i className="fa-solid fa-right-to-bracket"></i> {t.admin.signIn}
            </button>
          </form>

          <div className="admin-login-footer">
            <Link to="/">
              <i className="fa-solid fa-arrow-left"></i> Asosiy saytga qaytish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
