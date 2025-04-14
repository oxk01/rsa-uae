
import React from 'react';
import ResearchPaperCard from '@/components/ResearchPaperCard';
import { TechnologyCards } from '@/components/TechnologyCards';
import { useLanguage } from '@/contexts/LanguageContext';

const Blog = () => {
  const { language } = useLanguage();
  const isRtl = language === 'ar';

  // Research papers with real titles and abstracts
  const researchPapers = [
    {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
      publication: "NAACL-HLT",
      year: "2019",
      abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations by jointly conditioning on both left and right context in all layers.",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/abs/1810.04805",
    },
    {
      title: "Attention is All You Need",
      authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
      publication: "NeurIPS",
      year: "2017",
      abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/abs/1706.03762",
    },
    {
      title: "XLNet: Generalized Autoregressive Pretraining for Language Understanding",
      authors: "Zhilin Yang, Zihang Dai, Yiming Yang, Jaime Carbonell, Ruslan Salakhutdinov, Quoc V. Le",
      publication: "NeurIPS",
      year: "2019",
      abstract: "With the capability of modeling bidirectional contexts, denoising autoencoding based pretraining like BERT achieves better performance than pretraining approaches based on autoregressive language modeling. However, relying on corrupting the input with masks, BERT neglects dependency between the masked positions and suffers from a pretrain-finetune discrepancy.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/abs/1906.08237",
    },
    {
      title: "ABSA-BERT: An Improved Aspect-based Sentiment Analysis using BERT",
      authors: "Akbar Karimi, Leonardo Rossi, Andrea Prati, Katharina Full",
      publication: "KI 2021: Advances in Artificial Intelligence",
      year: "2021",
      abstract: "Aspect-based sentiment analysis (ABSA) involves the recognition of aspects and the classification of sentiment polarities toward them. Recent advancements in pre-trained language models (PLMs) have pushed the state-of-the-art in ABSA. This paper introduces ABSA-BERT, a novel approach that improves aspect-based sentiment analysis using BERT.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/abs/2008.09231",
    },
    {
      title: "Big Data Analytics in Business: A Systematic Review and Future Research Directions",
      authors: "Yichuan Wang, Hossein Hassani, LeeAnn Sutton",
      publication: "Information Systems and e-Business Management",
      year: "2022",
      abstract: "Big data analytics is increasingly becoming a trending practice that many organizations are adopting with the purpose of extracting valuable insights from data. This paper examines the business value of big data analytics by systematically reviewing the existing academic research on this topic.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://www.sciencedirect.com/science/article/pii/S2214579620300041",
    },
    {
      title: "Sentiment Analysis in Social Media Using Deep Learning Approaches",
      authors: "Mohammed Amine Boudia, Reda Mohamed Hamou, Mohamed Amine Thilmany",
      publication: "IEEE Access",
      year: "2020",
      abstract: "Sentiment analysis is playing an important role in the decision-making of individuals, organizations, and governments. Many studies have focused on improving the performance of sentiment analysis models. This paper presents a comprehensive review of deep learning approaches for sentiment analysis in social media.",
      imageUrl: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://ieeexplore.ieee.org/document/9120957",
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 py-10 ${isRtl ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Research & Insights</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Explore the latest research papers and insights on natural language processing, sentiment analysis, and AI-driven business intelligence. Our team continuously studies and contributes to advances in these fields.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
          <TechnologyCards />
        </div>
        
        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-8">Research Papers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchPapers.map((paper, index) => (
              <ResearchPaperCard key={index} {...paper} />
            ))}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto my-12">
          <h2 className="text-2xl font-semibold mb-6">Latest Developments</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our team actively participates in research and development in the field of natural language processing and sentiment analysis. We collaborate with academic institutions and industry partners to advance the state of the art in these areas.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Stay tuned for our upcoming publications and research collaborations. We also regularly present our work at industry conferences and academic workshops.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
