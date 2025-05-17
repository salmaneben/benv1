import React, { useState } from 'react';
import { User, Filter, Plus, ChevronDown, Edit, Trash, ShieldCheck, Eye } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  dateRegistered: string;
}

const UserManagement: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const users: UserData[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '/avatars/john-doe.jpg',
      role: 'Library Administrator',
      status: 'active',
      lastLogin: '2025-02-16 09:45:21',
      dateRegistered: '2024-11-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: '/avatars/jane-smith.jpg',
      role: 'Content Manager',
      status: 'active',
      lastLogin: '2025-02-15 14:32:10',
      dateRegistered: '2024-11-20'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      avatar: '/avatars/michael-brown.jpg',
      role: 'Book Manager',
      status: 'active',
      lastLogin: '2025-02-14 11:25:43',
      dateRegistered: '2024-12-05'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: '/avatars/sarah-johnson.jpg',
      role: 'Audio Manager',
      status: 'inactive',
      lastLogin: '2025-01-20 09:18:55',
      dateRegistered: '2024-12-12'
    },
    {
      id: 5,
      name: 'Robert Wilson',
      email: 'robert.wilson@example.com',
      avatar: '/avatars/robert-wilson.jpg',
      role: 'Video Manager',
      status: 'pending',
      lastLogin: '-',
      dateRegistered: '2025-02-10'
    }
  ];
  
  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };
  
  const toggleSelect = (id: number) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="badge badge-published">Active</span>;
      case 'inactive':
        return <span className="badge badge-draft">Inactive</span>;
      case 'pending':
        return <span className="badge badge-pending">Pending</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-2">
          <button className="btn btn-primary">
            <Plus size={16} className="mr-2" />
            Add New User
          </button>
        </div>
      </div>
      
      <div className="content-card">
        <div className="library-header">
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Search users..." 
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
            {selectedUsers.length > 0 && (
              <>
                <button className="btn btn-outline text-sm">
                  <ShieldCheck size={16} className="mr-1" />
                  Change Role
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
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                <option value="">All Roles</option>
                <option value="admin">Library Administrator</option>
                <option value="content-manager">Content Manager</option>
                <option value="book-manager">Book Manager</option>
                <option value="audio-manager">Audio Manager</option>
                <option value="video-manager">Video Manager</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Registration Date
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
                    checked={selectedUsers.length === users.length && users.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Date Registered</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="pl-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {user.role}
                    </span>
                  </td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>{user.lastLogin === '-' ? '-' : new Date(user.lastLogin).toLocaleString()}</td>
                  <td>{new Date(user.dateRegistered).toLocaleDateString()}</td>
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
            Showing 1 to 5 of 52 entries
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
              6
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

export default UserManagement;