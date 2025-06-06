/*
  # VibeCodeReview Radar Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `github_username` (text, unique)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `repositories`
      - `id` (uuid, primary key)
      - `owner_id` (uuid, foreign key to users)
      - `name` (text)
      - `github_repo_id` (bigint, unique)
      - `github_url` (text)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `pull_requests`
      - `id` (uuid, primary key)
      - `repository_id` (uuid, foreign key to repositories)
      - `github_pr_id` (bigint, unique)
      - `title` (text)
      - `description` (text)
      - `author_github_username` (text)
      - `author_avatar_url` (text)
      - `status` (text, default 'open')
      - `risk_score` (integer, default 0)
      - `github_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `ai_reviews`
      - `id` (uuid, primary key)
      - `pull_request_id` (uuid, foreign key to pull_requests)
      - `summary` (text)
      - `review_tasks` (text)
      - `refactor_suggestions` (text)
      - `security_notes` (text)
      - `generated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Repository owners can manage their repositories and PRs
    - AI reviews are readable by repository collaborators

  3. Indexes
    - Add indexes for frequently queried columns
    - Optimize for dashboard queries and GitHub webhook lookups
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  github_username text UNIQUE,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create repositories table
CREATE TABLE IF NOT EXISTS repositories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  github_repo_id bigint UNIQUE,
  github_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pull_requests table
CREATE TABLE IF NOT EXISTS pull_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id uuid REFERENCES repositories(id) ON DELETE CASCADE NOT NULL,
  github_pr_id bigint UNIQUE,
  title text NOT NULL,
  description text DEFAULT '',
  author_github_username text NOT NULL,
  author_avatar_url text,
  status text DEFAULT 'open' CHECK (status IN ('open', 'closed', 'merged', 'draft', 'in_review', 'blocked')),
  risk_score integer DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 10),
  github_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ai_reviews table
CREATE TABLE IF NOT EXISTS ai_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id uuid REFERENCES pull_requests(id) ON DELETE CASCADE NOT NULL,
  summary text,
  review_tasks text,
  refactor_suggestions text,
  security_notes text,
  generated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE pull_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Repositories policies
CREATE POLICY "Repository owners can manage their repositories"
  ON repositories
  FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can read repositories they have access to"
  ON repositories
  FOR SELECT
  TO authenticated
  USING (true); -- For now, allow reading all repositories

-- Pull requests policies
CREATE POLICY "Users can read pull requests from accessible repositories"
  ON pull_requests
  FOR SELECT
  TO authenticated
  USING (
    repository_id IN (
      SELECT id FROM repositories WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Repository owners can manage pull requests"
  ON pull_requests
  FOR ALL
  TO authenticated
  USING (
    repository_id IN (
      SELECT id FROM repositories WHERE owner_id = auth.uid()
    )
  );

-- AI reviews policies
CREATE POLICY "Users can read AI reviews for accessible pull requests"
  ON ai_reviews
  FOR SELECT
  TO authenticated
  USING (
    pull_request_id IN (
      SELECT pr.id FROM pull_requests pr
      JOIN repositories r ON pr.repository_id = r.id
      WHERE r.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create AI reviews for accessible pull requests"
  ON ai_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    pull_request_id IN (
      SELECT pr.id FROM pull_requests pr
      JOIN repositories r ON pr.repository_id = r.id
      WHERE r.owner_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_repositories_owner_id ON repositories(owner_id);
CREATE INDEX IF NOT EXISTS idx_repositories_github_repo_id ON repositories(github_repo_id);
CREATE INDEX IF NOT EXISTS idx_pull_requests_repository_id ON pull_requests(repository_id);
CREATE INDEX IF NOT EXISTS idx_pull_requests_github_pr_id ON pull_requests(github_pr_id);
CREATE INDEX IF NOT EXISTS idx_pull_requests_status ON pull_requests(status);
CREATE INDEX IF NOT EXISTS idx_ai_reviews_pull_request_id ON ai_reviews(pull_request_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_repositories_updated_at BEFORE UPDATE ON repositories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pull_requests_updated_at BEFORE UPDATE ON pull_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();