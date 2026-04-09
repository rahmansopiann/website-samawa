/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
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
  X
} from 'lucide-react';
import { useState, useRef } from 'react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-warm-bg/80 backdrop-blur-md border-b border-warm-ink/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold tracking-tight"
        >
          Samawa Project<span className="text-accent">.co</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm uppercase tracking-widest font-medium hover:text-accent transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-warm-bg border-b border-warm-ink/5 overflow-hidden"
        >
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center pt-20">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://picsum.photos/seed/wedding/1920/1080" 
          alt="Hero" 
          className="w-full h-full object-cover brightness-75"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="relative z-10 text-center text-white px-6">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block text-sm uppercase tracking-[0.3em] mb-4 font-medium"
        >
          Capturing Your Eternal Moments
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-serif mb-8 leading-tight"
        >
          Samawa Project<span className="text-accent">.co</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <a 
            href="#gallery" 
            className="inline-flex items-center space-x-2 border border-white/30 px-8 py-4 rounded-full hover:bg-white hover:text-warm-ink transition-all duration-300 backdrop-blur-sm"
          >
            <span className="uppercase tracking-widest text-xs font-bold">View Portfolio</span>
            <ChevronRight size={16} />
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-[1px] h-12 bg-white/30 mx-auto" />
      </motion.div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    { id: 1, src: 'https://picsum.photos/seed/p1/800/1000', title: 'Wedding Bliss', category: 'Wedding' },
    { id: 2, src: 'https://picsum.photos/seed/p2/800/600', title: 'Pre-Wedding Joy', category: 'Pre-Wedding' },
    { id: 3, src: 'https://picsum.photos/seed/p3/800/1200', title: 'Elegant Portraits', category: 'Portrait' },
    { id: 4, src: 'https://picsum.photos/seed/p4/800/800', title: 'Family Love', category: 'Family' },
    { id: 5, src: 'https://picsum.photos/seed/p5/800/1000', title: 'The Vows', category: 'Wedding' },
    { id: 6, src: 'https://picsum.photos/seed/p6/800/600', title: 'Golden Hour', category: 'Pre-Wedding' },
  ];

  return (
    <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Gallery</h2>
        <div className="w-20 h-[1px] bg-accent mx-auto mb-6" />
        <p className="text-warm-ink/60 max-w-xl mx-auto font-light">
          A collection of stories told through the lens, capturing emotions that last a lifetime.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img) => (
          <motion.div 
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer overflow-hidden rounded-2xl"
          >
            <img 
              src={img.src} 
              alt={img.title} 
              className="w-full transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-warm-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase tracking-widest mb-2">{img.category}</span>
              <h3 className="text-2xl font-serif">{img.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { 
      title: 'Wedding Photography', 
      desc: 'Complete coverage of your special day, from preparation to the final dance.',
      icon: <Heart className="text-accent" size={32} />
    },
    { 
      title: 'Pre-Wedding Session', 
      desc: 'Creative and romantic sessions in beautiful locations to celebrate your engagement.',
      icon: <Camera className="text-accent" size={32} />
    },
    { 
      title: 'Event & Celebration', 
      desc: 'Capturing the energy and moments of your corporate events, birthdays, and parties.',
      icon: <Calendar className="text-accent" size={32} />
    }
  ];

  return (
    <section id="services" className="py-24 bg-white/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-4 block">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Professional Services Tailored to You</h2>
            <p className="text-warm-ink/60 mb-8 font-light leading-relaxed">
              We believe every client has a unique story. Our approach is to blend into your event, capturing candid moments while providing professional guidance for stunning portraits.
            </p>
            <div className="space-y-8">
              {services.map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-6"
                >
                  <div className="mt-1">{s.icon}</div>
                  <div>
                    <h3 className="text-xl font-serif mb-2">{s.title}</h3>
                    <p className="text-sm text-warm-ink/60 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://picsum.photos/seed/service/800/1000" 
                alt="Service" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent rounded-full -z-10 opacity-20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: 'Sarah & David',
      text: 'Samawa Project captured our wedding so beautifully. Every time we look at the photos, we feel like we are back in that moment. Truly professional and artistic.',
      date: 'October 2023'
    },
    {
      name: 'Michael Chen',
      text: 'The pre-wedding session was so much fun! They made us feel comfortable and the results were beyond our expectations. Highly recommended!',
      date: 'August 2023'
    },
    {
      name: 'The Roberts Family',
      text: 'Amazing family portraits. They were so patient with our kids and managed to get the most natural smiles. We will definitely use their services again.',
      date: 'December 2023'
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Client Stories</h2>
        <div className="w-20 h-[1px] bg-accent mx-auto" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-sm border border-warm-ink/5 relative"
          >
            <Quote className="text-accent/20 absolute top-8 right-8" size={48} />
            <p className="text-warm-ink/70 italic mb-8 relative z-10 font-light leading-relaxed">
              "{r.text}"
            </p>
            <div>
              <h4 className="font-serif text-lg">{r.name}</h4>
              <span className="text-xs text-warm-ink/40 uppercase tracking-widest">{r.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-warm-ink text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-serif mb-6">Samawa Project<span className="text-accent">.co</span></h2>
            <p className="text-white/50 max-w-md mb-8 font-light leading-relaxed">
              We are a team of passionate photographers dedicated to capturing the beauty of life's most precious moments. Based in Indonesia, available worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-accent">Contact Us</h4>
            <ul className="space-y-6 text-sm text-white/70 font-light">
              <li className="flex items-center space-x-4">
                <Phone size={16} className="text-accent" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail size={16} className="text-accent" />
                <span>hello@samawaproject.co</span>
              </li>
              <li className="flex items-center space-x-4">
                <MapPin size={16} className="text-accent" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-accent">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/70 font-light">
              <li><a href="#" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="#testimonials" className="hover:text-accent transition-colors">Testimonials</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between text-xs text-white/30 uppercase tracking-widest">
          <p>© 2024 Samawa Project.co. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Crafted with passion</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
