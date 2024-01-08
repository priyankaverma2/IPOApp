import React, { createContext, useContext, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  }, []);

  const themeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? '#333' : '#fff',
    },
    text: {
      color: isDarkTheme ? '#fff' : '#333',
    },
    // Add more styles as needed
  });

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
