import React, { useState } from 'react';
import { BookOpen, Filter, Download, ChevronDown, Edit, Trash, Eye } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  cover: string;
  author: string;
  categories: string[];
  format: string;
  downloads: number;
  status: 'draft' | 'pending' | 'published' | 'featured';
  dateAdded: string;
}

const BooksLibrary: React.FC = () => {
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const books: Book[] = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      cover: '/covers/react-hooks.jpg',
      author: 'Jane Smith',
      categories: ['Programming', 'Web Development'],
      format: 'PDF',
      downloads: 1247,
      status: 'published',
      dateAdded: '2025-02-15'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Patterns',
      cover: '/covers/js-patterns.jpg',
      author: 'John Miller',
      categories: ['Programming', 'JavaScript'],
      format: 'EPUB',
      downloads: 856,
      status: 'pending',
      dateAdded: '2025-02-14'
    },
    {
      id: 3,
      title: 'CSS Masterclass',
      cover: '/covers/css-masterclass.jpg',
      author: 'Sarah Johnson',
      categories: ['Web Design', 'CSS'],
      format: 'PDF',
      downloads: 1783,
      status: 'featured',
      dateAdded: '2025-02-10'
    },
    {
      id: 4,
      title: 'TypeScript Deep Dive',
      cover: '/covers/typescript.jpg',
      author: 'Michael Brown',
      categories: ['Programming', 'TypeScript'],
      format: 'PDF',
      downloads: 689,
      status: 'published',
      dateAdded: '2025-02-05'
    },
    {
      id: 5,
      title: 'Building Web Components',
      cover: '/covers/web-components.jpg',
      author: 'Emma Wilson',
      categories: ['Web Development', 'JavaScript'],
      format: 'MOBI',
      downloads: 423,
      status: 'draft',
      dateAdded: '2025-02-01'
    }
  ];
  
  const toggleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map(book => book.id));
    }
  };
  
  const toggleSelect = (id: number) => {
    if (selectedBooks.includes(id)) {
      setSelectedBooks(selectedBooks.filter(bookId => bookId !== id));
    } else {
      setSelectedBooks([...selectedBooks, id]);
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
        <h1 className="text-2xl font-bold">Books Library</h1>
        <div className="flex items-center gap-2">
          <button className="btn btn-books">
            <BookOpen size={16} className="mr-2" />
            Add New Book
          </button>
        </div>
      </div>
      
      <div className="content-card">
        <div className="library-header">
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Search books..." 
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
            {selectedBooks.length > 0 && (
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
                <option value="css">CSS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Format
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                <option value="">All Formats</option>
                <option value="pdf">PDF</option>
                <option value="epub">EPUB</option>
                <option value="mobi">MOBI</option>
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
                Date Added
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
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
                    checked={selectedBooks.length === books.length && books.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Categories</th>
                <th>Format</th>
                <th>Downloads</th>
                <th>Status</th>
                <th>Date Added</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {books.map(book => (
                <tr key={book.id}>
                  <td className="pl-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedBooks.includes(book.id)}
                      onChange={() => toggleSelect(book.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td>
                    <div className="h-12 w-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <BookOpen size={18} className="text-gray-500 dark:text-gray-400" />
                    </div>
                  </td>
                  <td>
                    <div className="font-medium">{book.title}</div>
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {book.categories.map((category, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                      {book.format}
                    </span>
                  </td>
                  <td>{book.downloads.toLocaleString()}</td>
                  <td>{getStatusBadge(book.status)}</td>
                  <td>{new Date(book.dateAdded).toLocaleDateString()}</td>
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
            Showing 1 to 5 of 284 entries
          </div>
          
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white">
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
              29
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

export default BooksLibrary;