import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

const Menu = ({ addToCart }) => {
    const [activeCategory, setActiveCategory] = useState('Tout');
    const [searchTerm, setSearchTerm] = useState('');
    const [zoomedImage, setZoomedImage] = useState(null);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const carouselRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        // Auto-scroll effect
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const scrollWidth = carouselRef.current.scrollWidth;
                const clientWidth = carouselRef.current.clientWidth;
                const maxScroll = scrollWidth - clientWidth;
                
                if (carouselRef.current.scrollLeft < maxScroll) {
                    carouselRef.current.scrollLeft += 1;
                } else {
                    carouselRef.current.scrollLeft = 0;
                }
            }
        }, 50);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(interval);
        };
    }, []);

    const categories = ['Tout', 'Entrées', 'Plats principaux', 'Desserts', 'Boissons'];

    const menuItems = [
        { id: 1, name: 'Burger Classique', category: 'Plats principaux', price: 10.99, image: 'https://www.travelingeast.com/wp-content/uploads/2013/05/e3458f19e7da1f95ee4028239a98ed68-1024x867.jpg' },
        { id: 2, name: 'Salade César', category: 'Entrées', price: 7.99, image: 'https://th.bing.com/th/id/OIP.IZY7jU1SkC980Bsst6F5XQHaFi?rs=1&pid=ImgDetMain' },
        { id: 3, name: 'Gâteau au Chocolat', category: 'Desserts', price: 6.99, image: 'https://congotalks243.com/wp-content/uploads/2022/05/images-2022-04-10T110346.263.jpeg' },
        { id: 4, name: 'Thé Glacé', category: 'Boissons', price: 2.99, image: 'https://www.chefspencil.com/wp-content/uploads/Mbika.jpg' },
        { id: 5, name: 'Maboke', category: 'Plats principaux', price: 12.99, image: 'https://assets.afcdn.com/recipe/20170215/27028_w1024h1024c1cx2531cy1719.jpg' },
        { id: 6, name: 'Makoso', category: 'Plats principaux', price: 11.99, image: 'https://www.shutterstock.com/image-photo/closeup-chicken-shawarma-wrap-lettuce-600nw-2493898897.jpg' },
        { id: 7, name: 'Madesu', category: 'Plats principaux', price: 9.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmu2-3fMCjAnE34q7EGeRltEXiBvqjEeDmqA&s' },
        { id: 8, name: 'Mbala', category: 'Entrées', price: 5.99, image: 'https://www.la-viande.fr/sites/default/files/inline-images/sandwich-roti-boeuf.jpg' },
        { id: 9, name: 'Makemba', category: 'Desserts', price: 4.99, image: 'https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/7c18a8e5-3800-4351-880e-029ba289e7dc.jpg' },
        { id: 10, name: 'Mabwiru', category: 'Boissons', price: 3.99, image: 'https://chefrecettes.s3.eu-west-3.amazonaws.com/recettes/6061c5b5cb6d87e6f45c0584ec728de6706f7bd22cca5.jpg' },
    ];

    const filteredItems = menuItems.filter(item => 
        (activeCategory === 'Tout' || item.category === activeCategory) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImageClick = (image) => {
        setZoomedImage(image);
    };

    const nextStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    const prevStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Notre Menu Délicieux</h2>
                    
                    <div className="relative mb-8 h-48 sm:h-64 md:h-80 overflow-hidden rounded-lg">
                        <div 
                            ref={carouselRef}
                            className="absolute inset-0 flex items-center overflow-x-auto scrollbar-hide"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {categories.map((category, index) => (
                                <div 
                                    key={category}
                                    className="flex-shrink-0 w-full sm:w-1/3 md:w-1/5 h-full p-2"
                                >
                                    <div className="w-full h-full rounded-lg bg-gray-200 flex flex-col items-center justify-center overflow-hidden shadow-md cursor-pointer"
                                         onClick={() => handleImageClick(menuItems.find(item => item.category === category || category === 'Tout')?.image)}>
                                        <img 
                                            src={menuItems.find(item => item.category === category || category === 'Tout')?.image} 
                                            alt={category}
                                            className="w-full h-3/4 object-cover"
                                        />
                                        <button
                                            className={`mt-2 px-4 py-1 rounded-full text-sm transition-colors duration-200 ${
                                                activeCategory === category 
                                                    ? 'bg-orange-500 text-white shadow-md' 
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveCategory(category);
                                            }}
                                        >
                                            {category}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!isMobile && (
                            <>
                                <button onClick={prevStory} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <button onClick={nextStory} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </>
                        )}
                    </div>

                    <div className="relative mb-8">
                        <input
                            type="text"
                            placeholder="Rechercher des plats..."
                            className="w-full px-4 py-2 rounded-full border-2 border-orange-300 focus:outline-none focus:border-orange-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                        {filteredItems.map((item) => (
                            <motion.div 
                                key={item.id} 
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-200"
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        opacity: 1
                                    }
                                }}
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-48 sm:h-64 object-cover cursor-pointer transition-transform duration-300 hover:scale-105" 
                                    onClick={() => handleImageClick(item.image)}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                                    <p className="text-orange-500 font-bold text-xl mb-4">{item.price.toFixed(2)} €</p>
                                    <button 
                                        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
                                        onClick={() => addToCart(item)}
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                                        Ajouter au panier
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {zoomedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setZoomedImage(null)}>
                    <div className="relative max-w-full max-h-full">
                        <img src={zoomedImage} alt="Agrandi" className="max-w-full max-h-[90vh] rounded-lg" />
                        <button 
                            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                setZoomedImage(null);
                            }}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
