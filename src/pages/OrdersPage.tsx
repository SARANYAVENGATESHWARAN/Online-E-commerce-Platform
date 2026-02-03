import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Truck, CheckCircle, Clock, PackageCheck } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice, formatDate } from '@/utils/helpers';
import { OrderStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  placed: { label: 'Order Placed', color: 'bg-blue-500', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-purple-500', icon: PackageCheck },
  shipped: { label: 'Shipped', color: 'bg-orange-500', icon: Truck },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-amber-500', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-500', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: Package },
};

const OrdersPage: React.FC = () => {
  const { getUserOrders } = useOrders();
  const { isAuthenticated } = useAuth();
  const orders = getUserOrders();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="font-display text-2xl font-bold mb-4">Please Login</h1>
            <p className="text-muted-foreground mb-6">Login to view your orders</p>
            <Link to="/login?redirect=/orders">
              <Button>Login</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2">No Orders Yet</h1>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-6">
        <div className="container">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-6">My Orders</h1>
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              return (
                <div key={order.id} className="bg-card rounded-xl shadow-card p-5 animate-fade-in">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-bold text-primary">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Placed on</p>
                      <p className="font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {order.items.slice(0, 3).map(({ product }) => (
                      <div key={product.id} className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-sm font-medium">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Badge className={cn(status.color, 'text-white gap-1')}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                      <span className="font-bold">{formatPrice(order.totalAmount)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrdersPage;
