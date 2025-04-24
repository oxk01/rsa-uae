import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

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
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    const analyses = savedAnalysesStr ? JSON.parse(savedAnalysesStr) : [];
    
    if (!analyses.length) return '';
    
    let docContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Comprehensive Sentiment Analysis Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
            h1 { color: #2563eb; text-align: center; margin-bottom: 30px; font-size: 24px; }
            h2 { color: #1e40af; margin-top: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
            h3 { color: #3b82f6; margin-top: 20px; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
            th { background-color: #f3f4f6; font-weight: bold; }
            .positive { color: #059669; }
            .neutral { color: #6b7280; }
            .negative { color: #dc2626; }
            .header { background-color: #1e40af; color: white; padding: 30px; text-align: center; margin-bottom: 40px; }
            .summary-box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .chart-placeholder { background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; }
            .footer { margin-top: 50px; text-align: center; font-size: 0.9em; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px; }
            .highlight { background-color: #fef3c7; padding: 2px 5px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Comprehensive Sentiment Analysis Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div class="summary-box">
            <h2>Executive Summary</h2>
            <p>
              This comprehensive analysis report covers ${analyses.length} dataset${analyses.length > 1 ? 's' : ''} with a total of 
              ${analyses.reduce((sum, a) => sum + (a.reviewCount || 1), 0)} reviews. The analysis was conducted using 
              advanced Natural Language Processing and Machine Learning techniques.
            </p>
            
            <h3>Key Findings</h3>
            <ul>
              <li>Total Reviews Analyzed: ${analyses.reduce((sum, a) => sum + (a.reviewCount || 1), 0)}</li>
              <li>Average Sentiment Score: ${Math.round(analyses.reduce((sum, a) => sum + (a.accuracyScore || 0), 0) / analyses.length)}%</li>
              <li>Positive Reviews: ${analyses.reduce((sum, a) => sum + (a.sentiment.positive || 0), 0)}</li>
              <li>Neutral Reviews: ${analyses.reduce((sum, a) => sum + (a.sentiment.neutral || 0), 0)}</li>
              <li>Negative Reviews: ${analyses.reduce((sum, a) => sum + (a.sentiment.negative || 0), 0)}</li>
            </ul>
          </div>
    `;
    
    analyses.forEach((analysis, index) => {
      const positivePercentage = Math.round((analysis.sentiment.positive / (analysis.reviewCount || 1)) * 100);
      const neutralPercentage = Math.round((analysis.sentiment.neutral / (analysis.reviewCount || 1)) * 100);
      const negativePercentage = Math.round((analysis.sentiment.negative / (analysis.reviewCount || 1)) * 100);
      
      docContent += `
        <div class="section">
          <h2>Dataset ${index + 1}: ${analysis.title}</h2>
          <p><strong>Date:</strong> ${analysis.date}</p>
          <p><strong>Total Reviews:</strong> ${analysis.reviewCount || 1}</p>
          <p><strong>Analysis Accuracy:</strong> ${analysis.accuracyScore || 'N/A'}%</p>
          
          <h3>Sentiment Distribution</h3>
          <table>
            <tr>
              <th>Sentiment</th>
              <th>Count</th>
              <th>Percentage</th>
              <th>Confidence Level</th>
            </tr>
            <tr>
              <td class="positive">Positive</td>
              <td>${analysis.sentiment.positive}</td>
              <td>${positivePercentage}%</td>
              <td>${Math.round(analysis.accuracyScore || 0)}%</td>
            </tr>
            <tr>
              <td class="neutral">Neutral</td>
              <td>${analysis.sentiment.neutral}</td>
              <td>${neutralPercentage}%</td>
              <td>${Math.round(analysis.accuracyScore || 0)}%</td>
            </tr>
            <tr>
              <td class="negative">Negative</td>
              <td>${analysis.sentiment.negative}</td>
              <td>${negativePercentage}%</td>
              <td>${Math.round(analysis.accuracyScore || 0)}%</td>
            </tr>
          </table>
          
          <h3>Key Topics & Sentiment Analysis</h3>
          <table>
            <tr>
              <th>Topic/Keyword</th>
              <th>Frequency</th>
              <th>Sentiment</th>
              <th>Impact Score</th>
            </tr>
            ${analysis.keywords.map(k => `
              <tr>
                <td>${k.word}</td>
                <td>${k.count}</td>
                <td class="${k.sentiment}">${k.sentiment.charAt(0).toUpperCase() + k.sentiment.slice(1)}</td>
                <td>${Math.round((k.count / (analysis.reviewCount || 1)) * 100)}%</td>
              </tr>
            `).join('')}
          </table>
          
          ${analysis.aspects && analysis.aspects.length > 0 ? `
            <h3>Detailed Aspect Analysis</h3>
            <table>
              <tr>
                <th>Aspect</th>
                <th>Sentiment</th>
                <th>Confidence</th>
                <th>Context Sample</th>
              </tr>
              ${analysis.aspects.map(aspect => `
                <tr>
                  <td>${aspect.name}</td>
                  <td class="${aspect.sentiment}">${aspect.sentiment.charAt(0).toUpperCase() + aspect.sentiment.slice(1)}</td>
                  <td>${aspect.confidence}%</td>
                  <td>${aspect.context}</td>
                </tr>
              `).join('')}
            </table>
          ` : ''}
          
          ${analysis.reviewText ? `
            <h3>Sample Review Text</h3>
            <div class="summary-box">
              <p><em>${analysis.reviewText}</em></p>
            </div>
          ` : ''}
        </div>
      `;
    });
    
    docContent += `
          <div class="section">
            <h2>Methodology & Technical Details</h2>
            <p>
              This analysis was performed using state-of-the-art Natural Language Processing techniques including:
            </p>
            <ul>
              <li>Advanced sentiment analysis using transformer-based models</li>
              <li>Aspect-based sentiment analysis for granular insights</li>
              <li>Named entity recognition for topic extraction</li>
              <li>Statistical analysis for confidence scoring</li>
            </ul>
            
            <h3>Confidence Scoring</h3>
            <p>
              The confidence scores represent the model's certainty in its classifications:
            </p>
            <ul>
              <li>90-100%: Very High Confidence</li>
              <li>80-89%: High Confidence</li>
              <li>70-79%: Moderate Confidence</li>
              <li>&lt;70%: Low Confidence - May require manual review</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>Report generated by Sentiment Analysis Dashboard</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
            <p>Time: ${new Date().toLocaleTimeString()}</p>
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
      const result = generateReportDocContent();
      
      if (typeof result === 'string' || !result) {
        toast({
          title: "No data available",
          description: "There is no analysis data to generate a report.",
          variant: "destructive"
        });
        return;
      }
      
      const blob = new Blob([result.docContent], { type: 'application/msword;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
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
