import React, { useState } from 'react';
import { Book, Headphones, Video, Search, Filter, ChevronDown, Play } from 'lucide-react';
import { Helmet } from 'react-helmet'; // Add this line

type MediaType = 'all' | 'books' | 'audio' | 'video';
type SortOption = 'newest' | 'popular' | 'title';

interface MediaItem {
  id: number;
  type: MediaType;
  title: string;
  creator: string;
  thumbnail: string;
  duration?: string;
  format?: string;
  categories: string[];
  views: number;
  dateAdded: string;
}

const Browse: React.FC = () => {
  const [activeType, setActiveType] = useState<MediaType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: 'books',
      title: 'Introduction to React Hooks',
      creator: 'Jane Smith',
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
      format: 'PDF',
      categories: ['Programming', 'Web Development'],
      views: 1247,
      dateAdded: '2025-02-15'
    },
    {
      id: 2,
      type: 'audio',
      title: 'The History of Programming Languages',
      creator: 'Michael Brown',
      thumbnail: 'https://images.pexels.com/photos/2426085/pexels-photo-2426085.jpeg',
      duration: '45:32',
      categories: ['Tech History', 'Programming'],
      views: 3247,
      dateAdded: '2025-02-14'
    },
    {
      id: 3,
      type: 'video',
      title: 'Building Web Applications with Node.js',
      creator: 'Sarah Johnson',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      duration: '32:18',
      categories: ['Node.js', 'Web Development'],
      views: 12784,
      dateAdded: '2025-02-13'
    }
  ];
  
  const filteredItems = activeType === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.type === activeType);
    
  const getTypeIcon = (type: MediaType) => {
    switch(type) {
      case 'books':
        return <Book size={20} />;
      case 'audio':
        return <Headphones size={20} />;
      case 'video':
        return <Video size={20} />;
      default:
        return null;
    }
  };
  
  const getTypeColor = (type: MediaType) => {
    switch(type) {
      case 'books':
        return 'text-blue-600 dark:text-blue-400';
      case 'audio':
        return 'text-purple-600 dark:text-purple-400';
      case 'video':
        return 'text-teal-600 dark:text-teal-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Helmet>
        <title>Digital Library - Browse All Content</title>
      </Helmet>

      {/* Main Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Digital Library</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Explore our vast collection of educational resources
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search content..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 w-64"
                />
              </div>
              
              <button
                className="px-3 py-2 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} />
                <span>Filters</span>
                <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Sections */}
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Books Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Book size={24} className="text-blue-600" />
                Featured Books
              </h2>
              <a href="/books" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                View All Books →
              </a>
            </div>
            {/* Books grid using existing mediaItems filtered for books */}
          </section>

          {/* Audio Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Headphones size={24} className="text-purple-600" />
                Audio Collections
              </h2>
              <a href="/audio" className="text-purple-600 hover:text-purple-800 dark:text-purple-400">
                View All Audio →
              </a>
            </div>
            {/* Audio grid using existing mediaItems filtered for audio */}
          </section>

          {/* Video Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Video size={24} className="text-teal-600" />
                Video Library
              </h2>
              <a href="/video" className="text-teal-600 hover:text-teal-800 dark:text-teal-400">
                View All Videos →
              </a>
            </div>
            {/* Video grid using existing mediaItems filtered for video */}
          </section>
        </div>
      </main>

      {/* Site Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Digital Library</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Empowering learners with quality educational resources since 2025
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-400">About Us</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-400">Contact</a></li>
                <li><a href="/faq" className="text-gray-600 hover:text-gray-900 dark:text-gray-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-400">Terms of Service</a></li>
                <li><a href="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
            © 2025 Digital Library. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Browse;

<Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Digital Library Collection",
      "description": "Comprehensive collection of educational resources",
      "url": window.location.href,
      "image": "/logo.png"
    })}
  </script>
</Helmet>