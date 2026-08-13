import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Utensils, ShoppingBag, Sparkles, ArrowRight, Leaf } from 'lucide-react';

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderType, setOrderType, theme } = useContext(AppContext);

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'var(--bg-color)' : '#F9F8F3';
  const textColor = isDark ? 'var(--text-primary)' : '#2D4239';
  const highlightColor = '#D9705A';
  const cardBg = isDark ? 'var(--surface-bg)' : '#FFFFFF';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ 
        minHeight: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        background: bgColor,
        borderRadius: '24px',
        margin: '0 -1rem'
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Left Section: Typography */}
        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: highlightColor, fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem' }}>
            <Sparkles size={16} /> ของหวานไทย-จีน ทำด้วยใจ
          </div>
          <h1 style={{ fontSize: '4.5rem', lineHeight: '1.1', color: textColor, marginBottom: '1rem', letterSpacing: '-0.02em', fontWeight: 800 }}>
            ยินดี<br/>ต้อนรับ<span style={{ color: highlightColor }}>.</span>
          </h1>
          <p style={{ color: isDark ? 'var(--text-secondary)' : '#6B7C73', fontSize: '1.1rem', marginBottom: '3rem', fontWeight: 500 }}>
            คืนนี้ ให้เราเติมความหวานให้คุณ
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: isDark ? 'var(--text-secondary)' : '#8E9B95', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
            <div style={{ width: '40px', height: '1px', background: highlightColor }}></div>
            18:00 — 23:00 <span style={{ opacity: 0.5 }}>•</span> สุขุมวิท 49
          </div>
        </div>

        {/* Right Section: Ordering Card */}
        <div style={{ flex: '1 1 350px', maxWidth: '450px' }}>
          <div style={{ 
            background: cardBg, 
            borderRadius: '24px', 
            padding: '2.5rem', 
            boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(45, 66, 57, 0.08)',
            position: 'relative'
          }}>
            {/* Top Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', color: isDark ? '#A0AEC0' : '#8E9B95' }}>01 / 03</span>
              <span style={{ background: '#F5E6D3', color: '#B07D54', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>~ 2 min</span>
            </div>
            
            <h2 style={{ fontSize: '2rem', color: textColor, marginBottom: '0.5rem', fontWeight: 700 }}>เริ่มต้นที่นี่</h2>
            <p style={{ color: isDark ? 'var(--text-secondary)' : '#6B7C73', marginBottom: '2rem', fontWeight: 500 }}>คุณจะทานที่ไหนวันนี้?</p>

            {/* Options Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              
              {/* Dine-In Option */}
              <div 
                onClick={() => setOrderType('dine-in')}
                style={{ 
                  background: orderType === 'dine-in' ? (isDark ? '#3A4A43' : '#F5F0E6') : (isDark ? 'var(--neutral-color)' : '#FFFFFF'),
                  border: `2px solid ${orderType === 'dine-in' ? (isDark ? '#4A6055' : '#E8DFCE') : (isDark ? 'var(--glass-border)' : '#F0F0F0')}`,
                  borderRadius: '16px', 
                  padding: '1.5rem', 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EADBD3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', color: '#B07D54' }}>
                  <Utensils size={20} />
                </div>
                <h4 style={{ color: textColor, margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>ทานที่ร้าน</h4>
                <p style={{ fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#8E9B95', margin: 0 }}>นั่งพักให้สบาย</p>
              </div>

              {/* Takeaway Option */}
              <div 
                onClick={() => setOrderType('takeaway')}
                style={{ 
                  background: orderType === 'takeaway' ? '#2C6B59' : (isDark ? 'var(--neutral-color)' : '#FFFFFF'),
                  border: `2px solid ${orderType === 'takeaway' ? '#2C6B59' : (isDark ? 'var(--glass-border)' : '#F0F0F0')}`,
                  borderRadius: '16px', 
                  padding: '1.5rem', 
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  color: orderType === 'takeaway' ? '#FFFFFF' : textColor
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: orderType === 'takeaway' ? 'rgba(255,255,255,0.2)' : '#E8DFCE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', color: orderType === 'takeaway' ? '#FFFFFF' : '#8E9B95' }}>
                  <ShoppingBag size={20} />
                </div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>ซื้อกลับบ้าน</h4>
                <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0 }}>ห่อกลับอย่างดี</p>
              </div>

            </div>

            {/* Action Button */}
            <button 
              onClick={() => navigate('/menu')}
              style={{
                width: '100%',
                background: '#2C6B59',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                padding: '1.25rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#225547'}
              onMouseOut={(e) => e.currentTarget.style.background = '#2C6B59'}
            >
              เริ่มสั่งขนม <ArrowRight size={20} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: isDark ? '#A0AEC0' : '#8E9B95', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontWeight: 500 }}>
              <Leaf size={14} color="#2C6B59" /> ทุกถ้วยทำสดเมื่อคุณสั่ง
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
