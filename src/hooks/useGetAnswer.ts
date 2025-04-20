
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/components/ui/use-toast";
import { createKnowledgeBase } from '@/utils/chatKnowledgeBase';

export const useGetAnswer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const isArabic = currentLanguage === 'ar';

  const processQuery = (query: string): string[] => {
    const stopWords = ['and', 'the', 'for', 'what', 'how', 'when', 'who', 'where', 'why', 'can', 'you', 
                      'about', 'with', 'this', 'that', 'tell', 'me', 'please', 'would', 'could', 'should'];
    
    const normalizedText = query.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s{2,}/g, ' ');
    
    const tokens = normalizedText.split(' ')
      .filter(word => word.length > 2 && !stopWords.includes(word));
    
    return tokens;
  };

  const calculateRelevance = (queryTerms: string[], topic: any): number => {
    if (!topic || !topic.content) return 0;
    
    const content = topic.content.toLowerCase();
    const keywords = topic.keywords || [];
    let score = 0;
    
    queryTerms.forEach(term => {
      if (content.includes(term)) {
        score += 1;
      }
      if (keywords.some((keyword: string) => keyword.includes(term) || term.includes(keyword))) {
        score += 2;
      }
      if (topic.title && topic.title.toLowerCase().includes(term)) {
        score += 3;
      }
    });
    
    return score;
  };

  const getAllTopics = (kb: any) => {
    const topics: any[] = [];
    const extractTopics = (obj: any) => {
      Object.values(obj).forEach((value: any) => {
        if (value && typeof value === 'object') {
          if (value.content) {
            topics.push(value);
          } else {
            extractTopics(value);
          }
        }
      });
    };
    
    extractTopics(kb);
    return topics;
  };

  const getAnswer = async (question: string, hasFile: boolean = false): Promise<string> => {
    setIsProcessing(true);
    
    try {
      const knowledgeBase = createKnowledgeBase(isArabic);
      const queryTerms = processQuery(question);
      const allTopics = getAllTopics(knowledgeBase);
      
      // Score all topics based on relevance to the question
      const scoredTopics = allTopics.map(topic => ({
        ...topic,
        score: calculateRelevance(queryTerms, topic)
      }))
      .filter(topic => topic.score > 0)
      .sort((a, b) => b.score - a.score);
      
      if (scoredTopics.length === 0) {
        return isArabic 
          ? 'عذراً، لم أتمكن من العثور على معلومات حول استفسارك. هل يمكنك إعادة صياغة سؤالك بطريقة مختلفة؟'
          : "I don't have specific information about that. Could you please rephrase your question?";
      }
      
      // Return the most relevant answer
      return scoredTopics[0].content;
      
    } catch (error) {
      console.error('Error processing question:', error);
      toast({
        title: "Error",
        description: "Failed to process your question",
        variant: "destructive"
      });
      return isArabic 
        ? 'عذرا، حدث خطأ أثناء معالجة سؤالك. يرجى المحاولة مرة أخرى.'
        : "Sorry, I encountered an error while processing your question. Please try again.";
    } finally {
      setIsProcessing(false);
    }
  };
  
  return { getAnswer, isProcessing };
};
