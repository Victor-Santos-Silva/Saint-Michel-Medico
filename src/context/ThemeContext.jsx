import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Salva o tema no localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Aplica a classe ao body para todo o documento
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    
    // Adiciona/remove classes de tema em todos os elementos raiz
    const rootElements = document.querySelectorAll('.theme-root');
    rootElements.forEach(el => {
      el.className = isDarkMode ? 'dark-mode theme-root' : 'light-mode theme-root';
    });
    
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`theme-root ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};