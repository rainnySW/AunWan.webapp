import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Coffee, ShoppingCart, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';

export default function NavigationBar() {
  const { t } = useTranslation();
  const { cartItemCount } = useContext(AppContext);

  const navItems = [
    { to: "/", icon: <Home size={24} />, label: t('home') },
    { to: "/menu", icon: <Coffee size={24} />, label: t('menu') },
    { to: "/cart", icon: <ShoppingCart size={24} />, label: t('cart'), badge: cartItemCount },
    { to: "/account", icon: <User size={24} />, label: t('account') },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item, idx) => (
        <NavLink 
          key={idx} 
          to={item.to}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          {item.icon}
          {item.badge > 0 && (
            <span className="cart-badge">{item.badge}</span>
          )}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
