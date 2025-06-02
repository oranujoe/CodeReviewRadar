import React, { useState, useEffect } from 'react';

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

// Simple Modal Component
const Modal = ({ isOpen, onClose, title, children, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[--vc-surface] border border-[--vc-border] rounded-xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[--vc-text-secondary] hover:text-[--vc-text-primary] text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold text-[--vc-text-primary] mb-4">{title}</h3>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[--vc-accent]"></div>
          </div>
        ) : (
          <div className="text-[--vc-text-secondary] text-sm whitespace-pre-wrap max-h-[60vh] overflow-y-auto custom-scrollbar">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};


const DashboardList = () => {
  const [pullRequests, setPullRequests] = useState(initialPRs);
  
  // State for Gemini API features
  const [activePRDetails, setActivePRDetails] = useState({ id: null, title: '' });
  const [prSummary, setPrSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const [reviewTasks, setReviewTasks] = useState('');
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState('');
  const [showTasksModal, setShowTasksModal] = useState(false);

  // CSS variables and custom styles
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
      --vc-row-stripe: rgba(55, 65, 81, 0.3);
    }
    .bg-\\[--vc-bg\\] { background-color: var(--vc-bg); }
    .bg-\\[--vc-surface\\] { background-color: var(--vc-surface); }
    .bg-\\[--vc-elevated\\] { background-color: var(--vc-elevated); }
    .text-\\[--vc-text-primary\\] { color: var(--vc-text-primary); }
    .text-\\[--vc-text-secondary\\] { color: var(--vc-text-secondary); }
    .placeholder-\\[--vc-text-placeholder\\]::placeholder { color: var(--vc-text-placeholder); }
    .border-\\[--vc-border\\] { border-color: var(--vc-border); }
    .focus\\:outline-\\[--vc-accent\\]:focus { outline-color: var(--vc-accent); }
    .hover\\:shadow-\\[0_0_0_1px_var\\(--vc-accent\\)\\]:hover { box-shadow: 0 0 0 1px var(--vc-accent); }
    .bg-\\[--vc-primary\\] { background-color: var(--vc-primary); }
    .hover\\:bg-\\[--vc-accent\\]:hover { background-color: var(--vc-accent); }
    .even\\:bg-\\[--vc-row-stripe\\]:nth-child(even) { background-color: var(--vc-row-stripe); }
    .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: var(--vc-surface); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background-color: var(--vc-elevated); border-radius: 10px; border: 2px solid var(--vc-surface); }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: var(--vc-accent); }
  `;

  const callGeminiAPI = async (prompt) => {
    const apiKey = ""; // No API key needed for gemini-2.0-flash
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error:", errorData);
        throw new Error(`API request failed with status ${response.status}: ${errorData?.error?.message || 'Unknown error'}`);
      }
      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected API response structure:", result);
        throw new Error("Failed to extract text from API response. The response structure might have changed or content is missing.");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error; // Re-throw to be caught by calling function
    }
  };

  const handleSummarizePR = async (prId, prTitle) => {
    setActivePRDetails({ id: prId, title: prTitle });
    setShowSummaryModal(true);
    setIsSummaryLoading(true);
    setPrSummary('');
    setSummaryError('');

    const prompt = `Provide a concise summary for a Pull Request titled: "${prTitle}". Explain what this PR likely does and its potential impact. Keep it under 100 words.`;
    try {
      const summary = await callGeminiAPI(prompt);
      setPrSummary(summary);
    } catch (error) {
      setSummaryError(error.message || "Failed to fetch summary.");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleSuggestReviewTasks = async (prId, prTitle) => {
    setActivePRDetails({ id: prId, title: prTitle });
    setShowTasksModal(true);
    setIsTasksLoading(true);
    setReviewTasks('');
    setTasksError('');

    const prompt = `For a Pull Request titled: "${prTitle}", suggest 3-5 key things a reviewer should check or ask about. Format as a bulleted list (using '-' or '*' for bullets).`;
    try {
      const tasks = await callGeminiAPI(prompt);
      setReviewTasks(tasks);
    } catch (error) {
      setTasksError(error.message || "Failed to fetch review tasks.");
    } finally {
      setIsTasksLoading(false);
    }
  };


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
          className="w-full max-w-xl bg-[--vc-elevated] text-[--vc-text-secondary] placeholder-[--vc-text-placeholder] border border-[--vc-border] rounded-lg py-2.5 px-4 focus:outline-2 focus:outline-offset-2 focus:outline-[--vc-accent] mb-6 sm:mb-8"
        />

        {pullRequests.length > 0 ? (
          <div className="bg-[--vc-surface] border border-[--vc-border] rounded-2xl">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[700px]">
                <thead className="border-b border-[--vc-border]">
                  <tr className="bg-[--vc-elevated]/50 text-[--vc-text-secondary] uppercase text-xs font-semibold sticky top-0 z-10">
                    <th scope="col" className="py-3 px-4 text-left">Title</th>
                    <th scope="col" className="py-3 px-4 text-left">Author</th>
                    <th scope="col" className="py-3 px-4 text-left">Risk</th>
                    <th scope="col" className="py-3 px-4 text-left">Status</th>
                    <th scope="col" className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--vc-border]">
                  {pullRequests.map((pr, index) => (
                    <tr key={pr.id} className={`${index % 2 !== 0 ? 'bg-[--vc-row-stripe]' : ''} hover:bg-[--vc-elevated]/60 hover:shadow-[0_0_0_1px_var(--vc-accent)] transition-all duration-200 ease-out`}>
                      <td className="py-3 px-4 align-middle text-sm md:text-base">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[--vc-text-primary]">{pr.title}</span>
                          <button 
                            onClick={() => handleSummarizePR(pr.id, pr.title)}
                            title="Summarize PR Title"
                            className="p-1 rounded-md hover:bg-[--vc-accent]/30 text-[--vc-accent] transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                              <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.3l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.3A1.73 1.73 0 0 0 2.31 4.207l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
                            </svg>
                             {/* ✨ */}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle text-sm md:text-base">
                        <div className="flex items-center gap-2">
                          <img src={pr.avatarUrl} alt={`${pr.author}'s avatar`} className="h-8 w-8 rounded-full border-2 border-[--vc-elevated]" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/4B5563/FFFFFF?text=ERR"; }} />
                          <span className="text-[--vc-text-secondary] capitalize">{pr.author}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle">
                        {pr.riskScore <= 3 && (<span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">🎯 Low</span>)}
                        {pr.riskScore >= 4 && pr.riskScore <= 6 && (<span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/50">🔥 Medium</span>)}
                        {pr.riskScore >= 7 && (<span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/20 text-rose-300 border border-rose-500/50">💀 High</span>)}
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${pr.status === 'Open' ? 'bg-sky-700/50 text-sky-200 border border-sky-600/70' : ''} ${pr.status === 'In Review' ? 'bg-indigo-700/50 text-indigo-200 border border-indigo-600/70' : ''} ${pr.status === 'Merged' ? 'bg-purple-700/50 text-purple-200 border border-purple-600/70' : ''} ${pr.status === 'Draft' ? 'bg-slate-600/50 text-slate-300 border border-slate-500/70' : ''} ${pr.status === 'Blocked' ? 'bg-red-700/50 text-red-200 border border-red-600/70' : ''} ${!['Open', 'In Review', 'Merged', 'Draft', 'Blocked'].includes(pr.status) ? 'bg-gray-700/50 text-gray-200 border border-gray-600/70' : ''}`}>
                          {pr.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <div className="flex items-center gap-2">
                            <button className="bg-[--vc-elevated] hover:bg-[--vc-accent] text-[--vc-text-secondary] hover:text-[--vc-text-primary] font-medium text-xs py-1.5 px-3 rounded-md border border-[--vc-border] transition-all duration-200 ease-out focus:outline-2 focus:outline-offset-1 focus:outline-[--vc-accent] hover:scale-[1.03] hover:border-[--vc-accent]">
                                View Details
                            </button>
                            <button 
                                onClick={() => handleSuggestReviewTasks(pr.id, pr.title)}
                                title="Suggest Review Tasks"
                                className="flex items-center gap-1 bg-[--vc-elevated] hover:bg-[--vc-accent] text-[--vc-text-secondary] hover:text-[--vc-text-primary] font-medium text-xs py-1.5 px-3 rounded-md border border-[--vc-border] transition-all duration-200 ease-out focus:outline-2 focus:outline-offset-1 focus:outline-[--vc-accent] hover:scale-[1.03] hover:border-[--vc-accent]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                                  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.3l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.3A1.73 1.73 0 0 0 2.31 4.207l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
                                </svg>
                                Suggest Tasks
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] min-h-[384px] bg-[--vc-surface] border border-[--vc-border] rounded-2xl p-6 text-center">
            <img src="https://placehold.co/128x128/374151/E2E8F0?text=🚀" alt="Rocket illustration indicating no pull requests" className="h-24 sm:h-32 mb-6 opacity-75" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/128x128/4B5563/FFFFFF?text=EMPTY"; }} />
            <h3 className="text-[--vc-text-primary] text-xl sm:text-2xl font-semibold mb-2">No Pull Requests Yet</h3>
            <p className="text-[--vc-text-secondary] text-sm sm:text-base mb-6 max-w-xs">Connect a repository to VibeCodeReview Radar to start surfacing active PRs and their risk levels.</p>
            <button className="bg-[--vc-primary] hover:bg-[--vc-accent] text-white font-semibold py-2.5 px-6 rounded-lg border border-[--vc-border] transition-all duration-200 ease-out hover:scale-[1.03] focus:outline-2 focus:outline-offset-2 focus:outline-[--vc-accent]">
              Connect Repository
            </button>
          </div>
        )}
        <footer className="text-center mt-8 py-4 border-t border-[--vc-border]/30">
            <p className="text-xs text-[--vc-text-secondary]">VibeCodeReview Radar &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>

      {/* Modals for Gemini Features */}
      <Modal 
        isOpen={showSummaryModal} 
        onClose={() => setShowSummaryModal(false)} 
        title={`✨ Summary for: ${activePRDetails.title}`}
        isLoading={isSummaryLoading}
      >
        {summaryError ? <p className="text-rose-400">{summaryError}</p> : prSummary}
      </Modal>

      <Modal 
        isOpen={showTasksModal} 
        onClose={() => setShowTasksModal(false)} 
        title={`✨ Suggested Tasks for: ${activePRDetails.title}`}
        isLoading={isTasksLoading}
      >
        {tasksError ? <p className="text-rose-400">{tasksError}</p> : reviewTasks}
      </Modal>
    </>
  );
};

export default DashboardList;
