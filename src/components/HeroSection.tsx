import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-18 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-800/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Token Requirement Message */}
      <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg px-2 py-1 mb-6 max-w-sm mx-auto">
        <p className="text-purple-300 text-center">
          <span className="font-semibold text-purple-400 text-xs">Have a crypto token but no website? </span>
          <br className="sm:hidden" />
          <span className="text-gray-300 text-xs"></span>
        </p>
      </div>

      <div className="relative container mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Generate Professional{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Crypto Websites
          </span>{' '}
          Instantly
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
          Create and host your website in a single click
          <br />
          <span className="text-lg sm:text-xl text-gray-400">No coding • No configuration • No hassle</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/generate"
            className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-500/25"
          >
            <span>Generate Your Website Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-purple-900/50 border border-purple-700/50 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-300 font-medium">AI-Powered Website Generation</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;