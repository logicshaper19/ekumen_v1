import { FileText, Users, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { documentStats } from '../../data/executionData';
import { partners } from '../../data/partnersData';
import { messages } from '../../data/messagesData';

export default function ExecutionOverview() {
  const activePartners = partners.filter(p => p.status === 'active').length;
  const newPartners = partners.filter(p => p.status === 'new').length;
  const recentDocuments = documentStats.recentUploads;
  const unreadMessages = messages.filter(m => !m.isRead).length;
  const pendingActions = partners.reduce((sum, p) => 
    sum + (p.emailSync.status === 'pending' ? 1 : 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Execution Status</h2>
        <div className="flex items-center">
          {pendingActions > 0 && (
            <div className="flex items-center text-amber-600">
              <AlertCircle className="h-5 w-5 mr-1" />
              <span className="text-sm">{pendingActions} pending</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Track operations, partners, and document updates
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-gray-400" />
            <p className="text-sm text-gray-500">Messages</p>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{unreadMessages}</p>
            {unreadMessages > 0 && (
              <span className="ml-2 text-sm text-amber-600">unread</span>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-400" />
            <p className="text-sm text-gray-500">Active Partners</p>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{activePartners}</p>
            {newPartners > 0 && (
              <span className="ml-2 text-sm text-green-600">+{newPartners} new</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-400" />
          <p className="text-sm font-medium text-gray-900">Recent Activity</p>
        </div>
        <div className="mt-2 space-y-2">
          {documentStats.uploadTrend.slice(-2).map((month, idx) => (
            <div key={month.month} className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{month.month}</span>
              <span className="text-sm font-medium text-gray-900">{month.count} uploads</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}