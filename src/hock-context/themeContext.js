import { useEffect, useState, createContext } from 'react';


const STORAGE_NAME_THEME_COLOR = process.env.REACT_APP_STORAGE_NAME_THEME_COLOR || "color";

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem(STORAGE_NAME_THEME_COLOR);
    
    if (!storedPrefs) {
      window.localStorage.setItem(STORAGE_NAME_THEME_COLOR, 'default');
      return 'default';
    }
    
    return storedPrefs;
  }
  
  return 'default';
};


export const ThemeContext = createContext();


export const ThemeProvider = ({ initialTheme, children }) => {
  const [ theme, setTheme ] = useState(getInitialTheme);
  
  useEffect(() => {
    rawSetTheme(theme);
  }, [ theme ]);
  
  const rawSetTheme = (rawTheme) => {
    const getThemeSwitcher = document.body;
    // data-theme custom attribute for switching skins. Is in index.html <body data-theme="default">
    getThemeSwitcher.setAttribute("data-theme", rawTheme);
    
    localStorage.setItem(STORAGE_NAME_THEME_COLOR, rawTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  );
};
