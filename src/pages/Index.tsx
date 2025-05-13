// Update this page (the content is just a fallback if you fail to update the page)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, MessageCircle, ShoppingBag, IndianRupee } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { motion } from 'framer-motion';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import FeaturesTabs from '@/components/landing/FeaturesTabs';
import Header from '@/components/landing/Header';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Header/Navigation */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section with Tabs */}
      <FeaturesTabs />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section with logo */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
