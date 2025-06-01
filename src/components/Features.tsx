import React, { useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Gauge, 
  FileCode, 
  CheckCircle, 
  GitBranch, 
  Shield 
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fadeInUp');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Sparkles className="feature-icon" />,
      title: "AI Code Summaries",
      description: "Get concise, intelligent summaries of what changed in each PR, saving reviewers precious time."
    },
    {
      icon: <Gauge className="feature-icon" />,
      title: "Emoji Risk Scoring",
      description: "Visual risk assessment at a glance with our emoji-based scoring system from 🟢 (safe) to 🔴 (risky)."
    },
    {
      icon: <FileCode className="feature-icon" />,
      title: "Refactor Suggestions",
      description: "Ready-to-paste code improvements that enhance readability and performance."
    },
    {
      icon: <CheckCircle className="feature-icon" />,
      title: "Pre-Merge Checklists",
      description: "Automatically generated checklists to ensure no critical steps are missed before merging."
    },
    {
      icon: <GitBranch className="feature-icon" />,
      title: "GitHub Integration",
      description: "Seamlessly integrates with GitHub's PR workflow without changing how your team works."
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Security Focus",
      description: "Proactively identifies potential security vulnerabilities and suggests secure alternatives."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="features"
      className="py-16 bg-[--vc-bg] relative mt-[-40px]"
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">
            <span className="text-[--vc-primary]">Supercharge</span> Your Code Reviews
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            VibeCodeReview Radar combines AI-powered analysis with developer-focused workflows 
            to make code reviews faster, more thorough, and actually enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;