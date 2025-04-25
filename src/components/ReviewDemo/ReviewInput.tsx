
import React from 'react';
import { UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ReviewInputProps {
  onFileChange: (file: File | null) => void;
  onAnalyze: () => void;
  file: File | null;
}

const ReviewInput = ({
  onFileChange,
  onAnalyze,
  file
}: ReviewInputProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is CSV or Excel
      const validExtensions = ['.csv', '.xlsx', '.xls'];
      const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (!validExtensions.includes(fileExtension)) {
        onFileChange(null);
        return;
      }
      
      onFileChange(selectedFile);
    }
  };
  
  // Format file size to a readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Check if file is large (> 5MB)
  const isLargeFile = file && file.size > 5 * 1024 * 1024;
  
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-lg font-medium text-navy-700 mb-4 text-center">Upload excel file</h2>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          {!file ? (
            <>
              <UploadCloud className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="mb-4 text-gray-500">Drop your Excel file here, or click to browse</p>
              <Button 
                variant="outline" 
                className="mx-auto"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <UploadCloud className="mr-2" />
                Choose Excel File
              </Button>
              <Input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="sr-only"
              />
            </>
          ) : (
            <>
              <div className="flex flex-col items-center mb-4">
                <div className="flex items-center">
                  <UploadCloud className="h-6 w-6 text-blue-500 mr-2" />
                  <span className="font-medium">{file.name}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50">
                    {formatFileSize(file.size)}
                  </Badge>
                  {isLargeFile && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      Large File - Full Analysis
                    </Badge>
                  )}
                </div>
                {isLargeFile && (
                  <p className="text-sm text-gray-500 mt-2">
                    This is a large file. Processing may take a bit longer for complete analysis.
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={onAnalyze}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Analyze All Data
                </Button>
              </div>
            </>
          )}
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Supported formats: .csv, .xlsx, .xls
        </p>
      </div>
    </div>
  );
};

export default ReviewInput;
