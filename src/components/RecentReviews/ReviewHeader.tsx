
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface ReviewHeaderProps {
  totalReviews: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  averageAccuracy: number;
  hasData: boolean;
  onExport?: () => void;
  displayMode?: 'cards' | 'table';
}

const ReviewHeader = ({ 
  totalReviews,
  positiveCount,
  neutralCount,
  negativeCount,
  averageAccuracy,
  hasData,
  onExport,
  displayMode
}: ReviewHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
      <div>
        <h3 className="text-lg font-medium">Reviews Analysis</h3>
        {hasData && (
          <div className="text-sm text-gray-500 mt-1">
            {totalReviews} reviews analyzed: {positiveCount} positive, {neutralCount} neutral, {negativeCount} negative 
            • Average accuracy: {averageAccuracy}%
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {hasData && (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onExport?.()}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
            {totalReviews > 5 && (
              <div className="flex items-center gap-2">
                <Button 
                  variant={displayMode === 'cards' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => displayMode !== 'cards' && window.location.reload()}
                >
                  Cards
                </Button>
                <Button 
                  variant={displayMode === 'table' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => displayMode !== 'table' && window.location.reload()}
                >
                  Table
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewHeader;
