import React from 'react';
import { CheckCircle, Flame, AlertCircle } from 'lucide-react';

interface RiskBadgeProps {
  score: number;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ score }) => {
  if (score <= 3) {
    return (
      <span className="inline-flex items-center gap-1 bg-emerald-600/20 text-emerald-300 px-2 py-0.5 rounded-md text-xs font-medium border border-emerald-500/50">
        <CheckCircle className="h-4 w-4" /> Low
      </span>
    );
  }

  if (score >= 4 && score <= 6) {
    return (
      <span className="inline-flex items-center gap-1 bg-amber-600/20 text-amber-300 px-2 py-0.5 rounded-md text-xs font-medium border border-amber-500/50">
        <Flame className="h-4 w-4" /> Medium
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 bg-rose-600/20 text-rose-300 px-2 py-0.5 rounded-md text-xs font-medium border border-rose-500/50">
      <AlertCircle className="h-4 w-4" /> High
    </span>
  );
};

export default RiskBadge;