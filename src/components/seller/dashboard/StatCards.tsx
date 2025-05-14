
import React from 'react';
import StatCard from './StatCard';

interface Stat {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

interface StatCardsProps {
  stats: Stat[];
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard 
          key={index}
          index={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default StatCards;
