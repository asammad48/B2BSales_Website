import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Zap, Star } from 'lucide-react';

export function HomePage() {
  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary py-20 px-8 sm:px-16 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              B2B Wholesale Marketplace
            </span>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Premium Parts for <span className="text-accent">Modern</span> Devices.
            </h1>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Access the world's largest catalog of verified mobile spare parts. 
              Locked wholesale pricing for registered businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-accent hover:text-white transition-all flex items-center gap-2 group"
              >
                Browse Catalog
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                Partner Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Preview */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">New Arrivals</h2>
            <p className="text-text-muted">The latest components for the newest devices.</p>
          </div>
          <Link to="/new-arrivals" className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 group">
            View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: 'iPhone 15 Pro Max OLED', brand: 'Apple', price: '$289.99', img: 'https://picsum.photos/seed/iphone15/400/400' },
            { name: 'Galaxy S24 Ultra AMOLED', brand: 'Samsung', price: '$314.50', img: 'https://picsum.photos/seed/s24/400/400' },
            { name: 'Pixel 8 Pro Display', brand: 'Google', price: '$195.00', img: 'https://picsum.photos/seed/pixel8/400/400' },
            { name: 'Xiaomi 14 Pro Panel', brand: 'Xiaomi', price: '$145.00', img: 'https://picsum.photos/seed/xiaomi14/400/400' },
          ].map((item, i) => (
            <Link to="/new-arrivals" key={i} className="group glass-card p-4 space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-bg">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{item.brand}</p>
                <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                <p className="text-primary font-black mt-2">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            icon: <ShieldCheck className="w-8 h-8 text-primary" />, 
            title: "Verified Quality", 
            desc: "Every part undergoes a 20-point inspection process before shipping." 
          },
          { 
            icon: <Truck className="w-8 h-8 text-primary" />, 
            title: "Global Shipping", 
            desc: "Express delivery to over 150 countries with real-time tracking." 
          },
          { 
            icon: <Zap className="w-8 h-8 text-primary" />, 
            title: "Instant Quotes", 
            desc: "Dynamic wholesale pricing based on your order volume and loyalty." 
          }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 glass-card"
          >
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Trust Section */}
      <section className="bg-surface rounded-3xl p-12 border border-border text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
          </div>
          <h2 className="text-3xl font-bold mb-6">Trusted by 5,000+ Repair Centers</h2>
          <p className="text-text-muted mb-10 italic">
            "MobileParts has transformed our supply chain. The quality consistency is unmatched in the industry, 
            and their support team is always there when we need them."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-border rounded-full" />
            <div className="text-left">
              <p className="font-bold">David Chen</p>
              <p className="text-xs text-text-muted uppercase tracking-widest">CEO, TechFix Solutions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
