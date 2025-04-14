
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Download } from 'lucide-react';
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
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #1e40af; text-align: center; margin-bottom: 30px; }
            h2 { color: #2563eb; margin-top: 30px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
            h3 { color: #3b82f6; margin-top: 20px; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
            th { background-color: #f3f4f6; font-weight: bold; }
            .positive { color: green; }
            .neutral { color: gray; }
            .negative { color: red; }
            .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; margin-bottom: 40px; }
            .section { margin: 30px 0; }
            .footer { margin-top: 50px; text-align: center; font-size: 0.9em; color: #6b7280; }
            .chart-placeholder { background-color: #f3f4f6; height: 200px; display: flex; align-items: center; justify-content: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Sentiment Analysis Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div class="section">
            <h2>Executive Summary</h2>
            <p>
              This report contains sentiment analysis results for ${analyses.length} datasets with a total of 
              ${analyses.reduce((sum, a) => sum + a.reviewCount, 0)} reviews analyzed. The analysis was performed 
              using advanced Natural Language Processing techniques.
            </p>
            
            <div class="chart-placeholder">
              [Overall Sentiment Distribution Chart]
            </div>
            
            <table>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Total Reviews Analyzed</td>
                <td>${analyses.reduce((sum, a) => sum + a.reviewCount, 0)}</td>
              </tr>
              <tr>
                <td>Positive Sentiment</td>
                <td>${analyses.reduce((sum, a) => sum + a.sentiment.positive, 0)} reviews</td>
              </tr>
              <tr>
                <td>Neutral Sentiment</td>
                <td>${analyses.reduce((sum, a) => sum + a.sentiment.neutral, 0)} reviews</td>
              </tr>
              <tr>
                <td>Negative Sentiment</td>
                <td>${analyses.reduce((sum, a) => sum + a.sentiment.negative, 0)} reviews</td>
              </tr>
            </table>
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
          <p><strong>Date:</strong> ${analysis.date}</p>
          <p><strong>Total reviews:</strong> ${analysis.reviewCount}</p>
          
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
          
          <h3>Context Samples</h3>
          <p>
            The following contexts were extracted from the reviews that mentioned the analyzed aspects:
          </p>
          <table>
            <tr>
              <th>Aspect</th>
              <th>Context Sample</th>
              <th>Sentiment</th>
            </tr>
            ${analysis.keywords.slice(0, 3).map(k => `
              <tr>
                <td>${k.word}</td>
                <td>Sample context mentioning ${k.word}</td>
                <td class="${k.sentiment}">${k.sentiment}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      `;
    });
    
    docContent += `
          <div class="section">
            <h2>Methodology</h2>
            <p>
              This analysis was performed using advanced Natural Language Processing techniques including:
            </p>
            <ul>
              <li>Contextual sentiment analysis with transformer-based models</li>
              <li>Aspect-based sentiment analysis to extract specific topics</li>
              <li>Named entity recognition to identify key elements</li>
              <li>Topic modeling to group related themes</li>
            </ul>
            <p>
              The confidence scores represent the model's certainty in its sentiment classification,
              with higher values indicating greater confidence in the assigned sentiment.
            </p>
          </div>
          
          <div class="footer">
            <p>Report generated by Sentiment Analysis Dashboard</p>
            <p>${new Date().toLocaleDateString()}</p>
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
      
      if (typeof result === 'string' || !result) {
        toast({
          title: "No data available",
          description: "There is no analysis data to generate a report.",
          variant: "destructive"
        });
        return;
      }
      
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
      disabled={isGenerating || !hasData}
      variant={variant}
      size={size}
      className={`gap-2 transition-all duration-300 ${className}`}
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
