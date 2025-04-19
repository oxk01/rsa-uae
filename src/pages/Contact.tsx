import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Send, Mail, MapPin, Phone, ExternalLink, Clock, LinkedinIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent",
      description: "We've received your message and will respond soon!",
    });
    
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <div className={`min-h-screen py-16 ${language === 'ar' ? 'rtl' : ''}`}>
      {/* Header with gradient background */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 transform -skew-y-1"></div>
        <div className="container mx-auto px-4 relative py-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">Get in Touch</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about our services? We're here to help and would love to hear from you.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="md:col-span-1 space-y-6">
              {/* Email Card */}
              <Card className="overflow-hidden border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">Email</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <a href="mailto:E4485834@live.tees.ac.uk" className="text-blue-600 dark:text-blue-400 hover:underline">
                    E4485834@live.tees.ac.uk
                  </a>
                </CardContent>
              </Card>
              
              {/* Phone Card */}
              <Card className="overflow-hidden border-t-4 border-t-teal-500 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full">
                      <Phone className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <CardTitle className="text-xl">Phone</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <a href="tel:+971505350403" className="text-teal-600 dark:text-teal-400 hover:underline">
                    +971 50 5350403
                  </a>
                </CardContent>
              </Card>
              
              {/* Location Card */}
              <Card className="overflow-hidden border-t-4 border-t-amber-500 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                      <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <CardTitle className="text-xl">Location</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    Dubai, United Arab Emirates
                  </p>
                </CardContent>
              </Card>
              
              {/* Hours Card */}
              <Card className="overflow-hidden border-t-4 border-t-purple-500 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                      <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-xl">Business Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monday - Friday:</span>
                    <span className="font-medium">9AM - 5PM (GST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Saturday - Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <Card className="overflow-hidden border-t-4 border-t-blue-600">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out this form and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help you today?"
                        rows={6}
                        className="resize-none w-full"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                      disabled={isSubmitting}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Social Connections */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://www.linkedin.com/in/abdallah-rok-1b0606238" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LinkedinIcon className="h-5 w-5 text-blue-600" />
                    <span>LinkedIn</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CTA section with consistent styling */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 text-gray-800 dark:text-white mt-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-800 dark:text-blue-200">Ready to gain insights from your reviews?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Start analyzing your customer feedback today and discover actionable insights.
          </p>
          
          <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
            <a href="/demo">Try Demo Analysis</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
