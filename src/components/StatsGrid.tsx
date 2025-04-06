
import React from 'react';
import StatCard from './StatCard';
import { MessageSquare, Star, Clock, TrendingUp } from 'lucide-react';

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard 
        title="Total Reviews" 
        value="3,254" 
        change="12% from last month" 
        positive={true}
        icon={<MessageSquare className="h-5 w-5 text-brand-blue" />}
      />
      <StatCard 
        title="Average Rating" 
        value="4.2/5" 
        change="0.3 from last month" 
        positive={true}
        icon={<Star className="h-5 w-5 text-brand-amber" />}
      />
      <StatCard 
        title="Response Time" 
        value="2.4 hrs" 
        change="15% from last month" 
        positive={false}
        icon={<Clock className="h-5 w-5 text-brand-teal" />}
      />
      <StatCard 
        title="Sentiment Score" 
        value="72/100" 
        change="5 points from last month" 
        positive={true}
        icon={<TrendingUp className="h-5 w-5 text-brand-blue" />}
      />
    </div>
  );
};

export default StatsGrid;
