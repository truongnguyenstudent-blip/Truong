
import React from 'react';
import Modal from './Modal';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';

interface WishlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({ isOpen, onClose }) => {
    const { wishlistItems, toggleWishlist } = useWishlist();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Danh sách yêu thích">
            {wishlistItems.length === 0 ? (
                <p className="text-gray-500 text-center">Danh sách yêu thích của bạn đang trống.</p>
            ) : (
                <ul className="space-y-4">
                    {wishlistItems.map(item => (
                        <li key={item.id} className="flex items-center space-x-4">
                            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-grow">
                                <Link to={`/artwork/${item.id}`} onClick={onClose} className="font-semibold text-sm hover:text-indigo-600">{item.title}</Link>
                                <p className="text-xs text-gray-500">{item.artist}</p>
                            </div>
                            <button onClick={() => toggleWishlist(item)} className="text-gray-400 hover:text-red-500" title="Remove from wishlist">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </Modal>
    );
};

export default WishlistModal;
