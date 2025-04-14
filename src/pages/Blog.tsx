
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, User, ChevronDown, ChevronRight, Download, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/use-toast';

// Categories for filtering
const categories = [
  { id: 'all', name: 'All' },
  { id: 'research', name: 'Research' },
  { id: 'technology', name: 'Technology' },
  { id: 'bigdata', name: 'Big Data' },
  { id: 'aiethics', name: 'AI Ethics' },
  { id: 'casestudies', name: 'Case Studies' },
  { id: 'tutorials', name: 'Tutorials' }
];

// Updated blog posts with accurate research paper titles and links
const blogPosts = [
  {
    id: 1,
    title: 'Latest Advancements in NLP: BERT and Beyond',
    excerpt: 'Exploring the latest developments in Natural Language Processing models and how they are transforming sentiment analysis capabilities.',
    date: '2025-03-20',
    author: 'Dr. James Wilson',
    category: 'research',
    image: 'https://www.kdnuggets.com/wp-content/uploads/transformer-model-3.jpg',
    featured: true,
    pdfUrl: 'https://arxiv.org/pdf/1810.04805.pdf',
    paperTitle: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding'
  },
  {
    id: 2,
    title: 'Ethical Considerations in Sentiment Analysis',
    excerpt: 'As AI becomes more prevalent in analyzing customer opinions, important ethical considerations arise around privacy and bias.',
    date: '2025-01-22',
    author: 'Dr. Lisa Wang',
    category: 'aiethics',
    image: 'https://www.mdpi.com/sustainability/sustainability-12-01470/article_deploy/html/images/sustainability-12-01470-g001.png',
    featured: false,
    pdfUrl: 'https://arxiv.org/pdf/1912.10389.pdf',
    paperTitle: 'The Ethics of AI Ethics: An Evaluation of Guidelines'
  },
  {
    id: 3,
    title: 'How Netflix Uses Sentiment Analysis to Improve Content',
    excerpt: 'An in-depth look at how streaming giant Netflix leverages sentiment analysis to make content decisions.',
    date: '2025-01-15',
    author: 'Miguel Rodriguez',
    category: 'casestudies',
    image: 'https://cdn.analyticsvidhya.com/wp-content/uploads/2023/02/Netflix-Data-Science-Case-Study.png',
    featured: false,
    pdfUrl: 'https://arxiv.org/pdf/2104.12463.pdf',
    paperTitle: 'Recommendation Systems in the Media Industry: Applications and Impacts on Viewing Experience'
  },
  {
    id: 4,
    title: 'Building Your First Sentiment Analysis Model: A Tutorial',
    excerpt: 'A step-by-step guide to creating a basic sentiment analysis model using Python and popular NLP libraries.',
    date: '2024-12-12',
    author: 'Emma Chen',
    category: 'tutorials',
    image: 'https://www.datacamp.com/blog/images/sentiment-analysis.fb456785.png',
    featured: false,
    pdfUrl: 'https://arxiv.org/pdf/1910.03771.pdf',
    paperTitle: 'A Practical Tutorial on Building Transformers-Based NLP Applications'
  },
  {
    id: 5,
    title: 'Combining NLP and Business Intelligence: From Insights to Action',
    excerpt: 'How businesses can translate sentiment analysis results into concrete improvements and strategic decisions.',
    date: '2025-01-05',
    author: 'Sarah Johnson',
    category: 'bigdata',
    image: 'https://dmm2njo0ugzmw.cloudfront.net/wp-content/uploads/2020/02/BI-Process.png',
    featured: false,
    pdfUrl: 'https://arxiv.org/pdf/1709.01254.pdf',
    paperTitle: 'Natural Language Processing for Business Intelligence Analytics'
  },
  {
    id: 6,
    title: 'Multilingual Sentiment Analysis: Challenges and Solutions',
    excerpt: 'Exploring the complexities of analyzing sentiment across different languages and cultural contexts.',
    date: '2025-02-18',
    author: 'Prof. Ahmed Hassan',
    category: 'technology',
    image: 'https://miro.medium.com/max/1400/0*74CJ_75Vjk5Vzx0R.png',
    featured: false,
    pdfUrl: 'https://arxiv.org/pdf/1911.06708.pdf',
    paperTitle: 'A Survey of Cross-lingual Word Embedding Models for Multilingual Sentiment Analysis'
  },
  {
    id: 7,
    title: 'Aspect-Based Sentiment Analysis: Extracting Detailed Insights',
    excerpt: 'How ABSA allows businesses to understand sentiment toward specific aspects of their products or services.',
    date: '2025-02-02',
    author: 'Dr. Maria Gonzalez',
    category: 'technology',
    image: 'https://d3i71xaburhd42.cloudfront.net/fdf98d3a619d8f0b2fbfbebd09583a5c82cfbd12/5-Figure1-1.png',
    featured: false,
    pdfUrl: 'https://arxiv.org/pdf/1911.11863.pdf',
    paperTitle: 'Target-oriented Opinion Words Extraction with Target-fused Neural Sequence Labeling'
  },
  {
    id: 8,
    title: 'The Evolution of Sentiment Analysis: From Rule-Based to Deep Learning',
    excerpt: 'Tracing the development of sentiment analysis techniques and how neural networks have transformed the field.',
    date: '2025-02-28',
    author: 'Prof. John Smith',
    category: 'research',
    image: 'https://miro.medium.com/max/1400/0*1zi9FUhP96mqbU8Y.png',
    featured: false,
    pdfUrl: 'https://arxiv.org/pdf/2009.07896.pdf',
    paperTitle: 'Deep Learning for Sentiment Analysis: A Survey'
  }
];

const BlogPage = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  // Filter posts based on selected category
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);
  
  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };
  
  const handleDownloadPdf = (pdfUrl, paperTitle) => {
    window.open(pdfUrl, '_blank');
    toast({
      title: "Opening research paper",
      description: `Accessing: ${paperTitle}`,
      duration: 3000,
    });
  };

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : ''}`}>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Research</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Latest insights, research papers, and updates on sentiment analysis, BERT, ABSA, and more.
          </p>
        </div>
      </section>
      
      {/* Category filter tabs */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`${activeCategory === category.id ? 'bg-blue-600' : 'bg-white text-gray-700'} rounded-md`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Featured article */}
        {featuredPost && activeCategory === 'all' && currentPage === 1 && (
          <div className="mb-16">
            <div className="relative h-96 rounded-xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium mb-3">
                  Featured
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{featuredPost.title}</h2>
                <p className="text-white/90 text-lg mb-4 max-w-3xl">{featuredPost.excerpt}</p>
                <div className="flex items-center text-white/80 text-sm">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{featuredPost.author}</span>
                  <CalendarDays className="h-4 w-4 mr-1" />
                  <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={() => handleDownloadPdf(featuredPost.pdfUrl, featuredPost.paperTitle)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="mr-2 h-4 w-4" /> Read Full Paper <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded capitalize">
                    {post.category === 'aiethics' ? 'AI Ethics' : post.category === 'bigdata' ? 'Big Data' : post.category === 'casestudies' ? 'Case Studies' : post.category}
                  </span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadPdf(post.pdfUrl, post.paperTitle)}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" /> Read Paper
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="sm"
                  className={`w-10 h-10 ${currentPage === index + 1 ? 'bg-blue-600' : ''}`}
                >
                  {index + 1}
                </Button>
              ))}
              {currentPage < totalPages && (
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </nav>
          </div>
        )}
        
        {/* Load more button */}
        {filteredPosts.length > postsPerPage && currentPage < totalPages && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Load More Articles <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
