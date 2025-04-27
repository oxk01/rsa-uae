
export const pdfStyles = {
  fonts: {
    normal: 'helvetica',
    bold: 'helvetica-bold',
  },
  sizes: {
    title: 28,          // Large, clear title
    sectionHeader: 20,  // Prominent section headers
    subHeader: 16,      // Clear sub-headers
    body: 12,           // Readable body text
    caption: 10,        // Small but legible captions
  },
  spacing: {
    sectionMargin: 40,  // Generous space between sections
    paragraphMargin: 20,  // Clear paragraph separation
    headerMargin: 30,    // Ample space around headers
    pageMargin: {        // Ensure content doesn't touch page edges
      top: 40,
      bottom: 40,
      left: 30,
      right: 30
    },
    lineHeight: 1.5,     // Improved readability with increased line spacing
    contentSpacing: 10   // Additional spacing to prevent content bleeding
  },
  colors: {
    primary: '#1a365d',
    text: '#000000',     // Pure black for maximum readability
    header: '#1a365d',   // Dark, professional header color
    background: '#FFFFFF'  // Clean white background
  },
  layout: {
    maxContentHeight: 0.8,  // Ensure content uses only 80% of page height
    minMarginBetweenElements: 10  // Minimum spacing between different content blocks
  }
};

