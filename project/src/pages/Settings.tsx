import React, { useState } from 'react';
import { Save, Database, Globe, Bell, ShieldCheck, HardDrive } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="content-card">
        <div className="sm:flex border-b border-gray-200 dark:border-gray-700">
          <div className="sm:w-64 border-r border-gray-200 dark:border-gray-700">
            <nav className="flex sm:flex-col">
              <button
                className={`px-4 py-3 text-left text-sm font-medium flex items-center gap-2 ${
                  activeTab === 'general' 
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 sm:border-b-0 sm:border-l-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                } w-full`}
                onClick={() => setActiveTab('general')}
              >
                <Globe size={18} />
                <span>General</span>
              </button>
              <button
                className={`px-4 py-3 text-left text-sm font-medium flex items-center gap-2 ${
                  activeTab === 'database' 
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 sm:border-b-0 sm:border-l-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                } w-full`}
                onClick={() => setActiveTab('database')}
              >
                <Database size={18} />
                <span>Database</span>
              </button>
              <button
                className={`px-4 py-3 text-left text-sm font-medium flex items-center gap-2 ${
                  activeTab === 'storage' 
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 sm:border-b-0 sm:border-l-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                } w-full`}
                onClick={() => setActiveTab('storage')}
              >
                <HardDrive size={18} />
                <span>Storage</span>
              </button>
              <button
                className={`px-4 py-3 text-left text-sm font-medium flex items-center gap-2 ${
                  activeTab === 'notifications' 
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 sm:border-b-0 sm:border-l-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                } w-full`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              <button
                className={`px-4 py-3 text-left text-sm font-medium flex items-center gap-2 ${
                  activeTab === 'security' 
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 sm:border-b-0 sm:border-l-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                } w-full`}
                onClick={() => setActiveTab('security')}
              >
                <ShieldCheck size={18} />
                <span>Security</span>
              </button>
            </nav>
          </div>
          
          <div className="p-6 w-full">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">General Settings</h2>
                
                <div className="form-group">
                  <label className="form-label">Library Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue="Digital Library Platform" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Site Tagline</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue="Your comprehensive media collection" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Admin Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    defaultValue="admin@example.com" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Site URL</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    defaultValue="https://library.example.com" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Default User Role</label>
                  <select className="form-input">
                    <option>Subscriber</option>
                    <option>Editor</option>
                    <option>Admin</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Default Language</label>
                  <select className="form-input">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Date Format</label>
                  <select className="form-input">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Time Format</label>
                  <select className="form-input">
                    <option>12-hour</option>
                    <option>24-hour</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="maintenance" defaultChecked={false} />
                    <label htmlFor="maintenance" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable Maintenance Mode
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    When enabled, only administrators can access the site.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="btn btn-primary flex items-center gap-2">
                    <Save size={16} />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'database' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Database Settings</h2>
                
                <div className="form-group">
                  <label className="form-label">Database Type</label>
                  <select className="form-input">
                    <option>MySQL</option>
                    <option>PostgreSQL</option>
                    <option>MariaDB</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Host</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue="localhost" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Database Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue="digital_library" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue="db_user" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    defaultValue="••••••••••••" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Table Prefix</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue="dl_" 
                  />
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Database Maintenance</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Regular database maintenance helps keep your library performing optimally.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700 rounded text-sm">
                      Optimize Tables
                    </button>
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700 rounded text-sm">
                      Repair Tables
                    </button>
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700 rounded text-sm">
                      Clear Cache
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="btn btn-primary flex items-center gap-2">
                    <Save size={16} />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'storage' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Storage Settings</h2>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-amber-100 dark:bg-amber-900">
                      <HardDrive size={16} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Storage Usage Warning</h3>
                      <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                        Your storage is at 85% capacity (2.4TB of 3TB used). Consider upgrading your plan or optimizing your media.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Storage Type</label>
                  <select className="form-input">
                    <option>Local Filesystem</option>
                    <option>Amazon S3</option>
                    <option>Google Cloud Storage</option>
                    <option>Microsoft Azure</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Media Upload Path</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue="/var/www/html/wp-content/uploads" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Maximum Upload File Size</label>
                  <select className="form-input">
                    <option>2 MB</option>
                    <option>5 MB</option>
                    <option>10 MB</option>
                    <option>50 MB</option>
                    <option>100 MB</option>
                    <option>Unlimited</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="resize" defaultChecked={true} />
                    <label htmlFor="resize" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Automatically Resize Large Images
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="optimize" defaultChecked={true} />
                    <label htmlFor="optimize" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Optimize Uploaded Images
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="organize" defaultChecked={true} />
                    <label htmlFor="organize" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Organize Uploads into Month/Year Folders
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Backup Schedule</label>
                  <select className="form-input">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Never</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="btn btn-primary flex items-center gap-2">
                    <Save size={16} />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Notification Settings</h2>
                
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Email Notifications</h3>
                
                <div className="form-group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="new-content" defaultChecked={true} />
                      <label htmlFor="new-content" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        New Content Submissions
                      </label>
                    </div>
                    <select className="w-40 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded py-1">
                      <option>All Admins</option>
                      <option>Content Managers</option>
                      <option>Custom...</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="content-review" defaultChecked={true} />
                      <label htmlFor="content-review" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content Requiring Review
                      </label>
                    </div>
                    <select className="w-40 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded py-1">
                      <option>Content Managers</option>
                      <option>All Admins</option>
                      <option>Custom...</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="storage-alerts" defaultChecked={true} />
                      <label htmlFor="storage-alerts" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Storage Capacity Alerts
                      </label>
                    </div>
                    <select className="w-40 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded py-1">
                      <option>All Admins</option>
                      <option>System Admins</option>
                      <option>Custom...</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="user-registrations" defaultChecked={true} />
                      <label htmlFor="user-registrations" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        New User Registrations
                      </label>
                    </div>
                    <select className="w-40 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded py-1">
                      <option>User Managers</option>
                      <option>All Admins</option>
                      <option>Custom...</option>
                    </select>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 mt-6">System Notifications</h3>
                
                <div className="form-group">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="browser-notifications" defaultChecked={true} />
                    <label htmlFor="browser-notifications" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable Browser Notifications
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                    Show notifications in your browser when important events occur.
                  </p>
                </div>
                
                <div className="form-group">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="admin-notifications" defaultChecked={true} />
                    <label htmlFor="admin-notifications" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show Admin Bar Notifications
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Notification Cleanup</label>
                  <select className="form-input">
                    <option>After 30 days</option>
                    <option>After 60 days</option>
                    <option>After 90 days</option>
                    <option>Never</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="btn btn-primary flex items-center gap-2">
                    <Save size={16} />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Security Settings</h2>
                
                <div className="form-group">
                  <label className="form-label">Login Security</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="limit-login" defaultChecked={true} />
                      <label htmlFor="limit-login" className="text-sm text-gray-700 dark:text-gray-300">
                        Limit Login Attempts
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="two-factor" defaultChecked={false} />
                      <label htmlFor="two-factor" className="text-sm text-gray-700 dark:text-gray-300">
                        Enable Two-Factor Authentication
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="strong-passwords" defaultChecked={true} />
                      <label htmlFor="strong-passwords" className="text-sm text-gray-700 dark:text-gray-300">
                        Enforce Strong Passwords
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Session Management</label>
                  <select className="form-input">
                    <option>Expire after 24 hours</option>
                    <option>Expire after 48 hours</option>
                    <option>Expire after 7 days</option>
                    <option>Expire after 14 days</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">File Upload Security</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="scan-uploads" defaultChecked={true} />
                      <label htmlFor="scan-uploads" className="text-sm text-gray-700 dark:text-gray-300">
                        Scan Uploads for Malware
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="restrict-types" defaultChecked={true} />
                      <label htmlFor="restrict-types" className="text-sm text-gray-700 dark:text-gray-300">
                        Restrict Allowed File Types
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">API Access</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="enable-api" defaultChecked={true} />
                      <label htmlFor="enable-api" className="text-sm text-gray-700 dark:text-gray-300">
                        Enable REST API
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="api-authentication" defaultChecked={true} />
                      <label htmlFor="api-authentication" className="text-sm text-gray-700 dark:text-gray-300">
                        Require API Authentication
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Security Status</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Your security settings are up to date. Last security scan: 2 hours ago.
                  </p>
                  <div className="mt-3">
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border border-green-300 dark:border-green-700 rounded text-sm">
                      Run Security Scan
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="btn btn-primary flex items-center gap-2">
                    <Save size={16} />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;