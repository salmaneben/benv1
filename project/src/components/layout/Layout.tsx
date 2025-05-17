import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, Headphones, Video, Settings, Users, 
  Menu, X, ChevronDown, Sun, Moon, Bell, SearchIcon,
  ChevronUp, PlusCircle, HelpCircle, LayoutGrid
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import UserAvatar from '../ui/UserAvatar';
import Notifications from '../ui/Notifications';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { darkMode, toggleDarkMode, currentLibrary, setCurrentLibrary } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: <div className="flex items-center justify-center w-6 h-6"><BookOpen size={18} /></div>,
      library: null
    },
    {
      name: 'Browse Library',
      path: '/browse',
      icon: <div className="flex items-center justify-center w-6 h-6"><LayoutGrid size={18} /></div>,
      library: null
    },
    { 
      name: 'Books Library', 
      path: '/books', 
      icon: <div className="flex items-center justify-center w-6 h-6 text-books"><BookOpen size={18} /></div>,
      library: 'books',
      subItems: [
        { name: 'All Books', path: '/books' },
        { name: 'Add New', path: '/books/add' },
        { name: 'Categories', path: '/books/categories' },
        { name: 'Authors', path: '/books/authors' },
        { name: 'Formats', path: '/books/formats' }
      ]
    },
    { 
      name: 'Audio Library', 
      path: '/audio', 
      icon: <div className="flex items-center justify-center w-6 h-6 text-audio"><Headphones size={18} /></div>,
      library: 'audio',
      subItems: [
        { name: 'All Audio', path: '/audio' },
        { name: 'Add New', path: '/audio/add' },
        { name: 'Categories', path: '/audio/categories' },
        { name: 'Speakers', path: '/audio/speakers' },
        { name: 'Formats', path: '/audio/formats' }
      ]
    },
    { 
      name: 'Video Library', 
      path: '/video', 
      icon: <div className="flex items-center justify-center w-6 h-6 text-video"><Video size={18} /></div>,
      library: 'video',
      subItems: [
        { name: 'All Videos', path: '/video' },
        { name: 'Add New', path: '/video/add' },
        { name: 'Categories', path: '/video/categories' },
        { name: 'Creators', path: '/video/creators' },
        { name: 'Resolutions', path: '/video/resolutions' }
      ]
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: <div className="flex items-center justify-center w-6 h-6"><Settings size={18} /></div>,
      library: null
    },
    { 
      name: 'User Management', 
      path: '/users', 
      icon: <div className="flex items-center justify-center w-6 h-6"><Users size={18} /></div>,
      library: null,
      subItems: [
        { name: 'All Users', path: '/users' },
        { name: 'Add New', path: '/users/add' },
        { name: 'Roles', path: '/users/roles' },
        { name: 'Permissions', path: '/users/permissions' }
      ]
    }
  ];

  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // Find which section is active based on current path
    const activeNavItem = navItems.find(item => 
      location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
    );
    
    if (activeNavItem?.library) {
      setCurrentLibrary(activeNavItem.library);
      
      // Expand the active section
      setExpandedItems(prev => ({
        ...prev,
        [activeNavItem.name]: true
      }));
    }
  }, [location.pathname, setCurrentLibrary]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };
  
  const handleNavigation = (path: string, library: string | null) => {
    navigate(path);
    if (library) {
      setCurrentLibrary(library);
    }
    setSidebarOpen(false);
  };

  const getSidebarItemClass = (path: string, library: string | null) => {
    let className = "sidebar-item";
    
    if (isActive(path)) {
      className += " active";
    }
    
    if (library) {
      className += ` ${library}`;
    }
    
    return className;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pb-4 overflow-y-auto`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Digital Library</h1>
            <button 
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <nav className="mt-4 px-2 space-y-1">
          {navItems.map((item) => (
            <div key={item.name}>
              <div 
                className={getSidebarItemClass(item.path, item.library)}
                onClick={() => {
                  if (item.subItems) {
                    toggleExpand(item.name);
                  } else {
                    handleNavigation(item.path, item.library);
                  }
                }}
              >
                {item.icon}
                <span className="flex-grow">{item.name}</span>
                {item.subItems && (
                  <span className="ml-auto">
                    {expandedItems[item.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                )}
              </div>
              
              {item.subItems && expandedItems[item.name] && (
                <div className="ml-8 mt-1 space-y-1 animate-fade-in">
                  {item.subItems.map((subItem) => (
                    <div
                      key={subItem.name}
                      className={`${
                        isActive(subItem.path) 
                          ? `text-${item.library || 'gray'}-600 dark:text-${item.library || 'gray'}-400 font-medium` 
                          : 'text-gray-600 dark:text-gray-400'
                      } text-sm py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors duration-200`}
                      onClick={() => handleNavigation(subItem.path, item.library)}
                    >
                      {subItem.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
      
      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={20} />
              </button>
              
              <div className="ml-4 lg:ml-0 relative">
                <button 
                  className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm"
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <SearchIcon size={16} />
                  <span className="hidden sm:inline">Quick search...</span>
                </button>
                
                {searchOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 animate-fade-in">
                    <input 
                      type="text" 
                      placeholder="Search content..." 
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg"
                      autoFocus
                    />
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">Enter</kbd> to search
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Help button */}
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                <HelpCircle size={20} />
              </button>
              
              {/* Theme toggle */}
              <button 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                onClick={toggleDarkMode}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <div className="relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                      3
                    </span>
                  </div>
                </button>
                
                {notificationsOpen && (
                  <Notifications onClose={() => setNotificationsOpen(false)} />
                )}
              </div>
              
              {/* User profile */}
              <UserAvatar />
            </div>
          </div>
          
          {/* Secondary navigation based on current library */}
          {currentLibrary && (
            <div className={`px-4 sm:px-6 lg:px-8 py-2 border-t border-gray-200 dark:border-gray-700 bg-${currentLibrary}-50 dark:bg-${currentLibrary}-900/20`}>
              <div className="flex flex-wrap items-center gap-4">
                <span className={`text-${currentLibrary}-600 dark:text-${currentLibrary}-400 font-medium`}>
                  {currentLibrary.charAt(0).toUpperCase() + currentLibrary.slice(1)} Library
                </span>
                
                <div className="flex items-center gap-2">
                  <button className={`btn btn-${currentLibrary} flex items-center gap-2 text-sm`}>
                    <PlusCircle size={16} />
                    <span>Add New</span>
                  </button>
                  
                  <button className="btn btn-outline text-sm">
                    Import
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>
        
        {/* Page content */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <div>
              Digital Library Platform v1.0.0
            </div>
            <div className="mt-2 sm:mt-0">
              © 2025 Your Organization
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;