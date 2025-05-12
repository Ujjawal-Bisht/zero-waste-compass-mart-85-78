
import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee } from 'lucide-react';
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
      color: "text-zwm-secondary",
      bgColor: "bg-zwm-secondary",
      percent: "65%",
      delay: 0.5
    },
    {
      value: "1,200kg",
      label: "Food Waste Prevented",
      color: "text-zwm-accent",
      bgColor: "bg-zwm-accent",
      percent: "45%",
      delay: 0.7
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">Making an Impact</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Together, we're building a more sustainable future by reducing waste and helping communities.
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="zwm-card p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: isMobile ? 0.2 * index : index === 0 ? 0 : index === 1 ? 0.3 : 0.6 }}
            >
              <div className="flex items-center">
                {stat.icon && <stat.icon className={`h-7 w-7 ${stat.color} mr-2`} />}
                <div className={`text-3xl md:text-4xl font-bold font-heading ${stat.color}`}>{stat.value}</div>
              </div>
              <p className="mt-2 text-base md:text-lg text-gray-600">{stat.label}</p>
              <div className="h-2 w-full bg-gray-100 rounded-full mt-4">
                <motion.div 
                  className={`h-full ${stat.bgColor} rounded-full`} 
                  initial={{ width: 0 }}
                  whileInView={{ width: stat.percent }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: stat.delay }}
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
