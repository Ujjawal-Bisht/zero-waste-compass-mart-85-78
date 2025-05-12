
import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
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
  );
};

export default StatsSection;
