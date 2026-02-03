import React from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const ProductCardSkeleton: React.FC = () => (
  <div className="flex flex-col rounded-xl overflow-hidden bg-card shadow-card">
    <Skeleton className="aspect-square" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  isLoading = false,
  emptyMessage = 'No products found'
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {emptyMessage}
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
