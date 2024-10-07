import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCalendar, faCamera, faBell, faShoppingCart, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import QrScanner from 'react-qr-scanner';

const Header = ({ cartItemsCount, userSubscription }) => {
    const [activeTab, setActiveTab] = useState('menu');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showScanModal, setShowScanModal] = useState(false);
    const navigate = useNavigate();
    const [scanResult, setScanResult] = useState('');

    const openScanModal = () => {
        setShowScanModal(true);
        setActiveTab('scan');
    };

    const closeScanModal = () => {
        setShowScanModal(false);
    };

    const handleScan = (data) => {
        if (data) {
            setScanResult(data);
            processPayment(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const processPayment = (qrData) => {
        try {
            const paymentData = JSON.parse(qrData);
            if (paymentData && paymentData.amount && paymentData.orderId) {
                // Vérifier si l'utilisateur a un abonnement
                if (userSubscription) {
                    // Simuler le traitement du paiement avec l'abonnement
                    console.log('Processing payment with subscription:', paymentData);
                    alert(`Payment of ${paymentData.amount}€ for order ${paymentData.orderId} processed successfully with your subscription!`);
                } else {
                    // Rediriger vers la page de paiement standard si pas d'abonnement
                    console.log('Redirecting to standard payment page:', paymentData);
                    navigate('/checkout', { state: { paymentData } });
                }
                closeScanModal();
            } else {
                throw new Error('Invalid QR code data');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('QR code invalid. Try again please.');
        }
    };

    const handleNavigation = (path, tab) => {
        navigate(path);
        setActiveTab(tab);
    };

    return (
        <header className="bg-gradient-to-r from-orange-400 to-orange-600 text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="logo">
                    <h1 className="text-2xl font-bold text-white">ArLo Pop'S</h1>
                </div>
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-2xl" />
                </button>
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        {['Home', 'Menu', 'About Us', 'Contact', 'Subscription'].map((item) => (
                            <li key={item}>
                                <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-orange-200 transition duration-300">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    <div className="cart-icon relative flex items-center">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-2xl hover:text-orange-200 transition duration-300" />
                        {cartItemsCount > 0 && (
                            <span className="cart-count absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                {cartItemsCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <motion.nav 
                className={`md:hidden bg-orange-500 ${isMenuOpen ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
                transition={{ duration: 0.3 }}
            >
                <ul className="flex flex-col space-y-2 p-4">
                    {['Home', 'Menu', 'About Us', 'Contact'].map((item) => (
                        <li key={item}>
                            <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="block py-2 hover:bg-orange-600 rounded transition duration-300">
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.nav>
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 shadow-lg">
                <ul className="flex justify-around items-center h-16">
                    {[
                        { icon: faClipboard, label: 'Home', path: '/' },
                        { icon: faCalendar, label: 'Reservation', path: '/reservation' },
                        { icon: faCamera, label: 'Scan QR', action: openScanModal },
                        { icon: faBell, label: 'Subscribe', path: '/subscription' },
                        { icon: faShoppingCart, label: 'Cart', path: '/cart' }
                    ].map((item) => (
                        <li key={item.label}>
                            <button 
                                onClick={() => item.action ? item.action() : handleNavigation(item.path, item.label.toLowerCase())}
                                className={`flex flex-col items-center ${activeTab === item.label.toLowerCase() ? 'text-orange-500' : 'text-gray-500'}`}
                            >
                                <FontAwesomeIcon icon={item.icon} className="text-2xl" />
                                <span className="text-xs">{item.label}</span>
                                {item.label === 'Cart' && cartItemsCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            {showScanModal && (
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="bg-white p-6 rounded-lg shadow-xl"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <QrScanner
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%' }}
                        />
                        <div className="mt-6 flex justify-between">
                            <button onClick={closeScanModal} className="bg-gray-300 text-black px-6 py-2 rounded-full hover:bg-gray-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;