import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'Open':
        return 'bg-sky-700/50 text-sky-200 border border-sky-600/70';
      case 'In Review':
        return 'bg-indigo-700/50 text-indigo-200 border border-indigo-600/70';
      case 'Merged':
        return 'bg-purple-700/50 text-purple-200 border border-purple-600/70';
      case 'Draft':
        return 'bg-slate-600/50 text-slate-300 border border-slate-500/70';
      case 'Blocked':
        return 'bg-red-700/50 text-red-200 border border-red-600/70';
      default:
        return 'bg-gray-700/50 text-gray-200 border border-gray-600/70';
    }
  };

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;