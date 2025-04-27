
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PageData } from './types';
import { addHeader, addPageNumber, addFooter } from './pageSetup';
import { enhanceStyles } from './styleEnhancer';
import { addSectionHeader } from './sectionHeaders';
import { addPageImage, prepareGraphicsElements } from './imageHandler';
import { pdfStyles } from '@/styles/pdfStyles';

export const renderContent = async (
  pdf: jsPDF,
  pageData: PageData,
  reportElement: HTMLElement,
  totalPages: number
) => {
  try {
    console.log('Starting content rendering process with enhanced graphics handling...');
    
    // Create a copy of the element to work with
    const clonedElement = reportElement.cloneNode(true) as HTMLElement;
    
    // Apply styles and prepare graphics elements before capturing
    enhanceStyles(clonedElement);
    prepareGraphicsElements(clonedElement);
    
    // Process each visualization section separately for better quality
    const sections = clonedElement.querySelectorAll('.card');
    
    // Append to body but make it invisible to user
    document.body.appendChild(clonedElement);
    clonedElement.style.position = 'fixed';
    clonedElement.style.left = '-9999px';
    clonedElement.style.width = `${pageData.contentWidth}px`;
    clonedElement.style.backgroundColor = '#ffffff';
    
    // Force layout recalculation and give time for visualizations
    console.log('Waiting for visualizations to fully render...');
    await new Promise(resolve => setTimeout(resolve, 8000)); // Increased delay to 8 seconds
    
    // Add page for overall content
    pdf.addPage();
    pageData.pageNumber++;
    addHeader(pdf, pageData, pageData.pageNumber);
    addSectionHeader(pdf, pageData);
    
    // Add introduction text
    const yPosition = pageData.margin.top + 40;
    pdf.setFontSize(pdfStyles.sizes.body);
    pdf.setTextColor(pdfStyles.colors.text);
    pdf.text("This sentiment analysis report provides a comprehensive overview of customer feedback analysis. The following pages contain detailed visualizations of sentiment trends, key metrics, and actionable insights derived from the data.", 
      pageData.margin.left, yPosition, { 
        maxWidth: pageData.contentWidth, 
        align: 'justify' 
      });
    
    addFooter(pdf, pageData);
    addPageNumber(pdf, pageData, pageData.pageNumber, totalPages);
    
    // One-by-one capture each visualization section separately
    console.log('Capturing each visualization section separately...');
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;
      const sectionTitle = section.querySelector('h3')?.textContent || `Section ${i+1}`;
      
      console.log(`Capturing section: ${sectionTitle}`);
      
      try {
        // Create a container for this section to capture it individually
        const sectionContainer = document.createElement('div');
        sectionContainer.style.backgroundColor = '#ffffff';
        sectionContainer.style.padding = '20px';
        sectionContainer.style.width = `${pageData.contentWidth}px`;
        
        // Clone the section to avoid modifying the original
        const sectionClone = section.cloneNode(true) as HTMLElement;
        sectionContainer.appendChild(sectionClone);
        
        document.body.appendChild(sectionContainer);
        
        // Process section-specific elements
        const sectionVisuals = sectionContainer.querySelectorAll('.recharts-wrapper, svg, canvas');
        sectionVisuals.forEach(visual => {
          if (visual instanceof SVGElement) {
            visual.setAttribute('width', '500');
            visual.setAttribute('height', '300');
          }
        });
        
        // Give time for section to render fully
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Capture this section with html2canvas
        const canvas = await html2canvas(sectionContainer, {
          scale: 1.5, // Higher scale for better quality
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          onclone: (doc, ele) => {
            console.log(`Cloned section ${i+1} with dimensions:`, 
              ele.offsetWidth, 'x', ele.offsetHeight);
          }
        });
        
        // Add a new page for this section
        pdf.addPage();
        pageData.pageNumber++;
        
        addHeader(pdf, pageData, pageData.pageNumber);
        
        // Add section title
        pdf.setFontSize(pdfStyles.sizes.sectionHeader);
        pdf.setTextColor(pdfStyles.colors.header);
        pdf.text(sectionTitle, 
          pageData.margin.left, 
          pageData.margin.top + 15);
        
        // Convert section to image
        const imgData = canvas.toDataURL('image/jpeg', 1.0); // Highest quality
        
        const imgWidth = pageData.contentWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Add section visualization image
        addPageImage(
          pdf,
          pageData,
          imgData,
          imgWidth,
          imgHeight,
          false
        );
        
        // Add explanation text based on section title
        let explanationText = "";
        if (sectionTitle.includes("Sentiment Distribution")) {
          explanationText = "This chart displays the distribution of sentiment across all analyzed reviews. The proportions show positive, neutral, and negative sentiment percentages, providing insight into overall customer satisfaction levels.";
        } else if (sectionTitle.includes("Trend")) {
          explanationText = "This visualization tracks sentiment changes over time, helping identify patterns, seasonal variations, and the impact of specific events or product changes on customer sentiment.";
        } else if (sectionTitle.includes("Aspect")) {
          explanationText = "This chart highlights the most frequently mentioned product or service aspects in customer feedback, along with their associated sentiment, helping prioritize improvement areas.";
        } else if (sectionTitle.includes("Words")) {
          explanationText = "The word cloud visualizes frequently used terms in customer reviews. Word size indicates frequency, while colors represent associated sentiment (green for positive, gray for neutral, red for negative).";
        } else if (sectionTitle.includes("Evaluation")) {
          explanationText = "This chart shows the model's evaluation metrics, indicating the confidence level and accuracy of the sentiment analysis predictions across different categories.";
        } else if (sectionTitle.includes("Matrix")) {
          explanationText = "The confusion matrix displays the accuracy of sentiment predictions by comparing predicted sentiment against actual sentiment, helping assess the reliability of the analysis.";
        } else {
          explanationText = "This visualization provides valuable insights into customer sentiment patterns and key metrics identified during the analysis process.";
        }
        
        pdf.setFontSize(pdfStyles.sizes.body);
        pdf.setTextColor(pdfStyles.colors.text);
        pdf.text(explanationText, 
          pageData.margin.left, 
          pageData.margin.top + imgHeight + 40, { 
            maxWidth: pageData.contentWidth, 
            align: 'justify' 
          });
        
        addFooter(pdf, pageData);
        addPageNumber(pdf, pageData, pageData.pageNumber, totalPages);
        
        // Remove the temporary section container
        document.body.removeChild(sectionContainer);
        
      } catch (sectionError) {
        console.error(`Error capturing section ${i+1}:`, sectionError);
      }
    }
    
    // Remove the original cloned element
    if (document.body.contains(clonedElement)) {
      document.body.removeChild(clonedElement);
    }
    
    console.log('All visualizations processed successfully');
    
    // Add summary page
    pdf.addPage();
    pageData.pageNumber++;
    
    addHeader(pdf, pageData, pageData.pageNumber);
    
    // Add summary title
    pdf.setFontSize(pdfStyles.sizes.sectionHeader);
    pdf.setTextColor(pdfStyles.colors.header);
    pdf.text("Summary and Recommendations", 
      pageData.pageWidth / 2, 
      pageData.margin.top + 20, { align: 'center' });
    
    // Add summary text
    pdf.setFontSize(pdfStyles.sizes.body);
    pdf.setTextColor(pdfStyles.colors.text);
    
    let summaryY = pageData.margin.top + 50;
    pdf.text("Summary:", pageData.margin.left, summaryY);
    summaryY += 10;
    
    pdf.text("This report provides a comprehensive analysis of customer sentiment across multiple dimensions. The visualizations highlight key patterns in feedback, most mentioned aspects, and overall sentiment trends. Based on this analysis, we can identify areas of strength and opportunities for improvement.", 
      pageData.margin.left, summaryY, {
        maxWidth: pageData.contentWidth,
        align: 'justify'
      });
    
    summaryY += 40;
    pdf.text("Key Recommendations:", pageData.margin.left, summaryY);
    summaryY += 10;
    
    const recommendations = [
      "Focus on improving aspects with the highest negative sentiment scores",
      "Capitalize on positive feedback trends by amplifying successful features",
      "Address recurring themes in neutral feedback to convert to positive sentiment",
      "Continue monitoring sentiment trends to measure the impact of implemented changes"
    ];
    
    recommendations.forEach((rec, index) => {
      pdf.text(`${index + 1}. ${rec}`, pageData.margin.left + 5, summaryY);
      summaryY += 15;
    });
    
    addFooter(pdf, pageData);
    addPageNumber(pdf, pageData, pageData.pageNumber, totalPages);
    
    return true;
    
  } catch (error) {
    console.error('Error rendering content:', error);
    
    // Create a simple fallback page with error information
    createFallbackContent(pdf, pageData, reportElement);
    return false;
  }
};

// Fallback to render just text content when canvas rendering fails
const createFallbackContent = (pdf: jsPDF, pageData: PageData, reportElement: HTMLElement) => {
  try {
    pdf.addPage();
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    
    let yPosition = pageData.margin.top + 20;
    
    pdf.text('Sentiment Analysis Report (Text Only)', pageData.pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Extract important text data
    const headings = reportElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const paragraphs = reportElement.querySelectorAll('p');
    
    // Add headings
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 128); // Dark blue for headings
    headings.forEach(heading => {
      if (yPosition > pageData.pageHeight - pageData.margin.bottom) {
        pdf.addPage();
        yPosition = pageData.margin.top + 10;
      }
      
      pdf.text(heading.textContent || '', pageData.margin.left, yPosition);
      yPosition += 12;
    });
    
    // Add paragraphs
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0); // Black for body text
    paragraphs.forEach(paragraph => {
      if (yPosition > pageData.pageHeight - pageData.margin.bottom) {
        pdf.addPage();
        yPosition = pageData.margin.top + 10;
      }
      
      const text = paragraph.textContent || '';
      const lines = pdf.splitTextToSize(text, pageData.contentWidth);
      
      pdf.text(lines, pageData.margin.left, yPosition);
      yPosition += (lines.length * 5) + 5;
    });
    
    pdf.text('Note: Visual elements could not be rendered. This is a text-only fallback report.', 
      pageData.margin.left, yPosition + 20);
    
    console.log('Created fallback text-only PDF content');
  } catch (fallbackError) {
    console.error('Error creating fallback content:', fallbackError);
  }
};
