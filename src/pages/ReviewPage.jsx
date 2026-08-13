import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';

export default function ReviewPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { clearCart, setOrderType, setTableNumber } = useContext(AppContext);
  
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  
  const currentLang = i18n.language;
  const tags = [
    { id: 1, text: { th: 'อร่อยมาก', en: 'Delicious', zh: '好吃' } },
    { id: 2, text: { th: 'บริการดี', en: 'Good Service', zh: '服务好' } },
    { id: 3, text: { th: 'สะอาด', en: 'Clean', zh: '干净' } },
    { id: 4, text: { th: 'รวดเร็ว', en: 'Fast', zh: '速度快' } }
  ];

  const getEmoji = () => {
    if (rating === 5) return '🤩';
    if (rating === 4) return '😊';
    if (rating === 3) return '😐';
    if (rating === 2) return '😕';
    if (rating === 1) return '😞';
    return '🤔';
  };

  const handleFinish = () => {
    clearCart();
    setOrderType('dine-in');
    setTableNumber('');
    navigate('/');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '1rem' }}>
      <h2 style={{ color: 'var(--primary-color)' }}>{t('rateUs')}</h2>
      
      <div style={{ fontSize: '4rem', margin: '1rem 0', animation: 'popIn 0.3s ease-out' }}>
        {getEmoji()}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={40} 
            fill={rating >= star ? '#F2C94C' : 'transparent'} 
            color={rating >= star ? '#F2C94C' : 'var(--neutral-color)'}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      {rating > 0 && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ width: '100%', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {tags.map(tag => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <span 
                  key={tag.id}
                  onClick={() => setSelectedTags(prev => isSelected ? prev.filter(t => t !== tag.id) : [...prev, tag.id])}
                  style={{
                    padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', cursor: 'pointer',
                    background: isSelected ? 'var(--primary-color)' : 'var(--surface-bg-solid)',
                    color: isSelected ? '#fff' : 'var(--text-primary)',
                    border: `1px solid ${isSelected ? 'var(--primary-color)' : 'var(--neutral-color)'}`
                  }}
                >
                  {tag.text[currentLang]}
                </span>
              )
            })}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {rating === 5 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            style={{ padding: '1.5rem', background: 'var(--surface-bg-solid)', borderRadius: '12px', border: '1px dashed var(--primary-color)', marginBottom: '2rem' }}
          >
            <h4 style={{ marginBottom: '1rem' }}>Review us on Google Maps!</h4>
            <div style={{ background: '#fff', padding: '1rem', display: 'inline-block', borderRadius: '8px' }}>
              <QRCodeSVG value="https://maps.google.com" size={120} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} onClick={handleFinish}>
        {t('submitReview')}
      </button>
    </motion.div>
  );
}
