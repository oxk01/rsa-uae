
export const pdfStyles = {
  fonts: {
    title: 'helvetica-bold',
    heading: 'helvetica-bold',
    subheading: 'helvetica-bold',
    normal: 'helvetica',
    bold: 'helvetica-bold',
  },
  sizes: {
    title: 26,              // Larger, more impactful title
    sectionHeader: 20,      // Clear section headers
    subHeader: 16,          // Readable sub-headers
    body: 12,               // Professional body text size
    caption: 10,            // Readable captions
    pageNumber: 10,         // Legible page numbers
  },
  spacing: {
    sectionMargin: 25,      // Increased space between sections
    paragraphMargin: 12,    // Better paragraph separation
    headerMargin: 18,       // More space after headers
    pageMargin: {          // Professional document margins
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    },
    lineHeight: 1.5,        // Improved line height for readability
    contentSpacing: 15,     // Better element separation
    listItemSpacing: 8,     // Clearer list spacing
  },
  colors: {
    primary: '#2c3e50',      // Professional dark blue for headers
    text: '#333333',         // Dark gray for better readability
    header: '#2c3e50',       // Consistent with primary
    subtext: '#5a6b7b',      // Medium gray for secondary text
    background: '#FFFFFF',   // Clean white background
    accent: '#3498db',       // Blue accent for highlights
    positive: '#27ae60',     // Green for positive sentiment
    neutral: '#f39c12',      // Amber for neutral sentiment
    negative: '#e74c3c',     // Red for negative sentiment
    tableHeader: '#f5f7fa',  // Light gray for table headers
    sectionBg: '#f8f9fa'     // Light background for sections
  },
  layout: {
    maxContentHeight: 0.8,   // Allow more content per page
    minMarginBetweenElements: 10,  // Clearer spacing
    chartHeight: 220,        // Larger chart height
    tableRowHeight: 18,      // More readable table rows
    headerIndent: 5,         // Indent for hierarchical headers
  },
  tables: {
    cellPadding: 8,
    borderColor: '#e0e0e0',
    headerBackground: '#f5f7fa'
  }
};
