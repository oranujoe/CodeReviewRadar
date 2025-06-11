import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are not set
let supabase;

if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'your_supabase_project_url_here' || 
    supabaseAnonKey === 'your_supabase_anon_key_here') {
  
  console.warn('Supabase environment variables not configured. Using mock client.');
  
  // Create a mock Supabase client for development
  supabase = {
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
          limit: () => Promise.resolve({ data: [], error: null }),
          order: () => ({ 
            limit: () => Promise.resolve({ data: [], error: null })
          })
        }),
        limit: () => Promise.resolve({ data: [], error: null }),
        order: () => Promise.resolve({ data: [], error: null })
      }),
      insert: () => ({ 
        select: () => ({ 
          single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
        })
      }),
      update: () => ({ 
        eq: () => ({ 
          select: () => ({ 
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
          })
        })
      }),
      or: () => ({ 
        order: () => Promise.resolve({ data: [], error: null })
      })
    }),
    auth: {
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signIn: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

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