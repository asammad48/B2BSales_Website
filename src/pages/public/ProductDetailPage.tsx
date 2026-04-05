import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { publicStoreRepository } from '@/repositories/publicStoreRepository';
import { publicCatalogRepository } from '@/repositories/publicCatalogRepository';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw, Info, SlidersHorizontal, ArrowRight, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/state/AuthContext';
import { useCart } from '@/state/CartContext';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductThumbnail } from '@/components/product/ProductThumbnail';
import { useShop } from '@/state/ShopContext';
import { qualityTypeLabels, getEnumLabel } from '@/utils/enumLabels';
import { env } from '@/env';
import { useLanguage } from '@/state/LanguageContext';
import { useCurrency } from '@/state/CurrencyContext';

const DUMMY_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><rect width="640" height="640" fill="%23f1f5f9"/><g fill="none" stroke="%23cbd5e1" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><rect x="200" y="180" width="240" height="280" rx="20"/><circle cx="320" cy="420" r="24" fill="%23cbd5e1"/><rect x="260" y="200" width="160" height="8" rx="4" fill="%23cbd5e1"/></g></svg>';

const resolveImageUrl = (path?: string) => {
  if (!path) return undefined;
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;
  const normalizedBaseUrl = env.apiBaseUrl.replace(/\/+$/, '');
  if (!normalizedBaseUrl) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBaseUrl}${normalizedPath}`;
};

export function ProductDetailPage() {
  const { t } = useLanguage();
  const { currencySymbol } = useCurrency();
  const { id = '' } = useParams();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedShopId, isReady: isShopReady } = useShop();
  const [product, setProduct] = useState<any>(location.state?.product || null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  const imageUrls = useMemo<string[]>(() => {
    const detailImageUrls = (product?.images || [])
      .map((image: any) => resolveImageUrl(image?.filePath))
      .filter((url: string | undefined): url is string => Boolean(url));
    const fallbackImageUrl = resolveImageUrl(product?.primaryImageUrl || product?.imageUrl);
    if (fallbackImageUrl) detailImageUrls.unshift(fallbackImageUrl);
    const uniqueImageUrls = Array.from(new Set<string>(detailImageUrls));
    return uniqueImageUrls.length > 0 ? uniqueImageUrls : [DUMMY_IMAGE];
  }, [product]);

  const [activeImageUrl, setActiveImageUrl] = useState(DUMMY_IMAGE);

  useEffect(() => {
    if (!isShopReady) return;
    window.scrollTo(0, 0);
    setIsLoading(true);

    const fetchProduct = async () => {
      try {
        const detail = await publicStoreRepository.getProductDetail(id);
        let catalogSnapshot: any = null;
        try {
          const lookupResult = await publicCatalogRepository.getPublicProducts({
            pageNumber: 1, pageSize: 20,
            search: detail?.sku || detail?.name,
            shopId: selectedShopId || undefined,
          });
          catalogSnapshot = (lookupResult?.items || []).find((item: any) => item.id === id);
        } catch { catalogSnapshot = null; }

        const mergedProduct = {
          ...detail,
          ...(catalogSnapshot || {}),
          primaryImageUrl: catalogSnapshot?.primaryImageUrl || detail?.primaryImageUrl,
          price: catalogSnapshot?.price ?? detail?.defaultSellingPrice,
          currencyCode: catalogSnapshot?.currencyCode || detail?.baseCurrencyCode,
          isInStock: catalogSnapshot?.isInStock ?? ((catalogSnapshot?.stockQuantity ?? 0) > 0),
          stockQuantity: catalogSnapshot?.stockQuantity ?? 0,
          canOrder: catalogSnapshot?.canOrder ?? detail?.canOrder,
          isPriceLocked: catalogSnapshot?.isPriceLocked ?? detail?.isPriceLocked,
        };
        setProduct(mergedProduct);

        const related = await publicCatalogRepository.getPublicProducts({
          pageNumber: 1, pageSize: 4,
          search: detail?.categoryName,
          shopId: selectedShopId || undefined,
          sortBy: 'name', sortDirection: 'asc',
        });
        setRelatedProducts((related?.items ?? []).filter((p: any) => p.id !== id));
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, isShopReady, selectedShopId]);

  useEffect(() => {
    setActiveImageUrl(imageUrls[0] || DUMMY_IMAGE);
  }, [imageUrls]);

  const canViewPrice = isAuthenticated || !product?.isPriceLocked;
  const canOrder = product?.canOrder !== false;
  const isInStock = product?.isInStock;
  const productCurrency = currencySymbol || product?.currencySymbol || product?.currencyCode || t('common.na');

  const onAddToCart = () => {
    if (!canOrder) return;
    addItem(product, 1);
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 w-40 bg-surface rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-surface rounded-3xl" />
          <div className="space-y-5">
            <div className="h-6 w-1/3 bg-surface rounded-xl" />
            <div className="h-10 w-3/4 bg-surface rounded-xl" />
            <div className="h-4 w-1/4 bg-surface rounded-xl" />
            <div className="h-28 w-full bg-surface rounded-2xl" />
            <div className="h-14 w-full bg-surface rounded-2xl" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-surface rounded-2xl" />
              <div className="h-20 bg-surface rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product && !isLoading) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-primary/20" />
        </div>
        <h2 className="text-2xl font-black mb-4">{t('productDetail.notFound.title')}</h2>
        <Link to="/products" className="btn-primary inline-flex">{t('productDetail.backToCatalog')}</Link>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t('productDetail.backToCatalog')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-bg shadow-sm group">
            <ProductThumbnail
              src={activeImageUrl}
              name={product?.name || t('product.productImage')}
              size="full"
              className="h-full"
              imgClassName="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            />
            {product?.qualityType && (
              <div className="absolute top-4 left-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                  <ShieldCheck className="w-3 h-3" />
                  {getEnumLabel(product.qualityType, qualityTypeLabels)}
                </span>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-md border',
                isInStock
                  ? 'bg-green-500/90 text-white border-green-400/20'
                  : 'bg-red-500/90 text-white border-red-400/20',
              )}>
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                {isInStock ? t('cart.item.inStock') : t('product.outOfStock')}
              </span>
            </div>
          </div>

          {imageUrls.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {imageUrls.map((url, index) => {
                const isActive = url === activeImageUrl;
                return (
                  <button
                    key={`${url}-${index}`}
                    type="button"
                    onClick={() => setActiveImageUrl(url)}
                    className={cn(
                      'relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200',
                      isActive
                        ? 'border-accent shadow-md shadow-accent/20 scale-105'
                        : 'border-border hover:border-primary/40 opacity-70 hover:opacity-100',
                    )}
                    aria-pressed={isActive}
                  >
                    <ProductThumbnail
                      src={url}
                      name={`${product?.name || ''} ${index + 1}`}
                      size="sm"
                      imgClassName="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="px-3 py-1.5 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest rounded-full border border-accent/20">
              {product?.brandName || t('productDetail.verifiedBrand')}
            </span>
            {product?.partTypeName && (
              <span className="px-3 py-1.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/10">
                {product.partTypeName}
              </span>
            )}
            {product?.modelName && (
              <span className="px-3 py-1.5 bg-surface text-text-muted text-[10px] font-bold uppercase tracking-widest rounded-full border border-border">
                {product.modelName}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-black tracking-tight mb-4 leading-tight text-text">
            {product?.name ?? t('product.premiumSparePart')}
          </h1>

          {product?.sku && (
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-5">
              SKU: <span className="text-text">{product.sku}</span>
            </p>
          )}

          <div className="rounded-2xl border border-border bg-surface overflow-hidden mb-6">
            <div className="px-6 py-4 bg-primary">
              <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">
                {t('checkout.summary.total')}
              </p>
              {canViewPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-white/70">{productCurrency}</span>
                  <span className="text-4xl font-black text-white leading-none">
                    {Number(product?.price ?? 0).toFixed(2)}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-2xl font-black text-white/50 italic">{t('productDetail.priceLocked')}</span>
                  <p className="text-xs text-white/40 mt-1">{t('productDetail.signInForRates')}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-3 flex items-center gap-2 bg-bg/60">
              <span className={cn('w-2 h-2 rounded-full flex-shrink-0', isInStock ? 'bg-green-500' : 'bg-red-400')} />
              <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
                {isInStock
                  ? t('product.inStockLabel', { count: product?.stockQuantity ?? 0 })
                  : t('product.outOfStock')}
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={onAddToCart}
                disabled={!canOrder}
                className={cn(
                  'w-full h-14 flex items-center justify-center gap-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-200',
                  canOrder
                    ? 'bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent/90 active:scale-95'
                    : 'bg-surface border-2 border-border text-text-muted cursor-not-allowed opacity-50',
                )}
                aria-disabled={!canOrder}
              >
                <ShoppingCart className="w-5 h-5" />
                {canOrder ? t('product.addToCart') : t('product.orderingUnavailable')}
              </button>
            ) : (
              <Link
                to="/login"
                state={{ from: { pathname: location.pathname, search: location.search, hash: location.hash } }}
                className="w-full h-14 flex items-center justify-center gap-3 rounded-xl border-2 border-primary text-primary text-sm font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-200"
              >
                <ShieldCheck className="w-5 h-5" />
                {t('productDetail.loginToOrder')}
              </Link>
            )}
            <p className="text-[10px] text-center text-text-muted font-bold uppercase tracking-widest">
              {t('productDetail.freeShipping', { currency: productCurrency })}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface hover:border-primary/20 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                <Truck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">{t('productDetail.nextDay')}</p>
                <p className="text-xs text-text-muted">{t('productDetail.deliveryAvailable')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface hover:border-primary/20 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">{t('productDetail.warrantyDays')}</p>
                <p className="text-xs text-text-muted">{t('productDetail.warrantyIncluded')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="flex border-b border-border bg-surface">
          {[
            { id: 'description', label: t('productDetail.tabs.description'), icon: <Info className="w-4 h-4" /> },
            { id: 'specs', label: t('productDetail.tabs.specs'), icon: <SlidersHorizontal className="w-4 h-4" /> },
            { id: 'shipping', label: t('productDetail.tabs.shipping'), icon: <Truck className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative px-8 py-4 text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all',
                activeTab === tab.id
                  ? 'text-accent'
                  : 'text-text-muted hover:text-text',
              )}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>

        <div className="p-8 bg-bg/40 min-h-[200px]">
          {activeTab === 'description' && (
            <div className="space-y-4 text-sm text-text-muted leading-relaxed">
              <p>{product?.longDescription || product?.shortDescription || t('productDetail.noDescription')}</p>
              <ul className="mt-6 space-y-2 border-t border-border pt-6">
                {[
                  t('productDetail.bullets.1'),
                  t('productDetail.bullets.2'),
                  t('productDetail.bullets.3'),
                  t('productDetail.bullets.4'),
                ].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {[
                { label: t('productDetail.specs.partType'), value: product?.partTypeName || t('productDetail.specs.component') },
                { label: t('productDetail.specs.sku'), value: product?.sku || t('common.na') },
                { label: t('productDetail.specs.compatibility'), value: product?.modelName || t('product.universal') },
                { label: t('productDetail.specs.condition'), value: t('productDetail.specs.conditionValue') },
              ].map((spec, i) => (
                <div key={i} className={cn('flex items-center justify-between py-3.5 border-b border-border/60', i % 2 === 0 ? '' : '')}>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{spec.label}</span>
                  <span className="text-xs font-bold text-text">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'shipping' && (
            <div className="space-y-6 text-sm text-text-muted leading-relaxed">
              <p>{t('productDetail.shippingText')}</p>
              <div className="border-t border-border pt-6">
                <h4 className="text-text font-black text-xs uppercase tracking-widest mb-3">{t('productDetail.returnPolicyTitle')}</h4>
                <p>{t('productDetail.returnPolicyText')}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight">{t('productDetail.related')}</h2>
              <div className="h-1 w-12 bg-accent rounded-full mt-2" />
            </div>
            <Link to="/products" className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:gap-3 transition-all group">
              {t('home.viewAll')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid-layout">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
