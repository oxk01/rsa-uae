
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, or upload content to our service.
          </p>
          <p className="text-gray-700 mb-4">
            This information may include:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Your name, email address, and password</li>
            <li>Reviews and other content you submit for analysis</li>
            <li>User settings and preferences</li>
            <li>Any other information you choose to provide</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and complete transactions</li>
            <li>Send you technical notices, updates, security alerts, and administrative messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Improve our machine learning models for sentiment analysis</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
          <p className="text-gray-700 mb-4">
            We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>
          <p className="text-gray-700 mb-4">
            However, no Internet or email transmission is ever fully secure or error-free. In particular, email sent to or from our services may not be secure. Therefore, you should take special care in deciding what information you send to us via email.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Cookies</h2>
          <p className="text-gray-700 mb-4">
            We use cookies and similar technologies to track visitor activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p className="text-gray-700 mb-4">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">5. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date.
          </p>
          <p className="text-gray-700 mb-4">
            You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
