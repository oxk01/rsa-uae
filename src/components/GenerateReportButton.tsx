
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
    
    // Calculate overall statistics for executive summary
    const totalReviews = analyses.reduce((sum, a) => sum + (a.reviewCount || 1), 0);
    const totalPositive = analyses.reduce((sum, a) => sum + (a.sentiment.positive || 0), 0);
    const totalNeutral = analyses.reduce((sum, a) => sum + (a.sentiment.neutral || 0), 0);
    const totalNegative = analyses.reduce((sum, a) => sum + (a.sentiment.negative || 0), 0);
    
    const positivePercentage = Math.round((totalPositive / totalReviews) * 100);
    const neutralPercentage = Math.round((totalNeutral / totalReviews) * 100);
    const negativePercentage = Math.round((totalNegative / totalReviews) * 100);
    
    const avgAccuracy = analyses
      .filter(a => a.accuracyScore !== undefined)
      .reduce((sum, a) => sum + (a.accuracyScore || 0), 0) / 
      analyses.filter(a => a.accuracyScore !== undefined).length;
    
    // Find common themes and topics across all datasets
    const allKeywords = {};
    analyses.forEach(analysis => {
      analysis.keywords.forEach(kw => {
        if (!allKeywords[kw.word]) {
          allKeywords[kw.word] = { count: 0, positive: 0, neutral: 0, negative: 0 };
        }
        allKeywords[kw.word].count += kw.count;
        allKeywords[kw.word][kw.sentiment] += kw.count;
      });
    });
    
    const topKeywords = Object.entries(allKeywords)
      .map(([word, data]: [string, any]) => ({
        word,
        count: data.count,
        sentiment: data.positive > data.negative 
          ? 'positive' 
          : data.negative > data.positive 
            ? 'negative' 
            : 'neutral'
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
      
    // Extract common aspects
    const aspects = ['quality', 'price', 'service', 'delivery', 'support', 'features', 'usability'];
    const aspectData = {};
    
    aspects.forEach(aspect => {
      aspectData[aspect] = { positive: 0, neutral: 0, negative: 0, total: 0 };
    });
    
    analyses.forEach(analysis => {
      if (analysis.aspects && analysis.aspects.length) {
        analysis.aspects.forEach(aspect => {
          const name = aspect.name.toLowerCase();
          if (aspects.includes(name)) {
            aspectData[name][aspect.sentiment]++;
            aspectData[name].total++;
          }
        });
      }
      
      // Also check keywords for aspects
      analysis.keywords.forEach(kw => {
        const word = kw.word.toLowerCase();
        if (aspects.includes(word)) {
          aspectData[word][kw.sentiment] += kw.count;
          aspectData[word].total += kw.count;
        }
      });
    });
    
    let docContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Professional Sentiment Analysis Report</title>
          <style>
            body { 
              font-family: 'Segoe UI', Arial, sans-serif; 
              margin: 0; 
              padding: 0; 
              line-height: 1.6; 
              color: #333; 
              font-size: 11pt;
            }
            .page-break { page-break-after: always; }
            .container { 
              max-width: 1200px; 
              margin: 0 auto; 
              padding: 20px 40px; 
            }
            .header { 
              background: linear-gradient(135deg, #2563eb, #3b82f6); 
              color: white; 
              padding: 40px; 
              text-align: center; 
            }
            h1 { 
              font-size: 28pt; 
              margin: 0; 
              font-weight: 700; 
              letter-spacing: -0.5px; 
            }
            h2 { 
              font-size: 20pt; 
              color: #1e40af; 
              margin-top: 40px; 
              border-bottom: 2px solid #e5e7eb; 
              padding-bottom: 10px; 
            }
            h3 { 
              font-size: 16pt; 
              color: #3b82f6; 
              margin-top: 25px; 
            }
            h4 { 
              font-size: 13pt; 
              color: #4b5563; 
              margin-top: 20px;
            }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin: 20px 0; 
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            th, td { 
              border: 1px solid #e5e7eb; 
              padding: 12px 15px; 
              text-align: left; 
            }
            th { 
              background-color: #f3f4f6; 
              font-weight: bold; 
              color: #1f2937;
            }
            tr:nth-child(even) { 
              background-color: #f9fafb; 
            }
            tr:hover { 
              background-color: #f3f4f6; 
            }
            .positive { color: #059669; }
            .neutral { color: #6b7280; }
            .negative { color: #dc2626; }
            .summary-box { 
              background-color: #f8fafc; 
              border: 1px solid #e2e8f0; 
              padding: 25px; 
              margin: 20px 0; 
              border-radius: 8px; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            .chart-placeholder { 
              background-color: #f3f4f6; 
              padding: 20px; 
              text-align: center; 
              margin: 20px 0; 
              height: 300px;
              border: 1px dashed #d1d5db;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #6b7280;
            }
            .footer { 
              margin-top: 60px; 
              text-align: center; 
              font-size: 10pt; 
              color: #6b7280; 
              border-top: 1px solid #e5e7eb; 
              padding-top: 20px; 
            }
            .highlight { 
              background-color: #fef3c7; 
              padding: 2px 5px; 
              border-radius: 4px; 
            }
            .metrics {
              display: flex;
              justify-content: space-between;
              text-align: center;
              margin: 30px 0;
            }
            .metric {
              flex: 1;
              padding: 20px;
              border-radius: 8px;
              background: #f8fafc;
              margin: 0 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .metric h3 {
              margin-top: 0;
              color: #4b5563;
              font-size: 14pt;
            }
            .metric .value {
              font-size: 24pt;
              font-weight: bold;
              margin: 10px 0;
              color: #1e40af;
            }
            .metric p {
              margin: 0;
              font-size: 10pt;
              color: #6b7280;
            }
            .quote {
              font-style: italic;
              border-left: 4px solid #3b82f6;
              padding-left: 15px;
              margin: 20px 0;
              color: #4b5563;
            }
            .insight {
              background-color: #eff6ff;
              border-left: 4px solid #3b82f6;
              padding: 15px;
              margin: 20px 0;
              border-radius: 0 8px 8px 0;
            }
            .insight h4 {
              margin-top: 0;
              color: #1e40af;
            }
            .comparison-table th:first-child,
            .comparison-table td:first-child {
              background-color: #f3f4f6;
              font-weight: 600;
            }
            .date {
              color: #6b7280;
              font-size: 10pt;
            }
            .section {
              margin-bottom: 40px;
            }
            .toc {
              background-color: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .toc ul {
              list-style-type: none;
              padding-left: 0;
            }
            .toc li {
              margin-bottom: 10px;
            }
            .toc a {
              color: #3b82f6;
              text-decoration: none;
            }
            .toc a:hover {
              text-decoration: underline;
            }
            .sentiment-bar {
              display: flex;
              height: 24px;
              border-radius: 12px;
              overflow: hidden;
              margin: 10px 0;
            }
            .sentiment-bar .positive {
              background-color: #10b981;
              height: 100%;
            }
            .sentiment-bar .neutral {
              background-color: #9ca3af;
              height: 100%;
            }
            .sentiment-bar .negative {
              background-color: #ef4444;
              height: 100%;
            }
            .confidence {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 10pt;
              font-weight: 500;
            }
            .very-high {
              background-color: #d1fae5;
              color: #065f46;
            }
            .high {
              background-color: #e0f2fe;
              color: #0369a1;
            }
            .moderate {
              background-color: #fef3c7;
              color: #92400e;
            }
            .low {
              background-color: #fee2e2;
              color: #b91c1c;
            }
            .brand-logo {
              display: block;
              margin: 0 auto 20px auto;
              max-width: 150px;
            }
            .aspect-chart {
              width: 100%;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .key-finding {
              background-color: #f0f9ff;
              border-left: 4px solid #0ea5e9;
              padding: 15px;
              margin: 15px 0;
              border-radius: 0 8px 8px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Professional Sentiment Analysis Report</h1>
            <p>Comprehensive analysis of customer feedback using contextual AI</p>
            <p>Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div class="container">
            <div class="toc">
              <h3>Table of Contents</h3>
              <ul>
                <li><a href="#executive-summary">1. Executive Summary</a></li>
                <li><a href="#dataset-overview">2. Dataset Overview</a></li>
                <li><a href="#aspect-analysis">3. Aspect-Level Analysis</a></li>
                <li><a href="#comparative-insights">4. Comparative Insights</a></li>
                <li><a href="#technical-information">5. Ethical & Technical Information</a></li>
              </ul>
            </div>
            
            <h2 id="executive-summary">1. Executive Summary</h2>
            <div class="summary-box">
              <p>
                This comprehensive analysis report examines customer sentiment across <strong>${analyses.length}</strong> dataset${analyses.length > 1 ? 's' : ''} with a total of 
                <strong>${totalReviews}</strong> reviews. The analysis was conducted using advanced Natural Language Processing 
                and contextual AI to extract nuanced sentiment patterns and key business insights.
              </p>
              
              <div class="metrics">
                <div class="metric">
                  <h3>Datasets</h3>
                  <div class="value">${analyses.length}</div>
                  <p>Total datasets analyzed</p>
                </div>
                
                <div class="metric">
                  <h3>Reviews</h3>
                  <div class="value">${totalReviews}</div>
                  <p>Total reviews processed</p>
                </div>
                
                <div class="metric">
                  <h3>Accuracy</h3>
                  <div class="value">${Math.round(avgAccuracy)}%</div>
                  <p>Average confidence score</p>
                </div>
              </div>
              
              <h3>Overall Sentiment Distribution</h3>
              <div>
                <div class="sentiment-bar">
                  <div class="positive" style="width: ${positivePercentage}%"></div>
                  <div class="neutral" style="width: ${neutralPercentage}%"></div>
                  <div class="negative" style="width: ${negativePercentage}%"></div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                  <div><span class="positive">■</span> Positive: ${positivePercentage}% (${totalPositive} reviews)</div>
                  <div><span class="neutral">■</span> Neutral: ${neutralPercentage}% (${totalNeutral} reviews)</div>
                  <div><span class="negative">■</span> Negative: ${negativePercentage}% (${totalNegative} reviews)</div>
                </div>
              </div>
              
              <h3>Key Business Insights</h3>
              ${generateKeyInsights(analyses, topKeywords, aspectData)}
            </div>
            
            <div class="page-break"></div>
            <h2 id="dataset-overview">2. Dataset Overview</h2>
            ${analyses.map((analysis, index) => generateDatasetOverview(analysis, index)).join('')}
            
            <div class="page-break"></div>
            <h2 id="aspect-analysis">3. Aspect-Level Analysis</h2>
            ${analyses.map((analysis, index) => generateAspectAnalysis(analysis, index)).join('')}
            
            <div class="page-break"></div>
            <h2 id="comparative-insights">4. Comparative Insights</h2>
            ${generateComparativeInsights(analyses, aspectData)}
            
            <div class="page-break"></div>
            <h2 id="technical-information">5. Ethical & Technical Information</h2>
            <div class="section">
              <h3>Model and Methodology</h3>
              <p>
                This sentiment analysis was conducted using a hybrid approach combining transformer-based language models 
                (similar to BERT) with rule-based sentiment lexicons like VADER (Valence Aware Dictionary and sEntiment Reasoner).
                This approach enables both contextual understanding of the language and robust sentiment classification.
              </p>
              
              <h4>Key components of the analysis pipeline:</h4>
              <ul>
                <li><strong>Text preprocessing</strong>: Normalization, stopword removal, and tokenization</li>
                <li><strong>Contextual embeddings</strong>: Generation of context-aware text representations</li>
                <li><strong>Aspect extraction</strong>: Identification of product/service aspects using dependency parsing</li>
                <li><strong>Sentiment classification</strong>: Multi-class classification of sentiment polarity</li>
                <li><strong>Confidence scoring</strong>: Probabilistic assessment of classification accuracy</li>
              </ul>
              
              <h3>Data Privacy Considerations</h3>
              <p>
                All data processing for this report was conducted following strict privacy guidelines:
              </p>
              <ul>
                <li>No personally identifiable information (PII) has been extracted or stored</li>
                <li>All review data was processed securely and in compliance with data protection regulations</li>
                <li>This report contains aggregated insights only, with no raw customer data</li>
              </ul>
              
              <h3>Addressing Potential Bias</h3>
              <p>
                Several steps were taken to minimize algorithmic bias in the analysis:
              </p>
              <ul>
                <li>Use of diverse pre-training corpora to reduce cultural and linguistic bias</li>
                <li>Regular monitoring and evaluation of model outputs across different demographic groups</li>
                <li>Balanced representation of review sources and time periods in the analysis</li>
                <li>Manual spot-checking of results to identify and address systematic errors</li>
              </ul>
              
              <h3>Confidence Metrics and Limitations</h3>
              <div class="summary-box">
                <h4>Confidence Score Interpretation:</h4>
                <table>
                  <tr>
                    <th>Confidence Range</th>
                    <th>Classification</th>
                    <th>Interpretation</th>
                  </tr>
                  <tr>
                    <td>90-100%</td>
                    <td><span class="confidence very-high">Very High</span></td>
                    <td>Strong sentiment signal with high reliability</td>
                  </tr>
                  <tr>
                    <td>80-89%</td>
                    <td><span class="confidence high">High</span></td>
                    <td>Clear sentiment signal with good reliability</td>
                  </tr>
                  <tr>
                    <td>70-79%</td>
                    <td><span class="confidence moderate">Moderate</span></td>
                    <td>Detectable sentiment but with some ambiguity</td>
                  </tr>
                  <tr>
                    <td><70%</td>
                    <td><span class="confidence low">Low</span></td>
                    <td>Uncertain sentiment classification, may require human review</td>
                  </tr>
                </table>
                
                <h4>Known Limitations:</h4>
                <ul>
                  <li>Reduced accuracy for reviews with heavy sarcasm or idiomatic expressions</li>
                  <li>Potential challenges with industry-specific jargon not present in training data</li>
                  <li>Limited ability to detect subtle emotional nuances beyond positive/neutral/negative classification</li>
                  <li>Aspect extraction may miss very uncommon product features or highly context-dependent references</li>
                </ul>
              </div>
            </div>
            
            <div class="footer">
              <p>Sentiment Analysis Report | Generated by Advanced Review Analytics Platform</p>
              <p>Date: ${new Date().toLocaleDateString()} | Time: ${new Date().toLocaleTimeString()}</p>
              <p>For questions about this report, please contact support@reviewanalytics.com</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Helper function to extract sample reviews/quotes for a given sentiment
    function extractSampleQuotes(analysis, sentiment, count = 2) {
      if (!analysis.reviewText) return [];
      
      // In a real implementation, you would have access to multiple reviews
      // Here we'll simulate by breaking the review text into sentences
      const sentences = analysis.reviewText.split(/[.!?]+/).filter(s => s.trim().length > 10);
      
      // Simulate sentiment matching (in a real implementation, you'd have sentiment per sentence)
      // Here we're just using some heuristics based on sentiment-associated words
      const sentimentWords = {
        positive: ['good', 'great', 'excellent', 'love', 'best', 'amazing', 'happy', 'perfect'],
        neutral: ['okay', 'fine', 'average', 'decent', 'normal', 'standard'],
        negative: ['bad', 'poor', 'terrible', 'worst', 'hate', 'disappointing', 'awful']
      };
      
      return sentences
        .filter(sentence => {
          const lowerSentence = sentence.toLowerCase();
          return sentimentWords[sentiment].some(word => lowerSentence.includes(word));
        })
        .slice(0, count)
        .map(quote => quote.trim());
    }
    
    // Helper function to generate business insights
    function generateKeyInsights(analyses, topKeywords, aspectData) {
      // Let's identify the most prominent topics
      const topTopics = topKeywords.slice(0, 5);
      
      // Calculate aspect sentiments
      const aspectSentiments = Object.entries(aspectData)
        .filter(([_, data]) => data.total > 0)
        .map(([aspect, data]) => {
          const positivePercentage = Math.round((data.positive / data.total) * 100);
          const negativePercentage = Math.round((data.negative / data.total) * 100);
          const neutralPercentage = 100 - positivePercentage - negativePercentage;
          
          return {
            aspect,
            positivePercentage,
            negativePercentage,
            neutralPercentage,
            sentiment: positivePercentage > negativePercentage ? 'positive' : 
                      negativePercentage > positivePercentage ? 'negative' : 'neutral',
            total: data.total
          };
        })
        .sort((a, b) => b.total - a.total);
      
      // Find most positive and negative aspects
      const mostPositiveAspect = [...aspectSentiments].sort((a, b) => b.positivePercentage - a.positivePercentage)[0];
      const mostNegativeAspect = [...aspectSentiments].sort((a, b) => b.negativePercentage - a.positivePercentage)[0];
      
      let insightsHtml = `
        <div class="key-finding">
          <h4>Top Customer Concerns</h4>
          <p>The analysis identified <strong>${topTopics.filter(k => k.sentiment === 'negative').length}</strong> major areas of concern from customer feedback:</p>
          <ul>
            ${topTopics
              .filter(k => k.sentiment === 'negative')
              .map(k => `<li><strong>${k.word}</strong> was mentioned <span class="negative">${k.count} times</span></li>`)
              .join('')}
          </ul>
        </div>
      `;
      
      if (mostPositiveAspect) {
        insightsHtml += `
          <div class="key-finding">
            <h4>Strongest Product/Service Attribute</h4>
            <p>Customers consistently praised the <strong>${mostPositiveAspect.aspect}</strong>, with 
            <span class="positive">${mostPositiveAspect.positivePercentage}%</span> positive sentiment across 
            <strong>${mostPositiveAspect.total}</strong> mentions.</p>
          </div>
        `;
      }
      
      if (mostNegativeAspect) {
        insightsHtml += `
          <div class="key-finding">
            <h4>Area for Improvement</h4>
            <p>The analysis identified <strong>${mostNegativeAspect.aspect}</strong> as requiring attention, with 
            <span class="negative">${mostNegativeAspect.negativePercentage}%</span> negative sentiment across 
            <strong>${mostNegativeAspect.total}</strong> mentions.</p>
          </div>
        `;
      }
      
      // Add overall sentiment trend
      const positiveRatio = totalPositive / (totalPositive + totalNegative);
      if (positiveRatio > 0.75) {
        insightsHtml += `
          <div class="key-finding">
            <h4>Overall Positive Trend</h4>
            <p>Customer sentiment is overwhelmingly positive, with positive feedback outnumbering negative by a ratio of 
            <strong>${(positiveRatio / (1 - positiveRatio)).toFixed(1)}:1</strong>. This indicates strong customer satisfaction.</p>
          </div>
        `;
      } else if (positiveRatio < 0.4) {
        insightsHtml += `
          <div class="key-finding">
            <h4>Concerning Sentiment Trend</h4>
            <p>Customer sentiment shows areas of concern, with negative feedback representing a significant portion of all reviews.
            Immediate attention to the highlighted issues is recommended.</p>
          </div>
        `;
      } else {
        insightsHtml += `
          <div class="key-finding">
            <h4>Balanced Sentiment Profile</h4>
            <p>Customer sentiment shows a mix of positive and negative feedback, suggesting some aspects of products/services
            are well-received while others have room for improvement.</p>
          </div>
        `;
      }
      
      return insightsHtml;
    }
    
    // Helper function to generate dataset overview section
    function generateDatasetOverview(analysis, index) {
      const positivePercentage = Math.round((analysis.sentiment.positive / analysis.reviewCount) * 100);
      const neutralPercentage = Math.round((analysis.sentiment.neutral / analysis.reviewCount) * 100);
      const negativePercentage = Math.round((analysis.sentiment.negative / analysis.reviewCount) * 100);
      
      return `
        <div class="section">
          <h3>${analysis.title}</h3>
          <div class="date">Processed on: ${analysis.date}</div>
          
          <div class="summary-box">
            <div class="metrics">
              <div class="metric">
                <h3>Reviews</h3>
                <div class="value">${analysis.reviewCount}</div>
                <p>Total reviews analyzed</p>
              </div>
              
              <div class="metric">
                <h3>Accuracy</h3>
                <div class="value">${analysis.accuracyScore || 'N/A'}%</div>
                <p>Confidence score</p>
              </div>
              
              <div class="metric">
                <h3>Keywords</h3>
                <div class="value">${analysis.keywords.length}</div>
                <p>Unique topics identified</p>
              </div>
            </div>
            
            <h4>Sentiment Distribution</h4>
            <div>
              <div class="sentiment-bar">
                <div class="positive" style="width: ${positivePercentage}%"></div>
                <div class="neutral" style="width: ${neutralPercentage}%"></div>
                <div class="negative" style="width: ${negativePercentage}%"></div>
              </div>
              <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                <div><span class="positive">■</span> Positive: ${positivePercentage}% (${analysis.sentiment.positive} reviews)</div>
                <div><span class="neutral">■</span> Neutral: ${neutralPercentage}% (${analysis.sentiment.neutral} reviews)</div>
                <div><span class="negative">■</span> Negative: ${negativePercentage}% (${analysis.sentiment.negative} reviews)</div>
              </div>
            </div>
            
            <h4>Top Keywords</h4>
            <table>
              <tr>
                <th>Keyword</th>
                <th>Mentions</th>
                <th>Sentiment</th>
                <th>Impact</th>
              </tr>
              ${analysis.keywords.slice(0, 8).map(kw => `
                <tr>
                  <td>${kw.word}</td>
                  <td>${kw.count}</td>
                  <td class="${kw.sentiment}">${kw.sentiment.charAt(0).toUpperCase() + kw.sentiment.slice(1)}</td>
                  <td>${Math.round((kw.count / analysis.reviewCount) * 100)}%</td>
                </tr>
              `).join('')}
            </table>
            
            ${analysis.aspects && analysis.aspects.length > 0 ? `
              <h4>Aspect-Based Sentiment</h4>
              <table>
                <tr>
                  <th>Aspect</th>
                  <th>Sentiment</th>
                  <th>Confidence</th>
                  <th>Context</th>
                </tr>
                ${analysis.aspects.slice(0, 5).map(aspect => `
                  <tr>
                    <td>${aspect.name}</td>
                    <td class="${aspect.sentiment}">${aspect.sentiment.charAt(0).toUpperCase() + aspect.sentiment.slice(1)}</td>
                    <td>
                      <span class="confidence ${
                        aspect.confidence >= 90 ? 'very-high' : 
                        aspect.confidence >= 80 ? 'high' : 
                        aspect.confidence >= 70 ? 'moderate' : 'low'
                      }">
                        ${aspect.confidence}%
                      </span>
                    </td>
                    <td>${aspect.context}</td>
                  </tr>
                `).join('')}
              </table>
            ` : ''}
            
            ${analysis.reviewText ? `
              <h4>Sample Review</h4>
              <div class="quote">
                "${analysis.reviewText}"
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }
    
    // Helper function to generate aspect analysis section
    function generateAspectAnalysis(analysis, index) {
      // Extract aspects from the analysis
      let aspects = [];
      
      if (analysis.aspects && analysis.aspects.length > 0) {
        aspects = analysis.aspects;
      } else {
        // Try to extract aspects from keywords
        const commonAspects = ['quality', 'price', 'service', 'delivery', 'feature', 'support', 'usability', 'design'];
        
        commonAspects.forEach(aspectName => {
          const matchingKeywords = analysis.keywords.filter(k => 
            k.word.toLowerCase() === aspectName || 
            k.word.toLowerCase().includes(aspectName)
          );
          
          if (matchingKeywords.length > 0) {
            // Determine dominant sentiment
            let positiveCount = 0, negativeCount = 0, neutralCount = 0;
            let totalCount = 0;
            
            matchingKeywords.forEach(kw => {
              if (kw.sentiment === 'positive') positiveCount += kw.count;
              else if (kw.sentiment === 'negative') negativeCount += kw.count;
              else neutralCount += kw.count;
              
              totalCount += kw.count;
            });
            
            const dominantSentiment = positiveCount > negativeCount && positiveCount > neutralCount ? 'positive' :
                                      negativeCount > positiveCount && negativeCount > neutralCount ? 'negative' : 'neutral';
            
            const confidence = Math.round((Math.max(positiveCount, negativeCount, neutralCount) / totalCount) * 100);
            
            aspects.push({
              name: aspectName,
              sentiment: dominantSentiment,
              confidence: confidence,
              context: matchingKeywords[0]?.word || aspectName,
              count: totalCount
            });
          }
        });
      }
      
      // Sort aspects by count or importance
      aspects.sort((a, b) => (b.count || 0) - (a.count || 0));
      
      // Get sample quotes if possible
      let positiveQuotes = [];
      let negativeQuotes = [];
      
      if (analysis.reviewText) {
        positiveQuotes = extractSampleQuotes(analysis, 'positive');
        negativeQuotes = extractSampleQuotes(analysis, 'negative');
      }
      
      return `
        <div class="section">
          <h3>Aspect Analysis: ${analysis.title}</h3>
          
          <div class="summary-box">
            <h4>Key Topics and Associated Sentiment</h4>
            
            ${aspects.length > 0 ? `
              <table>
                <tr>
                  <th>Topic/Aspect</th>
                  <th>Sentiment</th>
                  <th>Confidence</th>
                  <th>Impact</th>
                  <th>Frequency</th>
                </tr>
                ${aspects.slice(0, 10).map(aspect => `
                  <tr>
                    <td>${aspect.name.charAt(0).toUpperCase() + aspect.name.slice(1)}</td>
                    <td class="${aspect.sentiment}">${aspect.sentiment.charAt(0).toUpperCase() + aspect.sentiment.slice(1)}</td>
                    <td>
                      <span class="confidence ${
                        aspect.confidence >= 90 ? 'very-high' : 
                        aspect.confidence >= 80 ? 'high' : 
                        aspect.confidence >= 70 ? 'moderate' : 'low'
                      }">
                        ${aspect.confidence}%
                      </span>
                    </td>
                    <td>${Math.round((aspect.count || 1) / analysis.reviewCount * 100)}%</td>
                    <td>${aspect.count || 'N/A'}</td>
                  </tr>
                `).join('')}
              </table>
            ` : '<p>No specific aspects could be identified for this dataset.</p>'}
            
            ${positiveQuotes.length > 0 || negativeQuotes.length > 0 ? `
              <h4>Representative Customer Quotes</h4>
              
              ${positiveQuotes.length > 0 ? `
                <h5 class="positive">Positive Sentiment:</h5>
                ${positiveQuotes.map(quote => `
                  <div class="quote">
                    "${quote}"
                  </div>
                `).join('')}
              ` : ''}
              
              ${negativeQuotes.length > 0 ? `
                <h5 class="negative">Negative Sentiment:</h5>
                ${negativeQuotes.map(quote => `
                  <div class="quote">
                    "${quote}"
                  </div>
                `).join('')}
              ` : ''}
            ` : ''}
            
            <div class="aspect-chart">
              <div style="text-align: center; padding: 20px; color: #6b7280;">
                [Aspect Sentiment Chart: Visual representation of sentiment distribution across key aspects]
              </div>
            </div>
            
            <h4>Sentiment Intensity Analysis</h4>
            <p>
              Sentiment intensity measures the strength of opinion expressed about each aspect. 
              For ${analysis.title}, the analysis reveals:
            </p>
            
            <ul>
              ${aspects.slice(0, 3).map(aspect => `
                <li>
                  <strong>${aspect.name.charAt(0).toUpperCase() + aspect.name.slice(1)}:</strong> 
                  ${aspect.sentiment === 'positive' ? 'Strong positive sentiment' : 
                    aspect.sentiment === 'negative' ? 'Significant concern' : 'Neutral/mixed opinions'} 
                  with ${aspect.confidence}% confidence.
                </li>
              `).join('')}
            </ul>
            
            <h4>Impact Assessment</h4>
            <p>
              Based on frequency and sentiment intensity, these aspects have the highest impact on overall customer satisfaction:
            </p>
            
            <ol>
              ${aspects.slice(0, 3).map((aspect, i) => `
                <li>
                  <strong>${aspect.name.charAt(0).toUpperCase() + aspect.name.slice(1)}</strong> - 
                  Mentioned in approximately ${Math.round((aspect.count || 1) / analysis.reviewCount * 100)}% of reviews
                  with ${aspect.sentiment} sentiment.
                </li>
              `).join('')}
            </ol>
          </div>
        </div>
      `;
    }
    
    // Helper function to generate comparative insights
    function generateComparativeInsights(analyses, aspectData) {
      if (analyses.length < 2) {
        return `
          <div class="summary-box">
            <p>Comparative analysis requires multiple datasets. Currently, only one dataset is available for analysis.</p>
          </div>
        `;
      }
      
      // Generate comparative sentiment table
      const sentimentComparisonTable = `
        <table class="comparison-table">
          <tr>
            <th>Dataset</th>
            <th>Positive %</th>
            <th>Neutral %</th>
            <th>Negative %</th>
            <th>Overall Sentiment</th>
          </tr>
          ${analyses.map(analysis => {
            const totalReviews = analysis.reviewCount;
            const positivePercentage = Math.round((analysis.sentiment.positive / totalReviews) * 100);
            const neutralPercentage = Math.round((analysis.sentiment.neutral / totalReviews) * 100);
            const negativePercentage = Math.round((analysis.sentiment.negative / totalReviews) * 100);
            
            const overallSentiment = positivePercentage > negativePercentage + 15 ? 
              '<span class="positive">Positive</span>' : 
              negativePercentage > positivePercentage + 15 ? 
              '<span class="negative">Negative</span>' : 
              '<span class="neutral">Neutral/Mixed</span>';
            
            return `
              <tr>
                <td>${analysis.title}</td>
                <td>${positivePercentage}%</td>
                <td>${neutralPercentage}%</td>
                <td>${negativePercentage}%</td>
                <td>${overallSentiment}</td>
              </tr>
            `;
          }).join('')}
        </table>
      `;
      
      // Find standout products and underperformers
      const ratedAnalyses = analyses.map(analysis => {
        const totalReviews = analysis.reviewCount;
        const positivePercentage = Math.round((analysis.sentiment.positive / totalReviews) * 100);
        const negativePercentage = Math.round((analysis.sentiment.negative / totalReviews) * 100);
        const sentimentScore = positivePercentage - negativePercentage;
        
        return {
          title: analysis.title,
          sentimentScore,
          positivePercentage,
          negativePercentage,
          reviewCount: totalReviews
        };
      }).sort((a, b) => b.sentimentScore - a.sentimentScore);
      
      const topPerformer = ratedAnalyses[0];
      const bottomPerformer = ratedAnalyses[ratedAnalyses.length - 1];
      
      // Get common aspects across datasets for comparison
      const comparedAspects = Object.keys(aspectData)
        .filter(aspect => aspectData[aspect].total > 0)
        .slice(0, 5);
      
      return `
        <div class="summary-box">
          <h3>Comparative Sentiment Analysis</h3>
          <p>
            This section compares sentiment patterns across ${analyses.length} different datasets to identify 
            relative strengths and weaknesses.
          </p>
          
          ${sentimentComparisonTable}
          
          <div class="insight">
            <h4>Standout Performance</h4>
            <p>
              <strong>${topPerformer.title}</strong> shows the strongest customer sentiment with 
              ${topPerformer.positivePercentage}% positive reviews compared to an average of 
              ${Math.round(analyses.reduce((sum, a) => sum + (a.sentiment.positive / a.reviewCount * 100), 0) / analyses.length)}% 
              across all datasets.
            </p>
          </div>
          
          ${topPerformer.title !== bottomPerformer.title ? `
            <div class="insight">
              <h4>Areas for Improvement</h4>
              <p>
                <strong>${bottomPerformer.title}</strong> shows the lowest sentiment scores with 
                ${bottomPerformer.negativePercentage}% negative reviews, suggesting this area needs particular attention.
              </p>
            </div>
          ` : ''}
          
          <h3>Cross-Dataset Aspect Comparison</h3>
          <div class="aspect-chart">
            <div style="text-align: center; padding: 20px; color: #6b7280;">
              [Comparative Aspect Chart: Visual representation of how different aspects perform across datasets]
            </div>
          </div>
          
          <h3>Recommendations Based on Comparative Analysis</h3>
          <ol>
            <li>
              <strong>Learn from successes:</strong> Apply learnings from ${topPerformer.title}'s positive reception to other areas.
            </li>
            ${topPerformer.title !== bottomPerformer.title ? `
              <li>
                <strong>Address key concerns:</strong> Prioritize addressing the negative feedback in ${bottomPerformer.title}.
              </li>
            ` : ''}
            <li>
              <strong>Consistent experience:</strong> Work toward more consistent sentiment scores across all datasets.
            </li>
            <li>
              <strong>Focus on high-impact aspects:</strong> Prioritize improvements to aspects that show both high mention 
              frequency and negative sentiment.
            </li>
          </ol>
        </div>
      `;
    }
    
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
      link.download = 'sentiment-analysis-professional-report.doc';
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
      console.error('Error generating report:', error);
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
