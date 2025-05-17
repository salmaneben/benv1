import React from 'react';
import { AlertCircle, CheckCircle, Clock, X } from 'lucide-react';

interface NotificationsProps {
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'review',
      title: 'Content Review Required',
      message: 'New book "Advanced JavaScript Patterns" needs review',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'system',
      title: 'Storage Warning',
      message: 'Media library storage is at 85% capacity',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Batch Processing Complete',
      message: '24 audio files were successfully processed',
      time: '3 hours ago',
      read: false
    },
    {
      id: 4,
      type: 'review',
      title: 'New User Registration',
      message: 'John Smith requested Content Manager access',
      time: 'Yesterday',
      read: true
    }
  ];
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'review':
        return <Clock size={18} className="text-blue-500" />;
      case 'system':
        return <AlertCircle size={18} className="text-amber-500" />;
      case 'success':
        return <CheckCircle size={18} className="text-green-500" />;
      default:
        return <AlertCircle size={18} />;
    }
  };
  
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-medium">Notifications</h3>
        <button 
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto py-2">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 border-l-2 ${
              notification.read 
                ? 'border-transparent' 
                : notification.type === 'review' 
                  ? 'border-blue-500'
                  : notification.type === 'system'
                    ? 'border-amber-500'
                    : 'border-green-500'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{notification.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default Notifications;