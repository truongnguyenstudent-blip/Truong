
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Artwork } from '../types';

interface WishlistContextType {
  wishlistItems: Artwork[];
  toggleWishlist: (item: Artwork) => void;
  isInWishlist: (itemId: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Artwork[]>([]);

  const toggleWishlist = useCallback((item: Artwork) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.some(wishlistItem => wishlistItem.id === item.id);
      if (exists) {
        return prevItems.filter(wishlistItem => wishlistItem.id !== item.id);
      }
      return [...prevItems, item];
    });
  }, []);

  const isInWishlist = useCallback((itemId: number) => {
    return wishlistItems.some(item => item.id === itemId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
