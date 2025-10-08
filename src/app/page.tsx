import React from 'react';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import DiscoverySection from '@/components/DiscoverySection';
import CTASection from '@/components/CTASection';

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <DiscoverySection />
      <CTASection />
    </main>
  );
};

export default HomePage;