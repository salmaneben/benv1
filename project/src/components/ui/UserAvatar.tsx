import React, { useState } from 'react';
import { LogOut, User, Settings, HelpCircle } from 'lucide-react';

const UserAvatar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg py-1 px-2"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
          JD
        </div>
        <span className="hidden md:block">John Doe</span>
      </button>
      
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Library Administrator</div>
          </div>
          
          <div className="py-1">
            <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <User size={16} />
              <span>Profile</span>
            </button>
            <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings size={16} />
              <span>Account Settings</span>
            </button>
            <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <HelpCircle size={16} />
              <span>Help Center</span>
            </button>
          </div>
          
          <div className="py-1 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;