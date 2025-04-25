
import * as XLSX from 'xlsx';

export interface ParsedReview {
  productId: string;
  reviewText: string;
  date?: string;
  rating?: string;
  helpfulnessNumerator?: number;
  helpfulnessDenominator?: number;
  userId?: string;
  verified?: boolean;
}

const columnMappings = {
  productId: ['product', 'id', 'product_id', 'productid', 'item', 'asin', 'product id', 'item id', 'sku'],
  reviewText: ['review', 'comment', 'feedback', 'description', 'text', 'content', 'review text', 'comments', 'review_text'],
  date: ['date', 'time', 'timestamp', 'created', 'submitted', 'posted', 'review date', 'submission date', 'review_date'],
  rating: ['rating', 'score', 'stars', 'rank', 'grade', 'review score', 'review_rating', 'star_rating'],
  helpfulnessNumerator: ['helpful', 'upvotes', 'likes', 'helpfulness', 'helpful votes', 'helpfulnessnumerator'],
  helpfulnessDenominator: ['total votes', 'total', 'votes', 'helpfulness denominator', 'helpfulnessdenominator'],
  userId: ['user', 'customer', 'reviewer', 'user_id', 'customer_id', 'reviewer_id', 'user id'],
  verified: ['verified', 'verified purchase', 'verified_purchase', 'verified buyer', 'is verified', 'authenticated']
};

export const parseExcelFile = async (file: File): Promise<ParsedReview[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
        
        if (jsonData.length === 0) {
          reject(new Error("The file appears to be empty or has no valid data"));
          return;
        }
        
        const headers = jsonData[0] as Record<string, string>;
        
        const fieldMap = new Map<string, string>();
        
        Object.entries(headers).forEach(([col, value]) => {
          if (!value) return;
          
          const lowerValue = String(value).toLowerCase().trim();
          
          for (const [fieldName, possibleNames] of Object.entries(columnMappings)) {
            if (possibleNames.some(name => lowerValue.includes(name))) {
              fieldMap.set(fieldName, col);
              break;
            }
          }
        });
        
        console.log("Detected columns:", Object.fromEntries(fieldMap.entries()));
        
        const reviews: ParsedReview[] = [];
        const dataRows = jsonData.slice(1);
        
        // Increase chunk size for better performance with large datasets
        const CHUNK_SIZE = 2500;
        let processedCount = 0;
        
        const processChunk = (startIdx: number) => {
          const endIdx = Math.min(startIdx + CHUNK_SIZE, dataRows.length);
          
          for (let i = startIdx; i < endIdx; i++) {
            const row = dataRows[i] as Record<string, any>;
            if (!row) continue;
            
            const productId = row[fieldMap.get('productId') || ''] || 'Unknown';
            const reviewText = row[fieldMap.get('reviewText') || ''] || '';
            
            if (!reviewText || reviewText.toString().trim() === '') {
              continue;
            }
            
            const date = row[fieldMap.get('date') || ''] || new Date().toISOString().split('T')[0];
            const rating = row[fieldMap.get('rating') || ''] || null;
            
            let helpfulnessNumerator: number | undefined = undefined;
            let helpfulnessDenominator: number | undefined = undefined;
            
            if (fieldMap.has('helpfulnessNumerator')) {
              const helpfulValue = row[fieldMap.get('helpfulnessNumerator') || ''];
              if (helpfulValue !== undefined) {
                helpfulnessNumerator = Number(helpfulValue) || 0;
              }
            }
            
            if (fieldMap.has('helpfulnessDenominator')) {
              const totalValue = row[fieldMap.get('helpfulnessDenominator') || ''];
              if (totalValue !== undefined) {
                helpfulnessDenominator = Number(totalValue) || 0;
              }
            }
            
            const userId = row[fieldMap.get('userId') || ''] || undefined;
            
            let verified: boolean | undefined = undefined;
            if (fieldMap.has('verified')) {
              const verifiedValue = row[fieldMap.get('verified') || ''];
              if (verifiedValue !== undefined) {
                const verifiedStr = String(verifiedValue).toLowerCase();
                verified = verifiedStr === 'true' || verifiedStr === 'yes' || verifiedStr === '1' || verifiedStr === 'y';
              }
            }
            
            reviews.push({
              productId: String(productId),
              reviewText: String(reviewText),
              date: String(date),
              rating: rating !== null ? String(rating) : undefined,
              helpfulnessNumerator,
              helpfulnessDenominator,
              userId: userId ? String(userId) : undefined,
              verified
            });
          }
          
          processedCount += (endIdx - startIdx);
          
          if (processedCount < dataRows.length) {
            // Use requestAnimationFrame for better UI responsiveness during processing
            requestAnimationFrame(() => processChunk(endIdx));
          } else {
            resolve(reviews);
          }
        };
        
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

export const analyzeSentiment = (text: string): {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  accuracy: number;
} => {
  if (!text || typeof text !== 'string') {
    return { sentiment: 'neutral', score: 50, accuracy: 70 };
  }

  const lowerText = text.toLowerCase();
  
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
  
  const words = lowerText.split(/\s+/);
  const wordSet = new Set(words);
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        positiveCount += matches.length;
      }
    }
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        negativeCount += matches.length;
      }
    }
  });
  
  const totalWords = words.length;
  const totalMatches = positiveCount + negativeCount;
  
  let accuracy = calculateAccuracy(text);
  
  let negationAdjustment = 0;
  const negationWords = ['not', 'no', "don't", 'doesn\'t', 'didn\'t', 'isn\'t', 'aren\'t', 'wasn\'t', 'weren\'t', 'never'];
  
  for (let i = 0; i < words.length - 1; i++) {
    if (negationWords.includes(words[i])) {
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
  
  if (negationAdjustment > 0) {
    accuracy = Math.min(99, accuracy + 5);
  }
  
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

export const extractKeywords = (text: string, sentiment: string): Array<{word: string, sentiment: string}> => {
  if (!text || typeof text !== 'string') return [];
  
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
  
  const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
  const wordFrequency = new Map<string, number>();
  
  for (const word of words) {
    if (!stopWords.has(word) && word.length > 2) {
      const count = wordFrequency.get(word) || 0;
      wordFrequency.set(word, count + 1);
    }
  }
  
  const sorted = Array.from(wordFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  return sorted.map(([word]) => ({
    word,
    sentiment
  }));
};

const calculateAccuracy = (text: string): number => {
  const length = text.length;
  const words = text.split(/\s+/);
  const uniqueWords = new Set(words).size;
  
  let accuracyValue = Math.min(95, Math.max(70, 
    70 + 
    (length > 100 ? 10 : length > 50 ? 5 : 0) + 
    (uniqueWords > 20 ? 10 : uniqueWords > 10 ? 5 : 0) +
    (text.includes('.') ? 5 : 0)
  ));
  
  return accuracyValue;
};

export const extractAspects = (text: string, sentiment: string): Array<{
  name: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  context: string;
}> => {
  if (!text || typeof text !== 'string') return [];
  
  const lowerText = text.toLowerCase();
  const aspects = [];
  
  const commonAspects = [
    'quality', 'price', 'value', 'service', 'delivery', 'shipping', 
    'design', 'durability', 'reliability', 'customer service', 'packaging', 
    'usability', 'performance', 'size', 'color', 'features', 'functionality',
    'support', 'installation', 'ease of use', 'comfort'
  ];
  
  for (const aspect of commonAspects) {
    if (lowerText.includes(aspect)) {
      const aspectIndex = lowerText.indexOf(aspect);
      const contextStart = Math.max(0, aspectIndex - 30);
      const contextEnd = Math.min(text.length, aspectIndex + aspect.length + 30);
      const context = text.substring(contextStart, contextEnd);
      
      let aspectPositive = 0;
      let aspectNegative = 0;
      
      const contextWords = context.toLowerCase().split(/\s+/);
      const positiveAspectWords = ['good', 'great', 'excellent', 'awesome', 'love', 'perfect', 'best', 'nice', 'happy', 'satisfied'];
      const negativeAspectWords = ['bad', 'poor', 'terrible', 'horrible', 'awful', 'worst', 'hate', 'disappointing', 'broken', 'useless'];
      
      contextWords.forEach(word => {
        if (positiveAspectWords.includes(word)) aspectPositive++;
        if (negativeAspectWords.includes(word)) aspectNegative++;
      });
      
      let aspectSentiment: 'positive' | 'negative' | 'neutral';
      if (aspectPositive > aspectNegative) {
        aspectSentiment = 'positive';
      } else if (aspectNegative > aspectPositive) {
        aspectSentiment = 'negative';
      } else {
        aspectSentiment = sentiment as 'positive' | 'negative' | 'neutral';
      }
      
      const totalMatches = aspectPositive + aspectNegative;
      const confidence = totalMatches > 0 
        ? Math.min(95, 70 + (totalMatches * 5)) 
        : 70;
      
      aspects.push({
        name: aspect.charAt(0).toUpperCase() + aspect.slice(1),
        sentiment: aspectSentiment,
        confidence,
        context
      });
      
      if (aspects.length >= 5) break;
    }
  }
  
  if (aspects.length === 0) {
    aspects.push({
      name: 'Overall',
      sentiment: sentiment as 'positive' | 'negative' | 'neutral',
      confidence: 70,
      context: text.substring(0, Math.min(60, text.length))
    });
  }
  
  return aspects;
};
