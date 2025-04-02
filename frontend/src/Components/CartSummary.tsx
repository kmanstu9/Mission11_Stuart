import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '8px 16px',
        borderRadius: '999px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 2px 5px rgba(103, 2, 2, 0.2)',
        fontSize: '16px',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
        onClick={() => navigate('/cart')}
      >
        🛒 <strong>${totalAmount.toFixed(2)}</strong>
      </div>

      <button
        onClick={() => navigate('/admin')}
        style={{
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '999px',
          padding: '6px 12px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Admin
      </button>
    </div>
  );
};

export default CartSummary;
