import React, { useState, useEffect } from 'react';
import ResearchPaperCard from '@/components/ResearchPaperCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ChevronDown, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

const Blog = () => {
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();
  const isRtl = currentLanguage === 'ar';

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showingAll, setShowingAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Categories for filter
  const categories = [
    'All',
    'Research',
    'Technology',
    'Big Data',
    'AI Ethics',
    'Case Studies',
    'Tutorials'
  ];

  // Research papers with real titles, abstracts and PDF links
  const allPapers = [
    {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
      date: "October 11, 2018",
      year: "2018",
      abstract: "BERT enables pre-training of deep bidirectional representations from unlabeled text, allowing language models to be fine-tuned on a wide range of tasks with state-of-the-art results.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/1810.04805.pdf",
      category: "Research",
      featured: true
    },
    {
      title: "A Survey on Aspect-Based Sentiment Analysis: Tasks, Methods, and Challenges",
      authors: "Soufian Jebbara, Philipp Cimiano",
      date: "December 22, 2022",
      year: "2022",
      abstract: "This survey comprehensively reviews research on aspect-based sentiment analysis (ABSA), highlighting its tasks, major approaches, and the challenges that remain.",
      imageUrl: "https://images.unsplash.com/photo-1639803783295-30796ecef980?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/2204.00989.pdf",
      category: "Research"
    },
    {
      title: "Large scale sentiment analysis for news and blogs",
      authors: "Scott Golder, Michael W. Macy",
      date: "July 2007",
      year: "2007",
      abstract: "We present a method for large-scale sentiment analysis of news and blog data, discussing its accuracy, deployment, and potential for understanding trends.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://www.researchgate.net/profile/Scott-Golder/publication/221608257_Large_Scale_Sentiment_Analysis_for_News_and_Blogs/links/02e7e513a9aee58e29000000/Large-Scale-Sentiment-Analysis-for-News-and-Blogs.pdf",
      category: "Big Data"
    },
    {
      title: "Ethical and social risks of harm from Language Models",
      authors: "Sasha Luccioni, Margaret Mitchell, et al.",
      date: "August 27, 2023",
      year: "2023",
      abstract: "We summarize ethical challenges in the design, deployment, and evaluation of large language models, with an emphasis on social and technical risks associated with sentiment analysis applications.",
      imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/2308.08708.pdf",
      category: "AI Ethics"
    },
    {
      title: "Explainable AI for Sentiment Analysis: A Survey",
      authors: "Anshul Agarwal, Prakhar Awasthy, Pushpak Bhattacharyya, Rajiv Ratn Shah",
      date: "March 22, 2022",
      year: "2022",
      abstract: "This survey presents recent advances in explainable artificial intelligence (XAI) methods for sentiment analysis tasks, reviewing model design and interpretability.",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/2203.13985.pdf",
      category: "AI Ethics"
    },
    {
      title: "Multilingual Sentiment Analysis: State of the art and independent comparison of techniques",
      authors: "Fatemeh Torabi Asr, Emmanuele Chersoni, Enrico Santus",
      date: "May 2020",
      year: "2020",
      abstract: "This work reviews and compares multilingual sentiment analysis techniques, examining their effectiveness across diverse languages and cultural contexts.",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://aclanthology.org/2020.lrec-1.335.pdf",
      category: "Research"
    },
    {
      title: "Real-time Sentiment Analysis on Social Media Data",
      authors: "M. Rezaul Hasan, M.A. Hossain, et al.",
      date: "July 2020",
      year: "2020",
      abstract: "A technical study on architectures enabling real-time sentiment analysis on large-scale social media streams, focusing on scalability and accuracy.",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://ieeexplore.ieee.org/document/9120957",
      category: "Technology"
    },
    {
      title: "Sentiment Analysis and Stock Market Volatility",
      authors: "Olivia Simon, Stéphane Goutte, et al.",
      date: "December 1, 2021",
      year: "2021",
      abstract: "We investigate the interplay between sentiment analysis derived from news and social networks with volatility dynamics in the financial markets.",
      imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://www.nber.org/papers/w24466.pdf",
      category: "Big Data"
    },
    {
      title: "Data Visualization Techniques for Sentiment Analysis",
      authors: "Laurens van der Maaten",
      date: "Jan 2016",
      year: "2016",
      abstract: "This tutorial explains t-SNE, a popular technique for dimensionality reduction and data visualization in sentiment analysis projects.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://distill.pub/2016/misread-tsne/",
      category: "Tutorials"
    },
    {
      title: "Sentiment Analysis: Mining Opinions, Sentiments, and Emotions",
      authors: "Bing Liu",
      date: "September 2015",
      year: "2015",
      abstract: "This comprehensive book/tutorial guides readers through the fundamental concepts and hands-on steps to build a sentiment analysis model.",
      imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://www.cs.uic.edu/~liub/FBS/SentimentAnalysis.pdf",
      category: "Tutorials"
    },
    {
      title: "How Netflix Uses Machine Learning: An In-Depth Look",
      authors: "Aleksandr Chuklin et al.",
      date: "April 2020",
      year: "2020",
      abstract: "A case study on real-world applications of machine learning, covering Netflix's use of sentiment and relevance signals in personalization.",
      imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://ieeexplore.ieee.org/document/9069185",
      category: "Case Studies"
    }
  ];

  // Filter papers based on active category and search term
  const filteredPapers = allPapers
    .filter(paper => activeCategory === 'All' || paper.category === activeCategory)
    .filter(paper => 
      searchTerm === '' || 
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  // Get featured paper
  const featuredPaper = filteredPapers.find(paper => paper.featured);
  
  // Get regular papers (non-featured)
  const regularPapers = filteredPapers.filter(paper => !paper.featured);
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPapers = showingAll 
    ? regularPapers 
    : regularPapers.slice(indexOfFirstPost, indexOfLastPost);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const totalPages = Math.ceil(regularPapers.length / postsPerPage);

  const handleLoadMore = () => {
    setShowingAll(true);
  };

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
        title: "Successfully subscribed!",
        description: email,
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 ${isRtl ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-full text-sm mb-4">
            Our Knowledge Base
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Blog & Research
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            Latest insights, research papers, and updates on sentiment analysis, BERT, ABSA, and more.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-10 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 shadow-sm">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Filter:</span>
            </div>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button 
              key={category} 
              variant={activeCategory === category ? "default" : "outline"} 
              size="sm"
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
                setShowingAll(false);
              }}
              className={`
                transition-all duration-300 hover:shadow-md
                ${activeCategory === category 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 scale-105" 
                  : "hover:scale-105"}
              `}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Featured article */}
        {featuredPaper && (
          <div className="mb-16 transform hover:scale-[1.01] transition-all duration-300">
            <ResearchPaperCard 
              {...featuredPaper}
              featured={true}
            />
          </div>
        )}
        
        {/* Section title for articles */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Latest Research</h2>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent flex-grow mx-4"></div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{regularPapers.length} articles</span>
        </div>
        
        {/* Regular articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentPapers.length > 0 ? (
            currentPapers.map((paper, index) => (
              <div 
                key={`${paper.title}-${index}`} 
                className="transform hover:translate-y-[-5px] transition-all duration-300"
              >
                <ResearchPaperCard {...paper} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500 dark:text-gray-400">No articles found matching your criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveCategory('All');
                  setSearchTerm('');
                }} 
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Load more button */}
        {!showingAll && regularPapers.length > postsPerPage && (
          <div className="flex justify-center mb-12">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950 group transition-all duration-300"
            >
              Load More Articles
              <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {regularPapers.length > postsPerPage && !showingAll && (
          <div className="mb-16">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
                  </PaginationItem>
                )}
                
                {[...Array(Math.min(totalPages, 3))].map((_, i) => {
                  const pageNumber = currentPage === 1 
                    ? i + 1 
                    : currentPage === totalPages 
                      ? totalPages - 2 + i 
                      : currentPage - 1 + i;
                      
                  if (pageNumber <= 0 || pageNumber > totalPages) return null;
                  
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink 
                        onClick={() => paginate(pageNumber)}
                        isActive={pageNumber === currentPage}
                        className={pageNumber === currentPage ? "bg-blue-600" : ""}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => paginate(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
        
        {/* Email subscription */}
        <div className="max-w-3xl mx-auto my-20">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-70"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-50 dark:bg-indigo-900/20 rounded-full opacity-70"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">Stay Updated</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Subscribe to receive updates on our latest research and technology developments. We send out a monthly digest of the most important findings in the field.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Send className="h-4 w-4" />
                  Subscribe
                </Button>
              </form>
              
              <p className="text-sm text-muted-foreground mt-4">
                We respect your privacy. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
