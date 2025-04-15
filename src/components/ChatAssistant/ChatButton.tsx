
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  const { t } = useLanguage();
  
  return (
    <Button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-xl
        flex items-center justify-center transition-all duration-300
        bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
        dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700
        text-white border-2 border-white dark:border-blue-400
        ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 animate-bounce'}`}
      size="icon"
    >
      <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-25"></div>
      <MessageSquare className="h-7 w-7" />
      <span className="sr-only">{t('openChat')}</span>
    </Button>
  );
};

export default ChatButton;
