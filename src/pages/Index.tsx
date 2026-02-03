import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { categories } from '@/data/products';

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'On orders above ₹499',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure transactions',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '7-day return policy',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer care',
  },
];

const Index: React.FC = () => {
  const { products: trendingProducts, isLoading } = useProducts({
    sortBy: 'popularity',
  });

  const { products: dealsProducts } = useProducts({
    sortBy: 'price_low_high',
    filters: { inStock: true },
  });

  const topDeals = dealsProducts
    .filter(p => p.discountPercentage >= 25)
    .slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNGMwIDIuMjEtLjkgNC0yIDRzLTItMS43OS0yLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          <div className="container relative py-16 md:py-24">
            <div className="max-w-2xl text-primary-foreground">
              <span className="inline-block px-4 py-1.5 bg-primary-foreground/20 rounded-full text-sm font-medium mb-4 animate-fade-in">
                🎉 New Year Sale - Up to 70% OFF
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
                Shop the Best Deals in India
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 animate-slide-up">
                Discover millions of products from top brands at unbeatable prices. 
                Free delivery on orders above ₹499.
              </p>
              <div className="flex flex-wrap gap-4 animate-slide-up">
                <Link to="/products">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 shadow-button">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/products?category=electronics">
                  <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10">
                    Explore Electronics
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b bg-card">
          <div className="container py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold">Shop by Category</h2>
                <p className="text-muted-foreground mt-1">Browse our wide selection</p>
              </div>
              <Link to="/products">
                <Button variant="ghost" className="gap-2 text-primary">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <span className="text-2xl md:text-3xl">
                      {category.id === 'electronics' && '📱'}
                      {category.id === 'fashion-men' && '👔'}
                      {category.id === 'fashion-women' && '👗'}
                      {category.id === 'kids-wear' && '🧸'}
                      {category.id === 'home-kitchen' && '🏠'}
                      {category.id === 'groceries' && '🛒'}
                      {category.id === 'beauty' && '💄'}
                      {category.id === 'books' && '📚'}
                      {category.id === 'sports' && '⚽'}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {category.name.split(' - ')[0]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Top Deals */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  🔥 Top Deals of the Day
                </h2>
                <p className="text-muted-foreground mt-1">Save big on popular products</p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {topDeals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Banner */}
        <section className="py-12">
          <div className="container">
            <Card className="bg-gradient-secondary overflow-hidden">
              <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-secondary-foreground text-center md:text-left">
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                    New User Special
                  </h3>
                  <p className="text-lg opacity-90">
                    Get ₹200 off on your first order. Use code: <span className="font-bold">NEW200</span>
                  </p>
                </div>
                <Link to="/register">
                  <Button size="lg" className="bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90">
                    Sign Up Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  Trending Now
                </h2>
                <p className="text-muted-foreground mt-1">Most popular products this week</p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {trendingProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-foreground text-background">
          <div className="container text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground/80 mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for exclusive deals and new arrivals
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
