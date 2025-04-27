
export interface PDFGeneratorOptions {
  title: string;
  date: string;
}

export interface PageData {
  pageNumber: number;
  pageWidth: number;
  pageHeight: number;
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  contentWidth: number;
  maxContentHeight: number;
}

export interface PDFHeaderConfig {
  title: string;
  subtitle: string;
  date: string;
}
