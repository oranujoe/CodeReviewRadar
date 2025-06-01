import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  delay 
}) => {
  return (
    <div 
      className={`feature-card neobrutalist-card opacity-0`}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
};

export default FeatureCard;