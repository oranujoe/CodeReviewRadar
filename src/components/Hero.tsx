import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [headingRef.current, subheadingRef.current, ctaRef.current];
    elements.forEach((el, index) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
      }
    });
  }, []);

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-[--vc-bg] relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.1] mb-6"
          >
            <span className="glitch-text">AI</span>-Powered Code Review <span className="text-[--vc-primary]">On Autopilot</span>
          </h1>
          
          <p 
            ref={subheadingRef}
            className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            VibeCodeReview instantly analyzes your pull requests, provides risk scores, 
            suggests refactors, and generates merge checklists — all before your team sees the code.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center justify-center gap-2">
              Launch App
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="btn-secondary flex items-center justify-center">
              Watch Demo
            </button>
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto bg-[--vc-surface] border-4 border-[--vc-border] rounded-none p-1 shadow-[8px_8px_0px_0px_rgba(100,0,255,0.5)]">
            <div className="bg-[#0d0d0d] p-4 rounded-none overflow-x-auto">
              <pre className="text-left text-sm">
                <code className="text-slate-300">
                  <span className="text-[--vc-success]">// VibeCodeReview Analysis</span>{'\n'}
                  <span className="text-[--vc-primary]">const</span> <span className="text-slate-100">reviewSummary</span> = {'{'}
                    {'\n  '}<span className="text-[--vc-warning]">risk</span>: <span className="text-slate-100">'🟢 Low - Simple prop addition'</span>,
                    {'\n  '}<span className="text-[--vc-warning]">refactor</span>: <span className="text-slate-100">'Consider extracting Button component'</span>,
                    {'\n  '}<span className="text-[--vc-warning]">checklist</span>: [
                      {'\n    '}<span className="text-slate-100">'✅ Add unit tests for the new feature'</span>,
                      {'\n    '}<span className="text-slate-100">'✅ Update component story'</span>,
                      {'\n    '}<span className="text-slate-100">'⚠️ Check for missing environment variables'</span>
                    {'\n  '}]
                  {'\n'}{'}'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;