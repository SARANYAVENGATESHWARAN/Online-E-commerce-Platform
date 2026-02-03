import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/utils/helpers';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  showDelivery?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ showDelivery = true }) => {
  const { items, totalAmount } = useCart();

  const originalTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalSavings = originalTotal - totalAmount;
  const deliveryCharge = totalAmount >= 499 ? 0 : 49;
  const finalAmount = totalAmount + deliveryCharge;

  return (
    <div className="bg-card rounded-xl p-5 shadow-card">
      <h3 className="font-display font-semibold text-lg mb-4">Price Details</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Price ({items.length} {items.length === 1 ? 'item' : 'items'})
          </span>
          <span>{formatPrice(originalTotal)}</span>
        </div>

        <div className="flex justify-between text-success">
          <span>Discount</span>
          <span>-{formatPrice(totalSavings)}</span>
        </div>

        {showDelivery && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Charges</span>
            <span className={deliveryCharge === 0 ? 'text-success' : ''}>
              {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
            </span>
          </div>
        )}

        <Separator className="my-4" />

        <div className="flex justify-between text-base font-semibold">
          <span>Total Amount</span>
          <span>{formatPrice(showDelivery ? finalAmount : totalAmount)}</span>
        </div>

        {totalSavings > 0 && (
          <p className="text-success text-sm font-medium mt-4 p-3 bg-success/10 rounded-lg text-center">
            You will save {formatPrice(totalSavings)} on this order
          </p>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
