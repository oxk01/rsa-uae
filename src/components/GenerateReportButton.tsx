
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Correct import path
import { FileText, Loader2, Download, BarChart3 } from 'lucide-react'; // Replace FileChart with BarChart3
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface GenerateReportButtonProps {
  hasData: boolean;
  onGenerate?: () => void;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showReport?: boolean;
}

const GenerateReportButton: React.FC<GenerateReportButtonProps> = ({ 
  hasData = false,
  onGenerate,
  variant = "default",
  size = "default",
  className = "",
  showReport = false
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary');

  const generateReportDocContent = () => {
    // Get saved analyses from localStorage
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    const analyses = savedAnalysesStr ? JSON.parse(savedAnalysesStr) : [];
    
    // If no analyses exist, return empty content
    if (!analyses.length) return '';
    
    // Create document content with proper formatting for Word
    let docContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Sentiment Analysis Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #1e40af; }
            h2 { color: #2563eb; margin-top: 20px; }
            table { border-collapse: collapse; width: 100%; margin: 15px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .positive { color: green; }
            .neutral { color: gray; }
            .negative { color: red; }
            .header { background-color: #1e40af; color: white; padding: 10px; }
            .section { margin-top: 20px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Sentiment Analysis Detailed Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div class="section">
            <h2>Executive Summary</h2>
            <p>This report contains sentiment analysis for ${analyses.length} datasets with a total of ${analyses.reduce((sum, a) => sum + a.reviewCount, 0)} reviews analyzed.</p>
          </div>
    `;
    
    // Add individual analysis sections
    analyses.forEach((analysis, index) => {
      const positivePercentage = Math.round((analysis.sentiment.positive / analysis.reviewCount) * 100);
      const neutralPercentage = Math.round((analysis.sentiment.neutral / analysis.reviewCount) * 100);
      const negativePercentage = Math.round((analysis.sentiment.negative / analysis.reviewCount) * 100);
      
      docContent += `
        <div class="section">
          <h2>Analysis ${index + 1}: ${analysis.title}</h2>
          <p>Date: ${analysis.date}</p>
          <p>Total reviews: ${analysis.reviewCount}</p>
          
          <h3>Sentiment Distribution</h3>
          <table>
            <tr>
              <th>Sentiment</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
            <tr>
              <td class="positive">Positive</td>
              <td>${analysis.sentiment.positive}</td>
              <td>${positivePercentage}%</td>
            </tr>
            <tr>
              <td class="neutral">Neutral</td>
              <td>${analysis.sentiment.neutral}</td>
              <td>${neutralPercentage}%</td>
            </tr>
            <tr>
              <td class="negative">Negative</td>
              <td>${analysis.sentiment.negative}</td>
              <td>${negativePercentage}%</td>
            </tr>
          </table>
          
          <h3>Key Topics Identified</h3>
          <table>
            <tr>
              <th>Keyword</th>
              <th>Sentiment</th>
              <th>Count</th>
            </tr>
            ${analysis.keywords.map(k => `
              <tr>
                <td>${k.word}</td>
                <td class="${k.sentiment}">${k.sentiment}</td>
                <td>${k.count}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      `;
    });
    
    docContent += `
          <div class="section">
            <h2>Methodology</h2>
            <p>This analysis was performed using advanced NLP techniques including contextual sentiment analysis with BERT models and aspect-based sentiment analysis.</p>
          </div>
        </body>
      </html>
    `;
    
    return { docContent, analyses };
  };

  const handleGenerateReport = async () => {
    if (!hasData) {
      toast({
        title: t('noDataAvailable'),
        description: t('analyzeReviews'),
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Generate the Word document content with actual data
      const result = generateReportDocContent();
      
      // Fix TypeScript errors by proper type checking
      if (typeof result === 'string') {
        // Handle empty result case
        setReportData(null);
      } else {
        // Handle proper result object
        const { docContent, analyses } = result;
        setReportData(analyses);
      }
      
      if (showReport) {
        setIsOpen(true);
      } else {
        // Only proceed with download if we have content
        if (typeof result !== 'string' && result.docContent) {
          // Convert HTML to a Blob for download
          const blob = new Blob([result.docContent], { type: 'application/msword;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          
          // Create a link and trigger the download
          const link = document.createElement('a');
          link.href = url;
          link.download = 'sentiment-analysis-report.doc';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          if (onGenerate) {
            onGenerate();
          }
          
          toast({
            title: t('reportGenerated'),
            description: t('reportDownloaded'),
          });
        }
      }
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your report.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressBarColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'bg-green-600';
      case 'negative': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <>
      {showReport ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
              variant={variant}
              size={size}
              className={`gap-2 transition-all duration-300 hover:shadow-md ${className}`}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <BarChart3 className="h-4 w-4" />
              )}
              View Detailed Report
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh]">
            <div className="px-4 py-6 max-w-4xl mx-auto w-full overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Sentiment Analysis Report</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className={viewMode === 'summary' ? 'bg-blue-100' : ''}
                    onClick={() => setViewMode('summary')}
                  >
                    Summary
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className={viewMode === 'detailed' ? 'bg-blue-100' : ''}
                    onClick={() => setViewMode('detailed')}
                  >
                    Detailed
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>

              {reportData && (
                <>
                  {/* Executive Summary */}
                  <div className="mb-8 bg-white p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Executive Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-50 p-4 rounded-md">
                        <p className="text-sm text-blue-700">Total Analyses</p>
                        <p className="text-2xl font-bold">{reportData.length}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-md">
                        <p className="text-sm text-green-700">Total Reviews</p>
                        <p className="text-2xl font-bold">
                          {reportData.reduce((sum: number, a: any) => sum + a.reviewCount, 0)}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-md">
                        <p className="text-sm text-purple-700">Generated On</p>
                        <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Analyses */}
                  {reportData.map((analysis: any, index: number) => (
                    <div key={index} className="mb-8 bg-white p-6 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-2">{analysis.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">Date: {analysis.date}</p>

                      {/* Sentiment Distribution */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-2">Sentiment Distribution</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-green-600">Positive</span>
                              <span className="text-sm text-green-600">{analysis.sentiment.positive} reviews</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${(analysis.sentiment.positive / analysis.reviewCount) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-right mt-1 text-gray-500">
                              {Math.round((analysis.sentiment.positive / analysis.reviewCount) * 100)}%
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-600">Neutral</span>
                              <span className="text-sm text-gray-600">{analysis.sentiment.neutral} reviews</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gray-600 h-2 rounded-full" 
                                style={{ width: `${(analysis.sentiment.neutral / analysis.reviewCount) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-right mt-1 text-gray-500">
                              {Math.round((analysis.sentiment.neutral / analysis.reviewCount) * 100)}%
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-red-600">Negative</span>
                              <span className="text-sm text-red-600">{analysis.sentiment.negative} reviews</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-red-600 h-2 rounded-full" 
                                style={{ width: `${(analysis.sentiment.negative / analysis.reviewCount) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-right mt-1 text-gray-500">
                              {Math.round((analysis.sentiment.negative / analysis.reviewCount) * 100)}%
                            </div>
                          </div>
                        </div>
                      </div>

                      {viewMode === 'detailed' && (
                        <div className="mb-6">
                          <h4 className="font-medium mb-2">Key Topics Analysis</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Keyword</TableHead>
                                <TableHead>Sentiment</TableHead>
                                <TableHead>Occurrences</TableHead>
                                <TableHead>Distribution</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {analysis.keywords.map((keyword: any, kIndex: number) => (
                                <TableRow key={kIndex}>
                                  <TableCell className="font-medium">{keyword.word}</TableCell>
                                  <TableCell className={getSentimentColor(keyword.sentiment)}>
                                    {keyword.sentiment}
                                  </TableCell>
                                  <TableCell>{keyword.count}</TableCell>
                                  <TableCell className="w-1/3">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`${getProgressBarColor(keyword.sentiment)} h-2 rounded-full`} 
                                        style={{ width: `${(keyword.count / analysis.reviewCount) * 100}%` }}
                                      ></div>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {index < reportData.length - 1 && <hr className="my-6" />}
                    </div>
                  ))}

                  {/* Methodology section */}
                  {viewMode === 'detailed' && (
                    <div className="mb-8 bg-white p-6 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-4">Methodology</h3>
                      <p className="text-gray-700">
                        This analysis was performed using advanced Natural Language Processing (NLP) 
                        techniques including contextual sentiment analysis with BERT models and 
                        aspect-based sentiment analysis. The process involves:
                      </p>
                      <ul className="list-disc ml-5 mt-2 space-y-2 text-gray-700">
                        <li>Text preprocessing and tokenization</li>
                        <li>Context-aware sentiment classification</li>
                        <li>Topic extraction and keyword identification</li>
                        <li>Aspect-based sentiment aggregation</li>
                        <li>Statistical trend analysis across time periods</li>
                      </ul>
                    </div>
                  )}

                  {/* Export button */}
                  <div className="flex justify-end">
                    <Button onClick={handleGenerateReport} className="gap-2">
                      <Download className="h-4 w-4" />
                      Export as Word Document
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          variant={variant}
          size={size}
          className={`gap-2 transition-all duration-300 hover:shadow-md ${className}`}
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {t('generateDetailedReport')}
          {!isGenerating && <Download className="h-3 w-3 ml-1 opacity-70" />}
        </Button>
      )}
    </>
  );
};

export default GenerateReportButton;
