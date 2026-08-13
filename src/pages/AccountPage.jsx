import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';
import { Moon, Sun, Globe, User, LogOut } from 'lucide-react';

export default function AccountPage() {
  const { t } = useTranslation();
  const { theme, setTheme, language, changeLanguage, user, setUser } = useContext(AppContext);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail ? `${data.message} (${data.detail})` : data.message);
      }

      if (isLogin) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
      } else {
        setSuccessMsg(data.message);
        setIsLogin(true);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>{t('account')}</h2>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        {user ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <User size={40} />
            </div>
            <h3 style={{ marginBottom: '0.25rem' }}>{user.name}</h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>{user.email}</p>
            <button className="btn btn-outline" style={{ width: '100%' }} onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        ) : (
          <div>
            <h4 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              {isLogin ? 'Login' : 'Register'}
            </h4>
            
            {errorMsg && (
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(229, 62, 62, 0.1)', borderLeft: '4px solid var(--danger-color)', color: 'var(--danger-color)', marginBottom: '1rem', fontSize: '0.9rem', borderRadius: '4px' }}>
                {errorMsg}
              </div>
            )}
            
            {successMsg && (
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(56, 161, 105, 0.1)', borderLeft: '4px solid var(--success-color)', color: 'var(--success-color)', marginBottom: '1rem', fontSize: '0.9rem', borderRadius: '4px' }}>
                {successMsg}
              </div>
            )}

            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {!isLogin && (
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              )}
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleInputChange} 
                required 
              />
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
              </button>
            </form>
            
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span 
                style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); setSuccessMsg(''); }}
              >
                {isLogin ? 'Register here' : 'Login here'}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sun size={20} /> {t('theme')}
        </h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline'}`}
            style={{ flex: 1 }}
            onClick={() => setTheme('light')}
          >
            <Sun size={18} /> {t('light')}
          </button>
          <button 
            className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline'}`}
            style={{ flex: 1 }}
            onClick={() => setTheme('dark')}
          >
            <Moon size={18} /> {t('dark')}
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={20} /> {t('language')}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { code: 'th', label: 'ภาษาไทย (TH)' },
            { code: 'en', label: 'English (EN)' },
            { code: 'zh', label: '中文 (ZH)' }
          ].map(lang => (
            <button 
              key={lang.code}
              className={`btn ${language === lang.code ? 'btn-primary' : 'btn-outline'}`}
              style={{ width: '100%', justifyContent: 'flex-start', padding: '1rem' }}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
