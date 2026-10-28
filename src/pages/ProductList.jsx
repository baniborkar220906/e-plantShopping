import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../store/CartSlice';
import Navbar from '../components/Navbar';
import './ProductList.css';

const plantsArray = {
  Succulents: [
    { id: 1, name: 'Jade Plant', price: 12.99, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Aloe Vera', price: 9.99, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Echeveria', price: 8.99, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'Sedum', price: 7.99, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80' },
    { id: 5, name: 'Cactus Mix', price: 10.99, image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?auto=format&fit=crop&w=600&q=80' },
    { id: 6, name: 'Haworthia', price: 11.99, image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80' }
  ],
  'Flowering Plants': [
    { id: 7, name: 'Orchid', price: 19.99, image: 'https://images.unsplash.com/photo-1566920052207-5c3f4b8a5c47?auto=format&fit=crop&w=600&q=80' },
    { id: 8, name: 'Rose', price: 15.99, image: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=600&q=80' },
    { id: 9, name: 'Lavender', price: 13.99, image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=600&q=80' },
    { id: 10, name: 'Petunia', price: 12.99, image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80' },
    { id: 11, name: 'Dahlia', price: 16.99, image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80' },
    { id: 12, name: 'Tulip', price: 14.99, image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80' }
  ],
  'Foliage Plants': [
    { id: 13, name: 'Monstera', price: 24.99, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80' },
    { id: 14, name: 'Pothos', price: 11.99, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80' },
    { id: 15, name: 'Philodendron', price: 18.99, image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80' },
    { id: 16, name: 'Snake Plant', price: 14.99, image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?auto=format&fit=crop&w=600&q=80' },
    { id: 17, name: 'Spider Plant', price: 9.99, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=600&q=80' },
    { id: 18, name: 'Fern', price: 13.99, image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80' }
  ],
  'Herb Plants': [
    { id: 19, name: 'Basil', price: 6.99, image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=600&q=80' },
    { id: 20, name: 'Rosemary', price: 7.99, image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=600&q=80' },
    { id: 21, name: 'Mint', price: 5.99, image: 'https://images.unsplash.com/photo-1628556270448-4d4fc47a8b9d?auto=format&fit=crop&w=600&q=80' },
    { id: 22, name: 'Thyme', price: 6.49, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80' },
    { id: 23, name: 'Oregano', price: 6.49, image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&q=80' },
    { id: 24, name: 'Cilantro', price: 5.49, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' }
  ]
};

export default function ProductList() {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  const cartItems = useSelector((state) => state.cart.items || []);
  const cartQuantity = useSelector((state) =>
    state.cart.totalQuantity ??
    (state.cart.items || []).reduce((total, item) => total + item.quantity, 0)
  );

  const handleAddToCart = (plant) => {
    const alreadyAdded = cartItems.some((item) => item.id === plant.id);

    if (alreadyAdded || addedToCart[plant.name]) return;

    dispatch(cartActions.addItem({ ...plant, cost: plant.price }));

    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true
    }));
  };

  return (
    <>
      <Navbar />

      <main className="product-list-page">
        <div className="cart-shortcut">
          <Link to="/cart" aria-label={`Shopping cart with ${cartQuantity} items`}>
            🛒 Cart ({cartQuantity})
          </Link>
        </div>

        <h1 className="page-title">Our Plants Collection</h1>
        <p className="collection-description">
          Find the perfect plants to bring your space to life.
        </p>

        {Object.entries(plantsArray).map(([category, plants]) => (
          <section className="product-list" key={category}>
            <h2 className="category-title">{category}</h2>

            <div className="products-grid">
              {plants.map((plant) => {
                const isAdded =
                  Boolean(addedToCart[plant.name]) ||
                  cartItems.some((item) => item.id === plant.id);

                return (
                  <article className="product-card" key={plant.id}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />

                    <div className="product-info">
                      <h3 className="product-name">{plant.name}</h3>
                      <p className="product-price">
                        ${plant.price.toFixed(2)}
                      </p>

                      <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(plant)}
                        disabled={isAdded}
                      >
                        {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
