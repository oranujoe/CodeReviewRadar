import React from 'react';

const SocialProof = () => {
  const companies = [
    { name: 'TechCorp', width: 'w-32' },
    { name: 'DevStream', width: 'w-36' },
    { name: 'CodeLabs', width: 'w-28' },
    { name: 'ByteWorks', width: 'w-32' },
    { name: 'SyntaxAI', width: 'w-36' },
    { name: 'GitFlow', width: 'w-28' }
  ];

  return (
    <section id="testimonials" className="py-12 bg-[--vc-surface] border-y-4 border-[--vc-border]">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-lg font-medium uppercase tracking-wider text-slate-300">
            Trusted by <span className="text-[--vc-primary] font-bold">50+</span> Open Source Projects
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {companies.map((company, index) => (
            <div 
              key={index} 
              className={`${company.width} h-12 flex items-center justify-center transition-opacity duration-150 hover:opacity-100 opacity-80`}
            >
              <div className="bg-[--vc-bg] border-2 border-[--vc-border] p-2 h-full w-full flex items-center justify-center">
                <span className="text-slate-300 font-bold text-sm uppercase tracking-wider">{company.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;