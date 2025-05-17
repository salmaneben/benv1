import React, { useState } from 'react';
import { Video, Filter, Download, ChevronDown, Edit, Trash, Eye, Play } from 'lucide-react';

interface VideoFile {
  id: number;
  title: string;
  thumbnail: string;
  creator: string;
  duration: string;
  categories: string[];
  resolutions: string[];
  views: number;
  status: 'draft' | 'pending' | 'published' | 'featured';
  dateAdded: string;
}

const VideoLibrary: React.FC = () => {
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const videoFiles: VideoFile[] = [];
  
  const toggleSelectAll = () => {
    if (selectedVideos.length === videoFiles.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(videoFiles.map(video => video.id));
    }
  };
  
  const toggleSelect = (id: number) => {
    if (selectedVideos.includes(id)) {
      setSelectedVideos(selectedVideos.filter(videoId => videoId !== id));
    } else {
      setSelectedVideos([...selectedVideos, id]);
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Video Library</h1>
        <div className="flex items-center gap-2">
          <button className="btn btn-video">
            <Video size={16} className="mr-2" />
            Add New Video
          </button>
        </div>
      </div>
      
      <div className="content-card">
        <div className="library-header">
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Search videos..." 
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg w-80"
            />
            <button 
              className="px-3 py-2 flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filters</span>
              <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedVideos.length > 0 && (
              <>
                <button className="btn btn-outline text-sm">
                  <Download size={16} className="mr-1" />
                  Export
                </button>
                <button className="btn btn-outline text-sm">
                  <Edit size={16} className="mr-1" />
                  Edit
                </button>
                <button className="btn btn-outline text-sm text-red-600 dark:text-red-400">
                  <Trash size={16} className="mr-1" />
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
        
        {showFilters && (
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                <option value="">All Categories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Resolution
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                <option value="">All Resolutions</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
                <option value="4k">4K</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                <option value="">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending Review</option>
                <option value="published">Published</option>
                <option value="featured">Featured</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                <option value="">Any Length</option>
                <option value="short">Short (less than 15 min)</option>
                <option value="medium">Medium (15-30 min)</option>
                <option value="long">Long (30-60 min)</option>
                <option value="very-long">Very Long (more than 60 min)</option>
              </select>
            </div>
          </div>
        )}
        
        <div className="table-container">
          <table className="admin-table">
            <thead className="bg-gray-50 dark:bg-gray-750">
              <tr>
                <th className="pl-6 py-3">
                  <input 
                    type="checkbox" 
                    checked={selectedVideos.length === videoFiles.length && videoFiles.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                </th>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Creator</th>
                <th>Duration</th>
                <th>Categories</th>
                <th>Resolutions</th>
                <th>Views</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {videoFiles.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No videos available yet
                  </td>
                </tr>
              ) : (
                videoFiles.map(video => (
                  <tr key={video.id}>
                    <td className="pl-6 py-4">
                      <input 
                        type="checkbox" 
                        checked={selectedVideos.includes(video.id)}
                        onChange={() => toggleSelect(video.id)}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                    </td>
                    <td>
                      <div className="relative h-16 w-24 bg-teal-100 dark:bg-teal-900/30 rounded flex items-center justify-center group overflow-hidden">
                        <Video size={20} className="text-teal-500 dark:text-teal-400 group-hover:opacity-0 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={20} className="text-teal-600 dark:text-teal-400" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-medium">{video.title}</div>
                    </td>
                    <td>{video.creator}</td>
                    <td>{video.duration}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {video.categories.map((category, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {video.resolutions.map((resolution, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                          >
                            {resolution}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{video.views.toLocaleString()}</td>
                    <td>{getStatusBadge(video.status)}</td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <Eye size={18} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <Edit size={18} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            No entries to show
          </div>
          
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-teal-600 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLibrary;