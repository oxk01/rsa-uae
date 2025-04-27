
export const pdfStyles = {
  fonts: {
    title: 'helvetica-bold',
    heading: 'helvetica-bold',
    subheading: 'helvetica-bold',
    normal: 'helvetica',
    bold: 'helvetica-bold',
  },
  sizes: {
    title: 16,              // Larger title for better hierarchy
    sectionHeader: 14,      // Clear section headers
    subHeader: 13,          // Distinguishable subheaders
    body: 11,               // Standard readable body text
    caption: 10,            // Smaller caption text
    pageNumber: 9,          // Subtle page numbers
  },
  spacing: {
    sectionMargin: 30,      // Better separation between sections
    paragraphMargin: 12,    // Clear paragraph separation
    headerMargin: 18,       // More space after headers
    pageMargin: {           // Professional document margins
      top: 30,
      bottom: 30,
      left: 25,
      right: 25
    },
    lineHeight: 1.4,        // Improved readability
    contentSpacing: 15,     // Better element separation
    listItemSpacing: 8,     // Clearer list spacing
  },
  colors: {
    primary: '#5e60ce',     // Professional purple for headers
    text: '#333333',        // Dark gray for better readability
    header: '#5e60ce',      // Consistent with primary
    subtext: '#5a6b7b',     // Medium gray for secondary text
    background: '#FFFFFF',  // Clean white background
    accent: '#6930c3',      // Purple accent for highlights
    positive: '#4cc9f0',    // Blue for positive sentiment
    neutral: '#bde0fe',     // Light blue for neutral sentiment
    negative: '#fb6f92',    // Pink for negative sentiment
    tableHeader: '#f8f9fa',  // Light background for table headers
    sectionBg: '#f8f9fa'     // Light background for sections
  },
  layout: {
    maxContentHeight: 0.85, // Slightly more content per page
    minMarginBetweenElements: 10,  // Clearer spacing
    chartHeight: 300,        // Increased chart height
    tableRowHeight: 18,      // More readable table rows
    headerIndent: 5,         // Indent for hierarchical headers
  },
  tables: {
    cellPadding: 8,
    borderColor: '#e0e0e0',
    headerBackground: '#f5f7fa'
  }
};
