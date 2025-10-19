import React from 'react';
import Link from 'next/link';
import { ExternalLink, Eye, Calendar } from 'lucide-react';

interface WebsiteCardProps {
  website: {
    id: string;
    name: string;
    description: string;
    customUrl: string;
    logoUrl?: string;
    visitCount: number;
    createdAt: string;
    isFeatured?: boolean;
    category?: string;
  };
}

const WebsiteCard = ({ website }: WebsiteCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatVisitCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2 hover:border-purple-500/50 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
      {/* Header with Logo and Title */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {website.logoUrl ? (
            <img 
              src={website.logoUrl} 
              alt={`${website.name} logo`}
              className="w-12 h-12 rounded-lg object-cover bg-gray-700"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {website.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
              {website.name}
            </h3>
            <p className="text-sm text-gray-400">/{website.customUrl}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
        {website.description}
      </p>

      {/* Footer Stats */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{formatVisitCount(website.visitCount)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(website.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href={`/site/${website.customUrl}`}
        className="w-full bg-gradient-to-r from-purple-600/20 to-purple-700/20 hover:from-purple-600/30 hover:to-purple-700/30 text-purple-300 hover:text-white border border-purple-600/50 hover:border-purple-500 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2 group"
      >
        <span>View Website</span>
        <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </Link>
    </div>
  );
};

export default WebsiteCard;