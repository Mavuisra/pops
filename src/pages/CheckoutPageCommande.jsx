import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCreditCard, faQrcode, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const CheckoutPageCommande = ({ userSubscription }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const [totalAmount, setTotalAmount] = useState(0);
  const [qrCodeData, setQrCodeData] = useState('');

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);

    const qrData = JSON.stringify({
      amount: total,
      orderId: Date.now(),
    });
    setQrCodeData(qrData);
  }, [cartItems]);

  const handlePayment = () => {
    if (userSubscription) {
      console.log("Paiement traité avec l'abonnement");
      // Ajoutez ici la logique pour traiter le paiement avec l'abonnement
    } else {
      console.log("Redirection vers la page de paiement standard");
      // Ajoutez ici la logique pour rediriger vers une page de paiement standard
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
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-orange-500" />
            Finaliser votre commande
          </h2>

          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold text-orange-800 mb-4">Récapitulatif de la commande</h3>
            {cartItems.map((item, index) => (
              <motion.div 
                key={index}
                className="flex justify-between items-center mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span>{item.name} - Quantité: {item.quantity}</span>
                <span className="font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
              </motion.div>
            ))}
            <div className="mt-4 pt-4 border-t border-orange-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-orange-600">{totalAmount.toFixed(2)}€</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {userSubscription ? "Payer avec votre abonnement" : "Payer votre commande"}
            </h3>
            <div className="flex flex-col items-center">
              <p className="mb-4 text-gray-600">Scannez ce QR code pour payer :</p>
              <QRCodeSVG value={qrCodeData} size={200} />
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  {userSubscription 
                    ? "Veuillez vous rendre à la caisse pour faire scanner votre QR code et confirmer votre paiement avec votre abonnement." 
                    : "Veuillez vous rendre à la caisse pour effectuer votre paiement."}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
          >
            <FontAwesomeIcon icon={userSubscription ? faCreditCard : faQrcode} className="mr-2" />
            {userSubscription ? "Confirmer et passer à la caisse" : "Passer à la caisse"}
          </button>

          {!userSubscription && (
            <p className="mt-4 text-sm text-gray-600 text-center">
              Vous n'avez pas d'abonnement. Le paiement standard sera appliqué à la caisse.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPageCommande;
