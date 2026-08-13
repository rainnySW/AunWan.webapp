import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { menuData } from '../data/menuData';
import CustomizationModal from '../components/CustomizationModal';
import { Star, Flame, Snowflake } from 'lucide-react';

export default function MenuPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [selectedItem, setSelectedItem] = useState(null);
  
  const categories = ['category_signature', 'category_drinks', 'category_dessert'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fade-in"
    >
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>{t('menu')}</h2>
      
      {categories.map(categoryKey => {
        const catItems = menuData.filter(item => `category_${item.category}` === categoryKey);
        if (catItems.length === 0) return null;
        return (
          <div key={categoryKey} style={{ marginBottom: '2rem' }}>
            <h3 style={{ borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              {t(categoryKey)}
            </h3>
            <div className="menu-grid">
              {catItems.map(item => (
                <motion.div 
                  key={item.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-panel menu-card"
                  style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex' }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="menu-card-img-wrapper" style={{ position: 'relative' }}>
                    <img src={item.image} alt={item.name[currentLang]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.9)', borderRadius: '12px', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', color: '#333' }}>
                      <Star size={12} color="#F2C94C" fill="#F2C94C" /> {item.rating}
                    </div>
                  </div>
                  <div className="menu-card-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', minHeight: '2.5em' }}>{item.name[currentLang]}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{item.price} ฿</span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {item.type.includes('hot') && <Flame size={16} color="#E53E3E" />}
                        {item.type.includes('cold') && <Snowflake size={16} color="#3182CE" />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}

      <AnimatePresence>
        {selectedItem && (
          <CustomizationModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
