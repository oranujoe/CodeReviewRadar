import React, { useState } from 'react';
import { Layout, Search, GitPullRequest, Users, Settings, Bell, AlertCircle, CheckCircle, Clock } from 'lucide-react';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const pullRequests = [
    {
      id: 1,
      title: "Add authentication flow",
      author: "Sarah Chen",
      repo: "frontend/main",
      status: "needs-review",
      risk: "medium",
      time: "2h ago"
    },
    {
      id: 2,
      title: "Optimize database queries",
      author: "Mike Johnson",
      repo: "backend/core",
      status: "approved",
      risk: "low",
      time: "3h ago"
    },
    {
      id: 3,
      title: "Update deployment scripts",
      author: "Alex Kim",
      repo: "devops/scripts",
      status: "changes-requested",
      risk: "high",
      time: "5h ago"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="status-badge success">
            <CheckCircle className="h-4 w-4" />
            Approved
          </span>
        );
      case 'needs-review':
        return (
          <span className="status-badge warning">
            <Clock className="h-4 w-4" />
            Needs Review
          </span>
        );
      case 'changes-requested':
        return (
          <span className="status-badge error">
            <AlertCircle className="h-4 w-4" />
            Changes Requested
          </span>
        );
      default:
        return null;
    }
  };

  const getRiskBadge = (risk: string) => {
    const baseClasses = "px-3 py-1 text-sm font-medium border-2";
    switch (risk) {
      case 'low':
        return <span className={`${baseClasses} border-[--vc-success] text-[--vc-success] bg-[--vc-success]/10`}>Low Risk</span>;
      case 'medium':
        return <span className={`${baseClasses} border-[--vc-warning] text-[--vc-warning] bg-[--vc-warning]/10`}>Medium Risk</span>;
      case 'high':
        return <span className={`${baseClasses} border-[--vc-error] text-[--vc-error] bg-[--vc-error]/10`}>High Risk</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[--vc-bg]">
      {/* Sidebar */}
      <aside className="w-64 bg-[--vc-surface] border-r-4 border-[--vc-border] p-4">
        <div className="flex items-center gap-2 mb-8">
          <Layout className="h-8 w-8 text-[--vc-primary]" />
          <span className="font-bold text-xl">VibeCode</span>
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-3 text-slate-300 hover:bg-[--vc-bg] p-3 rounded-none border-2 border-transparent hover:border-[--vc-accent] transition-all duration-200">
            <GitPullRequest className="h-5 w-5" />
            Pull Requests
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-300 hover:bg-[--vc-bg] p-3 rounded-none border-2 border-transparent hover:border-[--vc-accent] transition-all duration-200">
            <Users className="h-5 w-5" />
            Team
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-300 hover:bg-[--vc-bg] p-3 rounded-none border-2 border-transparent hover:border-[--vc-accent] transition-all duration-200">
            <Settings className="h-5 w-5" />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-[--vc-surface] border-b-4 border-[--vc-border] p-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Pull Requests</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-300 hover:text-white">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-[--vc-accent] rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[--vc-primary] border-2 border-black flex items-center justify-center">
                  <span className="font-semibold text-white">JD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Search bar */}
        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search pull requests..."
              className="dashboard-search pl-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Pull Requests Table */}
          <div className="border-4 border-[--vc-border] bg-[--vc-surface] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Repository</th>
                    <th>Status</th>
                    <th>Risk</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {pullRequests.map((pr) => (
                    <tr key={pr.id}>
                      <td className="font-medium text-slate-50">{pr.title}</td>
                      <td>{pr.author}</td>
                      <td>{pr.repo}</td>
                      <td>{getStatusBadge(pr.status)}</td>
                      <td>{getRiskBadge(pr.risk)}</td>
                      <td>{pr.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;