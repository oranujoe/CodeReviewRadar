import React, { useState } from 'react';
import { Stars } from 'lucide-react';
import Modal from '../components/dashboard/Modal';
import RiskBadge from '../components/dashboard/RiskBadge';
import StatusBadge from '../components/dashboard/StatusBadge';
import EmptyState from '../components/dashboard/EmptyState';
import { callGeminiAPI } from '../services/gemini';
import { neobrutalistStyles } from '../styles/dashboard';

// Types
interface PullRequest {
  id: number;
  title: string;
  author: string;
  avatarUrl: string;
  riskScore: number;
  status: string;
}

interface ActivePRDetails {
  id: number | null;
  title: string;
}

// Initial data
const initialPRs: PullRequest[] = [
  { id: 1, title: 'Fix critical login vulnerability and add MFA support', author: 'vera', avatarUrl: 'https://placehold.co/32x32/7C3AED/FFFFFF?text=V', riskScore: 2, status: 'Open' },
  { id: 2, title: 'Implement new Dark Mode theme across all user-facing components', author: 'alex', avatarUrl: 'https://placehold.co/32x32/DB2777/FFFFFF?text=A', riskScore: 5, status: 'In Review' },
  { id: 3, title: 'Update core dependencies to latest versions (React 19, Node 22)', author: 'sam', avatarUrl: 'https://placehold.co/32x32/16A34A/FFFFFF?text=S', riskScore: 7, status: 'Open' },
  { id: 4, title: 'Refactor global navigation bar for improved accessibility and performance', author: 'jamie', avatarUrl: 'https://placehold.co/32x32/EA580C/FFFFFF?text=J', riskScore: 3, status: 'Merged' },
  { id: 5, title: 'Enhance back-end error logging and reporting mechanisms with Sentry integration', author: 'morgan', avatarUrl: 'https://placehold.co/32x32/0284C7/FFFFFF?text=M', riskScore: 6, status: 'Draft' },
  { id: 6, title: 'Optimize database queries for user profile loading', author: 'casey', avatarUrl: 'https://placehold.co/32x32/E11D48/FFFFFF?text=C', riskScore: 4, status: 'In Review' },
  { id: 7, title: 'Develop PoC for real-time collaboration feature', author: 'drew', avatarUrl: 'https://placehold.co/32x32/581C87/FFFFFF?text=D', riskScore: 8, status: 'Blocked' },
];

const Dashboard = () => {
  const [pullRequests] = useState<PullRequest[]>(initialPRs);
  const [activePRDetails, setActivePRDetails] = useState<ActivePRDetails>({ id: null, title: '' });
  
  // Modal states
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [prSummary, setPrSummary] = useState('');
  const [reviewTasks, setReviewTasks] = useState('');
  const [summaryError, setSummaryError] = useState('');
  const [tasksError, setTasksError] = useState('');

  const handleSummarizePR = async (prId: number, prTitle: string) => {
    setActivePRDetails({ id: prId, title: prTitle });
    setShowSummaryModal(true);
    setIsSummaryLoading(true);
    setPrSummary('');
    setSummaryError('');

    try {
      const summary = await callGeminiAPI(
        `Provide a concise summary for a Pull Request titled: "${prTitle}". Explain what this PR likely does and its potential impact. Keep it under 100 words.`
      );
      setPrSummary(summary);
    } catch (error) {
      setSummaryError(error instanceof Error ? error.message : "Failed to fetch summary.");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleSuggestReviewTasks = async (prId: number, prTitle: string) => {
    setActivePRDetails({ id: prId, title: prTitle });
    setShowTasksModal(true);
    setIsTasksLoading(true);
    setReviewTasks('');
    setTasksError('');

    try {
      const tasks = await callGeminiAPI(
        `For a Pull Request titled: "${prTitle}", suggest 3-5 key things a reviewer should check or ask about. Format as a bulleted list (using '-' or '*' for bullets).`
      );
      setReviewTasks(tasks);
    } catch (error) {
      setTasksError(error instanceof Error ? error.message : "Failed to fetch review tasks.");
    } finally {
      setIsTasksLoading(false);
    }
  };

  return (
    <>
      <style>{neobrutalistStyles}</style>
      <div className="min-h-screen bg-[--vc-bg] p-4 sm:p-8 font-['Inter',_sans-serif] text-[--vc-text-primary]">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[--vc-text-primary] mb-2">
            VibeCodeReview Radar
          </h1>
          <p className="text-[--vc-text-secondary] text-sm sm:text-base">
            Active Pull Requests Overview
          </p>
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
                    <th scope="col\" className="py-3 px-4 text-left">Title</th>
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
                            <Stars className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle text-sm md:text-base">
                        <div className="flex items-center gap-2">
                          <img 
                            src={pr.avatarUrl} 
                            alt={`${pr.author}'s avatar`} 
                            className="h-8 w-8 rounded-full border-2 border-[--vc-elevated]" 
                            onError={(e) => { e.currentTarget.src="https://placehold.co/32x32/4B5563/FFFFFF?text=ERR"; }} 
                          />
                          <span className="text-[--vc-text-secondary] capitalize">{pr.author}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <RiskBadge score={pr.riskScore} />
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <StatusBadge status={pr.status} />
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
                            <Stars className="h-3 w-3" />
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
          <EmptyState />
        )}

        <footer className="text-center mt-8 py-4 border-t border-[--vc-border]/30">
          <p className="text-xs text-[--vc-text-secondary]">
            VibeCodeReview Radar &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>

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

export default Dashboard;