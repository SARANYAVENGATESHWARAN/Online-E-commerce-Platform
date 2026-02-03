import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group relative flex flex-col bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in",
        className
      )}
    >
      {/* Discount Badge */}
      {product.discountPercentage > 0 && (
        <Badge className="absolute top-3 left-3 z-10 bg-success text-success-foreground">
          {product.discountPercentage}% OFF
        </Badge>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110",
          inWishlist && "bg-destructive/10"
        )}
      >
        <Heart 
          className={cn(
            "h-5 w-5 transition-colors",
            inWishlist ? "fill-destructive text-destructive" : "text-muted-foreground hover:text-destructive"
          )} 
        />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-destructive font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand */}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {product.brand}
        </span>

        {/* Name */}
        <h3 className="mt-1 font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-0.5 rounded text-sm font-medium">
            <Star className="h-3 w-3 fill-current" />
            {product.rating.toFixed(1)}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString('en-IN')} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.discountedPrice)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={cn(
            "mt-3 w-full gap-2 transition-all",
            inCart ? "bg-success hover:bg-success/90" : ""
          )}
          variant={inCart ? "default" : "default"}
        >
          <ShoppingCart className="h-4 w-4" />
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
