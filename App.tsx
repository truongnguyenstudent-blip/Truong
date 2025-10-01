
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import GalleryPage from './pages/GalleryPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';

const App: React.FC = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<GalleryPage />} />
                <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
              </Routes>
            </main>
            <footer className="bg-white border-t mt-12">
                <div className="container mx-auto px-4 py-6 text-center text-gray-500">
                    <p>&copy; 2024 Art Gallery Demo. All rights reserved.</p>
                </div>
            </footer>
          </div>
        </HashRouter>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
