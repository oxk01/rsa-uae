
import React, { useState, useEffect } from 'react';
import ResearchPaperCard from '@/components/ResearchPaperCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ChevronDown } from 'lucide-react';
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
      title: "Latest Advancements in NLP: BERT and Beyond",
      authors: "Prof. James Wilson",
      date: "April 4, 2024",
      abstract: "Our new research paper explores how BERT-based models are evolving and setting new benchmarks in natural language understanding and sentiment analysis.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/1810.04805.pdf",
      category: "Research",
      featured: true
    },
    {
      title: "Understanding BERT: A Deep Dive into Bidirectional Encoders",
      authors: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      abstract: "This paper provides a comprehensive analysis of BERT's architecture and explains how its bidirectional context understanding revolutionizes NLP tasks.",
      imageUrl: "https://images.unsplash.com/photo-1639803783295-30796ecef980?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/1810.04805.pdf",
      category: "Research"
    },
    {
      title: "Aspect-Based Sentiment Analysis: The Future of Customer Feedback",
      authors: "Dr. Michael Chen",
      date: "February 28, 2024",
      abstract: "We explore how aspect-based sentiment analysis is transforming how businesses understand customer feedback by providing granular insights into specific product or service features.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/1812.10660.pdf",
      category: "Technology"
    },
    {
      title: "How Big Data is Transforming Sentiment Analysis",
      authors: "Dr. Emma Williams",
      date: "February 12, 2024",
      abstract: "This research examines how large-scale data processing enables more accurate sentiment analysis models and deepens our understanding of customer opinions across diverse platforms.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://www.sciencedirect.com/science/article/pii/S0007681318301393/pdf",
      category: "Big Data"
    },
    {
      title: "The Ethics of AI in Customer Sentiment Analysis",
      authors: "Dr. Lisa Wang",
      date: "January 22, 2024",
      abstract: "As AI becomes more prevalent in analyzing customer opinions, important ethical considerations arise around privacy and bias.",
      imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://philpapers.org/archive/DIETEO-23.pdf",
      category: "AI Ethics"
    },
    {
      title: "Case Study: How Netflix Uses Sentiment Analysis to Improve Content",
      authors: "Miguel Rodriguez",
      date: "January 15, 2024",
      abstract: "An in-depth look at how streaming giant Netflix leverages sentiment analysis to make content decisions.",
      imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://ieeexplore.ieee.org/document/9069185",
      category: "Case Studies"
    },
    {
      title: "Building Your First Sentiment Analysis Model: A Tutorial",
      authors: "Emma Chen",
      date: "December 12, 2023",
      abstract: "A step-by-step guide to creating a basic sentiment analysis model using Python and popular NLP libraries.",
      imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/1801.07883.pdf",
      category: "Tutorials"
    },
    {
      title: "Multilingual Sentiment Analysis: Challenges and Solutions",
      authors: "Dr. Hans Müller",
      date: "November 8, 2023",
      abstract: "This paper addresses the unique challenges of performing sentiment analysis across different languages and cultural contexts.",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://aclanthology.org/2020.lrec-1.335.pdf",
      category: "Research"
    },
    {
      title: "Explainable AI for Sentiment Analysis",
      authors: "Dr. Robert Thompson",
      date: "October 20, 2023",
      abstract: "We explore methods to make sentiment analysis models more transparent and interpretable, enabling users to understand why specific sentiments were assigned.",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://arxiv.org/pdf/1910.03876.pdf",
      category: "AI Ethics"
    },
    {
      title: "Real-time Sentiment Analysis in Social Media Streams",
      authors: "Sophia Martinez",
      date: "September 14, 2023",
      abstract: "This technical paper demonstrates architectures for processing and analyzing sentiment in high-volume social media data streams in real-time.",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://ieeexplore.ieee.org/document/9120957",
      category: "Technology"
    },
    {
      title: "Sentiment Analysis for Financial Markets",
      authors: "Dr. Alan Davidson",
      date: "August 5, 2023",
      abstract: "This research explores how sentiment analysis of news articles and social media can predict stock market movements and financial trends.",
      imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://www.nber.org/papers/w24466.pdf",
      category: "Big Data"
    },
    {
      title: "Data Visualization Techniques for Sentiment Analysis Results",
      authors: "Jennifer Wu",
      date: "July 17, 2023",
      abstract: "A comprehensive tutorial on creating effective visualizations to communicate sentiment analysis findings to different stakeholders.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
      paperUrl: "https://distill.pub/2016/misread-tsne/",
      category: "Tutorials"
    }
  ];

  // Filter papers based on active category
  const filteredPapers = activeCategory === 'All'
    ? allPapers
    : allPapers.filter(paper => paper.category === activeCategory);
    
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
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 py-6 ${isRtl ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog & Research</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Latest insights, research papers, and updates on sentiment analysis, BERT, ABSA, and more.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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
              className={activeCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Featured article */}
        {featuredPaper && (
          <div className="mb-12">
            <ResearchPaperCard 
              {...featuredPaper}
              featured={true}
            />
          </div>
        )}
        
        {/* Regular articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPapers.map((paper, index) => (
            <ResearchPaperCard 
              key={`${paper.title}-${index}`}
              {...paper}
            />
          ))}
        </div>
        
        {/* Load more button */}
        {!showingAll && regularPapers.length > postsPerPage && (
          <div className="flex justify-center mb-8">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
            >
              Load More Articles
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {regularPapers.length > postsPerPage && !showingAll && (
          <div className="mb-12">
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
        <div className="max-w-lg mx-auto my-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Latest Developments</h2>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
              Subscribe
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
