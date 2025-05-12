import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, MessageCircle, ShoppingBag, IndianRupee, PillBottle, Package } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
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
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Logo size="md" showText={true} animated={true} onClick={() => navigate('/')} />
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
            <div className="md:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Logo size="xl" showText={true} animated={true} />
              </motion.div>
              <motion.h1 
                className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Reduce Waste, <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Share Value</span>
              </motion.h1>
              <motion.p 
                className="mt-6 text-xl text-white opacity-90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Join the community fighting food waste and promoting sustainability. Share, donate, or sell your excess items.
              </motion.p>
              <motion.div 
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
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
          </div>
          {/* Abstract Shapes */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <motion.div 
              className="absolute -right-5 -top-20 w-96 h-96 rounded-full bg-white opacity-20"
              animate={{ 
                y: [0, -20, 0], 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            ></motion.div>
            <motion.div 
              className="absolute right-20 bottom-10 w-64 h-64 rounded-full bg-white opacity-10"
              animate={{ 
                y: [0, 20, 0], 
                scale: [1, 1.05, 1],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            ></motion.div>
            <motion.div 
              className="absolute left-20 top-40 w-72 h-72 rounded-full bg-white opacity-10"
              animate={{ 
                y: [0, -15, 0], 
                scale: [1, 1.08, 1],
                rotate: [0, 3, 0]
              }}
              transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", delay: 2 }}
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform helps connect people with excess items to those who need them, reducing waste and building community.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {/* Feature 1 */}
            <motion.div 
              className="zwm-card p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
                Add items you no longer need with details, photos, and location.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="zwm-card p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
                Our platform matches your items with nearby people or organizations.
              </p>
            </motion.div>

            {/* Feature 3 - Packaged Food */}
            <motion.div 
              className="zwm-card p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <motion.div 
                className="mx-auto h-16 w-16 rounded-full bg-zwm-accent bg-opacity-10 flex items-center justify-center mb-6"
                whileHover={{ y: [0, -5, 0], transition: { duration: 0.5, repeat: 1 } }}
              >
                <Package className="h-8 w-8 text-zwm-accent" />
              </motion.div>
              <h3 className="mt-2 text-xl font-medium font-heading text-gray-900">Packaged Food</h3>
              <p className="mt-3 text-gray-600">
                Find quality packaged food items near expiry at discounted prices in <IndianRupee className="inline h-4 w-4" />.
              </p>
            </motion.div>

            {/* Feature 4 - Medicines */}
            <motion.div 
              className="zwm-card p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <motion.div 
                className="mx-auto h-16 w-16 rounded-full bg-zwm-primary bg-opacity-10 flex items-center justify-center mb-6"
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                <PillBottle className="h-8 w-8 text-zwm-primary" />
              </motion.div>
              <h3 className="mt-2 text-xl font-medium font-heading text-gray-900">Medicines</h3>
              <p className="mt-3 text-gray-600">
                Access unexpired medicines at affordable prices in <IndianRupee className="inline h-4 w-4" /> from verified sellers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">Making an Impact</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Together, we're building a more sustainable future by reducing waste and helping communities.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <motion.div 
              className="zwm-card p-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center">
                <IndianRupee className="h-8 w-8 text-zwm-primary mr-2" />
                <div className="text-4xl font-bold font-heading text-zwm-primary">25,000+</div>
              </div>
              <p className="mt-2 text-lg text-gray-600">Value Saved (in INR)</p>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-zwm-primary to-zwm-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Logo size="xl" showText={true} />
          </motion.div>
          <motion.h2 
            className="mt-8 text-3xl font-bold font-heading text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Join Zero Waste Mart Today
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-white opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Start sharing, reducing waste, and making a difference in your community.
          </motion.p>
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full zwm-gradient flex items-center justify-center text-white font-bold text-xl">
                  Z
                </div>
                <span className="ml-3 text-xl font-bold font-heading">Zero Waste Mart</span>
              </div>
              <p className="mt-2 text-gray-400 max-w-md">
                A platform for reducing waste and building community through sharing.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Platform</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm text-center">
              &copy; {new Date().getFullYear()} Zero Waste Mart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
