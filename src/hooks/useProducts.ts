import { useState, useEffect, useMemo } from 'react';
import { Product, FilterOptions, SortOption } from '@/types';
import { products as allProducts } from '@/data/products';

interface UseProductsOptions {
  category?: string;
  subcategory?: string;
  searchQuery?: string;
  filters?: Partial<FilterOptions>;
  sortBy?: SortOption;
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [options]);

  const products = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (options.category) {
      filtered = filtered.filter(p => p.category === options.category);
    }

    // Filter by subcategory
    if (options.subcategory) {
      filtered = filtered.filter(p => p.subcategory === options.subcategory);
    }

    // Search query
    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (options.filters) {
      const { categories, priceRange, brands, rating, inStock } = options.filters;

      if (categories && categories.length > 0) {
        filtered = filtered.filter(p => categories.includes(p.category));
      }

      if (priceRange) {
        filtered = filtered.filter(
          p => p.discountedPrice >= priceRange[0] && p.discountedPrice <= priceRange[1]
        );
      }

      if (brands && brands.length > 0) {
        filtered = filtered.filter(p => brands.includes(p.brand));
      }

      if (rating) {
        filtered = filtered.filter(p => p.rating >= rating);
      }

      if (inStock) {
        filtered = filtered.filter(p => p.inStock);
      }
    }

    // Sort
    switch (options.sortBy) {
      case 'price_low_high':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price_high_low':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Simulate newest by reversing
        filtered.reverse();
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return filtered;
  }, [options.category, options.subcategory, options.searchQuery, options.filters, options.sortBy]);

  return {
    products,
    isLoading,
    error,
    totalCount: products.length,
  };
};

export const useProduct = (productId: string): { product: Product | null; isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [productId]);

  const product = useMemo(() => {
    return allProducts.find(p => p.id === productId) || null;
  }, [productId]);

  return { product, isLoading };
};
