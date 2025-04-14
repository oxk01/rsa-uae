
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ReviewInputProps {
  reviewText: string;
  onReviewChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  characterCount: number;
  onFileChange: (file: File | null) => void;
  onAnalyze: () => void;
  file: File | null;
}

const ReviewInput = ({
  reviewText,
  onReviewChange,
  characterCount,
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
  
  return (
    <div>
      {/* Use shadcn Tabs component for better centered tabs */}
      <Tabs defaultValue="text" className="mx-auto max-w-3xl">
        <div className="flex justify-center border-b">
          <TabsList className="bg-transparent mb-0">
            <TabsTrigger 
              value="text"
              className="px-8 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent"
            >
              Text Review Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="excel"
              className="px-8 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent"
            >
              Excel Data Analysis
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <TabsContent value="text" className="m-0">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-lg font-medium text-navy-700 mb-4 text-center">Enter your review</h2>
              <Textarea
                className="min-h-[120px] border rounded-md p-4 resize-none"
                placeholder="Type or paste a product/service review here..."
                value={reviewText}
                onChange={onReviewChange}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">{characterCount} characters</span>
                <Button 
                  onClick={onAnalyze} 
                  disabled={!reviewText && !file}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Analyze Review
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="excel" className="m-0">
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
                    <div className="flex items-center justify-center mb-4">
                      <UploadCloud className="h-6 w-6 text-blue-500 mr-2" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => onFileChange(null)}
                      >
                        Replace File
                      </Button>
                      <Button 
                        onClick={onAnalyze}
                        className="bg-blue-500 hover:bg-blue-600"
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
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ReviewInput;
