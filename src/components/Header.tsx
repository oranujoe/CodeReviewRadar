import React, { useState, useEffect } from 'react';
import { Code2, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[--vc-surface] shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <Code2 className="h-8 w-8 text-[--vc-primary]" />
          <span className="font-bold text-xl uppercase tracking-tight">VibeCode</span>
        </a>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-300 hover:text-white font-medium">Features</a>
          <a href="#testimonials" className="text-slate-300 hover:text-white font-medium">Testimonials</a>
          <a href="#pricing" className="text-slate-300 hover:text-white font-medium">Pricing</a>
          <button className="btn-primary">Launch App</button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[--vc-surface] border-t-4 border-[--vc-border] mt-3">
          <div className="container py-4 flex flex-col gap-4">
            <a 
              href="#features" 
              className="text-slate-300 hover:text-white font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-slate-300 hover:text-white font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#pricing" 
              className="text-slate-300 hover:text-white font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <button className="btn-primary mt-2">Launch App</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;