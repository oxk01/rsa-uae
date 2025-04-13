
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingPlan = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include core features with different limits and capabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
            <div className="p-6 border-b">
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
              </ul>
            </div>
            
            <div className="p-6 border-t">
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 flex flex-col relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-3 text-sm font-semibold rounded-bl-lg">
              Popular
            </div>
            <div className="p-6 border-b">
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
            <div className="p-6 border-b">
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
                  <span className="text-gray-700">API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dedicated account manager</span>
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
        
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 text-left">
            <div>
              <h3 className="font-medium text-lg mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of the next billing cycle.</p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Do you offer discounts for annual billing?</h3>
              <p className="text-gray-600">Yes, we offer a 15% discount for annual billing on all paid plans.</p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Is there a free trial available?</h3>
              <p className="text-gray-600">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
