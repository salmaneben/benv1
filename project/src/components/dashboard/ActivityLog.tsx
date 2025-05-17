import React from 'react';
import { Eye, Edit, Plus, Trash, Download, Upload } from 'lucide-react';

interface ActivityItem {
  id: number;
  user: string;
  action: 'view' | 'edit' | 'create' | 'delete' | 'download' | 'upload';
  item: string;
  type: 'book' | 'audio' | 'video' | 'user' | 'system';
  time: string;
}

const ActivityLog: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      user: 'John Doe',
      action: 'edit',
      item: 'Introduction to React Hooks',
      type: 'book',
      time: 'Just now'
    },
    {
      id: 2,
      user: 'Sarah Brown',
      action: 'create',
      item: 'Advanced JavaScript Patterns',
      type: 'book',
      time: '10 minutes ago'
    },
    {
      id: 3,
      user: 'Michael Johnson',
      action: 'download',
      item: 'Building Web Applications with Node.js',
      type: 'video',
      time: '25 minutes ago'
    },
    {
      id: 4,
      user: 'Emma Wilson',
      action: 'view',
      item: 'The History of Programming Languages',
      type: 'audio',
      time: '2 hours ago'
    },
    {
      id: 5,
      user: 'Alex Smith',
      action: 'upload',
      item: 'New batch of programming books',
      type: 'system',
      time: '3 hours ago'
    }
  ];
  
  const getActionIcon = (action: string) => {
    switch(action) {
      case 'view':
        return <Eye size={16} className="text-blue-500" />;
      case 'edit':
        return <Edit size={16} className="text-amber-500" />;
      case 'create':
        return <Plus size={16} className="text-green-500" />;
      case 'delete':
        return <Trash size={16} className="text-red-500" />;
      case 'download':
        return <Download size={16} className="text-purple-500" />;
      case 'upload':
        return <Upload size={16} className="text-teal-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="dashboard-widget animate-fade-in">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-medium">Activity Log</h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View full log
        </button>
      </div>
      <div className="p-5">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[17px] border-l-2 border-gray-200 dark:border-gray-700"></div>
          <div className="space-y-6">
            {activities.map(activity => (
              <div key={activity.id} className="flex gap-4">
                <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full p-1 z-10">
                  {getActionIcon(activity.action)}
                </div>
                <div className="flex-1 -mt-1">
                  <div className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}ed{' '}
                    <span className="font-medium">{activity.item}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;