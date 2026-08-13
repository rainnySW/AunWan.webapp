import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import QueuePage from './pages/QueuePage';
import ReviewPage from './pages/ReviewPage';

function App() {
  const location = useLocation();
  const hideNavPaths = ['/queue', '/review'];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <>
      <div className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/review" element={<ReviewPage />} />
          </Routes>
        </AnimatePresence>
      </div>
      {showNav && <NavigationBar />}
    </>
  );
}

export default App;
