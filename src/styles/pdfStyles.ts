
export const pdfStyles = {
  fonts: {
    normal: 'helvetica',
    bold: 'helvetica-bold',
  },
  sizes: {
    title: 32,          // Larger title for better hierarchy
    sectionHeader: 24,   // Prominent section headers
    subHeader: 18,      // Clear sub-headers
    body: 14,           // Larger body text for better readability
    caption: 12,        // Readable captions
  },
  spacing: {
    sectionMargin: 50,    // More space between sections
    paragraphMargin: 25,  // Better paragraph separation
    headerMargin: 35,     // More space around headers
    pageMargin: {         // Wider margins for better layout
      top: 50,
      bottom: 50,
      left: 40,
      right: 40
    },
    lineHeight: 1.6,      // Increased line height for better readability
    contentSpacing: 15    // More space between elements
  },
  colors: {
    primary: '#1a365d',    // Deep blue for headers
    text: '#1a1a1a',       // Slightly softer than pure black
    header: '#1a365d',     // Consistent with primary
    subtext: '#4a5568',    // Grey for secondary text
    background: '#FFFFFF'   // Clean white background
  },
  layout: {
    maxContentHeight: 0.75,  // Slightly reduced to prevent content crowding
    minMarginBetweenElements: 15  // More spacing between elements
  }
};
