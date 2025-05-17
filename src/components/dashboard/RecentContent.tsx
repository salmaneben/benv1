import React from 'react';
import { Book, Music, Video } from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  type: 'book' | 'audio' | 'video';
  creator: string;
  date: string;
  status: 'draft' | 'pending' | 'published' | 'featured';
}

const RecentContent: React.FC = () => {
  const items: ContentItem[] = [];
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'book':
        return <Book size={16} className="text-blue-500" />;
      case 'audio':
        return <Music size={16} className="text-purple-500" />;
      case 'video':
        return <Video size={16} className="text-teal-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'draft':
        return <span className="badge badge-draft">Draft</span>;
      case 'pending':
        return <span className="badge badge-pending">Pending</span>;
      case 'published':
        return <span className="badge badge-published">Published</span>;
      case 'featured':
        return <span className="badge badge-featured">Featured</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="dashboard-widget animate-fade-in">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-medium">Recent Content</h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View all
        </button>
      </div>
      {items.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          <p>No content available yet</p>
          <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Add new content
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map(item => (
            <div key={item.id} className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm truncate">{item.title}</h4>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    By {item.creator} · {item.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 text-center">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Add new content
        </button>
      </div>
    </div>
  );
};

export default RecentContent;