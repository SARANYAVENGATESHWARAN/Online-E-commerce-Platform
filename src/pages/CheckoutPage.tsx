import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import CartSummary from '@/components/Cart/CartSummary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { indianStates, formatPrice } from '@/utils/helpers';
import { Address } from '@/types';
import { toast } from 'sonner';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();

  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [address, setAddress] = useState<Address>({
    name: user?.name || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const deliveryCharge = totalAmount >= 499 ? 0 : 49;
  const finalAmount = totalAmount + deliveryCharge;

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const validateAddress = (): boolean => {
    const { name, phone, addressLine1, city, state, pincode } = address;
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!addressLine1.trim()) {
      toast.error('Please enter your address');
      return false;
    }
    if (!city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    if (!state) {
      toast.error('Please select your state');
      return false;
    }
    if (!pincode.trim() || !/^\d{6}$/.test(pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateAddress()) {
      setStep('payment');
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const order = createOrder(items, address, finalAmount);
    setOrderId(order.id);
    clearCart();
    setStep('success');
    
    setIsLoading(false);
  };

  if (items.length === 0 && step !== 'success') {
    navigate('/cart');
    return null;
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4 animate-scale-in">
            <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your order. Your order ID is:
            </p>
            <p className="text-lg font-bold text-primary mb-6">{orderId}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/orders')}>
                View Order
              </Button>
              <Button variant="outline" onClick={() => navigate('/products')}>
                Continue Shopping
              </Button>
            </div>
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
          {/* Back Button */}
          <button
            onClick={() => step === 'payment' ? setStep('address') : navigate('/cart')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {step === 'payment' ? 'Back to Address' : 'Back to Cart'}
          </button>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step === 'address' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'address' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <MapPin className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline font-medium">Address</span>
            </div>
            <div className="w-16 h-0.5 bg-muted" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <CreditCard className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline font-medium">Payment</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 'address' && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={address.name}
                          onChange={(e) => handleAddressChange('name', e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Mobile Number *</Label>
                        <Input
                          id="phone"
                          value={address.phone}
                          onChange={(e) => handleAddressChange('phone', e.target.value)}
                          placeholder="10-digit mobile number"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        value={address.addressLine1}
                        onChange={(e) => handleAddressChange('addressLine1', e.target.value)}
                        placeholder="House no., Building, Street"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                      <Input
                        id="addressLine2"
                        value={address.addressLine2}
                        onChange={(e) => handleAddressChange('addressLine2', e.target.value)}
                        placeholder="Landmark, Area"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={address.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          placeholder="City"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select
                          value={address.state}
                          onValueChange={(value) => handleAddressChange('state', value)}
                        >
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          value={address.pincode}
                          onChange={(e) => handleAddressChange('pincode', e.target.value)}
                          placeholder="6-digit PIN"
                          maxLength={6}
                        />
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-primary shadow-button mt-4"
                      onClick={handleContinueToPayment}
                    >
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 'payment' && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Delivery Address Summary */}
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium mb-1">Delivering to:</p>
                      <p className="text-sm text-muted-foreground">
                        {address.name}, {address.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>

                    {/* Payment Options */}
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="cod" id="cod" />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">
                              Pay when you receive your order
                            </p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors opacity-50">
                          <RadioGroupItem value="card" id="card" disabled />
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-sm text-muted-foreground">
                              Coming soon
                            </p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors opacity-50">
                          <RadioGroupItem value="upi" id="upi" disabled />
                          <div>
                            <p className="font-medium">UPI</p>
                            <p className="text-sm text-muted-foreground">
                              Coming soon
                            </p>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>

                    <Button
                      className="w-full bg-gradient-primary shadow-button"
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : `Place Order • ${formatPrice(finalAmount)}`}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <CartSummary showDelivery />
              
              {/* Order Items */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">
                    Order Items ({items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-80 overflow-y-auto">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(product.discountedPrice)} × {quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
