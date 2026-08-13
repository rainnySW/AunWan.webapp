import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderType, setOrderType, tableNumber, setTableNumber } = useContext(AppContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel" 
      style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', marginTop: '2rem' }}
    >
      <img 
        src="https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&q=80&w=200" 
        alt="Logo" 
        style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-color)' }}
      />
      <h1 style={{ color: 'var(--primary-color)', margin: 0 }}>{t('appName')}</h1>
      
      <div style={{ width: '100%', display: 'flex', gap: '1rem' }}>
        <button 
          className={`btn ${orderType === 'dine-in' ? 'btn-primary' : 'btn-outline'}`}
          style={{ flex: 1 }}
          onClick={() => setOrderType('dine-in')}
        >
          {t('dineIn')}
        </button>
        <button 
          className={`btn ${orderType === 'takeaway' ? 'btn-primary' : 'btn-outline'}`}
          style={{ flex: 1 }}
          onClick={() => setOrderType('takeaway')}
        >
          {t('takeaway')}
        </button>
      </div>

      {orderType === 'dine-in' && (
        <div style={{ width: '100%' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('tableNumber')}</label>
          <input 
            type="text" 
            placeholder={t('enterTableNumber')} 
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </div>
      )}

      <button 
        className="btn btn-secondary" 
        style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }}
        onClick={() => {
          if (orderType === 'dine-in' && !tableNumber) {
            alert(t('enterTableNumber'));
            return;
          }
          navigate('/menu');
        }}
      >
        {t('startOrder')}
      </button>
    </motion.div>
  );
}
