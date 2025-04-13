
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useLanguage } from '@/contexts/LanguageContext';

const PricingPlan = () => {
  const { language } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 py-16 ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include core features with different limits and capabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
            <div className="p-6 border-b bg-gray-50">
              <h3 className="font-semibold text-xl mb-2">Free</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-gray-600 text-sm">Perfect for individuals getting started with review analysis</p>
            </div>
            
            <div className="p-6 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">100 reviews per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic sentiment analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">5 saved analyses</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">CSV uploads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email support</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 border-t">
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 flex flex-col relative transform scale-105 md:scale-110 z-10">
            <div className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-3 text-sm font-semibold rounded-bl-lg">
              Popular
            </div>
            <div className="p-6 border-b bg-blue-50">
              <h3 className="font-semibold text-xl mb-2">Pro</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-gray-600 text-sm">For businesses with moderate review volume</p>
            </div>
            
            <div className="p-6 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">1,000 reviews per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Advanced sentiment analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">50 saved analyses</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">CSV/Excel uploads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Trend analysis & reporting</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">API access (100 calls/day)</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 border-t">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
            <div className="p-6 border-b bg-gray-50">
              <h3 className="font-semibold text-xl mb-2">Enterprise</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <p className="text-gray-600 text-sm">For large companies with high volume needs</p>
            </div>
            
            <div className="p-6 flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited reviews</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">AI-powered deep analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited saved analyses</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Any file format uploads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Advanced reporting & analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom integrations</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 border-t">
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
        
        {/* Plan comparison table */}
        <div className="mt-20 max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-xl font-semibold">Plan Comparison</h2>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-2 font-medium">Feature</th>
                  <th className="text-center py-4 px-2 font-medium">Free</th>
                  <th className="text-center py-4 px-2 font-medium text-blue-600">Pro</th>
                  <th className="text-center py-4 px-2 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-2">Reviews per month</td>
                  <td className="py-3 px-2 text-center">100</td>
                  <td className="py-3 px-2 text-center">1,000</td>
                  <td className="py-3 px-2 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Sentiment analysis depth</td>
                  <td className="py-3 px-2 text-center">Basic</td>
                  <td className="py-3 px-2 text-center">Advanced</td>
                  <td className="py-3 px-2 text-center">Deep AI</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Aspect-based analysis</td>
                  <td className="py-3 px-2 text-center">Limited</td>
                  <td className="py-3 px-2 text-center">Full</td>
                  <td className="py-3 px-2 text-center">Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">API access</td>
                  <td className="py-3 px-2 text-center">No</td>
                  <td className="py-3 px-2 text-center">100 calls/day</td>
                  <td className="py-3 px-2 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Saved analyses</td>
                  <td className="py-3 px-2 text-center">5</td>
                  <td className="py-3 px-2 text-center">50</td>
                  <td className="py-3 px-2 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-2">Support</td>
                  <td className="py-3 px-2 text-center">Email</td>
                  <td className="py-3 px-2 text-center">Priority</td>
                  <td className="py-3 px-2 text-center">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Enhanced FAQ section */}
        <div className="mt-16 text-left max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">
                Can I upgrade or downgrade my plan?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be available immediately, and we'll prorate your bill. When downgrading, changes will take effect at the start of your next billing cycle.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">
                Do you offer discounts for annual billing?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, we offer a 15% discount for annual billing on all paid plans. This option is available during signup or from your account settings page.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">
                Is there a free trial available?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, all paid plans come with a 14-day free trial. No credit card is required to start your trial. You'll get full access to all features of the selected plan during your trial period.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">
                How do I count the number of reviews analyzed?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Each individual review text you submit counts as one review. For batch uploads, each row in your CSV/Excel file containing review text counts as one review against your monthly allowance. Reviews are counted when they are processed, regardless of length.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg">
                What happens if I exceed my monthly review limit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                If you reach your monthly review limit, you'll be notified via email and in your dashboard. You can either upgrade to a higher plan or wait until your allowance refreshes at the beginning of your next billing cycle. We don't automatically charge for overages.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg">
                What languages do you support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our Free and Pro plans currently support English and Arabic. The Enterprise plan adds support for Spanish, French, German, Chinese, Japanese, and customized language models for specific industries or regional dialects.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg">
                How accurate is the sentiment analysis?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our sentiment analysis achieves over 90% accuracy for general sentiment classification. The Pro plan includes aspect-based sentiment analysis with 85% accuracy, while the Enterprise plan uses custom-trained models that can reach up to 95% accuracy for your specific domain after optimization.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger className="text-lg">
                Can I integrate RSA with my existing systems?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, our Pro plan includes API access for basic integrations. The Enterprise plan offers full API access and custom integrations with your CRM, customer support platforms, business intelligence tools, and more. Our team will work with you to ensure seamless data flow.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9">
              <AccordionTrigger className="text-lg">
                How can I cancel my subscription?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You can cancel your subscription at any time from your account settings. After cancellation, you'll continue to have access to your plan's features until the end of your current billing cycle. We don't offer refunds for partial months.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10">
              <AccordionTrigger className="text-lg">
                Is my data secure and private?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, we take data security and privacy seriously. All data is encrypted in transit and at rest. We are GDPR and CCPA compliant, and we never use your data to train our models unless you explicitly opt in. Enterprise customers can also request custom data residency and security configurations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our team is ready to help you choose the right plan for your needs.</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
