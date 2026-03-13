import { useState } from 'react';
import { useAuth } from '@/state/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Settings, LogOut, ChevronRight, ShieldCheck, ArrowLeft, CreditCard, Building2, MapPin, Bell } from 'lucide-react';

export function AccountPage() {
  const { user, logout } = useAuth();
  const [activeView, setActiveView] = useState<'menu' | 'orders' | 'profile'>('menu');

  const menuItems = [
    { id: 'orders', icon: <Package className="w-5 h-5" />, label: 'Order History', desc: 'View and track your wholesale orders' },
    { id: 'profile', icon: <Settings className="w-5 h-5" />, label: 'Business Profile', desc: 'Update your company information' },
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
          {[
            { id: 'ORD-8821', date: 'Mar 12, 2026', status: 'Processing', total: '$1,240.00', items: 12 },
            { id: 'ORD-8794', date: 'Mar 05, 2026', status: 'Shipped', total: '$850.00', items: 8 },
            { id: 'ORD-8750', date: 'Feb 28, 2026', status: 'Delivered', total: '$2,100.00', items: 24 },
          ].map((order) => (
            <div key={order.id} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{order.id}</h3>
                  <p className="text-xs text-text-muted">{order.date} • {order.items} Items</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-1">Status</p>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${
                    order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                    order.status === 'Shipped' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    'bg-accent/5 text-accent border-accent/10'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-1">Total</p>
                  <p className="font-bold">{order.total}</p>
                </div>
                <button className="p-2 hover:bg-bg rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </button>
              </div>
            </div>
          ))}
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
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Total Orders</p>
              <p className="text-2xl font-black">128</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Active Shipments</p>
              <p className="text-2xl font-black text-primary">3</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Loyalty Tier</p>
              <p className="text-sm font-bold text-accent">Platinum Partner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
