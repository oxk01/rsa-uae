import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { 
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

const PricingPlan = () => {
  const { language } = useLanguage();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Basic",
      description: "Perfect for small businesses or startups with minimal data needs",
      price: { monthly: 199, annually: 179 },
      highlight: false,
      features: [
        "Up to 5,000 reviews per month",
        "Basic sentiment analysis",
        "Single aspect-based analysis",
        "Accuracy reports (85-90%)",
        "Basic dashboard with graphs",
        "Export reports (CSV, PDF)"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline"
    },
    {
      name: "Standard",
      description: "For medium-sized businesses handling moderate data volumes",
      price: { monthly: 499, annually: 449 },
      highlight: true,
      features: [
        "Up to 15,000 reviews per month",
        "Advanced contextual sentiment analysis",
        "Multi-aspect analysis",
        "Real-time analysis with updates",
        "Accuracy reports (90-95%)",
        "Customizable dashboard",
        "Export options (CSV, PDF)"
      ],
      buttonText: "Get Started",
      buttonVariant: "default"
    },
    {
      name: "Premium",
      description: "For larger enterprises with high volumes of customer reviews",
      price: { monthly: 999, annually: 899 },
      highlight: false,
      features: [
        "Up to 50,000 reviews per month",
        "Full contextual sentiment analysis",
        "Multi-aspect sentiment analysis",
        "Real-time & continuous data processing",
        "High accuracy (95-99%)",
        "Comprehensive customizable dashboard",
        "Detailed analytical reports",
        "Export options (CSV, Excel, PDF)",
        "Priority customer support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline"
    }
  ];

  const comparisonFeatures = [
    { name: "Reviews per month", basic: "5,000", standard: "15,000", premium: "50,000" },
    { name: "Sentiment analysis", basic: "Basic", standard: "Advanced contextual", premium: "Full contextual (BERT)" },
    { name: "Aspect analysis", basic: "Single aspect", standard: "Multi-aspect", premium: "Complete ABSA" },
    { name: "Accuracy", basic: "85-90%", standard: "90-95%", premium: "95-99%" },
    { name: "Dashboard", basic: "Basic", standard: "Customizable", premium: "Comprehensive" },
    { name: "Export options", basic: "CSV, PDF", standard: "CSV, PDF", premium: "CSV, Excel, PDF" },
    { name: "Support", basic: "Email", standard: "Standard", premium: "Priority" }
  ];

  const addOns = [
    {
      name: "Data Setup & Integration",
      description: "Initial setup and system integration",
      price: 199,
      oneTime: true
    },
    {
      name: "Advanced Model Training & Optimization",
      description: "Continuous improvements and fine-tuning of AI models",
      price: 500,
      oneTime: false
    },
    {
      name: "Additional Support (Extended Hours)",
      description: "Priority support with extended hours",
      price: 100,
      oneTime: false
    }
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be available immediately, and we'll prorate your bill. When downgrading, changes will take effect at the start of your next billing cycle."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes, we offer a 15% discount for annual billing on all paid plans. This option is available during signup or from your account settings page."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, all paid plans come with a 14-day free trial. No credit card is required to start your trial. You'll get full access to all features of the selected plan during your trial period."
    },
    {
      question: "How do I count the number of reviews analyzed?",
      answer: "Each individual review text you submit counts as one review. For batch uploads, each row in your CSV/Excel file containing review text counts as one review against your monthly allowance. Reviews are counted when they are processed, regardless of length."
    },
    {
      question: "What happens if I exceed my monthly review limit?",
      answer: "If you reach your monthly review limit, you'll be notified via email and in your dashboard. You can either upgrade to a higher plan or wait until your allowance refreshes at the beginning of your next billing cycle. We don't automatically charge for overages."
    },
    {
      question: "What languages do you support?",
      answer: "Our Free and Pro plans currently support English and Arabic. The Enterprise plan adds support for Spanish, French, German, Chinese, Japanese, and customized language models for specific industries or regional dialects."
    },
    {
      question: "How accurate is the sentiment analysis?",
      answer: "Our sentiment analysis achieves over 90% accuracy for general sentiment classification. The Pro plan includes aspect-based sentiment analysis with 85% accuracy, while the Enterprise plan uses custom-trained models that can reach up to 95% accuracy for your specific domain after optimization."
    },
    {
      question: "Can I integrate RSA with my existing systems?",
      answer: "Yes, our Pro plan includes API access for basic integrations. The Enterprise plan offers full API access and custom integrations with your CRM, customer support platforms, business intelligence tools, and more. Our team will work with you to ensure seamless data flow."
    },
    {
      question: "How can I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. After cancellation, you'll continue to have access to your plan's features until the end of your current billing cycle. We don't offer refunds for partial months."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take data security and privacy seriously. All data is encrypted in transit and at rest. We are GDPR and CCPA compliant, and we never use your data to train our models unless you explicitly opt in. Enterprise customers can also request custom data residency and security configurations."
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
            Enterprise-Grade Review Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business needs. All plans include core review analysis features with different capacities.
          </p>
          
          <div className="flex justify-center items-center mb-8 space-x-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-blue-700 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
                billingCycle === 'annually' ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                  billingCycle === 'annually' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center">
              <span className={`text-sm font-medium ${billingCycle === 'annually' ? 'text-blue-700 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                Annual
              </span>
              <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                Save 10%
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.name} 
              className={`relative ${plan.highlight ? 'transform scale-105 md:scale-110 z-10' : ''}`}
            >
              <Card className={`h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-xl ${
                plan.highlight 
                  ? 'border-2 border-blue-500 dark:border-blue-400 shadow-lg' 
                  : 'border border-gray-200 dark:border-gray-700 shadow-md'
              }`}>
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-3 text-sm font-semibold rounded-bl-lg">
                    Popular
                  </div>
                )}
                
                <CardHeader className={`${plan.highlight ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                  <CardTitle className="text-xl md:text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline mt-2">
                    <span className="text-3xl md:text-4xl font-bold">${plan.price[billingCycle]}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow pt-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="border-t border-gray-100 dark:border-gray-800">
                  <Button 
                    className={`w-full ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' : ''}`} 
                    variant={plan.buttonVariant as "default" | "outline"}
                    asChild
                  >
                    <Link to="/contact">{plan.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-20 max-w-5xl mx-auto">
          <Card>
            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 border-b">
              <CardTitle className="text-xl md:text-2xl">Optional Add-ons</CardTitle>
            </CardHeader>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {addOns.map((addon, index) => (
                  <Card key={index} className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{addon.name}</CardTitle>
                      <CardDescription>{addon.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2 flex justify-between items-center">
                      <div className="font-semibold">${addon.price}</div>
                      <div className="text-sm text-gray-500">{addon.oneTime ? 'One-time fee' : '/month'}</div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-12 max-w-5xl mx-auto">
          <Card>
            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 border-b">
              <CardTitle className="text-xl md:text-2xl">Plan Comparison</CardTitle>
            </CardHeader>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-4 px-2 font-medium">Feature</th>
                    <th className="text-center py-4 px-2 font-medium">Basic</th>
                    <th className="text-center py-4 px-2 font-medium text-blue-600 dark:text-blue-400">Standard</th>
                    <th className="text-center py-4 px-2 font-medium">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className={index !== comparisonFeatures.length - 1 ? "border-b dark:border-gray-700" : ""}>
                      <td className="py-3 px-2">{feature.name}</td>
                      <td className="py-3 px-2 text-center">{feature.basic}</td>
                      <td className="py-3 px-2 text-center">{feature.standard}</td>
                      <td className="py-3 px-2 text-center">{feature.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        <div className="mt-16 text-left max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger className="text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">Ready to get started?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
            Contact our team for a personalized demo and to discuss how our solution can meet your specific needs.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" 
            asChild
          >
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
