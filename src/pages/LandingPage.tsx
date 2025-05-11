
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-zwm-primary flex items-center justify-center text-white font-bold text-xl">
                Z
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Zero Waste Mart</span>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  className="zwm-gradient hover:opacity-90 transition-opacity"
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
                    className="zwm-gradient hover:opacity-90 transition-opacity"
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Reduce Waste, Share Value
              </h1>
              <p className="mt-6 text-xl text-white opacity-90 max-w-2xl">
                Join the community fighting food waste and promoting sustainability. Share, donate, or sell your excess items.
              </p>
              <div className="mt-10">
                <Button
                  onClick={handleGetStarted}
                  className="bg-white text-zwm-primary hover:bg-gray-100 text-lg px-8 py-6"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          {/* Abstract Shapes */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute -right-5 -top-20 w-96 h-96 rounded-full bg-white opacity-20"></div>
            <div className="absolute right-20 bottom-10 w-64 h-64 rounded-full bg-white opacity-10"></div>
            <div className="absolute left-20 top-40 w-72 h-72 rounded-full bg-white opacity-10"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform helps connect people with excess items to those who need them, reducing waste and building community.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-zwm-primary bg-opacity-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zwm-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Upload Items</h3>
              <p className="mt-2 text-gray-600">
                Add items you no longer need with details, photos, and location for potential recipients to find.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-zwm-secondary bg-opacity-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zwm-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Connect</h3>
              <p className="mt-2 text-gray-600">
                Our platform matches your items with nearby people or organizations that can use them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-zwm-accent bg-opacity-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zwm-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Donate or Sell</h3>
              <p className="mt-2 text-gray-600">
                Choose to donate your items for free or offer them at a discounted price to reduce waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Making an Impact</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Together, we're building a more sustainable future by reducing waste and helping communities.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-zwm-primary">2,500+</div>
              <p className="mt-2 text-lg text-gray-600">Items Shared</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-zwm-secondary">350+</div>
              <p className="mt-2 text-lg text-gray-600">Active Users</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-zwm-accent">1,200kg</div>
              <p className="mt-2 text-lg text-gray-600">Food Waste Prevented</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-zwm-primary to-zwm-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Join Zero Waste Mart Today</h2>
          <p className="mt-4 text-xl text-white opacity-90 max-w-2xl mx-auto">
            Start sharing, reducing waste, and making a difference in your community.
          </p>
          <div className="mt-8">
            <Button
              onClick={handleGetStarted}
              className="bg-white text-zwm-primary hover:bg-gray-100 text-lg px-8 py-6"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-zwm-primary flex items-center justify-center text-white font-bold text-xl">
                  Z
                </div>
                <span className="ml-3 text-xl font-bold">Zero Waste Mart</span>
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
                    <a href="#" className="text-gray-400 hover:text-white">How It Works</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Features</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Pricing</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">FAQ</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
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
