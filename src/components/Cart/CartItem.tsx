import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl shadow-card animate-fade-in">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="shrink-0">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between gap-2">
          <div className="min-w-0">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {product.brand}
            </span>
            <Link to={`/product/${product.id}`}>
              <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(product.id)}
            className="shrink-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Price & Quantity */}
        <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-muted rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.stockCount}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product.discountedPrice * quantity)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price * quantity)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
