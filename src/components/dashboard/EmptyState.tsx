import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] min-h-[384px] bg-[--vc-surface] border border-[--vc-border] rounded-2xl p-6 text-center">
      <img 
        src="https://placehold.co/128x128/374151/E2E8F0?text=🚀" 
        alt="Rocket illustration indicating no pull requests" 
        className="h-24 sm:h-32 mb-6 opacity-75"
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/128x128/4B5563/FFFFFF?text=EMPTY"; }}
      />
      <h3 className="text-[--vc-text-primary] text-xl sm:text-2xl font-semibold mb-2">
        No Pull Requests Yet
      </h3>
      <p className="text-[--vc-text-secondary] text-sm sm:text-base mb-6 max-w-xs">
        Connect a repository to VibeCodeReview Radar to start surfacing active PRs and their risk levels.
      </p>
      <button className="bg-[--vc-primary] hover:bg-[--vc-accent] text-white font-semibold py-2.5 px-6 rounded-lg border border-[--vc-border] transition-all duration-200 ease-out hover:scale-[1.03] focus:outline-2 focus:outline-offset-2 focus:outline-[--vc-accent]">
        Connect Repository
      </button>
    </div>
  );
};

export default EmptyState;