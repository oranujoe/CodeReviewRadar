import React from 'react';
import { Code2, Twitter, Github, Linkedin } from 'lucide-react';

interface FooterProps {
  onLaunchApp: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLaunchApp }) => {
  return (
    <footer className="bg-vc-bg pt-16 pb-8 border-t-4 border-vc-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-8 w-8 text-vc-primary" />
              <span className="font-bold text-xl uppercase tracking-tight">VibeCode</span>
            </div>
            <p className="text-slate-300 mb-4">
              AI-powered code reviews that save time and improve code quality.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-300 hover:text-vc-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-vc-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-vc-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links columns */}
          <div>
            <h4 className="font-bold text-lg mb-4 uppercase text-slate-100">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Beta Program</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 uppercase text-slate-100">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 uppercase text-slate-100">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        {/* Early access form */}
        <div className="border-4 border-vc-border bg-vc-surface p-8 mb-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">Launch App Now</h3>
          <p className="text-slate-300 mb-6 text-center">
            Be among the first to experience VibeCodeReview Radar and revolutionize your code review process.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow py-3 px-4 bg-vc-bg border-4 border-vc-border text-white focus:border-vc-primary focus:outline-none"
            />
            <button onClick={(e) => { e.preventDefault(); onLaunchApp(); }} type="submit" className="btn-primary whitespace-nowrap">
              Launch App
            </button>
          </form>
        </div>
        
        {/* Copyright */}
        <div className="text-center border-t border-vc-border pt-8">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} VibeCodeReview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;