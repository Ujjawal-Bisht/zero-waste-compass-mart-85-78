// Update this page (the content is just a fallback if you fail to update the page)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, MessageCircle, ShoppingBag, IndianRupee } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.3 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Logo size="lg" onClick={() => navigate('/')} />
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  className="zwm-gradient-hover"
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => navigate('/register')} 
                    className="zwm-gradient-hover"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-zwm-primary to-zwm-secondary overflow-hidden">
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="md:w-2/3" variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight">
                Reduce Waste, <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Share Value</span>
              </h1>
              <p className="mt-6 text-xl text-white opacity-90 max-w-2xl">
                Join the community fighting food waste and promoting sustainability. Share, donate, or sell your excess items.
              </p>
              <motion.div 
                className="mt-10"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleGetStarted}
                  className="bg-white text-zwm-primary hover:bg-gray-100 text-lg px-8 py-6 shadow-lg"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Abstract Shapes */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <motion.div 
              className="absolute -right-5 -top-20 w-96 h-96 rounded-full bg-white opacity-20" 
              animate={{ 
                y: [0, -20, 0, -10, 0], 
                scale: [1, 1.05, 1, 1.03, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "loop" }}
            ></motion.div>
            <motion.div 
              className="absolute right-20 bottom-10 w-64 h-64 rounded-full bg-white opacity-10" 
              animate={{ 
                y: [0, 20, 0, 10, 0],
                scale: [1, 1.1, 1, 1.05, 1],
                rotate: [0, -5, 0, 5, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, repeatType: "loop", delay: 1 }}
            ></motion.div>
            <motion.div 
              className="absolute left-20 top-40 w-72 h-72 rounded-full bg-white opacity-10" 
              animate={{ 
                y: [0, -15, 0, -10, 0],
                scale: [1, 1.08, 1, 1.04, 1],
                rotate: [0, 3, 0, -3, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "loop", delay: 2 }}
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform helps connect people with excess items to those who need them, reducing waste and building community.
            </p>
          </motion.div>

          <motion.div className="mt-16 grid gap-8 md:grid-cols-3" variants={containerVariants}>
            {/* Feature 1 */}
            <motion.div 
              className="zwm-card p-8 text-center"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <motion.div 
                className="mx-auto h-16 w-16 rounded-full bg-zwm-primary bg-opacity-10 flex items-center justify-center mb-6"
                whileHover={{ rotate: [0, 10, -10, 0], transition: { duration: 0.5 } }}
              >
                <Upload className="h-8 w-8 text-zwm-primary" />
              </motion.div>
              <h3 className="mt-2 text-xl font-medium font-heading text-gray-900">Upload Items</h3>
              <p className="mt-3 text-gray-600">
                Add items you no longer need with details, photos, and location for potential recipients to find.
              </p>
              <Button variant="ghost" className="mt-4 text-zwm-primary hover:bg-zwm-primary/10">Learn More</Button>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="zwm-card p-8 text-center"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <motion.div 
                className="mx-auto h-16 w-16 rounded-full bg-zwm-secondary bg-opacity-10 flex items-center justify-center mb-6"
                whileHover={{ scale: [1, 1.2, 1], transition: { duration: 0.5 } }}
              >
                <MessageCircle className="h-8 w-8 text-zwm-secondary" />
              </motion.div>
              <h3 className="mt-2 text-xl font-medium font-heading text-gray-900">Connect</h3>
              <p className="mt-3 text-gray-600">
                Our platform matches your items with nearby people or organizations that can use them.
              </p>
              <Button variant="ghost" className="mt-4 text-zwm-secondary hover:bg-zwm-secondary/10">Learn More</Button>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="zwm-card p-8 text-center"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <motion.div 
                className="mx-auto h-16 w-16 rounded-full bg-zwm-accent bg-opacity-10 flex items-center justify-center mb-6"
                whileHover={{ y: [0, -5, 0, -5, 0], transition: { duration: 0.7 } }}
              >
                <div className="relative">
                  <ShoppingBag className="h-8 w-8 text-zwm-accent" />
                  <IndianRupee className="h-4 w-4 text-zwm-accent absolute -top-1 -right-1" />
                </div>
              </motion.div>
              <h3 className="mt-2 text-xl font-medium font-heading text-gray-900">Donate or Sell</h3>
              <p className="mt-3 text-gray-600">
                Choose to donate your items for free or offer them at a discounted price to reduce waste.
              </p>
              <Button variant="ghost" className="mt-4 text-zwm-accent hover:bg-zwm-accent/10">Learn More</Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 md:py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">Making an Impact</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Together, we're building a more sustainable future by reducing waste and helping communities.
            </p>
          </div>

          <motion.div 
            className="mt-12 grid gap-8 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="zwm-card p-8"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-4xl font-bold font-heading text-zwm-primary">2,500+</div>
              <p className="mt-2 text-lg text-gray-600">Items Shared</p>
              <div className="h-2 w-full bg-gray-100 rounded-full mt-4">
                <motion.div 
                  className="h-full bg-zwm-primary rounded-full" 
                  initial={{ width: 0 }}
                  whileInView={{ width: '80%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </motion.div>
            <motion.div 
              className="zwm-card p-8" 
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-4xl font-bold font-heading text-zwm-secondary">350+</div>
              <p className="mt-2 text-lg text-gray-600">Active Users</p>
              <div className="h-2 w-full bg-gray-100 rounded-full mt-4">
                <motion.div 
                  className="h-full bg-zwm-secondary rounded-full" 
                  initial={{ width: 0 }}
                  whileInView={{ width: '65%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>
            <motion.div 
              className="zwm-card p-8" 
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-4xl font-bold font-heading text-zwm-accent">1,200kg</div>
              <p className="mt-2 text-lg text-gray-600">Food Waste Prevented</p>
              <div className="h-2 w-full bg-gray-100 rounded-full mt-4">
                <motion.div 
                  className="h-full bg-zwm-accent rounded-full" 
                  initial={{ width: 0 }}
                  whileInView={{ width: '45%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section with logo */}
      <section className="bg-gradient-to-r from-zwm-primary to-zwm-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Logo size="xl" />
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold font-heading text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join Zero Waste Mart Today
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-white opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Start sharing, reducing waste, and making a difference in your community.
          </motion.p>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleGetStarted}
              className="bg-white text-zwm-primary hover:bg-gray-100 text-lg px-8 py-6 shadow-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        {/* ... keep existing code (footer content) */}
      </footer>
    </div>
  );
};

export default Index;
