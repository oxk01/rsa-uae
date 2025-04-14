
import * as XLSX from 'xlsx';

export interface ParsedReview {
  productId: string;
  reviewText: string;
  date?: string;
  rating?: string;
}

export const parseExcelFile = async (file: File): Promise<ParsedReview[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        const reviews: ParsedReview[] = jsonData.map((row: any) => {
          return {
            productId: row.ProductID || row.productId || row.product_id || row.id || 'Unknown',
            reviewText: row.Review || row.review || row.ReviewText || row.reviewText || row.comment || row.Description || row.description || '',
            date: row.Date || row.date || new Date().toISOString().split('T')[0],
            rating: row.Rating || row.rating || null
          };
        });
        
        resolve(reviews);
      } catch (error) {
        console.error("Excel parsing error:", error);
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};

// Simple sentiment analysis function based on keywords
export const analyzeSentiment = (text: string): {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  accuracy: number;
} => {
  if (!text) {
    return { sentiment: 'neutral', score: 50, accuracy: 70 };
  }

  const lowerText = text.toLowerCase();
  
  // Define positive and negative word lists
  const positiveWords = [
    'good', 'great', 'excellent', 'awesome', 'amazing', 'love', 'best', 'perfect',
    'happy', 'satisfied', 'quality', 'recommend', 'positive', 'fantastic', 'nice',
    'wonderful', 'superior', 'outstanding', 'exceptional', 'impressive', 'pleased'
  ];
  
  const negativeWords = [
    'bad', 'poor', 'terrible', 'horrible', 'awful', 'worst', 'hate', 'disappointed',
    'disappointing', 'issues', 'problem', 'negative', 'broken', 'waste', 'useless',
    'refund', 'return', 'complained', 'complaint', 'defective', 'faulty', 'annoying'
  ];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  // Count matches
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      positiveCount += matches.length;
    }
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      negativeCount += matches.length;
    }
  });
  
  // Calculate scores
  const totalWords = lowerText.split(/\s+/).length;
  const totalMatches = positiveCount + negativeCount;
  
  // Calculate accuracy based on how many sentiment words were found
  // Higher match percentage = higher accuracy
  const matchPercentage = Math.min(1, totalMatches / (totalWords * 0.25));
  const accuracy = Math.floor(70 + matchPercentage * 25);
  
  // Determine sentiment
  let sentiment: 'positive' | 'negative' | 'neutral';
  let score: number;
  
  if (positiveCount > negativeCount) {
    sentiment = 'positive';
    score = Math.floor(50 + (positiveCount / (positiveCount + negativeCount || 1)) * 50);
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
    score = Math.floor(50 - (negativeCount / (positiveCount + negativeCount || 1)) * 50);
  } else {
    sentiment = 'neutral';
    score = 50;
  }
  
  return { sentiment, score, accuracy };
};

// Extract keywords from review text
export const extractKeywords = (text: string, sentiment: string): Array<{word: string, sentiment: string}> => {
  if (!text) return [];
  
  // Common words to exclude
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be',
    'have', 'has', 'had', 'do', 'does', 'did', 'to', 'from', 'in', 'out',
    'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here',
    'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each',
    'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
    'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can',
    'will', 'just', 'don', 'should', 'now', 'i', 'me', 'my', 'myself', 'we',
    'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its',
    'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
    'who', 'whom', 'this', 'that', 'these', 'those'
  ]);
  
  const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
  const wordFrequency = new Map<string, number>();
  
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 2) {
      const count = wordFrequency.get(word) || 0;
      wordFrequency.set(word, count + 1);
    }
  });
  
  // Sort by frequency
  const sorted = Array.from(wordFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  return sorted.map(([word]) => ({
    word,
    sentiment
  }));
};
