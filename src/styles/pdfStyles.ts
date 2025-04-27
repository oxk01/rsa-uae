
export const pdfStyles = {
  fonts: {
    title: 'helvetica-bold',
    heading: 'helvetica-bold',
    subheading: 'helvetica-bold',
    normal: 'helvetica',
    bold: 'helvetica-bold',
  },
  sizes: {
    title: 24,             // Slightly reduced for better proportions
    sectionHeader: 18,     // Clear section headers
    subHeader: 14,         // Readable sub-headers
    body: 11,              // Professional body text size
    caption: 9,            // Readable captions
    pageNumber: 8,         // Small but readable page numbers
  },
  spacing: {
    sectionMargin: 20,      // Space between sections
    paragraphMargin: 10,    // Space between paragraphs
    headerMargin: 15,       // Space after headers
    pageMargin: {          // Professional document margins
      top: 30,
      bottom: 35,
      left: 30,
      right: 30
    },
    lineHeight: 1.4,       // Professional line height
    contentSpacing: 10,    // Space between content elements
    listItemSpacing: 5,    // Space between list items
  },
  colors: {
    primary: '#2c3e50',     // Professional dark blue for headers
    text: '#333333',        // Dark gray for better readability
    header: '#2c3e50',      // Consistent with primary
    subtext: '#5a6b7b',     // Medium gray for secondary text
    background: '#FFFFFF',  // Clean white background
    accent: '#3498db',      // Blue accent for highlights
    positive: '#27ae60',    // Green for positive sentiment
    neutral: '#f39c12',     // Amber for neutral sentiment
    negative: '#e74c3c',    // Red for negative sentiment
    tableHeader: '#f5f7fa'  // Light gray for table headers
  },
  layout: {
    maxContentHeight: 0.85,  // Allow more content per page
    minMarginBetweenElements: 8,  // Compact but clear spacing
    chartHeight: 180,       // Standard chart height
    tableRowHeight: 15,     // Consistent table row height
    headerIndent: 5,        // Indent for hierarchical headers
  },
  tables: {
    cellPadding: 5,
    borderColor: '#e0e0e0',
    headerBackground: '#f5f7fa'
  }
};
