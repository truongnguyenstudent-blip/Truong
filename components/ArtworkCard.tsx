
import React from 'react';
import { Link } from 'react-router-dom';
import { Artwork } from '../types';
import { useWishlist } from '../context/WishlistContext';

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(artwork);
  };
  
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <Link to={`/artwork/${artwork.id}`} className="block">
        <div className="relative">
          <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-64 object-cover" />
          <div className="absolute top-2 right-2">
            <button onClick={handleWishlistClick} className="p-2 bg-white/70 rounded-full text-gray-700 hover:text-red-500 hover:bg-white transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isInWishlist(artwork.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isInWishlist(artwork.id) ? 0 : 2}>
                <path strokeLinecap="round" strokeLinejoin="round" className={isInWishlist(artwork.id) ? "text-red-500" : ""} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">{artwork.title}</h3>
          <p className="text-sm text-gray-500">{artwork.artist}</p>
          <p className="text-md font-bold text-indigo-600 mt-2">{formatter.format(artwork.price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ArtworkCard;
