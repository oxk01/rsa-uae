
import React from 'react';
import { pdfStyles } from '@/styles/pdfStyles';

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle = ({ title, className }: SectionTitleProps) => {
  return (
    <h2 
      className={`text-[22px] font-bold mt-8 mb-5 ${className}`}
      style={{
        color: pdfStyles.colors.primary,
      }}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
