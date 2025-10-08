"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, Eye, Calendar, Star } from 'lucide-react';
import { mockWebsites } from '@/data/mockData';

const WebsitePage = () => {
  const { url } = useParams();
  const website = mockWebsites.find(w => w.customUrl === url);

  if (!website) {
    return (
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Website Not Found</h1>
          <p className="text-gray-300 mb-8">
            The website you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/directory"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatVisitCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/directory"
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>
        </div>

        {/* Website Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start space-x-4 flex-1">
              {website.logoUrl ? (
                <img 
                  src={website.logoUrl} 
                  alt={`${website.name} logo`}
                  className="w-16 h-16 rounded-xl object-cover bg-gray-700 flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">
                    {website.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {website.name}
                  </h1>
                  {website.isFeatured && (
                    <div className="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  dakucrypto.com/{website.customUrl}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {website.description}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-center space-x-2 text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{formatVisitCount(website.visitCount)} visits</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Created {formatDate(website.createdAt)}</span>
            </div>
            {website.category && (
              <div className="inline-block">
                <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs font-medium">
                  {website.category}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Website Preview */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Website Preview</h2>
            <a
              href={`https://example.com/${website.customUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <span>Visit Live Site</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Mock Website Preview */}
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="flex-1 bg-gray-700 rounded ml-4 px-3 py-1">
                <span className="text-gray-400 text-xs">https://dakucrypto.com/{website.customUrl}</span>
              </div>
            </div>
            
            <div className="p-8 min-h-96 bg-gradient-to-br from-purple-900/20 to-gray-900">
              <div className="text-center">
                <div className="inline-block p-3 bg-purple-600 rounded-xl mb-6">
                  {website.logoUrl ? (
                    <img src={website.logoUrl} alt="Logo" className="w-12 h-12" />
                  ) : (
                    <span className="text-white font-bold text-xl">
                      {website.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">{website.name}</h1>
                <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                  {website.description}
                </p>
                <div className="space-x-4">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
                    Get Started
                  </button>
                  <button className="border border-purple-600 text-purple-400 hover:bg-purple-600/10 px-6 py-3 rounded-lg">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Projects */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Similar Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockWebsites
              .filter(w => w.id !== website.id && w.category === website.category)
              .slice(0, 3)
              .map(similar => (
                <Link
                  key={similar.id}
                  href={`/site/${similar.customUrl}`}
                  className="bg-gray-900/50 border border-gray-700 hover:border-purple-500/50 rounded-lg p-4 transition-all group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    {similar.logoUrl ? (
                      <img src={similar.logoUrl} alt="Logo" className="w-8 h-8 rounded" />
                    ) : (
                      <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {similar.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                      {similar.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {similar.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>{formatVisitCount(similar.visitCount)} visits</span>
                    <span>{formatDate(similar.createdAt)}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default WebsitePage;