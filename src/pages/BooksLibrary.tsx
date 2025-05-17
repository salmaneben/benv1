import React, { useState, useEffect } from 'react';
import { BookOpen, Filter, Download, ChevronDown, Edit, Trash, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Book {
  id: string;
  title: string;
  cover_url: string;
  author: string;
  categories: string[];
  format: string;
  downloads: number;
  status: 'draft' | 'pending' | 'published' | 'featured';
  created_at: string;
}

const BooksLibrary: React.FC = () => {
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map(book => book.id));
    }
  };
  
  const toggleSelect = (id: string) => {
    if (selectedBooks.includes(id)) {
      setSelectedBooks(selectedBooks.filter(bookId => bookId !== id));
    } else {
      setSelectedBooks([...selectedBooks, id]);
    }
  };

  const handleDelete = async (ids: string[]) => {
    if (!confirm('Are you sure you want to delete the selected books?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .in('id', ids);

      if (error) throw error;

      // Refresh the books list
      await fetchBooks();
      // Clear selection
      setSelectedBooks([]);
    } catch (error) {
      console.error('Error deleting books:', error);
      alert('Failed to delete books. Please try again.');
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
                <button 
                  className="btn btn-outline text-sm text-red-600 dark:text-red-400"
                  onClick={() => handleDelete(selectedBooks)}
                >
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
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Loading books...
                  </td>
                </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No books available yet
                  </td>
                </tr>
              ) : (
                books.map(book => (
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
                        {book.cover_url ? (
                          <img 
                            src={book.cover_url} 
                            alt={book.title}
                            className="h-full w-full object-cover rounded"
                          />
                        ) : (
                          <BookOpen size={18} className="text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="font-medium">{book.title}</div>
                    </td>
                    <td>{book.author}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {book.categories?.map((category, index) => (
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
                    <td>{new Date(book.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <Eye size={18} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <Edit size={18} />
                        </button>
                        <button 
                          className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                          onClick={() => handleDelete([book.id])}
                        >
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
            {books.length === 0 ? 'No entries to show' : `Showing ${books.length} books`}
          </div>
          
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white">
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

export default BooksLibrary;