import React, { useState } from 'react';
import { Stars, LogOut, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePullRequests } from '../hooks/usePullRequests';
import Modal from '../components/dashboard/Modal';
import RiskBadge from '../components/dashboard/RiskBadge';
import StatusBadge from '../components/dashboard/StatusBadge';
import EmptyState from '../components/dashboard/EmptyState';
import { callGeminiAPI } from '../services/gemini';
import { neobrutalistStyles } from '../styles/dashboard';

interface ActivePRDetails {
  id: string | null;
  title: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { pullRequests, loading, error, refreshPullRequests } = usePullRequests();
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

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSummarizePR = async (prId: string, prTitle: string) => {
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

  const handleSuggestReviewTasks = async (prId: string, prTitle: string) => {
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

  if (loading) {
    return (
      <>
        <style>{neobrutalistStyles}</style>
        <div className="min-h-screen bg-[--vc-bg] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--vc-primary] mx-auto mb-4"></div>
            <p className="text-slate-300">Loading your pull requests...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{neobrutalistStyles}</style>
      <div className="min-h-screen bg-[--vc-bg] p-4 sm:p-8 font-['Inter',_sans-serif] text-[--vc-text-primary]">
        <header className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[--vc-text-primary] mb-2">
              VibeCodeReview Radar
            </h1>
            <p className="text-[--vc-text-secondary] text-sm sm:text-base">
              Welcome back, {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshPullRequests}
              className="flex items-center gap-2 bg-[--vc-elevated] hover:bg-[--vc-accent] text-[--vc-text-secondary] hover:text-[--vc-text-primary] font-medium text-sm py-2 px-4 rounded-md border border-[--vc-border] transition-all duration-200 ease-out focus:outline-2 focus:outline-offset-1 focus:outline-[--vc-accent]"
              title="Refresh pull requests"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-200 font-medium text-sm py-2 px-4 rounded-md border border-red-500/50 transition-all duration-200 ease-out focus:outline-2 focus:outline-offset-1 focus:outline-red-500"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border-2 border-red-500 rounded-none">
            <p className="text-red-200">{error}</p>
          </div>
        )}

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
                            <Stars className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle text-sm md:text-base">
                        <div className="flex items-center gap-2">
                          <img 
                            src={pr.author_avatar_url || `https://placehold.co/32x32/4B5563/FFFFFF?text=${pr.author_github_username.charAt(0).toUpperCase()}`} 
                            alt={`${pr.author_github_username}'s avatar`} 
                            className="h-8 w-8 rounded-full border-2 border-[--vc-elevated]" 
                            onError={(e) => { e.currentTarget.src=`https://placehold.co/32x32/4B5563/FFFFFF?text=${pr.author_github_username.charAt(0).toUpperCase()}`; }} 
                          />
                          <span className="text-[--vc-text-secondary] capitalize">{pr.author_github_username}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <RiskBadge score={pr.risk_score} />
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <StatusBadge status={pr.status} />
                      </td>
                      <td className="py-3 px-4 align-middle">
                        <div className="flex items-center gap-2">
                          {pr.github_url && (
                            <a
                              href={pr.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[--vc-elevated] hover:bg-[--vc-accent] text-[--vc-text-secondary] hover:text-[--vc-text-primary] font-medium text-xs py-1.5 px-3 rounded-md border border-[--vc-border] transition-all duration-200 ease-out focus:outline-2 focus:outline-offset-1 focus:outline-[--vc-accent] hover:scale-[1.03] hover:border-[--vc-accent]"
                            >
                              View on GitHub
                            </a>
                          )}
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