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
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 2px 5px rgba(103, 2, 2, 0.2)',
        fontSize: '16px',
        zIndex: 1000,
      }}
      onClick={() => navigate('/cart')}
    >
      🛒 <strong>${totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
