
import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Users, PackageOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const StatsSection: React.FC = () => {
  const isMobile = useIsMobile();

  const stats = [
    {
      value: "25,000+",
      label: "Value Saved (in INR)",
      icon: IndianRupee,
      color: "text-zwm-primary",
      bgColor: "bg-zwm-primary",
      percent: "80%",
      delay: 0.3
    },
    {
      value: "350+",
      label: "Active Users",
      icon: Users,
      color: "text-zwm-secondary",
      bgColor: "bg-zwm-secondary",
      percent: "65%",
      delay: 0.5
    },
    {
      value: "1,200kg",
      label: "Food Waste Prevented",
      icon: PackageOpen,
      color: "text-zwm-accent",
      bgColor: "bg-zwm-accent",
      percent: "45%",
      delay: 0.7
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-zwm-primary" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-zwm-secondary" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold font-heading text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Making an <span className="text-zwm-primary">Impact</span>
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Together, we're building a more sustainable future by reducing waste and helping communities.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-10 grid-cols-1 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="rounded-xl bg-white p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: isMobile ? 0.2 * index : index === 0 ? 0 : index === 1 ? 0.3 : 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full ${stat.bgColor} bg-opacity-10 mr-4`}>
                  {stat.icon && <stat.icon className={`h-7 w-7 ${stat.color}`} />}
                </div>
                <div className={`text-4xl md:text-5xl font-bold font-heading ${stat.color}`}>{stat.value}</div>
              </div>
              <p className="text-lg md:text-xl text-gray-600">{stat.label}</p>
              <div className="h-2 w-full bg-gray-100 rounded-full mt-6 overflow-hidden">
                <motion.div 
                  className={`h-full ${stat.bgColor} rounded-full`} 
                  initial={{ width: 0 }}
                  whileInView={{ width: stat.percent }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: stat.delay }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
