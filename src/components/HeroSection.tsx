import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-800/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-purple-900/50 border border-purple-700/50 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-300 font-medium">AI-Powered Website Generation</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Generate Professional{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Crypto Websites
          </span>{' '}
          Instantly
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Describe your vision, upload your logo, get a live website in 30 seconds. 
          No coding required, no design skills needed.
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
          <Link
            href="/directory"
            className="text-gray-300 hover:text-white px-8 py-4 rounded-xl text-lg font-medium border border-gray-700 hover:border-purple-500/50 transition-all"
          >
            View Examples
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span>2,847 Websites Created</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-purple-400" />
            <span>850+ Active Projects</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>30 Second Average Generation</span>
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-16 relative">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="bg-gray-900/80 rounded-lg p-4">
              <div className="text-left text-gray-300 font-mono text-sm">
                <div className="text-purple-400">// Describe your crypto project</div>
                <div className="mt-2">
                  "Create a modern DeFi lending platform website with<br />
                  dark theme, analytics dashboard, and staking features..."
                </div>
                <div className="mt-4 text-green-400">✓ Website generated in 28 seconds</div>
              </div>
            </div>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-3xl blur-xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;