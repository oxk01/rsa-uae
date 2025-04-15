import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, X, Maximize2, Minimize2, Upload, 
  FileText, Paperclip, RefreshCw, Brain, 
  CornerDownLeft
} from "lucide-react";
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import { useGetAnswer } from '@/hooks/useGetAnswer';
import { useToast } from "@/components/ui/use-toast";

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
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getAnswer, isProcessing } = useGetAnswer();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const addMessageWithTypingEffect = (message: ChatMessageProps) => {
    if (message.type === 'assistant') {
      setIsTyping(true);
      
      setMessages(prev => [...prev, {
        content: "...",
        type: 'assistant',
        timestamp: new Date()
      }]);
      
      const typingDelay = Math.min(Math.max(message.content.length * 15, 500), 1500);
      
      setTimeout(() => {
        setMessages(prev => {
          newMessages.pop();
          return [...newMessages, message];
        });
        setIsTyping(false);
      }, typingDelay);
    } else {
      setMessages(prev => [...prev, message]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !file) return;
    if (isProcessing || isTyping) return;
    
    const userMessage: ChatMessageProps = {
      content: input || (file ? `Sent a file: ${file.name}` : ''),
      type: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
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
      
      addMessageWithTypingEffect(botMessage);
      
      if (file) {
        setFile(null);
      }
    } catch (error) {
      console.error('Failed to get answer:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
      
      const errorMessage: ChatMessageProps = {
        content: "I'm sorry, I encountered an error while processing your question. Please try again later.",
        type: 'assistant',
        timestamp: new Date()
      };
      
      addMessageWithTypingEffect(errorMessage);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      
      const fileMessage: ChatMessageProps = {
        content: `File attached: ${selectedFile.name}`,
        type: 'system',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fileMessage]);
      
      inputRef.current?.focus();
      
      toast({
        title: "File attached",
        description: `${selectedFile.name} has been attached`,
      });
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
  
  const clearChat = () => {
    setMessages([
      {
        content: "Hello! I'm your virtual assistant. How can I help you today?",
        type: 'assistant',
        timestamp: new Date()
      }
    ]);
    setFile(null);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 
      flex flex-col transition-all duration-300 ease-in-out
      ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      ${isExpanded ? 'w-[500px] h-[650px]' : 'w-[350px] h-[500px]'}
      overflow-hidden rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700
      bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900`}
    >
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mr-3 shadow-inner">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200">AI Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Intelligent support for your queries</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Clear chat"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpand}
            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-slate-50 dark:bg-gray-850">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            content={message.content}
            type={message.type}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      
      {file && (
        <div className="border-t dark:border-gray-700 p-2 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm truncate max-w-[200px] text-blue-700 dark:text-blue-300">{file.name}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleReplaceFile} className="h-7 text-xs">
              Replace
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="h-7 text-xs">
              Remove
            </Button>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSendMessage} className="border-t dark:border-gray-700 p-3 flex gap-2 items-center bg-white dark:bg-gray-800">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".txt,.pdf,.doc,.docx,.xlsx,.csv,.json"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className="h-8 w-8 rounded-full"
          disabled={isProcessing || isTyping}
        >
          <Paperclip className="h-4 w-4 text-gray-500" />
        </Button>
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isProcessing || isTyping}
            className="pr-10 bg-gray-50 dark:bg-gray-700 rounded-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (input.trim() || file) {
                  handleSendMessage(e);
                }
              }
            }}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isProcessing || isTyping || (!input.trim() && !file)} 
          size="icon"
          className="h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
