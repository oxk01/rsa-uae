
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { MessageSquare } from 'lucide-react';
import DashboardCard from './DashboardCard';

const data = [
  { name: 'Website', value: 45 },
  { name: 'Mobile App', value: 28 },
  { name: 'Social Media', value: 17 },
  { name: 'Email', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReviewSources = () => {
  return (
    <DashboardCard 
      title="Review Sources" 
      icon={<MessageSquare className="h-4 w-4" />}
      className="col-span-1"
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-2">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <span className="text-xs">{entry.name}</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default ReviewSources;
