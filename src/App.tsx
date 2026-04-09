/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { 
  Camera, 
  Heart, 
  Calendar, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  Quote,
  Menu,
  X,
  ArrowRight,
  Play
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// --- Custom Cursor ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? 'rgba(107, 107, 75, 0.1)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    />
  );
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-warm-bg/90 backdrop-blur-xl py-4 border-b border-warm-ink/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-display font-bold tracking-tighter"
        >
          Samawa Project<span className="text-accent font-light italic"></span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <button 
          className="md:hidden p-2 text-warm-ink"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-warm-bg z-40 md:hidden flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-display hover:italic hover:text-accent transition-all"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: y1, scale }} className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/luxury-wedding/1920/1080" 
          alt="Hero" 
          className="w-full h-full object-cover brightness-[0.6]"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="relative z-10 text-center text-white px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-[10px] uppercase tracking-[0.5em] mb-8 font-bold text-accent/80">
            Est. 2018 — Jakarta, Indonesia
          </span>
          <h1 className="text-7xl md:text-[10vw] font-display leading-[0.85] mb-12 tracking-tighter">
            Elegance in <br />
            <span className="italic font-serif font-light text-accent">Every Frame</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.a 
              href="#gallery" 
              whileHover={{ scale: 1.05 }}
              className="bg-accent text-white px-10 py-5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-warm-ink transition-all duration-500"
            >
              Explore Portfolio
            </motion.a>
            <button className="flex items-center space-x-4 group">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-warm-ink transition-all duration-500">
                <Play size={16} fill="currentColor" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Watch Showreel</span>
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-4">Scroll to discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>

      {/* Vertical Rail Text */}
      <div className="absolute left-8 bottom-24 hidden lg:block">
        <span className="text-vertical text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">
          Samawa Project Photography
        </span>
      </div>
    </section>
  );
};

const FeaturedSection = () => {
  return (
    <section id="about" className="py-32 px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-7xl font-display leading-tight mb-8">
              We capture <br />
              <span className="italic font-light text-accent">raw emotions</span>
            </h2>
            <p className="text-warm-ink/60 text-lg font-serif leading-relaxed italic">
              "Photography is the only language that can be understood anywhere in the world. We don't just take pictures, we preserve legacies."
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-3xl font-display mb-2">150+</h4>
              <p className="text-[10px] uppercase tracking-widest text-warm-ink/40 font-bold">Weddings Captured</p>
            </div>
            <div>
              <h4 className="text-3xl font-display mb-2">12</h4>
              <p className="text-[10px] uppercase tracking-widest text-warm-ink/40 font-bold">Awards Won</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 relative">
          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-[3/4] rounded-2xl overflow-hidden mt-12"
            >
              <img src="https://picsum.photos/seed/wed1/600/800" alt="Work" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <img src="https://picsum.photos/seed/wed2/600/800" alt="Work" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
          {/* Decorative Oval */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-accent/10 rounded-full" />
        </div>
      </div>
    </section>
  );
};

const GalleryGrid = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Wedding', 'Pre-Wedding', 'Portrait'];
  
  const images = [
    { id: 1, src: 'https://picsum.photos/seed/g1/800/1000', category: 'Wedding', title: 'The First Dance' },
    { id: 2, src: 'https://picsum.photos/seed/g2/800/600', category: 'Pre-Wedding', title: 'Sunset Whispers' },
    { id: 3, src: 'https://picsum.photos/seed/g3/800/1200', category: 'Portrait', title: 'Grace' },
    { id: 4, src: 'https://picsum.photos/seed/g4/800/800', category: 'Wedding', title: 'Eternal Vows' },
    { id: 5, src: 'https://picsum.photos/seed/g5/800/1000', category: 'Portrait', title: 'Soulful Eyes' },
    { id: 6, src: 'https://picsum.photos/seed/g6/800/600', category: 'Pre-Wedding', title: 'Urban Love' },
  ];

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-32 px-8 bg-warm-ink text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4 block">Our Portfolio</span>
            <h2 className="text-5xl md:text-7xl font-display">Selected Works</h2>
          </div>
          
          <div className="flex space-x-8 border-b border-white/10 pb-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-widest font-bold transition-all relative ${filter === cat ? 'text-accent' : 'text-white/40 hover:text-white'}`}
              >
                {cat}
                {filter === cat && (
                  <motion.div layoutId="underline" className="absolute -bottom-[11px] left-0 w-full h-[2px] bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((img) => (
              <motion.div 
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative group cursor-none overflow-hidden rounded-xl"
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-accent mb-2">{img.category}</span>
                  <h3 className="text-3xl font-display">{img.title}</h3>
                  <div className="mt-6 w-0 group-hover:w-full h-[1px] bg-white/30 transition-all duration-700 delay-100" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    { 
      id: '01',
      title: 'Wedding Story', 
      desc: 'A cinematic approach to your big day. We capture the grand moments and the quiet whispers.',
      price: 'Starting from $1,200'
    },
    { 
      id: '02',
      title: 'Pre-Wedding', 
      desc: 'Artistic sessions in locations that mean something to you. Let\'s tell your love story.',
      price: 'Starting from $600'
    },
    { 
      id: '03',
      title: 'Editorial Portrait', 
      desc: 'High-end portraits for individuals or brands. Studio or on-location sessions.',
      price: 'Starting from $300'
    }
  ];

  return (
    <section id="services" className="py-32 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-display mb-6">Our Services</h2>
        <p className="text-warm-ink/40 text-sm uppercase tracking-[0.3em] font-bold">Tailored experiences for your legacy</p>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-warm-ink/5 border border-warm-ink/5">
        {services.map((s, i) => (
          <motion.div 
            key={i}
            whileHover={{ backgroundColor: '#fdfcf9' }}
            className="bg-white p-12 flex flex-col justify-between group transition-all duration-500 min-h-[450px]"
          >
            <div>
              <span className="text-4xl font-display text-accent/20 mb-12 block group-hover:text-accent transition-colors">{s.id}</span>
              <h3 className="text-3xl font-display mb-6">{s.title}</h3>
              <p className="text-warm-ink/60 font-serif text-lg leading-relaxed mb-8">{s.desc}</p>
            </div>
            <div className="pt-8 border-t border-warm-ink/5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent block mb-4">{s.price}</span>
              <button className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] font-bold group-hover:translate-x-2 transition-transform">
                <span>Book Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const reviews = [
    {
      name: 'Aditya & Rina',
      text: 'Samawa Project didn\'t just take photos; they captured the soul of our wedding. The attention to detail and the way they handled the lighting was magical.',
      role: 'Wedding Couple'
    },
    {
      name: 'Budi Santoso',
      text: 'Professionalism at its finest. They made the entire process so easy and the final album is a masterpiece that we will cherish forever.',
      role: 'Event Client'
    }
  ];

  return (
    <section className="py-32 bg-accent/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center text-center">
          <Quote size={60} className="text-accent/20 mb-12" />
          <AnimatePresence mode='wait'>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl"
            >
              <p className="text-3xl md:text-4xl font-serif italic leading-relaxed text-warm-ink/80 mb-12">
                "{reviews[active].text}"
              </p>
              <h4 className="text-xl font-display mb-2">{reviews[active].name}</h4>
              <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{reviews[active].role}</span>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex space-x-4 mt-16">
            {reviews.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActive(i)}
                className={`w-12 h-[2px] transition-all duration-500 ${active === i ? 'bg-accent' : 'bg-accent/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-warm-ink text-white pt-32 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-6">
            <h2 className="text-6xl md:text-8xl font-display mb-12 leading-none">
              Let's create <br />
              <span className="italic font-light text-accent">magic together.</span>
            </h2>
            <a href="mailto:hello@samawaproject.co" className="text-2xl md:text-4xl font-serif border-b border-white/20 pb-4 hover:text-accent hover:border-accent transition-all inline-block">
              hello@samawaproject.co
            </a>
          </div>
          
          <div className="lg:col-span-3 space-y-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6">Social</h4>
              <ul className="space-y-4 text-sm font-light text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Youtube</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6">Studio</h4>
              <p className="text-sm font-light text-white/60 leading-relaxed">
                Jl. Kemang Raya No. 12 <br />
                Jakarta Selatan, 12730 <br />
                Indonesia
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:row items-center justify-between pt-12 border-t border-white/5 text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold">
          <p>© 2024 Samawa Project. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="grain selection:bg-accent selection:text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <FeaturedSection />
        <GalleryGrid />
        <ServicesSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
