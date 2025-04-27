
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const ReportNotFoundCard = () => {
  return (
    <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
      <div className="p-4 flex flex-col items-center gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
        <p className="text-amber-700 dark:text-amber-300 mb-4">
          No analysis data available. Please run an analysis to see insights here.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/demo">Analyze New Reviews</Link>
        </Button>
      </div>
    </Card>
  );
};

export default ReportNotFoundCard;
