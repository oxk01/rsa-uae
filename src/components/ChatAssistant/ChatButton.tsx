
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
      className={`fixed bottom-6 right-6 z-40 rounded-full w-14 h-14 shadow-lg
        flex items-center justify-center transition-all ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      size="icon"
    >
      <MessageSquare className="h-6 w-6" />
      <span className="sr-only">{t('openChat')}</span>
    </Button>
  );
};

export default ChatButton;
