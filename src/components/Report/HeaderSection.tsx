
import React from 'react';
import { Download, LayoutDashboard, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeaderSectionProps {
  currentDate: string;
  hasData: boolean;
  onExport: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ currentDate, hasData, onExport }) => {
  return (
    <div className="mb-8" id="report-header">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">Sentiment Analysis Report</h1>
        <div className="flex items-center justify-center gap-2">
          <hr className="w-16 border-t-2 border-blue-300" />
          <span className="text-gray-500 font-light">Generated on {currentDate}</span>
          <hr className="w-16 border-t-2 border-blue-300" />
        </div>
        
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          This report provides a comprehensive analysis of customer sentiment based on 
          collected feedback. The following insights and visualizations highlight key 
          trends and areas of focus.
        </p>
      </div>
      
      <div className="mt-6 flex justify-center gap-3">
        {hasData && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
            className="flex items-center gap-1 border-blue-300 hover:bg-blue-50"
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
        )}
        
        {hasData && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
            className="flex items-center gap-1 border-green-300 hover:bg-green-50"
          >
            <FileText className="h-4 w-4" />
            Download PDF
          </Button>
        )}
        
        <Button 
          size="sm" 
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
          asChild
        >
          <Link to="/dashboard">
            <LayoutDashboard className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
