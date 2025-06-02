import React, { useState } from 'react';

// Dummy data for pull requests
const initialPRs = [
  { id: 1, title: 'Fix critical login vulnerability and add MFA support', author: 'vera', avatarUrl: 'https://placehold.co/32x32/7C3AED/FFFFFF?text=V', riskScore: 2, status: 'Open' },
  { id: 2, title: 'Implement new Dark Mode theme across all user-facing components', author: 'alex', avatarUrl: 'https://placehold.co/32x32/DB2777/FFFFFF?text=A', riskScore: 5, status: 'In Review' },
  { id: 3, title: 'Update core dependencies to latest versions (React 19, Node 22)', author: 'sam', avatarUrl: 'https://placehold.co/32x32/16A34A/FFFFFF?text=S', riskScore: 7, status: 'Open' },
  { id: 4, title: 'Refactor global navigation bar for improved accessibility and performance', author: 'jamie', avatarUrl: 'https://placehold.co/32x32/EA580C/FFFFFF?text=J', riskScore: 3, status: 'Merged' },
  { id: 5, title: 'Enhance back-end error logging and reporting mechanisms with Sentry integration', author: 'morgan', avatarUrl: 'https://placehold.co/32x32/0284C7/FFFFFF?text=M', riskScore: 6, status: 'Draft' },
  { id: 6, title: 'Optimize database queries for user profile loading', author: 'casey', avatarUrl: 'https://placehold.co/32x32/E11D48/FFFFFF?text=C', riskScore: 4, status: 'In Review' },
  { id: 7, title: 'Develop PoC for real-time collaboration feature', author: 'drew', avatarUrl: 'https://placehold.co/32x32/581C87/FFFFFF?text=D', riskScore: 8, status: 'Blocked' },
];

const DashboardList = () => {
  const [pullRequests, setPullRequests] = useState(initialPRs);

  const neobrutalistStyles = `
    :root {
      --vc-bg: #111827;
      --vc-surface: #1f2937;
      --vc-elevated: #374151;
      --vc-border: #000000;
      --vc-accent: #3b82f6;
      --vc-primary: #2563eb;
      --vc-text-primary: #f9fafb;
      --vc-text-secondary: #d1d5db;
      --vc-text-placeholder: #6b7280;
    }
    .shadow-vc-card {
      box-shadow: 4px 4px 0px 0px var(--vc-border);
    }
    .bg-\\[--vc-bg\\] { background-color: var(--vc-bg); }
    .bg-\\[--vc-surface\\] { background-color: var(--vc-surface); }
    .bg-\\[--vc-elevated\\] { background-color: var(--vc-elevated); }
    .text-\\[--vc-text-primary\\] { color: var(--vc-text-primary); }
    .text-\\[--vc-text-secondary\\] { color: var(--vc-text-secondary); }
    .placeholder-\\[--vc-text-placeholder\\]::placeholder { color: var(--vc-text-placeholder); }
    .border-\\[--vc-border\\] { border-color: var(--vc-border); }
    .focus\\:outline-\\[--vc-accent\\]:focus { outline-color: var(--vc-accent); }
    .hover\\:shadow-\\[0_0_0_1px_var\\(--vc-accent\\)\\]:hover {
        box-shadow: 0 0 0 1px var(--vc-accent), 4px 4px 0px 0px var(--vc-border);
    }
    .bg-\\[--vc-primary\\] { background-color: var(--vc-primary); }
    .hover\\:bg-\\[--vc-accent\\]:hover { background-color: var(--vc-accent); }

    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: var(--vc-surface);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: var(--vc-elevated);
      border-radius: 10px;
      border: 2px solid var(--vc-surface);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: var(--vc-accent);
    }
  `;

  return (
    <>
      <style>{neobrutalistStyles}</style>
      <div className="min-h-screen bg-[--vc-bg] p-4 sm:p-8 font-['Inter',_sans-serif] text-[--vc-text-primary]">
        <header className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[--vc-text-primary] mb-2">VibeCodeReview Radar</h1>
            <p className="text-[--vc-text-secondary] text-sm sm:text-base">Active Pull Requests Overview</p>
        </header>

        <input
          type="text"
          placeholder="Search PRs by title, author, or status…"
          className="
            w-full max-w-xl
            bg-[--vc-elevated]
            text-[--vc-text-secondary] placeholder-[--vc-text-placeholder]
            border border-[--vc-border]
            rounded-lg py-2.5 px-4
            focus:outline-2 focus:outline-offset-2 focus:outline-[--vc-accent]
            mb-6 sm:mb-8
            shadow-vc-card
          "
        />

        {pullRequests.length > 0 ? (
          <div className="
            bg-[--vc-surface]
            border border-[--vc-border]
            rounded-2xl shadow-vc-card
          ">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[700px]">
                <thead className="border-b border-[--vc-border]">
                  <tr className="
                    bg-[--vc-elevated]/50
                    text-[--vc-text-secondary] uppercase text-xs font-semibold
                    sticky top-0 z-10
                  ">
                    <th scope="col\" className="py-3 px-4 text-left">Title</th>
                    <th scope="col" className="py-3 px-4 text-left">Author</th>
                    <th scope="col" className="py-3 px-4 text-left">Risk</th>
                    <th scope="col" className="py-3 px-4 text-left">Status</th>
                    <th scope="col" className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--vc-border]">
                  {pullRequests.map((pr, index) => (
                    <tr key={pr.id} className={`
                      ${index % 2 === 0 ? 'bg-[--vc-surface]' : 'bg-[--vc-elevated]/20'}
                      hover:bg-[--vc-elevated]/40
                      hover:shadow-[0_0_0_1px_var(--vc-accent)]
                      transition-all duration-200 ease-out
                    `}>
                      <td className="py-3 px-4 align-middle text-sm md:text-base">
                        <span className="font-medium text-[--vc-text-primary]">{pr.title}</span>
                      </td>
                      <td className="py-3 px-4 align-middle text-sm md:text-base">
                        <div className="flex items-center gap-2">
                          <img 
                            src={pr.avatarUrl} 
                            alt={`${pr.author}'s avatar`} 
                            className="h-8 w-8 rounded-full border-2 border-[--vc-elevated]"
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/4B5563/FFFFFF?text=ERR"; }}
                          />
                          <span className="text-[--vc-text-secondary] capitalize">{pr.author}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle">
                        {pr.riskScore <= 3 && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                            🎯 Low
                          </span>
                        )}
                        {pr.riskScore >= 4 && pr.riskScore <= 6 && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/50">
                            🔥 Medium
                          </span>
                        )}
                        {pr.riskScore >= 7 && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/20 text-rose-300 border border-rose-500/50">
                            💀 High
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium
                          ${pr.status === 'Open' ? 'bg-sky-700/50 text-sky-200 border border-sky-600/70' : ''}
                          ${pr.status === 'In Review' ? 'bg-indigo-700/50 text-indigo-200 border border-indigo-600/70' : ''}
                          ${pr.status === 'Merged' ? 'bg-purple-700/50 text-purple-200 border border-purple-600/70' : ''}
                          ${pr.status === 'Draft' ? 'bg-slate-600/50 text-slate-300 border border-slate-500/70' : ''}
                          ${pr.status === 'Blocked' ? 'bg-red-700/50 text-red-200 border border-red-600/70' : ''}
                          ${!['Open', 'In Review', 'Merged', 'Draft', 'Blocked'].includes(pr.status) ? 'bg-gray-700/50 text-gray-200 border border-gray-600/70' : ''}
                        `}>
                          {pr.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <button className="
                            bg-[--vc-elevated] hover:bg-[--vc-accent]
                            text-[--vc-text-secondary] hover:text-[--vc-text-primary]
                            font-medium text-xs
                            py-1.5 px-3
                            rounded-md border border-[--vc-border]
                            transition-all duration-200 ease-out
                            focus:outline-2 focus:outline-offset-1 focus:outline-[--vc-accent]
                            hover:scale-[1.03] shadow-vc-card hover:border-[--vc-accent]
                        ">
                            View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="
            flex flex-col items-center justify-center
            h-[calc(100vh-250px)] min-h-[384px]
            bg-[--vc-surface]
            border border-[--vc-border]
            rounded-2xl shadow-vc-card
            p-6 text-center
          ">
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
            <button className="
              bg-[--vc-primary] hover:bg-[--vc-accent]
              text-white font-semibold
              py-2.5 px-6
              rounded-lg
              border border-[--vc-border]
              shadow-vc-card
              transition-all duration-200 ease-out
              hover:scale-[1.03]
              focus:outline-2 focus:outline-offset-2 focus:outline-[--vc-accent]
            ">
              Connect Repository
            </button>
          </div>
        )}
        <footer className="text-center mt-8 py-4 border-t border-[--vc-border]/30">
            <p className="text-xs text-[--vc-text-secondary]">
                VibeCodeReview Radar &copy; {new Date().getFullYear()}
            </p>
        </footer>
      </div>
    </>
  );
};

export default DashboardList;