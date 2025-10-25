import { createContext, useContext, useState, ReactNode } from 'react';

interface LiteModeContextType {
  liteMode: boolean;
  toggleLiteMode: () => void;
}

const LiteModeContext = createContext<LiteModeContextType | undefined>(undefined);

export const LiteModeProvider = ({ children }: { children: ReactNode }) => {
  const [liteMode, setLiteMode] = useState(true);

  const toggleLiteMode = () => {
    setLiteMode(prev => !prev);
  };

  return (
    <LiteModeContext.Provider value={{ liteMode, toggleLiteMode }}>
      {children}
    </LiteModeContext.Provider>
  );
};

export const useLiteMode = () => {
  const context = useContext(LiteModeContext);
  if (context === undefined) {
    throw new Error('useLiteMode must be used within a LiteModeProvider');
  }
  return context;
};
