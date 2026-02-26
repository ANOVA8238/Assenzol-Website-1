import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Settings, 
  Thermometer,
  Gauge
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
interface Product {
  id: string;
  name: string;
  range: 'Zephyr' | 'Orion' | 'Maintenance';
  type: string;
  description: string;
  specs?: string[];
  image: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 'z-0w20',
    name: 'Zephyr 0W-20',
    range: 'Zephyr',
    type: 'Fully Synthetic',
    description: 'Ultra-low viscosity for maximum fuel efficiency and rapid cold-start protection.',
    specs: ['API SP', 'ILSAC GF-6A'],
    image: 'https://picsum.photos/seed/oil1/400/500'
  },
  {
    id: 'z-5w30',
    name: 'Zephyr 5W-30',
    range: 'Zephyr',
    type: 'Fully Synthetic',
    description: 'Balanced performance for modern turbocharged engines with superior wear protection.',
    specs: ['API SP', 'ACEA C3'],
    image: 'https://picsum.photos/seed/oil2/400/500'
  },
  {
    id: 'z-5w40',
    name: 'Zephyr 5W-40',
    range: 'Zephyr',
    type: 'Fully Synthetic (BMW LL04)',
    description: 'High-performance formulation specifically engineered for European luxury engines.',
    specs: ['BMW Longlife-04', 'MB 229.51'],
    image: 'https://picsum.photos/seed/oil3/400/500'
  },
  {
    id: 'o-10w40',
    name: 'Orion 10W-40',
    range: 'Orion',
    type: 'Semi Synthetic (7L)',
    description: 'Heavy-duty protection for diesel engines, optimized for long-haul durability.',
    specs: ['API CI-4/SL', 'Global DHD-1'],
    image: 'https://picsum.photos/seed/oil4/400/500'
  },
  {
    id: 'm-dot4',
    name: 'DOT 4 Brake Fluid',
    range: 'Maintenance',
    type: 'High Performance',
    description: 'High boiling point formulation for consistent braking performance under extreme heat.',
    image: 'https://picsum.photos/seed/brake/400/500'
  },
  {
    id: 'm-coolant',
    name: 'Premix Coolant 4L',
    range: 'Maintenance',
    type: 'Long Life',
    description: 'Advanced corrosion protection for all cooling system metals, ready to use.',
    image: 'https://picsum.photos/seed/coolant/400/500'
  },
  {
    id: 'm-flush',
    name: 'Engine Flush',
    range: 'Maintenance',
    type: 'Deep Clean',
    description: 'Removes sludge and deposits to restore engine efficiency and performance.',
    image: 'https://picsum.photos/seed/flush/400/500'
  }
];

// --- Components ---

const Logo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 500 100" 
    className={cn("h-10 w-auto", className)} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="skewX(-12)">
      {/* Custom 'A' with Red Triangle */}
      <path 
        d="M60 10L85 90H68L62 70H38L32 90H15L40 10H60ZM42 55H58L50 30L42 55Z" 
        fill="white" 
      />
      <path d="M25 90L35 70H15L25 90Z" fill="#E11D48" />
      
      {/* Rest of the text */}
      <text 
        x="90" 
        y="88" 
        fill="white" 
        style={{ font: '900 82px "Space Grotesk", sans-serif', letterSpacing: '-0.02em' }}
      >
        SSENZOL
      </text>
    </g>
    <text 
      x="465" 
      y="30" 
      fill="white" 
      style={{ font: 'bold 16px "Inter", sans-serif', opacity: 0.6 }}
    >
      TM
    </text>
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-brand-dark/90 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          {['Home', 'About', 'Products', 'Technology', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-brand-amber transition-colors">
              {item}
            </a>
          ))}
          <button className="bg-brand-amber text-brand-dark px-6 py-2 rounded-full font-bold hover:bg-brand-gold transition-all">
            FIND DEALER
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Home', 'About', 'Products', 'Technology', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/engine-hero/1920/1080?grayscale" 
          alt="Engine" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/60 to-brand-dark" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full border border-brand-amber/30 bg-brand-amber/10 text-brand-amber text-xs font-bold tracking-[0.3em] uppercase mb-6">
            Precision Lubrication Technology
          </span>
          <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter mb-6 leading-none">
            ENGINEERED FOR <br />
            <span className="text-gradient">PERFECTION</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Assenzol Sdn Bhd delivers premium automotive lubricants formulated with cutting-edge molecular technology for the Malaysian roads.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-brand-amber text-brand-dark px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
              EXPLORE RANGE <ChevronRight size={20} />
            </button>
            <button className="w-full sm:w-auto border border-white/20 hover:bg-white/5 px-10 py-4 rounded-full font-bold text-lg transition-all">
              OUR STORY
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats/Features Bar */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-brand-dark/50 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, label: "MAX PROTECTION", value: "99.9%" },
            { icon: Zap, label: "FUEL EFFICIENCY", value: "+15%" },
            { icon: Award, label: "OEM CERTIFIED", value: "BMW/MB" },
            { icon: Gauge, label: "HEAT RESISTANCE", value: "EXTREME" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 text-brand-amber mb-1">
                <stat.icon size={16} />
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold font-display">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
            <img 
              src="https://picsum.photos/seed/lab/800/800" 
              alt="Laboratory" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 glass-card p-8 rounded-2xl max-w-xs hidden lg:block">
            <p className="text-brand-amber font-display text-4xl font-bold mb-2">15+</p>
            <p className="text-sm text-gray-400 leading-tight">Years of specialized expertise in automotive formulation for tropical climates.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand-amber font-bold tracking-widest text-xs uppercase mb-4 block">About Assenzol</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
            WE KNOW WHAT <br />
            <span className="text-gradient">YOUR ENGINE NEEDS</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            At Assenzol Sdn Bhd, we specialize in the automotive industry with a singular focus: precision lubrication. Our oils are not just manufactured; they are carefully selected and formulated using proprietary blends designed to withstand the unique challenges of the Malaysian market.
          </p>
          <div className="space-y-6">
            {[
              { title: "Special Formulation", desc: "Engineered for high-temperature stability and superior oxidation resistance." },
              { title: "Expert Selection", desc: "Base oils and additives sourced from world-class providers for uncompromising quality." },
              { title: "Local Optimization", desc: "Tailored specifically for the stop-and-go traffic and humidity of Malaysia." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 w-5 h-5 rounded-full bg-brand-amber/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-brand-amber" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
    >
      <div className="h-64 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-amber">{product.range}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 group-hover:text-brand-amber transition-colors">{product.name}</h3>
        <p className="text-xs text-brand-amber/80 font-medium mb-3 uppercase tracking-wider">{product.type}</p>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
        
        {product.specs && (
          <div className="flex flex-wrap gap-2 mb-6">
            {product.specs.map(spec => (
              <span key={spec} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded uppercase tracking-tighter">
                {spec}
              </span>
            ))}
          </div>
        )}
        
        <button className="w-full py-3 rounded-xl border border-white/10 group-hover:bg-brand-amber group-hover:text-brand-dark transition-all font-bold text-sm">
          VIEW SPECIFICATIONS
        </button>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const [filter, setFilter] = useState<'All' | 'Zephyr' | 'Orion' | 'Maintenance'>('All');

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.range === filter);

  return (
    <section id="products" className="py-24 bg-brand-gray/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-brand-amber font-bold tracking-widest text-xs uppercase mb-4 block">Product Range</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display">THE ELITE <span className="text-gradient">COLLECTION</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['All', 'Zephyr', 'Orion', 'Maintenance'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all border",
                  filter === f 
                    ? "bg-brand-amber border-brand-amber text-brand-dark" 
                    : "bg-transparent border-white/10 text-gray-400 hover:border-white/30"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Technology = () => {
  return (
    <section id="technology" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-amber/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">MOLECULAR <span className="text-gradient">INNOVATION</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Our formulation process combines advanced synthetic base stocks with proprietary additive packages.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Settings, 
              title: "Viscosity Stability", 
              desc: "Maintains optimal oil film thickness even under extreme thermal stress and high-RPM operation." 
            },
            { 
              icon: Thermometer, 
              title: "Thermal Management", 
              desc: "Superior heat dissipation properties that protect critical engine components from overheating." 
            },
            { 
              icon: ShieldCheck, 
              title: "Sludge Prevention", 
              desc: "Active cleaning agents that keep your engine internals free from harmful deposits and carbon buildup." 
            }
          ].map((tech, i) => (
            <div key={i} className="glass-card p-10 rounded-3xl hover:border-brand-amber/50 transition-colors group">
              <div className="w-14 h-14 bg-brand-amber/10 rounded-2xl flex items-center justify-center text-brand-amber mb-6 group-hover:scale-110 transition-transform">
                <tech.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{tech.title}</h3>
              <p className="text-gray-500 leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-gray/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-card rounded-[40px] overflow-hidden grid md:grid-cols-2">
          <div className="p-12 md:p-20 bg-brand-amber text-brand-dark">
            <h2 className="text-4xl font-bold font-display mb-8">GET IN TOUCH</h2>
            <p className="text-brand-dark/70 mb-12 font-medium">Have questions about our products or interested in becoming a distributor? Our team is ready to assist you.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-brand-dark/10 rounded-full flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Call Us</p>
                  <p className="text-lg font-bold">+60 3-XXXX XXXX</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-brand-dark/10 rounded-full flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Email Us</p>
                  <p className="text-lg font-bold">info@assenzol.com.my</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-brand-dark/10 rounded-full flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Location</p>
                  <p className="text-lg font-bold">Kuala Lumpur, Malaysia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12 md:p-20">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-amber outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-amber outline-none transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-amber outline-none transition-colors appearance-none">
                  <option>Product Inquiry</option>
                  <option>Distributor Application</option>
                  <option>Technical Support</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-amber outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-brand-amber text-brand-dark py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Logo className="h-6" />
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              Assenzol Sdn Bhd is a leading provider of premium automotive lubricants in Malaysia, dedicated to engineering excellence and engine longevity.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'LI', 'YT'].map(social => (
                <div key={social} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold hover:border-brand-amber hover:text-brand-amber cursor-pointer transition-all">
                  {social}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#home" className="hover:text-brand-amber transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-amber transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-brand-amber transition-colors">Our Products</a></li>
              <li><a href="#technology" className="hover:text-brand-amber transition-colors">Technology</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Products</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-brand-amber transition-colors">Zephyr Fully Synthetic</a></li>
              <li><a href="#" className="hover:text-brand-amber transition-colors">Orion Diesel Range</a></li>
              <li><a href="#" className="hover:text-brand-amber transition-colors">Brake Fluids</a></li>
              <li><a href="#" className="hover:text-brand-amber transition-colors">Engine Flush</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
          <p>© 2024 ASSENZOL SDN BHD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-amber selection:text-brand-dark">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Technology />
      <Contact />
      <Footer />
    </div>
  );
}
