import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const CheckoutPage = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    mobileNumber: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const paymentMethods = [
    { id: 'card', name: 'Visa', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2rA-0ZxPm7g-iQzApiZvLriUmnQtmRhEwmw&s' },
    { id: 'mpesa', name: 'M-Pesa', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnA0qwtH1On_M0nkvFlJN8rtMnDXEozpA-Vg&s' },
    { id: 'airtel', name: 'Airtel Money', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJpe7L1lVtaAWSlfztWbE_VXlz_nHZGAFnwg&s' },
    { id: 'orange', name: 'Orange Money', logo: 'https://www.moussonews.com/wp-content/uploads/2023/08/1d45ffe0-fdea-4547-a3e6-1942493098ed.jpg' },
  ];

  useEffect(() => {
    if (location.state && location.state.selectedPlan) {
      setSelectedPlan(location.state.selectedPlan);
    } else {
      navigate('/subscription');
    }
  }, [location, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Processing payment for', selectedPlan?.name, 'plan');
    console.log('Payment method:', paymentMethod);
    console.log('Payment info:', paymentInfo);

    // Simulate payment processing
    setTimeout(() => {
      const tickets = calculateTickets(selectedPlan);
      navigate('/subscription-confirmation', {
        state: {
          plan: selectedPlan,
          paymentMethod,
          tickets,
        }
      });
    }, 1500);
  };

  const calculateTickets = (plan) => {
    const ticketsPerDollar = 2;
    return Math.floor(plan.price * ticketsPerDollar);
  };

  if (!selectedPlan) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Checkout</h2>
          <div className="bg-orange-100 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold text-orange-800 mb-2">
              {selectedPlan.name} Plan
            </h3>
            <p className="text-orange-600 font-medium">${selectedPlan.price}/month</p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Select Payment Method</h4>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodChange(method.id)}
                  className={`py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                    paymentMethod === method.id 
                      ? 'bg-orange-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <img src={method.logo} alt={method.name} className="h-8 w-8 object-contain mr-2" />
                  <span className="font-medium">{method.name}</span>
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {paymentMethod === 'card' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faCreditCard} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handleInputChange}
                      className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-4 mb-4">
                  <div className="flex-1">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handleInputChange}
                      className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handleInputChange}
                      className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={paymentInfo.name}
                    onChange={handleInputChange}
                    className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.div>
            )}
            {['airtel', 'mpesa', 'orange'].includes(paymentMethod) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faMobileAlt} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={paymentInfo.mobileNumber}
                      onChange={handleInputChange}
                      className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="+1234567890"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
            >
              Complete Payment
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;
