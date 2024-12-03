import { Clock, FileText, Users, Wheat } from 'lucide-react';

interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'document':
      return <FileText className="h-5 w-5 text-indigo-400" />;
    case 'partner':
      return <Users className="h-5 w-5 text-green-400" />;
    case 'crop':
      return <Wheat className="h-5 w-5 text-amber-400" />;
    default:
      return <Clock className="h-5 w-5 text-gray-400" />;
  }
};

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
      <p className="text-sm text-gray-600 mb-4">
        Latest farm updates • Blue: documents • Green: partners • Amber: crops
      </p>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(activity.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}