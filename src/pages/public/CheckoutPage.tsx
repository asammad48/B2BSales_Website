import { FormEvent, useMemo, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/state/AuthContext";
import { useCart } from "@/state/CartContext";
import { clientOrderRepository } from "@/repositories/clientOrderRepository";
import { useToast } from "@/components/common/ToastProvider";
import { useShop } from "@/state/ShopContext";
import { useLanguage } from "@/state/LanguageContext";
import { useCurrency } from "@/state/CurrencyContext";
import {
  ShoppingBag,
  MapPin,
  FileText,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { ProductThumbnail } from "@/components/product/ProductThumbnail";
import { cn } from "@/lib/utils";
import {
  ReceiptSnapshot,
  saveReceiptSnapshot,
} from "@/lib/receiptHistory";
import { PrintableReceiptButton } from "@/components/order/PrintableReceiptButton";

type CheckoutItem = {
  product: any;
  quantity: number;
};

export function CheckoutPage() {
  const { isAuthenticated } = useAuth();
  const { items: cartItems, clearCart } = useCart();
  const {
    shops,
    selectedShopId,
    setSelectedShopId,
    isLoading: isShopsLoading,
    isSelectionLocked,
  } = useShop();
  const location = useLocation();
  const [items] = useState<CheckoutItem[]>(location.state?.items || cartItems);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [receiptSnapshot, setReceiptSnapshot] = useState<ReceiptSnapshot | null>(
    null,
  );
  const { showError, showSuccess } = useToast();
  const { t } = useLanguage();
  const { currencySymbol } = useCurrency();

  const total = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + Number(item.product?.price || 0) * item.quantity,
        0,
      ),
    [items],
  );

  const firstCurrency = items.find((item) => item.product?.currencyCode)
    ?.product?.currencyCode;
  const totalCurrency = currencySymbol || firstCurrency || t("common.na");
  const hasMixedCurrencies = items.some(
    (item) => (item.product?.currencyCode ?? totalCurrency) !== totalCurrency,
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const hasUnavailableItems = items.some((item) => {
    const availableStock = Number(item.product?.stockQuantity ?? 0);
    const isItemInStock =
      item.product?.isInStock !== false && availableStock > 0;
    return !isItemInStock || item.quantity > availableStock;
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError(t("checkout.validation.emptyCart"));
      return;
    }

    if (hasUnavailableItems) {
      setSubmitError(t("product.orderingUnavailable"));
      return;
    }

    if (shops.length > 0 && !selectedShopId) {
      setSubmitError(t("checkout.validation.selectPickupShop"));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await clientOrderRepository.placeClientOrder({
        shopId: selectedShopId || undefined,
        notes: notes || undefined,
        items: items.map((item) => ({
          productId: item.product?.id,
          quantity: item.quantity,
        })),
      });

      const ref = response.orderNumber || "";
      const selectedShop = shops.find((shop) => shop.id === selectedShopId);
      const snapshot: ReceiptSnapshot = {
        orderNumber: ref || `UNCONFIRMED-${Date.now()}`,
        createdAt: new Date().toISOString(),
        shopName: selectedShop?.name,
        instructions: notes || undefined,
        currencySymbol,
        subtotal: total,
        total,
        items: items.map((item) => {
          const unitPrice = Number(item.product?.price || 0);
          return {
            productId: item.product?.id,
            productName: item.product?.name || t("common.na"),
            quantity: item.quantity,
            unitPrice,
            subtotal: unitPrice * item.quantity,
          };
        }),
      };

      saveReceiptSnapshot(snapshot);
      setReceiptSnapshot(snapshot);
      setOrderRef(ref);
      setIsSuccess(true);
      showSuccess(
        response.message ||
          t("checkout.success.submitted", { orderNumber: ref }),
      );
      clearCart();
      setNotes("");
    } catch (error: any) {
      showError(error?.message || t("checkout.errors.submitFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <div>
          <h1 className="text-2xl font-black mb-2">
            {t("checkout.success.submitted", { orderNumber: orderRef })}
          </h1>
          <p className="text-text-muted text-sm">{t("checkout.subtitle")}</p>
        </div>
        <Link to="/products" className="btn-primary inline-flex">
          {t("checkout.browseProducts")}
        </Link>
        {receiptSnapshot && (
          <PrintableReceiptButton
            receipt={receiptSnapshot}
            className="btn-outline inline-flex"
          />
        )}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-primary/5 border-2 border-dashed border-primary/10 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 text-primary/20" />
        </div>
        <div>
          <h1 className="text-2xl font-black mb-2">
            {t("checkout.emptyCart")}
          </h1>
        </div>
        <Link to="/products" className="btn-primary inline-flex">
          {t("checkout.browseProducts")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight mb-1">
          {t("checkout.title")}
        </h1>
        <p className="text-text-muted text-sm">{t("checkout.subtitle")}</p>
      </div>

      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted">
        <Link to="/cart" className="hover:text-primary transition-colors">
          {t("cart.title")}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-primary">{t("checkout.title")}</span>
      </div>

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start"
      >
        <div className="space-y-5">
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-primary/5 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-text">
                  {t("checkout.summary.title")}
                </h2>
                <p className="text-[10px] text-text-muted font-medium">
                  {totalItems === 1
                    ? t("common.itemCount", { count: totalItems })
                    : t("common.itemCountPlural", { count: totalItems })}
                </p>
              </div>
            </div>

            <div className="divide-y divide-border bg-surface">
              {items.map((item) => (
                <div
                  key={item.product?.id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border border-border bg-bg">
                    <ProductThumbnail
                      src={
                        item.product?.primaryImageUrl || item.product?.imageUrl
                      }
                      name={item.product?.name}
                      size="sm"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-sm truncate">
                      {item.product?.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {item.product?.sku && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                          {item.product.sku}
                        </span>
                      )}
                      {item.product?.sku && (
                        <span className="w-1 h-1 rounded-full bg-border" />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {t("checkout.summary.qty", { count: item.quantity })}
                      </span>
                      {Number(item.product?.stockQuantity ?? 0) > 0 &&
                        item.quantity >=
                          Number(item.product?.stockQuantity) && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                              {t("product.orderingUnavailable")}
                            </span>
                          </>
                        )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] text-text-muted font-medium block">
                      {currencySymbol ||
                        item.product?.currencySymbol ||
                        item.product?.currencyCode ||
                        t("common.na")}{" "}
                      {Number(item.product?.price || 0).toFixed(2)} ×{" "}
                      {item.quantity}
                    </span>
                    <p className="text-base font-black text-primary">
                      {currencySymbol ||
                        item.product?.currencySymbol ||
                        item.product?.currencyCode ||
                        t("common.na")}
                      {(
                        Number(item.product?.price || 0) * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-primary/5 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xs font-black uppercase tracking-widest text-text">
                {t("checkout.form.pickupShopLabel")}
              </h2>
            </div>
            <div className="p-6 bg-surface">
              <select
                value={selectedShopId}
                onChange={(e) => setSelectedShopId(e.target.value)}
                className={cn(
                  "w-full h-11 rounded-xl border text-sm px-4 transition-all focus:outline-none",
                  "bg-bg border-border text-text",
                  "focus:border-accent/60 focus:ring-2 focus:ring-accent/15",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
                disabled={
                  isShopsLoading || isSelectionLocked || shops.length === 0
                }
              >
                <option value="">
                  {isShopsLoading
                    ? t("checkout.form.shop.loading")
                    : shops.length === 0
                      ? t("checkout.form.shop.noneAvailable")
                      : t("checkout.form.shop.select")}
                </option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                    {shop.address ? ` — ${shop.address}` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-primary/5 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xs font-black uppercase tracking-widest text-text">
                {t("checkout.form.notesLabel")}
              </h2>
            </div>
            <div className="p-6 bg-surface">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={cn(
                  "w-full rounded-xl border text-sm px-4 py-3 transition-all focus:outline-none resize-none",
                  "bg-bg border-border text-text placeholder:text-text-muted",
                  "focus:border-accent/60 focus:ring-2 focus:ring-accent/15",
                )}
                rows={4}
                placeholder={t("checkout.form.notesPlaceholder")}
              />
            </div>
          </div>

          {submitError && (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600 font-bold">{submitError}</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border overflow-hidden shadow-sm lg:sticky lg:top-24">
          <div className="bg-primary px-6 py-5">
            <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-1">
              {t("checkout.summary.total")}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-white/60">
                {hasMixedCurrencies ? "" : totalCurrency}
              </span>
              <span className="text-4xl font-black text-white leading-none">
                {hasMixedCurrencies
                  ? t("checkout.summary.mixed")
                  : total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-white/40 mt-2 font-medium">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="bg-surface px-6 py-5 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting || hasUnavailableItems}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-accent text-white text-xs font-black uppercase tracking-widest shadow-md shadow-accent/25 hover:bg-accent/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {t("checkout.actions.placingOrder")}
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  {t("checkout.actions.placeOrder")}
                </>
              )}
            </button>
            <Link
              to="/cart"
              className="w-full h-10 flex items-center justify-center rounded-xl border border-border text-text-muted text-xs font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
            >
              {t("checkout.actions.backToCart")}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
