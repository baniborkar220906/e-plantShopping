import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import CartItem from './pages/CartItem';
import './App.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page background-image">
      <div className="landing-container">
        <h1>Welcome to Paradise Nursery</h1>

        <p>
          Bring nature into your home with our beautiful collection of plants.
          Find the perfect green companion for your space.
        </p>

        <button
          className="get-started-btn"
          onClick={() => navigate('/products')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
