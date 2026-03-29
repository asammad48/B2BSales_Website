import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { HomePage } from '@/pages/public/HomePage';
import { ProductListingPage } from '@/pages/public/ProductListingPage';
import { ProductDetailPage } from '@/pages/public/ProductDetailPage';
import { LoginPage } from '@/pages/public/LoginPage';
import { AccountPage } from '@/pages/public/AccountPage';
import { CheckoutPage } from '@/pages/public/CheckoutPage';
import { CartPage } from '@/pages/public/CartPage';
import { ShippingPolicyPage } from '@/pages/public/ShippingPolicyPage';
import { PrivacyPolicyPage } from '@/pages/public/PrivacyPolicyPage';
import { TermsOfServicePage } from '@/pages/public/TermsOfServicePage';
import { ContactUsPage } from '@/pages/public/ContactUsPage';
import { QualityGuidePage } from '@/pages/public/QualityGuidePage';
import { NewArrivalsPage } from '@/pages/public/NewArrivalsPage';
import { FeaturedProductsPage } from '@/pages/public/FeaturedProductsPage';
import { NotFoundPage } from '@/pages/shared/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shipping" element={<ShippingPolicyPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/quality-guide" element={<QualityGuidePage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/featured-products" element={<FeaturedProductsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
