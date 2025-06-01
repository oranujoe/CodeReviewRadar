import React from 'react';
import { Layout, BarChart3, GitPullRequest, Users, Settings, Bell } from 'lucide-react';

function Dashboard() {
  return (
    <div className="flex h-screen bg-[--vc-bg]">
      {/* Sidebar */}
      <aside className="w-64 bg-[--vc-surface] border-r-4 border-[--vc-border] p-4">
        <div className="flex items-center gap-2 mb-8">
          <Layout className="h-8 w-8 text-[--vc-primary]" />
          <span className="font-bold text-xl">VibeCode</span>
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-3 text-white bg-[--vc-primary] p-3 rounded-lg">
            <BarChart3 className="h-5 w-5" />
            Overview
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-300 hover:bg-[--vc-bg] p-3 rounded-lg transition-colors">
            <GitPullRequest className="h-5 w-5" />
            Pull Requests
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-300 hover:bg-[--vc-bg] p-3 rounded-lg transition-colors">
            <Users className="h-5 w-5" />
            Team
          </a>
          <a href="#" className="flex items-center gap-3 text-slate-300 hover:bg-[--vc-bg] p-3 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-[--vc-surface] border-b-4 border-[--vc-border] p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-300 hover:text-white">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-[--vc-accent] rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[--vc-primary] flex items-center justify-center">
                  <span className="font-semibold text-white">JD</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-slate-400">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stats cards */}
            {[
              { title: 'Total Reviews', value: '2,451', change: '+12.5%' },
              { title: 'Active PRs', value: '48', change: '-2.3%' },
              { title: 'Review Time', value: '24m', change: '+3.7%' },
              { title: 'Issues Found', value: '132', change: '-8.1%' }
            ].map((stat, index) => (
              <div key={index} className="bg-[--vc-surface] border-4 border-[--vc-border] p-6 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-2">{stat.title}</h3>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <span className={`text-sm ${
                    stat.change.startsWith('+') ? 'text-[--vc-success]' : 'text-[--vc-error]'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-[--vc-surface] border-4 border-[--vc-border] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Update user authentication flow',
                  repo: 'frontend/main',
                  risk: 'Low',
                  time: '2h ago'
                },
                {
                  title: 'Implement new API endpoints',
                  repo: 'backend/api',
                  risk: 'Medium',
                  time: '4h ago'
                },
                {
                  title: 'Fix responsive design issues',
                  repo: 'frontend/ui',
                  risk: 'Low',
                  time: '6h ago'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[--vc-bg] rounded-lg">
                  <div>
                    <h3 className="font-medium mb-1">{activity.title}</h3>
                    <p className="text-sm text-slate-400">{activity.repo}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      activity.risk === 'Low' ? 'bg-[--vc-success]/20 text-[--vc-success]' :
                      activity.risk === 'Medium' ? 'bg-[--vc-warning]/20 text-[--vc-warning]' :
                      'bg-[--vc-error]/20 text-[--vc-error]'
                    }`}>
                      {activity.risk}
                    </span>
                    <span className="text-sm text-slate-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;