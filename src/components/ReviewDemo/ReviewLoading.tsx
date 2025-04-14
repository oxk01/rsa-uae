
import React from 'react';

const ReviewLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">Analyzing Review...</h3>
      <p className="text-sm text-gray-500">
        Our AI is processing your review to extract sentiments and insights.
      </p>
      
      {/* Progress bar */}
      <div className="w-64 mt-8 mb-4">
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-blue-700 h-full w-3/5"></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewLoading;
