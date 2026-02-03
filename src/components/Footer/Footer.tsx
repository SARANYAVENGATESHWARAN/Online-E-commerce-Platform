import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { Shield, Truck, RotateCcw, Headphones, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 255) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you for subscribing! 🎉');
      setEmail('');
      setIsSubscribing(false);
    }, 1000);
  };

  return (
    <footer className="bg-[#172337] text-white mt-auto">
      {/* Trust Badges */}
      <div className="bg-[#1e2d44] py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h5 className="font-semibold text-white text-sm">100% Secure</h5>
                <p className="text-xs text-gray-400">Secure Payments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                <Truck className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h5 className="font-semibold text-white text-sm">Free Shipping</h5>
                <p className="text-xs text-gray-400">On orders over ₹499</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <RotateCcw className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h5 className="font-semibold text-white text-sm">Easy Returns</h5>
                <p className="text-xs text-gray-400">7 Day Return Policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                <Headphones className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h5 className="font-semibold text-white text-sm">24/7 Support</h5>
                <p className="text-xs text-gray-400">Dedicated Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-orange-600 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display text-xl font-bold text-white">Subscribe to our Newsletter</h3>
              <p className="text-white/80 text-sm mt-1">Get exclusive offers, new arrivals & more straight to your inbox!</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                className="w-full md:w-80 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
              />
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="bg-white text-primary hover:bg-white/90 font-semibold px-6"
              >
                {isSubscribing ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">S</span>
              </div>
              <span className="font-display text-lg font-bold text-white">
                Shop<span className="text-primary">Kart</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your one-stop destination for quality products at unbeatable prices. 
              Shop from millions of products across categories.
            </p>
            
            {/* App Download Badges */}
            <div className="mt-4">
              <h4 className="font-display font-semibold mb-3 text-gray-300 uppercase text-xs tracking-wider">Download App</h4>
              <div className="flex flex-col gap-2">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 bg-black border border-gray-600 rounded-lg px-3 py-2 hover:bg-gray-900 transition-colors w-fit"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.9 5c.1.1.1.2.1.3v13.3c0 .1 0 .2-.1.3l-7.1-7 7.1-6.9zm-1.3-1L9.9 10.3 5.3 5.7c-.2-.2-.5-.4-.8-.4h-.1c.1-.1.2-.2.4-.3l3.5-2c1.1-.7 2.2-.5 2.9-.2l5.4 1.2zm0 16L11 17.3l-5.3 5.1c-.5.5-1.1.5-1.6.3l-.6-.4c-.1-.1-.2-.2-.2-.3l5.6-5.4 6.7 3.7c.5.2.9.1 1-.3zm-8.5-8L3.2 17c-.2.1-.2.3-.2.5v.1c0-.2.1-.4.2-.6l4.9-4.9z"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 leading-none">GET IT ON</span>
                    <span className="text-sm font-semibold text-white leading-tight">Google Play</span>
                  </div>
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 bg-black border border-gray-600 rounded-lg px-3 py-2 hover:bg-gray-900 transition-colors w-fit"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 leading-none">Download on the</span>
                    <span className="text-sm font-semibold text-white leading-tight">App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-gray-300 uppercase text-xs tracking-wider">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link 
                    to={`/products?category=${cat.id}`}
                    className="text-white hover:text-primary transition-colors hover:underline"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-gray-300 uppercase text-xs tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-white hover:text-primary transition-colors hover:underline">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-white hover:text-primary transition-colors hover:underline">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-white hover:text-primary transition-colors hover:underline">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-white hover:text-primary transition-colors hover:underline">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-gray-300 uppercase text-xs tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-center gap-2">
                <span className="text-primary">📞</span>
                <span>1800-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✉️</span>
                <span>support@shopkart.in</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">📍</span>
                <span>Mumbai, Maharashtra</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-10 pt-8 border-t border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="font-display font-semibold mb-3 text-gray-300 uppercase text-xs tracking-wider text-center md:text-left">Payment Methods</h4>
              <div className="flex flex-wrap items-center gap-3">
                {/* Visa */}
                <div className="bg-white rounded px-2 py-1 h-8 flex items-center">
                  <svg className="h-5" viewBox="0 0 48 16" fill="none">
                    <path d="M19.4 1L15.2 15H11.6L15.8 1H19.4ZM35.6 10.1L37.4 4.8L38.4 10.1H35.6ZM39.4 15H42.8L39.9 1H36.8C36 1 35.3 1.5 35 2.2L29.2 15H33L33.8 12.7H38.6L39.4 15ZM30.2 10.5C30.2 6.4 24.6 6.2 24.6 4.4C24.6 3.8 25.2 3.2 26.4 3C27 2.9 28.6 2.9 30.4 3.7L31.2 1.3C30.2 0.9 29 0.6 27.4 0.6C23.8 0.6 21.2 2.6 21.2 5.4C21.2 7.5 23.2 8.6 24.6 9.3C26.2 10 26.6 10.5 26.6 11.2C26.6 12.2 25.4 12.6 24.4 12.6C22.4 12.6 21.2 12.1 20.2 11.6L19.4 14.1C20.4 14.6 22.2 15 24 15C27.8 15 30.2 13 30.2 10.5ZM14 1L8.2 15H4.4L1.4 3.6C1.2 2.9 1 2.6 0.4 2.2C-0.6 1.7 1 1 1 1H7C7.8 1 8.6 1.6 8.8 2.5L10.2 10.4L14 1Z" fill="#1A1F71"/>
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="bg-white rounded px-2 py-1 h-8 flex items-center">
                  <svg className="h-5" viewBox="0 0 32 20" fill="none">
                    <circle cx="10" cy="10" r="9" fill="#EB001B"/>
                    <circle cx="22" cy="10" r="9" fill="#F79E1B"/>
                    <path d="M16 3.5C17.8 5 19 7.4 19 10C19 12.6 17.8 15 16 16.5C14.2 15 13 12.6 13 10C13 7.4 14.2 5 16 3.5Z" fill="#FF5F00"/>
                  </svg>
                </div>
                {/* RuPay */}
                <div className="bg-white rounded px-2 py-1 h-8 flex items-center">
                  <span className="text-xs font-bold" style={{ color: '#097969' }}>RuPay</span>
                </div>
                {/* UPI */}
                <div className="bg-white rounded px-2 py-1 h-8 flex items-center">
                  <span className="text-xs font-bold text-[#4CAF50]">UPI</span>
                </div>
                {/* PayTM */}
                <div className="bg-white rounded px-2 py-1 h-8 flex items-center">
                  <span className="text-xs font-bold text-[#00BAF2]">Paytm</span>
                </div>
                {/* PhonePe */}
                <div className="bg-white rounded px-2 py-1 h-8 flex items-center">
                  <span className="text-xs font-bold text-[#5F259F]">PhonePe</span>
                </div>
                {/* GPay */}
                <div className="bg-white rounded px-2 py-1 h-8 flex items-center">
                  <span className="text-xs font-bold bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">GPay</span>
                </div>
                {/* Net Banking */}
                <div className="bg-white rounded px-2 py-1 h-8 flex items-center">
                  <span className="text-xs font-bold text-gray-700">Net Banking</span>
                </div>
                {/* COD */}
                <div className="bg-gray-700 rounded px-2 py-1 h-8 flex items-center">
                  <span className="text-xs font-semibold text-white">Cash on Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 ShopKart. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors">Return Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
