import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, ShieldCheck, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/state/AuthContext";
import { useCart } from "@/state/CartContext";
import { useLanguage } from "@/state/LanguageContext";
import { useCurrency } from "@/state/CurrencyContext";
import { qualityTypeLabels, getEnumLabel } from "@/utils/enumLabels";
import { ProductThumbnail } from "./ProductThumbnail";

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: any;
  variant?: "grid" | "list";
}) {
  const { t } = useLanguage();
  const { currencySymbol } = useCurrency();
  const { isAuthenticated } = useAuth();
  const { addItem, items } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const canViewPrice = isAuthenticated || !product?.isPriceLocked;
  const canOrder = product?.canOrder !== false;
  const availableStock = Number(product?.stockQuantity ?? 0);
  const isInStock = product?.isInStock !== false && availableStock > 0;
  const quantityInCart =
    items.find((item) => item.product?.id === product?.id)?.quantity ?? 0;
  const canAddToCart = canOrder && isInStock && quantityInCart < availableStock;

  const loginState = {
    from: {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    },
  };

  const imageUrl = product?.primaryImageUrl || product?.imageUrl || null;
  const detailPath = `/products/${product?.id}`;
  const productCurrency =
    currencySymbol ||
    product?.currencySymbol ||
    product?.currencyCode ||
    t("common.na");

  const onAddToCart = () => {
    if (!canAddToCart) return;
    addItem(product, 1);
    navigate("/cart");
  };

  if (variant === "list") {
    return (
      <motion.article
        whileHover={{ y: -2 }}
        className="group relative bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/60 to-transparent rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-stretch gap-0">
          <div className="relative w-40 flex-shrink-0 overflow-hidden bg-bg">
            <ProductThumbnail
              src={imageUrl}
              name={product?.name}
              size="md"
              imgClassName="transition-transform duration-500 group-hover:scale-105"
            />
            {product?.qualityType && (
              <div className="absolute top-2 left-2">
                <span className="flex items-center gap-1 px-2 py-1 bg-primary/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider rounded-full">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  {getEnumLabel(product.qualityType, qualityTypeLabels)}
                </span>
              </div>
            )}
          </div>

          <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 min-w-0">
            <div className="flex-grow min-w-0 max-w-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                  {product?.brandName || t("product.genericBrand")}
                </span>
                {product?.modelName && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-[10px] font-medium text-text-muted">
                      {product.modelName}
                    </span>
                  </>
                )}
              </div>

              <h3 className="font-bold text-base mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                {product?.name ?? t("product.premiumSparePart")}
              </h3>

              <p className="text-xs text-text-muted line-clamp-1 mb-2">
                {product?.shortDescription || t("product.shortDescription")}
              </p>

              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    isInStock ? "bg-green-500" : "bg-red-400",
                  )}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  {isInStock
                    ? t("product.stockLabel", {
                        count: product?.stockQuantity ?? 0,
                      })
                    : t("product.outOfStock")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="flex flex-col items-end">
                {canViewPrice ? (
                  <>
                    <span className="text-xs text-text-muted font-medium uppercase tracking-widest mb-0.5">
                      {productCurrency}
                    </span>
                    <span className="text-2xl font-black text-primary leading-none">
                      {Number(product?.price ?? 0).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <Link
                    to="/login"
                    state={loginState}
                    className="text-[10px] font-black uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"
                  >
                    {t("product.loginForPrice")}
                  </Link>
                )}
                {product?.isPriceLocked && !isAuthenticated && (
                  <span className="text-[9px] text-text-muted uppercase tracking-widest mt-1">
                    {t("product.guestPriceLocked")}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={onAddToCart}
                    disabled={!canAddToCart}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                      canAddToCart
                        ? "bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent/90 hover:scale-110 active:scale-95"
                        : "bg-surface border border-border text-text-muted cursor-not-allowed opacity-50",
                    )}
                    title={
                      canAddToCart
                        ? t("product.addToCart")
                        : t("product.orderingUnavailable")
                    }
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    state={loginState}
                    className="w-10 h-10 rounded-xl bg-surface border border-border text-text-muted flex items-center justify-center transition-all hover:border-primary hover:text-primary"
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  to={detailPath}
                  state={{ product }}
                  className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 text-primary flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:border-primary hover:scale-110 active:scale-95"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group relative bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-bg flex-shrink-0">
        <ProductThumbnail
          src={imageUrl}
          name={product?.name}
          size="full"
          imgClassName="transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product?.qualityType && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 px-2.5 py-1 bg-primary/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider rounded-full border border-white/10">
              <ShieldCheck className="w-2.5 h-2.5" />
              {getEnumLabel(product.qualityType, qualityTypeLabels)}
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span
            className={cn(
              "flex items-center gap-1 px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md border",
              isInStock
                ? "bg-green-500/90 text-white border-green-400/20"
                : "bg-red-500/90 text-white border-red-400/20",
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            {isInStock ? t("cart.item.inStock") : t("product.outOfStock")}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Link
            to={detailPath}
            state={{ product }}
            className="w-9 h-9 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:bg-accent hover:text-white transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">
            {product?.brandName || t("product.genericBrand")}
          </span>
          {product?.modelName && (
            <>
              <span className="w-1 h-1 bg-border rounded-full" />
              <span className="text-[10px] font-medium text-text-muted truncate">
                {product?.modelName}
              </span>
            </>
          )}
        </div>

        <h3 className="font-bold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product?.name ?? t("product.premiumSparePart")}
        </h3>

        <p className="text-xs text-text-muted line-clamp-2 mb-3 leading-relaxed">
          {product?.shortDescription || t("product.shortDescriptionLong")}
        </p>

        {isInStock && product?.stockQuantity > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <Package className="w-3 h-3 text-text-muted" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
              {t("product.inStockLabel", {
                count: product?.stockQuantity ?? 0,
              })}
            </span>
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-border/60 flex items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            {canViewPrice ? (
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-text-muted font-medium">
                  {productCurrency}
                </span>
                <span className="text-lg font-black text-primary leading-none">
                  {Number(product?.price ?? 0).toFixed(2)}
                </span>
              </div>
            ) : (
              <Link
                to="/login"
                state={loginState}
                className="text-[10px] font-black uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"
              >
                {t("product.loginForPrice")}
              </Link>
            )}
            {product?.isPriceLocked && !isAuthenticated && (
              <span className="text-[9px] text-text-muted uppercase tracking-widest">
                {t("product.guestAccessLocked")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={onAddToCart}
                disabled={!canAddToCart}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200",
                  canAddToCart
                    ? "bg-accent text-white shadow-md shadow-accent/25 hover:bg-accent/90 hover:scale-110 active:scale-95"
                    : "bg-surface border border-border text-text-muted cursor-not-allowed opacity-40",
                )}
                title={
                  canAddToCart
                    ? t("product.addToCart")
                    : t("product.orderingUnavailable")
                }
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/login"
                state={loginState}
                className="w-9 h-9 rounded-xl bg-surface border border-border text-text-muted flex items-center justify-center transition-all hover:border-primary hover:text-primary"
              >
                <ShieldCheck className="w-4 h-4" />
              </Link>
            )}
            <Link
              to={detailPath}
              state={{ product }}
              className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 text-primary flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:border-primary hover:scale-110 active:scale-95"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.article>
  );
}
