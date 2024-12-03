import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface EmailSyncStatusProps {
  lastSync: string;
  status: 'success' | 'error' | 'pending';
  unreadCount?: number;
}

export default function EmailSyncStatus({ lastSync, status, unreadCount }: EmailSyncStatusProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const formatLastSync = (date: string) => {
    const syncDate = new Date(date);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - syncDate.getTime()) / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`;
    } else {
      return syncDate.toLocaleDateString();
    }
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      {getStatusIcon()}
      <span className="text-gray-500">
        Synced {formatLastSync(lastSync)}
      </span>
      {status === 'success' && unreadCount !== undefined && unreadCount > 0 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          {unreadCount} unread
        </span>
      )}
    </div>
  );
}