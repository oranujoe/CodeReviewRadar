import { supabase } from '../lib/supabase';
import type { User, Repository, PullRequest, AIReview } from '../lib/supabase';

// User operations
export const createUser = async (userData: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateUser = async (id: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Repository operations
export const createRepository = async (repoData: Partial<Repository>) => {
  const { data, error } = await supabase
    .from('repositories')
    .insert(repoData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserRepositories = async (userId: string) => {
  const { data, error } = await supabase
    .from('repositories')
    .select('*')
    .eq('owner_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getRepositoryById = async (id: string) => {
  const { data, error } = await supabase
    .from('repositories')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Pull request operations
export const createPullRequest = async (prData: Partial<PullRequest>) => {
  const { data, error } = await supabase
    .from('pull_requests')
    .insert(prData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getPullRequestsByRepository = async (repositoryId: string) => {
  const { data, error } = await supabase
    .from('pull_requests')
    .select('*')
    .eq('repository_id', repositoryId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getUserPullRequests = async (userId: string) => {
  const { data, error } = await supabase
    .from('pull_requests')
    .select(`
      *,
      repositories!inner(
        id,
        name,
        owner_id
      )
    `)
    .eq('repositories.owner_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const updatePullRequest = async (id: string, updates: Partial<PullRequest>) => {
  const { data, error } = await supabase
    .from('pull_requests')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// AI Review operations
export const createAIReview = async (reviewData: Partial<AIReview>) => {
  const { data, error } = await supabase
    .from('ai_reviews')
    .insert(reviewData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getAIReviewByPullRequest = async (pullRequestId: string) => {
  const { data, error } = await supabase
    .from('ai_reviews')
    .select('*')
    .eq('pull_request_id', pullRequestId)
    .order('generated_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
  return data;
};

export const updateAIReview = async (id: string, updates: Partial<AIReview>) => {
  const { data, error } = await supabase
    .from('ai_reviews')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Search and filtering
export const searchPullRequests = async (userId: string, query: string) => {
  const { data, error } = await supabase
    .from('pull_requests')
    .select(`
      *,
      repositories!inner(
        id,
        name,
        owner_id
      )
    `)
    .eq('repositories.owner_id', userId)
    .or(`title.ilike.%${query}%,author_github_username.ilike.%${query}%,status.ilike.%${query}%`)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};