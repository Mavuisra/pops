import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubscriptionPage from './pages/SubscriptionPage';
import Header from './components/Header';  // Correction de l'importation du Header
import Reservation from './components/reservation';
import Menu from './components/menu';
import CartPage from './pages/CartPage';  // Update this import
import CheckoutPage from './pages/CheckoutPage';  // Ajoutez cet import
import SubscriptionConfirmationPage from './pages/SubscriptionConfirmationPage'; // Ajoutez cette ligne
import CheckoutPageCommande from './pages/CheckoutPageCommande'; // Ajoutez cet import

const App = () => {
    // État pour stocker les articles dans le panier
    const [cartItems, setCartItems] = useState([]);

    // Fonction pour ajouter un article au panier
    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                // Si l'article existe déjà, augmenter sa quantité
                return prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Sinon, ajouter le nouvel article avec une quantité de 1
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // Fonction pour retirer un article du panier
    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    // Fonction pour modifier la quantité d'un article dans le panier
    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <Router>
        <div className="min-h-screen bg-gray-100">
            <Header cartItemsCount={cartItems.length} />
            <main className="container  p-2">
                <Routes>
                    <Route path="/" element={<Menu addToCart={addToCart} />} />
                    <Route path="/cart" element={
                        <CartPage 
                            cartItems={cartItems} 
                            removeFromCart={removeFromCart} 
                            updateQuantity={updateQuantity} 
                        />
                    } />
                    <Route path="/subscription" element={<SubscriptionPage />} />
                    <Route path="/checkout" element={
                        <CheckoutPage 
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                            updateQuantity={updateQuantity}
                        />
                    } />
                    <Route path="/reservation" element={<Reservation />} />
                    <Route path="/subscription-confirmation" element={<SubscriptionConfirmationPage />} />
                    <Route path="/checkout-commande" element={<CheckoutPageCommande />} />
                </Routes>
            </main>
        </div>
    </Router>
    );
};

export default App;
