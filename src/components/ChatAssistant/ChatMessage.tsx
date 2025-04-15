import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Brain } from 'lucide-react';

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
        <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-xl px-4 py-2 shadow-sm">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      {type === 'assistant' && (
        <div className="mr-3">
          <Avatar className="h-10 w-10 border-2 border-purple-100 dark:border-purple-900">
            <AvatarImage 
              src="/lovable-uploads/61704fd3-df75-4b2e-a8c4-4936bfd29110.png" 
              alt="AI Assistant" 
              className="object-cover rounded-full" 
            />
            <AvatarFallback className="bg-purple-600 text-white">
              <Brain className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div className={`max-w-[80%] rounded-2xl p-4 ${
        type === 'user' 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none shadow-md' 
          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-lg border border-gray-100 dark:border-gray-700'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <p className="text-xs mt-2 opacity-60 text-right">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {type === 'user' && (
        <div className="ml-3">
          <Avatar className="h-10 w-10 border-2 border-green-100 dark:border-green-900">
            <AvatarFallback className="bg-green-600 text-white">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
