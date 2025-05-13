
import React from 'react';
import { motion } from 'framer-motion';

const Starfield: React.FC = () => {
  // Create an array of 80 elements for the stars
  const stars = [...Array(80)].map((_, index) => ({
    key: index,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 3 + 1}px`,
    height: `${Math.random() * 3 + 1}px`,
    delay: Math.random() * 4,
    duration: 1 + Math.random() * 4
  }));

  return (
    <>
      {/* Enhanced star field background with more stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.key}`}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.width,
            height: star.height,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </>
  );
};

export default Starfield;
