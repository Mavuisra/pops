import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout-commande', { state: { cartItems } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-orange-500" />
            Your Cart
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="flex justify-between items-center mb-4 bg-orange-50 p-4 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-orange-600 font-medium">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="bg-orange-200 hover:bg-orange-300 text-orange-800 px-2 py-1 rounded-l transition duration-200"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="bg-white px-4 py-1 border-t border-b border-orange-200">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-orange-200 hover:bg-orange-300 text-orange-800 px-2 py-1 rounded-r transition duration-200"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700 transition duration-200"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </motion.div>
              ))}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-orange-600">${calculateTotal()}</span>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
