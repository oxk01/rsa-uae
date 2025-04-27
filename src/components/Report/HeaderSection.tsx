
import React from 'react';
import { Download, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeaderSectionProps {
  currentDate: string;
  hasData: boolean;
  onExport: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ currentDate, hasData, onExport }) => {
  return (
    <div className="text-center mb-8" id="report-header">
      <h1 className="text-2xl font-bold mb-2">Comprehensive Sentiment Analysis Report</h1>
      <p className="text-gray-500">Generated on {currentDate}</p>
      <div className="mt-4 flex justify-center gap-2">
        {hasData && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
        )}
        <Button 
          size="sm" 
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
          asChild
        >
          <Link to="/dashboard">
            <LayoutDashboard className="h-4 w-4" />
            New Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
