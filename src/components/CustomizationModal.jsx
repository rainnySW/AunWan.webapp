import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toppingsData } from '../data/menuData';
import { AppContext } from '../context/AppContext';

export default function CustomizationModal({ item, onClose }) {
  const { t, i18n } = useTranslation();
  const { addToCart } = useContext(AppContext);
  const currentLang = i18n.language;

  const [temp, setTemp] = useState(item.type[0]);
  const [sweetness, setSweetness] = useState('100%');
  const [selectedToppings, setSelectedToppings] = useState([]);

  const toggleTopping = (topping) => {
    setSelectedToppings(prev => 
      prev.some(t => t.id === topping.id)
        ? prev.filter(t => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  const calculateTotal = () => {
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    return item.price + toppingsPrice;
  };

  const handleAddToCart = () => {
    addToCart({
      menuItem: item,
      temp,
      sweetness,
      toppings: selectedToppings,
      price: calculateTotal(),
      quantity: 1
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
    }}>
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="glass-panel"
        style={{ width: '100%', maxWidth: '768px', height: '85vh', borderRadius: '24px 24px 0 0', display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>{item.name[currentLang]}</h2>
          <button className="btn-icon" onClick={onClose}><X size={24} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h4>{t('temperature')}</h4>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {item.type.includes('hot') && (
                <button 
                  className={`btn ${temp === 'hot' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setTemp('hot')}
                  style={{ flex: 1 }}
                >
                  {t('hot')}
                </button>
              )}
              {item.type.includes('cold') && (
                <button 
                  className={`btn ${temp === 'cold' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setTemp('cold')}
                  style={{ flex: 1 }}
                >
                  {t('cold')}
                </button>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4>{t('sweetness')}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
              {['100%', '75%', '25%', '0%'].map(level => (
                <button 
                  key={level}
                  className={`btn ${sweetness === level ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSweetness(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4>{t('addons')}</h4>
            <div className="addons-grid">
              {toppingsData.map(topping => {
                const isSelected = selectedToppings.some(t => t.id === topping.id);
                return (
                  <div 
                    key={topping.id} 
                    onClick={() => toggleTopping(topping)}
                    className="addon-item"
                    style={{ 
                      border: `2px solid ${isSelected ? 'var(--primary-color)' : 'var(--glass-border)'}`,
                      backgroundColor: isSelected ? 'rgba(10, 72, 173, 0.05)' : 'var(--surface-bg-solid)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="addon-checkbox" style={{ border: '2px solid var(--primary-color)' }}>
                        {isSelected && <Check size={16} color="var(--primary-color)" />}
                      </div>
                      <span>{topping.name[currentLang]}</span>
                    </div>
                    <span className="addon-item-price">+{topping.price}฿</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', backgroundColor: 'var(--surface-bg)', paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{t('total')}</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-color)' }}>{calculateTotal()} ฿</span>
          </div>
          <button className="btn btn-secondary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} onClick={handleAddToCart}>
            {t('addToCart')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
