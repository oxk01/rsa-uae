
import React from 'react';
import { UploadCloud, FileSpreadsheet, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  
  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  // Check if file is large
  const isLargeFile = file && file.size > 5 * 1024 * 1024; // 5MB
  
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-lg font-medium text-navy-700 mb-4 text-center">Upload excel file</h2>
        
        <Alert variant="default" className="mb-4 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            Now supporting large datasets with 10,000+ reviews. Analysis time will increase with file size.
          </AlertDescription>
        </Alert>
        
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
              <div className="flex items-center justify-center mb-4">
                <FileSpreadsheet className="h-6 w-6 text-blue-500 mr-2" />
                <div>
                  <span className="font-medium">{file.name}</span>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              
              {isLargeFile && (
                <div className="mb-4 p-2 bg-amber-50 border border-amber-100 rounded-md text-sm text-amber-700">
                  <p>Large file detected. Analysis may take several minutes to complete.</p>
                </div>
              )}
              
              <div className="flex justify-center">
                <Button 
                  onClick={onAnalyze}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Analyze File
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
