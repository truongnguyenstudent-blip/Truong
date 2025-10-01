
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const handleCheckout = () => {
    if(cartItems.length > 0) {
        alert('Cảm ơn bạn đã mua hàng! (Đây là demo)');
        clearCart();
        onClose();
    } else {
        alert('Giỏ hàng của bạn đang trống!');
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Giỏ hàng</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-8">Giỏ hàng của bạn đang trống.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded"/>
                    <div className="flex-grow">
                      <Link to={`/artwork/${item.id}`} onClick={onClose} className="font-semibold text-sm hover:text-indigo-600">{item.title}</Link>
                      <p className="text-xs text-gray-500">{formatter.format(item.price)}</p>
                       <div className="flex items-center mt-1">
                        <input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))} 
                          className="w-16 text-center border rounded-md"
                          min="1"
                        />
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex justify-between font-semibold">
              <span>Tổng cộng:</span>
              <span>{formatter.format(totalPrice)}</span>
            </div>
            <button 
              onClick={handleCheckout} 
              className="w-full bg-indigo-600 text-white py-3 rounded-md mt-4 hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
              disabled={cartItems.length === 0}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
