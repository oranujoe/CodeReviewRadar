import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserPullRequests } from '../services/database';
import type { PullRequest } from '../lib/supabase';

export const usePullRequests = () => {
  const { user } = useAuth();
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPullRequests = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const prs = await getUserPullRequests(user.id);
        setPullRequests(prs || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching pull requests:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch pull requests');
      } finally {
        setLoading(false);
      }
    };

    fetchPullRequests();
  }, [user]);

  const refreshPullRequests = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const prs = await getUserPullRequests(user.id);
      setPullRequests(prs || []);
      setError(null);
    } catch (err) {
      console.error('Error refreshing pull requests:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh pull requests');
    } finally {
      setLoading(false);
    }
  };

  return {
    pullRequests,
    loading,
    error,
    refreshPullRequests,
  };
};