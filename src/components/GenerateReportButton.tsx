
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Correct import path
import { FileText, Loader2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface GenerateReportButtonProps {
  hasData: boolean;
  onGenerate?: () => void;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const GenerateReportButton: React.FC<GenerateReportButtonProps> = ({ 
  hasData = false,
  onGenerate,
  variant = "default",
  size = "default",
  className = ""
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

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
    
    return docContent;
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
      const docContent = generateReportDocContent();
      
      // Convert HTML to a Blob
      const blob = new Blob([docContent], { type: 'application/msword;charset=utf-8' });
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

  return (
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
  );
};

export default GenerateReportButton;
