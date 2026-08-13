import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download, CheckCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function QueuePage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, orderType, tableNumber } = useContext(AppContext);
  
  const [countdown, setCountdown] = useState(5);
  
  const { queueNo, paymentMethod, total } = location.state || { queueNo: 'Q000', paymentMethod: 'cash', total: 0 };

  useEffect(() => {
    // Play success sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Countdown to redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/review');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      className="glass-panel"
      style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '2rem' }}
    >
      <CheckCircle size={64} color="var(--success-color)" style={{ marginBottom: '1rem' }} />
      <h2 style={{ color: 'var(--success-color)' }}>{t('queueNumber')}</h2>
      <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--primary-color)', margin: '1rem 0', letterSpacing: '4px' }}>
        {queueNo}
      </div>
      
      <div style={{ width: '100%', background: 'var(--surface-bg-solid)', padding: '1.5rem', borderRadius: '12px', border: '1px dashed var(--neutral-color)', marginBottom: '2rem', textAlign: 'left' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>{t('receipt')}</h4>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <p><strong>{t('appName')}</strong></p>
          <p>{t(orderType === 'dine-in' ? 'dineIn' : 'takeaway')} {orderType === 'dine-in' ? `- ${t('tableNumber')} ${tableNumber}` : ''}</p>
          <p>{t('paymentMethod')}: {t(paymentMethod)}</p>
          <hr style={{ margin: '1rem 0', borderColor: 'var(--glass-border)' }} />
          {cart.map(item => (
            <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{item.quantity}x {item.menuItem.name[currentLang]}</span>
              <span>{item.price * item.quantity} ฿</span>
            </div>
          ))}
          <hr style={{ margin: '1rem 0', borderColor: 'var(--glass-border)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>{t('total')}</span>
            <span style={{ color: 'var(--primary-color)' }}>{total} ฿</span>
          </div>
        </div>
      </div>

      <button className="btn btn-outline" style={{ width: '100%', marginBottom: '1rem' }} onClick={() => alert('Receipt saved to device!')}>
        <Download size={20} /> {t('saveReceipt')}
      </button>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        Redirecting to feedback in {countdown}s... <br/>
        <span style={{ color: 'var(--primary-color)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/review')}>Skip</span>
      </p>
    </motion.div>
  );
}
