import { Mail, RefreshCw } from 'lucide-react';

interface EmailSyncBannerProps {
  email: string;
  lastSync: string;
  onSync: () => void;
}

export default function EmailSyncBanner({ email, lastSync, onSync }: EmailSyncBannerProps) {
  const formatLastSync = (date: string) => {
    const syncDate = new Date(date);
    return syncDate.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">
                Connected to <span className="font-medium text-gray-900">{email}</span>
              </p>
              <p className="text-xs text-gray-500">
                Last synchronized: {formatLastSync(lastSync)}
              </p>
            </div>
          </div>
          <button
            onClick={onSync}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Now
          </button>
        </div>
      </div>
    </div>
  );
}