import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';
import { Trash2, Plus, Minus, QrCode, CreditCard, Banknote } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItemQuantity, cartTotal, clearCart } = useContext(AppContext);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert(t('paymentMethod'));
      return;
    }
    if (paymentMethod === 'promptPay' || paymentMethod === 'bankTransfer') {
      setShowQR(true);
    } else {
      completeOrder();
    }
  };

  const completeOrder = () => {
    // Generate random queue number
    const queueNo = 'Q' + Math.floor(100 + Math.random() * 900);
    // clearCart(); -> Actually, keep cart for receipt, clear on review page
    navigate('/queue', { state: { queueNo, paymentMethod, total: cartTotal } });
  };

  if (cart.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <h3 style={{ color: 'var(--text-secondary)' }}>{t('emptyCart')}</h3>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/menu')}>
          {t('menu')}
        </button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>{t('cartSummary')}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div 
              key={item.cartId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-panel"
              style={{ padding: '1rem', display: 'flex', gap: '1rem' }}
            >
              <img src={item.menuItem.image} alt={item.menuItem.name[currentLang]} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '12px' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0 }}>{item.menuItem.name[currentLang]}</h4>
                    <button className="btn-icon" style={{ padding: '4px', background: 'transparent', color: 'var(--danger-color)' }} onClick={() => removeFromCart(item.cartId)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p style={{ fontSize: '0.8rem', margin: '4px 0' }}>
                    {t(item.temp)} • {t('sweetness')}: {item.sweetness}
                    {item.toppings.length > 0 && ` • +${item.toppings.map(t => t.name[currentLang]).join(', ')}`}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{item.price * item.quantity} ฿</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-bg-solid)', borderRadius: '8px', padding: '2px' }}>
                    <button className="btn-icon" style={{ padding: '4px', background: 'transparent' }} onClick={() => updateCartItemQuantity(item.cartId, item.quantity - 1)}><Minus size={16} /></button>
                    <span style={{ fontWeight: '600', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button className="btn-icon" style={{ padding: '4px', background: 'transparent' }} onClick={() => updateCartItemQuantity(item.cartId, item.quantity + 1)}><Plus size={16} /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>{t('paymentMethod')}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'promptPay', icon: <QrCode size={20} />, label: t('promptPay') },
            { id: 'bankTransfer', icon: <CreditCard size={20} />, label: t('bankTransfer') },
            { id: 'cash', icon: <Banknote size={20} />, label: t('cash') }
          ].map(method => (
            <div 
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px',
                border: `2px solid ${paymentMethod === method.id ? 'var(--primary-color)' : 'var(--glass-border)'}`,
                backgroundColor: paymentMethod === method.id ? 'rgba(10, 72, 173, 0.05)' : 'var(--surface-bg-solid)',
                cursor: 'pointer'
              }}
            >
              {method.icon}
              <span style={{ fontWeight: 500 }}>{method.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{t('total')}</span>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>{cartTotal} ฿</span>
      </div>

      <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} onClick={handleCheckout}>
        {t('checkout')}
      </button>

      {/* Payment QR Modal */}
      <AnimatePresence>
        {showQR && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 3000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '90%', maxWidth: '350px' }}
            >
              <h3>{t('scanToPay')}</h3>
              <p>{paymentMethod === 'promptPay' ? t('promptPay') : t('bankTransfer')}</p>
              <div style={{ padding: '1rem', background: '#fff', borderRadius: '12px' }}>
                <QRCodeSVG value={`PAY-${cartTotal}-AUNWAN`} size={200} />
              </div>
              <h2 style={{ color: 'var(--primary-color)' }}>{cartTotal} ฿</h2>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => {
                setShowQR(false);
                completeOrder();
              }}>
                {t('confirmPayment')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
