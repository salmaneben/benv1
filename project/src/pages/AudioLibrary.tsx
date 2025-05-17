import React, { useState } from 'react';
import { Headphones, Filter, Download, ChevronDown, Edit, Trash, Eye, Play, Pause } from 'lucide-react';

interface AudioFile {
  id: number;
  title: string;
  thumbnail: string;
  speaker: string;
  duration: string;
  categories: string[];
  format: string;
  listens: number;
  status: 'draft' | 'pending' | 'published' | 'featured';
  dateAdded: string;
}

const AudioLibrary: React.FC = () => {
  const [selectedAudios, setSelectedAudios] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  
  const audioFiles: AudioFile[] = [
    {
      id: 1,
      title: 'The History of Programming Languages',
      thumbnail: '/thumbnails/programming-history.jpg',
      speaker: 'Michael Brown',
      duration: '45:32',
      categories: ['Tech History', 'Programming'],
      format: 'MP3',
      listens: 3247,
      status: 'featured',
      dateAdded: '2025-02-15'
    },
    {
      id: 2,
      title: 'The Future of Web Development',
      thumbnail: '/thumbnails/web-future.jpg',
      speaker: 'Sarah Johnson',
      duration: '32:18',
      categories: ['Web Development', 'Future Tech'],
      format: 'MP3',
      listens: 1856,
      status: 'published',
      dateAdded: '2025-02-14'
    },
    {
      id: 3,
      title: 'JavaScript: The Good Parts',
      thumbnail: '/thumbnails/js-good-parts.jpg',
      speaker: 'John Miller',
      duration: '1:12:45',
      categories: ['JavaScript', 'Programming'],
      format: 'WAV',
      listens: 2783,
      status: 'published',
      dateAdded: '2025-02-10'
    },
    {
      id: 4,
      title: 'Building Accessible Websites',
      thumbnail: '/thumbnails/accessibility.jpg',
      speaker: 'Emma Wilson',
      duration: '28:15',
      categories: ['Accessibility', 'Web Development'],
      format: 'MP3',
      listens: 1689,
      status: 'pending',
      dateAdded: '2025-02-05'
    },
    {
      id: 5,
      title: 'Introduction to React',
      thumbnail: '/thumbnails/react-intro.jpg',
      speaker: 'Jane Smith',
      duration: '58:23',
      categories: ['React', 'JavaScript'],
      format: 'MP3',
      listens: 2423,
      status: 'draft',
      dateAdded: '2025-02-01'
    }
  ];
  
  const toggleSelectAll = () => {
    if (selectedAudios.length === audioFiles.length) {
      setSelectedAudios([]);
    } else {
      setSelectedAudios(audioFiles.map(audio => audio.id));
    }
  };
  
  const toggleSelect = (id: number) => {
    if (selectedAudios.includes(id)) {
      setSelectedAudios(selectedAudios.filter(audioId => audioId !== id));
    } else {
      setSelectedAudios([...selectedAudios, id]);
    }
  };
  
  const togglePlay = (id: number) => {
    if (playing === id) {
      setPlaying(null);
    } else {
      setPlaying(id);
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
        <h1 className="text-2xl font-bold">Audio Library</h1>
        <div className="flex items-center gap-2">
          <button className="btn btn-audio">
            <Headphones size={16} className="mr-2" />
            Add New Audio
          </button>
        </div>
      </div>
      
      <div className="content-card">
        <div className="library-header">
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Search audio files..." 
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
            {selectedAudios.length > 0 && (
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
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
                <option value="javascript">JavaScript</option>
                <option value="tech-history">Tech History</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Format
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                <option value="">All Formats</option>
                <option value="mp3">MP3</option>
                <option value="wav">WAV</option>
                <option value="flac">FLAC</option>
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
                    checked={selectedAudios.length === audioFiles.length && audioFiles.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th>Audio</th>
                <th>Title</th>
                <th>Speaker</th>
                <th>Duration</th>
                <th>Categories</th>
                <th>Format</th>
                <th>Listens</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {audioFiles.map(audio => (
                <tr key={audio.id}>
                  <td className="pl-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedAudios.includes(audio.id)}
                      onChange={() => toggleSelect(audio.id)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  <td>
                    <div className="relative h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center group">
                      <Headphones size={18} className="text-purple-500 dark:text-purple-400 group-hover:opacity-0 transition-opacity" />
                      <button 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => togglePlay(audio.id)}
                      >
                        {playing === audio.id ? (
                          <Pause size={18} className="text-purple-600 dark:text-purple-400" />
                        ) : (
                          <Play size={18} className="text-purple-600 dark:text-purple-400" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="font-medium">{audio.title}</div>
                  </td>
                  <td>{audio.speaker}</td>
                  <td>{audio.duration}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {audio.categories.map((category, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                      {audio.format}
                    </span>
                  </td>
                  <td>{audio.listens.toLocaleString()}</td>
                  <td>{getStatusBadge(audio.status)}</td>
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
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing 1 to 5 of 156 entries
          </div>
          
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-purple-600 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              2
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              3
            </button>
            <span className="px-3 py-1 text-gray-500 dark:text-gray-400">...</span>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              16
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioLibrary;