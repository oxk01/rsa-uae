
import React, { useState } from 'react';
import ChatButton from './ChatButton';
import ChatInterface from './ChatInterface';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      <ChatButton onClick={toggleChat} isOpen={isOpen} />
      {isOpen && <ChatInterface isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatAssistant;
