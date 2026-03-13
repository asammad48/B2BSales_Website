import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { publicStoreRepository } from '@/repositories/publicStoreRepository';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw, Info, Star, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/state/AuthContext';
import { useCurrency } from '@/state/CurrencyContext';
import { ProductCard } from '@/components/product/ProductCard';
import { qualityTypeLabels, getEnumLabel } from '@/utils/enumLabels';

export function ProductDetailPage() {
  const { id = '' } = useParams();
  const { isAuthenticated } = useAuth();
  const { currency } = useCurrency();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    const fetchProduct = async () => {
      try {
        const result = await publicStoreRepository.getProductDetail(id);
        setProduct(result);
        
        // Fetch related products (same category or just latest)
        const related = await publicStoreRepository.getProducts({ 
          pageNumber: 1, 
          pageSize: 4,
          sortBy: 'createdAt',
          sortDirection: 'desc'
        });
        // Filter out current product
        setRelatedProducts((related?.items ?? []).filter((p: any) => p.id !== id));
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 w-32 bg-surface rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-surface rounded-3xl" />
          <div className="space-y-6">
            <div className="h-10 w-3/4 bg-surface rounded-lg" />
            <div className="h-6 w-1/2 bg-surface rounded-lg" />
            <div className="h-24 w-full bg-surface rounded-lg" />
            <div className="h-12 w-full bg-surface rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!product && !isLoading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black mb-4">Product Not Found</h2>
        <Link to="/products" className="btn-primary inline-flex">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Link 
        to="/products" 
        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-square glass-card overflow-hidden flex items-center justify-center bg-background">
            {product?.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain p-8"
                referrerPolicy="no-referrer"
              />
            ) : (
              <ShoppingCart className="w-24 h-24 text-text-muted/10" />
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square glass-card cursor-pointer hover:border-primary transition-colors bg-surface/50" />
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/10">
              {product?.brandName || 'Verified Brand'}
            </span>
            <span className="px-3 py-1 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-widest rounded-full border border-accent/10">
              {getEnumLabel(product?.qualityType, qualityTypeLabels)}
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight mb-4 leading-tight">
            {product?.name ?? 'Premium Spare Part'}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
            </div>
            <span className="text-xs font-bold text-text-muted uppercase tracking-widest">4.9 (128 Reviews)</span>
          </div>

          <div className="glass-card p-6 mb-8">
            <div className="flex items-baseline gap-3 mb-2">
              {product?.isPriceLocked ? (
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-text-muted italic">Price Locked</span>
                  <p className="text-xs text-text-muted">Please sign in as a partner to view wholesale rates.</p>
                </div>
              ) : (
                <>
                  <span className="text-4xl font-black text-primary">
                    {product?.currencyCode ?? currency}{product?.price ?? '0.00'}
                  </span>
                  <span className="text-sm text-text-muted font-medium line-through">{currency}129.00</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {isAuthenticated ? (
              <button 
                className={cn(
                  "w-full h-14 flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all",
                  product?.canOrder 
                    ? "btn-primary" 
                    : "btn-outline opacity-50 cursor-not-allowed"
                )}
                disabled={!product?.canOrder}
              >
                <ShoppingCart className="w-5 h-5" />
                {product?.canOrder ? 'Add to Business Cart' : 'Out of Stock'}
              </button>
            ) : (
              <Link 
                to="/login"
                className="w-full h-14 btn-outline flex items-center justify-center gap-3 font-black uppercase tracking-widest"
              >
                <ShieldCheck className="w-5 h-5" />
                Login to Order
              </Link>
            )}
            <p className="text-[10px] text-center text-text-muted font-bold uppercase tracking-widest">
              Free Express Shipping on orders over {currency}500
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 glass-card">
              <Truck className="w-5 h-5 text-primary" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">Next Day</p>
                <p className="text-xs text-text-muted">Delivery Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 glass-card">
              <RotateCcw className="w-5 h-5 text-primary" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">30 Days</p>
                <p className="text-xs text-text-muted">Warranty Included</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <div className="pt-12">
        <div className="flex border-b border-border mb-8 overflow-x-auto">
          {[
            { id: 'description', label: 'Description', icon: <Info className="w-4 h-4" /> },
            { id: 'specs', label: 'Specifications', icon: <SlidersHorizontal className="w-4 h-4" /> },
            { id: 'shipping', label: 'Shipping & Returns', icon: <Truck className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-8 py-4 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-all border-b-2",
                activeTab === tab.id 
                  ? "border-primary text-primary" 
                  : "border-transparent text-text-muted hover:text-text"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="glass-card p-8 min-h-[200px]">
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none text-text-muted leading-relaxed">
              <p>{product?.longDescription || product?.shortDescription || "No detailed description available for this part."}</p>
              <ul className="mt-6 space-y-2">
                <li>• Grade A+ Premium Quality</li>
                <li>• Fully tested before dispatch</li>
                <li>• Compatible with original housing</li>
                <li>• Professional installation recommended</li>
              </ul>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Part Type', value: product?.partTypeName || 'Component' },
                { label: 'SKU', value: product?.sku || 'N/A' },
                { label: 'Compatibility', value: product?.modelName || 'Universal' },
                { label: 'Weight', value: '45g' },
                { label: 'Material', value: 'OEM Standard' },
                { label: 'Condition', value: 'Brand New' },
              ].map((spec, i) => (
                <div key={i} className="flex justify-between py-3 border-b border-border/50">
                  <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{spec.label}</span>
                  <span className="text-xs font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'shipping' && (
            <div className="prose prose-sm text-text-muted">
              <p>We offer worldwide shipping through DHL, FedEx, and UPS. Orders placed before 2 PM EST are shipped the same day.</p>
              <h4 className="text-text font-bold mt-6 mb-2">Return Policy</h4>
              <p>Returns are accepted within 30 days for defective parts. Parts must be in original condition with all protective films intact.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight">Related Components</h2>
            <Link to="/products" className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid-layout">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
