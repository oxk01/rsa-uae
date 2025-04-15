
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, Maximize2, Minimize2, Upload } from "lucide-react";
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import { useGetAnswer } from '@/hooks/useGetAnswer';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      content: "Hello! I'm your virtual assistant. How can I help you today?",
      type: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getAnswer, isProcessing } = useGetAnswer();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !file) return;
    if (isProcessing) return;
    
    // Add user message
    const userMessage: ChatMessageProps = {
      content: input || (file ? `Sent a file: ${file.name}` : ''),
      type: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Get AI response
    try {
      const query = file 
        ? `I'm sending you a file named ${file.name}. Can you help me with this?` 
        : input;
        
      const answer = await getAnswer(query);
      const botMessage: ChatMessageProps = {
        content: answer,
        type: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Clear file after sending
      if (file) {
        setFile(null);
      }
    } catch (error) {
      console.error('Failed to get answer:', error);
      const errorMessage: ChatMessageProps = {
        content: "I'm sorry, I encountered an error while processing your question. Please try again later.",
        type: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      
      // Add a message showing the file was attached
      const fileMessage: ChatMessageProps = {
        content: `File attached: ${e.target.files[0].name}`,
        type: 'system',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fileMessage]);
    }
  };
  
  const handleReplaceFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
      flex flex-col transition-all duration-300 ease-in-out
      ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      ${isExpanded ? 'w-[450px] h-[600px]' : 'w-[350px] h-[500px]'}`}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
            <span className="text-white font-medium">AI</span>
          </div>
          <div>
            <h3 className="font-medium">Virtual Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ask me anything about our services</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpand}
            className="h-8 w-8"
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            content={message.content}
            type={message.type}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      
      {/* File Upload Indicator */}
      {file && (
        <div className="border-t dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <Upload className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleReplaceFile}>
              Replace File
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
              Remove
            </Button>
          </div>
        </div>
      )}
      
      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="border-t dark:border-gray-700 p-4 flex gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isProcessing}
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={isProcessing || (!input.trim() && !file)} 
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
