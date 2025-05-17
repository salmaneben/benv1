import React from 'react';
import { BookOpen, Headphones, Video, Users, ArrowUpRight } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RecentContent from '../components/dashboard/RecentContent';
import ActivityLog from '../components/dashboard/ActivityLog';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
          
          <button className="btn btn-primary">Export Report</button>
        </div>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Books" 
          value={0} 
          change={0} 
          icon={<BookOpen size={20} />}
          type="books"
        />
        <StatCard 
          title="Audio Files" 
          value={0} 
          change={0} 
          icon={<Headphones size={20} />}
          type="audio"
        />
        <StatCard 
          title="Video Content" 
          value={0} 
          change={0} 
          icon={<Video size={20} />}
          type="video"
        />
        <StatCard 
          title="Active Users" 
          value={0} 
          change={0} 
          icon={<Users size={20} />}
        />
      </div>
      
      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="content-card group hover:shadow-md transition-shadow h-36 flex flex-col items-center justify-center cursor-pointer">
          <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h3 className="font-medium">Add New Book</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Upload book content</p>
        </div>
        
        <div className="content-card group hover:shadow-md transition-shadow h-36 flex flex-col items-center justify-center cursor-pointer">
          <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform">
            <Headphones size={24} />
          </div>
          <h3 className="font-medium">Add New Audio</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Upload audio content</p>
        </div>
        
        <div className="content-card group hover:shadow-md transition-shadow h-36 flex flex-col items-center justify-center cursor-pointer">
          <div className="p-3 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mb-3 group-hover:scale-110 transition-transform">
            <Video size={24} />
          </div>
          <h3 className="font-medium">Add New Video</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Upload video content</p>
        </div>
      </div>
      
      {/* Content widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentContent />
        <ActivityLog />
      </div>
      
      {/* Media usage chart widget */}
      <div className="content-card">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-medium">Storage Usage</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total: 0 GB / 3TB
          </div>
        </div>
        <div className="p-5">
          <div className="h-60 flex flex-col justify-center items-center">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
              <div className="bg-blue-600 h-4 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="text-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg inline-flex mb-2">
                  <BookOpen size={18} />
                </div>
                <div className="text-sm font-medium">Books</div>
                <div className="text-lg font-bold">0 GB</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <ArrowUpRight size={12} className="text-green-500" />
                  <span className="text-green-500">0%</span> from last month
                </div>
              </div>
              <div className="text-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg inline-flex mb-2">
                  <Headphones size={18} />
                </div>
                <div className="text-sm font-medium">Audio</div>
                <div className="text-lg font-bold">0 GB</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <ArrowUpRight size={12} className="text-green-500" />
                  <span className="text-green-500">0%</span> from last month
                </div>
              </div>
              <div className="text-center">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg inline-flex mb-2">
                  <Video size={18} />
                </div>
                <div className="text-sm font-medium">Video</div>
                <div className="text-lg font-bold">0 GB</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <ArrowUpRight size={12} className="text-green-500" />
                  <span className="text-green-500">0%</span> from last month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;