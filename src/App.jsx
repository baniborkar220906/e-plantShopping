import { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import CartItem from './pages/CartItem';
import './App.css';

function AppContent() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      <Navbar />

      {!showProductList ? (
        <div className="landing-page background-image">
          <div className="landing-container">
            <h1>Welcome to Paradise Nursery</h1>

            <p>
              Discover beautiful plants for your home and create your own
              green paradise.
            </p>

            <button
              type="button"
              className="get-started-btn"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartItem />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}
