import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, User, Search, Menu, Globe, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/state/AuthContext';
import { useLanguage } from '@/state/LanguageContext';
import { useCurrency } from '@/state/CurrencyContext';
import { CustomDropdown } from '@/components/common/CustomDropdown';

export function PublicLayout() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: 'Products', path: '/products' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Quality Guide', path: '/quality-guide' },
  ];

  return (
    <div className="shell">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="container h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Store<span className="text-primary">Front</span></span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-xs font-black uppercase tracking-widest transition-colors hover:text-primary",
                    location.pathname === item.path ? "text-primary" : "text-text-muted"
                  )}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div layoutId="nav-underline" className="h-0.5 bg-primary mt-1" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <CustomDropdown 
              value={language}
              onChange={setLanguage}
              options={[
                { value: 'en', label: 'EN', icon: <Globe className="w-3 h-3" /> },
                { value: 'de', label: 'DE', icon: <Globe className="w-3 h-3" /> },
                { value: 'fr', label: 'FR', icon: <Globe className="w-3 h-3" /> },
              ]}
              className="hidden sm:block"
            />

            {/* Currency Switcher */}
            <CustomDropdown 
              value={currency}
              onChange={setCurrency}
              options={[
                { value: 'USD', label: 'USD', icon: <Coins className="w-3 h-3" /> },
                { value: 'EUR', label: 'EUR', icon: <Coins className="w-3 h-3" /> },
                { value: 'GBP', label: 'GBP', icon: <Coins className="w-3 h-3" /> },
              ]}
              className="hidden sm:block"
            />

            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="w-10 h-10 bg-surface border border-border rounded-xl flex items-center justify-center text-text-muted hover:text-primary transition-colors"
                  aria-label="User menu"
                >
                  <User className="w-5 h-5" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-surface border border-border rounded-xl p-2 shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors px-2 py-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors px-4 py-2 bg-surface border border-border rounded-xl">
                Login
              </Link>
            )}
            <button className="md:hidden p-2 hover:bg-bg rounded-full transition-colors text-text-muted">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <Outlet />
      </main>

      <footer className="bg-surface border-t border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2 space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-lg font-black tracking-tighter uppercase">Store<span className="text-primary">Front</span></span>
              </Link>
              <p className="text-sm text-text-muted max-w-sm">
                The future of wholesale electronics. Premium parts, verified quality, and seamless logistics for modern repair businesses.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-text-muted">
                <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                <li><Link to="/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                <li><Link to="/quality-guide" className="hover:text-primary transition-colors">Quality Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-text-muted">
                <li><Link to="/account" className="hover:text-primary transition-colors">My Account</Link></li>
                <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-text-muted">© 2026 StoreFront Wholesale. All rights reserved.</p>
            <div className="flex gap-6 text-xs font-bold text-text-muted">
              <Link to="/privacy" className="hover:text-primary">Privacy</Link>
              <Link to="/terms" className="hover:text-primary">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
