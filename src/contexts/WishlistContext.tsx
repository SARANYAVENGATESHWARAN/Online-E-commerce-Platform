import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, WishlistItem } from '@/types';
import { toast } from 'sonner';

interface WishlistContextType {
  items: WishlistItem[];
  itemCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'shopkart_wishlist';

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setItems(parsed.map((item: WishlistItem) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        })));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const itemCount = items.length;

  const addToWishlist = (product: Product) => {
    setItems(current => {
      if (current.some(item => item.product.id === product.id)) {
        return current;
      }
      toast.success('Added to wishlist');
      return [...current, { product, addedAt: new Date() }];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems(current => current.filter(item => item.product.id !== productId));
    toast.info('Removed from wishlist');
  };

  const isInWishlist = (productId: string): boolean => {
    return items.some(item => item.product.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      itemCount,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
