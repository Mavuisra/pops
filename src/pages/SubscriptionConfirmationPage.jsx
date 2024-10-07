import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTicketAlt, faCreditCard, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const SubscriptionConfirmationPage = () => {
  const location = useLocation();
  const { plan, paymentMethod, tickets } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-green-500 mb-4" />
            </motion.div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Subscription Confirmed</h2>
            <p className="text-xl text-gray-600 mb-6">Thank you for subscribing!</p>
          </div>
          
          <div className="bg-orange-100 rounded-lg p-4 mb-6">
            {plan && (
              <>
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-orange-500 mr-2" />
                  <p><span className="font-semibold">Plan:</span> {plan.name}</p>
                </div>
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faCreditCard} className="text-orange-500 mr-2" />
                  <p><span className="font-semibold">Price:</span> ${plan.price}/month</p>
                </div>
              </>
            )}
            {paymentMethod && (
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faCreditCard} className="text-orange-500 mr-2" />
                <p><span className="font-semibold">Payment Method:</span> {paymentMethod}</p>
              </div>
            )}
            {tickets && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faTicketAlt} className="text-orange-500 mr-2" />
                <p><span className="font-semibold">Tickets Received:</span> {tickets}</p>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-6 text-center">
            You can now use these tickets to place orders. Enjoy your subscription!
          </p>
          
          <Link 
            to="/"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
          >
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionConfirmationPage;
