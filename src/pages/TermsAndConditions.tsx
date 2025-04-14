import React from 'react';
import { Book, FileText, ListCheck } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <div className="flex items-center justify-center mb-12">
          <Book className="h-12 w-12 mr-4 text-gray-600" />
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Terms <span className="text-gray-500">and</span> Conditions
          </h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 space-y-6">
          <div className="flex items-center mb-6">
            <FileText className="h-6 w-6 mr-3 text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-700">1. Introduction</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to RSA (Review Sentiment Analysis). These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
          <p className="text-gray-600 leading-relaxed">
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use RSA if you do not accept all of the terms and conditions stated on this page.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 space-y-6">
          <div className="flex items-center mb-6">
            <ListCheck className="h-6 w-6 mr-3 text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-700">2. License to Use</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Unless otherwise stated, RSA and/or its licensors own the intellectual property rights for all material on this site. All intellectual property rights are reserved.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            You must not:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Republish material from this website</li>
            <li>Sell, rent or sub-license material from this website</li>
            <li>Reproduce, duplicate or copy material from this website</li>
            <li>Redistribute content from RSA (unless content is specifically made for redistribution)</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 space-y-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">3. User Account</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you create an account on our website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with the account.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 space-y-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">4. Services</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The sentiment analysis services provided by RSA are for informational purposes only. We strive to provide accurate analysis but do not guarantee the accuracy, completeness, or usefulness of any information provided through our services.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">5. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            In no event shall RSA, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
