
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface ReviewLoadingProps {
  progress?: number;
  status?: string;
}

const ReviewLoading = ({ progress = 0, status = 'Analyzing...' }: ReviewLoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
          <h2 className="text-2xl font-semibold text-blue-900 mb-1">Analyzing your data</h2>
          <p className="text-gray-500">{status}</p>
        </div>
        
        <div className="w-full">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 mt-2 text-center">{progress}% complete</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
          <p>Our sentiment analysis algorithm is processing your data. For large files, this may take a few moments.</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewLoading;
