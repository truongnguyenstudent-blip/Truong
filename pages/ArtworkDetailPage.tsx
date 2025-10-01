
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { artworks } from '../data/artworks';
import { Artwork } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Modal from '../components/Modal';
import ArtworkCard from '../components/ArtworkCard';

const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const artwork = artworks.find(a => a.id === parseInt(id || '0'));
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  
  useEffect(() => {
    if (artwork) {
      document.title = `Art Gallery | ${artwork.title}`;
    }
     window.scrollTo(0, 0);
  }, [artwork]);

  if (!artwork) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Tác phẩm không tồn tại</h2>
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                Quay lại thư viện
            </Link>
        </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(artwork);
    setShowAddedToCart(true);
    setTimeout(() => {
      setShowAddedToCart(false);
    }, 2000);
  };

  const handleShare = async (platform: 'facebook' | 'twitter' | 'copy') => {
      const url = window.location.href;
      const text = `Check out this artwork: ${artwork.title} by ${artwork.artist}`;
      if(platform === 'copy'){
          await navigator.clipboard.writeText(url);
          alert('Link đã được sao chép!');
      } else if(platform === 'twitter') {
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
      } else if(platform === 'facebook') {
           window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      }
  };

  const relatedArtworks = artworks.filter(a => a.id !== artwork.id).slice(0, 4);
  const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Column */}
        <div>
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title} 
            className="w-full h-auto object-contain rounded-lg shadow-xl cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          />
        </div>

        {/* Details Column */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-2">{artwork.title}</h1>
          <p className="text-xl text-gray-600 mb-1">{artwork.artist}</p>
          <p className="text-md text-gray-500 mb-4">{artwork.year}</p>

          <p className="text-3xl font-light text-indigo-600 mb-6">{formatter.format(artwork.price)}</p>

          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-grow bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors relative"
            >
              {showAddedToCart ? "Đã thêm!" : "Thêm vào giỏ hàng"}
            </button>
            <button onClick={() => toggleWishlist(artwork)} className="p-3 bg-gray-200 rounded-lg text-gray-700 hover:text-red-500 hover:bg-gray-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isInWishlist(artwork.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isInWishlist(artwork.id) ? 0 : 2}>
                  <path strokeLinecap="round" strokeLinejoin="round" className={isInWishlist(artwork.id) ? "text-red-500" : ""} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Giới thiệu tranh</h2>
            <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
            <button 
              onClick={() => setIsBioModalOpen(true)}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Tiểu sử họa sĩ
            </button>
          </div>
          
           <div className="mt-8 pt-4 border-t">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Chia sẻ</h3>
              <div className="flex space-x-2">
                   <button onClick={() => handleShare('facebook')} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"> {/* Facebook Icon */} <svg className="w-5 h-5 text-blue-800" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-1 0-1.5.5-1.5 1.5V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg> </button>
                   <button onClick={() => handleShare('twitter')} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"> {/* Twitter Icon */} <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.94.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.34 0 11.35-6.08 11.35-11.35 0-.17 0-.34-.01-.51.78-.57 1.45-1.28 1.99-2.09z"/></svg> </button>
                   <button onClick={() => handleShare('copy')} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"> {/* Copy Link Icon */} <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg> </button>
              </div>
            </div>
        </div>
      </div>

      {/* Related Artworks */}
      <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold text-center mb-8">Tác phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedArtworks.map(art => <ArtworkCard key={art.id} artwork={art} />)}
          </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isBioModalOpen} onClose={() => setIsBioModalOpen(false)} title={`Tiểu sử ${artwork.artist}`}>
        <p className="text-gray-700 leading-relaxed">{artwork.artistBio}</p>
      </Modal>

      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <img src={artwork.imageUrl} alt={artwork.title} className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
};

export default ArtworkDetailPage;
