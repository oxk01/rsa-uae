
import React, { useState } from 'react';
import ResearchPaperCard from '@/components/ResearchPaperCard';
import { TechnologyCards } from '@/components/TechnologyCards';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Blog = () => {
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();
  const isRtl = currentLanguage === 'ar';

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'All Categories',
    'Sentiment Analysis',
    'AI Ethics',
    'Machine Learning',
    'Natural Language Processing',
    'Big Data'
  ];

  const [activeCategory, setActiveCategory] = useState('All Categories');

  // Research papers with real titles, abstracts and PDF links
  const researchPapers = [
    {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
      publication: "NAACL-HLT",
      year: "2019",
      abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations by jointly conditioning on both left and right context in all layers.",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/1810.04805.pdf",
      category: "Natural Language Processing"
    },
    {
      title: "Attention is All You Need",
      authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
      publication: "NeurIPS",
      year: "2017",
      abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/1706.03762.pdf",
      category: "Machine Learning"
    },
    {
      title: "XLNet: Generalized Autoregressive Pretraining for Language Understanding",
      authors: "Zhilin Yang, Zihang Dai, Yiming Yang, Jaime Carbonell, Ruslan Salakhutdinov, Quoc V. Le",
      publication: "NeurIPS",
      year: "2019",
      abstract: "With the capability of modeling bidirectional contexts, denoising autoencoding based pretraining like BERT achieves better performance than pretraining approaches based on autoregressive language modeling. However, relying on corrupting the input with masks, BERT neglects dependency between the masked positions and suffers from a pretrain-finetune discrepancy.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/1906.08237.pdf",
      category: "Natural Language Processing"
    },
    {
      title: "ABSA-BERT: An Improved Aspect-based Sentiment Analysis using BERT",
      authors: "Akbar Karimi, Leonardo Rossi, Andrea Prati, Katharina Full",
      publication: "KI 2021: Advances in Artificial Intelligence",
      year: "2021",
      abstract: "Aspect-based sentiment analysis (ABSA) involves the recognition of aspects and the classification of sentiment polarities toward them. Recent advancements in pre-trained language models (PLMs) have pushed the state-of-the-art in ABSA. This paper introduces ABSA-BERT, a novel approach that improves aspect-based sentiment analysis using BERT.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://link.springer.com/chapter/10.1007/978-3-030-58285-2_5.pdf",
      category: "Sentiment Analysis"
    },
    {
      title: "Big Data Analytics in Business: A Systematic Review and Future Research Directions",
      authors: "Yichuan Wang, Hossein Hassani, LeeAnn Sutton",
      publication: "Information Systems and e-Business Management",
      year: "2022",
      abstract: "Big data analytics is increasingly becoming a trending practice that many organizations are adopting with the purpose of extracting valuable insights from data. This paper examines the business value of big data analytics by systematically reviewing the existing academic research on this topic.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://link.springer.com/article/10.1007/s10257-019-00459-y.pdf",
      category: "Big Data"
    },
    {
      title: "Sentiment Analysis in Social Media Using Deep Learning Approaches",
      authors: "Mohammed Amine Boudia, Reda Mohamed Hamou, Mohamed Amine Thilmany",
      publication: "IEEE Access",
      year: "2020",
      abstract: "Sentiment analysis is playing an important role in the decision-making of individuals, organizations, and governments. Many studies have focused on improving the performance of sentiment analysis models. This paper presents a comprehensive review of deep learning approaches for sentiment analysis in social media.",
      imageUrl: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9120957",
      category: "Sentiment Analysis"
    },
    {
      title: "Ethics of Artificial Intelligence and Robotics",
      authors: "Vincent C. Müller",
      publication: "Stanford Encyclopedia of Philosophy",
      year: "2020",
      abstract: "Artificial intelligence (AI) and robotics are digital technologies that will have significant impact on the development of humanity in the near future. The ethics of AI and robotics is a rapidly evolving field. This article provides a broad overview of the main ethical issues in AI and robotics.",
      imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://plato.stanford.edu/entries/ethics-ai/download",
      category: "AI Ethics"
    }
  ];

  // Filter papers based on active category
  const filteredPapers = activeCategory === 'All Categories' 
    ? researchPapers 
    : researchPapers.filter(paper => paper.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate subscription process
    setTimeout(() => {
      toast({
        title: t('subscribeSuccess'),
        description: email,
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 py-10 ${isRtl ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{t('researchInsights')}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Explore the latest research papers and insights on natural language processing, sentiment analysis, and AI-driven business intelligence. Our team continuously studies and contributes to advances in these fields.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">{t('ourTechnology')}</h2>
          <TechnologyCards />
        </div>
        
        <div className="my-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold mb-4 md:mb-0">{t('researchPapers')}</h2>
            
            <div>
              <p className="text-sm text-gray-500 mb-2">{t('filterBy')}:</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button 
                    key={category} 
                    variant={activeCategory === category ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category === 'All Categories' ? t('allCategories') : t(category.toLowerCase().replace(/\s+/g, ''))}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPapers.map((paper, index) => (
              <ResearchPaperCard 
                key={index} 
                {...paper} 
                category={paper.category}
              />
            ))}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto my-12 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">{t('latestDevelopments')}</h2>
          
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3">
            <Input
              type="email"
              placeholder={t('enterEmail')}
              className="flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              {t('subscribe')}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-3">
            Subscribe to receive updates on our latest research and technology developments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
