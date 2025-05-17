import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  type?: 'books' | 'audio' | 'video' | 'default';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  type = 'default'
}) => {
  const getChangeColor = () => {
    if (!change) return '';
    return change > 0 ? 'text-green-500' : 'text-red-500';
  };
  
  const getIconBgColor = () => {
    switch(type) {
      case 'books':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'audio':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'video':
        return 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };
  
  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {change !== undefined && (
              <p className={`ml-2 flex items-center text-sm ${getChangeColor()}`}>
                {change > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(change)}%
              </p>
            )}
          </div>
        </div>
        <div className={`p-2 rounded-lg ${getIconBgColor()}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;