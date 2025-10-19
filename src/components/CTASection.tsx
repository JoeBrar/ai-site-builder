import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-purple-800/10 to-purple-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full mb-8">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Launch Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Crypto Project?
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of people who have already created their websites using AI
            <br/>
            Create and host in one-click
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/generate"
              className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-500/25"
            >
              <span>Start Building Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/directory"
              className="text-gray-300 hover:text-white px-8 py-4 rounded-xl text-lg font-medium border border-gray-700 hover:border-purple-500/50 transition-all"
            >
              Explore Examples
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-4">Trusted by leading platforms</p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500">
              <span className="text-sm font-medium">DeFi Pulse</span>
              <span className="text-sm font-medium">CoinGecko</span>
              <span className="text-sm font-medium">CryptoCompare</span>
              <span className="text-sm font-medium">DeFiLlama</span>
              <span className="text-sm font-medium">CoinMarketCap</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;