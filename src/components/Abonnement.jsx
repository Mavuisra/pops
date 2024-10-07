import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const subscriptionPlans = [
        { id: 1, name: 'Basic', price: 9.99, features: ['10% off on all orders', 'Free delivery on orders over $30'] },
        { id: 2, name: 'Premium', price: 19.99, features: ['20% off on all orders', 'Free delivery on all orders', 'Exclusive menu items'] },
        { id: 3, name: 'VIP', price: 29.99, features: ['30% off on all orders', 'Free delivery on all orders', 'Exclusive menu items', 'Priority customer support'] },
    ];

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
    };

    return (
        <div className="mt-4 sm:mt-6 lg:mt-8 container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6">Our Subscription Plans</h2>
            <p className="text-center text-gray-600 mb-8">
                Choose a subscription plan that suits your needs and enjoy exclusive benefits.
            </p>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
            >
                {subscriptionPlans.map((plan) => (
                    <motion.div 
                        key={plan.id} 
                        className={`bg-white rounded-lg shadow-md overflow-hidden ${selectedPlan === plan ? 'border-2 border-orange-500' : ''}`}
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: {
                                y: 0,
                                opacity: 1
                            }
                        }}
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                            <p className="text-3xl font-bold text-orange-500 mb-4">${plan.price}<span className="text-sm text-gray-500">/month</span></p>
                            <ul className="mb-6">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button 
                                className={`w-full py-2 px-4 rounded-full ${selectedPlan === plan ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white'} hover:bg-orange-600 transition duration-300`}
                                onClick={() => handleSelectPlan(plan)}
                            >
                                {selectedPlan === plan ? 'Selected' : 'Select Plan'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {selectedPlan && (
                <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4">Checkout</h3>
                    <p className="mb-4">You have selected the <strong>{selectedPlan.name}</strong> plan for ${selectedPlan.price}/month.</p>
                    {/* Add your payment form or integration here */}
                    <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition duration-300">
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default Subscription;
