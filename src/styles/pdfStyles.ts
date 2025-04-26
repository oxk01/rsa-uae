
export const pdfStyles = {
  fonts: {
    normal: 'helvetica',
    bold: 'helvetica-bold',
  },
  sizes: {
    title: 28,          // Increased for better readability
    sectionHeader: 20,   // Increased from 18
    subHeader: 16,
    body: 12,           // Base font size
    caption: 10,
  },
  spacing: {
    sectionMargin: 40,  // Increased vertical spacing between sections
    paragraphMargin: 20,  // Increased paragraph margin
    headerMargin: 30,    // Increased header margin
    pageMargin: {        // Added page margins
      top: 40,
      bottom: 40,
      left: 30,
      right: 30
    },
    lineHeight: 1.5     // Added line height
  },
  colors: {
    primary: '#1a365d',
    text: '#222222',    // Changed to darker color for better readability
    subtext: '#222222', // Changed from gray to dark for better readability
    header: '#000000'   // Added specific header color
  }
};
