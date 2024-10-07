import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const navigate = useNavigate();

    const subscriptionPlans = [
        { id: 1, name: 'Basic', price: 9.99, features: ['10% off on all orders', 'Free delivery on orders over $30'] },
        { id: 2, name: 'Premium', price: 19.99, features: ['20% off on all orders', 'Free delivery on all orders', 'Exclusive menu items'] },
        { id: 3, name: 'VIP', price: 29.99, features: ['30% off on all orders', 'Free delivery on all orders', 'Exclusive menu items', 'Priority customer support'] },
    ];

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const handleProceedToCheckout = () => {
        if (selectedPlan) {
            navigate('/checkout', { state: { selectedPlan } });
        }
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
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Our Subscription Plans</h2>
                    <p className="text-center text-gray-600 mb-8">
                        Choose a subscription plan that suits your needs and enjoy exclusive benefits.
                    </p>

                    <div className="space-y-4">
                        {subscriptionPlans.map((plan) => (
                            <motion.div 
                                key={plan.id} 
                                className={`bg-orange-50 rounded-lg p-6 ${selectedPlan === plan ? 'border-2 border-orange-500' : ''}`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                                    <p className="text-2xl font-bold text-orange-600">${plan.price}<span className="text-sm text-gray-500">/month</span></p>
                                </div>
                                <ul className="mb-6 space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    className={`w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white ${selectedPlan === plan ? 'bg-orange-600' : 'bg-orange-500'} hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200`}
                                    onClick={() => handleSelectPlan(plan)}
                                >
                                    {selectedPlan === plan ? 'Selected' : 'Select Plan'}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {selectedPlan && (
                        <motion.div 
                            className="mt-8 p-6 bg-orange-100 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-2xl font-bold mb-4 text-orange-800">Checkout</h3>
                            <p className="mb-4 text-orange-700">You have selected the <strong>{selectedPlan.name}</strong> plan for ${selectedPlan.price}/month.</p>
                            <button 
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
                                onClick={handleProceedToCheckout}
                            >
                                Proceed to Payment
                            </button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Subscription;
