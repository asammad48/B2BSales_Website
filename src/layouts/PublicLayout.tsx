import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, User, Menu, Globe, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/state/AuthContext';
import { useLanguage } from '@/state/LanguageContext';
import { useCart } from '@/state/CartContext';
import { CustomDropdown } from '@/components/common/CustomDropdown';
import { useShop } from '@/state/ShopContext';

export function PublicLayout() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { itemCount } = useCart();
  const { shops, selectedShopId, setSelectedShopId, isLoading: isShopsLoading, isSelectionLocked } = useShop();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: t('nav.products'), path: '/products' },
    { label: t('nav.newArrivals'), path: '/new-arrivals' },
    { label: 'Featured', path: '/featured-products' },
    { label: t('nav.qualityGuide'), path: '/quality-guide' },
  ];

  const shopOptions = shops.map((shop) => ({
    value: shop.id || '',
    label: shop.name || 'Unknown shop',
    icon: <Store className="w-3 h-3" />,
  }));

  return (
    <div className="shell">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="container h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/mobia2z-logo.svg"
                alt="Mobia2z logo"
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-xl font-black tracking-tighter uppercase">Mobia2z</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-xs font-black uppercase tracking-widest transition-colors hover:text-primary',
                    location.pathname === item.path ? 'text-primary' : 'text-text-muted',
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
            <CustomDropdown
              value={selectedShopId}
              onChange={setSelectedShopId}
              options={shopOptions.length > 0 ? shopOptions : [{ value: '', label: isShopsLoading ? 'Loading shops...' : 'No shops available', icon: <Store className="w-3 h-3" /> }]}
              disabled={isShopsLoading || isSelectionLocked || shopOptions.length === 0}
              className="hidden sm:block min-w-[180px]"
            />

            <CustomDropdown
              value={language}
              onChange={(value) => {
                if (value === 'en' || value === 'de' || value === 'fr') {
                  setLanguage(value);
                }
              }}
              options={[
                { value: 'en', label: 'EN', icon: <Globe className="w-3 h-3" /> },
                { value: 'de', label: 'DE', icon: <Globe className="w-3 h-3" /> },
                { value: 'fr', label: 'FR', icon: <Globe className="w-3 h-3" /> },
              ]}
              className="hidden sm:block"
            />

            <Link to="/cart" className="relative w-10 h-10 bg-surface border border-border rounded-xl flex items-center justify-center text-text-muted hover:text-primary transition-colors" aria-label={t('nav.cart')}>
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

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
                  <div className="absolute right-0 mt-2 w-36 bg-surface border border-border rounded-xl p-2 shadow-lg">
                    <Link
                      to="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block w-full text-left text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors px-2 py-2"
                    >
                      {t('nav.myProfile')}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors px-2 py-2"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors px-4 py-2 bg-surface border border-border rounded-xl">
                {t('nav.login')}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((previous) => !previous)}
              className="md:hidden p-2 hover:bg-bg rounded-full transition-colors text-text-muted"
              aria-label="Toggle mobile navigation"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface/95 backdrop-blur-md">
            <div className="container py-4 space-y-3">
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-xs font-black uppercase tracking-widest transition-colors',
                      location.pathname === item.path
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'border-border text-text-muted hover:text-primary hover:border-primary/30',
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 container py-12">
        <Outlet />
      </main>

      <footer className="bg-surface border-t border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2 space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/mobia2z-logo.svg"
                  alt="Mobia2z logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-lg font-black tracking-tighter uppercase">Mobia2z</span>
              </Link>
              <p className="text-sm text-text-muted max-w-sm">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6">{t('footer.explore')}</h4>
              <ul className="space-y-4 text-sm text-text-muted">
                <li><Link to="/products" className="hover:text-primary transition-colors">{t('footer.allProducts')}</Link></li>
                <li><Link to="/new-arrivals" className="hover:text-primary transition-colors">{t('nav.newArrivals')}</Link></li>
                <li><Link to="/featured-products" className="hover:text-primary transition-colors">Featured Products</Link></li>
                <li><Link to="/quality-guide" className="hover:text-primary transition-colors">{t('nav.qualityGuide')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-6">{t('footer.support')}</h4>
              <ul className="space-y-4 text-sm text-text-muted">
                <li><Link to="/account" className="hover:text-primary transition-colors">{t('footer.myAccount')}</Link></li>
                <li><Link to="/shipping" className="hover:text-primary transition-colors">{t('footer.shippingPolicy')}</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">{t('footer.contactUs')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-text-muted">{t('footer.rights')}</p>
            <div className="flex gap-6 text-xs font-bold text-text-muted">
              <Link to="/privacy" className="hover:text-primary">{t('footer.privacy')}</Link>
              <Link to="/terms" className="hover:text-primary">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
