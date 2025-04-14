
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
        flex items-center justify-center transition-all 
        bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
        text-white border-2 border-white dark:border-blue-400
        ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      size="icon"
    >
      <MessageSquare className="h-7 w-7" />
      <span className="sr-only">{t('openChat')}</span>
    </Button>
  );
};

export default ChatButton;
