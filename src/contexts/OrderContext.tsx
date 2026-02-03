import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, CartItem, Address, OrderStatus } from '@/types';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], address: Address, totalAmount: number) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STORAGE_KEY = 'shopkart_orders';

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setOrders(parsed.map((order: Order) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
        })));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const generateOrderId = (): string => {
    const prefix = 'ORD';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const getRandomStatus = (): OrderStatus => {
    const statuses: OrderStatus[] = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];
    // Weight more towards earlier statuses for realism
    const weights = [0.3, 0.25, 0.2, 0.15, 0.1];
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < statuses.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        return statuses[i];
      }
    }
    return 'placed';
  };

  const createOrder = (items: CartItem[], address: Address, totalAmount: number): Order => {
    const now = new Date();
    const estimatedDelivery = new Date(now);
    estimatedDelivery.setDate(estimatedDelivery.getDate() + Math.floor(Math.random() * 5) + 3);

    const newOrder: Order = {
      id: generateOrderId(),
      userId: user?.id || 'guest',
      items,
      totalAmount,
      address,
      status: 'placed',
      createdAt: now,
      updatedAt: now,
      estimatedDelivery,
    };

    setOrders(current => [newOrder, ...current]);
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = (): Order[] => {
    if (!user) return [];
    return orders.filter(order => order.userId === user.id);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      getOrderById,
      getUserOrders,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
