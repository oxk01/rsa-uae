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
        
        // Convert to JSON with header: true to use column names
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
        
        // Get header row and find column indexes by name
        const headers = jsonData[0] as Record<string, string>;
        const headerMap = new Map<string, string>();
        
        // Map possible header names to standardized keys
        Object.entries(headers).forEach(([col, value]) => {
          const lowerValue = String(value).toLowerCase();
          if (lowerValue.includes('product') || lowerValue.includes('id')) {
            headerMap.set('productId', col);
          } else if (lowerValue.includes('review') || lowerValue.includes('comment') || 
                    lowerValue.includes('feedback') || lowerValue.includes('description')) {
            headerMap.set('reviewText', col);
          } else if (lowerValue.includes('date')) {
            headerMap.set('date', col);
          } else if (lowerValue.includes('rating') || lowerValue.includes('score') || 
                    lowerValue.includes('stars')) {
            headerMap.set('rating', col);
          }
        });
        
        // Process data rows (skip header)
        const reviews: ParsedReview[] = [];
        const dataRows = jsonData.slice(1);
        
        // Process in chunks to avoid blocking the UI thread
        const CHUNK_SIZE = 1000;
        let processedCount = 0;
        
        const processChunk = (startIdx: number) => {
          const endIdx = Math.min(startIdx + CHUNK_SIZE, dataRows.length);
          
          for (let i = startIdx; i < endIdx; i++) {
            const row = dataRows[i] as Record<string, any>;
            
            // Extract data using header mapping
            const productId = row[headerMap.get('productId') || 'A'] || 'Unknown';
            const reviewText = row[headerMap.get('reviewText') || 'B'] || '';
            const date = row[headerMap.get('date') || 'C'] || new Date().toISOString().split('T')[0];
            const rating = row[headerMap.get('rating') || 'D'] || null;
            
            reviews.push({
              productId: String(productId),
              reviewText: String(reviewText),
              date: String(date),
              rating: rating !== null ? String(rating) : undefined
            });
          }
          
          processedCount += (endIdx - startIdx);
          
          if (processedCount < dataRows.length) {
            // Continue processing next chunk
            setTimeout(() => processChunk(endIdx), 0);
          } else {
            // All chunks processed
            resolve(reviews);
          }
        };
        
        // Start processing in chunks
        processChunk(0);
        
      } catch (error) {
        console.error("Excel parsing error:", error);
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};

// Enhanced sentiment analysis function
export const analyzeSentiment = (text: string): {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  accuracy: number;
} => {
  if (!text || typeof text !== 'string') {
    return { sentiment: 'neutral', score: 50, accuracy: 70 };
  }

  const lowerText = text.toLowerCase();
  
  // Define positive and negative word lists
  const positiveWords = [
    'good', 'great', 'excellent', 'awesome', 'amazing', 'love', 'best', 'perfect',
    'happy', 'satisfied', 'quality', 'recommend', 'positive', 'fantastic', 'nice',
    'wonderful', 'superior', 'outstanding', 'exceptional', 'impressive', 'pleased',
    'enjoy', 'favorite', 'worth', 'reliable', 'comfortable', 'affordable', 'efficient',
    'durable', 'helpful', 'easy', 'convenient', 'innovative', 'effective', 'reliable',
    'sturdy', 'stylish', 'elegant', 'versatile', 'bargain', 'value', 'solid', 'fast',
    'smooth', 'quiet', 'powerful', 'responsive', 'seamless', 'intuitive', 'attractive'
  ];
  
  const negativeWords = [
    'bad', 'poor', 'terrible', 'horrible', 'awful', 'worst', 'hate', 'disappointed',
    'disappointing', 'issues', 'problem', 'negative', 'broken', 'waste', 'useless',
    'refund', 'return', 'complained', 'complaint', 'defective', 'faulty', 'annoying',
    'damaged', 'cheap', 'costly', 'expensive', 'overpriced', 'fail', 'failed', 'failure',
    'difficult', 'hard', 'uncomfortable', 'unreliable', 'slow', 'noisy', 'loud',
    'flimsy', 'fragile', 'weak', 'leaking', 'cracked', 'malfunctioning', 'stopped',
    'inconsistent', 'unstable', 'error', 'frustrating', 'cumbersome', 'complicated',
    'confusing', 'ugly', 'bulky', 'heavy', 'stained', 'smells', 'incomplete', 'missing'
  ];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  // Count matches - optimize for large text
  const words = lowerText.split(/\s+/);
  const wordSet = new Set(words);
  
  // Check for positive words
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) {
      // Count actual occurrences in text
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        positiveCount += matches.length;
      }
    }
  });
  
  // Check for negative words
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) {
      // Count actual occurrences in text
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        negativeCount += matches.length;
      }
    }
  });
  
  // Calculate scores
  const totalWords = words.length;
  const totalMatches = positiveCount + negativeCount;
  
  // Calculate accuracy based on review quality and length
  let accuracy = calculateAccuracy(text);
  
  // Context awareness - check for negations
  let negationAdjustment = 0;
  const negationWords = ['not', 'no', "don't", 'doesn\'t', 'didn\'t', 'isn\'t', 'aren\'t', 'wasn\'t', 'weren\'t', 'never'];
  
  for (let i = 0; i < words.length - 1; i++) {
    if (negationWords.includes(words[i])) {
      // Check next few words for sentiment words
      for (let j = i + 1; j < Math.min(i + 4, words.length); j++) {
        if (positiveWords.includes(words[j])) {
          positiveCount--;
          negativeCount++;
          negationAdjustment++;
          break;
        } else if (negativeWords.includes(words[j])) {
          negativeCount--;
          positiveCount++;
          negationAdjustment++;
          break;
        }
      }
    }
  }
  
  // If we found negations, increase accuracy
  if (negationAdjustment > 0) {
    accuracy = Math.min(99, accuracy + 5);
  }
  
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

// Extract keywords from review text - optimized for performance
export const extractKeywords = (text: string, sentiment: string): Array<{word: string, sentiment: string}> => {
  if (!text || typeof text !== 'string') return [];
  
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
    'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was',
    'were', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
    'did', 'doing', 'would', 'should', 'could', 'ought', 'im', 'youre', 'hes',
    'shes', 'its', 'were', 'theyre', 'ive', 'youve', 'weve', 'theyve', 'id',
    'youd', 'hed', 'shed', 'wed', 'theyd', 'ill', 'youll', 'hell', 'shell',
    'well', 'theyll', 'isnt', 'arent', 'wasnt', 'werent', 'hasnt', 'havent',
    'hadnt', 'doesnt', 'dont', 'didnt', 'wont', 'wouldnt', 'shouldnt',
    'couldnt', 'cant', 'cannot', 'for', 'with', 'about', 'against', 'between',
    'into', 'through', 'during', 'before', 'after', 'above', 'below', 'up',
    'down', 'since', 'until', 'while', 'of', 'at', 'by', 'because', 'get', 'got',
    'use', 'used', 'using'
  ]);
  
  // Use a better regex to extract words
  const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
  const wordFrequency = new Map<string, number>();
  
  // More efficient way to process words
  for (const word of words) {
    if (!stopWords.has(word) && word.length > 2) {
      const count = wordFrequency.get(word) || 0;
      wordFrequency.set(word, count + 1);
    }
  }
  
  // Sort by frequency
  const sorted = Array.from(wordFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  return sorted.map(([word]) => ({
    word,
    sentiment
  }));
};

// Calculate accuracy based on review quality and length
const calculateAccuracy = (text: string): number => {
  // Basic calculation based on review length and diversity of words
  const length = text.length;
  const words = text.split(/\s+/);
  const uniqueWords = new Set(words).size;
  
  // Calculate base accuracy score
  let accuracyValue = Math.min(95, Math.max(70, 
    70 + 
    (length > 100 ? 10 : length > 50 ? 5 : 0) + 
    (uniqueWords > 20 ? 10 : uniqueWords > 10 ? 5 : 0) +
    (text.includes('.') ? 5 : 0) // Proper sentences with periods
  ));
  
  return accuracyValue;
};
