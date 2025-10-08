import React from 'react';
import { TrendingUp, Users, Zap, Globe } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Globe,
      value: '2,847',
      label: 'Websites Generated',
      change: '+12% this week'
    },
    {
      icon: Users,
      value: '850+',
      label: 'Active Projects',
      change: '+8% this month'
    },
    {
      icon: Zap,
      value: '28s',
      label: 'Avg Generation Time',
      change: 'Industry leading'
    },
    {
      icon: TrendingUp,
      value: '98.5%',
      label: 'Success Rate',
      change: 'Best in class'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by the Crypto Community
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of crypto projects that have already launched their websites with DakuCrypto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center group hover:border-purple-500/50 transition-all transform hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-lg mb-4 group-hover:bg-purple-600/30 transition-colors">
                <stat.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 font-medium mb-2">{stat.label}</div>
              <div className="text-sm text-purple-400 font-medium">{stat.change}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;