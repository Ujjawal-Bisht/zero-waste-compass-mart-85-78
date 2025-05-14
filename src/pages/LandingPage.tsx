
import React from 'react';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesTabs from '@/components/landing/FeaturesTabs';
import StatsSection from '@/components/landing/StatsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import { Toaster } from 'sonner';
import ChatBot from '@/components/ChatBot';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      <Header />
      <HeroSection />
      <FeaturesTabs />
      <StatsSection />
      <CTASection />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default LandingPage;
