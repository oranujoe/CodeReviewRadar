import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  github_username?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Repository {
  id: string;
  owner_id: string;
  name: string;
  github_repo_id?: number;
  github_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PullRequest {
  id: string;
  repository_id: string;
  github_pr_id?: number;
  title: string;
  description: string;
  author_github_username: string;
  author_avatar_url?: string;
  status: 'open' | 'closed' | 'merged' | 'draft' | 'in_review' | 'blocked';
  risk_score: number;
  github_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AIReview {
  id: string;
  pull_request_id: string;
  summary?: string;
  review_tasks?: string;
  refactor_suggestions?: string;
  security_notes?: string;
  generated_at: string;
}