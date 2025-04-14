
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MessageType = 'user' | 'assistant';

export interface ChatMessageProps {
  content: string;
  type: MessageType;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, type, timestamp }) => {
  return (
    <div className={`flex w-full ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      {type === 'assistant' && (
        <div className="mr-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/lovable-uploads/fe0e17eb-004e-4730-9171-b309f4655ff0.png" alt="Assistant" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div className={`max-w-[80%] rounded-lg p-3 ${
        type === 'user' 
          ? 'bg-blue-600 text-white rounded-tr-none' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
      }`}>
        <p className="text-sm">{content}</p>
        <p className="text-xs mt-1 opacity-70">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {type === 'user' && (
        <div className="ml-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
