'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EmailEditorProviderProps {
  children: ReactNode;
}

type EmailEditorContextType = {
  view: 'desktop' | 'tablet' | 'mobile';
  handleViewChange: (view: 'desktop' | 'tablet' | 'mobile') => void;
};

export const EmailEditorContext = createContext<EmailEditorContextType | undefined>(undefined);

const EmailEditorProvider: React.FC<EmailEditorProviderProps> = ({ children }) => {
  const [view, setView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleViewChange = (view: 'desktop' | 'tablet' | 'mobile') => {
    setView(view);
    console.log('View is clicked', view);
  };

  return (
    <EmailEditorContext.Provider value={{ view, handleViewChange }}>
      {children}
    </EmailEditorContext.Provider>
  );
};

export const useEmailEditor = () => {
  const context = useContext(EmailEditorContext);
  if (!context) {
    throw new Error('useEmailEditor must be used within an EmailEditorProvider');
  }
  return context;
};

export default EmailEditorProvider;
