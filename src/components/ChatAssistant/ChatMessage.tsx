
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type MessageType = 'user' | 'assistant' | 'system';

export interface ChatMessageProps {
  content: string;
  type: MessageType;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, type, timestamp }) => {
  if (type === 'system') {
    return (
      <div className="flex justify-center mb-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-md px-3 py-2">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      {type === 'assistant' && (
        <div className="mr-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/lovable-uploads/fe0e17eb-004e-4730-9171-b309f4655ff0.png" alt="Assistant" />
            <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div className={`max-w-[80%] rounded-lg p-3 ${
        type === 'user' 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none shadow-md' 
          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <p className="text-xs mt-1 opacity-70">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {type === 'user' && (
        <div className="ml-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-green-600 text-white">U</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
