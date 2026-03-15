import { useEffect, useState } from 'react';
import { useAuth } from '@/state/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Settings, LogOut, ChevronRight, ShieldCheck, ArrowLeft, CreditCard, Building2, MapPin, Bell } from 'lucide-react';
import { clientOrderRepository } from '@/repositories/clientOrderRepository';
import { PaginationBar } from '@/components/common/PaginationBar';
import { useToast } from '@/components/common/ToastProvider';
import { useNavigate } from 'react-router-dom';
import type { ClientOrderSummaryDto } from '@/api/generated/apiClient';

const PAGE_SIZE = 10;

export function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'menu' | 'orders' | 'profile'>('menu');
  const [pageNumber, setPageNumber] = useState(1);
  const [ordersData, setOrdersData] = useState<any>({ items: [], totalCount: 0, pageSize: PAGE_SIZE });
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [orderSummary, setOrderSummary] = useState<ClientOrderSummaryDto | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const { showError } = useToast();
  const clientId = user?.clientId;

  useEffect(() => {
    if (!clientId) {
      setOrderSummary(null);
      return;
    }

    setIsSummaryLoading(true);
    clientOrderRepository
      .getClientOrderSummary(clientId)
      .then((summary) => setOrderSummary(summary))
      .catch((error: any) => {
        setOrderSummary(null);
        showError(error?.message || 'Unable to load order summary.');
      })
      .finally(() => setIsSummaryLoading(false));
  }, [clientId, showError]);

  useEffect(() => {
    if (activeView !== 'orders') {
      return;
    }

    if (!clientId) {
      showError('Your session is missing client context. Please sign in again.');
      navigate('/login', { replace: true, state: { from: { pathname: '/account' } } });
      return;
    }

    setIsOrdersLoading(true);

    clientOrderRepository
      .getClientOrders(clientId, { pageNumber, pageSize: PAGE_SIZE, sortBy: 'createdAt', sortDirection: 'desc' })
      .then((result) => setOrdersData(result))
      .catch((error: any) => {
        showError(error?.message || 'Unable to load your order history.');
      })
      .finally(() => setIsOrdersLoading(false));
  }, [activeView, clientId, pageNumber, showError, navigate]);

  const getStatusClass = (statusLabel?: string) => {
    const normalized = statusLabel?.toLowerCase() || '';
    if (normalized.includes('completed')) return 'bg-green-50 text-green-600 border-green-100';
    if (normalized.includes('ready') || normalized.includes('pickup')) return 'bg-blue-50 text-blue-600 border-blue-100';
    if (normalized.includes('cancel') || normalized.includes('unable')) return 'bg-red-50 text-red-600 border-red-100';
    return 'bg-accent/5 text-accent border-accent/10';
  };

  const menuItems = [
    { id: 'orders', icon: <Package className="w-5 h-5" />, label: 'Order History', desc: 'View and track your wholesale orders' },
    { id: 'profile', icon: <Settings className="w-5 h-5" />, label: 'Business Profile', desc: 'Update your company information' },
  ];

  const summaryCards = [
    { label: 'Total Orders', value: orderSummary?.totalOrders ?? 0, valueClassName: 'text-2xl font-black' },
    { label: 'Completed Orders', value: orderSummary?.completedOrders ?? 0, valueClassName: 'text-2xl font-black text-green-600' },
    { label: 'Pending Orders', value: orderSummary?.pendingOrders ?? 0, valueClassName: 'text-2xl font-black text-accent' },
    { label: 'Ready for Pickup', value: orderSummary?.readyForPickupOrders ?? 0, valueClassName: 'text-2xl font-black text-blue-600' },
    { label: 'Cancelled Orders', value: orderSummary?.cancelledOrders ?? 0, valueClassName: 'text-2xl font-black text-red-500' },
    { label: 'Unable to Fulfill', value: orderSummary?.unableToFulfillOrders ?? 0, valueClassName: 'text-2xl font-black text-red-700' },
  ];

  if (activeView === 'orders') {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <button 
          onClick={() => setActiveView('menu')}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </button>
        
        <header className="space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-tight">Order History</h1>
          <p className="text-text-muted">Track and manage your recent wholesale transactions.</p>
        </header>


        <div className="space-y-4">
          {isOrdersLoading ? (
            [1, 2, 3].map((item) => <div key={item} className="glass-card h-24 animate-pulse bg-surface/50" />)
          ) : (
            (ordersData?.items ?? []).map((order: any) => (
              <div key={order.orderId} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{order.orderNumber || 'N/A'}</h3>
                    <p className="text-xs text-text-muted">
                      {order.shopName || 'Unknown shop'} • {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown date'}
                    </p>
                    {order.notes && <p className="text-xs text-text-muted mt-1">{order.notes}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-1">Status</p>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${getStatusClass(order.statusLabel || order.status)}`}>
                      {order.statusLabel || order.status || 'Pending'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-1">Total</p>
                    <p className="font-bold">{order.currencyCode || '$'}{Number(order.totalAmount || 0).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}

          {!isOrdersLoading && (ordersData?.items ?? []).length === 0 && (
            <div className="glass-card p-8 text-center text-text-muted">No orders found yet.</div>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          <PaginationBar
            pageNumber={pageNumber}
            pageSize={ordersData?.pageSize ?? PAGE_SIZE}
            totalCount={ordersData?.totalCount ?? 0}
            onChange={setPageNumber}
          />
        </div>
      </div>
    );
  }

  if (activeView === 'profile') {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <button 
          onClick={() => setActiveView('menu')}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </button>

        <header className="space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-tight">Business Profile</h1>
          <p className="text-text-muted">Manage your company details and preferences.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section className="glass-card p-8 space-y-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Company Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Company Name</label>
                  <input type="text" defaultValue="TechFix Solutions" className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">VAT Number</label>
                  <input type="text" defaultValue="DE123456789" className="input-field" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Business Email</label>
                  <input type="email" defaultValue={user?.email || ''} className="input-field" />
                </div>
              </div>
            </section>

            <section className="glass-card p-8 space-y-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Shipping Address
              </h2>
              <div className="space-y-4">
                <textarea 
                  rows={3} 
                  defaultValue="Tech Plaza 42, Berlin&#10;Germany, 10117"
                  className="input-field h-auto py-3"
                />
              </div>
            </section>

            <div className="flex justify-end gap-4">
              <button className="btn-outline">Cancel</button>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                Notifications
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Order Updates', active: true },
                  { label: 'Price Alerts', active: false },
                  { label: 'New Arrivals', active: true },
                ].map((pref, i) => (
                  <label key={i} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-text-muted">{pref.label}</span>
                    <div className={`w-10 h-5 rounded-full transition-colors relative ${pref.active ? 'bg-primary' : 'bg-border'}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${pref.active ? 'left-6' : 'left-1'}`} />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-primary/20">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">{user?.name || 'Partner Account'}</h1>
            <p className="text-text-muted">{user?.email || 'business@example.com'}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-bold px-1">Account Management</h2>
          <div className="space-y-4">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveView(item.id as any)}
                className="w-full flex items-center justify-between p-6 glass-card group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{item.label}</h3>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold px-1">Quick Stats</h2>
          <div className="glass-card p-6 space-y-6">
            {isSummaryLoading
              ? [1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="h-12 animate-pulse bg-surface/50 rounded-xl" />)
              : summaryCards.map((card) => (
                  <div key={card.label}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{card.label}</p>
                    <p className={card.valueClassName}>{card.value}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
