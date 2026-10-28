import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/CartSlice';
import Navbar from '../components/Navbar';
import './CartItem.css';

export default function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items || []);

  // Calculate totals directly from the cart items.
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.cost ?? item.price ?? 0) * item.quantity,
    0
  );

  const handleIncreaseQuantity = (item) => {
    dispatch(
      cartActions.updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecreaseQuantity = (item) => {
    // The reducer removes the item when its quantity becomes zero.
    dispatch(
      cartActions.updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleRemoveItem = (item) => {
    // The reducer must support finding an item by either ID or name.
    dispatch(cartActions.removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  const handleContinueShopping = (event) => {
    event.preventDefault();
    navigate('/products');
  };

  return (
    <>
      <Navbar />

      <main className="cart-page">
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is empty!</h2>
              <p>
                Discover your favourite plants and add them to your cart.
              </p>

              <Link
                to="/products"
                className="get-started-button"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-content">
              <section className="cart-items">
                <h2 className="items-title">
                  Cart Items ({totalQuantity})
                </h2>

                {cartItems.map((item) => {
                  const unitPrice = Number(
                    item.cost ?? item.price ?? 0
                  );
                  const itemTotal = unitPrice * item.quantity;

                  return (
                    <article className="cart-item" key={item.id}>
                      <img
                        className="item-image"
                        src={item.image}
                        alt={item.name}
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />

                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>

                        <p className="item-price">
                          Unit Price: ${unitPrice.toFixed(2)}
                        </p>

                        <p className="item-total-price">
                          Item Total: ${itemTotal.toFixed(2)}
                        </p>
                      </div>

                      <div className="item-quantity">
                        <button
                          type="button"
                          className="qty-btn minus"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => handleDecreaseQuantity(item)}
                        >
                          −
                        </button>

                        <span className="qty-display">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          className="qty-btn plus"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => handleIncreaseQuantity(item)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-item-delete"
                        onClick={() => handleRemoveItem(item)}
                        title="Remove from cart"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Delete
                      </button>
                    </article>
                  );
                })}
              </section>

              <aside className="cart-summary">
                <h2 className="summary-title">Order Summary</h2>

                <div className="summary-item">
                  <span>Total Items:</span>
                  <span>{totalQuantity}</span>
                </div>

                <div className="summary-item">
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>

                <div className="summary-item">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>

                <div className="summary-total">
                  <span>Grand Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>

                <Link
                  to="/products"
                  className="get-started-button"
                  onClick={handleContinueShopping}
                >
                  ← Continue Shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
