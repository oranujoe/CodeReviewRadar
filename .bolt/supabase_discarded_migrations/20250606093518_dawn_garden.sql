/*
  # Initial Schema for VibeCode Review

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `github_username` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `repositories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `full_name` (text, unique) -- e.g., "owner/repo"
      - `github_id` (bigint, unique)
      - `owner_id` (uuid, references profiles)
      - `description` (text)
      - `is_private` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `pull_requests`
      - `id` (uuid, primary key)
      - `repository_id` (uuid, references repositories)
      - `github_pr_number` (integer)
      - `title` (text)
      - `description` (text)
      - `author_id` (uuid, references profiles)
      - `status` (text) -- 'open', 'closed', 'merged', 'draft'
      - `risk_score` (integer, 1-10)
      - `ai_summary` (text)
      - `suggested_tasks` (text)
      - `github_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for repository collaborators to view PRs